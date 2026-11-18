import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  FolderLock, 
  ArrowRight, 
  Award, 
  Clock, 
  MapPin, 
  Calendar, 
  ShieldCheck, 
  FileText, 
  CheckCircle2, 
  AlertCircle, 
  Sparkles,
  Lock,
  Search
} from 'lucide-react';
import { useGameStore } from '../store/useGameStore';
import { ALL_CASES, getCaseById } from '../data/cases';
import { audioEngine } from '../engine/audioEngine';

export const HeadquartersPage: React.FC = () => {
  const navigate = useNavigate();
  const { 
    profile, 
    activeCaseId, 
    caseSessions, 
    completedCases, 
    startCase, 
    isCaseUnlocked,
    userStats,
    settings 
  } = useGameStore();

  const activeCase = activeCaseId ? getCaseById(activeCaseId) : null;
  const activeSession = activeCaseId ? caseSessions[activeCaseId] : null;

  const handleOpenCase = (caseId: string) => {
    if (settings.soundEffects) audioEngine.playStampThud();
    if (!caseSessions[caseId]) {
      navigate(`/briefing/${caseId}`);
    } else {
      navigate(`/investigation/${caseId}`);
    }
  };

  return (
    <div className="min-h-screen bg-charcoal-950 p-4 sm:p-6 lg:p-8 space-y-8 font-mono text-xs text-charcoal-300 max-w-7xl mx-auto">
      {/* Tactical Header Dossier Banner */}
      <div className="bg-charcoal-900 border border-charcoal-750 rounded p-6 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
          <FolderLock className="w-48 h-48 text-white" />
        </div>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div className="space-y-1.5">
            <div className="flex items-center gap-3">
              <span className="stamp-classified text-xs">LEVEL 04 CLEARANCE</span>
              <span className="text-[11px] text-charcoal-500 uppercase">
                TERMINAL ID: CF09-SEC-OPS
              </span>
            </div>
            <h1 className="font-display text-2xl sm:text-3xl font-black text-white tracking-wider uppercase">
              INVESTIGATION HEADQUARTERS
            </h1>
            <p className="text-charcoal-400 font-sans text-sm max-w-2xl">
              Welcome back, <span className="text-white font-mono font-bold uppercase">{profile?.name || 'Agent'}</span> (Callsign: <span className="text-evidence-red font-mono font-bold">{profile?.callsign || 'NIGHTHAWK'}</span>). Review active crime scenes, cross-examine forensic laboratory reports, and file formal indictments.
            </p>
          </div>

          {/* Quick Stats Pill */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-charcoal-950/80 p-3 rounded border border-charcoal-800">
            <div className="text-center px-2">
              <div className="text-[10px] text-charcoal-500 uppercase">SOLVED</div>
              <div className="font-display text-lg font-bold text-emerald-400">
                {userStats.casesCompleted} / {ALL_CASES.length}
              </div>
            </div>
            <div className="text-center px-2 border-l border-charcoal-800">
              <div className="text-[10px] text-charcoal-500 uppercase">CLUES FOUND</div>
              <div className="font-display text-lg font-bold text-white">
                {userStats.totalCluesDiscovered}
              </div>
            </div>
            <div className="text-center px-2 border-l border-charcoal-800">
              <div className="text-[10px] text-charcoal-500 uppercase">CONTRADICTIONS</div>
              <div className="font-display text-lg font-bold text-terminal-amber">
                {userStats.contradictionsFound}
              </div>
            </div>
            <div className="text-center px-2 border-l border-charcoal-800">
              <div className="text-[10px] text-charcoal-500 uppercase">TOTAL SCORE</div>
              <div className="font-display text-lg font-bold text-evidence-red">
                {userStats.totalScore}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ACTIVE CASE SPOTLIGHT (If currently in progress) */}
      {activeCase && (
        <div className="bg-charcoal-900 border-2 border-evidence-red/60 rounded p-6 shadow-[0_0_24px_rgba(185,28,28,0.15)] relative">
          <div className="flex items-center justify-between pb-3 border-b border-charcoal-750 mb-4">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-evidence-red animate-ping" />
              <span className="font-bold text-white uppercase tracking-wider text-sm">
                PRIMARY ACTIVE INVESTIGATION // IN PROGRESS
              </span>
            </div>
            <span className="stamp-confidential text-xs">
              {activeCase.classification}
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">
            <div className="lg:col-span-2 space-y-3">
              <div className="flex items-center gap-3">
                <span className="font-display text-2xl font-bold text-white tracking-wider">
                  {activeCase.code}: {activeCase.title}
                </span>
                <span className="px-2 py-0.5 rounded bg-charcoal-800 text-charcoal-300 text-[10px] font-bold">
                  {activeCase.difficulty.toUpperCase()}
                </span>
              </div>

              <p className="text-charcoal-300 font-sans text-sm line-clamp-2">
                {activeCase.summary}
              </p>

              <div className="flex flex-wrap items-center gap-4 text-[11px] text-charcoal-400">
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-evidence-red" />
                  <span>{activeCase.location}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-terminal-amber" />
                  <span>{activeCase.incidentDate}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5 text-emerald-400" />
                  <span>
                    Clues Unlocked: {activeSession?.discoveredEvidenceIds.length || 0} / {activeCase.evidence.length}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row lg:flex-col gap-3 justify-end">
              <Link
                to={`/investigation/${activeCase.id}`}
                onClick={() => settings.soundEffects && audioEngine.playTerminalChirp(700)}
                className="py-3 px-6 bg-evidence-red hover:bg-evidence-crimson text-white rounded font-display tracking-widest uppercase flex items-center justify-center gap-2 shadow-lg transition-transform hover:scale-[1.02]"
              >
                <span>RESUME WORKSPACE</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to={`/briefing/${activeCase.id}`}
                className="py-2.5 px-4 bg-charcoal-800 hover:bg-charcoal-750 text-charcoal-300 rounded font-mono text-center border border-charcoal-700 transition-colors"
              >
                REVIEW BRIEFING DOSSIER
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* CLASSIFIED CASE ARCHIVES REPOSITORY */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FolderLock className="w-5 h-5 text-evidence-red" />
            <h2 className="font-display text-xl font-bold text-white tracking-wider uppercase">
              FEDERAL CASE REGISTRY
            </h2>
          </div>
          <Link
            to="/archive"
            className="text-xs text-charcoal-400 hover:text-white flex items-center gap-1 transition-colors"
          >
            <span>FULL ARCHIVE SEARCH</span>
            <Search className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Case Folders Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {ALL_CASES.map((caseItem) => {
            const isCompleted = !!completedCases[caseItem.id];
            const isStarted = !!caseSessions[caseItem.id];
            const unlocked = isCaseUnlocked(caseItem.id);
            const scoreResult = completedCases[caseItem.id];

            return (
              <div
                key={caseItem.id}
                className={`relative rounded border transition-all duration-200 flex flex-col justify-between overflow-hidden ${
                  !unlocked
                    ? 'bg-charcoal-950 border-charcoal-800 opacity-60'
                    : isCompleted
                    ? 'bg-charcoal-900/90 border-emerald-900/50 hover:border-emerald-600/70'
                    : isStarted
                    ? 'bg-charcoal-900 border-evidence-red/40 hover:border-evidence-red'
                    : 'bg-charcoal-900/70 border-charcoal-750 hover:border-charcoal-600'
                }`}
                style={{
                  backgroundImage: 'radial-gradient(rgba(255, 255, 255, 0.015) 1px, transparent 0)',
                  backgroundSize: '12px 12px'
                }}
              >
                {/* Folder Tab Header */}
                <div className="p-4 pb-2">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono text-[11px] font-bold text-evidence-red tracking-wider">
                      {caseItem.code}
                    </span>
                    {isCompleted ? (
                      <span className="stamp-solved text-[10px] py-0 px-1">
                        CLOSED // {scoreResult?.outcomeTier.toUpperCase()}
                      </span>
                    ) : !unlocked ? (
                      <span className="flex items-center gap-1 text-[10px] text-amber-500">
                        <Lock className="w-3 h-3" />
                        LOCKED
                      </span>
                    ) : (
                      <span className="stamp-confidential text-[9px] py-0 px-1">
                        {caseItem.classification}
                      </span>
                    )}
                  </div>

                  <h3 className="font-display text-lg font-bold text-white tracking-wide uppercase line-clamp-1">
                    {caseItem.title}
                  </h3>
                  <p className="text-charcoal-400 font-sans text-xs mt-1.5 line-clamp-2">
                    {caseItem.summary}
                  </p>
                </div>

                {/* Metadata & Incident Details */}
                <div className="px-4 py-2 border-t border-charcoal-800/80 bg-charcoal-950/50 space-y-1.5 text-[10px] text-charcoal-400">
                  <div className="flex items-center justify-between">
                    <span className="text-charcoal-500">LOCATION:</span>
                    <span className="text-charcoal-300 truncate max-w-[180px]">{caseItem.location}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-charcoal-500">VICTIM:</span>
                    <span className="text-charcoal-200 font-bold">{caseItem.victim.name}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-charcoal-500">DIFFICULTY:</span>
                    <span className={`font-bold ${
                      caseItem.difficulty === 'Rookie' ? 'text-emerald-400' :
                      caseItem.difficulty === 'Detective' ? 'text-terminal-amber' : 'text-evidence-red'
                    }`}>
                      {caseItem.difficulty}
                    </span>
                  </div>
                </div>

                {/* Bottom Action Footer */}
                <div className="p-4 pt-3 border-t border-charcoal-800 flex items-center justify-between">
                  {unlocked ? (
                    isCompleted ? (
                      <Link
                        to={`/results/${caseItem.id}`}
                        onClick={() => settings.soundEffects && audioEngine.playTerminalChirp(600)}
                        className="w-full py-2 bg-charcoal-800 hover:bg-charcoal-750 text-emerald-400 rounded text-center font-bold tracking-wider text-[11px] border border-charcoal-700 flex items-center justify-center gap-1.5 transition-colors"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>VIEW REPORT (SCORE: {scoreResult?.totalScore})</span>
                      </Link>
                    ) : (
                      <button
                        onClick={() => handleOpenCase(caseItem.id)}
                        className="w-full py-2 bg-charcoal-800 hover:bg-evidence-burgundy/40 text-charcoal-100 hover:text-white rounded text-center font-bold tracking-wider text-[11px] border border-charcoal-700 hover:border-evidence-red/60 flex items-center justify-center gap-1.5 transition-all"
                      >
                        <span>{isStarted ? 'CONTINUE INVESTIGATION' : 'OPEN BRIEFING'}</span>
                        <ArrowRight className="w-3.5 h-3.5 text-evidence-red" />
                      </button>
                    )
                  ) : (
                    <div className="w-full py-2 bg-charcoal-900 text-charcoal-500 rounded text-center text-[10px] flex items-center justify-center gap-1.5 border border-charcoal-800">
                      <Lock className="w-3 h-3 text-charcoal-600" />
                      <span>{caseItem.unlockRequirement || 'LOCKED'}</span>
                    </div>
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
