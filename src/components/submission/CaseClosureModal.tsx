import React from 'react';
import { ShieldAlert, X, Stamp, CheckCircle2, AlertOctagon } from 'lucide-react';
import { Suspect, EvidenceItem, CaseData } from '../../types/case';
import { useGameStore } from '../../store/useGameStore';
import { audioEngine } from '../../engine/audioEngine';

interface CaseClosureModalProps {
  caseData: CaseData;
  isOpen: boolean;
  onClose: () => void;
  onConfirmSubmit: () => void;
}

export const CaseClosureModal: React.FC<CaseClosureModalProps> = ({
  caseData,
  isOpen,
  onClose,
  onConfirmSubmit,
}) => {
  const { caseSessions, settings, profile } = useGameStore();
  const session = caseSessions[caseData.id];

  if (!isOpen || !session) return null;

  const draft = session.theoryDraft;
  const culprit = caseData.suspects.find(s => s.id === draft.proposedCulpritId);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in">
      <div 
        className="w-full max-w-2xl bg-charcoal-900 border-2 border-evidence-red/80 rounded p-6 sm:p-8 space-y-6 shadow-2xl font-mono text-xs text-charcoal-200 relative"
        style={{
          backgroundImage: 'radial-gradient(rgba(255, 255, 255, 0.02) 1px, transparent 0)',
          backgroundSize: '16px 16px'
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-charcoal-750 pb-4">
          <div className="flex items-center gap-2">
            <ShieldAlert className="w-5 h-5 text-evidence-red" />
            <div>
              <h2 className="font-display text-lg text-white font-bold tracking-wider uppercase">
                FORMAL CASE CLOSURE // INDICTMENT SUBMISSION
              </h2>
              <p className="text-[10px] text-charcoal-400">
                CASE IDENTIFIER: {caseData.code} // {caseData.title}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded hover:bg-charcoal-800 text-charcoal-400 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Indictment Summary Review */}
        <div className="space-y-4 bg-charcoal-950 p-4 rounded border border-charcoal-800">
          <div>
            <span className="text-charcoal-500 block text-[9px] uppercase font-bold">ACCUSED PERPETRATOR:</span>
            <span className="text-base font-bold text-evidence-crimson font-display tracking-wide uppercase">
              {culprit?.name || 'UNKNOWN'} ({culprit?.occupation})
            </span>
          </div>

          <div>
            <span className="text-charcoal-500 block text-[9px] uppercase font-bold">ALLEGED MOTIVE:</span>
            <p className="text-charcoal-200 font-sans mt-0.5 leading-relaxed">
              "{draft.motive || 'None specified'}"
            </p>
          </div>

          <div>
            <span className="text-charcoal-500 block text-[9px] uppercase font-bold">RECONSTRUCTED EXECUTION METHOD:</span>
            <p className="text-charcoal-200 font-sans mt-0.5 leading-relaxed">
              "{draft.opportunityMethod || 'None specified'}"
            </p>
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-charcoal-850 text-[11px]">
            <span>Supporting Physical Clues: <strong className="text-white">{draft.supportingEvidenceIds.length}</strong></span>
            <span>Refuted Alibis: <strong className="text-white">{draft.contradictedEvidenceIds.length}</strong></span>
            <span>Hints Consumed: <strong className="text-terminal-amber">{session.hintsUsedCount}</strong></span>
          </div>
        </div>

        {/* Warning Badge */}
        <div className="bg-amber-950/20 border border-amber-800/40 p-3 rounded text-[11px] text-amber-200 flex items-center gap-2">
          <AlertOctagon className="w-4 h-4 text-terminal-amber shrink-0" />
          <span>
            Submission will permanently close this investigative docket and submit your findings to the Federal Grand Jury.
          </span>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-between pt-2">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-charcoal-800 hover:bg-charcoal-700 text-charcoal-300 rounded font-bold"
          >
            RETURN TO REVIEW
          </button>

          <button
            onClick={() => {
              if (settings.soundEffects) audioEngine.playStampThud();
              onConfirmSubmit();
            }}
            className="px-8 py-2.5 bg-evidence-red hover:bg-evidence-crimson text-white rounded font-display tracking-widest text-sm uppercase flex items-center gap-2 shadow-lg transition-transform hover:scale-105"
          >
            <Stamp className="w-4 h-4" />
            <span>SUBMIT OFFICIAL INDICTMENT</span>
          </button>
        </div>
      </div>
    </div>
  );
};
