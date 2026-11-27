# CASEFILE 09 // 5-DAY MASTER PROJECT SPECIFICATION
> **Federal Criminal Investigation Simulator**
> *Every clue tells a story. Not every story tells the truth.*

---

## Executive Overview
**CASEFILE 09** is a production-grade, highly immersive detective investigation simulator built with **React 19**, **TypeScript 5.7**, **Vite 6**, and **Tailwind CSS 3.4**. Designed around classified neo-noir aesthetics, analog forensics, and deterministic legal deduction, the project provides a complete investigative workstation where users solve fictional criminal cases.

---

## 5-Day Implementation Roadmap

| Milestone | Subsystem & Architecture | Key Deliverables | Verification Status |
| :--- | :--- | :--- | :--- |
| **Day 1** | **Foundation, Brand Identity & Audio Engine** | Scaffolding, Web Audio API procedural synthesizer, Zustand persistent store, Terminal intro sequence, Onboarding, Command HQ. | ✅ Pushed (`bcacae1`) |
| **Day 2** | **Case Architecture, Narrative Dossiers & Archives** | 5 complete original cases (Case 001 to Case 009), Evidence taxonomy, Searchable archive, Classified briefing dossiers. | ✅ Pushed (`64618ba`) |
| **Day 3** | **Interactive Physical Evidence Board** | `@xyflow/react` infinite canvas, 5 specialized custom nodes, Red string yarn edges, Relational semantics, Note editing. | ✅ Pushed (`368d292`) |
| **Day 4** | **Forensic Laboratory & Interrogation Chamber** | Multi-spectral Photo Lab (UV/IR/Zoom), Optical Document Decryptor, DNA/Ballistics/HPLC instruments, Interrogation chamber & stress dynamics. | ✅ Pushed (`d458e5e`) |
| **Day 5** | **Timeline Reconstruction, Deduction Engine & Launch** | Multi-track timeline board, Indictment theory builder, Grand Jury scoring (1000 pts), Results & ranks, 50/50 automated test suite. | ✅ Final Release |

---

## Detailed Day-by-Day Specifications

### 🔹 [Day 1: Foundation, Brand Identity, Core Engines & Setup](docs/day-1.md)
- **Visual Design**: Classified neo-noir palette (`#07080a`, `#0d0f13`, `#b91c1c`, `#424f3b`, `#f3ece0`), CRT analog scanlines, typographic hierarchy (`Oswald`, `IBM Plex Mono`, `Playfair Display`, `Courier Prime`).
- **Web Audio API Engine** (`src/engine/audioEngine.ts`): Procedural synthesis of mechanical typewriter clicks, heavy rubber stamps, camera shutters, tape recorder clicks, and binaural 48Hz/51.5Hz drone.
- **Persistent State Store** (`src/store/useGameStore.ts`): Zustand store with `localStorage` synchronization.
- **Pages**: `IntroPage.tsx` (classified clearance boot sequence), `OnboardingPage.tsx` (investigator accreditation dossier), `HeadquartersPage.tsx` (central command center).

### 🔹 [Day 2: Case Architecture, Narrative Dossiers & Archives](docs/day-2.md)
- **Authored Original Investigations**:
  - [CASE 001: The Silent Witness](docs/cases/case-001.md) (Locked-room journalist homicide; Marcus Sterling kickback conspiracy).
  - [CASE 002: Midnight at Blackwood](docs/cases/case-002.md) (Lord Alistair storm disappearance; Julian Blackwood disinheritance).
  - [CASE 003: The Last Transmission](docs/cases/case-003.md) (Radio tower vanishing; Officer Frank Navarro naval salvage coverup).
  - [CASE 004: Ashes of Yesterday](docs/cases/case-004.md) (1988 cold case elevator vault entombment; Raymond Cross land fraud).
  - [CASE 009: The Ninth File](docs/cases/case-009.md) (**Master Conspiracy Case**; *Project Chimera* linking all cases to Executive Director Vance Sterling).
- **Pages**: `ArchivePage.tsx` (real-time search & filters), `CaseBriefingPage.tsx` (top-secret briefing dossier).

### 🔹 [Day 3: Main Investigation Workspace & Physical Evidence Board](docs/day-3.md)
*Technical Spec: [docs/evidence-board-architecture.md](docs/evidence-board-architecture.md)*
- **Tactile Canvas** (`src/components/investigation/BoardCanvas.tsx`): Infinite hardware-accelerated canvas with smooth zoom, pan, and minimap.
- **Custom Node Hierarchy**: `PhotoNode.tsx`, `DocumentNode.tsx`, `ForensicNode.tsx`, `NoteNode.tsx`, `VictimNode.tsx`.
- **Yarn Edges** (`InvestigationEdge.tsx`): Red yarn connections with relational badges: `Supports`, `Contradicts`, `Establishes Timeline`, `Possible Motive`, `Related To`.

### 🔹 [Day 4: Criminalistics Forensic Laboratory & Interrogation Chamber](docs/day-4.md)
*Technical Specs: [docs/forensic-lab-guide.md](docs/forensic-lab-guide.md) | [docs/interrogation-mechanics.md](docs/interrogation-mechanics.md)*
- **Multi-Spectral Photo Lab** (`PhotoLab.tsx`): $70\%\text{--}250\%$ zoom, $90^\circ$ rotation, UV Fluorescence, Infrared, and Optical Magnifier filters with coordinate hotspots.
- **Optical Document Decryptor** (`DocumentLab.tsx`): Aged parchment, click-to-decode classified redactions, SHA-256 custody audit.
- **Forensic Instruments** (`ForensicReportsLab.tsx`): DNA Agarose Gel Electrophoresis, Ballistics Split-Screen Comparator, HPLC Toxicology Chromatogram.
- **Interrogation Chamber** (`InterrogationRoom.tsx`): Animated reel-to-reel tape recorder, dynamic $0\%\text{--}100\%$ stress meter, deterministic dialogue trees, evidence confrontation, contradiction stingers.

### 🔹 [Day 5: Chronological Timeline, Deduction Engine & Launch](docs/day-5.md)
*Technical Specs: [docs/deduction-engine-guide.md](docs/deduction-engine-guide.md) | [docs/timeline-reconstruction-guide.md](docs/timeline-reconstruction-guide.md)*
- **Timeline Reconstruction** (`TimelineBoard.tsx`): Multi-track timeline (`Victim`, `Suspect`, `Forensic`, `Police`), slot movement, contradiction badges, chronological integrity scoring.
- **Deduction Engine & Theory Board** (`TheoryBoard.tsx`): Legal indictment builder evaluating culprit, motive, method, supporting clues, and refuted alibis.
- **Scoring & Consequence System** (`deductionEngine.ts`): 1000-point deterministic score calculation, outcome tiers (`Perfect`, `Partial`, `Failed`), 6 investigator ranks, 8 commendation medals.
- **Automated Verification Suite** (`test-investigation-suite.ts`): 50 / 50 passed assertions across all case models and game engines.

---

## Complete Verification & Quality Audit
- **TypeScript**: `tsc -b` compiled cleanly with 0 errors.
- **Vite Bundler**: Production build generated in `dist/`.
- **Automated Test Suite**: 50/50 test assertions passed.
- **State Persistence**: 100% of game state saved in `localStorage`.
- **Audio Reliability**: 100% procedural Web Audio API with zero external asset loading dependencies.
