import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Terminal, ArrowRight, SkipForward } from 'lucide-react';
import { useGameStore } from '../store/useGameStore';
import { audioEngine } from '../engine/audioEngine';

export const IntroPage: React.FC = () => {
  const navigate = useNavigate();
  const { profile, settings, updateSettings } = useGameStore();

  const [step, setStep] = useState(0);
  const [lines, setLines] = useState<string[]>([]);
  const [isGlitching, setIsGlitching] = useState(false);

  const script = [
    'RESTRICTED ACCESS // LEVEL 04',
    'FEDERAL CRIMINAL INVESTIGATION ARCHIVE',
    'INITIALIZING SECURE QUANTUM ENCRYPTION...',
    'NEURAL CLEARANCE HASH: 0x99B-883F-VALID',
    'IDENTITY VERIFIED // CLEARANCE LEVEL: AUTHORIZED',
    'LOADING DECLASSIFIED DOSSIERS...',
  ];

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;

    if (step < script.length) {
      timer = setTimeout(() => {
        setLines(prev => [...prev, script[step]]);
        if (settings.soundEffects) {
          audioEngine.playTypewriterKey();
        }
        setStep(prev => prev + 1);
      }, 700);
    } else if (step === script.length) {
      // Glitch trigger and reveal title
      timer = setTimeout(() => {
        setIsGlitching(true);
        if (settings.soundEffects) {
          audioEngine.playContradictionStinger();
        }
        setStep(prev => prev + 1);
      }, 800);
    } else if (step === script.length + 1) {
      // Transition out
      timer = setTimeout(() => {
        finishIntro();
      }, 2600);
    }

    return () => clearTimeout(timer);
  }, [step]);

  const finishIntro = () => {
    updateSettings({ introCompleted: true });
    if (profile) {
      navigate('/hq');
    } else {
      navigate('/onboarding');
    }
  };

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center p-6 text-charcoal-200 font-mono relative overflow-hidden select-none">
      {/* Background scanline subtle */}
      <div className="absolute inset-0 bg-radial-gradient opacity-60 pointer-events-none" />

      {/* Skip Button */}
      <button
        onClick={() => {
          if (settings.soundEffects) audioEngine.playTerminalChirp(600);
          finishIntro();
        }}
        className="absolute top-6 right-6 px-3 py-1.5 rounded border border-charcoal-800 hover:border-charcoal-600 text-charcoal-500 hover:text-charcoal-200 text-xs flex items-center gap-1.5 transition-colors z-20"
      >
        <span>SKIP SEQUENCE</span>
        <SkipForward className="w-3.5 h-3.5" />
      </button>

      {/* Main Terminal Window */}
      <div className="w-full max-w-xl bg-charcoal-950/90 border border-charcoal-800 rounded p-6 shadow-2xl relative z-10 space-y-4">
        {/* Terminal Header */}
        <div className="flex items-center justify-between pb-3 border-b border-charcoal-800 text-[11px] text-charcoal-500">
          <div className="flex items-center gap-2">
            <Terminal className="w-3.5 h-3.5 text-evidence-red" />
            <span>ARCHIVE://TERMINAL-09</span>
          </div>
          <span className="animate-pulse text-emerald-500">● ONLINE</span>
        </div>

        {/* Boot Sequence Lines */}
        <div className="space-y-2 min-h-[160px] text-xs">
          {lines.map((line, idx) => (
            <div key={idx} className="flex items-start gap-2">
              <span className="text-evidence-red font-bold select-none">&gt;</span>
              <span className={idx === lines.length - 1 ? 'text-charcoal-100 font-bold' : 'text-charcoal-400'}>
                {line}
              </span>
            </div>
          ))}
          {step <= script.length && (
            <div className="flex items-center gap-1 text-evidence-red">
              <span>&gt;</span>
              <span className="w-2 h-4 bg-evidence-red animate-pulse" />
            </div>
          )}
        </div>

        {/* Title Reveal with Restrained Glitch */}
        {step > script.length && (
          <div className={`pt-6 border-t border-charcoal-800 text-center space-y-3 transition-opacity duration-500 ${isGlitching ? 'opacity-100' : 'opacity-0'}`}>
            <div className="inline-block relative">
              <h1 className="font-display text-4xl sm:text-5xl font-black tracking-widest text-white uppercase drop-shadow-[0_0_15px_rgba(185,28,28,0.6)]">
                CASEFILE <span className="text-evidence-red">09</span>
              </h1>
              <div className="stamp-confidential absolute -top-3 -right-6 text-[10px] scale-90">
                RESTRICTED
              </div>
            </div>
            <p className="text-xs font-serif italic text-charcoal-300 tracking-wide">
              "Every clue tells a story. Not every story tells the truth."
            </p>
            <div className="pt-4">
              <button
                onClick={finishIntro}
                className="px-6 py-2.5 bg-evidence-red hover:bg-evidence-crimson text-white font-display text-sm tracking-widest uppercase rounded shadow-lg flex items-center gap-2 mx-auto transition-transform hover:scale-105 active:scale-95"
              >
                <span>ENTER HEADQUARTERS</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Footer watermark */}
      <div className="mt-8 text-center text-[10px] text-charcoal-600 font-mono tracking-widest uppercase">
        FEDERAL ARCHIVES SYSTEM // CODEX 440-J // ALL SESSIONS LOGGED
      </div>
    </div>
  );
};
