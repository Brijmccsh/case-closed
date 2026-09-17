import type { Case } from './types';

// Facts: only from the verified project brief. Holdings, votes, and quotes are real;
// do not add new quotes or details without checking the original source.
// SAMPLE CONTENT: bylines are fictional teen journalists, poll percentages are sample data.

const EDITOR = 'Sam Whitfield, 19';

export const cases: Case[] = [
  {
    id: 'mahanoy',
    kind: 'case',
    nickname: 'Mahanoy',
    title: 'Mahanoy Area School District v. B.L.',
    shortTitle: 'Mahanoy v. B.L.',
    topic: 'speech',
    year: 2021,
    court: 'U.S. Supreme Court',
    courtStamp: 'Supreme Court',
    courtLevel: 'supreme',
    status: '8–1',
    vote: '8–1',
    briefable: true,
    tldr:
      'A student was suspended from JV cheer for a profane Snapchat she posted off campus on a weekend. The Supreme Court ruled 8–1 that the school violated her First Amendment rights.',
    sections: [
      {
        key: 'happened',
        title: 'What happened',
        body:
          "A high-school student didn't make the varsity cheerleading team. That weekend, away from school, she posted a Snapchat story with profanity about it. The school found out and suspended her from the JV cheer team. She argued that the school had no right to punish her for something she said off campus, on her own time, protected by the [[First Amendment]].",
      },
      {
        key: 'decided',
        title: 'What the court decided',
        body:
          'The Supreme Court ruled 8–1 in her favor. The [[majority opinion]] said the school violated her First Amendment rights. It did not say schools can never act on off-campus speech. Schools can still step in for some things, like bullying or threats. But the Court said a school\'s power to regulate what students say is weaker when they are off campus. One justice wrote a [[dissent]].',
      },
      {
        key: 'means',
        title: 'What it means for you',
        body:
          "What you post on your own time, away from school, gets more protection from school punishment than what you say in class. That protection has limits: bullying and threats can still get you in trouble at school. This case built on an older [[precedent]], Tinker v. Des Moines, about student speech inside the schoolhouse.",
      },
    ],
    knowYourRights: [
      "Your school's power over what you say off campus is weaker than its power at school.",
      'Schools can still act on some off-campus speech, like bullying or threats.',
      'The First Amendment protects student speech both in school and out of it.',
    ],
    sourceUrl: 'https://www.oyez.org/cases/2020/20-255',
    sourceLabel: 'Oyez: Mahanoy Area School District v. B.L.',
    byline: 'Maya Okafor, 16',
    editedBy: EDITOR,
    readMinutes: 4,
    quiz: [
      {
        id: 'q1',
        prompt: 'Where and when did the student post her Snapchat story?',
        options: ['In class during a test', 'On a weekend, off campus', 'At a cheer practice', 'On the school bus'],
        correctIndex: 1,
        explanation: 'She posted it on a weekend, away from school. That off-campus detail was central to the case.',
      },
      {
        id: 'q2',
        prompt: 'How did the Supreme Court rule?',
        options: [
          '9–0 for the school',
          '5–4 for the school',
          '8–1 that the school violated her First Amendment rights',
          'It refused to hear the case',
        ],
        correctIndex: 2,
        explanation: 'The Court ruled 8–1 that suspending her from JV cheer violated her First Amendment rights.',
      },
      {
        id: 'q3',
        prompt: 'According to the ruling, can schools ever regulate off-campus speech?',
        options: [
          'Never, under any circumstances',
          'Yes, some, like bullying or threats, but their power is weaker off campus',
          'Yes, exactly the same as speech in class',
          'Only if a parent agrees',
        ],
        correctIndex: 1,
        explanation: 'Schools keep some power off campus (like bullying or threats), but it is weaker than at school.',
      },
    ],
    poll: { question: 'Would you have ruled the same way?', sample: { yes: 58, no: 27, unsure: 15 } },
    precedents: { before: ['tinker'], after: [] },
    glossaryTerms: ['First Amendment', 'majority opinion', 'dissent', 'precedent'],
    keywords: ['snapchat', 'social media', 'cheer', 'off campus', 'speech', 'suspension', 'first amendment'],
  },
  {
    id: 'tinker',
    kind: 'case',
    nickname: 'Tinker',
    title: 'Tinker v. Des Moines Independent Community School District',
    shortTitle: 'Tinker v. Des Moines',
    topic: 'speech',
    year: 1969,
    court: 'U.S. Supreme Court',
    courtStamp: 'Supreme Court',
    courtLevel: 'supreme',
    status: '7–2',
    vote: '7–2',
    briefable: true,
    tldr:
      'Students were suspended for wearing black armbands to protest the Vietnam War. The Supreme Court ruled 7–2 for the students.',
    sections: [
      {
        key: 'happened',
        title: 'What happened',
        body:
          'Students in Des Moines, Iowa, wore black armbands to school to protest the Vietnam War. The school suspended them. The students argued that a quiet, symbolic protest was speech protected by the [[First Amendment]].',
      },
      {
        key: 'decided',
        title: 'What the court decided',
        body:
          "The Supreme Court ruled 7–2 for the students. The [[majority opinion]] set a rule schools still use: a school can't restrict student expression unless it would substantially disrupt school or invade the rights of others. Two justices wrote in [[dissent]].",
      },
      {
        key: 'means',
        title: 'What it means for you',
        body:
          "You keep your free-speech rights when you walk into a public school. Your school can limit expression that would substantially disrupt learning or invade other people's rights, but it can't punish you just because it disagrees with your message. Tinker became a [[precedent]] that later cases, like Mahanoy, built on.",
      },
    ],
    pullQuote: {
      text:
        'It can hardly be argued that either students or teachers shed their constitutional rights to freedom of speech or expression at the schoolhouse gate.',
      attribution: 'Majority opinion, 1969',
    },
    knowYourRights: [
      'Students have free-speech rights at public school, including symbolic speech like armbands.',
      'A school can restrict expression that would substantially disrupt school.',
      "A school can also restrict expression that invades other people's rights.",
    ],
    sourceUrl: 'https://www.oyez.org/cases/1968/21',
    sourceLabel: 'Oyez: Tinker v. Des Moines',
    byline: 'Theo Alvarez, 17',
    editedBy: EDITOR,
    readMinutes: 3,
    quiz: [
      {
        id: 'q1',
        prompt: 'What did the students wear to protest?',
        options: ['T-shirts with slogans', 'Black armbands', 'Buttons', 'Face paint'],
        correctIndex: 1,
        explanation: 'They wore black armbands to school to protest the Vietnam War.',
      },
      {
        id: 'q2',
        prompt: 'What was the vote?',
        options: ['9–0', '5–4', '7–2', '6–3'],
        correctIndex: 2,
        explanation: 'The Court ruled 7–2 for the students.',
      },
      {
        id: 'q3',
        prompt: 'Under Tinker, when can a school restrict student expression?',
        options: [
          'Whenever a teacher disagrees with it',
          'When it would substantially disrupt school or invade others’ rights',
          'Only with a warrant',
          'Never',
        ],
        correctIndex: 1,
        explanation:
          "Schools can restrict expression only if it would substantially disrupt school or invade others' rights.",
      },
    ],
    poll: { question: 'Would you have ruled the same way?', sample: { yes: 64, no: 22, unsure: 14 } },
    precedents: { before: [], after: ['mahanoy'] },
    glossaryTerms: ['First Amendment', 'majority opinion', 'dissent', 'precedent'],
    keywords: ['armband', 'protest', 'vietnam', 'speech', 'schoolhouse gate', 'first amendment'],
  },
  {
    id: 'tlo',
    kind: 'case',
    nickname: 'T.L.O.',
    title: 'New Jersey v. T.L.O.',
    shortTitle: 'New Jersey v. T.L.O.',
    topic: 'justice',
    year: 1985,
    court: 'U.S. Supreme Court',
    courtStamp: 'Supreme Court',
    courtLevel: 'supreme',
    status: '6–3',
    vote: '6–3',
    briefable: true,
    tldr:
      "An assistant principal searched a student's purse and found evidence of marijuana dealing. The Supreme Court ruled 6–3 that school officials need only reasonable suspicion to search a student's belongings.",
    sections: [
      {
        key: 'happened',
        title: 'What happened',
        body:
          "A student was caught smoking at school. An assistant principal searched her purse and found evidence that she was dealing marijuana. She argued the search violated the [[Fourth Amendment]], which protects people from unreasonable searches.",
      },
      {
        key: 'decided',
        title: 'What the court decided',
        body:
          "The Supreme Court ruled 6–3. The [[majority opinion]] said the Fourth Amendment does apply to school officials, not just police. But school officials don't need a [[warrant]] or [[probable cause]] to search a student's belongings. They only need [[reasonable suspicion]].",
      },
      {
        key: 'means',
        title: 'What it means for you',
        body:
          "This is the \"teacher searches your bag\" case. Your Fourth Amendment rights come with you to school, but the bar for a school search is lower than the bar for a police search. A later case, Safford v. Redding, showed that a school search can still go too far.",
      },
    ],
    knowYourRights: [
      'The Fourth Amendment applies to searches by school officials.',
      'School officials need reasonable suspicion to search your belongings.',
      "They don't need a warrant or probable cause, which is a lower bar than police usually face.",
    ],
    sourceUrl: 'https://www.oyez.org/cases/1984/83-712',
    sourceLabel: 'Oyez: New Jersey v. T.L.O.',
    byline: 'Priya Nair, 15',
    editedBy: EDITOR,
    readMinutes: 4,
    quiz: [
      {
        id: 'q1',
        prompt: 'Why was the student first taken to the office?',
        options: ['She was late', 'She was caught smoking', 'She skipped class', 'She was using her phone'],
        correctIndex: 1,
        explanation: 'She was caught smoking, which led an assistant principal to search her purse.',
      },
      {
        id: 'q2',
        prompt: 'Does the Fourth Amendment apply to school officials?',
        options: [
          'No, only to police',
          'Yes, the Court said it applies to school officials',
          'Only at private schools',
          'Only if the student is 18',
        ],
        correctIndex: 1,
        explanation: 'The Court ruled the Fourth Amendment applies to school officials, not just police.',
      },
      {
        id: 'q3',
        prompt: "What do school officials need to search a student's belongings?",
        options: ['A warrant', 'Probable cause', 'Reasonable suspicion', "A parent's permission"],
        correctIndex: 2,
        explanation: 'They need reasonable suspicion, not a warrant or probable cause.',
      },
    ],
    poll: { question: 'Would you have ruled the same way?', sample: { yes: 41, no: 38, unsure: 21 } },
    precedents: { before: [], after: ['safford'] },
    glossaryTerms: ['Fourth Amendment', 'reasonable suspicion', 'probable cause', 'warrant'],
    keywords: ['search', 'bag', 'purse', 'backpack', 'fourth amendment', 'reasonable suspicion', 'principal'],
  },
  {
    id: 'safford',
    kind: 'case',
    nickname: 'Safford',
    title: 'Safford Unified School District v. Redding',
    shortTitle: 'Safford v. Redding',
    topic: 'civil',
    year: 2009,
    court: 'U.S. Supreme Court',
    courtStamp: 'Supreme Court',
    courtLevel: 'supreme',
    status: '8–1',
    vote: '8–1',
    briefable: false,
    tldr:
      'School officials strip-searched a 13-year-old looking for prescription-strength ibuprofen. Eight of nine justices agreed the search was unconstitutional.',
    sections: [
      {
        key: 'happened',
        title: 'What happened',
        body:
          'School officials were looking for prescription-strength ibuprofen. They strip-searched a 13-year-old student to find it. She argued the search violated her [[Fourth Amendment]] rights.',
      },
      {
        key: 'decided',
        title: 'What the court decided',
        body:
          'On the question of whether the search was unconstitutional, the Court ruled 8–1 that it went too far. The [[majority opinion]] said the search was excessively intrusive because officials had no reason to think she was hiding pills in her underwear, or that the pills were dangerous.',
      },
      {
        key: 'means',
        title: 'What it means for you',
        body:
          'New Jersey v. T.L.O. said schools need [[reasonable suspicion]] to search. This case shows that even with a reason to search, how far a school goes still matters. A more intrusive search needs a stronger reason behind it.',
      },
    ],
    knowYourRights: [
      'A school search can be unconstitutional if it is excessively intrusive.',
      "How far a search goes should match what officials are looking for and why.",
      'The Fourth Amendment still protects you at school, even when a search is allowed.',
    ],
    sourceUrl: 'https://www.oyez.org/cases/2008/08-479',
    sourceLabel: 'Oyez: Safford Unified School District v. Redding',
    byline: 'Jordan Reyes, 18',
    editedBy: EDITOR,
    readMinutes: 3,
    quiz: [
      {
        id: 'q1',
        prompt: 'What were school officials looking for?',
        options: ['A phone', 'Prescription-strength ibuprofen', 'A weapon', 'Stolen money'],
        correctIndex: 1,
        explanation: 'They were looking for prescription-strength ibuprofen.',
      },
      {
        id: 'q2',
        prompt: 'How old was the student?',
        options: ['11', '13', '16', '18'],
        correctIndex: 1,
        explanation: 'The student was 13 years old.',
      },
      {
        id: 'q3',
        prompt: 'Why did the Court say the search went too far?',
        options: [
          'Schools can never search students',
          'Officials needed a warrant',
          "It was excessively intrusive with no reason to think she hid pills in her underwear or that they were dangerous",
          'Her parents were not called first',
        ],
        correctIndex: 2,
        explanation:
          'The search was excessively intrusive without a reason to think she was hiding pills there or that the pills were dangerous.',
      },
    ],
    poll: { question: 'Would you have ruled the same way?', sample: { yes: 76, no: 11, unsure: 13 } },
    precedents: { before: ['tlo'], after: [] },
    glossaryTerms: ['Fourth Amendment', 'reasonable suspicion', 'majority opinion'],
    keywords: ['strip search', 'search', 'ibuprofen', 'fourth amendment', 'privacy'],
  },
  {
    id: 'riley',
    kind: 'case',
    nickname: 'Riley',
    title: 'Riley v. California',
    shortTitle: 'Riley v. California',
    topic: 'privacy',
    year: 2014,
    court: 'U.S. Supreme Court',
    courtStamp: 'Supreme Court',
    courtLevel: 'supreme',
    status: '9–0',
    vote: '9–0',
    briefable: false,
    tldr:
      "Police searched an arrested person's smartphone without a warrant. The Supreme Court ruled 9–0 that police generally need a warrant to search a phone's digital contents.",
    sections: [
      {
        key: 'happened',
        title: 'What happened',
        body:
          "Police arrested a person and searched the digital contents of his smartphone without getting a [[warrant]]. He argued this violated the [[Fourth Amendment]].",
      },
      {
        key: 'decided',
        title: 'What the court decided',
        body:
          'The Supreme Court ruled 9–0, a unanimous decision. The [[majority opinion]] said police generally need a warrant to search the digital contents of a cell phone they take during an arrest.',
      },
      {
        key: 'means',
        title: 'What it means for you',
        body:
          'Your phone holds a lot of your life. This ruling means that, in general, police need a warrant before digging through it after an arrest. It became a [[precedent]] for a later case, Carpenter v. United States, about phone location records.',
      },
    ],
    pullQuote: {
      text:
        'Our answer to the question of what police must do before searching a cell phone seized incident to an arrest is accordingly simple—get a warrant.',
      attribution: 'Chief Justice John Roberts, majority opinion',
    },
    knowYourRights: [
      "Police generally need a warrant to search your phone's digital contents after an arrest.",
      'This protection comes from the Fourth Amendment.',
      'The ruling was unanimous: all nine justices agreed.',
    ],
    sourceUrl: 'https://www.oyez.org/cases/2013/13-132',
    sourceLabel: 'Oyez: Riley v. California',
    byline: 'Priya Nair, 15',
    editedBy: EDITOR,
    readMinutes: 3,
    quiz: [
      {
        id: 'q1',
        prompt: 'What did police search without a warrant?',
        options: ['A car', 'A house', "An arrested person's smartphone", 'A school locker'],
        correctIndex: 2,
        explanation: "Police searched the digital contents of an arrested person's smartphone.",
      },
      {
        id: 'q2',
        prompt: 'What was the vote?',
        options: ['5–4', '9–0', '7–2', '6–3'],
        correctIndex: 1,
        explanation: 'It was unanimous: 9–0.',
      },
      {
        id: 'q3',
        prompt: 'What do police generally need before searching a phone seized during an arrest?',
        options: ['Nothing', 'Reasonable suspicion', 'A warrant', "The owner's password"],
        correctIndex: 2,
        explanation: 'The Court said the answer is simple: get a warrant.',
      },
    ],
    poll: { question: 'Would you have ruled the same way?', sample: { yes: 71, no: 16, unsure: 13 } },
    precedents: { before: [], after: ['carpenter'] },
    glossaryTerms: ['warrant', 'Fourth Amendment', 'majority opinion', 'precedent'],
    keywords: ['phone', 'smartphone', 'cell phone', 'warrant', 'police', 'arrest', 'digital'],
  },
  {
    id: 'carpenter',
    kind: 'case',
    nickname: 'Carpenter',
    title: 'Carpenter v. United States',
    shortTitle: 'Carpenter v. U.S.',
    topic: 'privacy',
    year: 2018,
    court: 'U.S. Supreme Court',
    courtStamp: 'Supreme Court',
    courtLevel: 'supreme',
    status: '5–4',
    vote: '5–4',
    briefable: false,
    tldr:
      "Investigators got months of a suspect's cell-phone location records without a warrant. The Supreme Court ruled 5–4 that getting those records generally requires a warrant.",
    sections: [
      {
        key: 'happened',
        title: 'What happened',
        body:
          "Investigators got months of a suspect's cell-phone location records from his wireless carriers. They did not get a [[warrant]] first. He argued this violated the [[Fourth Amendment]].",
      },
      {
        key: 'decided',
        title: 'What the court decided',
        body:
          'The Supreme Court ruled 5–4, a close vote. The [[majority opinion]] said getting historical cell-site location records generally requires a warrant. Four justices wrote or joined [[dissent|dissents]].',
      },
      {
        key: 'means',
        title: 'What it means for you',
        body:
          "Your phone company keeps records of where your phone has been. This ruling means the government generally needs a warrant to get months of that history. It built on Riley v. California, which was about searching the phone itself.",
      },
    ],
    knowYourRights: [
      'The government generally needs a warrant to get your historical cell-site location records.',
      'That applies even though the records are held by your wireless carrier.',
      'The vote was 5–4, so the justices were closely divided.',
    ],
    sourceUrl: 'https://www.oyez.org/cases/2017/16-402',
    sourceLabel: 'Oyez: Carpenter v. United States',
    byline: 'Theo Alvarez, 17',
    editedBy: EDITOR,
    readMinutes: 3,
    quiz: [
      {
        id: 'q1',
        prompt: 'Where did investigators get the location records?',
        options: ["From the suspect's laptop", 'From his wireless carriers', 'From a school', 'From social media'],
        correctIndex: 1,
        explanation: 'They got the records from his wireless carriers.',
      },
      {
        id: 'q2',
        prompt: 'What was the vote?',
        options: ['9–0', '5–4', '8–1', '7–2'],
        correctIndex: 1,
        explanation: 'It was a close 5–4 decision.',
      },
      {
        id: 'q3',
        prompt: 'What does getting historical cell-site location records generally require?',
        options: ['A warrant', 'Nothing', "The carrier's permission only", 'A court trial'],
        correctIndex: 0,
        explanation: 'The Court said it generally requires a warrant.',
      },
    ],
    poll: { question: 'Would you have ruled the same way?', sample: { yes: 62, no: 19, unsure: 19 } },
    precedents: { before: ['riley'], after: [] },
    glossaryTerms: ['warrant', 'Fourth Amendment', 'dissent'],
    keywords: ['location', 'cell phone', 'carrier', 'tracking', 'warrant', 'data'],
  },
  {
    id: 'jdb',
    kind: 'case',
    nickname: 'J.D.B.',
    title: 'J.D.B. v. North Carolina',
    shortTitle: 'J.D.B. v. North Carolina',
    topic: 'justice',
    year: 2011,
    court: 'U.S. Supreme Court',
    courtStamp: 'Supreme Court',
    courtLevel: 'supreme',
    status: '5–4',
    vote: '5–4',
    briefable: false,
    tldr:
      "Police questioned a 13-year-old in a closed school conference room without Miranda warnings. The Supreme Court ruled 5–4 that a child's age matters when deciding if they were \"in custody.\"",
    sections: [
      {
        key: 'happened',
        title: 'What happened',
        body:
          'Police questioned a 13-year-old student about break-ins. The questioning happened in a closed conference room at his school, and he was not given [[Miranda warnings]].',
      },
      {
        key: 'decided',
        title: 'What the court decided',
        body:
          "The Supreme Court ruled 5–4. Police must give Miranda warnings when someone is [[in custody]]. The [[majority opinion]] said a child's age matters when deciding whether that child was in custody.",
      },
      {
        key: 'means',
        title: 'What it means for you',
        body:
          "A situation that might feel free-to-leave for an adult can feel very different for a young teen. This ruling says courts should take a young person's age into account when deciding whether they were in custody.",
      },
    ],
    knowYourRights: [
      "Your age matters when a court decides whether you were \"in custody\" during questioning.",
      'Miranda warnings are required when a person is in custody and being questioned.',
      'This can apply to questioning by police at school.',
    ],
    sourceUrl: 'https://www.oyez.org/cases/2010/09-11121',
    sourceLabel: 'Oyez: J.D.B. v. North Carolina',
    byline: 'Jordan Reyes, 18',
    editedBy: EDITOR,
    readMinutes: 3,
    quiz: [
      {
        id: 'q1',
        prompt: 'Where was the student questioned?',
        options: ['At a police station', 'In a closed school conference room', 'At home', 'In a police car'],
        correctIndex: 1,
        explanation: 'He was questioned in a closed conference room at school.',
      },
      {
        id: 'q2',
        prompt: 'What was the questioning about?',
        options: ['Cheating', 'Break-ins', 'A fight', 'Vaping'],
        correctIndex: 1,
        explanation: 'Police questioned him about break-ins.',
      },
      {
        id: 'q3',
        prompt: 'What did the Court say matters when deciding if a child was "in custody"?',
        options: ["The child's grades", "The child's age", 'The time of day', "The officer's rank"],
        correctIndex: 1,
        explanation: "The Court ruled that a child's age matters for the Miranda custody question.",
      },
    ],
    poll: { question: 'Would you have ruled the same way?', sample: { yes: 67, no: 17, unsure: 16 } },
    precedents: { before: [], after: [] },
    glossaryTerms: ['Miranda warnings', 'in custody', 'majority opinion'],
    keywords: ['miranda', 'questioning', 'police', 'custody', 'interrogation', 'age'],
  },
  {
    id: 'juliana',
    kind: 'case',
    nickname: 'Juliana',
    title: 'Juliana v. United States',
    shortTitle: 'Juliana v. U.S.',
    topic: 'environment',
    year: 2020,
    court: 'U.S. Court of Appeals for the Ninth Circuit',
    courtStamp: 'Ninth Circuit',
    courtLevel: 'other',
    status: '2–1',
    vote: '2–1',
    briefable: false,
    note: 'On March 24, 2025, the U.S. Supreme Court declined to hear the case.',
    tldr:
      "21 young people sued the federal government over its fossil-fuel policies. A federal appeals court dismissed the case 2–1 because it said courts couldn't give them the remedy they asked for.",
    sections: [
      {
        key: 'happened',
        title: 'What happened',
        body:
          "21 young people sued the federal government. They argued that its fossil-fuel policies violated their constitutional rights.",
      },
      {
        key: 'decided',
        title: 'What the court decided',
        body:
          "The U.S. Court of Appeals for the Ninth Circuit dismissed the case in a 2–1 decision. It ruled the young people lacked [[standing]] because courts could not give them the remedy they asked for. One judge wrote a [[dissent]]. On March 24, 2025, the U.S. Supreme Court declined to hear the case (it denied [[certiorari]]).",
      },
      {
        key: 'means',
        title: 'What it means for you',
        body:
          "Young people can bring big cases to federal court. But before a court decides who is right, the people suing have to show they have standing, which includes showing a court can actually fix the problem they're asking about.",
      },
    ],
    knowYourRights: [
      'Young people can file lawsuits, including against the federal government.',
      'To sue in federal court, you need standing.',
      'Standing includes showing a court can give you a remedy for the problem.',
    ],
    sourceUrl: 'https://www.supremecourt.gov/docket/docketfiles/html/public/24-645.html',
    sourceLabel: 'Supreme Court docket 24-645',
    byline: 'Maya Okafor, 16',
    editedBy: EDITOR,
    readMinutes: 3,
    quiz: [
      {
        id: 'q1',
        prompt: 'How many young people brought the lawsuit?',
        options: ['3', '9', '21', '100'],
        correctIndex: 2,
        explanation: '21 young people sued the federal government.',
      },
      {
        id: 'q2',
        prompt: 'Why did the appeals court dismiss the case?',
        options: [
          'The plaintiffs were too young',
          'They lacked standing because courts could not give the remedy they asked for',
          'They filed in the wrong state',
          'The government admitted fault',
        ],
        correctIndex: 1,
        explanation: 'The court ruled they lacked standing because courts could not give them the remedy they asked for.',
      },
      {
        id: 'q3',
        prompt: 'What did the U.S. Supreme Court do on March 24, 2025?',
        options: ['Ruled for the young people', 'Ruled for the government', 'Declined to hear the case', 'Sent it back for a new trial'],
        correctIndex: 2,
        explanation: 'The Supreme Court declined to hear the case.',
      },
    ],
    poll: { question: 'Would you have ruled the same way?', sample: { yes: 34, no: 44, unsure: 22 } },
    precedents: { before: [], after: [] },
    glossaryTerms: ['standing', 'dissent', 'certiorari'],
    keywords: ['climate', 'environment', 'fossil fuel', 'lawsuit', 'standing', 'youth'],
  },
];
