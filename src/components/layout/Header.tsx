import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  FolderLock, 
  Volume2, 
  VolumeX, 
  Radio, 
  Settings, 
  ShieldAlert, 
  Briefcase, 
  UserCheck, 
  Layers
} from 'lucide-react';
import { useGameStore } from '../../store/useGameStore';
import { getCaseById } from '../../data/cases';
import { audioEngine } from '../../engine/audioEngine';

interface HeaderProps {
  onOpenSettings: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenSettings }) => {
  const location = useLocation();
  const { profile, settings, updateSettings, activeCaseId } = useGameStore();
  const activeCase = activeCaseId ? getCaseById(activeCaseId) : null;

  const toggleSound = () => {
    const next = !settings.soundEffects;
    updateSettings({ soundEffects: next });
    if (next) {
      audioEngine.playTerminalChirp(880);
    }
  };

  const toggleAmbient = () => {
    const next = !settings.ambientAudio;
    updateSettings({ ambientAudio: next });
    if (settings.soundEffects) {
      audioEngine.playTapeRecorderClick();
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-charcoal-950/95 backdrop-blur border-b border-charcoal-750 px-4 py-2.5 flex items-center justify-between transition-colors">
      {/* Brand & Classification Tag */}
      <div className="flex items-center gap-3">
        <Link 
          to="/hq" 
          className="flex items-center gap-2.5 group"
          onClick={() => settings.soundEffects && audioEngine.playTerminalChirp(600)}
        >
          <div className="relative w-8 h-8 rounded bg-charcoal-900 border border-evidence-red/60 flex items-center justify-center group-hover:border-evidence-red transition-colors">
            <span className="font-mono text-xs font-black text-evidence-red tracking-tighter">09</span>
            <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-evidence-red animate-ping opacity-75" />
            <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-evidence-red" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-display text-lg tracking-wider font-bold text-charcoal-100 uppercase group-hover:text-white transition-colors">
                CASEFILE <span className="text-evidence-red">09</span>
              </span>
              <span className="hidden sm:inline-block stamp-confidential text-[9px] py-0 px-1 border-evidence-red/40 text-evidence-red/80">
                LEVEL 04 ARCHIVE
              </span>
            </div>
            <div className="text-[10px] font-mono text-charcoal-400 tracking-widest hidden md:block">
              FEDERAL CRIMINAL INVESTIGATION SYSTEM
            </div>
          </div>
        </Link>
      </div>

      {/* Main Navigation */}
      <nav className="flex items-center gap-1 sm:gap-2">
        <Link
          to="/hq"
          onClick={() => settings.soundEffects && audioEngine.playTerminalChirp(650)}
          className={`px-2.5 py-1.5 rounded text-xs font-mono tracking-wider flex items-center gap-1.5 transition-colors ${
            location.pathname === '/hq'
              ? 'bg-charcoal-800 text-charcoal-100 border border-charcoal-600'
              : 'text-charcoal-400 hover:text-charcoal-200 hover:bg-charcoal-900'
          }`}
        >
          <Briefcase className="w-3.5 h-3.5 text-charcoal-400" />
          <span className="hidden sm:inline">COMMAND HQ</span>
        </Link>

        <Link
          to="/archive"
          onClick={() => settings.soundEffects && audioEngine.playTerminalChirp(650)}
          className={`px-2.5 py-1.5 rounded text-xs font-mono tracking-wider flex items-center gap-1.5 transition-colors ${
            location.pathname.startsWith('/archive')
              ? 'bg-charcoal-800 text-charcoal-100 border border-charcoal-600'
              : 'text-charcoal-400 hover:text-charcoal-200 hover:bg-charcoal-900'
          }`}
        >
          <FolderLock className="w-3.5 h-3.5 text-charcoal-400" />
          <span className="hidden sm:inline">ARCHIVE</span>
        </Link>

        {activeCase && (
          <Link
            to={`/investigation/${activeCase.id}`}
            onClick={() => settings.soundEffects && audioEngine.playTerminalChirp(720)}
            className={`px-2.5 py-1.5 rounded text-xs font-mono tracking-wider flex items-center gap-1.5 transition-colors ${
              location.pathname.startsWith('/investigation')
                ? 'bg-evidence-burgundy/40 text-evidence-crimson border border-evidence-red/50 shadow-[0_0_12px_rgba(185,28,28,0.2)]'
                : 'text-evidence-red/90 hover:text-evidence-crimson hover:bg-evidence-burgundy/20'
            }`}
          >
            <Layers className="w-3.5 h-3.5 text-evidence-red animate-pulse" />
            <span className="font-bold hidden sm:inline">ACTIVE: {activeCase.code}</span>
            <span className="font-bold sm:hidden">{activeCase.code}</span>
          </Link>
        )}

        <Link
          to="/profile"
          onClick={() => settings.soundEffects && audioEngine.playTerminalChirp(650)}
          className={`px-2.5 py-1.5 rounded text-xs font-mono tracking-wider flex items-center gap-1.5 transition-colors ${
            location.pathname === '/profile'
              ? 'bg-charcoal-800 text-charcoal-100 border border-charcoal-600'
              : 'text-charcoal-400 hover:text-charcoal-200 hover:bg-charcoal-900'
          }`}
        >
          <UserCheck className="w-3.5 h-3.5 text-charcoal-400" />
          <span className="hidden md:inline">
            {profile ? profile.callsign : 'DOSSIER'}
          </span>
        </Link>
      </nav>

      {/* Controls & Quick Toggles */}
      <div className="flex items-center gap-1.5 sm:gap-2">
        {/* Ambient Drone Toggle */}
        <button
          onClick={toggleAmbient}
          title={settings.ambientAudio ? "Mute Noir Ambient Drone" : "Start Noir Ambient Drone"}
          className={`p-1.5 rounded border transition-all flex items-center gap-1 text-xs font-mono ${
            settings.ambientAudio
              ? 'bg-evidence-red/10 border-evidence-red/40 text-evidence-crimson shadow-[0_0_8px_rgba(185,28,28,0.3)]'
              : 'border-charcoal-750 text-charcoal-500 hover:text-charcoal-300 hover:border-charcoal-600'
          }`}
        >
          <Radio className={`w-3.5 h-3.5 ${settings.ambientAudio ? 'animate-pulse' : ''}`} />
          <span className="hidden lg:inline text-[10px]">
            {settings.ambientAudio ? 'DRONE ON' : 'DRONE OFF'}
          </span>
        </button>

        {/* SFX Toggle */}
        <button
          onClick={toggleSound}
          title={settings.soundEffects ? "Sound Effects ON" : "Sound Effects MUTED"}
          className={`p-1.5 rounded border transition-colors ${
            settings.soundEffects
              ? 'border-charcoal-700 text-charcoal-300 hover:text-white'
              : 'border-charcoal-800 text-charcoal-600 hover:text-charcoal-400'
          }`}
        >
          {settings.soundEffects ? (
            <Volume2 className="w-3.5 h-3.5 text-charcoal-300" />
          ) : (
            <VolumeX className="w-3.5 h-3.5 text-charcoal-600" />
          )}
        </button>

        {/* Settings Dialog Trigger */}
        <button
          onClick={() => {
            if (settings.soundEffects) audioEngine.playTerminalChirp(550);
            onOpenSettings();
          }}
          title="Investigation System Settings"
          className="p-1.5 rounded border border-charcoal-750 text-charcoal-400 hover:text-charcoal-100 hover:border-charcoal-600 transition-colors"
        >
          <Settings className="w-3.5 h-3.5" />
        </button>

        {/* Investigator Callsign Tag */}
        {profile && (
          <div className="hidden xl:flex items-center gap-1.5 pl-2 border-l border-charcoal-750 font-mono text-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            <span className="text-charcoal-400">AGT:</span>
            <span className="font-semibold text-charcoal-200 uppercase">{profile.callsign}</span>
          </div>
        )}
      </div>
    </header>
  );
};
