export type GlossarySegment = { kind: 'text'; text: string } | { kind: 'term'; text: string; term: string };

const TERM_RE = /\[\[([^\]|]+)(?:\|([^\]]+))?\]\]/g;

/**
 * Splits body text into plain and glossary segments.
 * `[[warrant]]` shows "warrant"; `[[dissent|dissents]]` looks up "dissent" but shows "dissents".
 */
export function parseGlossary(body: string): GlossarySegment[] {
  const out: GlossarySegment[] = [];
  let last = 0;
  for (const m of body.matchAll(TERM_RE)) {
    const idx = m.index ?? 0;
    if (idx > last) out.push({ kind: 'text', text: body.slice(last, idx) });
    const term = m[1].trim();
    out.push({ kind: 'term', term, text: (m[2] ?? m[1]).trim() });
    last = idx + m[0].length;
  }
  if (last < body.length) out.push({ kind: 'text', text: body.slice(last) });
  return out;
}

export function stripGlossary(body: string): string {
  return parseGlossary(body)
    .map((s) => s.text)
    .join('');
}
