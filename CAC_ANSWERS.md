# CaseClosed: Congressional App Challenge Answers

> Draft answers in Elizabeth's voice. Read each one and change anything that doesn't sound like you.
> "What does your app do?" is already written by Elizabeth, so it isn't included here.

---

## 1. Languages used

- [x] **JavaScript**
- **Other:** TypeScript, HTML, CSS

## 2. Platforms coded for

- [x] **Web**
- [x] **Mobile (iOS)**
- [x] **Mobile (Android)**

---

## 3. Technical difficulties and how I solved them

**Expo Go wouldn't open the app.** My first build used the newest Expo SDK, but the Expo Go app in the App Store and Play Store only supports an older version (SDK 54). The app just showed "Project is incompatible with this version of Expo Go." I learned that Expo Go can run older projects but never newer ones, so I pinned the project to SDK 54 and used `npx expo install --fix` to line up every package with that version.

**Making legal terms tappable inside a sentence.** I wanted words like "majority opinion" or "reasonable suspicion" to be highlighted and tappable in the middle of a paragraph, without breaking the text into awkward chunks. I wrote a small glossary parser: in our case files, a term is wrapped like `[[warrant]]`. The parser splits the paragraph into plain text and term pieces, and the term pieces render as highlighted, tappable text that opens a plain-English definition sheet.

**Building a Coach that helps without giving away the answer.** The Write a Case Coach had to guide students without doing the work for them. For every step of every briefable case, our team wrote keyword groups (the key ideas a good answer should mention), three levels of hints, and a follow-up question. The Coach checks whether your answer is too short, whether it hits the key ideas, and responds with a question. We made a rule that every hint, even the last one, ends in a question and never states the holding. The real court's version only appears after you finish, in "Compare with the court."

**Keeping poll results hidden until after you vote.** Seeing how others voted first can change your answer, so the verdict poll doesn't show any percentages until you've voted. To keep it nonpartisan, your own pick fills in orange and every other option uses the same neutral color. We never use two opposing colors that could look like "sides."

**A navigation bug.** After finishing a step, one screen used `replace` to jump to the next screen. That left nothing to go back to, and the back button crashed with "GO_BACK was not handled by any navigator." I switched forward moves to `push` so there's always a history, and made every back button check `canGoBack()` first with a safe fallback.

**Dark mode with a navy logo.** Our logo is navy and orange, which disappears on a dark navy background. We made a second logo where the navy parts are cream, and the app picks the right version automatically based on the theme. The same idea swaps the nav logo on the website when you scroll past the dark hero.

---

## 4. Improvements for version 2.0

- **Real reader polls** with a backend, so the verdict results come from actual students instead of sample numbers.
- **A live bill tracker** that pulls status updates from Congress.gov instead of being updated by hand.
- **State-by-state explainers**, since a lot of the laws that affect teens (like driving, work hours, and school rules) are different in every state.
- **Teacher classroom mode**, so a teacher can assign a case, see class quiz results, and review student briefs.
- **Spanish translations** of every explainer.
- **Audio read-aloud** for accessibility.
- **An AI Coach model** that can respond to exactly what a student wrote, while still following our rule of asking questions instead of giving answers.

---

## 5. How AI was used

**AI tools used:** Claude (Anthropic), through Claude Code.

**How it helped:** I used Claude as a coding assistant. It helped set up the Expo project, write and debug React Native components, build the marketing website, and trace down errors like the Expo Go version mismatch and the navigation back-stack crash. It also helped turn our design decisions into consistent code (colors, fonts, spacing) and suggested wording for some UI text, which we reviewed and edited.

**What our team did ourselves:**

- **The idea and vision.** Case Closed came from our own experience of learning about our rights only after something happened. We decided who it's for, what it should feel like, and what it should never do (take sides).
- **Research and writing.** Our team chose the cases and the bill, read the original sources, and decided what facts belong in each explainer. We fact-checked holdings, vote counts, and quotes against the original rulings and Congress.gov, and kept the tone neutral.
- **The Coach content.** The in-app Coach in this version **does not use AI**. It runs on scripted guiding questions, keywords, and hints that our team wrote for each step of each case. The code has a clear place where a real AI model could plug in later.
- **Design.** We picked the brand colors from our logo, chose the fonts, designed the case-file card style and the "CASE CLOSED" stamp, and set the nonpartisan color rule for polls.
- **Decisions and testing.** We decided what features to build, what to cut, and how every screen should flow for our demo. We tested the app on real phones in Expo Go, walked through every screen, found bugs, and checked that the source links work. [Confirm after testing on your own phone]

---

## 6. What I learned

[Elizabeth to personalize]

Draft: Building Case Closed taught me that making something simple is actually really hard. Rewriting a Supreme Court ruling for a 14-year-old meant I had to understand it well enough to explain it without changing what it means. On the coding side, I learned how React Native apps are structured, how to debug problems that don't show up until you run the app on a real phone, and why small choices like colors can make an app feel like it's taking sides. I also learned how much work goes into staying neutral, and that "just the facts" takes a lot of discipline.

---

## 7. Inspiration

[Elizabeth to personalize]

Draft: Every teenager in America lives under laws they had no say in passing: what they can post, whether a teacher can search their bag, what apps can do with their data. But most of us only learn about our rights *after* something goes wrong. Only 22% of eighth-graders scored Proficient or above on the 2022 national civics assessment (NAEP), and the actual court rulings are written for lawyers, not for us. I wanted to build something that translates real cases and bills into plain language, shows the original source every time, and lets students decide for themselves what they think. Legal literacy isn't just a knowledge gap. It's a citizenship gap, and I want to help close it, one case at a time.
