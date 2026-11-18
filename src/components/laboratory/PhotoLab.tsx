import React, { useState } from 'react';
import { ZoomIn, ZoomOut, RotateCw, Sun, Sparkles, Eye, Check } from 'lucide-react';
import { EvidenceItem } from '../../types/case';
import { useGameStore } from '../../store/useGameStore';
import { audioEngine } from '../../engine/audioEngine';

interface PhotoLabProps {
  evidence: EvidenceItem;
  caseId: string;
}

export const PhotoLab: React.FC<PhotoLabProps> = ({ evidence, caseId }) => {
  const { revealHiddenLayer, settings } = useGameStore();

  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [filterMode, setFilterMode] = useState<'normal' | 'uv' | 'infrared' | 'magnifier'>('normal');
  const [inspectedHotspots, setInspectedHotspots] = useState<string[]>([]);
  const [activeHotspotDetail, setActiveHotspotDetail] = useState<{ label: string; desc: string } | null>(null);

  const handleHotspotClick = (hsId: string, label: string, desc: string) => {
    if (!inspectedHotspots.includes(hsId)) {
      setInspectedHotspots(prev => [...prev, hsId]);
      revealHiddenLayer(caseId, evidence.id);
    }
    setActiveHotspotDetail({ label, desc });
    if (settings.soundEffects) {
      audioEngine.playContradictionStinger();
    }
  };

  const getFilterStyle = () => {
    switch (filterMode) {
      case 'uv':
        return 'contrast(160%) brightness(85%) hue-rotate(240deg) saturate(220%)';
      case 'infrared':
        return 'invert(90%) hue-rotate(180deg) contrast(150%)';
      case 'magnifier':
        return 'contrast(135%) brightness(110%)';
      default:
        return 'none';
    }
  };

  return (
    <div className="space-y-4 font-mono text-xs text-charcoal-200">
      {/* Top Laboratory Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-charcoal-900 p-3 rounded border border-charcoal-750">
        {/* Optical Filters */}
        <div className="flex items-center gap-1.5">
          <span className="text-[10px] text-charcoal-500 uppercase mr-1">SPECTRAL SPECTRUM:</span>
          {(['normal', 'uv', 'infrared', 'magnifier'] as const).map((mode) => (
            <button
              key={mode}
              onClick={() => {
                setFilterMode(mode);
                if (settings.soundEffects) audioEngine.playCameraShutter();
              }}
              className={`px-2.5 py-1 rounded text-[10px] font-bold uppercase transition-colors ${
                filterMode === mode
                  ? mode === 'uv'
                    ? 'bg-purple-950 text-purple-300 border border-purple-500'
                    : mode === 'infrared'
                    ? 'bg-red-950 text-red-300 border border-red-500'
                    : 'bg-charcoal-750 text-white border border-charcoal-600'
                  : 'bg-charcoal-850 text-charcoal-400 hover:text-white'
              }`}
            >
              {mode === 'uv' ? '⚡ UV FLUORESCENCE' : mode === 'infrared' ? '🔥 INFRARED SCAN' : mode === 'magnifier' ? '🔍 ENHANCE' : 'STANDARD'}
            </button>
          ))}
        </div>

        {/* Zoom & Rotation Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setZoom(z => Math.max(0.7, z - 0.2))}
            className="p-1.5 rounded bg-charcoal-850 hover:bg-charcoal-750 text-charcoal-300 hover:text-white border border-charcoal-750"
            title="Zoom Out"
          >
            <ZoomOut className="w-3.5 h-3.5" />
          </button>
          <span className="text-[10px] text-charcoal-400 w-10 text-center">{Math.round(zoom * 100)}%</span>
          <button
            onClick={() => setZoom(z => Math.min(2.5, z + 0.2))}
            className="p-1.5 rounded bg-charcoal-850 hover:bg-charcoal-750 text-charcoal-300 hover:text-white border border-charcoal-750"
            title="Zoom In"
          >
            <ZoomIn className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => setRotation(r => (r + 90) % 360)}
            className="p-1.5 rounded bg-charcoal-850 hover:bg-charcoal-750 text-charcoal-300 hover:text-white border border-charcoal-750 ml-1"
            title="Rotate 90°"
          >
            <RotateCw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Main Photographic Canvas */}
      <div className="relative w-full h-[400px] bg-black rounded border border-charcoal-800 overflow-hidden flex items-center justify-center">
        {/* Film crosshair overlay */}
        <div className="absolute inset-0 pointer-events-none grid grid-cols-3 grid-rows-3 border border-white/5 opacity-40">
          <div className="border-r border-b border-white/5" />
          <div className="border-r border-b border-white/5" />
          <div className="border-b border-white/5" />
          <div className="border-r border-b border-white/5" />
          <div className="border-r border-b border-white/5 flex items-center justify-center">
            <div className="w-8 h-8 border border-evidence-red/40 rounded-full" />
          </div>
          <div className="border-b border-white/5" />
        </div>

        {/* Display Image */}
        <div
          style={{
            transform: `scale(${zoom}) rotate(${rotation}deg)`,
            filter: getFilterStyle(),
            transition: 'transform 0.2s ease-out, filter 0.3s ease-out',
          }}
          className="relative max-w-full max-h-full"
        >
          <img
            src={evidence.imageUrl || 'https://images.unsplash.com/photo-1590496793929-36417d3117de?auto=format&fit=crop&w=1000&q=80'}
            alt={evidence.title}
            className="max-h-[380px] object-contain rounded"
          />

          {/* Forensic Interactive Hotspots */}
          {evidence.hotspots && evidence.hotspots.map((hs) => {
            const isRevealed = inspectedHotspots.includes(hs.id);
            const matchesFilter = !hs.requiresFilter || hs.requiresFilter === filterMode || filterMode === 'magnifier';

            return (
              <div
                key={hs.id}
                onClick={() => handleHotspotClick(hs.id, hs.label, hs.description)}
                style={{ top: `${hs.y}%`, left: `${hs.x}%` }}
                className={`absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer z-30 transition-transform hover:scale-125 ${
                  matchesFilter ? 'opacity-100 pointer-events-auto' : 'opacity-20 pointer-events-none'
                }`}
              >
                <div className={`relative flex items-center justify-center w-7 h-7 rounded-full border-2 ${
                  isRevealed
                    ? 'bg-emerald-950/80 border-emerald-400 text-emerald-300'
                    : 'bg-evidence-red/80 border-white text-white animate-pulse'
                }`}>
                  {isRevealed ? <Check className="w-3.5 h-3.5" /> : <Sparkles className="w-3.5 h-3.5" />}
                  <span className="absolute -top-6 left-1/2 -translate-x-1/2 whitespace-nowrap px-1.5 py-0.5 rounded bg-black/90 border border-charcoal-700 text-[9px] font-bold text-white tracking-widest uppercase">
                    {hs.label}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Filter Indicator Tag */}
        <div className="absolute bottom-3 left-3 bg-charcoal-950/90 border border-charcoal-700 px-2 py-1 rounded text-[10px] flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
          <span>LENS: {filterMode.toUpperCase()} FILTER</span>
        </div>
      </div>

      {/* Hotspot Discovery Readout */}
      {activeHotspotDetail && (
        <div className="p-3 bg-charcoal-900 rounded border-l-4 border-evidence-red space-y-1 animate-in fade-in">
          <div className="flex items-center gap-2">
            <span className="font-bold text-evidence-crimson uppercase tracking-wider text-[11px]">
              MICROSCOPIC DISCOVERY // {activeHotspotDetail.label}
            </span>
          </div>
          <p className="text-charcoal-200 font-sans text-xs leading-relaxed">
            {activeHotspotDetail.desc}
          </p>
        </div>
      )}
    </div>
  );
};
