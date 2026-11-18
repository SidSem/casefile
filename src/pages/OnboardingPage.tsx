import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, User, Award, CheckCircle, Fingerprint, Stamp } from 'lucide-react';
import { useGameStore } from '../store/useGameStore';
import { Difficulty } from '../types/case';
import { audioEngine } from '../engine/audioEngine';

interface AvatarOption {
  id: string;
  label: string;
  specialty: string;
  imgUrl: string;
}

const AVATARS: AvatarOption[] = [
  {
    id: 'avatar-1',
    label: 'Agent K. Cross',
    specialty: 'Forensic Pathology & Ballistics',
    imgUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 'avatar-2',
    label: 'Det. M. Cole',
    specialty: 'Interrogation & Behavioral Analysis',
    imgUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 'avatar-3',
    label: 'Inspector S. Vance',
    specialty: 'Document Forensics & Cold Cases',
    imgUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 'avatar-4',
    label: 'Special Agent D. Reyes',
    specialty: 'Counter-Conspiracy & Cyber Telecom',
    imgUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
  },
];

export const OnboardingPage: React.FC = () => {
  const navigate = useNavigate();
  const { setProfile, settings } = useGameStore();

  const [name, setName] = useState('John Mercer');
  const [callsign, setCallsign] = useState('NIGHTHAWK');
  const [avatarId, setAvatarId] = useState(AVATARS[0].id);
  const [difficulty, setDifficulty] = useState<Difficulty>('detective');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !callsign.trim()) return;

    if (settings.soundEffects) {
      audioEngine.playStampThud();
    }

    setProfile({
      name: name.trim(),
      callsign: callsign.trim().toUpperCase(),
      avatarId,
      badgeNumber: `FD-${Math.floor(1000 + Math.random() * 9000)}`,
      difficulty,
      joinedTimestamp: Date.now(),
    });

    navigate('/hq');
  };

  return (
    <div className="min-h-screen bg-charcoal-950 flex items-center justify-center p-4 sm:p-6 font-mono text-xs">
      <div className="w-full max-w-2xl bg-charcoal-900 border border-charcoal-700 rounded shadow-2xl p-6 sm:p-8 relative">
        {/* Top Classification Stamp */}
        <div className="flex items-center justify-between border-b border-charcoal-750 pb-4 mb-6">
          <div className="flex items-center gap-2">
            <Fingerprint className="w-5 h-5 text-evidence-red" />
            <div>
              <h1 className="font-display text-xl text-white font-bold tracking-wider uppercase">
                INVESTIGATOR ACCREDITATION DOSSIER
              </h1>
              <p className="text-[11px] text-charcoal-400">
                FORM 49-B // SPECIAL CRIMINAL INVESTIGATIONS DIVISION
              </p>
            </div>
          </div>
          <div className="stamp-classified text-xs">TOP SECRET</div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Identity Fields */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-charcoal-300 font-bold uppercase tracking-wider mb-1.5">
                Full Name / Legal Identity
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. John Mercer"
                className="w-full bg-charcoal-850 border border-charcoal-700 rounded px-3 py-2 text-white placeholder-charcoal-600 focus:outline-none focus:border-evidence-red font-mono text-sm"
              />
            </div>

            <div>
              <label className="block text-charcoal-300 font-bold uppercase tracking-wider mb-1.5">
                Tactical Callsign
              </label>
              <input
                type="text"
                required
                value={callsign}
                onChange={(e) => setCallsign(e.target.value)}
                placeholder="e.g. NIGHTHAWK"
                className="w-full bg-charcoal-850 border border-charcoal-700 rounded px-3 py-2 text-white uppercase placeholder-charcoal-600 focus:outline-none focus:border-evidence-red font-mono text-sm tracking-wider"
              />
            </div>
          </div>

          {/* Avatar Selection */}
          <div>
            <label className="block text-charcoal-300 font-bold uppercase tracking-wider mb-2">
              Select Field Operative Profile
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {AVATARS.map((av) => (
                <div
                  key={av.id}
                  onClick={() => {
                    setAvatarId(av.id);
                    if (settings.soundEffects) audioEngine.playTypewriterKey();
                  }}
                  className={`cursor-pointer rounded border p-2 text-center transition-all ${
                    avatarId === av.id
                      ? 'border-evidence-red bg-evidence-burgundy/20 shadow-[0_0_12px_rgba(185,28,28,0.3)]'
                      : 'border-charcoal-750 bg-charcoal-850 hover:border-charcoal-600'
                  }`}
                >
                  <img
                    src={av.imgUrl}
                    alt={av.label}
                    className="w-full h-24 object-cover rounded filter grayscale contrast-125 mb-2"
                  />
                  <div className="font-bold text-white text-[11px] truncate">{av.label}</div>
                  <div className="text-[9px] text-charcoal-400 truncate mt-0.5">{av.specialty}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Difficulty Selection */}
          <div>
            <label className="block text-charcoal-300 font-bold uppercase tracking-wider mb-2">
              Operational Clearance & Difficulty
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {/* Rookie */}
              <div
                onClick={() => {
                  setDifficulty('rookie');
                  if (settings.soundEffects) audioEngine.playTypewriterKey();
                }}
                className={`cursor-pointer p-3 rounded border transition-all ${
                  difficulty === 'rookie'
                    ? 'border-emerald-500 bg-emerald-950/20'
                    : 'border-charcoal-750 bg-charcoal-850 hover:border-charcoal-600'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-emerald-400">ROOKIE</span>
                  {difficulty === 'rookie' && <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />}
                </div>
                <p className="text-[10px] text-charcoal-400 mt-1">
                  Gentle hint deductions (-20 pts). Clear alibi flags. Suitable for first-time detectives.
                </p>
              </div>

              {/* Detective */}
              <div
                onClick={() => {
                  setDifficulty('detective');
                  if (settings.soundEffects) audioEngine.playTypewriterKey();
                }}
                className={`cursor-pointer p-3 rounded border transition-all ${
                  difficulty === 'detective'
                    ? 'border-terminal-amber bg-amber-950/20'
                    : 'border-charcoal-750 bg-charcoal-850 hover:border-charcoal-600'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-terminal-amber">DETECTIVE</span>
                  {difficulty === 'detective' && <CheckCircle className="w-3.5 h-3.5 text-terminal-amber" />}
                </div>
                <p className="text-[10px] text-charcoal-400 mt-1">
                  Balanced difficulty (-45 pts per hint). Authoritative forensic rigor and standard scoring.
                </p>
              </div>

              {/* Special Agent */}
              <div
                onClick={() => {
                  setDifficulty('special_agent');
                  if (settings.soundEffects) audioEngine.playTypewriterKey();
                }}
                className={`cursor-pointer p-3 rounded border transition-all ${
                  difficulty === 'special_agent'
                    ? 'border-evidence-red bg-evidence-burgundy/20'
                    : 'border-charcoal-750 bg-charcoal-850 hover:border-charcoal-600'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-evidence-red">SPECIAL AGENT</span>
                  {difficulty === 'special_agent' && <CheckCircle className="w-3.5 h-3.5 text-evidence-red" />}
                </div>
                <p className="text-[10px] text-charcoal-400 mt-1">
                  Severe hint penalties (-80 pts). No alibi handholding. For seasoned mystery masterminds.
                </p>
              </div>
            </div>
          </div>

          {/* Submit Action */}
          <div className="pt-4 border-t border-charcoal-750 flex items-center justify-between">
            <span className="text-[10px] text-charcoal-500 uppercase">
              ALL DATA RETAINED LOCALLY IN SECURE STORAGE
            </span>
            <button
              type="submit"
              className="px-6 py-2.5 bg-evidence-red hover:bg-evidence-crimson text-white font-display text-sm tracking-wider uppercase rounded shadow-lg flex items-center gap-2 transition-transform hover:scale-105"
            >
              <Stamp className="w-4 h-4" />
              <span>AUTHENTICATE & ENTER HQ</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
