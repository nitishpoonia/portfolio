---
name: commit-message-writer
description: Use this skill whenever the user asks to write, generate, or suggest a git commit message, or asks to "commit this", "commit my changes", or similar. Always inspect the actual staged/unstaged diff before writing the message — never guess at what changed. Produces Conventional Commits format (feat, fix, chore, docs, refactor, test, style, perf, build, ci).
---

# Commit Message Writer

Writes Conventional Commits-style commit messages based on the real `git diff`, not assumptions.

## Workflow

1. **Check repo state**

   ```bash
   git status --short
   ```

   If there's nothing staged and nothing unstaged, tell the user there's nothing to commit and stop.

2. **Get the diff**
   - If there are staged changes: `git diff --staged`
   - If nothing is staged but there are unstaged changes: `git diff`, and tell the user you're writing the message off unstaged changes — ask if they want to `git add` first, or offer to stage everything yourself if they confirm.
   - If the diff is large (>300 lines), also run `git diff --staged --stat` (or `git diff --stat`) to get a per-file summary, and read the full diff in chunks if needed rather than truncating your understanding of it.

3. **Read the actual diff.** Don't infer the change from filenames alone. Look at what was added/removed/modified. If multiple unrelated changes are mixed together, flag this to the user — Conventional Commits works best with one logical change per commit, and a mixed diff usually means it should be split.

4. **Determine the type:**
   - `feat` — new feature / capability for the user
   - `fix` — bug fix
   - `docs` — documentation only
   - `style` — formatting, whitespace, no logic change
   - `refactor` — code change that neither fixes a bug nor adds a feature
   - `test` — adding or correcting tests
   - `chore` — tooling, dependencies, build config, misc maintenance
   - `perf` — performance improvement
   - `build` — build system or external dependencies
   - `ci` — CI configuration

5. **Determine scope (optional but preferred if obvious).** Use the module/directory/component most affected, e.g. `feat(auth): ...`. Skip scope if the change spans many unrelated areas.

6. **Write the message:**
   - Subject line: `type(scope): short imperative summary`, lowercase after the colon, no trailing period, ideally ≤72 chars.
   - Imperative mood: "add", "fix", "remove" — not "added", "fixes", "removes".
   - If the diff is non-trivial, add a body after a blank line: 1-3 short bullet points on _what_ and _why_, not a line-by-line restatement of the diff.
   - Mark breaking changes with `!` after the type/scope (e.g. `feat(api)!:`) and a `BREAKING CHANGE:` footer explaining the break.

7. **Present the message** in a fenced code block so it's easy to copy or pipe into `git commit -m`. Don't run `git commit` yourself unless the user explicitly asks you to.

## Notes

- If the diff genuinely mixes multiple concerns (e.g. a feature plus an unrelated dependency bump), say so and either propose splitting into separate commits or ask which change should be the primary subject.
- If the user has a `CHANGELOG.md`, `.gitmessage` template, or existing recent commits with a house style that deviates from vanilla Conventional Commits (e.g. always including a ticket number), match that instead — check `git log --oneline -10` if unsure whether local convention differs.
