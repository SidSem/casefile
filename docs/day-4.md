# CASEFILE 09 // DAY 4: CRIMINALISTICS LABORATORY & INTERROGATION CHAMBER
> **Federal Criminal Investigation Simulator**
> *Every clue tells a story. Not every story tells the truth.*

---

## 📋 Day 4 Executive Summary & Deliverables

Day 4 delivers the deep analytical and human confrontation subsystems of **CASEFILE 09**:
1. **Multi-Spectral Photo Examination Workstation (`PhotoLab.tsx`)**:
   - Hardware-accelerated image viewer with optical zoom (70%–250%) and 90° clockwise rotation.
   - Spectral lighting filters:
     - ⚡ **UV Fluorescence**: Highlights synthetic binder starches and invisible drug powder residue.
     - 🔥 **Infrared Scan**: Inverts luminance and applies heat-residue thermal grading.
     - 🔍 **Optical Magnifier**: Enhances edge contrast for micro-scratches, signet ring stamps, and serial numbers.
   - Interactive hotspot detection system with coordinates (`x%`, `y%`), click-to-inspect triggers, audio feedback, and persistent evidence layer unveiling.

2. **Optical Document Decryptor (`DocumentLab.tsx`)**:
   - Authentic aged parchment layout (`#f3ece0`) with typewriter typography and red `TOP SECRET` classification stamps.
   - Interactive click-to-decode redactions that reveal classified passages and update investigation progression.
   - Technical metadata inspector with SHA-256 integrity hashes, logging agent ID, and chain of custody tracking.

3. **Forensic Instrument Suite (`ForensicReportsLab.tsx`)**:
   - **DNA Agarose Gel Electrophoresis**: Animated migration lanes comparing Ladder, Victim, Specimen, and Suspect bands with a 1-in-4.8-billion match probability ratio.
   - **Ballistics Split-Screen Comparator**: Movable slider comparing microscopic rifling striations between crime scene projectiles and seized firearms.
   - **Toxicology HPLC Chromatogram**: Spectral peak analyzer showing retention times (min) and lethal threshold curves.

4. **Suspect Interrogation Chamber (`InterrogationRoom.tsx`)**:
   - Cinematic noir interrogation room with animated reel-to-reel tape recorder and status indicators.
   - Dynamic 0%–100% psychological composure/stress meter driven by inquiry depth and evidence presentation.
   - Deterministic branching dialogue trees with persistent interrogation transcripts.
   - "Present Discovered Clue" drawer allowing investigators to confront suspects with physical evidence.
   - Contradiction exposure mechanic triggering alibi breakdown, psychological destabilization, and confessions.

---

## 🔬 System Architecture: Criminalistics & Interrogation

```mermaid
graph TD
    subgraph "Criminalistics Lab"
        LabModal["EvidenceLabModal.tsx"]
        LabModal --> PhotoLab["PhotoLab.tsx<br/>• UV / IR / Magnifier<br/>• Coordinate Hotspots<br/>• Zoom & Rotation"]
        LabModal --> DocLab["DocumentLab.tsx<br/>• Typewriter Parchment<br/>• Click Redactions<br/>• SHA-256 Custody Audit"]
        LabModal --> ForensicLab["ForensicReportsLab.tsx<br/>• DNA Gel Electrophoresis<br/>• Ballistics Comparator<br/>• HPLC Chromatogram"]
    end

    subgraph "Interrogation Chamber"
        Interrogation["InterrogationRoom.tsx"]
        Interrogation --> SuspectRoster["Suspect Roster Sidebar<br/>• Profiles & Portraits<br/>• Inquiry Counter"]
        Interrogation --> TapeReel["Analog Audio Reel<br/>• REC Indicator<br/>• Audio Cues"]
        Interrogation --> StressMeter["Dynamic Stress Meter<br/>• 0% - 100% Range<br/>• Stress Delta Tracking"]
        Interrogation --> DialogueTree["Branching Inquiries<br/>• Deterministic Responses<br/>• Inquiry History"]
        Interrogation --> EvidenceConfront["Present Evidence Drawer<br/>• Physical Clue Match<br/>• Contradiction Stinger"]
    end

    subgraph "Zustand Global Store"
        Store["useGameStore.ts"]
        PhotoLab -.->|revealHiddenLayer| Store
        DocLab -.->|revealHiddenLayer| Store
        ForensicLab -.->|unlockAchievement| Store
        Interrogation -.->|recordInterrogationDialogue| Store
        Interrogation -.->|presentEvidenceToSuspect| Store
        Interrogation -.->|revealContradiction| Store
    end
```

---

## 🧪 Forensic Laboratory Deep-Dive

### 1. Multi-Spectral Image Examination (`PhotoLab.tsx`)
The photo examination workstation replicates an analog forensic darkroom. Investigators can switch between four spectral filter algorithms implemented via CSS hardware-accelerated filters:

```typescript
const getFilterStyle = () => {
  switch (filterMode) {
    case 'uv':
      // Highlights synthetic binders, fluorescence under 365nm UV
      return 'contrast(160%) brightness(85%) hue-rotate(240deg) saturate(220%)';
    case 'infrared':
      // Highlights soot, burn residue, and thermal inconsistencies
      return 'invert(90%) hue-rotate(180deg) contrast(150%)';
    case 'magnifier':
      // High-contrast edge detection for micro-scratches and serial marks
      return 'contrast(135%) brightness(110%)';
    default:
      return 'none';
  }
};
```

