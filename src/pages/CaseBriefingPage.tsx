import React from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { 
  FolderLock, 
  MapPin, 
  Calendar, 
  ShieldAlert, 
  Target, 
  Users, 
  FileText, 
  ArrowRight, 
  AlertTriangle,
  Play
} from 'lucide-react';
import { getCaseById } from '../data/cases';
import { useGameStore } from '../store/useGameStore';
import { audioEngine } from '../engine/audioEngine';

export const CaseBriefingPage: React.FC = () => {
  const { caseId } = useParams<{ caseId: string }>();
  const navigate = useNavigate();
  const { startCase, caseSessions, settings } = useGameStore();

  const caseData = caseId ? getCaseById(caseId) : null;

  if (!caseData) {
    return (
      <div className="min-h-screen bg-charcoal-950 flex items-center justify-center text-charcoal-400 font-mono text-xs">
        CASE FILE NOT FOUND // RETURN TO ARCHIVE
      </div>
    );
  }

  const handleBeginInvestigation = () => {
    if (settings.soundEffects) {
      audioEngine.playStampThud();
    }
    startCase(caseData.id);
    navigate(`/investigation/${caseData.id}`);
  };

  return (
    <div className="min-h-screen bg-charcoal-950 p-4 sm:p-6 lg:p-8 font-mono text-xs text-charcoal-300 max-w-5xl mx-auto space-y-6">
      {/* Top Dossier Header */}
      <div className="bg-charcoal-900 border-2 border-charcoal-700 rounded p-6 shadow-2xl relative">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-charcoal-750">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="stamp-classified text-xs">{caseData.classification}</span>
              <span className="text-[11px] text-charcoal-500 font-bold tracking-widest uppercase">
                INCIDENT FILE #{caseData.code}
              </span>
            </div>
            <h1 className="font-display text-2xl sm:text-3xl font-black text-white tracking-wider uppercase">
              {caseData.title}
            </h1>
          </div>

          <div className="text-right sm:text-right">
            <div className="text-[10px] text-charcoal-500">OPERATIONAL DIFFICULTY</div>
            <div className="font-display text-lg font-bold text-terminal-amber uppercase">
              {caseData.difficulty}
            </div>
          </div>
        </div>

        {/* Crime Scene Photo & Incident Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
          {/* Crime Scene Photo Preview */}
          <div className="space-y-2">
            <div className="relative border-2 border-charcoal-700 rounded overflow-hidden shadow-lg group">
              <img
                src={caseData.crimeScenePhoto}
                alt="Crime Scene"
                className="w-full h-56 object-cover filter contrast-125 grayscale hover:grayscale-0 transition-all duration-300"
              />
              <div className="absolute top-2 left-2 stamp-confidential text-[9px] bg-charcoal-950/80">
                EXHIBIT A // SCENE
              </div>
            </div>
            <p className="text-[10px] text-charcoal-400 italic text-center">
              Official Crime Scene Documentation
            </p>
          </div>

          {/* Incident Overview & Victim Stats */}
          <div className="md:col-span-2 space-y-4">
            <div className="bg-charcoal-950/70 p-4 rounded border border-charcoal-800 space-y-2">
              <span className="font-bold text-white text-xs tracking-wider uppercase flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4 text-evidence-red" />
                PRELIMINARY INCIDENT DISPATCH
              </span>
              <p className="text-charcoal-300 font-sans text-sm leading-relaxed">
                {caseData.summary}
              </p>
            </div>

            {/* Incident Metadata */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-[11px]">
              <div className="bg-charcoal-850 p-2.5 rounded border border-charcoal-750">
                <span className="text-charcoal-500 block text-[10px]">INCIDENT LOCATION</span>
                <span className="font-bold text-white flex items-center gap-1 mt-0.5">
                  <MapPin className="w-3.5 h-3.5 text-evidence-red" />
                  {caseData.location}
                </span>
              </div>

              <div className="bg-charcoal-850 p-2.5 rounded border border-charcoal-750">
                <span className="text-charcoal-500 block text-[10px]">TIMESTAMP OF OCCURRENCE</span>
                <span className="font-bold text-white flex items-center gap-1 mt-0.5">
                  <Calendar className="w-3.5 h-3.5 text-terminal-amber" />
                  {caseData.incidentDate}
                </span>
              </div>
            </div>

            {/* Victim Profile */}
            <div className="bg-charcoal-850 p-3 rounded border border-charcoal-750 space-y-1">
              <span className="text-[10px] text-evidence-red font-bold uppercase tracking-wider">
                DECEASED / VICTIM DOSSIER
              </span>
              <div className="text-sm font-bold text-white font-sans">
                {caseData.victim.name} ({caseData.victim.age} years old)
              </div>
              <div className="text-[11px] text-charcoal-400">
                Occupation: <span className="text-charcoal-200">{caseData.victim.occupation}</span>
              </div>
              <div className="text-[11px] text-charcoal-400">
                Cause of Death: <span className="text-evidence-crimson font-mono font-bold">{caseData.victim.causeOfDeath}</span>
              </div>
              <div className="text-[11px] text-charcoal-400">
                Time of Death Window: <span className="text-charcoal-200 font-mono">{caseData.victim.timeOfDeathEstimate}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Known Persons of Interest */}
        <div className="pt-6 border-t border-charcoal-750 mt-6 space-y-3">
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-terminal-amber" />
            <h3 className="font-display text-base font-bold text-white uppercase tracking-wider">
              IDENTIFIED PERSONS OF INTEREST ({caseData.suspects.length})
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {caseData.suspects.map((suspect) => (
              <div
                key={suspect.id}
                className="bg-charcoal-850 p-3 rounded border border-charcoal-750 flex items-start gap-3"
              >
                <img
                  src={suspect.portraitUrl}
                  alt={suspect.name}
                  className="w-12 h-14 object-cover rounded filter grayscale contrast-125 shrink-0 border border-charcoal-700"
                />
                <div className="space-y-0.5 overflow-hidden">
                  <div className="font-bold text-white text-xs truncate">{suspect.name}</div>
                  <div className="text-[10px] text-charcoal-400 truncate">{suspect.occupation}</div>
                  <div className="text-[9px] text-terminal-amber font-mono truncate">{suspect.callsignOrAlias}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Investigation Objectives */}
        <div className="pt-6 border-t border-charcoal-750 mt-6 space-y-2">
          <div className="flex items-center gap-2">
            <Target className="w-4 h-4 text-emerald-400" />
            <h3 className="font-display text-base font-bold text-white uppercase tracking-wider">
              INVESTIGATOR MANDATE & OBJECTIVES
            </h3>
          </div>

          <ul className="space-y-1.5 pl-2">
            {caseData.objectives.map((obj, i) => (
              <li key={i} className="flex items-start gap-2 text-charcoal-300 text-xs">
                <span className="text-evidence-red font-bold select-none">[0{i+1}]</span>
                <span className="font-sans">{obj}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* CTA Launch Investigation */}
        <div className="pt-6 border-t border-charcoal-750 mt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <Link
            to="/archive"
            className="text-xs text-charcoal-400 hover:text-white transition-colors"
          >
            ← RETURN TO CASE ARCHIVES
          </Link>

          <button
            onClick={handleBeginInvestigation}
            className="w-full sm:w-auto px-8 py-3 bg-evidence-red hover:bg-evidence-crimson text-white font-display text-base font-bold tracking-widest uppercase rounded shadow-[0_0_20px_rgba(185,28,28,0.4)] flex items-center justify-center gap-2.5 transition-transform hover:scale-105 active:scale-95"
          >
            <Play className="w-4 h-4 fill-current" />
            <span>COMMENCE ACTIVE INVESTIGATION</span>
          </button>
        </div>
      </div>
    </div>
  );
};
