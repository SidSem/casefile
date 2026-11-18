import React from 'react';
import { 
  Target, 
  HelpCircle, 
  CheckCircle2, 
  AlertTriangle, 
  ShieldCheck, 
  FolderCheck,
  Send,
  Link as LinkIcon
} from 'lucide-react';
import { Suspect, EvidenceItem, CaseTheory } from '../../types/case';
import { useGameStore } from '../../store/useGameStore';
import { audioEngine } from '../../engine/audioEngine';

interface TheoryBoardProps {
  caseId: string;
  suspects: Suspect[];
  allEvidence: EvidenceItem[];
  onSubmitIndictment: () => void;
}

export const TheoryBoard: React.FC<TheoryBoardProps> = ({
  caseId,
  suspects,
  allEvidence,
  onSubmitIndictment,
}) => {
  const { caseSessions, updateTheoryDraft, settings } = useGameStore();
  const session = caseSessions[caseId];
  const draft = session?.theoryDraft || {
    proposedCulpritId: '',
    motive: '',
    opportunityMethod: '',
    supportingEvidenceIds: [],
    contradictedEvidenceIds: [],
    timelineExplanation: '',
  };

  const handleUpdate = (partial: Partial<CaseTheory>) => {
    updateTheoryDraft(caseId, partial);
  };

  const toggleEvidence = (evId: string, type: 'supporting' | 'contradicted') => {
    if (type === 'supporting') {
      const current = draft.supportingEvidenceIds;
      const updated = current.includes(evId)
        ? current.filter(id => id !== evId)
        : [...current, evId];
      handleUpdate({ supportingEvidenceIds: updated });
    } else {
      const current = draft.contradictedEvidenceIds;
      const updated = current.includes(evId)
        ? current.filter(id => id !== evId)
        : [...current, evId];
      handleUpdate({ contradictedEvidenceIds: updated });
    }
    if (settings.soundEffects) audioEngine.playTypewriterKey();
  };

  // Evaluate completeness & strength
  const isComplete = 
    draft.proposedCulpritId && 
    draft.motive.trim().length > 5 && 
    draft.opportunityMethod.trim().length > 5 && 
    draft.supportingEvidenceIds.length >= 2;

  const strengthScore = 
    (draft.proposedCulpritId ? 30 : 0) +
    (draft.motive.length > 10 ? 20 : 0) +
    (draft.opportunityMethod.length > 10 ? 20 : 0) +
    Math.min(30, draft.supportingEvidenceIds.length * 10);

  return (
    <div className="w-full h-full bg-[#0a0c10] p-4 sm:p-6 lg:p-8 overflow-y-auto space-y-6 font-mono text-xs text-charcoal-200">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-charcoal-900 p-4 rounded border border-charcoal-750">
        <div>
          <div className="flex items-center gap-2">
            <Target className="w-4 h-4 text-evidence-red" />
            <h2 className="font-display text-base sm:text-lg font-bold text-white tracking-wider uppercase">
              DEDUCTION ENGINE // CASE THEORY BUILDER
            </h2>
          </div>
          <p className="text-[11px] text-charcoal-400 font-sans mt-0.5">
            Construct a deterministic legal indictment. Synthesize physical evidence, refute contradictory alibis, and establish criminal culpability.
          </p>
        </div>

        {/* Strength Meter */}
        <div className="bg-charcoal-950 p-2.5 rounded border border-charcoal-800 flex items-center gap-3">
          <div className="text-right">
            <div className="text-[9px] text-charcoal-500 uppercase">THEORY STRENGTH</div>
            <div className={`font-display text-base font-bold ${
              strengthScore >= 80 ? 'text-emerald-400' : strengthScore >= 50 ? 'text-terminal-amber' : 'text-evidence-red'
            }`}>
              {strengthScore}% COHERENCE
            </div>
          </div>
          <div className="w-16 bg-charcoal-850 h-2 rounded-full overflow-hidden border border-charcoal-750">
            <div
              className={`h-full ${
                strengthScore >= 80 ? 'bg-emerald-500' : strengthScore >= 50 ? 'bg-terminal-amber' : 'bg-evidence-red'
              }`}
              style={{ width: `${strengthScore}%` }}
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column: Culprit, Motive & Method */}
        <div className="space-y-5 bg-charcoal-900/80 p-5 rounded border border-charcoal-750">
          {/* Step 1: Suspect Culprit */}
          <div>
            <label className="block text-white font-bold uppercase tracking-wider mb-2 text-xs flex items-center gap-1.5">
              <span className="text-evidence-red font-mono">[1]</span> IDENTIFY PRIMARY PERPETRATOR
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              {suspects.map((s) => {
                const isSelected = draft.proposedCulpritId === s.id;
                return (
                  <div
                    key={s.id}
                    onClick={() => {
                      handleUpdate({ proposedCulpritId: s.id });
                      if (settings.soundEffects) audioEngine.playTypewriterKey();
                    }}
                    className={`cursor-pointer p-2.5 rounded border text-center transition-all ${
                      isSelected
                        ? 'bg-evidence-burgundy/30 border-evidence-red text-white shadow-[0_0_12px_rgba(185,28,28,0.3)]'
                        : 'bg-charcoal-850 border-charcoal-750 text-charcoal-400 hover:text-charcoal-200 hover:border-charcoal-600'
                    }`}
                  >
                    <img
                      src={s.portraitUrl}
                      alt={s.name}
                      className="w-12 h-12 object-cover rounded mx-auto filter grayscale contrast-125 mb-1.5 border border-charcoal-700"
                    />
                    <div className="font-bold text-[11px] truncate">{s.name}</div>
                    <div className="text-[9px] text-charcoal-500 truncate">{s.occupation}</div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Step 2: Primary Motive */}
          <div>
            <label className="block text-white font-bold uppercase tracking-wider mb-1.5 text-xs flex items-center gap-1.5">
              <span className="text-evidence-red font-mono">[2]</span> ESTABLISH PRIMARY MOTIVE
            </label>
            <p className="text-[10px] text-charcoal-400 mb-1.5">
              Explain why the accused committed the offense (e.g. extortion over harbor kickbacks, disinheritance from will, covering up illegal salvage, concealing 1988 land fraud):
            </p>
            <textarea
              value={draft.motive}
              onChange={(e) => handleUpdate({ motive: e.target.value })}
              rows={3}
              placeholder="e.g. Elena Vance discovered Marcus Sterling was receiving $1.4M in offshore kickbacks from the Mercer harbor project..."
              className="w-full bg-charcoal-950 border border-charcoal-700 rounded p-2.5 text-white placeholder-charcoal-600 focus:outline-none focus:border-evidence-red font-mono text-xs leading-relaxed"
            />
          </div>

          {/* Step 3: Opportunity & Execution Method */}
          <div>
            <label className="block text-white font-bold uppercase tracking-wider mb-1.5 text-xs flex items-center gap-1.5">
              <span className="text-evidence-red font-mono">[3]</span> RECONSTRUCT EXECUTION METHOD & OPPORTUNITY
            </label>
            <p className="text-[10px] text-charcoal-400 mb-1.5">
              Explain the physical weapon, entry method, and crime scene mechanics:
            </p>
            <textarea
              value={draft.opportunityMethod}
              onChange={(e) => handleUpdate({ opportunityMethod: e.target.value })}
              rows={3}
              placeholder="e.g. Bribed superintendent Arthur Pendleton $25,000 for master key access, poisoned chamomile tea with PharmaCore Digoxin, and fled via service basement..."
              className="w-full bg-charcoal-950 border border-charcoal-700 rounded p-2.5 text-white placeholder-charcoal-600 focus:outline-none focus:border-evidence-red font-mono text-xs leading-relaxed"
            />
          </div>
        </div>

        {/* Right Column: Evidence Selection & Alibi Refutation */}
        <div className="space-y-5 bg-charcoal-900/80 p-5 rounded border border-charcoal-750">
          {/* Step 4: Supporting Evidence Links */}
          <div>
            <label className="block text-white font-bold uppercase tracking-wider mb-1.5 text-xs flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <span className="text-evidence-red font-mono">[4]</span> LINK SUPPORTING PHYSICAL EVIDENCE
              </span>
              <span className="text-[10px] text-emerald-400 font-normal">
                {draft.supportingEvidenceIds.length} Linked
              </span>
            </label>
            <p className="text-[10px] text-charcoal-400 mb-2">
              Select key clues that directly support your accusation:
            </p>

            <div className="max-h-48 overflow-y-auto space-y-1.5 pr-1">
              {allEvidence.map((ev) => {
                const isLinked = draft.supportingEvidenceIds.includes(ev.id);
                return (
                  <div
                    key={ev.id}
                    onClick={() => toggleEvidence(ev.id, 'supporting')}
                    className={`p-2 rounded cursor-pointer border transition-colors flex items-center justify-between ${
                      isLinked
                        ? 'bg-emerald-950/40 border-emerald-500/70 text-white'
                        : 'bg-charcoal-950 border-charcoal-800 text-charcoal-400 hover:text-charcoal-200'
                    }`}
                  >
                    <div className="overflow-hidden">
                      <div className="font-bold text-[11px] truncate">{ev.title}</div>
                      <div className="text-[9px] text-charcoal-500 truncate">{ev.category.toUpperCase()} • {ev.location}</div>
                    </div>
                    {isLinked && <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 ml-2" />}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Step 5: Contradiction Refutations */}
          <div>
            <label className="block text-white font-bold uppercase tracking-wider mb-1.5 text-xs flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <span className="text-evidence-red font-mono">[5]</span> REFUTE FALSE ALIBIS & CONTRADICTIONS
              </span>
              <span className="text-[10px] text-evidence-crimson font-normal">
                {draft.contradictedEvidenceIds.length} Refuted
              </span>
            </label>
            <p className="text-[10px] text-charcoal-400 mb-2">
              Select clues that shatter the suspect's claimed alibi:
            </p>

            <div className="max-h-48 overflow-y-auto space-y-1.5 pr-1">
              {allEvidence.map((ev) => {
                const isContradicted = draft.contradictedEvidenceIds.includes(ev.id);
                return (
                  <div
                    key={ev.id}
                    onClick={() => toggleEvidence(ev.id, 'contradicted')}
                    className={`p-2 rounded cursor-pointer border transition-colors flex items-center justify-between ${
                      isContradicted
                        ? 'bg-red-950/40 border-evidence-red text-white'
                        : 'bg-charcoal-950 border-charcoal-800 text-charcoal-400 hover:text-charcoal-200'
                    }`}
                  >
                    <div className="overflow-hidden">
                      <div className="font-bold text-[11px] truncate">{ev.title}</div>
                      <div className="text-[9px] text-charcoal-500 truncate">{ev.category.toUpperCase()} • {ev.timestamp}</div>
                    </div>
                    {isContradicted && <AlertTriangle className="w-4 h-4 text-evidence-red shrink-0 ml-2" />}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Submission Footer Banner */}
      <div className="p-4 bg-charcoal-900 rounded border border-charcoal-750 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <span className="text-white font-bold text-xs uppercase block">
            FORMAL CASE CLOSURE DOCUMENTATION READY
          </span>
          <span className="text-[11px] text-charcoal-400 font-sans">
            Once submitted, your findings will be audited against federal archive records to generate the After-Action Report.
          </span>
        </div>

        <button
          onClick={onSubmitIndictment}
          disabled={!isComplete}
          className={`px-8 py-3 rounded font-display tracking-widest text-sm uppercase flex items-center gap-2 shadow-xl transition-all ${
            isComplete
              ? 'bg-evidence-red hover:bg-evidence-crimson text-white hover:scale-105 active:scale-95'
              : 'bg-charcoal-800 text-charcoal-600 border border-charcoal-700 cursor-not-allowed'
          }`}
        >
          <Send className="w-4 h-4" />
          <span>FILE OFFICIAL INDICTMENT</span>
        </button>
      </div>
    </div>
  );
};
