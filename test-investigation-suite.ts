import { ALL_CASES, getCaseById } from './src/data/cases';
import { evaluateDeduction } from './src/engine/deductionEngine';
import { evaluateTimelineOrder } from './src/engine/timelineEngine';
import { MASTER_ACHIEVEMENTS } from './src/data/achievements';

console.log('====================================================');
console.log('CASEFILE 09: AUTOMATED INVESTIGATION SYSTEM AUDIT');
console.log('====================================================\n');

let totalTests = 0;
let passedTests = 0;

function assert(condition: boolean, testName: string) {
  totalTests++;
  if (condition) {
    passedTests++;
    console.log(`[PASS] ${testName}`);
  } else {
    console.error(`[FAIL] ${testName}`);
    process.exitCode = 1;
  }
}

// 1. Case Dataset Integrity Check
console.log('--- 1. AUDITING CASE FILES & ARCHIVES ---');
assert(ALL_CASES.length === 5, 'Exactly 5 cases registered in Federal Archive');

ALL_CASES.forEach((c) => {
  assert(!!c.id && !!c.title && !!c.code, `Case ${c.code} has valid metadata`);
  assert(c.suspects.length >= 3, `Case ${c.code} has at least 3 suspects (has ${c.suspects.length})`);
  assert(c.evidence.length >= 4, `Case ${c.code} has at least 4 evidence items (has ${c.evidence.length})`);
  assert(c.timelineEvents.length >= 4, `Case ${c.code} has chronological events (has ${c.timelineEvents.length})`);
  assert(!!c.deductionRules.correctCulpritId, `Case ${c.code} has a designated culprit`);
  assert(c.deductionRules.crucialEvidenceIds.length >= 2, `Case ${c.code} specifies crucial evidence items`);
  assert(!!c.narrativeConsequences.perfect && !!c.narrativeConsequences.partial && !!c.narrativeConsequences.failed, `Case ${c.code} has all 3 narrative consequence branches`);
});

// Verify Case 009 is locked initially as the Master Case
const case009 = getCaseById('case-009');
assert(case009?.isLocked === true, 'Case 009 (The Ninth File) is locked for Level 4 Clearance');

// 2. Deduction Engine Simulation on Case 001
console.log('\n--- 2. AUDITING DEDUCTION & INDICTMENT ENGINE ---');
const case001 = getCaseById('case-001')!;

// Simulation A: Perfect Indictment on Case 001
const perfectTheory = {
  proposedCulpritId: case001.deductionRules.correctCulpritId,
  motive: 'Elena Vance uncovered $1.4M in offshore kickbacks from the Mercer harbor project and was going to publish the indictment',
  opportunityMethod: 'Marcus Sterling bribed Arthur Pendleton $25,000 for the master key, entered Apt 4B, poisoned Elena Vance tea with PharmaCore Digoxin, and fled through the basement incinerator',
  supportingEvidenceIds: ['ev-001-tea', 'ev-001-vial', 'ev-001-cctv', 'ev-001-dossier'],
  contradictedEvidenceIds: ['ev-001-cctv', 'ev-001-keycard'],
  timelineExplanation: 'Detailed timeline showing entry at 21:08 and exit at 21:48',
};

const perfectEval = evaluateDeduction(
  case001,
  perfectTheory,
  100, // timeline score
  100, // interrogation score
  0,   // hints used
  480, // duration in seconds (8 mins)
  'detective'
);

assert(perfectEval.culpritCorrect === true, 'Case 001: Correct culprit identified (Marcus Sterling)');
assert(perfectEval.motiveCorrect === true, 'Case 001: Motive validated (Mercer harbor kickbacks)');
assert(perfectEval.methodCorrect === true, 'Case 001: Method validated (Digoxin in chamomile tea)');
assert(perfectEval.tier === 'perfect', 'Case 001: Perfect tier achieved');
assert(perfectEval.totalScore >= 900, `Case 001: High score achieved (${perfectEval.totalScore} pts)`);
assert(perfectEval.rankAwarded === 'Elite Investigator', `Case 001: Elite Investigator rank conferred (${perfectEval.rankAwarded})`);

// Simulation B: False Accusation
const falseTheory = {
  proposedCulpritId: 'susp-001-chloe',
  motive: 'Personal dispute between university roommates',
  opportunityMethod: 'Stabbed with lab scalpel',
  supportingEvidenceIds: ['ev-001-tea'],
  contradictedEvidenceIds: [],
  timelineExplanation: 'None',
};

const falseEval = evaluateDeduction(
  case001,
  falseTheory,
  40,
  30,
  2,
  600,
  'detective'
);

assert(falseEval.culpritCorrect === false, 'False Accusation: Culprit correctly rejected');
assert(falseEval.tier === 'failed', 'False Accusation: Tier classified as failed');

// 3. Timeline Reconstruction Validation
console.log('\n--- 3. AUDITING TIMELINE RECONSTRUCTION ENGINE ---');
const case002 = getCaseById('case-002')!;

// Correctly sorted IDs
const sortedEventIds = [...case002.timelineEvents]
  .sort((a, b) => a.timestampMinutes - b.timestampMinutes)
  .map(e => e.id);

const timelineValid = evaluateTimelineOrder(case002.timelineEvents, sortedEventIds);
assert(timelineValid.score === 100, `Timeline Engine: Perfect chronological alignment yields 100% (${timelineValid.score}%)`);
assert(timelineValid.isCorrectOrder === true, 'Timeline Engine: Correct order verified');

// Inverted order test
const invertedEventIds = [...sortedEventIds].reverse();
const timelineInverted = evaluateTimelineOrder(case002.timelineEvents, invertedEventIds);
assert(timelineInverted.score < 60, `Timeline Engine: Inverted order penalized (${timelineInverted.score}%)`);

// 4. Commendations & Achievements
console.log('\n--- 4. AUDITING COMMENDATIONS & MEDALS ---');
assert(MASTER_ACHIEVEMENTS.length === 8, 'Master achievements count verified (8 badges)');
const firstBlood = MASTER_ACHIEVEMENTS.find(a => a.id === 'first_blood');
const sharpEye = MASTER_ACHIEVEMENTS.find(a => a.id === 'sharp_eye');
const ninthKey = MASTER_ACHIEVEMENTS.find(a => a.id === 'the_ninth_key');
assert(!!firstBlood && !!sharpEye && !!ninthKey, 'Core achievements mapped properly');

console.log('\n====================================================');
console.log(`AUDIT RESULTS: ${passedTests} / ${totalTests} TESTS PASSED`);
console.log('====================================================\n');
