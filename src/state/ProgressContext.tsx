import { createContext, useContext, useMemo, type ReactNode } from 'react';

import type { VoteChoice } from '@/data/types';
import { emptyProgress, seededProgress, type ItemProgress, type Progress, type QuizResult } from '@/data/user';
import { daysBetween, todayKey } from '@/lib/stats';

import { KEYS, usePersistentState } from './storage';

type ProgressApi = {
  progress: Progress;
  ready: boolean;
  item: (id: string) => ItemProgress;
  isClosed: (id: string) => boolean;
  isSaved: (id: string) => boolean;
  markRead: (id: string) => void;
  saveQuiz: (id: string, result: QuizResult) => void;
  castVote: (id: string, vote: VoteChoice) => void;
  toggleSave: (id: string) => void;
  resetProgress: () => void;
  demoCloseTinker: () => void;
};

const Ctx = createContext<ProgressApi | null>(null);

function touch(p: Progress): Progress {
  const today = todayKey();
  if (p.lastActiveDate === today) return p;
  const gap = p.lastActiveDate ? daysBetween(p.lastActiveDate, today) : null;
  return { ...p, lastActiveDate: today, streakDays: gap === 1 ? p.streakDays + 1 : 1 };
}

function patchItem(p: Progress, id: string, patch: Partial<ItemProgress>): Progress {
  return touch({ ...p, items: { ...p.items, [id]: { ...p.items[id], ...patch } } });
}

export function ProgressProvider({ children }: { children: ReactNode }) {
  const [progress, setProgress, ready] = usePersistentState<Progress>(KEYS.progress, () => seededProgress(todayKey()));

  const api = useMemo<ProgressApi>(
    () => ({
      progress,
      ready,
      item: (id) => progress.items[id] ?? {},
      isClosed: (id) => !!progress.items[id]?.closedAt,
      isSaved: (id) => progress.saved.includes(id),
      markRead: (id) => setProgress((p) => (p.items[id]?.read ? p : patchItem(p, id, { read: true }))),
      saveQuiz: (id, result) => setProgress((p) => patchItem(p, id, { quiz: result })),
      castVote: (id, vote) =>
        setProgress((p) => patchItem(p, id, { vote, closedAt: p.items[id]?.closedAt ?? new Date().toISOString() })),
      toggleSave: (id) =>
        setProgress((p) => ({
          ...p,
          saved: p.saved.includes(id) ? p.saved.filter((s) => s !== id) : [id, ...p.saved],
        })),
      resetProgress: () => setProgress(emptyProgress),
      demoCloseTinker: () =>
        setProgress((p) => {
          const seeded = seededProgress(todayKey());
          return {
            ...p,
            items: { ...p.items, tinker: seeded.items.tinker },
            saved: p.saved.includes('tlo') ? p.saved : ['tlo', ...p.saved],
            streakDays: Math.max(p.streakDays, seeded.streakDays),
            lastActiveDate: todayKey(),
          };
        }),
    }),
    [progress, ready, setProgress],
  );

  return <Ctx.Provider value={api}>{children}</Ctx.Provider>;
}

export function useProgress() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error('useProgress must be used inside ProgressProvider');
  return ctx;
}
