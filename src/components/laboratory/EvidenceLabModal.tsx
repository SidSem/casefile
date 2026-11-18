import React, { useState } from 'react';
import { X, Microscope, Camera, FileText, Activity, Pin, CheckCircle2, ChevronRight } from 'lucide-react';
import { EvidenceItem } from '../../types/case';
import { PhotoLab } from './PhotoLab';
import { DocumentLab } from './DocumentLab';
import { ForensicReportsLab } from './ForensicReportsLab';
import { useGameStore } from '../../store/useGameStore';
import { audioEngine } from '../../engine/audioEngine';

interface EvidenceLabModalProps {
  caseId: string;
  allEvidence: EvidenceItem[];
  selectedEvidenceId: string;
  isOpen: boolean;
  onClose: () => void;
  onSelectEvidence: (evId: string) => void;
}

export const EvidenceLabModal: React.FC<EvidenceLabModalProps> = ({
  caseId,
  allEvidence,
  selectedEvidenceId,
  isOpen,
  onClose,
  onSelectEvidence,
}) => {
  const { pinClueToBoard, caseSessions, settings } = useGameStore();
  const session = caseSessions[caseId];

  // Active laboratory tab
  const [activeTab, setActiveTab] = useState<'photo' | 'document' | 'forensic'>('photo');

  if (!isOpen) return null;

  const currentEvidence = allEvidence.find(e => e.id === selectedEvidenceId) || allEvidence[0];
  const isPinned = session?.boardNodes.some(n => n.id === currentEvidence?.id);

  const handlePin = () => {
    if (!currentEvidence) return;
    pinClueToBoard(caseId, currentEvidence.id, currentEvidence.category);
    if (settings.soundEffects) audioEngine.playStampThud();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in">
      <div 
        className="w-full max-w-6xl h-[90vh] bg-charcoal-900 border-2 border-charcoal-700 rounded shadow-2xl flex flex-col overflow-hidden font-mono text-xs text-charcoal-200"
        style={{
          backgroundImage: 'radial-gradient(rgba(255, 255, 255, 0.02) 1px, transparent 0)',
          backgroundSize: '16px 16px'
        }}
      >
        {/* Lab Top Header */}
        <div className="px-5 py-3 bg-charcoal-950 border-b border-charcoal-750 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5">
            <Microscope className="w-5 h-5 text-emerald-400" />
            <div>
              <h2 className="font-display text-base sm:text-lg font-bold text-white tracking-wider uppercase">
                CRIMINALISTICS FORENSIC LABORATORY // DEPT 09
              </h2>
              <p className="text-[10px] text-charcoal-400">
                SPECTRAL, BIOMETRIC & DOCUMENT EXAMINATION WORKSTATION
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {currentEvidence && (
              <button
                onClick={handlePin}
                disabled={isPinned}
                className={`px-3 py-1.5 rounded flex items-center gap-1.5 font-bold transition-all ${
                  isPinned
                    ? 'bg-charcoal-800 text-charcoal-500 border border-charcoal-700 cursor-not-allowed'
                    : 'bg-evidence-burgundy/40 text-evidence-crimson hover:bg-evidence-burgundy/60 border border-evidence-red/50 shadow'
                }`}
              >
                <Pin className="w-3.5 h-3.5" />
                <span>{isPinned ? 'PINNED TO BOARD' : 'PIN TO EVIDENCE BOARD'}</span>
              </button>
            )}

            <button
              onClick={onClose}
              className="p-1 rounded hover:bg-charcoal-800 text-charcoal-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Main Split Body: Evidence Selector Sidebar + Forensic Workspace */}
        <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
          {/* Left Evidence Drawer Sidebar */}
          <div className="w-full md:w-64 bg-charcoal-950/90 border-r border-charcoal-800 p-3 overflow-y-auto space-y-1.5 shrink-0">
            <div className="text-[10px] font-bold text-charcoal-400 uppercase tracking-widest pb-1 border-b border-charcoal-800 mb-2">
              EXAMINATION QUEUE ({allEvidence.length})
            </div>

            {allEvidence.map((ev) => {
              const isSelected = ev.id === currentEvidence?.id;
              return (
                <div
                  key={ev.id}
                  onClick={() => {
                    onSelectEvidence(ev.id);
                    if (settings.soundEffects) audioEngine.playTerminalChirp(700);
                  }}
                  className={`p-2.5 rounded cursor-pointer transition-all border ${
                    isSelected
                      ? 'bg-charcoal-800 border-evidence-red/60 text-white shadow-[0_0_8px_rgba(185,28,28,0.2)]'
                      : 'bg-charcoal-900/60 border-charcoal-800 text-charcoal-400 hover:text-charcoal-200 hover:border-charcoal-700'
                  }`}
                >
                  <div className="flex items-center justify-between text-[9px] font-mono text-evidence-red">
                    <span>{ev.category.toUpperCase()}</span>
                    <span>{ev.timestamp}</span>
                  </div>
                  <div className="font-bold text-[11px] font-sans truncate mt-0.5">{ev.title}</div>
                  <div className="text-[9px] text-charcoal-500 truncate">{ev.location}</div>
                </div>
              );
            })}
          </div>

          {/* Right Examination Suite */}
          <div className="flex-1 flex flex-col overflow-y-auto p-4 sm:p-6 bg-charcoal-900/50">
            {currentEvidence ? (
              <div className="space-y-4">
                {/* Mode Selector Tabs */}
                <div className="flex items-center gap-2 border-b border-charcoal-750 pb-3">
                  <button
                    onClick={() => setActiveTab('photo')}
                    className={`px-3 py-1.5 rounded flex items-center gap-1.5 font-bold transition-colors ${
                      activeTab === 'photo'
                        ? 'bg-charcoal-750 text-white border border-charcoal-600'
                        : 'text-charcoal-400 hover:text-white'
                    }`}
                  >
                    <Camera className="w-3.5 h-3.5 text-blue-400" />
                    <span>PHOTOGRAPHIC LENS</span>
                  </button>

                  <button
                    onClick={() => setActiveTab('document')}
                    className={`px-3 py-1.5 rounded flex items-center gap-1.5 font-bold transition-colors ${
                      activeTab === 'document'
                        ? 'bg-charcoal-750 text-white border border-charcoal-600'
                        : 'text-charcoal-400 hover:text-white'
                    }`}
                  >
                    <FileText className="w-3.5 h-3.5 text-amber-400" />
                    <span>DOCUMENT & METADATA</span>
                  </button>

                  {currentEvidence.forensicReport && (
                    <button
                      onClick={() => setActiveTab('forensic')}
                      className={`px-3 py-1.5 rounded flex items-center gap-1.5 font-bold transition-colors ${
                        activeTab === 'forensic'
                          ? 'bg-emerald-950 text-emerald-300 border border-emerald-600'
                          : 'text-emerald-400/80 hover:text-emerald-300'
                      }`}
                    >
                      <Activity className="w-3.5 h-3.5 text-emerald-400" />
                      <span>LAB INSTRUMENT METRICS</span>
                    </button>
                  )}
                </div>

                {/* Tab Views */}
                {activeTab === 'photo' && (
                  <PhotoLab evidence={currentEvidence} caseId={caseId} />
                )}

                {activeTab === 'document' && (
                  <DocumentLab evidence={currentEvidence} caseId={caseId} />
                )}

                {activeTab === 'forensic' && currentEvidence.forensicReport && (
                  <ForensicReportsLab 
                    forensicReport={currentEvidence.forensicReport} 
                    evidenceTitle={currentEvidence.title} 
                  />
                )}
              </div>
            ) : (
              <div className="flex-1 flex items-center justify-center text-charcoal-500 font-mono">
                SELECT SPECIMEN FROM LEFT QUEUE TO BEGIN ANALYSIS
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
