import React from 'react';
import { Handle, Position } from '@xyflow/react';
import { Camera, Eye, MapPin } from 'lucide-react';

interface PhotoNodeProps {
  data: {
    id: string;
    evidenceId?: string;
    title: string;
    category: string;
    snippet: string;
    imageUrl?: string;
    timestamp?: string;
    onInspect?: (evidenceId: string) => void;
  };
  selected?: boolean;
}

export const PhotoNode: React.FC<PhotoNodeProps> = ({ data, selected }) => {
  return (
    <div
      className={`w-64 bg-charcoal-900 border-2 rounded shadow-2xl transition-all duration-200 overflow-hidden font-mono text-xs select-none ${
        selected
          ? 'border-evidence-red shadow-[0_0_20px_rgba(185,28,28,0.5)] scale-105'
          : 'border-charcoal-700 hover:border-charcoal-500'
      }`}
    >
      <Handle type="target" position={Position.Top} className="!bg-evidence-red !border-white" />
      <Handle type="source" position={Position.Bottom} className="!bg-evidence-red !border-white" />
      <Handle type="target" position={Position.Left} className="!bg-evidence-red !border-white" />
      <Handle type="source" position={Position.Right} className="!bg-evidence-red !border-white" />

      {/* Pin Header */}
      <div className="bg-charcoal-850 px-3 py-1.5 border-b border-charcoal-750 flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <Camera className="w-3.5 h-3.5 text-evidence-red" />
          <span className="text-[10px] font-bold text-charcoal-300 uppercase tracking-wider">
            PHOTO EVIDENCE
          </span>
        </div>
        <span className="text-[9px] text-charcoal-500 font-mono">
          {data.timestamp || 'LOGGED'}
        </span>
      </div>

      {/* Photo with Polaroid Border */}
      <div className="p-2 bg-charcoal-950">
        <div className="relative group overflow-hidden rounded bg-black">
          <img
            src={data.imageUrl || 'https://images.unsplash.com/photo-1590496793929-36417d3117de?auto=format&fit=crop&w=600&q=80'}
            alt={data.title}
            className="w-full h-32 object-cover filter contrast-125 grayscale group-hover:grayscale-0 transition-all duration-300"
          />
          <div className="absolute top-1.5 left-1.5 stamp-confidential text-[8px] py-0 px-1 bg-charcoal-950/80">
            EXHIBIT
          </div>
        </div>
      </div>

      {/* Details */}
      <div className="p-3 space-y-1.5 bg-charcoal-900">
        <h4 className="font-bold text-white font-sans text-xs line-clamp-1">
          {data.title}
        </h4>
        <p className="text-[11px] text-charcoal-400 font-sans line-clamp-2 leading-tight">
          {data.snippet}
        </p>

        {data.evidenceId && (
          <div className="pt-2 flex justify-end">
            <span className="text-[10px] text-evidence-crimson font-bold uppercase tracking-wider">
              INSPECT IN LAB →
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
