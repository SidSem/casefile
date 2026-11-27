# CASEFILE 09
> **Federal Criminal Investigation Simulator**  
> *Every clue tells a story. Not every story tells the truth.*

[![Production Build](https://img.shields.io/badge/build-passing-brightgreen.svg)]()
[![TypeScript 5.7](https://img.shields.io/badge/TypeScript-5.7-blue.svg)]()
[![React 19](https://img.shields.io/badge/React-19-61dafb.svg)]()
[![Vite 6](https://img.shields.io/badge/Vite-6-purple.svg)]()
[![Tailwind CSS 3.4](https://img.shields.io/badge/TailwindCSS-3.4-38bdf8.svg)]()
[![Audit Status](https://img.shields.io/badge/tests-50%2F50%20passed-success.svg)]()

---

## 🕵️ Project Overview

**CASEFILE 09** is an immersive detective investigation simulator where the user assumes the role of a federal investigator solving complex criminal cases. Combining the atmospheric depth of neo-noir cinema with the procedural rigor of an FBI workstation, the application features an interactive physical evidence board, multi-spectral forensic tools, a branching suspect interrogation chamber, chronological timeline reconstruction, and a deterministic legal deduction engine.

---

## 🏛️ 5-Day Implementation Roadmap

| Day | Focus Area | Deliverables & Key Technologies | Documentation |
| :---: | :--- | :--- | :--- |
| **Day 1** | **Foundation & Audio Engine** | Project scaffolding, classified neo-noir theme, Web Audio API procedural sound synthesizer, persistent Zustand state store, terminal boot sequence, investigator onboarding, command HQ. | [docs/day-1.md](docs/day-1.md) |
| **Day 2** | **Case Architecture & Archives** | 5 complete original cases, evidence taxonomy, suspect dossiers with alibis, searchable case archive, top-secret case briefings. | [docs/day-2.md](docs/day-2.md) |
| **Day 3** | **Interactive Evidence Board** | Infinite hardware-accelerated canvas (`@xyflow/react`), 5 custom node types (Photo, Document, Forensic, Note, Victim), red string yarn edges with semantic relationship tags. | [docs/day-3.md](docs/day-3.md) |
| **Day 4** | **Forensic Lab & Interrogation** | Multi-spectral Photo Lab (UV, IR, Magnifier, Hotspots), Optical Document Decryptor (redactions, SHA-256 metadata), DNA/Ballistics/HPLC instruments, Interrogation chamber with dynamic stress meter and contradiction exposure. | [docs/day-4.md](docs/day-4.md) |
| **Day 5** | **Timeline, Deduction & Launch** | Multi-track chronological timeline reconstruction, legal indictment theory board, 1000-point Grand Jury scoring engine, After-Action Reports, investigator ranks, 50/50 automated test suite. | [docs/day-5.md](docs/day-5.md) |

---

## 🔍 Key Feature Highlights

### 1. Interactive Physical Evidence Board
- Infinite canvas powered by `@xyflow/react` with smooth zoom, pan, and minimap.
- Real-time pinning of polaroid photographs, classified documents, forensic slides, and editable sticky notes.
- Connect evidence with red string yarn paths tagged with semantic relationships (`Supports`, `Contradicts`, `Establishes Timeline`, `Possible Motive`, `Related To`).

### 2. Multi-Spectral Forensic Laboratory
- **Photo Examination Workstation**: Optical zoom ($70\%\text{--}250\%$) and rotation with UV Fluorescence ($365\text{ nm}$), Infrared Scan, and Optical Magnifier filters. Interactive hotspots unveil hidden clues.
- **Optical Document Decryptor**: Click-to-decode classified blacked-out redactions on vintage parchment with cryptographic SHA-256 chain-of-custody audits.
- **Forensic Instruments**: DNA Agarose Gel Electrophoresis (1-in-4.8-billion match ratio), Ballistics Split-Screen Comparator slider, and HPLC Toxicology Chromatogram.

### 3. Suspect Interrogation Chamber
- Film-noir interrogation room with animated reel-to-reel tape recorder.
- Dynamic $0\%\text{--}100\%$ psychological stress meter tracking baseline composure, inquiry frequency, and physical evidence confrontation.
- Hand-authored deterministic dialogue trees and contradiction exposure mechanics triggering confessions.

### 4. Chronological Timeline Reconstruction
- Multi-track timeline sorting (`Victim`, `Suspect`, `Forensic`, `Police`).
- Slot placement controls with real-time contradiction warnings for suspect alibis clashing with verified forensic timestamps.

### 5. Legal Deduction Theory Board & Grand Jury Scoring
- Formal indictment builder: Accuse primary culprit, articulate authentic motive, reconstruct execution method, link crucial supporting evidence, and refute false alibis.
- Deterministic 1000-point scoring algorithm with narrative consequence epilogues (`Perfect`, `Partial`, `Failed`).
- 6 Investigator Ranks (Trainee to Elite Investigator) and 8 unlockable commendation medals.

### 6. Procedural Web Audio API Synthesizer
- Zero external MP3/WAV dependencies. 100% procedurally synthesized in real time:
  - Mechanical typewriter key clacks and return carriage bell.
  - Heavy rubber stamp thud (120Hz → 28Hz pitch-swept triangle wave).
  - Dual sawtooth camera shutter pulse.
  - Reel-to-reel cassette clicks and atmospheric binaural sub-bass noir drone (48Hz + 51.5Hz).

---

## 🗄️ Included Case Files

1. **CASE 001: The Silent Witness** (Locked-room journalist homicide; Marcus Sterling kickback conspiracy).
2. **CASE 002: Midnight at Blackwood** (Lord Alistair storm disappearance; Julian Blackwood disinheritance).
3. **CASE 003: The Last Transmission** (Radio signal tower vanishing; Officer Frank Navarro naval salvage coverup).
4. **CASE 004: Ashes of Yesterday** (1988 cold case elevator vault entombment; Raymond Cross land fraud).
5. **CASE 009: The Ninth File** (**Master Conspiracy Case**; *Project Chimera* linking all cases to Executive Director Vance Sterling).

---

## 🛠️ Technology Stack

- **Frontend Framework**: [React 19](https://react.dev/) + [TypeScript 5.7](https://www.typescriptlang.org/)
- **Build Tool**: [Vite 6](https://vitejs.dev/)
- **Canvas & Graph Engine**: [@xyflow/react (React Flow)](https://reactflow.dev/)
- **Styling**: [Tailwind CSS 3.4](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **State Management**: [Zustand](https://zustand-demo.pmnd.rs/) with `persist` middleware (`localStorage`)
- **Audio Engine**: Native Web Audio API (procedural synthesis)
- **Automated Testing**: TypeScript execution via `tsx`

---

## 🚀 Quick Start Guide

### Prerequisites
- [Node.js](https://nodejs.org/) (v18.0.0 or higher recommended)
- `npm` or `yarn`

### Installation
```bash
# Clone the repository
git clone https://github.com/SidSem/casefile.git

# Navigate into the project folder
cd casefile

# Install dependencies
npm install

# Start the local development server
npm run dev
```
Open your browser and navigate to `http://localhost:5173`.

### Automated Test Suite Execution
```bash
# Run the 50-assertion automated test suite
npx tsx test-investigation-suite.ts
```

### Production Build
```bash
# Typecheck and build optimized bundle
npm run build

# Preview production build locally
npm run preview
```

---

## 📚 Technical Documentation Index

- [5-Day Master Project Specification](5-DAY-DOCUMENTATION.md)
- [Day 1: Foundation & Brand Identity Guide](docs/day-1.md)
- [Day 2: Case Architecture & Narrative Dossiers](docs/day-2.md)
- [Day 3: Physical Evidence Board Architecture](docs/day-3.md)
- [Day 4: Criminalistics Lab & Interrogation Chamber](docs/day-4.md)
- [Day 5: Chronological Timeline, Deduction & Launch](docs/day-5.md)
- [Forensic Laboratory Operator's Manual](docs/forensic-lab-guide.md)
- [Interrogation Chamber Tactical Manual](docs/interrogation-mechanics.md)
- [Deduction Engine Operator's Manual](docs/deduction-engine-guide.md)
- [Timeline Reconstruction Operator's Manual](docs/timeline-reconstruction-guide.md)

---

## 📄 License
This project is licensed under the MIT License.
