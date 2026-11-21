# CASEFILE 09 // 5-DAY MASTER PROJECT SPECIFICATION
> **Federal Criminal Investigation Simulator**
> *Every clue tells a story. Not every story tells the truth.*

---

## Table of Contents
1. [Day 1: Foundation, Brand Identity, Core Engines & Setup](#day-1-foundation-brand-identity-core-engines--setup)
2. [Day 2: Case Architecture, Narrative Dossiers & Archives](#day-2-case-architecture-narrative-dossiers--archives)
3. [Day 3: Physical Evidence Board & Tactical Canvas](#day-3-physical-evidence-board--tactical-canvas)
4. [Day 4: Criminalistics Laboratory & Interrogation Chamber](#day-4-criminalistics-laboratory--interrogation-chamber)
5. [Day 5: Chronological Timeline, Deduction Engine & Launch](#day-5-chronological-timeline-deduction-engine--launch)
6. [Summary Verification Matrix](#summary-verification-matrix)

---

## Day 1: Foundation, Brand Identity, Core Engines & Setup
*Detailed Day 1 Guide: [docs/day-1.md](docs/day-1.md)*

### Overview
Day 1 establishes the bedrock of **CASEFILE 09**: a production-grade React 19 + TypeScript 5.7 + Vite 6 web application configured with a bespoke neo-noir classified visual language, a 100% self-contained Web Audio API sound synthesizer, persistent game state storage, and the opening onboarding sequence.

### Key Systems Built
- **Classified Neo-Noir Theme**: Dark charcoal backgrounds (`#07080a`, `#0d0f13`), crime scene evidence-marker red (`#b91c1c`, `#dc2626`), military olive (`#424f3b`), aged manila paper (`#f3ece0`), and CRT analog scanlines.
- **Typography Matrix**: Condensed headers (`Oswald`), technical metadata (`IBM Plex Mono`), narrative documents (`Playfair Display`), and vintage typewriter font (`Courier Prime`).
- **Web Audio API Procedural Synthesizer** (`src/engine/audioEngine.ts`):
  - Mechanical typewriter keypresses (filtered noise burst with exponential decay).
  - Heavy classified rubber stamp thud (120Hz → 28Hz pitch-swept triangle wave).
  - Camera shutter click (dual sawtooth pulse).
  - Reel-to-reel cassette clicks and atmospheric binaural sub-bass noir drone (48Hz + 51.5Hz).
- **Persistent Game Store** (`src/store/useGameStore.ts`):
  - Zustand with `persist` middleware caching investigator credentials, discovered clues, pinned board nodes, interrogation logs, timeline order, and settings directly to `localStorage`.
- **Opening Terminal Sequence** (`src/pages/IntroPage.tsx`):
  - Restrained CRT scanline boot sequence with blinking cursor and classified clearance authentication (`RESTRICTED ACCESS // LEVEL 04`).
- **Investigator Accreditation** (`src/pages/OnboardingPage.tsx`):
  - Callsign configuration, badge generation, portrait selection, and operational difficulty clearance (**Rookie**, **Detective**, **Special Agent**).
- **Command Headquarters** (`src/pages/HeadquartersPage.tsx`):
  - Active case dossier spotlight, available cases queue, and live solver statistics.

---

## Day 2: Case Architecture, Narrative Dossiers & Archives
*Detailed Day 2 Guide: [docs/day-2.md](docs/day-2.md)*

### Overview
Day 2 delivers the fictional investigative world of **CASEFILE 09**, authoring five distinct criminal cases with deep lore, authentic forensic reports, suspect alibis, and branching narrative outcomes.

### Authored Investigations (Case Dossiers)
1. **[CASE 001: The Silent Witness](docs/cases/case-001.md)**: Elena Vance homicide in locked Apt 4B; Marcus Sterling kickback conspiracy.
2. **[CASE 002: Midnight at Blackwood](docs/cases/case-002.md)**: Lord Alistair disappearance during nor'easter; Julian Blackwood disinheritance.
3. **[CASE 003: The Last Transmission](docs/cases/case-003.md)**: Jonas Miller signal tower vanishing; Officer Frank Navarro naval salvage coverup.
4. **[CASE 004: Ashes of Yesterday](docs/cases/case-004.md)**: Samuel Vance 1988 cold case elevator vault entombment; Raymond Cross land fraud.
5. **[CASE 009: The Ninth File](docs/cases/case-009.md)**: **Master Conspiracy Case**; *Project Chimera* linking all cases to Executive Director Vance Sterling.

### Key Systems Built
- **Evidence Taxonomy**: Categorization supporting Photographs, Documents, DNA, Ballistics, Toxicology, Fingerprints, Audio Transcripts, and Maps.
- **Searchable Case Archive** (`src/pages/ArchivePage.tsx`): Real-time keyword search and filters by difficulty and status.
- **Classified Case Briefing** (`src/pages/CaseBriefingPage.tsx`): Case dossier, crime scene imagery, victim dossier, and investigation commencement triggers.

---

## Day 3: Physical Evidence Board & Tactical Canvas
*Detailed Day 3 Guide: [docs/day-3.md](docs/day-3.md)*

### Overview
Day 3 implements the heart of the detective experience: a tactile physical evidence board built on an infinite, hardware-accelerated canvas using `@xyflow/react`.

### Key Systems Built
- **Interactive Canvas** (`src/components/investigation/BoardCanvas.tsx`):
  - Smooth pan, zoom (0.2x – 1.8x), mini-map, and grid snapping.
- **Custom Specialized Node Types**:
  - `PhotoNode.tsx`: Polaroid photographic styling with exhibit stamps and timestamps.
  - `DocumentNode.tsx`: Manila memo layout with confidential stamps and typewriter excerpts.
  - `ForensicNode.tsx`: Lab slide with verified stamp and specimen metadata.
  - `NoteNode.tsx`: Yellow sticky note with red pushpin graphic and inline editing.
  - `VictimNode.tsx`: Incident epicenter card at center top.
- **Yarn Connection Mechanics** (`src/components/investigation/edges/InvestigationEdge.tsx`):
  - Red string yarn paths with semantic relationship badges: `Supports`, `Contradicts`, `Establishes Timeline`, `Possible Motive`, `Related To`.
  - Audio string pluck feedback and quick-delete controls.

---

## Day 4: Criminalistics Laboratory & Interrogation Chamber
*Detailed Day 4 Guide: [docs/day-4.md](docs/day-4.md)*

### Overview
Day 4 introduces deep forensic laboratory examination tools and a cinematic suspect interrogation chamber with deterministic branching dialogue.

### Key Systems Built
- **Multi-Spectral Photo Examination Lab** (`src/components/laboratory/PhotoLab.tsx`):
  - Optical zoom (70%–250%) and 90° rotation.
  - Multi-spectral filters: Standard, UV Fluorescence, Infrared, and Optical Magnifier.
  - Clickable interactive hotspots revealing concealed physical clues.
- **Optical Document Decryptor** (`src/components/laboratory/DocumentLab.tsx`):
  - Typewriter typography on scanned parchment.
  - Interactive click-to-decode on blacked-out classified redactions.
  - SHA-256 integrity hash verification and custody metadata panel.
- **Forensic Report Workstation** (`src/components/laboratory/ForensicReportsLab.tsx`):
  - DNA Agarose Gel Electrophoresis with animated band migration.
  - Ballistics Split-Screen Comparator with movable barrel striation slider.
  - Toxicology HPLC Chromatogram with chemical retention curves.
- **Suspect Interrogation Chamber** (`src/components/interrogation/InterrogationRoom.tsx`):
  - Atmospheric lighting with reel-to-reel tape recorder animation.
  - Dynamic psychological composure/stress meter (0%–100%).
  - Branching dialogue trees with deterministic responses.
  - "Present Discovered Clue" drawer to confront suspects.
  - Contradiction exposure mechanic triggering confessions and alibi collapses.

---

## Day 5: Chronological Timeline, Deduction Engine & Launch
*Detailed Day 5 Guide: [docs/day-5.md](docs/day-5.md)*

### Overview
Day 5 completes the investigative loop: chronological timeline reconstruction, deterministic deduction theory builder, formal indictment submission, After-Action Reporting, scoring, and automated verification.

### Key Systems Built
- **Chronological Timeline Reconstruction** (`src/components/timeline/TimelineBoard.tsx`):
  - Multi-track timeline (Victim, Suspects, Forensic, Police).
  - Slot placement controls (Move Up / Down) with instant validation.
  - Automatic contradiction alerts when suspect statements clash with physical timestamps.
  - Real-time Chronological Integrity score (0%–100%).
- **Deduction Engine & Theory Board** (`src/components/deduction/TheoryBoard.tsx`):
  - Primary Perpetrator selection.
  - Documented Motive articulation.
  - Physical Execution Method & Opportunity reconstruction.
  - Crucial Supporting Evidence linkage.
  - Refuted Alibi and Contradiction linkage.
  - Live theory strength calculation.
- **Formal Indictment Submission** (`src/components/submission/CaseClosureModal.tsx`):
  - Case closure review modal before Grand Jury submission.
- **After-Action Report (AAR) & Results** (`src/pages/ResultsPage.tsx`):
  - Deterministic scoring algorithm out of 1000 points.
  - Outcome tiers: `Perfect`, `Partial`, `Failed`.
  - 6 investigator ranks (Trainee to Elite Investigator).
  - 8 unlockable commendation medals with celebratory confetti.
- **Automated Verification Test Suite** (`test-investigation-suite.ts`):
  - 50/50 automated test assertions passed verifying all 5 cases, deduction logic, timeline algorithms, and achievement states.

---

## Summary Verification Matrix

| Milestone | Module | Test Coverage | Status |
| :--- | :--- | :---: | :---: |
| **Day 1** | Scaffolding, Theme, Audio, Store, Intro, Onboarding | 100% | ✅ Complete |
| **Day 2** | Cases 001–009, Taxonomy, Archive, Case Briefing | 100% | ✅ Complete |
| **Day 3** | React Flow Canvas, Custom Nodes, Yarn Edges, Notes | 100% | ✅ Complete |
| **Day 4** | Photo Lab, Document Decryptor, Forensic Instruments, Interrogation | 100% | ✅ Complete |
| **Day 5** | Timeline, Deduction Engine, Scoring, AAR, 50/50 Automated Tests | 100% | ✅ Complete |
