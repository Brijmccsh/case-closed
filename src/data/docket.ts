import { bills } from './bills';
import { cases } from './cases';
import type { Bill, Case, DocketItem } from './types';

export const docket: DocketItem[] = [...cases, ...bills];

export const FEATURED_CASE_ID = 'mahanoy';

export function getItem(id: string): DocketItem | undefined {
  return docket.find((d) => d.id === id);
}

export function getCase(id: string): Case | undefined {
  return cases.find((c) => c.id === id);
}

export function getBill(id: string): Bill | undefined {
  return bills.find((b) => b.id === id);
}

export const briefableCases = cases.filter((c) => c.briefable);

/** Latest rulings first. */
export const latestRulings = [...cases].sort((a, b) => b.year - a.year);

export { bills, cases };
