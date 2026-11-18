# CASEFILE 09 // DAY 2: CASE ARCHITECTURE & NARRATIVE DOSSIERS

---

## 📋 Day 2 Goals & Deliverables
1. **Case Repository Structure**: Author 5 complete original fictional criminal investigations.
2. **Evidence Taxonomy**: Implement standardized data structures for Photographs, Documents, DNA, Ballistics, Toxicology, Fingerprints, Audio Transcripts, and Maps.
3. **Suspect Personas**: Design at least 3 suspects per case with detailed backgrounds, motives, claimed alibis, and psychological baselines.
4. **Searchable Case Archive**: Implement `ArchivePage.tsx` with real-time keyword search, difficulty filtering, and completion status toggles.
5. **Classified Case Briefing**: Build `CaseBriefingPage.tsx` with authentic crime scene photos, victim profiles, preliminary findings, objectives, and investigation commencement triggers.

---

## 📁 Authored Cases Matrix

| Case Code | Title | Victim | Suspects | Key Physical Clues |
| :--- | :--- | :--- | :--- | :--- |
| **CASE 001** | The Silent Witness | Elena Vance (32) | Marcus Sterling, Dr. Chloe Adams, Arthur Pendleton | Chamomile Teacup, Digoxin Ampoule, Alley CCTV, Master Keycard Log, Cash Deposit Slip |
| **CASE 002** | Midnight at Blackwood | Lord Alistair Blackwood (68) | Julian Blackwood, Vivienne Blackwood, Godfrey Moore | Persian Rug Blood Spatter, Amended Will Draft, Webley .38 Revolver, Muddy Riding Boots, Tide Chart |
| **CASE 003** | The Last Transmission | Jonas Miller (51) | Officer Frank Navarro, Dr. Sylvia Chen, Sean Briggs | Distress Audio Transcript, 9mm Hydra-Shok Casing, Cutter Navigation Log, Benthic Hydrophone Sonar, Salvage Manifest |
| **CASE 004** | Ashes of Yesterday | Samuel Vance (39) | Raymond Cross, Chief Henry Miller, Moira Bell | 1988 Skeletal Remains, Frozen Pocket Watch (23:42), Incendiary Thermite Residue, Safety Deposit Box 204 Deed, Falsified Case File |
| **CASE 009** | The Ninth File | Agent Victoria Sterling (34) | Director Vance Sterling, Agent Donald Graves, Dr. Evelyn Thorne | Toughbook CF-33 Laptop, 5.7x28mm AP Casing, Biometric Override Log, Torn Nomex Glove Fragment |

---

## 🧪 Day 2 Verification Checklist
- [x] All 5 cases registered in `ALL_CASES` registry with complete metadata.
- [x] Case 009 correctly gated behind Level 4 Clearance / prerequisite completions.
- [x] Keyword search filters cases instantly by title, code, victim, and summary.
- [x] Case Briefing loads high-res crime scene imagery, victim profiles, and objectives.
- [x] "Commence Active Investigation" button initializes session state and navigates to workspace.
