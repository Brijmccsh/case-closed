// Scripted Coach content, written by the team. Every hint ends in a question and never
// states the answer. `courtAnswer` is only revealed on the done screen ("Compare with the court").

export type StepId = 'facts' | 'question' | 'holding' | 'reasoning' | 'matters';

export type CoachStepDef = {
  id: StepId;
  label: string;
  prompt: string;
  placeholder: string;
};

export const briefSteps: CoachStepDef[] = [
  {
    id: 'facts',
    label: 'Facts',
    prompt: 'Who was involved, and what happened before anyone went to court?',
    placeholder: 'A student… The school…',
  },
  {
    id: 'question',
    label: 'Legal question',
    prompt: 'What yes-or-no question did the court have to answer?',
    placeholder: 'Did the school violate…?',
  },
  {
    id: 'holding',
    label: 'Holding',
    prompt: 'What did the court decide, and by what vote?',
    placeholder: 'The Court ruled…',
  },
  {
    id: 'reasoning',
    label: 'Reasoning',
    prompt: 'Why did the majority decide that way? What rule did they use?',
    placeholder: 'Because…',
  },
  {
    id: 'matters',
    label: 'Why it matters',
    prompt: 'How could this change what happens at your school?',
    placeholder: 'At my school, this means…',
  },
];

export type CoachCaseStep = {
  /** Each inner array is one idea; any synonym in it counts as a hit. */
  keywordGroups: string[][];
  /** How many idea groups count as "got the key idea". */
  needed: number;
  tooShort: string;
  probe: string;
  hints: [string, string, string];
  affirm: string;
  followUp: string;
  courtAnswer: string;
};

export type CoachCase = Record<StepId, CoachCaseStep>;

