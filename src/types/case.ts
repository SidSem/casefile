export type Difficulty = 'rookie' | 'detective' | 'special_agent';

export type EvidenceCategory = 
  | 'photograph'
  | 'document'
  | 'fingerprint'
  | 'dna'
  | 'audio_transcript'
  | 'phone_record'
  | 'map'
  | 'witness_statement'
  | 'newspaper'
  | 'physical_object'
  | 'toxicology'
  | 'ballistics';

export type ConnectionRelationship = 
  | 'supports'
  | 'contradicts'
  | 'related_to'
  | 'establishes_timeline'
  | 'possible_motive';

export interface HotspotDetail {
  id: string;
  x: number; // percentage 0-100
  y: number; // percentage 0-100
  label: string;
  description: string;
  revealsEvidenceId?: string;
  requiresFilter?: 'normal' | 'uv' | 'infrared' | 'magnifier';
}

export interface ForensicData {
  type: 'fingerprint' | 'dna' | 'ballistics' | 'toxicology' | 'autopsy';
  summary: string;
  metrics: {
    label: string;
    value: string;
    match?: boolean;
    confidence?: number;
  }[];
  specimenNotes?: string;
  rawDetails?: string[];
  gelBands?: number[]; // For DNA gel visualization
  striationsMatch?: boolean; // For ballistics
  chemicalCompound?: string; // For toxicology
}

export interface EvidenceItem {
  id: string;
  caseId: string;
  title: string;
  description: string;
  detailedAnalysis?: string;
  category: EvidenceCategory;
  location: string;
  timestamp: string;
  imageUrl?: string;
  documentContent?: string[];
  forensicReport?: ForensicData;
  hotspots?: HotspotDetail[];
  associatedSuspectIds: string[];
  relatedEvidenceIds: string[];
  isInitialClue: boolean; // Revealed at case briefing or discovered in lab/interrogation
  isDiscovered?: boolean;
  isCrucial: boolean; // Critical to solving the case
  hiddenLayerRevealed?: boolean;
}

export interface DialogueOption {
  id: string;
  prompt: string;
  response: string;
  requiredEvidencePresented?: string;
  requiredPriorDialogueId?: string;
  stressDelta?: number; // Changes suspect stress level
  revealsEvidenceId?: string;
  revealsContradiction?: string;
  isAccusation?: boolean;
  isLocked?: boolean;
  lockReason?: string;
}

export interface Suspect {
  id: string;
  caseId: string;
  name: string;
  callsignOrAlias?: string;
  age: number;
  occupation: string;
  background: string;
  relationshipToVictim: string;
  knownMotive: string;
  claimedAlibi: string;
  personality: string;
  stressLevel: number; // 0-100
  portraitUrl: string;
  isCulprit: boolean;
  dialogueTree: DialogueOption[];
  contradictions: {
    id: string;
    statement: string;
    refutedByEvidenceId: string;
    revealedExplanation: string;
  }[];
}

export interface TimelineEvent {
  id: string;
  caseId: string;
  timeString: string; // e.g. "21:30"
  timestampMinutes: number; // For sorting e.g. 21*60+30
  title: string;
  description: string;
  category: 'victim' | 'suspect' | 'witness' | 'forensic' | 'police';
  suspectId?: string;
  associatedEvidenceId?: string;
  isContradiction?: boolean;
  contradictionNote?: string;
  isVerified: boolean;
  slotIndex?: number; // User placement slot
}

export interface CaseTheory {
  proposedCulpritId: string;
  motive: string;
  opportunityMethod: string;
  supportingEvidenceIds: string[];
  contradictedEvidenceIds: string[];
  timelineExplanation: string;
}

export interface CaseDeductionRules {
  correctCulpritId: string;
  correctMotiveId: string;
  validMotiveDescriptions: string[];
  correctMethodKeywords: string[];
  crucialEvidenceIds: string[];
  crucialRefutedEvidenceIds: string[];
  minRequiredSupportingEvidence: number;
}

export interface CaseData {
  id: string; // e.g. "case-001"
  code: string; // e.g. "CASE 001"
  title: string;
  classification: 'CONFIDENTIAL' | 'SECRET' | 'RESTRICTED' | 'TOP SECRET // EYES ONLY';
  difficulty: 'Rookie' | 'Detective' | 'Special Agent';
  location: string;
  incidentDate: string;
  summary: string;
  briefingNotes: string[];
  crimeScenePhoto: string;
  victim: {
    name: string;
    age: number;
    occupation: string;
    causeOfDeath: string;
    timeOfDeathEstimate: string;
  };
  objectives: string[];
  evidence: EvidenceItem[];
  suspects: Suspect[];
  timelineEvents: TimelineEvent[];
  deductionRules: CaseDeductionRules;
  narrativeConsequences: {
    perfect: {
      title: string;
      description: string;
      verdict: string;
    };
    partial: {
      title: string;
      description: string;
      verdict: string;
    };
    failed: {
      title: string;
      description: string;
      verdict: string;
    };
  };
  hints: {
    level1: string; // Nudge
    level2: string; // Guidance
    level3: string; // Revelation
  };
  isLocked?: boolean;
  unlockRequirement?: string;
}

export interface BoardNodeData {
  id: string;
  title: string;
  category: EvidenceCategory | 'suspect' | 'note';
  snippet: string;
  imageUrl?: string;
  suspectId?: string;
  evidenceId?: string;
  noteColor?: string;
  timestamp?: string;
  [key: string]: unknown;
}

export interface BoardConnection {
  id: string;
  source: string;
  target: string;
  relationship: ConnectionRelationship;
  label?: string;
}

export interface CaseScoreResult {
  caseId: string;
  culpritCorrect: boolean;
  motiveCorrect: boolean;
  methodCorrect: boolean;
  evidenceAccuracyScore: number; // 0-100
  timelineAccuracyScore: number; // 0-100
  interrogationScore: number; // 0-100
  hintCountUsed: number;
  hintPenalty: number;
  durationSeconds: number;
  totalScore: number; // 0-1000
  rankAwarded: InvestigatorRank;
  outcomeTier: 'perfect' | 'partial' | 'failed';
  unlockedAchievements: string[];
}

export type InvestigatorRank = 
  | 'Trainee'
  | 'Field Investigator'
  | 'Detective'
  | 'Senior Detective'
  | 'Special Investigator'
  | 'Elite Investigator';
