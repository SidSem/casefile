import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { 
  InvestigatorProfile, 
  AppSettings, 
  UserStats, 
  CaseSessionState, 
  Achievement 
} from '../types/investigator';
import { CaseScoreResult, Difficulty } from '../types/case';
import { ALL_CASES, getCaseById } from '../data/cases';
import { MASTER_ACHIEVEMENTS } from '../data/achievements';
import { evaluateDeduction } from '../engine/deductionEngine';
import { evaluateTimelineOrder } from '../engine/timelineEngine';
import { audioEngine } from '../engine/audioEngine';

interface GameState {
  profile: InvestigatorProfile | null;
  settings: AppSettings;
  activeCaseId: string | null;
  caseSessions: Record<string, CaseSessionState>;
  completedCases: Record<string, CaseScoreResult>;
  achievements: Achievement[];
  userStats: UserStats;

  // Actions
  setProfile: (profile: InvestigatorProfile) => void;
  updateSettings: (partial: Partial<AppSettings>) => void;
  startCase: (caseId: string) => void;
  setActiveCaseId: (caseId: string | null) => void;
  discoverEvidence: (caseId: string, evidenceId: string) => void;
  revealHiddenLayer: (caseId: string, evidenceId: string) => void;
  recordInterrogationDialogue: (caseId: string, suspectId: string, dialogueId: string, stressDelta?: number) => void;
  presentEvidenceToSuspect: (caseId: string, suspectId: string, evidenceId: string) => void;
  revealContradiction: (caseId: string, contradictionId: string) => void;
  updateBoardNodes: (caseId: string, nodes: CaseSessionState['boardNodes']) => void;
  updateBoardEdges: (caseId: string, edges: CaseSessionState['boardEdges']) => void;
  pinClueToBoard: (caseId: string, clueId: string, type?: string) => void;
  removeNodeFromBoard: (caseId: string, nodeId: string) => void;
  updateTimelineOrder: (caseId: string, orderedIds: string[]) => void;
  updateTheoryDraft: (caseId: string, partial: Partial<CaseSessionState['theoryDraft']>) => void;
  useHint: (caseId: string, level: number) => string | null;
  closeAndScoreCase: (caseId: string) => CaseScoreResult | null;
  unlockAchievement: (achievementId: string) => void;
  resetAllProgress: () => void;
  isCaseUnlocked: (caseId: string) => boolean;
}

const DEFAULT_SETTINGS: AppSettings = {
  soundEffects: true,
  ambientAudio: false,
  sfxVolume: 0.7,
  ambientVolume: 0.35,
  reducedMotion: false,
  highContrast: false,
  textSize: 'standard',
  introCompleted: false,
};

const DEFAULT_STATS: UserStats = {
  casesAttempted: 0,
  casesCompleted: 0,
  casesPerfect: 0,
  totalScore: 0,
  totalCluesDiscovered: 0,
  totalInterrogationsHeld: 0,
  contradictionsFound: 0,
  hintsUsed: 0,
  investigationTimeSeconds: 0,
};

