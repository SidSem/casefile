import React from 'react';
import { Link } from 'react-router-dom';
import { 
  UserCheck, 
  Award, 
  ShieldCheck, 
  Fingerprint, 
  FileText, 
  Lock, 
  CheckCircle2, 
  Clock, 
  Sparkles,
  Layers
} from 'lucide-react';
import { useGameStore } from '../store/useGameStore';
import { ALL_CASES } from '../data/cases';

export const ProfilePage: React.FC = () => {
  const { profile, userStats, achievements, completedCases } = useGameStore();

  const completedCount = Object.keys(completedCases).length;
  const avgScore = completedCount > 0 ? Math.round(userStats.totalScore / completedCount) : 0;

  return (
    <div className="min-h-screen bg-charcoal-950 p-4 sm:p-6 lg:p-8 font-mono text-xs text-charcoal-300 max-w-6xl mx-auto space-y-6">
      {/* Classified Personnel Header */}
      <div className="bg-charcoal-900 border-2 border-charcoal-700 rounded p-6 sm:p-8 shadow-2xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-charcoal-750">
          <div className="flex items-start gap-4">
            {/* Badge Icon / Photo placeholder */}
            <div className="w-16 h-20 rounded bg-charcoal-950 border-2 border-evidence-red flex flex-col items-center justify-center p-2 text-center shrink-0">
              <Fingerprint className="w-7 h-7 text-evidence-red mb-1" />
              <span className="text-[8px] font-bold text-charcoal-400">AGENT</span>
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="stamp-classified text-xs">PERSONNEL FILE</span>
                <span className="text-[10px] text-charcoal-500 font-bold uppercase">
                  BADGE: {profile?.badgeNumber || 'FD-9042'}
                </span>
              </div>
              <h1 className="font-display text-2xl sm:text-3xl font-black text-white tracking-wider uppercase">
                {profile?.name || 'FIELD INVESTIGATOR'}
              </h1>
              <p className="text-[11px] text-charcoal-400">
                CALLSIGN: <strong className="text-evidence-red font-mono text-xs">{profile?.callsign || 'NIGHTHAWK'}</strong> • CLEARANCE: <strong className="text-emerald-400">{profile?.difficulty.toUpperCase() || 'DETECTIVE'}</strong>
              </p>
            </div>
          </div>

          {/* Rank Badge */}
          <div className="bg-charcoal-950 p-4 rounded border border-charcoal-800 text-center md:text-right">
            <span className="text-[9px] text-charcoal-500 uppercase block">CURRENT STANDING</span>
            <div className="font-display text-xl font-bold text-white uppercase mt-0.5">
              {completedCount >= 4 ? 'ELITE INVESTIGATOR' : completedCount >= 2 ? 'SENIOR DETECTIVE' : completedCount >= 1 ? 'DETECTIVE' : 'TRAINEE'}
            </div>
            <span className="text-[9px] text-emerald-400">FEDERAL BUREAU ACCREDITED</span>
          </div>
        </div>

        {/* Statistical Records Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6">
          <div className="bg-charcoal-950 p-3 rounded border border-charcoal-800">
            <span className="text-[9px] text-charcoal-500 uppercase block">CASES SOLVED</span>
            <div className="font-display text-2xl font-bold text-white mt-1">
              {completedCount} <span className="text-xs text-charcoal-500 font-mono">/ {ALL_CASES.length}</span>
            </div>
          </div>

          <div className="bg-charcoal-950 p-3 rounded border border-charcoal-800">
            <span className="text-[9px] text-charcoal-500 uppercase block">AVERAGE SCORE</span>
            <div className="font-display text-2xl font-bold text-terminal-amber mt-1">
              {avgScore} <span className="text-xs text-charcoal-500 font-mono">PTS</span>
            </div>
          </div>

          <div className="bg-charcoal-950 p-3 rounded border border-charcoal-800">
            <span className="text-[9px] text-charcoal-500 uppercase block">CLUES LOGGED</span>
            <div className="font-display text-2xl font-bold text-emerald-400 mt-1">
              {userStats.totalCluesDiscovered}
            </div>
          </div>

          <div className="bg-charcoal-950 p-3 rounded border border-charcoal-800">
            <span className="text-[9px] text-charcoal-500 uppercase block">LIES EXPOSED</span>
            <div className="font-display text-2xl font-bold text-evidence-red mt-1">
              {userStats.contradictionsFound}
            </div>
          </div>
        </div>
      </div>

      {/* Investigation History Log */}
      <div className="bg-charcoal-900 border border-charcoal-750 rounded p-6 space-y-4">
        <div className="flex items-center gap-2 border-b border-charcoal-800 pb-3">
          <FileText className="w-4 h-4 text-terminal-amber" />
          <h2 className="font-display text-base font-bold text-white uppercase tracking-wider">
            CASE DISPOSITION HISTORY
          </h2>
        </div>

        {completedCount === 0 ? (
          <div className="text-center py-8 text-charcoal-500 font-mono">
            No completed cases on file. Initiate investigations via Command HQ.
          </div>
        ) : (
          <div className="space-y-3">
            {Object.entries(completedCases).map(([cId, res]) => {
              const c = ALL_CASES.find(item => item.id === cId);
              if (!c) return null;

              return (
                <div
                  key={cId}
                  className="p-3.5 bg-charcoal-950 rounded border border-charcoal-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-evidence-red">{c.code}</span>
                      <span className="font-display text-sm font-bold text-white uppercase">{c.title}</span>
                      <span className="stamp-solved text-[8px] py-0 px-1">
                        {res.outcomeTier.toUpperCase()}
                      </span>
                    </div>
                    <div className="text-[10px] text-charcoal-400 mt-1">
                      VICTIM: {c.victim.name} • EVALUATION: <strong className="text-white">{res.totalScore} PTS</strong> • RANK: <strong className="text-terminal-amber">{res.rankAwarded}</strong>
                    </div>
                  </div>

                  <Link
                    to={`/results/${c.id}`}
                    className="px-3 py-1.5 rounded bg-charcoal-800 hover:bg-charcoal-750 text-emerald-400 border border-charcoal-700 font-bold text-[10px] text-center"
                  >
                    VIEW AFTER-ACTION REPORT
                  </Link>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Commendations & Achievements Showcase */}
      <div className="bg-charcoal-900 border border-charcoal-750 rounded p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-charcoal-800 pb-3">
          <div className="flex items-center gap-2">
            <Award className="w-4 h-4 text-emerald-400" />
            <h2 className="font-display text-base font-bold text-white uppercase tracking-wider">
              INVESTIGATIVE COMMENDATIONS & MEDALS
            </h2>
          </div>
          <span className="text-[10px] text-charcoal-400 font-mono">
            UNLOCKED: {achievements.filter(a => !!a.unlockedAt).length} / {achievements.length}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {achievements.map((ach) => {
            const isUnlocked = !!ach.unlockedAt;

            return (
              <div
                key={ach.id}
                className={`p-3 rounded border transition-all flex flex-col justify-between ${
                  isUnlocked
                    ? 'bg-charcoal-950 border-amber-900/60 shadow-[0_0_12px_rgba(245,158,11,0.15)]'
                    : 'bg-charcoal-950/40 border-charcoal-850 opacity-50'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="font-display text-sm font-bold text-white uppercase tracking-wide">
                      {ach.title}
                    </span>
                    {isUnlocked ? (
                      <Sparkles className="w-4 h-4 text-terminal-amber" />
                    ) : (
                      <Lock className="w-3.5 h-3.5 text-charcoal-600" />
                    )}
                  </div>
                  <p className="text-[10px] text-charcoal-400 font-sans leading-relaxed">
                    {ach.description}
                  </p>
                </div>

                <div className="mt-3 pt-2 border-t border-charcoal-850 text-[9px] font-mono">
                  {isUnlocked ? (
                    <span className="text-emerald-400 font-bold uppercase">CONFERRED</span>
                  ) : (
                    <span className="text-charcoal-600 uppercase">CLASSIFIED</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
