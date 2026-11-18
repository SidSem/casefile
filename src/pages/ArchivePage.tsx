import React, { useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  FolderLock, 
  Search, 
  Filter, 
  MapPin, 
  Calendar, 
  Lock, 
  ArrowRight, 
  CheckCircle2, 
  FileText 
} from 'lucide-react';
import { ALL_CASES } from '../data/cases';
import { useGameStore } from '../store/useGameStore';
import { audioEngine } from '../engine/audioEngine';

export const ArchivePage: React.FC = () => {
  const navigate = useNavigate();
  const { completedCases, caseSessions, isCaseUnlocked, settings } = useGameStore();

  const [searchQuery, setSearchQuery] = useState('');
  const [filterDifficulty, setFilterDifficulty] = useState<'all' | 'Rookie' | 'Detective' | 'Special Agent'>('all');
  const [filterStatus, setFilterStatus] = useState<'all' | 'completed' | 'active' | 'unsolved'>('all');

  const filteredCases = useMemo(() => {
    return ALL_CASES.filter((c) => {
      const isCompleted = !!completedCases[c.id];
      const isStarted = !!caseSessions[c.id] && !isCompleted;
      
      // Text match
      const query = searchQuery.toLowerCase();
      const matchesText = 
        c.title.toLowerCase().includes(query) ||
        c.code.toLowerCase().includes(query) ||
        c.victim.name.toLowerCase().includes(query) ||
        c.location.toLowerCase().includes(query) ||
        c.summary.toLowerCase().includes(query);

      // Difficulty match
      const matchesDifficulty = filterDifficulty === 'all' || c.difficulty === filterDifficulty;

      // Status match
      let matchesStatus = true;
      if (filterStatus === 'completed') matchesStatus = isCompleted;
      if (filterStatus === 'active') matchesStatus = isStarted;
      if (filterStatus === 'unsolved') matchesStatus = !isCompleted;

      return matchesText && matchesDifficulty && matchesStatus;
    });
  }, [searchQuery, filterDifficulty, filterStatus, completedCases, caseSessions]);

  return (
    <div className="min-h-screen bg-charcoal-950 p-4 sm:p-6 lg:p-8 space-y-6 font-mono text-xs text-charcoal-300 max-w-7xl mx-auto">
      {/* Archive Header */}
      <div className="border-b border-charcoal-750 pb-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <FolderLock className="w-5 h-5 text-evidence-red" />
            <span className="stamp-classified text-xs">CENTRAL RECORDS</span>
          </div>
          <h1 className="font-display text-2xl sm:text-3xl font-black text-white tracking-wider uppercase">
            FEDERAL CRIMINAL CASE ARCHIVES
          </h1>
          <p className="text-charcoal-400 font-sans text-sm mt-1">
            Declassified records repository. Search incident profiles, review past homicide trials, or initiate new forensic inquiries.
          </p>
        </div>

        {/* Search Input Bar */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-charcoal-500 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search by victim, location, case #..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-charcoal-900 border border-charcoal-700 rounded pl-9 pr-3 py-2 text-white placeholder-charcoal-500 focus:outline-none focus:border-evidence-red font-mono text-xs"
          />
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-charcoal-900 p-3 rounded border border-charcoal-800">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-[10px] text-charcoal-500 uppercase mr-1">DIFFICULTY:</span>
          {(['all', 'Rookie', 'Detective', 'Special Agent'] as const).map((diff) => (
            <button
              key={diff}
              onClick={() => {
                setFilterDifficulty(diff);
                if (settings.soundEffects) audioEngine.playTypewriterKey();
              }}
              className={`px-2.5 py-1 rounded text-[11px] font-mono transition-colors ${
                filterDifficulty === diff
                  ? 'bg-charcoal-750 text-white border border-charcoal-600 font-bold'
                  : 'text-charcoal-400 hover:text-white hover:bg-charcoal-800'
              }`}
            >
              {diff.toUpperCase()}
            </button>
          ))}
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <span className="text-[10px] text-charcoal-500 uppercase mr-1">STATUS:</span>
          {(['all', 'completed', 'active', 'unsolved'] as const).map((st) => (
            <button
              key={st}
              onClick={() => {
                setFilterStatus(st);
                if (settings.soundEffects) audioEngine.playTypewriterKey();
              }}
              className={`px-2.5 py-1 rounded text-[11px] font-mono transition-colors ${
                filterStatus === st
                  ? 'bg-evidence-burgundy/40 text-evidence-crimson border border-evidence-red/40 font-bold'
                  : 'text-charcoal-400 hover:text-white hover:bg-charcoal-800'
              }`}
            >
              {st.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {/* Archive Items List */}
      <div className="space-y-4">
        {filteredCases.length === 0 ? (
          <div className="text-center py-16 border border-dashed border-charcoal-800 rounded bg-charcoal-900/50">
            <p className="text-charcoal-400 font-mono text-sm">NO CASE FILES MATCH SPECIFIED SEARCH FILTERS.</p>
          </div>
        ) : (
          filteredCases.map((caseItem) => {
            const isCompleted = !!completedCases[caseItem.id];
            const isStarted = !!caseSessions[caseItem.id] && !isCompleted;
            const unlocked = isCaseUnlocked(caseItem.id);
            const scoreResult = completedCases[caseItem.id];

            return (
              <div
                key={caseItem.id}
                className={`p-5 rounded border transition-all flex flex-col md:flex-row md:items-center justify-between gap-6 ${
                  !unlocked
                    ? 'bg-charcoal-950 border-charcoal-850 opacity-60'
                    : isCompleted
                    ? 'bg-charcoal-900 border-emerald-900/40 hover:border-emerald-600/60'
                    : 'bg-charcoal-900 border-charcoal-750 hover:border-charcoal-600'
                }`}
              >
                {/* Left Case Info */}
                <div className="space-y-2 flex-1">
                  <div className="flex items-center gap-2.5">
                    <span className="font-mono text-xs font-bold text-evidence-red tracking-wider">
                      {caseItem.code}
                    </span>
                    <span className="stamp-confidential text-[9px] py-0 px-1">
                      {caseItem.classification}
                    </span>
                    <span className={`text-[10px] font-bold ${
                      caseItem.difficulty === 'Rookie' ? 'text-emerald-400' :
                      caseItem.difficulty === 'Detective' ? 'text-terminal-amber' : 'text-evidence-red'
                    }`}>
                      [{caseItem.difficulty.toUpperCase()}]
                    </span>
                  </div>

                  <h3 className="font-display text-xl font-bold text-white tracking-wide uppercase">
                    {caseItem.title}
                  </h3>

                  <p className="text-charcoal-300 font-sans text-xs max-w-3xl leading-relaxed">
                    {caseItem.summary}
                  </p>

                  <div className="flex flex-wrap items-center gap-4 text-[10px] text-charcoal-400 pt-1">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-evidence-red" />
                      {caseItem.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-terminal-amber" />
                      {caseItem.incidentDate}
                    </span>
                    <span className="text-charcoal-400">
                      VICTIM: <strong className="text-white">{caseItem.victim.name}</strong>
                    </span>
                  </div>
                </div>

                {/* Right Action Button */}
                <div className="md:w-56 shrink-0 flex flex-col justify-center">
                  {unlocked ? (
                    isCompleted ? (
                      <Link
                        to={`/results/${caseItem.id}`}
                        onClick={() => settings.soundEffects && audioEngine.playTerminalChirp(600)}
                        className="w-full py-2.5 px-4 bg-charcoal-800 hover:bg-charcoal-750 text-emerald-400 rounded text-center font-bold tracking-wider text-xs border border-charcoal-700 flex items-center justify-center gap-2 transition-colors"
                      >
                        <CheckCircle2 className="w-4 h-4" />
                        <span>AAR REPORT ({scoreResult?.totalScore} PTS)</span>
                      </Link>
                    ) : (
                      <button
                        onClick={() => {
                          if (settings.soundEffects) audioEngine.playStampThud();
                          if (isStarted) {
                            navigate(`/investigation/${caseItem.id}`);
                          } else {
                            navigate(`/briefing/${caseItem.id}`);
                          }
                        }}
                        className="w-full py-2.5 px-4 bg-evidence-red hover:bg-evidence-crimson text-white rounded text-center font-display tracking-widest text-xs uppercase flex items-center justify-center gap-2 shadow-lg transition-transform hover:scale-[1.02]"
                      >
                        <span>{isStarted ? 'RESUME CASE' : 'OPEN DOSSIER'}</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    )
                  ) : (
                    <div className="p-2.5 bg-charcoal-900 border border-charcoal-800 rounded text-center text-charcoal-500 text-[10px] space-y-1">
                      <div className="flex items-center justify-center gap-1 text-amber-500 font-bold">
                        <Lock className="w-3.5 h-3.5" />
                        <span>CLEARANCE RESTRICTED</span>
                      </div>
                      <p>{caseItem.unlockRequirement}</p>
                    </div>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
