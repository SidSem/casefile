# CASEFILE 09 // DAY 1: FOUNDATION, BRAND IDENTITY & CORE ARCHITECTURE

---

## 📋 Day 1 Goals & Deliverables
1. **Scaffold Project**: Initialize modern React 19 + TypeScript + Vite 6 environment.
2. **Design Tokens & Visual Language**: Configure Tailwind CSS with classified neo-noir aesthetic (charcoal backgrounds, evidence-marker red, aged paper, muted olive, and CRT scanline animations).
3. **Typography**: Load condensed display fonts (Oswald), technical monospace (IBM Plex Mono), narrative serif (Playfair Display), and vintage typewriter fonts (Courier Prime).
4. **Data Contracts**: Define TypeScript interfaces for cases, evidence items, forensic reports, suspects, timelines, deductions, and investigator profiles.
5. **Procedural Web Audio Engine**: Build an offline-ready sound synthesizer using Web Audio API for mechanical typewriter clicks, rubber stamp impacts, camera shutters, and sub-bass binaural drones.
6. **State Store**: Implement centralized persistent state with Zustand and `localStorage`.
7. **Opening Cinematic**: Build the classified Level 04 decryption terminal sequence with cursor blink and glitch reveal.
8. **Investigator Accreditation**: Build the onboarding dossier with callsign, avatar, and difficulty clearance (**Rookie**, **Detective**, **Special Agent**).
9. **Command Headquarters**: Build the main command center layout with real-time stats and active investigation indicators.

---

## 🎨 Visual Design System

```css
/* Custom Neo-Noir Color Palette */
--charcoal-950: #07080a; /* Deep classified black */
--charcoal-900: #0d0f13; /* Faded black surface */
--charcoal-850: #13161c; /* Secondary panel background */
--charcoal-750: #222832; /* Borders & dividers */
--evidence-red: #b91c1c; /* Crime scene marker red */
--evidence-crimson: #dc2626; /* Alert & contradiction crimson */
--evidence-burgundy: #5c1721; /* High-clearance accents */
--olive-700: #424f3b; /* Military / federal olive */
--dossier-paper: #f3ece0; /* Aged manila parchment */
--terminal-amber: #eab308; /* Tactical telemetry amber */
```

---

## 💻 Core Code Architecture (Day 1)

### 1. Web Audio Procedural Synthesizer (`src/engine/audioEngine.ts`)
```typescript
// Generates tactile sound effects directly via Web Audio API without audio files
class SoundEngine {
  private ctx: AudioContext | null = null;

  // Mechanical Typewriter Keypress
  public playTypewriterKey(): void {
    // High-frequency bandpass-filtered noise burst with exponential decay
  }

  // Heavy Classified Rubber Stamp
  public playStampThud(): void {
    // 120Hz -> 28Hz pitch-swept triangle wave with deep desk impact
  }

  // Camera Shutter Click
  public playCameraShutter(): void {
    // Dual saw-tooth pulse simulating mechanical curtain release
  }

  // Binaural Atmospheric Noir Drone
  public startAmbientDrone(volume: number = 0.3): void {
    // 48Hz + 51.5Hz detuned binaural beat through 140Hz warm lowpass filter
  }
}
```

### 2. State Store (`src/store/useGameStore.ts`)
```typescript
export const useGameStore = create<GameState>()(
  persist(
    (set, get) => ({
      profile: null,
      settings: DEFAULT_SETTINGS,
      activeCaseId: null,
      caseSessions: {},
      completedCases: {},
      achievements: MASTER_ACHIEVEMENTS,
      userStats: DEFAULT_STATS,
      // Actions: setProfile, startCase, discoverEvidence, pinClueToBoard...
    }),
    {
      name: 'casefile09_storage_v1',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
```

---

## 🧪 Day 1 Verification Checklist
- [x] `npm run build` succeeds with zero TypeScript errors.
- [x] Web Audio API generates audio feedback on user interactions.
- [x] Opening terminal boot sequence animates and allows instant skip.
- [x] Investigator accreditation form validates name, callsign, and difficulty.
- [x] Command Headquarters displays active solver stats.
- [x] All profile and setting changes persist across browser refreshes.
