import React, { useState } from 'react';
import { HelpCircle, X, AlertOctagon, Key, ChevronRight, Lock } from 'lucide-react';
import { useGameStore } from '../../store/useGameStore';
import { getCaseById } from '../../data/cases';

interface HintModalProps {
  caseId: string;
  isOpen: boolean;
  onClose: () => void;
}

export const HintModal: React.FC<HintModalProps> = ({ caseId, isOpen, onClose }) => {
  const { caseSessions, useHint, profile } = useGameStore();
  const session = caseSessions[caseId];
  const caseData = getCaseById(caseId);
  const [selectedLevel, setSelectedLevel] = useState<number | null>(null);

  if (!isOpen || !caseData || !session) return null;

  const difficulty = profile?.difficulty || 'detective';
  const penaltyPerHint = difficulty === 'special_agent' ? 80 : difficulty === 'detective' ? 45 : 20;

  const handleReveal = (level: number) => {
    useHint(caseId, level);
    setSelectedLevel(level);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
      <div 
        className="w-full max-w-lg bg-charcoal-900 border border-charcoal-700 rounded-sm shadow-2xl p-6 font-mono text-xs text-charcoal-200"
        style={{
          backgroundImage: 'radial-gradient(rgba(255, 255, 255, 0.02) 1px, transparent 0)',
          backgroundSize: '16px 16px'
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-charcoal-750 mb-4">
          <div className="flex items-center gap-2">
            <HelpCircle className="w-4 h-4 text-terminal-amber" />
            <h2 className="font-display text-base tracking-wider text-charcoal-100 uppercase">
              CLASSIFIED INTELLIGENCE INQUIRY
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded hover:bg-charcoal-800 text-charcoal-400 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Warning Badge */}
        <div className="bg-amber-950/30 border border-amber-800/40 p-2.5 rounded text-[11px] text-amber-200/90 flex items-start gap-2 mb-4">
          <AlertOctagon className="w-4 h-4 text-terminal-amber shrink-0 mt-0.5" />
          <div>
            <span className="font-bold uppercase tracking-wider text-terminal-amber">Caution: Clearance Advisory</span>
            <p className="text-charcoal-300 mt-0.5">
              Accessing advisory intelligence incurs a penalty of <span className="text-white font-bold">-{penaltyPerHint} points</span> on your final evaluation under current difficulty ({difficulty.toUpperCase()}).
            </p>
          </div>
        </div>

        {/* 3 Hint Tiers */}
        <div className="space-y-3">
          {/* Level 1: Nudge */}
          <div className="p-3 bg-charcoal-850 rounded border border-charcoal-750 space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="px-1.5 py-0.5 bg-charcoal-800 border border-charcoal-700 text-charcoal-300 font-bold text-[10px]">
                  LVL 1
                </span>
                <span className="font-bold text-charcoal-200">TACTICAL NUDGE</span>
              </div>
              {session.usedHintLevels.includes(1) ? (
                <span className="text-[10px] text-emerald-400 font-bold uppercase">UNLOCKED</span>
              ) : (
                <button
                  onClick={() => handleReveal(1)}
                  className="px-2.5 py-1 bg-charcoal-800 hover:bg-charcoal-700 border border-charcoal-600 rounded text-charcoal-200 text-[10px] flex items-center gap-1 transition-colors"
                >
                  <Key className="w-3 h-3 text-terminal-amber" />
                  Request Nudge (-{penaltyPerHint} pts)
                </button>
              )}
            </div>
            {session.usedHintLevels.includes(1) && (
              <div className="p-2.5 bg-charcoal-900 border-l-2 border-terminal-amber text-charcoal-200 text-[11px] italic">
                "{caseData.hints.level1}"
              </div>
            )}
          </div>

          {/* Level 2: Guidance */}
          <div className="p-3 bg-charcoal-850 rounded border border-charcoal-750 space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="px-1.5 py-0.5 bg-charcoal-800 border border-charcoal-700 text-charcoal-300 font-bold text-[10px]">
                  LVL 2
                </span>
                <span className="font-bold text-charcoal-200">STRATEGIC GUIDANCE</span>
              </div>
              {session.usedHintLevels.includes(2) ? (
                <span className="text-[10px] text-emerald-400 font-bold uppercase">UNLOCKED</span>
              ) : (
                <button
                  onClick={() => handleReveal(2)}
                  className="px-2.5 py-1 bg-charcoal-800 hover:bg-charcoal-700 border border-charcoal-600 rounded text-charcoal-200 text-[10px] flex items-center gap-1 transition-colors"
                >
                  <Key className="w-3 h-3 text-terminal-amber" />
                  Request Guidance (-{penaltyPerHint} pts)
                </button>
              )}
            </div>
            {session.usedHintLevels.includes(2) && (
              <div className="p-2.5 bg-charcoal-900 border-l-2 border-terminal-amber text-charcoal-200 text-[11px] italic">
                "{caseData.hints.level2}"
              </div>
            )}
          </div>

          {/* Level 3: Revelation */}
          <div className="p-3 bg-charcoal-850 rounded border border-charcoal-750 space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="px-1.5 py-0.5 bg-evidence-burgundy/40 border border-evidence-red/40 text-evidence-crimson font-bold text-[10px]">
                  LVL 3
                </span>
                <span className="font-bold text-charcoal-200">DIRECT REVELATION</span>
              </div>
              {session.usedHintLevels.includes(3) ? (
                <span className="text-[10px] text-evidence-crimson font-bold uppercase">UNLOCKED</span>
              ) : (
                <button
                  onClick={() => handleReveal(3)}
                  className="px-2.5 py-1 bg-evidence-burgundy/30 hover:bg-evidence-burgundy/50 border border-evidence-red/40 rounded text-evidence-crimson text-[10px] flex items-center gap-1 transition-colors"
                >
                  <Key className="w-3 h-3 text-evidence-red" />
                  Request Revelation (-{penaltyPerHint} pts)
                </button>
              )}
            </div>
            {session.usedHintLevels.includes(3) && (
              <div className="p-2.5 bg-charcoal-900 border-l-2 border-evidence-red text-charcoal-200 text-[11px] italic">
                "{caseData.hints.level3}"
              </div>
            )}
          </div>
        </div>

        {/* Footer info */}
        <div className="mt-5 pt-3 border-t border-charcoal-800 flex items-center justify-between text-[11px] text-charcoal-500">
          <span>Hints consumed: {session.hintsUsedCount}</span>
          <button
            onClick={onClose}
            className="px-3 py-1 bg-charcoal-800 hover:bg-charcoal-750 text-charcoal-200 rounded border border-charcoal-700"
          >
            RETURN TO DESK
          </button>
        </div>
      </div>
    </div>
  );
};
