import React, { useState } from 'react';
import { 
  X, 
  Volume2, 
  Radio, 
  Eye, 
  RotateCcw, 
  AlertTriangle, 
  Check, 
  Sliders 
} from 'lucide-react';
import { useGameStore } from '../store/useGameStore';
import { audioEngine } from '../engine/audioEngine';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onReplayIntro: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({ isOpen, onClose, onReplayIntro }) => {
  const { settings, updateSettings, resetAllProgress } = useGameStore();
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  if (!isOpen) return null;

  const handleReset = () => {
    resetAllProgress();
    setShowResetConfirm(false);
    onClose();
    if (settings.soundEffects) {
      audioEngine.playStampThud();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="w-full max-w-lg bg-charcoal-900 border border-charcoal-700 rounded-sm shadow-2xl p-6 relative font-mono text-xs text-charcoal-200"
        style={{
          backgroundImage: 'radial-gradient(rgba(255, 255, 255, 0.02) 1px, transparent 0)',
          backgroundSize: '16px 16px'
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-charcoal-750 mb-6">
          <div className="flex items-center gap-2">
            <Sliders className="w-4 h-4 text-evidence-red" />
            <h2 className="font-display text-lg tracking-wider text-charcoal-100 uppercase">
              SYSTEM CONFIGURATION // SEC-09
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded hover:bg-charcoal-800 text-charcoal-400 hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Settings Sections */}
        <div className="space-y-6">
          {/* Audio Controls */}
          <div className="space-y-3">
            <div className="text-[11px] font-bold tracking-widest text-charcoal-400 uppercase flex items-center gap-1.5">
              <Volume2 className="w-3.5 h-3.5 text-evidence-crimson" />
              ACOUSTIC & FREQUENCY CONTROLS
            </div>

            <div className="bg-charcoal-850 p-3 rounded border border-charcoal-750 space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-charcoal-200 font-semibold">Sound Effects (SFX)</span>
                  <p className="text-[10px] text-charcoal-500">Tactile typewriter, stamps, cassette reels & forensic cues</p>
                </div>
                <button
                  onClick={() => {
                    const next = !settings.soundEffects;
                    updateSettings({ soundEffects: next });
                    if (next) audioEngine.playTerminalChirp(880);
                  }}
                  className={`w-12 h-6 rounded-full transition-colors relative p-1 ${
                    settings.soundEffects ? 'bg-evidence-red' : 'bg-charcoal-700'
                  }`}
                >
                  <div
                    className={`w-4 h-4 rounded-full bg-white transition-transform ${
                      settings.soundEffects ? 'translate-x-6' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-charcoal-800">
                <div>
                  <span className="text-charcoal-200 font-semibold">Atmospheric Drone</span>
                  <p className="text-[10px] text-charcoal-500">Sub-bass binaural tape drone synthesized via Web Audio</p>
                </div>
                <button
                  onClick={() => {
                    const next = !settings.ambientAudio;
                    updateSettings({ ambientAudio: next });
                  }}
                  className={`w-12 h-6 rounded-full transition-colors relative p-1 ${
                    settings.ambientAudio ? 'bg-emerald-600' : 'bg-charcoal-700'
                  }`}
                >
                  <div
                    className={`w-4 h-4 rounded-full bg-white transition-transform ${
                      settings.ambientAudio ? 'translate-x-6' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>

              {settings.ambientAudio && (
                <div className="pt-2 border-t border-charcoal-800 space-y-1">
                  <div className="flex justify-between text-[10px] text-charcoal-400">
                    <span>Drone Volume</span>
                    <span>{Math.round(settings.ambientVolume * 100)}%</span>
                  </div>
                  <input
                    type="range"
                    min="0.05"
                    max="1.0"
                    step="0.05"
                    value={settings.ambientVolume}
                    onChange={(e) => updateSettings({ ambientVolume: parseFloat(e.target.value) })}
                    className="w-full accent-emerald-500 bg-charcoal-700 h-1 rounded"
                  />
                </div>
              )}
            </div>
          </div>

          {/* Visual & Accessibility */}
          <div className="space-y-3">
            <div className="text-[11px] font-bold tracking-widest text-charcoal-400 uppercase flex items-center gap-1.5">
              <Eye className="w-3.5 h-3.5 text-terminal-amber" />
              VISUAL ACCESSIBILITY
            </div>

            <div className="bg-charcoal-850 p-3 rounded border border-charcoal-750 space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-charcoal-200 font-semibold">Reduced Motion</span>
                  <p className="text-[10px] text-charcoal-500">Disable subtle film grain, flickering, and animated transitions</p>
                </div>
                <button
                  onClick={() => updateSettings({ reducedMotion: !settings.reducedMotion })}
                  className={`w-12 h-6 rounded-full transition-colors relative p-1 ${
                    settings.reducedMotion ? 'bg-evidence-red' : 'bg-charcoal-700'
                  }`}
                >
                  <div
                    className={`w-4 h-4 rounded-full bg-white transition-transform ${
                      settings.reducedMotion ? 'translate-x-6' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-charcoal-800">
                <div>
                  <span className="text-charcoal-200 font-semibold">High Contrast Mode</span>
                  <p className="text-[10px] text-charcoal-500">Elevate border clarity and darken background textures</p>
                </div>
                <button
                  onClick={() => updateSettings({ highContrast: !settings.highContrast })}
                  className={`w-12 h-6 rounded-full transition-colors relative p-1 ${
                    settings.highContrast ? 'bg-evidence-red' : 'bg-charcoal-700'
                  }`}
                >
                  <div
                    className={`w-4 h-4 rounded-full bg-white transition-transform ${
                      settings.highContrast ? 'translate-x-6' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>

          {/* System Maintenance & Replay */}
          <div className="space-y-3">
            <div className="text-[11px] font-bold tracking-widest text-charcoal-400 uppercase">
              ARCHIVE MAINTENANCE
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => {
                  onClose();
                  onReplayIntro();
                }}
                className="flex-1 py-2 px-3 bg-charcoal-800 hover:bg-charcoal-750 border border-charcoal-700 rounded text-charcoal-200 flex items-center justify-center gap-2 transition-colors"
              >
                <Radio className="w-3.5 h-3.5 text-terminal-amber" />
                <span>Replay Classified Intro</span>
              </button>

              <button
                onClick={() => setShowResetConfirm(true)}
                className="py-2 px-3 bg-evidence-burgundy/30 hover:bg-evidence-burgundy/50 border border-evidence-red/40 rounded text-evidence-crimson flex items-center justify-center gap-2 transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Purge Data</span>
              </button>
            </div>
          </div>
        </div>

        {/* Reset Confirmation Overlay */}
        {showResetConfirm && (
          <div className="absolute inset-0 bg-charcoal-950/95 backdrop-blur-md rounded-sm p-6 flex flex-col justify-center items-center text-center space-y-4">
            <AlertTriangle className="w-10 h-10 text-evidence-red animate-bounce" />
            <div>
              <h3 className="font-display text-lg text-white font-bold tracking-wider">
                CONFIRM CLASSIFIED DATA PURGE
              </h3>
              <p className="text-xs text-charcoal-300 mt-1 max-w-xs">
                This will eradicate all local investigator credentials, evidence boards, unlocked cases, and achievements. This action cannot be reversed.
              </p>
            </div>
            <div className="flex items-center gap-3 w-full max-w-xs">
              <button
                onClick={() => setShowResetConfirm(false)}
                className="flex-1 py-2 rounded bg-charcoal-800 hover:bg-charcoal-700 text-charcoal-300 border border-charcoal-600 font-bold"
              >
                CANCEL
              </button>
              <button
                onClick={handleReset}
                className="flex-1 py-2 rounded bg-evidence-red hover:bg-evidence-crimson text-white font-bold shadow-lg"
              >
                PURGE ALL
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
