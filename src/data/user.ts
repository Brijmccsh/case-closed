import type { VoteChoice } from './types';

// SAMPLE CONTENT: demo persona progress so stats look alive on first launch.

export type QuizResult = { answers: number[]; correct: number; total: number };

export type ItemProgress = {
  read?: boolean;
  quiz?: QuizResult;
  vote?: VoteChoice;
  closedAt?: string;
};

export type Progress = {
  items: Record<string, ItemProgress>;
  saved: string[];
  streakDays: number;
  lastActiveDate: string | null;
};

export const emptyProgress: Progress = { items: {}, saved: [], streakDays: 0, lastActiveDate: null };

export function seededProgress(today: string): Progress {
  return {
    items: {
      tinker: { read: true, quiz: { answers: [1, 2, 1], correct: 3, total: 3 }, vote: 'yes', closedAt: today },
    },
    saved: ['tlo'],
    streakDays: 4,
    lastActiveDate: today,
  };
}

export const demoPersona = { name: 'Alex', grade: 10, state: 'Virginia' };

export const US_STATES = [
  'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware',
  'District of Columbia', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas',
  'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi',
  'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York',
  'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island',
  'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington',
  'West Virginia', 'Wisconsin', 'Wyoming',
];

/** Sample student-written brief, used only by the hidden demo tools. */
export const demoBriefAnswers: Record<string, Record<'facts' | 'question' | 'holding' | 'reasoning' | 'matters', string>> = {
  tinker: {
    facts:
      'Some students in Des Moines wore black armbands to school to protest the Vietnam War. The school suspended them for it.',
    question: 'Can a public school suspend students for wearing armbands as a silent protest, or is that protected by the First Amendment?',
    holding: 'The Supreme Court ruled 7–2 for the students.',
    reasoning:
      "Students don't lose their free speech rights at school. A school can only restrict expression if it would substantially disrupt school or invade other people's rights, and the armbands didn't.",
    matters:
      "At my school, students can wear a pin or shirt about an issue they care about. The school could only stop it if it seriously disrupted class or targeted other students.",
  },
};
