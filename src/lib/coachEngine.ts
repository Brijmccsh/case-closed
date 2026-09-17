import { coach, type CoachCaseStep, type StepId } from '@/data/coach';

export type HintLevel = 0 | 1 | 2 | 3;

export type CoachReply = {
  kind: 'welcome' | 'tooShort' | 'probe' | 'affirm' | 'hint';
  text: string;
  /** True once the student's answer contains the key idea for this step. */
  onTrack: boolean;
};

const MIN_WORDS = 8;

function normalize(s: string) {
  return s.toLowerCase().replace(/[‘’]/g, "'").replace(/\s+/g, ' ');
}

export function ideasHit(step: CoachCaseStep, text: string): number {
  const t = normalize(text);
  return step.keywordGroups.filter((group) => group.some((k) => t.includes(normalize(k)))).length;
}

/**
 * The Coach. Pure and local: scripted Socratic replies, never the answer.
 *
 * hintLevel 0 = react to what the student wrote; 1–3 = "Nudge me" tiers.
 *
 * LLM seam: to swap in a real model later, keep this signature and replace the body with
 * a call that sends the step prompt, the student's text, and a system rule of
 * "ask one guiding question; never state the holding". Keep the scripted path as fallback.
 */
export function coachReply(caseId: string, stepId: StepId, studentText: string, hintLevel: HintLevel): CoachReply {
  const step = coach[caseId]?.[stepId];
  if (!step) {
    return { kind: 'probe', text: 'What stands out to you most about this case so far?', onTrack: false };
  }

  const text = studentText.trim();
  const hits = ideasHit(step, text);
  const onTrack = hits >= step.needed;

  if (hintLevel > 0) {
    return { kind: 'hint', text: step.hints[hintLevel - 1], onTrack };
  }

  const words = text ? text.split(/\s+/).length : 0;
  if (words === 0) return { kind: 'probe', text: step.probe, onTrack: false };
  if (onTrack) return { kind: 'affirm', text: `${step.affirm} ${step.followUp}`, onTrack };
  if (words < MIN_WORDS) return { kind: 'tooShort', text: step.tooShort, onTrack };
  return { kind: 'probe', text: step.probe, onTrack };
}

export function courtAnswer(caseId: string, stepId: StepId): string | undefined {
  return coach[caseId]?.[stepId]?.courtAnswer;
}

/** Simulated "thinking" time before a reply, so the Coach feels live. */
export function thinkingMs(text: string) {
  return 700 + Math.min(600, text.length * 4);
}