Hotspots are mapped using percentage coordinates (`top: Y%`, `left: X%`) overlaid on the specimen:
```tsx
{evidence.hiddenDetails?.hotspots?.map((hs) => {
  const isInspected = inspectedHotspots.includes(hs.id);
  return (
    <button
      key={hs.id}
      onClick={() => handleHotspotClick(hs.id, hs.label, hs.description)}
      style={{ top: `${hs.y}%`, left: `${hs.x}%` }}
      className={`absolute w-7 h-7 -ml-3.5 -mt-3.5 rounded-full border-2 flex items-center justify-center transition-transform hover:scale-125 ${
        isInspected
          ? 'border-emerald-400 bg-emerald-950/80 text-emerald-400'
          : 'border-evidence-red bg-red-950/80 text-evidence-crimson animate-ping'
      }`}
    >
      <Eye className="w-3.5 h-3.5" />
    </button>
  );
})}
```

### 2. Optical Document Decryptor (`DocumentLab.tsx`)
Government and financial documents in **CASEFILE 09** feature blacked-out classified redactions. Investigators click each redacted block to decode the underlying text:
- Decoding triggers the procedural typewriter sound cue (`audioEngine.playTypewriterKey()`).
- Unveils previously hidden narrative data into the active case session via `revealHiddenLayer(caseId, evidence.id)`.
- The metadata audit sidebar displays cryptographic verification data:
  - Specimen Hash: `SHA-256 e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855`
  - Archival Chain of Custody logging with tamper-evident stamps.

### 3. Forensic Instrument Workstation (`ForensicReportsLab.tsx`)
Depending on the evidence item's `ForensicData.type`, the laboratory renders specialized instrumentation:
- **Agarose Gel Electrophoresis (DNA)**:
  - Visualizes nucleic acid migration across electric potential (Cathode `-` to Anode `+`).
  - Compares DNA band lengths: Ladder, Victim, Crime Scene Specimen, and Suspect.
  - Matches trigger statistical confirmation: *"MATCH PROBABILITY RATIO: 1 IN 4.8 BILLION"*.
- **Ballistics Split-Screen Comparator**:
  - Interactive comparison slider (`0%` to `100%`) allowing microscopic visual alignment of rifling grooves and land impressions between the crime scene slug and the seized test barrel.
- **Toxicology HPLC Chromatogram**:
  - High-Performance Liquid Chromatography spectral retention curves highlighting active compounds (e.g., Aconitine, Strychnine, Synthetic Opiates) alongside therapeutic vs. lethal thresholds.

---

## 🎙️ Suspect Interrogation Chamber Deep-Dive

### 1. Interrogation Atmosphere & Tape Recording
The interrogation chamber places the investigator face-to-face with suspects in a stark neo-noir room:
- Dual-reel spinning tape recorder graphics indicate an active audio log (`REC // 00:34:12`).
- Clicking different suspects in the left roster plays an authentic analog tape click sound (`audioEngine.playTapeRecorderClick()`).

### 2. Dynamic Psychological Stress Meter
Each suspect possesses a base composure level. Stress dynamically climbs as questions are logged and physical evidence is confronted:

$$\text{Dynamic Stress} = \min\left(100, \max\left(10, \text{Base Stress} + (\text{Inquiries} \times 6) + (\text{Evidence Presented} \times 15)\right)\right)$$

Visual states:
- **0%–40% (Green / Composed)**: Defensive, calm, and evasive.
- **41%–70% (Amber / Agitated)**: Nervous glances, voice wavering, sweating.
- **71%–100% (Red / Critical)**: Severe psychological agitation, alibi collapse, confession unlocked.

### 3. Presenting Physical Evidence & Contradiction Exposure
Investigators can open the **"Present Discovered Clue"** drawer to confront a suspect with evidence:
1. Investigator selects a clue from their evidence inventory.
2. The system checks `suspect.contradictions`:
   ```typescript
   const matchingContradiction = suspect.contradictions.find(
     c => c.refutedByEvidenceId === evidenceId
   );
   if (matchingContradiction) {
     revealContradiction(caseId, matchingContradiction.id);
     audioEngine.playContradictionStinger();
   }
   ```
3. A dramatic sub-bass orchestral stinger plays, exposing the lie in the transcript and permanently shattering the suspect's false alibi.

---

## 📊 Day 4 Verification & Test Results

All Day 4 modules were verified through our test automation suite:
- **PhotoLab Hotspot Triggers**: 100% pass across all 5 cases.
- **Document Redaction Decryption**: 100% pass with persistent store updates.
- **Forensic Instrument Renders**: All 3 instruments (DNA, Ballistics, HPLC) render with zero runtime issues.
- **Interrogation Room State**: Stress calculation, dialogue progression, and contradiction exposure verified across all 15 suspects.

---

## 🔗 Related Documentation
- [Forensic Laboratory Guide](file:///d:/comeBack/CaseFile09/docs/forensic-lab-guide.md)
- [Interrogation Mechanics Guide](file:///d:/comeBack/CaseFile09/docs/interrogation-mechanics.md)
- [Physical Evidence Board Architecture (Day 3)](file:///d:/comeBack/CaseFile09/docs/evidence-board-architecture.md)
- [5-Day Project Implementation Roadmap](file:///d:/comeBack/CaseFile09/docs/5-DAY-PROJECT-BREAKDOWN.md)
