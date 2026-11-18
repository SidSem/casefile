import React, { useState } from 'react';
import { Handle, Position } from '@xyflow/react';
import { Pin, Edit2, Check } from 'lucide-react';

interface NoteNodeProps {
  data: {
    id: string;
    title: string;
    snippet: string;
    onUpdateText?: (newText: string) => void;
  };
  selected?: boolean;
}

export const NoteNode: React.FC<NoteNodeProps> = ({ data, selected }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(data.snippet || 'Investigator deduction note...');

  const handleSave = () => {
    setIsEditing(false);
    if (data.onUpdateText) {
      data.onUpdateText(text);
    }
  };

  return (
    <div
      className={`w-56 bg-[#2d291e] border-2 rounded shadow-2xl transition-all duration-200 overflow-hidden font-mono text-xs select-none relative ${
        selected
          ? 'border-terminal-amber shadow-[0_0_20px_rgba(245,158,11,0.5)] scale-105'
          : 'border-[#584f39] hover:border-[#867652]'
      }`}
    >
      <Handle type="target" position={Position.Top} className="!bg-terminal-amber !border-white" />
      <Handle type="source" position={Position.Bottom} className="!bg-terminal-amber !border-white" />
      <Handle type="target" position={Position.Left} className="!bg-terminal-amber !border-white" />
      <Handle type="source" position={Position.Right} className="!bg-terminal-amber !border-white" />

      {/* Red Pushpin Graphic */}
      <div className="absolute -top-2 left-1/2 -translate-x-1/2 z-10">
        <div className="w-3.5 h-3.5 rounded-full bg-evidence-red border-2 border-white shadow-md" />
      </div>

      {/* Note Header */}
      <div className="pt-3 px-3 pb-1 flex items-center justify-between border-b border-[#4d4430]">
        <span className="text-[10px] font-bold text-amber-200 uppercase tracking-wider">
          {data.title || 'INVESTIGATOR NOTE'}
        </span>
        <button
          onClick={() => (isEditing ? handleSave() : setIsEditing(true))}
          className="text-amber-400 hover:text-white"
        >
          {isEditing ? <Check className="w-3 h-3" /> : <Edit2 className="w-3 h-3" />}
        </button>
      </div>

      {/* Note Content */}
      <div className="p-3 bg-[#242016]">
        {isEditing ? (
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={3}
            className="w-full bg-black/40 text-amber-100 p-1.5 rounded border border-amber-800/50 text-[11px] font-mono focus:outline-none"
            placeholder="Type hypothesis..."
          />
        ) : (
          <p className="text-[11px] text-amber-100/90 font-serif italic leading-relaxed">
            "{text}"
          </p>
        )}
      </div>
    </div>
  );
};
