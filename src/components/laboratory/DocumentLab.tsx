import React, { useState } from 'react';
import { FileText, Eye, ShieldCheck, Key, Lock, Layers } from 'lucide-react';
import { EvidenceItem } from '../../types/case';
import { useGameStore } from '../../store/useGameStore';
import { audioEngine } from '../../engine/audioEngine';

interface DocumentLabProps {
  evidence: EvidenceItem;
  caseId: string;
}

export const DocumentLab: React.FC<DocumentLabProps> = ({ evidence, caseId }) => {
  const { revealHiddenLayer, settings } = useGameStore();
  const [unredactedLines, setUnredactedLines] = useState<number[]>([]);
  const [showMetadata, setShowMetadata] = useState(true);

  const toggleRedaction = (lineIdx: number) => {
    if (!unredactedLines.includes(lineIdx)) {
      setUnredactedLines(prev => [...prev, lineIdx]);
      revealHiddenLayer(caseId, evidence.id);
      if (settings.soundEffects) audioEngine.playTypewriterKey();
    }
  };

  const lines = evidence.documentContent || [
    'RECORD IDENTIFIER: ' + evidence.id,
    'LOGGED LOCATION: ' + evidence.location,
    'SUMMARY: ' + evidence.description,
    'ANALYSIS: ' + (evidence.detailedAnalysis || 'Classified forensic document in file archives.')
  ];

  return (
    <div className="space-y-4 font-mono text-xs text-charcoal-200">
      {/* Top Toolbar */}
      <div className="flex items-center justify-between bg-charcoal-900 p-3 rounded border border-charcoal-750">
        <div className="flex items-center gap-2">
          <FileText className="w-4 h-4 text-terminal-amber" />
          <span className="font-bold text-white uppercase tracking-wider">
            OPTICAL DOCUMENT DECRYPTOR
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowMetadata(!showMetadata)}
            className={`px-2.5 py-1 rounded text-[10px] font-bold border transition-colors ${
              showMetadata
                ? 'bg-charcoal-750 text-white border-charcoal-600'
                : 'bg-charcoal-850 text-charcoal-400 border-charcoal-800'
            }`}
          >
            METADATA {showMetadata ? 'SHOWN' : 'HIDDEN'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Scanned Document Parchment */}
        <div className="md:col-span-2 bg-[#f3ece0] text-[#1c1917] p-6 rounded border-2 border-[#d4c5a0] shadow-xl relative min-h-[360px] font-typewriter">
          {/* Header watermark */}
          <div className="flex items-center justify-between border-b-2 border-[#b8a67c] pb-3 mb-4">
            <div>
              <div className="text-[10px] font-mono tracking-widest text-[#786b4d] uppercase font-bold">
                FEDERAL CLASSIFIED DOCUMENT // DIVISION 09
              </div>
              <div className="text-base font-bold uppercase tracking-wider text-[#1c1917]">
                {evidence.title}
              </div>
            </div>
            <div className="stamp-confidential text-[9px] py-0 px-1 border-evidence-red text-evidence-red font-mono font-bold">
              TOP SECRET
            </div>
          </div>

          {/* Document Content Lines */}
          <div className="space-y-3 leading-relaxed text-sm">
            {lines.map((line, idx) => {
              const isRedactedLine = idx === 1 || idx === lines.length - 1;
              const isRevealed = unredactedLines.includes(idx);

              return (
                <div key={idx} className="relative group">
                  {isRedactedLine && !isRevealed ? (
                    <div
                      onClick={() => toggleRedaction(idx)}
                      className="cursor-pointer bg-black text-black select-none px-2 py-0.5 rounded hover:bg-neutral-800 transition-colors inline-block tracking-widest text-xs"
                      title="Click to decode redaction with optical decryptor"
                    >
                      ██████████████████████████████████████████
                      <span className="ml-2 text-[9px] font-mono text-amber-300 font-bold underline">
                        [CLICK TO DECRYPT REDACTION]
                      </span>
                    </div>
                  ) : (
                    <div className={isRevealed ? 'bg-amber-100/70 p-1 border-l-2 border-evidence-red' : ''}>
                      {line}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Bottom Official Seal */}
          <div className="pt-8 mt-6 border-t border-[#b8a67c]/60 flex items-center justify-between text-[10px] text-[#786b4d] font-mono">
            <span>CHAIN OF CUSTODY VERIFIED</span>
            <span className="font-bold text-[#1c1917]">SEAL #77-09-FED</span>
          </div>
        </div>

        {/* Forensic Metadata Inspector */}
        {showMetadata && (
          <div className="bg-charcoal-900 p-4 rounded border border-charcoal-750 space-y-4 font-mono text-xs">
            <div className="border-b border-charcoal-800 pb-2">
              <span className="text-[10px] text-evidence-red font-bold uppercase tracking-wider">
                FORENSIC METADATA AUDIT
              </span>
              <div className="font-bold text-white mt-0.5">FILE RECORD ANALYSIS</div>
            </div>

            <div className="space-y-2 text-[11px]">
              <div>
                <span className="text-charcoal-500 block text-[9px]">EVIDENCE REPOSITORY ID:</span>
                <span className="text-charcoal-200 font-mono font-bold">{evidence.id}</span>
              </div>
              <div>
                <span className="text-charcoal-500 block text-[9px]">ORIGIN RECOVERY POINT:</span>
                <span className="text-charcoal-200">{evidence.location}</span>
              </div>
              <div>
                <span className="text-charcoal-500 block text-[9px]">CHAIN OF CUSTODY TIME:</span>
                <span className="text-charcoal-200">{evidence.timestamp}</span>
              </div>
              <div>
                <span className="text-charcoal-500 block text-[9px]">INTEGRITY HASH:</span>
                <span className="text-emerald-400 font-mono text-[10px]">
                  SHA256: 9b8e...33fa (AUTHENTIC)
                </span>
              </div>
            </div>

            <div className="p-3 bg-charcoal-950 rounded border border-charcoal-800 space-y-1.5">
              <div className="flex items-center gap-1.5 text-terminal-amber font-bold text-[10px]">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>INVESTIGATOR INSTRUCTION</span>
              </div>
              <p className="text-[10px] text-charcoal-400 leading-normal">
                Click any blackened redactions on the paper to run spectral character recovery. Compare statements against suspect interrogation claims.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