export const useGameStore = create<GameState>()(
  persist(
    (set, get) => ({
      profile: null,
      settings: DEFAULT_SETTINGS,
      activeCaseId: null,
      caseSessions: {},
      completedCases: {},
      achievements: MASTER_ACHIEVEMENTS,
      userStats: DEFAULT_STATS,

      setProfile: (profile: InvestigatorProfile) => {
        set({ profile });
      },

      updateSettings: (partial: Partial<AppSettings>) => {
        set((state) => {
          const newSettings = { ...state.settings, ...partial };
          if (partial.ambientAudio !== undefined) {
            if (newSettings.ambientAudio) {
              audioEngine.startAmbientDrone(newSettings.ambientVolume);
            } else {
              audioEngine.stopAmbientDrone();
            }
          }
          if (partial.ambientVolume !== undefined && newSettings.ambientAudio) {
            audioEngine.setAmbientVolume(newSettings.ambientVolume);
          }
          return { settings: newSettings };
        });
      },

      isCaseUnlocked: (caseId: string) => {
        const c = getCaseById(caseId);
        if (!c) return false;
        if (!c.isLocked) return true;
        // Case 009 requires at least 2 completed cases
        const completedCount = Object.keys(get().completedCases).length;
        return completedCount >= 2;
      },

      startCase: (caseId: string) => {
        const caseData = getCaseById(caseId);
        if (!caseData) return;

        const currentSessions = get().caseSessions;
        if (!currentSessions[caseId]) {
          // Initial clues revealed
          const initialClues = caseData.evidence
            .filter(e => e.isInitialClue)
            .map(e => e.id);

          // Initial default board nodes layout
          const initialNodes: CaseSessionState['boardNodes'] = [];
          
          // Place victim at center top
          initialNodes.push({
            id: `victim-${caseData.id}`,
            type: 'victim',
            position: { x: 380, y: 40 },
            data: {
              id: `victim-${caseData.id}`,
              title: caseData.victim.name,
              category: 'victim',
              snippet: `${caseData.victim.occupation} (${caseData.victim.age}yo). ${caseData.victim.causeOfDeath}`,
              imageUrl: caseData.crimeScenePhoto,
            }
          });

          // Place initial clues
          initialClues.forEach((cid, index) => {
            const ev = caseData.evidence.find(e => e.id === cid);
            if (ev) {
              initialNodes.push({
                id: ev.id,
                type: ev.category === 'photograph' ? 'photo' : ev.category === 'document' ? 'document' : 'forensic',
                position: { 
                  x: 80 + (index % 3) * 320, 
                  y: 220 + Math.floor(index / 3) * 260 
                },
                data: {
                  id: ev.id,
                  evidenceId: ev.id,
                  title: ev.title,
                  category: ev.category,
                  snippet: ev.description,
                  imageUrl: ev.imageUrl,
                  timestamp: ev.timestamp,
                }
              });
            }
          });

          const newSession: CaseSessionState = {
            caseId,
            startedAt: Date.now(),
            timeSpentSeconds: 0,
            discoveredEvidenceIds: initialClues,
            pinnedBoardNodeIds: initialNodes.map(n => n.id),
            boardNodes: initialNodes,
            boardEdges: [],
            interrogationHistory: [],
            presentedEvidence: [],
            revealedContradictions: [],
            timelineOrder: caseData.timelineEvents.map(e => e.id),
            theoryDraft: {
              proposedCulpritId: '',
              motive: '',
              opportunityMethod: '',
              supportingEvidenceIds: [],
              contradictedEvidenceIds: [],
              timelineExplanation: '',
            },
            hintsUsedCount: 0,
            usedHintLevels: [],
            isClosed: false,
          };

          set((state) => ({
            activeCaseId: caseId,
            caseSessions: { ...state.caseSessions, [caseId]: newSession },
            userStats: {
              ...state.userStats,
              casesAttempted: state.userStats.casesAttempted + 1,
              totalCluesDiscovered: state.userStats.totalCluesDiscovered + initialClues.length,
            }
          }));
        } else {
          set({ activeCaseId: caseId });
        }

        if (get().settings.soundEffects) {
          audioEngine.playStampThud();
        }
      },

      setActiveCaseId: (caseId: string | null) => {
        set({ activeCaseId: caseId });
      },

      discoverEvidence: (caseId: string, evidenceId: string) => {
        const session = get().caseSessions[caseId];
        if (!session) return;
        if (session.discoveredEvidenceIds.includes(evidenceId)) return;

        const updatedDiscovered = [...session.discoveredEvidenceIds, evidenceId];
        
        // Auto add to board if not yet on board
        const caseData = getCaseById(caseId);
        const ev = caseData?.evidence.find(e => e.id === evidenceId);
        const updatedNodes = [...session.boardNodes];
        
        if (ev && !updatedNodes.some(n => n.id === ev.id)) {
          updatedNodes.push({
            id: ev.id,
            type: ev.category === 'photograph' ? 'photo' : ev.category === 'document' ? 'document' : 'forensic',
            position: { 
              x: 100 + (updatedNodes.length % 4) * 280, 
              y: 280 + Math.floor(updatedNodes.length / 4) * 240 
            },
            data: {
              id: ev.id,
              evidenceId: ev.id,
              title: ev.title,
              category: ev.category,
              snippet: ev.description,
              imageUrl: ev.imageUrl,
              timestamp: ev.timestamp,
            }
          });
        }

        set((state) => ({
          caseSessions: {
            ...state.caseSessions,
            [caseId]: {
              ...session,
              discoveredEvidenceIds: updatedDiscovered,
              boardNodes: updatedNodes,
            }
          },
          userStats: {
            ...state.userStats,
            totalCluesDiscovered: state.userStats.totalCluesDiscovered + 1,
          }
        }));

        if (get().settings.soundEffects) {
          audioEngine.playCameraShutter();
        }
      },

      revealHiddenLayer: (caseId: string, evidenceId: string) => {
        const session = get().caseSessions[caseId];
        if (!session) return;
        
        const caseData = getCaseById(caseId);
        const ev = caseData?.evidence.find(e => e.id === evidenceId);
        if (ev && ev.hotspots) {
          // If any hotspot reveals another evidence item, discover it
          ev.hotspots.forEach(h => {
            if (h.revealsEvidenceId) {
              get().discoverEvidence(caseId, h.revealsEvidenceId);
            }
          });
        }

        if (get().settings.soundEffects) {
          audioEngine.playContradictionStinger();
        }

        // Check Sharp Eye achievement
        const allDiscovered = caseData?.evidence.every(e => 
          session.discoveredEvidenceIds.includes(e.id)
        );
        if (allDiscovered) {
          get().unlockAchievement('sharp_eye');
        }
      },

      recordInterrogationDialogue: (caseId: string, suspectId: string, dialogueId: string, stressDelta = 0) => {
        const session = get().caseSessions[caseId];
        if (!session) return;

        const updatedHistory = [
          ...session.interrogationHistory,
          { suspectId, dialogueId, timestamp: Date.now() }
        ];

        const caseData = getCaseById(caseId);
        const suspect = caseData?.suspects.find(s => s.id === suspectId);
        const dlg = suspect?.dialogueTree.find(d => d.id === dialogueId);

        // If dialogue reveals another evidence item
        if (dlg?.revealsEvidenceId) {
          get().discoverEvidence(caseId, dlg.revealsEvidenceId);
        }

        // If dialogue reveals a contradiction
        if (dlg?.revealsContradiction) {
          get().revealContradiction(caseId, dlg.revealsContradiction);
        }

        set((state) => ({
          caseSessions: {
            ...state.caseSessions,
            [caseId]: {
              ...session,
              interrogationHistory: updatedHistory,
            }
          },
          userStats: {
            ...state.userStats,
            totalInterrogationsHeld: state.userStats.totalInterrogationsHeld + 1,
          }
        }));

        if (get().settings.soundEffects) {
          audioEngine.playTapeRecorderClick();
        }
      },

      presentEvidenceToSuspect: (caseId: string, suspectId: string, evidenceId: string) => {
        const session = get().caseSessions[caseId];
        if (!session) return;

        const updatedPresented = [
          ...session.presentedEvidence,
          { suspectId, evidenceId }
        ];

        set((state) => ({
          caseSessions: {
            ...state.caseSessions,
            [caseId]: {
              ...session,
              presentedEvidence: updatedPresented,
            }
          }
        }));

        if (get().settings.soundEffects) {
          audioEngine.playStampThud();
        }
      },

      revealContradiction: (caseId: string, contradictionId: string) => {
        const session = get().caseSessions[caseId];
        if (!session) return;
        if (session.revealedContradictions.includes(contradictionId)) return;

        const updatedContradictions = [...session.revealedContradictions, contradictionId];

        set((state) => ({
          caseSessions: {
            ...state.caseSessions,
            [caseId]: {
              ...session,
              revealedContradictions: updatedContradictions,
            }
          },
          userStats: {
            ...state.userStats,
            contradictionsFound: state.userStats.contradictionsFound + 1,
          }
        }));

        if (get().settings.soundEffects) {
          audioEngine.playContradictionStinger();
        }

        // Check Lie Detector achievement
        const caseData = getCaseById(caseId);
        const totalCaseContradictions = caseData?.suspects.flatMap(s => s.contradictions).length || 0;
        if (totalCaseContradictions > 0 && updatedContradictions.length >= totalCaseContradictions) {
          get().unlockAchievement('human_lie_detector');
        }
      },

      updateBoardNodes: (caseId: string, nodes: CaseSessionState['boardNodes']) => {
        const session = get().caseSessions[caseId];
        if (!session) return;

        set((state) => ({
          caseSessions: {
            ...state.caseSessions,
            [caseId]: {
              ...session,
              boardNodes: nodes,
            }
          }
        }));
      },

      updateBoardEdges: (caseId: string, edges: CaseSessionState['boardEdges']) => {
        const session = get().caseSessions[caseId];
        if (!session) return;

        set((state) => ({
          caseSessions: {
            ...state.caseSessions,
            [caseId]: {
              ...session,
              boardEdges: edges,
            }
          }
        }));

        if (get().settings.soundEffects) {
          audioEngine.playStringPluck();
        }
      },

      pinClueToBoard: (caseId: string, clueId: string, type = 'note') => {
        const session = get().caseSessions[caseId];
        if (!session) return;
        const caseData = getCaseById(caseId);
        const ev = caseData?.evidence.find(e => e.id === clueId);

        const currentNodes = [...session.boardNodes];
        if (currentNodes.some(n => n.id === clueId)) return;

        const newNode = {
          id: clueId,
          type: type === 'note' ? 'note' : ev?.category === 'photograph' ? 'photo' : 'document',
          position: { x: 300 + Math.random() * 80, y: 300 + Math.random() * 80 },
          data: {
            id: clueId,
            evidenceId: ev?.id,
            title: ev?.title || 'Investigator Note',
            category: ev?.category || 'note',
            snippet: ev?.description || 'Personal deduction note',
            imageUrl: ev?.imageUrl,
            timestamp: ev?.timestamp || 'NOW',
          }
        };

        currentNodes.push(newNode);

        set((state) => ({
          caseSessions: {
            ...state.caseSessions,
            [caseId]: {
              ...session,
              boardNodes: currentNodes,
              pinnedBoardNodeIds: [...session.pinnedBoardNodeIds, clueId],
            }
          }
        }));

        if (get().settings.soundEffects) {
          audioEngine.playStampThud();
        }
      },

      removeNodeFromBoard: (caseId: string, nodeId: string) => {
        const session = get().caseSessions[caseId];
        if (!session) return;

        const updatedNodes = session.boardNodes.filter(n => n.id !== nodeId);
        const updatedEdges = session.boardEdges.filter(e => e.source !== nodeId && e.target !== nodeId);

        set((state) => ({
          caseSessions: {
            ...state.caseSessions,
            [caseId]: {
              ...session,
              boardNodes: updatedNodes,
              boardEdges: updatedEdges,
            }
          }
        }));
      },

      updateTimelineOrder: (caseId: string, orderedIds: string[]) => {
        const session = get().caseSessions[caseId];
        if (!session) return;

        set((state) => ({
          caseSessions: {
            ...state.caseSessions,
            [caseId]: {
              ...session,
              timelineOrder: orderedIds,
            }
          }
        }));
      },

      updateTheoryDraft: (caseId: string, partial: Partial<CaseSessionState['theoryDraft']>) => {
        const session = get().caseSessions[caseId];
        if (!session) return;

        set((state) => ({
          caseSessions: {
            ...state.caseSessions,
            [caseId]: {
              ...session,
              theoryDraft: { ...session.theoryDraft, ...partial },
            }
          }
        }));
      },

      useHint: (caseId: string, level: number): string | null => {
        const session = get().caseSessions[caseId];
        if (!session) return null;
        const caseData = getCaseById(caseId);
        if (!caseData) return null;

        const hintText = level === 1 ? caseData.hints.level1 : level === 2 ? caseData.hints.level2 : caseData.hints.level3;
        const usedLevels = session.usedHintLevels.includes(level) 
          ? session.usedHintLevels 
          : [...session.usedHintLevels, level];

        set((state) => ({
          caseSessions: {
            ...state.caseSessions,
            [caseId]: {
              ...session,
              hintsUsedCount: session.hintsUsedCount + (session.usedHintLevels.includes(level) ? 0 : 1),
              usedHintLevels: usedLevels,
            }
          },
          userStats: {
            ...state.userStats,
            hintsUsed: state.userStats.hintsUsed + (session.usedHintLevels.includes(level) ? 0 : 1),
          }
        }));

        if (get().settings.soundEffects) {
          audioEngine.playTerminalChirp(600);
        }

        return hintText;
      },

      closeAndScoreCase: (caseId: string): CaseScoreResult | null => {
        const session = get().caseSessions[caseId];
        const caseData = getCaseById(caseId);
        if (!session || !caseData) return null;

        const durationSeconds = Math.max(60, Math.round((Date.now() - session.startedAt) / 1000));
        const difficulty = get().profile?.difficulty || 'detective';

        // Evaluate timeline
        const timelineResult = evaluateTimelineOrder(caseData.timelineEvents, session.timelineOrder);

        // Evaluate interrogation
        const totalSuspects = caseData.suspects.length;
        const questionedSuspects = new Set(session.interrogationHistory.map(h => h.suspectId)).size;
        const interrogationScore = Math.round((questionedSuspects / totalSuspects) * 60 + (session.revealedContradictions.length * 20));

        // Evaluate Deduction
        const evalResult = evaluateDeduction(
          caseData,
          session.theoryDraft,
          timelineResult.score,
          Math.min(100, interrogationScore),
          session.hintsUsedCount,
          durationSeconds,
          difficulty
        );

        const newScoreResult: CaseScoreResult = {
          caseId,
          culpritCorrect: evalResult.culpritCorrect,
          motiveCorrect: evalResult.motiveCorrect,
          methodCorrect: evalResult.methodCorrect,
          evidenceAccuracyScore: evalResult.evidenceAccuracyScore,
          timelineAccuracyScore: evalResult.timelineAccuracyScore,
          interrogationScore: evalResult.interrogationScore,
          hintCountUsed: session.hintsUsedCount,
          hintPenalty: (session.hintsUsedCount * (difficulty === 'special_agent' ? 80 : difficulty === 'detective' ? 45 : 20)),
          durationSeconds,
          totalScore: evalResult.totalScore,
          rankAwarded: evalResult.rankAwarded,
          outcomeTier: evalResult.tier,
          unlockedAchievements: [],
        };

        // Unlock achievements check
        const unlocked: string[] = [];
        
        // 1. First Blood
        get().unlockAchievement('first_blood');
        unlocked.push('first_blood');

        // 2. No Loose Ends (no hints)
        if (session.hintsUsedCount === 0) {
          get().unlockAchievement('no_loose_ends');
          unlocked.push('no_loose_ends');
        }

        // 3. Master Detective (900+ score & perfect)
        if (evalResult.totalScore >= 900 && evalResult.tier === 'perfect') {
          get().unlockAchievement('master_detective');
          unlocked.push('master_detective');
        }

        // 4. Case 009 specific achievements
        if (caseId === 'case-009' && evalResult.tier === 'perfect') {
          get().unlockAchievement('deep_state_unmasked');
          unlocked.push('deep_state_unmasked');
        }

        newScoreResult.unlockedAchievements = unlocked;

        // Save session closed & completed case
        set((state) => {
          const completedCount = Object.keys(state.completedCases).length + 1;
          const isCase9Unlocked = completedCount >= 2;
          if (isCase9Unlocked) {
            get().unlockAchievement('the_ninth_key');
          }

          return {
            completedCases: {
              ...state.completedCases,
              [caseId]: newScoreResult,
            },
            caseSessions: {
              ...state.caseSessions,
              [caseId]: {
                ...session,
                isClosed: true,
              }
            },
            userStats: {
              ...state.userStats,
              casesCompleted: state.userStats.casesCompleted + 1,
              casesPerfect: state.userStats.casesPerfect + (evalResult.tier === 'perfect' ? 1 : 0),
              totalScore: state.userStats.totalScore + evalResult.totalScore,
              investigationTimeSeconds: state.userStats.investigationTimeSeconds + durationSeconds,
            }
          };
        });

        if (get().settings.soundEffects) {
          audioEngine.playStampThud();
        }

        return newScoreResult;
      },

      unlockAchievement: (achievementId: string) => {
        set((state) => {
          const achs = state.achievements.map((a) => {
            if (a.id === achievementId && !a.unlockedAt) {
              return { ...a, unlockedAt: Date.now() };
            }
            return a;
          });
          return { achievements: achs };
        });
      },

      resetAllProgress: () => {
        set({
          profile: null,
          activeCaseId: null,
          caseSessions: {},
          completedCases: {},
          achievements: MASTER_ACHIEVEMENTS,
          userStats: DEFAULT_STATS,
          settings: { ...DEFAULT_SETTINGS, introCompleted: false }
        });
      }
    }),
    {
      name: 'casefile09_storage_v1',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
