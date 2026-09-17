import { createContext, useContext, useMemo, type ReactNode } from 'react';

import { briefSteps, type StepId } from '@/data/coach';
import { demoBriefAnswers } from '@/data/user';

import { KEYS, usePersistentState } from './storage';

export type Brief = {
  caseId: string;
  answers: Partial<Record<StepId, string>>;
  stepIndex: number;
  hintsUsed: Partial<Record<StepId, number>>;
  status: 'draft' | 'done';
  updatedAt: string;
};

type BriefsApi = {
  briefs: Record<string, Brief>;
  ready: boolean;
  get: (caseId: string) => Brief | undefined;
  start: (caseId: string) => void;
  setAnswer: (caseId: string, step: StepId, text: string) => void;
  setStep: (caseId: string, index: number) => void;
  bumpHint: (caseId: string, step: StepId) => void;
  finish: (caseId: string) => void;
  remove: (caseId: string) => void;
  resetBriefs: () => void;
  demoJumpToStep: (caseId: string, index: number) => void;
  demoFinish: (caseId: string) => void;
};

const Ctx = createContext<BriefsApi | null>(null);

const blank = (caseId: string): Brief => ({
  caseId,
  answers: {},
  stepIndex: 0,
  hintsUsed: {},
  status: 'draft',
  updatedAt: new Date().toISOString(),
});

export function BriefsProvider({ children }: { children: ReactNode }) {
  const [briefs, setBriefs, ready] = usePersistentState<Record<string, Brief>>(KEYS.briefs, () => ({}));

  const api = useMemo<BriefsApi>(() => {
    const patch = (caseId: string, fn: (b: Brief) => Partial<Brief>) =>
      setBriefs((all) => {
        const b = all[caseId] ?? blank(caseId);
        return { ...all, [caseId]: { ...b, ...fn(b), updatedAt: new Date().toISOString() } };
      });

    const demoAnswers = (caseId: string, upTo: number) => {
      const sample = demoBriefAnswers[caseId];
      if (!sample) return {};
      return Object.fromEntries(briefSteps.slice(0, upTo).map((s) => [s.id, sample[s.id]]));
    };

    return {
      briefs,
      ready,
      get: (caseId) => briefs[caseId],
      start: (caseId) => setBriefs((all) => (all[caseId] ? all : { ...all, [caseId]: blank(caseId) })),
      setAnswer: (caseId, step, text) => patch(caseId, (b) => ({ answers: { ...b.answers, [step]: text } })),
      setStep: (caseId, index) => patch(caseId, () => ({ stepIndex: index })),
      bumpHint: (caseId, step) =>
        patch(caseId, (b) => ({ hintsUsed: { ...b.hintsUsed, [step]: Math.min(3, (b.hintsUsed[step] ?? 0) + 1) } })),
      finish: (caseId) => patch(caseId, () => ({ status: 'done', stepIndex: briefSteps.length - 1 })),
      remove: (caseId) =>
        setBriefs((all) => {
          const next = { ...all };
          delete next[caseId];
          return next;
        }),
      resetBriefs: () => setBriefs({}),
      demoJumpToStep: (caseId, index) =>
        patch(caseId, (b) => ({ answers: { ...demoAnswers(caseId, index), ...b.answers }, stepIndex: index, status: 'draft' })),
      demoFinish: (caseId) =>
        patch(caseId, () => ({ answers: demoAnswers(caseId, briefSteps.length), stepIndex: briefSteps.length - 1, status: 'done' })),
    };
  }, [briefs, ready, setBriefs]);

  return <Ctx.Provider value={api}>{children}</Ctx.Provider>;
}

export function useBriefs() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error('useBriefs must be used inside BriefsProvider');
  return ctx;
}
