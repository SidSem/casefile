import { CaseData, CaseTheory, CaseScoreResult, InvestigatorRank } from '../types/case';

export interface DeductionEvaluation {
  culpritCorrect: boolean;
  motiveCorrect: boolean;
  methodCorrect: boolean;
  evidenceAccuracyScore: number;
  timelineAccuracyScore: number;
  interrogationScore: number;
  tier: 'perfect' | 'partial' | 'failed';
  totalScore: number;
  rankAwarded: InvestigatorRank;
  narrativeOutcome: {
    title: string;
    description: string;
    verdict: string;
  };
  critique: string[];
}

export function evaluateDeduction(
  caseData: CaseData,
  theory: CaseTheory,
  timelineAccuracyScore: number,
  interrogationScore: number,
  hintsUsedCount: number,
  durationSeconds: number,
  difficulty: 'rookie' | 'detective' | 'special_agent'
): DeductionEvaluation {
  const rules = caseData.deductionRules;
  const critique: string[] = [];

  // 1. Evaluate Culprit
  const culpritCorrect = theory.proposedCulpritId === rules.correctCulpritId;
  if (!culpritCorrect) {
    critique.push("Accused individual has verifiable alibis or lacks definitive physical link to the primary crime scene.");
  } else {
    critique.push("Identified primary perpetrator correctly matching physical and circumstantial indicators.");
  }

  // 2. Evaluate Motive
  const submittedMotiveLower = theory.motive.toLowerCase();
  const motiveCorrect = rules.validMotiveDescriptions.some(desc => 
    submittedMotiveLower.includes(desc.toLowerCase()) || 
    desc.toLowerCase().includes(submittedMotiveLower) ||
    submittedMotiveLower.length > 10 && rules.validMotiveDescriptions.some(kw => submittedMotiveLower.includes(kw.split(' ')[0].toLowerCase()))
  );
  if (!motiveCorrect) {
    critique.push("Motive hypothesis fails to account for documented psychological or financial records.");
  } else {
    critique.push("Established authentic motive supported by case archive records.");
  }

  // 3. Evaluate Method
  const submittedMethodLower = theory.opportunityMethod.toLowerCase();
  const methodMatchCount = rules.correctMethodKeywords.filter(kw => 
    submittedMethodLower.includes(kw.toLowerCase())
  ).length;
  const methodCorrect = methodMatchCount >= 1 || submittedMethodLower.length > 20;
  if (!methodCorrect) {
    critique.push("Crime execution mechanism contradicts physical autopsy or forensic laboratory readings.");
  } else {
    critique.push("Reconstructed sequence of physical entry and weapon deployment accurately.");
  }

  // 4. Evidence Support Accuracy
  const linkedCrucial = rules.crucialEvidenceIds.filter(id => 
    theory.supportingEvidenceIds.includes(id)
  ).length;
  const crucialRatio = rules.crucialEvidenceIds.length > 0 
    ? (linkedCrucial / rules.crucialEvidenceIds.length) 
    : 1;

  const linkedContradictions = rules.crucialRefutedEvidenceIds.filter(id => 
    theory.contradictedEvidenceIds.includes(id)
  ).length;
  const contradictionRatio = rules.crucialRefutedEvidenceIds.length > 0
    ? (linkedContradictions / rules.crucialRefutedEvidenceIds.length)
    : 1;

  const evidenceAccuracyScore = Math.round((crucialRatio * 70 + contradictionRatio * 30));

  // Determine Tier
  let tier: 'perfect' | 'partial' | 'failed' = 'failed';
  if (culpritCorrect && motiveCorrect && methodCorrect && evidenceAccuracyScore >= 60) {
    tier = 'perfect';
  } else if (culpritCorrect) {
    tier = 'partial';
  } else {
    tier = 'failed';
  }

  // Calculate Base Score (Max 1000)
  let baseScore = 0;
  if (culpritCorrect) baseScore += 450;
  if (motiveCorrect) baseScore += 150;
  if (methodCorrect) baseScore += 100;
  baseScore += Math.round(evidenceAccuracyScore * 1.5); // up to 150
  baseScore += Math.round(timelineAccuracyScore * 0.75); // up to 75
  baseScore += Math.round(interrogationScore * 0.75); // up to 75

  // Difficulty multiplier & Hint penalty
  const penaltyPerHint = difficulty === 'special_agent' ? 80 : difficulty === 'detective' ? 45 : 20;
  const hintPenalty = hintsUsedCount * penaltyPerHint;

  // Time bonus/penalty (if solved under 15 minutes, bonus; capped)
  const timeBonus = durationSeconds < 900 ? Math.round((900 - durationSeconds) / 30) : 0;

  const totalScore = Math.max(80, Math.min(1000, baseScore - hintPenalty + timeBonus));

  // Determine Rank
  let rankAwarded: InvestigatorRank = 'Trainee';
  if (totalScore >= 900 && tier === 'perfect') {
    rankAwarded = 'Elite Investigator';
  } else if (totalScore >= 800) {
    rankAwarded = 'Special Investigator';
  } else if (totalScore >= 680) {
    rankAwarded = 'Senior Detective';
  } else if (totalScore >= 520) {
    rankAwarded = 'Detective';
  } else if (totalScore >= 350) {
    rankAwarded = 'Field Investigator';
  }

  const narrativeOutcome = caseData.narrativeConsequences[tier];

  return {
    culpritCorrect,
    motiveCorrect,
    methodCorrect,
    evidenceAccuracyScore,
    timelineAccuracyScore,
    interrogationScore,
    tier,
    totalScore,
    rankAwarded,
    narrativeOutcome,
    critique,
  };
}
