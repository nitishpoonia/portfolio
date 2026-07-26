---
name: portfolio-description
description: Write project descriptions for the portfolio repo through a Q&A interview rather than asking Nitish to hand over a pre-written technical narrative. Use when he wants to write or rewrite a portfolio project description. Trigger on "help me write a description for [project]", "rewrite this project description", "polish my portfolio description", "make this portfolio-ready", or when he names a project and wants its blurb written.
argument-hint: "[project name]"
---

# /portfolio-description

Writes portfolio-ready project descriptions for other developers to read — through a short Q&A interview. Nitish is a junior dev (~1.5 yrs) and often can't tell on his own which decisions were actually notable vs. just normal work. I ask the questions, he answers plainly with what happened, I do the judgment call on what's worth highlighting and write the copy.

**Do not ask him to just paste a finished description, and don't ask him to self-assess difficulty or importance up front** ("was this hard?", "what was impressive about this?"). Junior devs tend to underrate normal-but-solid engineering and overrate whatever just took a long time. Ask concrete, answerable questions about _what happened_ — infer what's noteworthy from the answers, don't make him guess at it.

## The Interview

Ask one at a time, or two if closely related — don't fire all of these at once:

1. **What does it do, in one sentence?**
2. **What's the stack?** (language, framework, key libraries/services)
3. **Solo or team?** If team — what part was yours specifically?
4. **Walk me through what you built, roughly in order.** (screens, features, systems — whatever order makes sense to him)
5. **Was there any point where something broke, didn't work, or you had to change approach?** (a bug you had to root-cause, a library that didn't fit, a rework mid-build — this is usually where the real highlights are, even if it didn't feel like a big deal at the time)
6. **Any constraint that shaped decisions?** (deadline, solo maintenance, performance, offline support, data size, device limits — optional, skip if nothing comes to mind)

If something is already known from prior context (e.g. project details already discussed), confirm briefly instead of re-asking from scratch.

## Output Format

```markdown
**[Tagline — one line, what it does, plainly]**

- [Highlight: a concrete technical fact, decision, or fix from his answers]
- [Highlight: another concrete detail — architecture, tricky bug, tradeoff]
- [Highlight: scope/scale detail if relevant — solo build, team size, data model]
- [Optional 4th: stack note, only if it adds information beyond what's implied above]
```

- Tagline: one line, states what it does. No adjectives doing the work instead of nouns.
- Bullets: 3–4, each a specific fact pulled from his answers — not a vague claim. "Built X" is weak; "Handled Y by doing Z, because W" is strong.
- Never invent a claim, metric, or technical detail he didn't actually say. If an answer is thin, ask a quick follow-up rather than padding with a guess.
- No resume filler: _seamless, robust, cutting-edge, leveraged, synergy, end-to-end, state-of-the-art, delivered value_. If a bullet needs one of these words to sound impressive, the underlying fact is missing — go back and ask for it instead.

## Process

1. Ask the interview questions (Q1–Q6), one or two at a time, adapting based on his answers.
2. From the answers — especially Q5 (what broke / changed) — identify which 3-4 details are actually worth highlighting. This is the judgment call he can't make himself yet; make it for him, using his own facts.
3. Write tagline + bullets in the format above.
4. Show the output. Don't explain your reasoning unless asked — just deliver the result.

## Tone Calibration

Match how Nitish actually talks about his own work: direct, unimpressed by buzzwords, specific about mechanism. Target register (not to be copied verbatim, just calibration):

> Bad: "Architected a robust, scalable mobile solution leveraging React Native to deliver seamless cross-platform experiences."
> Good: "React Native app handling multi-device session sync via Socket.IO auth handshake; fixed a production crash traced to a null context passed into Fragment instantiation on Android."

## Tips

1. **One project per run** — keeps the interview and the output tight and specific.
2. **Answer plainly, don't pre-judge** — just describe what happened; I'll figure out what's worth highlighting.
3. **Batch review at the end** — once a few projects are done, ask me to review them together for consistent tone/length across the portfolio.