export const coach: Record<string, CoachCase> = {
  tinker: {
    facts: {
      keywordGroups: [['armband', 'arm band'], ['suspend', 'suspension', 'punish', 'sent home'], ['vietnam', 'war', 'protest']],
      needed: 2,
      tooShort: "Good start. Can you add who was involved and what they did?",
      probe: 'What did the students actually do at school, and how did the school respond?',
      hints: [
        'Think about what the students wore. What made it a protest?',
        'What was the protest about, and what did the school do to the students afterward?',
        'The students wore something on their arms, and the school handed out a punishment. What was the item, and what was the punishment?',
      ],
      affirm: "That's the core of it: a quiet protest and a school punishment.",
      followUp: 'Can you add what the protest was about, so a reader knows why it mattered?',
      courtAnswer:
        'Students wore black armbands to school to protest the Vietnam War, and the school suspended them.',
    },
    question: {
      keywordGroups: [['speech', 'expression', 'first amendment', 'free speech'], ['school', 'student'], ['suspend', 'punish', 'restrict', 'ban', 'allowed']],
      needed: 2,
      tooShort: 'Try writing it as a full question that starts with "Can" or "Did".',
      probe: 'Which right were the students saying the school took away?',
      hints: [
        'A legal question can be answered yes or no. What were the students and the school arguing about?',
        'Which part of the Constitution protects speech, and does it protect students too?',
        'Try this shape: "Can a public school ___ students for ___?" What goes in the blanks?',
      ],
      affirm: "That's a clear yes-or-no question a court could answer.",
      followUp: 'Does your question make it clear this is about a public school?',
      courtAnswer:
        "Can a public school punish students for wearing armbands as a form of expression, or does that violate the First Amendment?",
    },
    holding: {
      keywordGroups: [['7-2', '7–2', '7 to 2', 'seven'], ['student', 'students'], ['won', 'favor', 'ruled for', 'sided', 'violated', 'protected']],
      needed: 2,
      tooShort: 'Who won? Add the vote if you remember it.',
      probe: 'Which side did the Court rule for?',
      hints: [
        'Look back at the stamp row at the top of the case. What vote does it show?',
        'Did the Court side with the students or the school district?',
        'How many justices were in the majority, and how many disagreed?',
      ],
      affirm: 'Yes, and including the vote shows how divided (or not) the Court was.',
      followUp: 'Can you say it in one sentence a friend would understand?',
      courtAnswer: 'The Supreme Court ruled 7–2 for the students.',
    },
    reasoning: {
      keywordGroups: [['disrupt', 'disruption', 'distract'], ['rights of others', "others' rights", 'other people', 'invade'], ['schoolhouse gate', 'shed', 'keep their rights']],
      needed: 1,
      tooShort: "Say a little more. What test did the Court give schools?",
      probe: 'What would have to be true for a school to be allowed to restrict student speech?',
      hints: [
        'The Court gave schools a test. What might make student speech a real problem at school?',
        'Did the armbands stop classes from happening? Why might that matter to the justices?',
        "The rule has two parts: one about school running normally and one about other people. What are they?",
      ],
      affirm: "You found the rule. That's the part future cases keep using.",
      followUp: 'Can you connect the rule back to the armbands? Did they meet that test?',
      courtAnswer:
        "Schools can't restrict student expression unless it would substantially disrupt school or invade the rights of others. Students don't shed their constitutional rights \"at the schoolhouse gate.\"",
    },
    matters: {
      keywordGroups: [['my school', 'our school', 'at school', 'students'], ['speech', 'express', 'protest', 'wear', 'say', 'post'], ['disrupt', 'rights', 'allowed', 'can']],
      needed: 2,
      tooShort: 'Picture a real moment at your school. What would change?',
      probe: 'Can you give one specific example from your own school?',
      hints: [
        'Think about a time a student wanted to express an opinion at school. Would this case apply?',
        'Where is the line at your school between expressing yourself and disrupting class?',
        'What could you wear or say at school because of Tinker, and what still would not be allowed?',
      ],
      affirm: 'That connects the case to real life. That is the whole point of a brief.',
      followUp: 'Is there a situation where your school could still step in?',
      courtAnswer:
        "Students at public schools can express views, including symbolic protest, unless it would substantially disrupt school or invade others' rights. Later cases like Mahanoy built on this rule.",
    },
  },

  mahanoy: {
    facts: {
      keywordGroups: [['snapchat', 'snap', 'post', 'story', 'social media'], ['cheer', 'jv', 'varsity', 'team'], ['weekend', 'off campus', 'off-campus', 'outside school']],
      needed: 2,
      tooShort: 'Can you add who was involved and what she posted?',
      probe: 'Where was the student when she posted, and what did the school do about it?',
      hints: [
        "Start with what the student was upset about. What didn't go her way?",
        'Where and when did she post, and why might that detail matter later?',
        'She lost a spot on one team and got suspended from another. What happened in between?',
      ],
      affirm: "That's it: an off-campus post and a school punishment.",
      followUp: 'Did you mention that it happened on a weekend, away from school?',
      courtAnswer:
        "A student who didn't make varsity cheer posted a profane Snapchat story on a weekend, off campus. The school suspended her from JV cheer.",
    },
    question: {
      keywordGroups: [['off campus', 'off-campus', 'outside school', 'weekend'], ['speech', 'first amendment', 'post', 'expression'], ['punish', 'suspend', 'discipline', 'regulate']],
      needed: 2,
      tooShort: 'Try writing it as a full question that starts with "Can" or "Did".',
      probe: 'What made this different from speech inside a classroom?',
      hints: [
        'A legal question can be answered yes or no. What was the school and the student arguing about?',
        'Does it matter that she was not at school when she posted? Why?',
        'Try this shape: "Can a school punish a student for ___ said ___?" What goes in the blanks?',
      ],
      affirm: "That's a clear yes-or-no question, and it focuses on the off-campus part.",
      followUp: 'Does your question name the right involved, the First Amendment?',
      courtAnswer:
        "Did the school violate the student's First Amendment rights by punishing her for speech she posted off campus?",
    },
    holding: {
      keywordGroups: [['8-1', '8–1', '8 to 1', 'eight'], ['violated', 'student won', 'her favor', 'for her', 'for the student'], ['first amendment', 'rights', 'speech']],
      needed: 2,
      tooShort: 'Who won? Add the vote if you remember it.',
      probe: 'Which side did the Court rule for, and why does the vote matter?',
      hints: [
        'Look at the stamp row at the top of the case. What vote does it show?',
        'Did the Court think the school stayed within its power, or went past it?',
        'How many justices agreed with the majority, and what right did they say was violated?',
      ],
      affirm: 'Right, and the lopsided vote tells you most justices agreed.',
      followUp: 'Did the Court say schools can never touch off-campus speech? Worth checking.',
      courtAnswer: "The Supreme Court ruled 8–1 that the school violated the student's First Amendment rights.",
    },
    reasoning: {
      keywordGroups: [['weaker', 'less power', 'less', 'limited'], ['bully', 'bullying', 'threat', 'threats'], ['off campus', 'off-campus', 'outside school']],
      needed: 1,
      tooShort: 'Say a little more. Can schools still do anything about off-campus speech?',
      probe: "Did the Court say schools have zero power off campus, or something in between?",
      hints: [
        "Think about the limits. Is there any off-campus speech a school might still need to deal with?",
        "What kinds of online posts could still hurt other students at school?",
        "The Court compared a school's power on campus and off campus. Which is stronger, and what are the exceptions?",
      ],
      affirm: "That's the key nuance. Schools keep some power, but less of it off campus.",
      followUp: 'Can you connect that back to her Snapchat? Why did it not fall under the exceptions?',
      courtAnswer:
        "Schools can still regulate some off-campus speech, like bullying or threats, but their power to regulate student speech is weaker off campus.",
    },
    matters: {
      keywordGroups: [['post', 'online', 'social media', 'snap', 'instagram', 'tiktok'], ['school', 'suspend', 'punish'], ['bully', 'threat', 'weekend', 'off campus', 'home']],
      needed: 2,
      tooShort: 'Picture something a student at your school might post. What would change?',
      probe: 'Can you give one specific example from your own school?',
      hints: [
        'Think about something a student might post from home. Could your school punish them for it?',
        'What kind of post could your school still act on, even from home?',
        'Where is the line between venting online and bullying someone, and who decides?',
      ],
      affirm: 'That makes the case real. Nice work connecting it to your own life.',
      followUp: 'Is there a kind of post your school could still act on?',
      courtAnswer:
        "Students have more protection for what they say off campus, but schools can still step in for things like bullying or threats. It builds on Tinker v. Des Moines.",
    },
  },

  tlo: {
    facts: {
      keywordGroups: [['purse', 'bag'], ['smok', 'cigarette'], ['marijuana', 'drug', 'dealing'], ['assistant principal', 'principal', 'school official']],
      needed: 2,
      tooShort: 'Can you add who searched what, and why?',
      probe: 'What started the search, and what did the school find?',
      hints: [
        'What was the student caught doing that got her sent to the office?',
        'Who searched her, and what did they search?',
        'The search found something more serious than what started it. What was it?',
      ],
      affirm: "That's it: a rule broken, a search, and what it turned up.",
      followUp: 'Did you mention who did the search? That detail matters for the legal question.',
      courtAnswer:
        "An assistant principal searched a student's purse after she was caught smoking and found evidence of marijuana dealing.",
    },
    question: {
      keywordGroups: [['fourth amendment', 'search', 'searches'], ['school official', 'school', 'principal'], ['warrant', 'probable cause', 'reasonable', 'need']],
      needed: 2,
      tooShort: 'Try writing it as a full question that starts with "Does" or "Can".',
      probe: 'Were the school officials acting like police? Does that matter?',
      hints: [
        'Which part of the Constitution is about searches?',
        'Does that protection apply when the person searching is a school official instead of a police officer?',
        'There are really two parts: does the rule apply at school, and if so, what do officials need first? Can you ask both?',
      ],
      affirm: "Good. You spotted that this is about who the rule applies to.",
      followUp: 'Can you add the second part: what would school officials need before searching?',
      courtAnswer:
        "Does the Fourth Amendment apply to searches by school officials, and if so, what do they need before searching a student's belongings?",
    },
    holding: {
      keywordGroups: [['6-3', '6–3', '6 to 3', 'six'], ['reasonable suspicion'], ['applies', 'apply', 'fourth amendment']],
      needed: 2,
      tooShort: 'What did the Court decide? Add the vote if you remember it.',
      probe: 'What standard did the Court say school officials need?',
      hints: [
        'Look at the stamp row. What was the vote?',
        'Did the Court say the Fourth Amendment applies at school or not?',
        "The Court said officials don't need a warrant. So what do they need instead? Check the highlighted terms.",
      ],
      affirm: 'Yes. Both parts are there: it applies, and the standard is lower at school.',
      followUp: 'Can you add what school officials do NOT need?',
      courtAnswer:
        "The Court ruled 6–3 that the Fourth Amendment applies to school officials, but they only need reasonable suspicion, not a warrant or probable cause.",
    },
    reasoning: {
      keywordGroups: [['warrant', 'probable cause'], ['reasonable suspicion', 'lower', 'less'], ['school', 'official', 'police']],
      needed: 2,
      tooShort: 'Say a little more. How is a school search different from a police search?',
      probe: 'Why might the Court set a different standard for schools than for police?',
      hints: [
        'Compare the standards: what do police usually need, and what do schools need?',
        'Tap "reasonable suspicion" and "probable cause" in the case. Which bar is lower?',
        "What would school officials have to do if they needed a warrant every time? How might that affect the Court's thinking?",
      ],
      affirm: "You've got the comparison between school searches and police searches.",
      followUp: 'Can you say which standard is the lower bar?',
      courtAnswer:
        "The Fourth Amendment still protects students at school, but school officials don't need a warrant or probable cause. Reasonable suspicion is enough.",
    },
    matters: {
      keywordGroups: [['bag', 'backpack', 'locker', 'phone', 'purse'], ['search', 'check', 'look through'], ['reason', 'suspicion', 'rights', 'fourth amendment']],
      needed: 2,
      tooShort: 'Picture a search at your school. What would change?',
      probe: 'Can you give one specific example from your own school?',
      hints: [
        'Imagine a teacher wants to look in your backpack. What do they need first?',
        'What would count as a reason to suspect a student? What would not?',
        'A later case, Safford, said a search can still go too far. How might that apply at your school?',
      ],
      affirm: "That's exactly how this case shows up in real life.",
      followUp: "Is there a kind of search you think would go too far?",
      courtAnswer:
        "School officials can search your belongings with reasonable suspicion, not a warrant. Safford v. Redding later showed a school search can still be excessively intrusive.",
    },
  },
};
