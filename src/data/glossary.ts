export type GlossaryEntry = { term: string; definition: string; example?: string };

const entries: GlossaryEntry[] = [
  { term: 'majority opinion', definition: 'The official written explanation of a court’s decision, joined by most of the judges or justices. It sets the rule other courts follow.' },
  { term: 'dissent', definition: 'A written opinion by a judge or justice who disagrees with the majority. It doesn’t change the outcome, but it explains the other side.' },
  { term: 'precedent', definition: 'An earlier court decision that later courts follow when deciding similar cases. It keeps the law consistent over time.' },
  { term: 'First Amendment', definition: 'The part of the U.S. Constitution that protects freedom of speech, religion, the press, peaceful assembly, and petitioning the government.' },
  { term: 'Fourth Amendment', definition: 'The part of the U.S. Constitution that protects people from unreasonable searches and seizures by the government.' },
  { term: 'reasonable suspicion', definition: 'A specific, sensible reason to believe someone broke a rule or law. It’s a lower bar than probable cause.' },
  { term: 'probable cause', definition: 'Enough facts to make it reasonably likely that a crime happened or evidence will be found. Police usually need it for arrests and warrants.' },
  { term: 'warrant', definition: 'Written permission from a judge that allows police to search a place or arrest someone. The judge must see probable cause first.' },
  { term: 'Miranda warnings', definition: 'The rights police must read to someone in custody before questioning, like the right to stay silent and the right to a lawyer.' },
  { term: 'in custody', definition: 'When a reasonable person in your situation wouldn’t feel free to end questioning and leave. It’s what triggers Miranda warnings.' },
  { term: 'standing', definition: 'The right to bring a lawsuit. You have to show you were harmed, the other side caused it, and a court can actually fix it.' },
  { term: 'certiorari', definition: 'The Supreme Court’s decision to review a case. When the Court "denies certiorari," it declines to hear the case and the lower court’s ruling stands.' },
  { term: 'duty of care', definition: 'A legal responsibility to take reasonable steps to avoid causing harm to others. If you don’t, you can be held responsible.' },
  { term: 'bill', definition: 'A proposed law. It only becomes law after both the House and Senate pass the same version and the President signs it (or Congress overrides a veto).' },
  { term: 'committee', definition: 'A smaller group of members of Congress that studies bills on a topic, holds hearings, and decides which bills move forward.' },
];

export const glossary: Record<string, GlossaryEntry> = Object.fromEntries(
  entries.map((e) => [e.term.toLowerCase(), e]),
);

export function lookupTerm(term: string): GlossaryEntry | undefined {
  return glossary[term.toLowerCase()];
}
