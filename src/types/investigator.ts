import { Difficulty, InvestigatorRank } from './case';

export interface InvestigatorProfile {
  name: string;
  callsign: string;
  avatarId: string;
  badgeNumber: string;
  difficulty: Difficulty;
  joinedTimestamp: number;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  iconName: string;
  unlockedAt?: number;
}

export interface UserStats {
  casesAttempted: number;
  casesCompleted: number;
  casesPerfect: number;
  totalScore: number;
  totalCluesDiscovered: number;
  totalInterrogationsHeld: number;
  contradictionsFound: number;
  hintsUsed: number;
  investigationTimeSeconds: number;
}

export interface AppSettings {
  soundEffects: boolean;
  ambientAudio: boolean;
  sfxVolume: number; // 0.0 - 1.0
  ambientVolume: number; // 0.0 - 1.0
  reducedMotion: boolean;
  highContrast: boolean;
  textSize: 'standard' | 'large';
  introCompleted: boolean;
}

export interface CaseSessionState {
  caseId: string;
  startedAt: number;
  timeSpentSeconds: number;
  discoveredEvidenceIds: string[];
  pinnedBoardNodeIds: string[];
  boardNodes: {
    id: string;
    type: string;
    position: { x: number; y: number };
    data: Record<string, unknown>;
  }[];
  boardEdges: {
    id: string;
    source: string;
    target: string;
    label?: string;
    relationship?: string;
  }[];
  interrogationHistory: {
    suspectId: string;
    dialogueId: string;
    timestamp: number;
  }[];
  presentedEvidence: {
    suspectId: string;
    evidenceId: string;
  }[];
  revealedContradictions: string[]; // contradiction IDs
  timelineOrder: string[]; // ordered timeline event IDs
  theoryDraft: {
    proposedCulpritId: string;
    motive: string;
    opportunityMethod: string;
    supportingEvidenceIds: string[];
    contradictedEvidenceIds: string[];
    timelineExplanation: string;
  };
  hintsUsedCount: number;
  usedHintLevels: number[];
  isClosed: boolean;
}
