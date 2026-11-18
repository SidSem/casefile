import React from 'react';
import { Handle, Position } from '@xyflow/react';
import { Skull, AlertOctagon } from 'lucide-react';

interface VictimNodeProps {
  data: {
    id: string;
    title: string;
    snippet: string;
    imageUrl?: string;
  };
  selected?: boolean;
}

export const VictimNode: React.FC<VictimNodeProps> = ({ data, selected }) => {
  return (
    <div
      className={`w-72 bg-charcoal-900 border-2 rounded shadow-2xl transition-all duration-200 overflow-hidden font-mono text-xs select-none ${
        selected
          ? 'border-evidence-red shadow-[0_0_24px_rgba(220,38,38,0.7)] scale-105'
          : 'border-evidence-burgundy hover:border-evidence-red/60'
      }`}
    >
      <Handle type="target" position={Position.Top} className="!bg-evidence-red !border-white" />
      <Handle type="source" position={Position.Bottom} className="!bg-evidence-red !border-white" />
      <Handle type="target" position={Position.Left} className="!bg-evidence-red !border-white" />
      <Handle type="source" position={Position.Right} className="!bg-evidence-red !border-white" />

      {/* Epicenter Header */}
      <div className="bg-evidence-burgundy/40 px-3 py-1.5 border-b border-evidence-red/40 flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <Skull className="w-3.5 h-3.5 text-evidence-red" />
          <span className="text-[10px] font-black text-white uppercase tracking-wider">
            PRIMARY INCIDENT // VICTIM
          </span>
        </div>
        <div className="stamp-classified text-[8px] py-0 px-1">
          DECEASED
        </div>
      </div>

      {/* Image & Profile */}
      <div className="p-3 bg-charcoal-950 space-y-2">
        {data.imageUrl && (
          <div className="relative rounded overflow-hidden h-28 border border-charcoal-800">
            <img
              src={data.imageUrl}
              alt={data.title}
              className="w-full h-full object-cover filter contrast-125 grayscale"
            />
          </div>
        )}
        <div>
          <h3 className="font-display text-base font-bold text-white uppercase">
            {data.title}
          </h3>
          <p className="text-[11px] text-charcoal-300 font-sans mt-0.5 leading-snug">
            {data.snippet}
          </p>
        </div>
      </div>
    </div>
  );
};
