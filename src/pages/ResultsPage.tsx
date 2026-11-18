import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import confetti from 'canvas-confetti';
import { 
  Award, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  ShieldAlert, 
  Briefcase, 
  ArrowRight, 
  RotateCcw,
  Sparkles,
  Layers
} from 'lucide-react';
import { getCaseById } from '../data/cases';
import { useGameStore } from '../store/useGameStore';
import { audioEngine } from '../engine/audioEngine';

export const ResultsPage: React.FC = () => {
  const { caseId } = useParams<{ caseId: string }>();
  const { completedCases, profile, settings } = useGameStore();

  const caseData = caseId ? getCaseById(caseId) : null;
  const result = caseId ? completedCases[caseId] : null;

  useEffect(() => {
    if (result && result.outcomeTier === 'perfect') {
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#dc2626', '#10b981', '#f59e0b', '#ffffff'],
      });
      if (settings.soundEffects) {
        audioEngine.playStampThud();
      }
    }
  }, [result, settings.soundEffects]);

  if (!caseData || !result) {
    return (
      <div className="min-h-screen bg-charcoal-950 flex items-center justify-center text-charcoal-400 font-mono text-xs">
        AFTER-ACTION REPORT NOT YET FILED // COMPLETE INVESTIGATION FIRST
      </div>
    );
  }

  const narrative = caseData.narrativeConsequences[result.outcomeTier];

  return (
    <div className="min-h-screen bg-charcoal-950 p-4 sm:p-6 lg:p-8 font-mono text-xs text-charcoal-300 max-w-4xl mx-auto space-y-6">
      {/* Top Formal Dossier Header */}
      <div className="bg-charcoal-900 border-2 border-charcoal-700 rounded p-6 sm:p-8 space-y-6 shadow-2xl relative overflow-hidden">
        {/* Classification Seal Banner */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-charcoal-750 gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="stamp-classified text-xs">OFFICIAL AAR REPORT</span>
              <span className="text-[10px] text-charcoal-500 font-bold uppercase">
                DOSSIER REF: {caseData.code} // CLOSED
              </span>
            </div>
            <h1 className="font-display text-2xl sm:text-3xl font-black text-white tracking-wider uppercase">
              INVESTIGATION AFTER-ACTION REPORT
            </h1>
          </div>

          <div className="text-right">
            <span className="text-[10px] text-charcoal-500 block uppercase">AWARDED RANK</span>
            <div className="font-display text-lg font-bold text-evidence-red uppercase">
              {result.rankAwarded}
            </div>
          </div>
        </div>

        {/* Narrative Outcome & Grand Jury Verdict */}
        <div className={`p-5 rounded border ${
          result.outcomeTier === 'perfect'
            ? 'bg-emerald-950/30 border-emerald-600/70'
            : result.outcomeTier === 'partial'
            ? 'bg-amber-950/30 border-amber-600/70'
            : 'bg-red-950/30 border-red-600/70'
        }`}>
          <div className="flex items-center justify-between mb-2">
            <div className={`font-display text-lg font-bold uppercase ${
              result.outcomeTier === 'perfect' ? 'text-emerald-400' : result.outcomeTier === 'partial' ? 'text-terminal-amber' : 'text-evidence-red'
            }`}>
              {narrative.title}
            </div>
            <span className="stamp-solved text-[10px] py-0 px-2">
              {narrative.verdict}
            </span>
          </div>

          <p className="text-charcoal-200 font-sans text-sm leading-relaxed mt-2">
            {narrative.description}
          </p>
        </div>

        {/* Score & Metrics Breakdown */}
        <div className="space-y-4">
          <div className="flex items-center justify-between border-b border-charcoal-800 pb-2">
            <span className="font-bold text-white uppercase tracking-wider text-xs flex items-center gap-1.5">
              <Award className="w-4 h-4 text-terminal-amber" />
              INVESTIGATOR PERFORMANCE METRICS
            </span>
            <div className="text-right">
              <span className="text-xs text-charcoal-500">FINAL EVALUATION: </span>
              <span className="font-display text-xl font-bold text-white">{result.totalScore} / 1000</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-[11px]">
            <div className="bg-charcoal-850 p-3 rounded border border-charcoal-750 flex items-center justify-between">
              <span className="text-charcoal-400">Culprit Identification</span>
              <span className={`font-bold flex items-center gap-1 ${result.culpritCorrect ? 'text-emerald-400' : 'text-evidence-red'}`}>
                {result.culpritCorrect ? <CheckCircle2 className="w-3.5 h-3.5" /> : <XCircle className="w-3.5 h-3.5" />}
                {result.culpritCorrect ? 'CORRECT' : 'INCORRECT'}
              </span>
            </div>

            <div className="bg-charcoal-850 p-3 rounded border border-charcoal-750 flex items-center justify-between">
              <span className="text-charcoal-400">Motive Authenticity</span>
              <span className={`font-bold flex items-center gap-1 ${result.motiveCorrect ? 'text-emerald-400' : 'text-terminal-amber'}`}>
                {result.motiveCorrect ? <CheckCircle2 className="w-3.5 h-3.5" /> : <XCircle className="w-3.5 h-3.5" />}
                {result.motiveCorrect ? 'AUTHENTIC' : 'PARTIAL / WEAK'}
              </span>
            </div>

            <div className="bg-charcoal-850 p-3 rounded border border-charcoal-750 flex items-center justify-between">
              <span className="text-charcoal-400">Physical Evidence Accuracy</span>
              <span className="font-bold text-white">{result.evidenceAccuracyScore}%</span>
            </div>

            <div className="bg-charcoal-850 p-3 rounded border border-charcoal-750 flex items-center justify-between">
              <span className="text-charcoal-400">Timeline Reconstruction</span>
              <span className="font-bold text-white">{result.timelineAccuracyScore}%</span>
            </div>

            <div className="bg-charcoal-850 p-3 rounded border border-charcoal-750 flex items-center justify-between">
              <span className="text-charcoal-400">Interrogation Performance</span>
              <span className="font-bold text-white">{result.interrogationScore}%</span>
            </div>

            <div className="bg-charcoal-850 p-3 rounded border border-charcoal-750 flex items-center justify-between">
              <span className="text-charcoal-400">Intelligence Hints Penalty</span>
              <span className={`font-bold ${result.hintPenalty > 0 ? 'text-evidence-crimson' : 'text-emerald-400'}`}>
                {result.hintCountUsed > 0 ? `-${result.hintPenalty} PTS (${result.hintCountUsed} Hints)` : '0 (NO HINTS USED)'}
              </span>
            </div>
          </div>
        </div>

        {/* Unlocked Achievements */}
        {result.unlockedAchievements.length > 0 && (
          <div className="p-4 bg-charcoal-950 rounded border border-charcoal-800 space-y-2">
            <span className="text-[10px] text-terminal-amber font-bold uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-terminal-amber" />
              COMMENDATIONS AWARDED
            </span>
            <div className="flex flex-wrap gap-2 pt-1">
              {result.unlockedAchievements.map((achId) => (
                <span
                  key={achId}
                  className="px-2.5 py-1 rounded bg-amber-950/40 text-amber-200 border border-amber-800/60 font-bold text-[10px] uppercase tracking-wider"
                >
                  ★ {achId.replace(/_/g, ' ')}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Bottom Actions */}
        <div className="pt-4 border-t border-charcoal-750 flex flex-col sm:flex-row items-center justify-between gap-4">
          <Link
            to="/hq"
            className="w-full sm:w-auto px-6 py-2.5 bg-charcoal-800 hover:bg-charcoal-750 text-charcoal-200 rounded font-mono text-center border border-charcoal-700 transition-colors"
          >
            RETURN TO HEADQUARTERS
          </Link>

          <Link
            to={`/investigation/${caseData.id}`}
            className="w-full sm:w-auto px-6 py-2.5 bg-evidence-red hover:bg-evidence-crimson text-white rounded font-display tracking-widest uppercase text-center flex items-center justify-center gap-2 shadow-lg transition-transform hover:scale-105"
          >
            <Layers className="w-4 h-4" />
            <span>REVISIT EVIDENCE BOARD</span>
          </Link>
        </div>
      </div>
    </div>
  );
};
