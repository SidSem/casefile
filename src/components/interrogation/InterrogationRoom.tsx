import React, { useState } from 'react';
import { 
  Mic, 
  Flame, 
  AlertTriangle, 
  FileSearch, 
  ArrowRight, 
  CheckCircle, 
  HeartCrack,
  Radio,
  FolderOpen
} from 'lucide-react';
import { Suspect, EvidenceItem, DialogueOption } from '../../types/case';
import { useGameStore } from '../../store/useGameStore';
import { audioEngine } from '../../engine/audioEngine';

interface InterrogationRoomProps {
  caseId: string;
  suspects: Suspect[];
  allEvidence: EvidenceItem[];
}

export const InterrogationRoom: React.FC<InterrogationRoomProps> = ({
  caseId,
  suspects,
  allEvidence,
}) => {
  const { 
    caseSessions, 
    recordInterrogationDialogue, 
    presentEvidenceToSuspect, 
    revealContradiction,
    settings 
  } = useGameStore();

  const session = caseSessions[caseId];
  const [selectedSuspectId, setSelectedSuspectId] = useState(suspects[0]?.id || '');
  const [showPresentEvidenceModal, setShowPresentEvidenceModal] = useState(false);

  const suspect = suspects.find(s => s.id === selectedSuspectId) || suspects[0];

  // Calculate dynamic stress
  const interrogationLogs = session?.interrogationHistory.filter(h => h.suspectId === suspect?.id) || [];
  const presentedLogs = session?.presentedEvidence.filter(p => p.suspectId === suspect?.id) || [];
  const dynamicStress = Math.min(100, Math.max(10, (suspect?.stressLevel || 20) + (interrogationLogs.length * 6) + (presentedLogs.length * 15)));

  const handleAskQuestion = (dlg: DialogueOption) => {
    recordInterrogationDialogue(caseId, suspect.id, dlg.id, dlg.stressDelta);
  };

  const handlePresentEvidence = (evidenceId: string) => {
    presentEvidenceToSuspect(caseId, suspect.id, evidenceId);
    setShowPresentEvidenceModal(false);

    // Check if suspect has matching contradiction or special response
    const matchingContradiction = suspect.contradictions.find(c => c.refutedByEvidenceId === evidenceId);
    if (matchingContradiction) {
      revealContradiction(caseId, matchingContradiction.id);
    }
  };

  if (!suspect) return null;

  return (
    <div className="w-full h-full bg-[#0a0c10] flex flex-col md:flex-row overflow-hidden font-mono text-xs text-charcoal-200">
      {/* Left Suspect Roster Sidebar */}
      <div className="w-full md:w-64 bg-charcoal-950 border-r border-charcoal-800 p-3 overflow-y-auto space-y-2 shrink-0">
        <div className="text-[10px] font-bold text-charcoal-400 uppercase tracking-widest pb-1 border-b border-charcoal-800 mb-2">
          SUSPECT ROSTER ({suspects.length})
        </div>

        {suspects.map((s) => {
          const isCurrent = s.id === suspect.id;
          const questionsCount = session?.interrogationHistory.filter(h => h.suspectId === s.id).length || 0;

          return (
            <div
              key={s.id}
              onClick={() => {
                setSelectedSuspectId(s.id);
                if (settings.soundEffects) audioEngine.playTapeRecorderClick();
              }}
              className={`p-2.5 rounded cursor-pointer transition-all border flex items-center gap-2.5 ${
                isCurrent
                  ? 'bg-charcoal-850 border-evidence-red text-white shadow-[0_0_12px_rgba(185,28,28,0.3)]'
                  : 'bg-charcoal-900 border-charcoal-800 text-charcoal-400 hover:text-charcoal-200 hover:border-charcoal-700'
              }`}
            >
              <img
                src={s.portraitUrl}
                alt={s.name}
                className="w-10 h-10 object-cover rounded filter grayscale contrast-125 shrink-0 border border-charcoal-700"
              />
              <div className="overflow-hidden flex-1">
                <div className="font-bold text-[11px] truncate">{s.name}</div>
                <div className="text-[9px] text-charcoal-500 truncate">{s.occupation}</div>
                <div className="text-[8px] text-terminal-amber mt-0.5">
                  {questionsCount > 0 ? `${questionsCount} INQUIRIES LOGGED` : 'UNQUESTIONED'}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Main Interrogation Chamber */}
      <div className="flex-1 flex flex-col overflow-hidden bg-charcoal-900/60 relative">
        {/* Top Atmosphere Bar */}
        <div className="px-5 py-2.5 bg-charcoal-950 border-b border-charcoal-750 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Mic className="w-4 h-4 text-evidence-red animate-pulse" />
            <span className="font-bold text-white text-xs uppercase tracking-wider">
              INTERROGATION ROOM 04 // AUDIO TAPE RECORDING ACTIVE
            </span>
          </div>

          {/* Reel-to-reel tape animation */}
          <div className="flex items-center gap-2 text-[10px] text-evidence-red font-bold">
            <div className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 border-2 border-evidence-red rounded-full animate-spin" />
              <span className="w-2.5 h-2.5 border-2 border-evidence-red rounded-full animate-spin" />
            </div>
            <span>REC // 00:34:12</span>
          </div>
        </div>

        {/* Chamber Interior Split */}
        <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
          {/* Suspect Profile & Psychological Stress */}
          <div className="w-full lg:w-72 bg-charcoal-950/80 border-r border-charcoal-800 p-4 overflow-y-auto space-y-4 shrink-0">
            {/* Portrait with Mood Vignette */}
            <div className="relative rounded overflow-hidden border-2 border-charcoal-700 shadow-xl bg-black">
              <img
                src={suspect.portraitUrl}
                alt={suspect.name}
                className="w-full h-44 object-cover filter contrast-125 grayscale"
              />
              <div className="absolute top-2 left-2 stamp-confidential text-[9px] bg-black/70">
                SUBJECT 0{suspects.indexOf(suspect) + 1}
              </div>
            </div>

            {/* Suspect Bio Info */}
            <div className="space-y-1">
              <h3 className="font-display text-lg font-bold text-white uppercase tracking-wide">
                {suspect.name}
              </h3>
              <div className="text-[10px] text-terminal-amber font-mono font-bold">
                "{suspect.callsignOrAlias}"
              </div>
              <p className="text-[11px] text-charcoal-400 font-sans">
                {suspect.occupation} ({suspect.age} years old)
              </p>
            </div>

            {/* Psychological Stress Meter */}
            <div className="bg-charcoal-900 p-3 rounded border border-charcoal-750 space-y-2">
              <div className="flex items-center justify-between text-[10px]">
                <span className="font-bold text-charcoal-300 flex items-center gap-1">
                  <Flame className="w-3.5 h-3.5 text-evidence-crimson" />
                  STRESS / COMPOSURE
                </span>
                <span className={`font-mono font-bold ${
                  dynamicStress > 70 ? 'text-evidence-red animate-pulse' : dynamicStress > 40 ? 'text-terminal-amber' : 'text-emerald-400'
                }`}>
                  {dynamicStress}%
                </span>
              </div>
              <div className="w-full bg-charcoal-950 h-2 rounded-full overflow-hidden border border-charcoal-800">
                <div
                  className={`h-full transition-all duration-500 ${
                    dynamicStress > 70 ? 'bg-evidence-red' : dynamicStress > 40 ? 'bg-terminal-amber' : 'bg-emerald-500'
                  }`}
                  style={{ width: `${dynamicStress}%` }}
                />
              </div>
              <div className="text-[9px] text-charcoal-500 italic">
                {dynamicStress > 70 ? 'Severe psychological agitation. Vulnerable to confession.' : 'Composed and defensive.'}
              </div>
            </div>

            {/* Claimed Alibi Card */}
            <div className="bg-charcoal-900 p-3 rounded border border-charcoal-750 space-y-1">
              <span className="text-[9px] text-charcoal-500 font-bold uppercase tracking-wider">
                CLAIMED ALIBI STATEMENT:
              </span>
              <p className="text-[11px] text-charcoal-300 font-serif italic">
                "{suspect.claimedAlibi}"
              </p>
            </div>

            {/* Known Motive Card */}
            <div className="bg-charcoal-900 p-3 rounded border border-charcoal-750 space-y-1">
              <span className="text-[9px] text-charcoal-500 font-bold uppercase tracking-wider">
                DOCUMENTED MOTIVE:
              </span>
              <p className="text-[11px] text-charcoal-300 font-sans">
                {suspect.knownMotive}
              </p>
            </div>
          </div>

          {/* Dialogue Transcript & Action Area */}
          <div className="flex-1 flex flex-col overflow-hidden p-4 sm:p-5 space-y-4">
            {/* Transcript Log Window */}
            <div className="flex-1 bg-charcoal-950 rounded border border-charcoal-800 p-4 overflow-y-auto space-y-3 font-mono text-xs">
              <div className="text-[10px] text-charcoal-500 uppercase tracking-widest text-center border-b border-charcoal-900 pb-2">
                TRANSCRIPT OF INQUIRY // CASE #{caseId.toUpperCase()}
              </div>

              {interrogationLogs.length === 0 ? (
                <div className="text-center py-12 text-charcoal-600 italic">
                  No statements on record. Select an inquiry from below or present discovered physical evidence.
                </div>
              ) : (
                interrogationLogs.map((log, idx) => {
                  const dlg = suspect.dialogueTree.find(d => d.id === log.dialogueId);
                  if (!dlg) return null;

                  return (
                    <div key={idx} className="space-y-1.5 pb-2 border-b border-charcoal-900">
                      {/* Investigator Question */}
                      <div className="flex items-start gap-2 text-evidence-red">
                        <span className="font-bold select-none">[AGENT]:</span>
                        <span className="text-charcoal-200 font-semibold">{dlg.prompt}</span>
                      </div>
                      {/* Suspect Reply */}
                      <div className="flex items-start gap-2 pl-4 text-charcoal-300">
                        <span className="font-bold select-none text-charcoal-500">[{suspect.name.toUpperCase()}]:</span>
                        <span className="font-serif italic text-charcoal-200">"{dlg.response}"</span>
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {/* Interrogation Actions / Questions */}
            <div className="space-y-2 pt-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] text-charcoal-400 font-bold uppercase tracking-wider">
                  AVAILABLE INQUIRIES & ACTIONS
                </span>
                <button
                  onClick={() => setShowPresentEvidenceModal(true)}
                  className="px-3 py-1 bg-evidence-burgundy/40 hover:bg-evidence-burgundy/60 text-evidence-crimson border border-evidence-red/50 rounded flex items-center gap-1.5 font-bold text-[10px] transition-colors"
                >
                  <FolderOpen className="w-3.5 h-3.5" />
                  <span>PRESENT DISCOVERED CLUE</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {suspect.dialogueTree.map((dlg) => {
                  const alreadyAsked = interrogationLogs.some(l => l.dialogueId === dlg.id);
                  const isLockedByEvidence = dlg.requiredEvidencePresented && 
                    !session?.presentedEvidence.some(p => p.suspectId === suspect.id && p.evidenceId === dlg.requiredEvidencePresented);

                  return (
                    <button
                      key={dlg.id}
                      onClick={() => handleAskQuestion(dlg)}
                      disabled={alreadyAsked || !!isLockedByEvidence}
                      className={`p-2.5 rounded text-left transition-all border flex items-start gap-2 ${
                        alreadyAsked
                          ? 'bg-charcoal-950 border-charcoal-850 text-charcoal-600 cursor-not-allowed'
                          : isLockedByEvidence
                          ? 'bg-charcoal-950/60 border-dashed border-charcoal-800 text-charcoal-500 cursor-not-allowed'
                          : 'bg-charcoal-850 hover:bg-charcoal-800 border-charcoal-700 hover:border-evidence-red text-charcoal-100'
                      }`}
                    >
                      <ArrowRight className="w-3.5 h-3.5 text-evidence-red shrink-0 mt-0.5" />
                      <div className="overflow-hidden">
                        <div className="text-[11px] font-sans font-semibold line-clamp-2">
                          {dlg.prompt}
                        </div>
                        {isLockedByEvidence && (
                          <div className="text-[9px] text-amber-500/80 font-mono mt-0.5">
                            [Requires Presenting Pertinent Physical Evidence]
                          </div>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Present Evidence Modal */}
      {showPresentEvidenceModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs">
          <div className="w-full max-w-lg bg-charcoal-900 border border-charcoal-700 rounded p-5 space-y-4 shadow-2xl font-mono text-xs">
            <div className="border-b border-charcoal-750 pb-2">
              <span className="text-[10px] text-evidence-red font-bold uppercase tracking-wider">
                PRESENT PHYSICAL EXHIBIT TO {suspect.name.toUpperCase()}
              </span>
              <h3 className="font-display text-base font-bold text-white uppercase mt-0.5">
                SELECT CLUE FROM EVIDENCE DRAWER
              </h3>
            </div>

            <div className="max-h-64 overflow-y-auto space-y-2">
              {allEvidence.map((ev) => (
                <div
                  key={ev.id}
                  onClick={() => handlePresentEvidence(ev.id)}
                  className="p-2.5 rounded bg-charcoal-850 hover:bg-charcoal-800 border border-charcoal-750 hover:border-evidence-red cursor-pointer transition-colors"
                >
                  <div className="flex items-center justify-between text-[9px] text-evidence-red">
                    <span>{ev.category.toUpperCase()}</span>
                    <span>{ev.location}</span>
                  </div>
                  <div className="font-bold text-white font-sans mt-0.5">{ev.title}</div>
                  <div className="text-[10px] text-charcoal-400 truncate mt-0.5">{ev.description}</div>
                </div>
              ))}
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setShowPresentEvidenceModal(false)}
                className="px-3 py-1.5 text-charcoal-400 hover:text-white rounded"
              >
                CANCEL
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
