# CaseClosed: Congressional App Challenge Answers

"What does your app do?" is already written by Elizabeth, so it isn't here.

## Languages used

JavaScript
Other: TypeScript, HTML, CSS

## Platforms coded for

Web, Mobile (iOS), Mobile (Android)

## Technical difficulties

The first problem was getting the app to open on a phone at all. I built it with Expo, and my phone kept saying the project wasn't compatible with Expo Go. I thought my code was broken, but it turned out the Expo Go app in the store runs an older version of Expo than the newest one. I switched my project to SDK 54 and lined up all my packages with it, and it opened.

The second one was making legal words tappable in the middle of a sentence. I wanted words like "warrant" to be highlighted so you can tap them and get a simple definition. I wrote a small parser. In my case files I wrap a word like [[warrant]], and the app splits the paragraph into normal text and tappable words.

The hardest part was the Coach in Write a Case. It is supposed to help you write a case brief without giving you the answer. My first idea was just showing hints, but hints kept giving too much away. So for each step I wrote keywords the answer should include, three levels of hints, and a rule that every hint ends with a question.

Testing also caught bugs I never would have guessed. On the voting screen your own percentage was white text on a white background, so it was invisible. A button that should have taken you back to the Write tab sent you somewhere else. I fixed both and checked them again. Building the Android version failed at first because it needed an older version of Java, so I installed Java 17 just for the build.

## Improvements for 2.0

Real voting from real users instead of sample numbers, a bill tracker that updates on its own from Congress.gov, explainers for state laws, a mode for teachers, Spanish translations, read aloud audio, and a smarter Coach that still asks questions instead of giving answers.

## How AI was used

I used Claude, an AI coding assistant. It helped me set up the project, write and fix code for the app and website, and figure out errors like the Expo version problem. I made the decisions. I picked the idea, the audience, the cases, the colors and fonts, and the rule that the app never takes sides. I checked every court case fact against the original ruling. The Coach inside the app does not use AI. It runs on questions and hints I wrote myself. I tested the app, found bugs, and decided what to fix.

## What I learned

[Elizabeth to personalize]

I learned that making something simple is really hard. To explain a Supreme Court case to a 14 year old, I had to understand it well enough not to change what it means. I also learned how apps are put together, how to debug problems that only show up on a real phone, and that even colors can make an app look like it is picking a side.

## Inspiration

[Elizabeth to personalize]

Teens live under laws they never voted on, like what we can post, whether a teacher can search our bags, and what apps do with our data. Most of us only learn our rights after something goes wrong. Only 22% of eighth graders scored Proficient or above on the 2022 national civics test. I wanted an app that explains real cases in plain words, always shows the original source, and lets you decide what you think.
