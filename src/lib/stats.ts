import type { Brief } from '@/state/BriefsContext';
import type { Progress } from '@/data/user';

export function deriveStats(progress: Progress, briefs: Record<string, Brief>) {
  const items = Object.values(progress.items);
  const quizzes = items.map((i) => i.quiz).filter((q): q is NonNullable<typeof q> => !!q);
  const correct = quizzes.reduce((n, q) => n + q.correct, 0);
  const total = quizzes.reduce((n, q) => n + q.total, 0);
  return {
    casesClosed: items.filter((i) => i.closedAt).length,
    quizAccuracy: total ? Math.round((correct / total) * 100) : null,
    verdictsCast: items.filter((i) => i.vote).length,
    briefsWritten: Object.values(briefs).filter((b) => b.status === 'done').length,
    streakDays: progress.streakDays,
  };
}

export function todayKey(d = new Date()) {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

export function daysBetween(a: string, b: string) {
  return Math.round((new Date(b).getTime() - new Date(a).getTime()) / 86400000);
}
