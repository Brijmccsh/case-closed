import type { Bill } from './types';

// VERIFY before recording: bill status changes. Last verified Sept 16, 2026.
// SAMPLE CONTENT: byline is a fictional teen journalist, poll percentages are sample data.

export const bills: Bill[] = [
  {
    id: 'kids-online-safety',
    kind: 'bill',
    title: 'Kids Online Safety: the KIDS Act and KOSA',
    shortTitle: 'Kids Online Safety',
    topic: 'privacy',
    year: 2026,
    court: 'U.S. Congress',
    courtStamp: 'Congress',
    courtLevel: 'congress',
    status: 'Passed House',
    tldr:
      'The House passed the KIDS Act (H.R. 7757) to expand online protections for teens. The Senate’s Kids Online Safety Act (S. 1748) is still pending, and the two chambers disagree on a "duty of care."',
    sections: [
      {
        key: 'inBill',
        title: "What's in the bill",
        body:
          'On June 29, 2026, the House passed the KIDS Act (H.R. 7757). This [[bill]] would expand online privacy protections to teens, ban targeted ads to minors, require protective default settings, limit "dark patterns" like autoplay and infinite scroll, and regulate AI chatbots available to minors.',
      },
      {
        key: 'standing',
        title: 'Where it stands',
        body:
          "The Senate's version, the Kids Online Safety Act (S. 1748), is still pending. The main disagreement is whether platforms should have a legal [[duty of care]] to prevent harm to minors. The House version leaves that out.",
      },
      {
        key: 'means',
        title: 'What it means for you',
        body:
          "Nothing changes until both the House and Senate pass the same version and it is signed into law. If that happens, the apps you use could look different for users under 18: different default settings, no targeted ads, and fewer features like autoplay or infinite scroll.",
      },
    ],
    knowYourRights: [
      'A bill is not a law yet. These rules do not apply unless it passes both chambers and is signed.',
      'You can follow a bill’s status for free on Congress.gov.',
      'You can contact your representative and senators about any bill, at any age.',
    ],
    stages: [
      { label: 'Introduced', state: 'done' },
      { label: 'Passed House', state: 'done', detail: 'June 29, 2026' },
      { label: 'Senate', state: 'current', detail: 'Pending' },
      { label: 'Signed into law', state: 'upcoming' },
    ],
    debate: {
      intro: 'People who care about keeping teens safe online disagree about how to do it. Here are the main arguments, in their own terms.',
      sides: [
        {
          label: 'Supporters of stronger rules say',
          points: [
            'Platforms should do more to protect minors, and protective default settings put safety first.',
            'Limits on targeted ads and features like autoplay and infinite scroll could reduce harm to teens.',
            'Some Senate supporters argue a legal duty of care is needed so platforms are responsible for preventing harm.',
          ],
        },
        {
          label: 'People raising concerns say',
          points: [
            'Rules could lead to age checks that collect more personal data from everyone, including teens.',
            'Platforms might remove lawful content to avoid legal risk, which raises free-speech concerns.',
            'Some argue a broad duty of care is unclear about what platforms would have to do.',
          ],
        },
      ],
    },
    lastVerified: 'Sept 16, 2026',
    sourceUrl: 'https://www.congress.gov/crs-product/LSB11465',
    sourceLabel: 'Congressional Research Service',
    extraSources: [{ url: 'https://www.congress.gov/bill/119th-congress/senate-bill/1748', label: 'Congress.gov: S. 1748' }],
    byline: 'Jordan Reyes, 18',
    editedBy: 'Sam Whitfield, 19',
    readMinutes: 4,
    quiz: [
      {
        id: 'q1',
        prompt: 'Which chamber passed the KIDS Act (H.R. 7757) on June 29, 2026?',
        options: ['The Senate', 'The House', 'Both chambers', 'The Supreme Court'],
        correctIndex: 1,
        explanation: 'The House passed the KIDS Act. The Senate version is still pending.',
      },
      {
        id: 'q2',
        prompt: 'Which of these would the KIDS Act do?',
        options: [
          'Ban teens from social media',
          'Ban targeted ads to minors',
          'Require a driver’s license to post',
          'Shut down AI chatbots',
        ],
        correctIndex: 1,
        explanation: 'It would ban targeted ads to minors, among other protections.',
      },
      {
        id: 'q3',
        prompt: 'What is the main disagreement between the House and Senate versions?',
        options: [
          'Whether platforms should have a legal duty of care',
          'Whether the law applies to adults',
          'Which agency runs Congress.gov',
          'Whether phones are allowed in schools',
        ],
        correctIndex: 0,
        explanation: 'The House version leaves out the duty of care that is part of the debate in the Senate.',
      },
    ],
    poll: { question: 'Should Congress pass this?', sample: { yes: 49, no: 28, unsure: 23 } },
    precedents: { before: [], after: [] },
    glossaryTerms: ['bill', 'duty of care', 'committee'],
    keywords: ['kosa', 'kids act', 'social media', 'online safety', 'privacy', 'ads', 'ai chatbot', 'congress'],
  },
];
