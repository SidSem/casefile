import { CaseData } from '../../types/case';
import { CASE_001 } from './case001';
import { CASE_002 } from './case002';
import { CASE_003 } from './case003';
import { CASE_004 } from './case004';
import { CASE_009 } from './case009';

export const ALL_CASES: CaseData[] = [
  CASE_001,
  CASE_002,
  CASE_003,
  CASE_004,
  CASE_009,
];

export function getCaseById(caseId: string): CaseData | undefined {
  return ALL_CASES.find(c => c.id === caseId);
}
