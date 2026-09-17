import type { ImageSourcePropType } from 'react-native';

import type { TopicId } from '@/theme/tokens/topics';

export type VoteChoice = 'yes' | 'no' | 'unsure';

export type QuizQuestion = {
  id: string;
  prompt: string;
  options: [string, string, string, string];
  correctIndex: 0 | 1 | 2 | 3;
  explanation: string;
};

export type Poll = {
  question: string;
  /** Sample reader percentages (seeded demo data, not real votes). */
  sample: Record<VoteChoice, number>;
};

/** Body text may contain glossary markup: [[term]] or [[shown text|term]]. */
export type DocketSection = {
  key: 'happened' | 'decided' | 'means' | 'inBill' | 'standing';
  title: string;
  body: string;
};

export type PullQuote = { text: string; attribution: string };

export type DocketItemBase = {
  id: string;
  title: string;
  shortTitle: string;
  topic: TopicId;
  year: number;
  court: string;
  /** Short stamp for the court, e.g. "SUPREME COURT". */
  courtStamp: string;
  courtLevel: 'supreme' | 'other' | 'congress';
  /** Stamp-row status, e.g. "8–1" or "PASSED HOUSE". */
  status: string;
  tldr: string;
  sections: DocketSection[];
  pullQuote?: PullQuote;
  knowYourRights: string[];
  sourceUrl: string;
  sourceLabel: string;
  byline: string;
  editedBy: string;
  readMinutes: number;
  quiz: QuizQuestion[];
  poll: Poll;
  /** Ids of earlier / later docket items in the precedent chain. */
  precedents: { before: string[]; after: string[] };
  glossaryTerms: string[];
  coverImage?: ImageSourcePropType;
  keywords: string[];
};

export type Case = DocketItemBase & {
  kind: 'case';
  vote: string;
  briefable: boolean;
  /** Short name used in "Brief Tinker" style labels. */
  nickname: string;
  /** Extra context line shown under the decision, e.g. a later Supreme Court action. */
  note?: string;
};

export type BillStage = { label: string; state: 'done' | 'current' | 'upcoming'; detail?: string };

export type Bill = DocketItemBase & {
  kind: 'bill';
  stages: BillStage[];
  debate: { intro: string; sides: { label: string; points: string[] }[] };
  lastVerified: string;
  extraSources: { url: string; label: string }[];
};

export type DocketItem = Case | Bill;
