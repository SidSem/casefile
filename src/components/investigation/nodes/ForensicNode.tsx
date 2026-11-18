import React from 'react';
import { Handle, Position } from '@xyflow/react';
import { Microscope, Activity, Dna } from 'lucide-react';

interface ForensicNodeProps {
  data: {
    id: string;
    evidenceId?: string;
    title: string;
    snippet: string;
    category?: string;
    timestamp?: string;
  };
  selected?: boolean;
}

export const ForensicNode: React.FC<ForensicNodeProps> = ({ data, selected }) => {
  return (
    <div
      className={`w-64 bg-charcoal-900 border-2 rounded shadow-2xl transition-all duration-200 overflow-hidden font-mono text-xs select-none ${
        selected
          ? 'border-emerald-500 shadow-[0_0_20px_rgba(16,185,129,0.5)] scale-105'
          : 'border-emerald-950/60 hover:border-emerald-700/60'
      }`}
    >
      <Handle type="target" position={Position.Top} className="!bg-emerald-500 !border-white" />
      <Handle type="source" position={Position.Bottom} className="!bg-emerald-500 !border-white" />
      <Handle type="target" position={Position.Left} className="!bg-emerald-500 !border-white" />
      <Handle type="source" position={Position.Right} className="!bg-emerald-500 !border-white" />

      {/* Lab Header */}
      <div className="bg-emerald-950/40 px-3 py-1.5 border-b border-emerald-900/50 flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <Microscope className="w-3.5 h-3.5 text-emerald-400" />
          <span className="text-[10px] font-bold text-emerald-300 uppercase tracking-wider">
            FORENSIC REPORT
          </span>
        </div>
        <span className="text-[9px] text-emerald-500 font-mono">
          {data.category?.toUpperCase() || 'LAB'}
        </span>
      </div>

      {/* Lab Specimen Body */}
      <div className="p-3 space-y-2 bg-charcoal-900">
        <div className="flex items-center justify-between">
          <span className="stamp-verified text-[8px] py-0 px-1 border-emerald-500 text-emerald-400">
            VERIFIED
          </span>
          <span className="text-[9px] text-emerald-500 font-mono">LAB SEQ: #904</span>
        </div>

        <h4 className="font-bold text-white font-sans text-xs">
          {data.title}
        </h4>
        <p className="text-[11px] text-charcoal-300 font-sans line-clamp-3 bg-charcoal-950 p-2 rounded border border-charcoal-800">
          {data.snippet}
        </p>

        {data.evidenceId && (
          <div className="pt-1 flex justify-end">
            <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-wider">
              VIEW LAB METRICS →
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
