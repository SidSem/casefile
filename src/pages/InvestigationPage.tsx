import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Layers, 
  Microscope, 
  Mic, 
  Clock, 
  Target, 
  HelpCircle, 
  FileCheck,
  Briefcase
} from 'lucide-react';
import { getCaseById } from '../data/cases';
import { useGameStore } from '../store/useGameStore';
import { BoardCanvas } from '../components/investigation/BoardCanvas';
import { EvidenceLabModal } from '../components/laboratory/EvidenceLabModal';
import { InterrogationRoom } from '../components/interrogation/InterrogationRoom';
import { TimelineBoard } from '../components/timeline/TimelineBoard';
import { TheoryBoard } from '../components/deduction/TheoryBoard';
import { HintModal } from '../components/layout/HintModal';
import { CaseClosureModal } from '../components/submission/CaseClosureModal';
import { audioEngine } from '../engine/audioEngine';

export const InvestigationPage: React.FC = () => {
  const { caseId } = useParams<{ caseId: string }>();
  const navigate = useNavigate();
  const { 
    caseSessions, 
    startCase, 
    closeAndScoreCase, 
    settings 
  } = useGameStore();

  const caseData = caseId ? getCaseById(caseId) : null;

  // Active workspace tab
  const [activeTab, setActiveTab] = useState<'board' | 'lab' | 'interrogation' | 'timeline' | 'deduction'>('board');

  // Modals
  const [showHintModal, setShowHintModal] = useState(false);
  const [showClosureModal, setShowClosureModal] = useState(false);
  const [selectedLabEvidenceId, setSelectedLabEvidenceId] = useState<string>('');
  const [isLabModalOpen, setIsLabModalOpen] = useState(false);

  useEffect(() => {
    if (caseData && !caseSessions[caseData.id]) {
      startCase(caseData.id);
    }
  }, [caseData, caseSessions, startCase]);

  if (!caseData) {
    return (
      <div className="min-h-screen bg-charcoal-950 flex items-center justify-center text-charcoal-400 font-mono text-xs">
        CASE FILE NOT LOCATED // ACCESS REFUSED
      </div>
    );
  }

  const session = caseSessions[caseData.id];
  const discoveredEvidence = caseData.evidence.filter(e => 
    session?.discoveredEvidenceIds.includes(e.id)
  );

  const handleOpenEvidenceInLab = (evId: string) => {
    setSelectedLabEvidenceId(evId);
    setIsLabModalOpen(true);
    if (settings.soundEffects) audioEngine.playCameraShutter();
  };

  const handleFinalSubmit = () => {
    const result = closeAndScoreCase(caseData.id);
    setShowClosureModal(false);
    if (result) {
      navigate(`/results/${caseData.id}`);
    }
  };

  return (
    <div className="h-[calc(100vh-53px)] flex flex-col bg-charcoal-950 overflow-hidden font-mono text-xs select-none">
      {/* Investigation Secondary Sub-Header */}
      <div className="bg-charcoal-900 border-b border-charcoal-750 px-4 py-2 flex flex-wrap items-center justify-between gap-3 shrink-0">
        {/* Case Tag & Title */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="stamp-confidential text-[9px] py-0 px-1 border-evidence-red text-evidence-crimson">
              {caseData.code}
            </span>
            <h2 className="font-display text-sm font-bold text-white tracking-wider uppercase truncate max-w-xs sm:max-w-md">
              {caseData.title}
            </h2>
          </div>
          <span className="hidden xl:inline text-[10px] text-charcoal-500">
            LOC: {caseData.location}
          </span>
        </div>

        {/* Workspace Navigation Tabs */}
        <div className="flex items-center gap-1 bg-charcoal-950 p-1 rounded border border-charcoal-800">
          <button
            onClick={() => {
              setActiveTab('board');
              if (settings.soundEffects) audioEngine.playTypewriterKey();
            }}
            className={`px-2.5 py-1 rounded text-[11px] font-bold flex items-center gap-1.5 transition-colors ${
              activeTab === 'board'
                ? 'bg-charcoal-800 text-white shadow border border-charcoal-700'
                : 'text-charcoal-400 hover:text-charcoal-200'
            }`}
          >
            <Layers className="w-3.5 h-3.5 text-evidence-red" />
            <span className="hidden sm:inline">EVIDENCE BOARD</span>
          </button>

          <button
            onClick={() => {
              setSelectedLabEvidenceId(discoveredEvidence[0]?.id || caseData.evidence[0].id);
              setIsLabModalOpen(true);
              if (settings.soundEffects) audioEngine.playCameraShutter();
            }}
            className={`px-2.5 py-1 rounded text-[11px] font-bold flex items-center gap-1.5 transition-colors ${
              isLabModalOpen
                ? 'bg-charcoal-800 text-white shadow border border-charcoal-700'
                : 'text-charcoal-400 hover:text-charcoal-200'
            }`}
          >
            <Microscope className="w-3.5 h-3.5 text-emerald-400" />
            <span className="hidden sm:inline">FORENSIC LAB</span>
          </button>

          <button
            onClick={() => {
              setActiveTab('interrogation');
              if (settings.soundEffects) audioEngine.playTapeRecorderClick();
            }}
            className={`px-2.5 py-1 rounded text-[11px] font-bold flex items-center gap-1.5 transition-colors ${
              activeTab === 'interrogation'
                ? 'bg-charcoal-800 text-white shadow border border-charcoal-700'
                : 'text-charcoal-400 hover:text-charcoal-200'
            }`}
          >
            <Mic className="w-3.5 h-3.5 text-blue-400" />
            <span className="hidden sm:inline">INTERROGATION</span>
          </button>

          <button
            onClick={() => {
              setActiveTab('timeline');
              if (settings.soundEffects) audioEngine.playTypewriterKey();
            }}
            className={`px-2.5 py-1 rounded text-[11px] font-bold flex items-center gap-1.5 transition-colors ${
              activeTab === 'timeline'
                ? 'bg-charcoal-800 text-white shadow border border-charcoal-700'
                : 'text-charcoal-400 hover:text-charcoal-200'
            }`}
          >
            <Clock className="w-3.5 h-3.5 text-terminal-amber" />
            <span className="hidden sm:inline">TIMELINE</span>
          </button>

          <button
            onClick={() => {
              setActiveTab('deduction');
              if (settings.soundEffects) audioEngine.playTypewriterKey();
            }}
            className={`px-2.5 py-1 rounded text-[11px] font-bold flex items-center gap-1.5 transition-colors ${
              activeTab === 'deduction'
                ? 'bg-charcoal-800 text-white shadow border border-charcoal-700'
                : 'text-charcoal-400 hover:text-charcoal-200'
            }`}
          >
            <Target className="w-3.5 h-3.5 text-purple-400" />
            <span className="hidden sm:inline">DEDUCTION</span>
          </button>
        </div>

        {/* Strategic Actions: Hints & Submit */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowHintModal(true)}
            className="px-2.5 py-1 rounded bg-charcoal-850 hover:bg-charcoal-800 text-amber-300 border border-charcoal-700 flex items-center gap-1.5 text-[11px] transition-colors"
          >
            <HelpCircle className="w-3.5 h-3.5 text-terminal-amber" />
            <span className="hidden md:inline">ADVISORY</span>
          </button>

          <button
            onClick={() => setShowClosureModal(true)}
            className="px-3 py-1 rounded bg-evidence-red hover:bg-evidence-crimson text-white font-bold flex items-center gap-1.5 text-[11px] shadow transition-transform hover:scale-105 active:scale-95"
          >
            <FileCheck className="w-3.5 h-3.5" />
            <span>SUBMIT CASE</span>
          </button>
        </div>
      </div>

      {/* Main Workspace Body */}
      <div className="flex-1 overflow-hidden relative">
        {activeTab === 'board' && (
          <BoardCanvas
            caseId={caseData.id}
            onOpenEvidenceInLab={handleOpenEvidenceInLab}
          />
        )}

        {activeTab === 'interrogation' && (
          <InterrogationRoom
            caseId={caseData.id}
            suspects={caseData.suspects}
            allEvidence={discoveredEvidence}
          />
        )}

        {activeTab === 'timeline' && (
          <TimelineBoard
            caseId={caseData.id}
            initialEvents={caseData.timelineEvents}
          />
        )}

        {activeTab === 'deduction' && (
          <TheoryBoard
            caseId={caseData.id}
            suspects={caseData.suspects}
            allEvidence={discoveredEvidence}
            onSubmitIndictment={() => setShowClosureModal(true)}
          />
        )}
      </div>

      {/* Forensic Laboratory Modal (Can be summoned from board or tab) */}
      <EvidenceLabModal
        caseId={caseData.id}
        allEvidence={discoveredEvidence.length > 0 ? discoveredEvidence : caseData.evidence}
        selectedEvidenceId={selectedLabEvidenceId || caseData.evidence[0].id}
        isOpen={isLabModalOpen}
        onClose={() => setIsLabModalOpen(false)}
        onSelectEvidence={(evId) => setSelectedLabEvidenceId(evId)}
      />

      {/* Hint Modal */}
      <HintModal
        caseId={caseData.id}
        isOpen={showHintModal}
        onClose={() => setShowHintModal(false)}
      />

      {/* Case Closure Indictment Confirmation */}
      <CaseClosureModal
        caseData={caseData}
        isOpen={showClosureModal}
        onClose={() => setShowClosureModal(false)}
        onConfirmSubmit={handleFinalSubmit}
      />
    </div>
  );
};
