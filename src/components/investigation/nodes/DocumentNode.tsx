import React from 'react';
import { Handle, Position } from '@xyflow/react';
import { FileText, ShieldAlert } from 'lucide-react';

interface DocumentNodeProps {
  data: {
    id: string;
    evidenceId?: string;
    title: string;
    snippet: string;
    timestamp?: string;
  };
  selected?: boolean;
}

export const DocumentNode: React.FC<DocumentNodeProps> = ({ data, selected }) => {
  return (
    <div
      className={`w-64 bg-[#15181f] border-2 rounded shadow-2xl transition-all duration-200 overflow-hidden font-mono text-xs select-none ${
        selected
          ? 'border-evidence-red shadow-[0_0_20px_rgba(185,28,28,0.5)] scale-105'
          : 'border-charcoal-700 hover:border-charcoal-500'
      }`}
    >
      <Handle type="target" position={Position.Top} className="!bg-evidence-red !border-white" />
      <Handle type="source" position={Position.Bottom} className="!bg-evidence-red !border-white" />
      <Handle type="target" position={Position.Left} className="!bg-evidence-red !border-white" />
      <Handle type="source" position={Position.Right} className="!bg-evidence-red !border-white" />

      {/* Manila / Document Header */}
      <div className="bg-[#212631] px-3 py-1.5 border-b border-[#2e3545] flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <FileText className="w-3.5 h-3.5 text-terminal-amber" />
          <span className="text-[10px] font-bold text-[#d1d5db] uppercase tracking-wider">
            CLASSIFIED RECORD
          </span>
        </div>
        <span className="text-[9px] text-[#9ca3af] font-mono">
          {data.timestamp || 'DOC-44'}
        </span>
      </div>

      {/* Document Body */}
      <div className="p-3 space-y-2 bg-[#12151b]">
        <div className="flex items-center justify-between">
          <div className="stamp-confidential text-[8px] py-0 px-1 border-evidence-red/60 text-evidence-red">
            CONFIDENTIAL
          </div>
          <span className="text-[9px] text-charcoal-500">DEPT // INTEL</span>
        </div>

        <h4 className="font-bold text-white font-sans text-xs leading-snug">
          {data.title}
        </h4>
        <p className="text-[11px] text-charcoal-300 font-mono leading-relaxed line-clamp-3 bg-charcoal-950/60 p-2 rounded border border-charcoal-800">
          "{data.snippet}"
        </p>

        {data.evidenceId && (
          <div className="pt-1 flex justify-end">
            <span className="text-[10px] text-terminal-amber font-bold uppercase tracking-wider">
              OPEN IN LAB →
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
