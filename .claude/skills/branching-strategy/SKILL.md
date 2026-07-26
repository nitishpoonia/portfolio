---
name: branching-strategy
description: >
  Use this skill whenever the user asks about creating a branch, what to name a
  branch, how to structure a git workflow, when to merge, how to handle a hotfix,
  or asks "what branch should this be" for a solo-developer project with frequent
  releases. Applies a trunk-based development strategy: main is always deployable,
  branches are short-lived, and releases are tagged directly off main. Covers both
  Arthtech work repos (GoMo, MDR) and personal/freelance repos (Own-It and others),
  noting where conventions may differ between them.
---

# Branching Strategy — Trunk-Based (Solo Dev)

Applies trunk-based development: one long-lived branch (`main`), everything else is short-lived and merges back fast. Chosen because a solo dev doesn't benefit from Git Flow's release/develop overhead, and frequent releases favor small, fast-merging changes over long-lived feature branches.

## Core rules

1. **`main` is always deployable.** Never commit broken code directly to `main`. Every change goes through a branch, even if it's reviewed by no one but you — the branch exists to keep `main` clean and to give you a rollback point.

2. **Branches are short-lived — hours to 1-2 days max.** If a branch is still open after 2 days, it's too big. Split it: merge the working part behind a flag or as a smaller increment, and branch again for the rest. Long-lived branches are where trunk-based workflows quietly turn into Git Flow by accident — resist that.

3. **Branch off `main`, merge back to `main`.** No `develop` branch, no intermediate integration branch. One source of truth.

4. **Delete branches after merge.** Don't accumulate stale branches — they're disposable by design.

## Branch naming

Format: `<type>/<short-description>`, kebab-case, no ticket number required unless one exists (e.g. GoMo/MDR work may have a Jira key, Own-It may reference a SCRUM ticket).

Types:

- `feat/` — new feature or capability
- `fix/` — bug fix
- `chore/` — tooling, deps, config, non-functional cleanup
- `refactor/` — restructuring without behavior change
- `hotfix/` — urgent production fix, branched directly off `main` at the current deployed tag

Examples:

- `feat/ai-chat-loading-state`
- `fix/android-scoped-storage-download`
- `hotfix/session-token-null-check`
- With ticket: `fix/SCRUM-42-streak-reset-bug`

## Workflow

1. **Start:** `git checkout main && git pull && git checkout -b <type>/<description>`
2. **Work in small commits** on the branch (pairs with the `commit-message-writer` skill for Conventional Commits messages).
3. **Merge back to `main`** as soon as the change is complete and working — don't batch multiple unrelated changes into one branch.
   - Solo + work repo (GoMo/MDR): merge via PR if the team wants visibility (per earlier discussion — merge yourself, share the link as FYI, no formal review gate needed), or merge directly if it's a small change nobody needs to see beforehand.
   - Solo + personal/Own-It: merge directly with `git merge --no-ff <branch>` to preserve a merge commit marking the feature boundary, or fast-forward if you don't care about that marker.
4. **Delete the branch** immediately after merge: `git branch -d <branch>` (and remote: `git push origin --delete <branch>` if pushed).

## Releases

Tag directly off `main` at release points — no separate release branch needed for a solo dev with frequent releases:

```bash
git tag -a v1.4.0 -m "release: v1.4.0"
git push origin v1.4.0
```

Use semantic versioning (`MAJOR.MINOR.PATCH`). Bump PATCH for fixes, MINOR for features, MAJOR for breaking changes — consistent with Conventional Commits types already in use.

## Hotfixes

If a bug is live in production and can't wait for the normal cycle:

1. `git checkout main && git pull`
2. `git checkout -b hotfix/<description>`
3. Fix, commit, merge straight back to `main`, tag a PATCH release immediately.
4. No separate hotfix-to-develop-and-main dance — there's no `develop` to sync.

## Where work vs. personal repos may differ

- **GoMo/MDR (Arthtech):** even though the user merges their own PRs, still open a PR rather than pushing directly to `main` if teammates might touch the same code — it gives Rahul/Mukesh/Manpreet/Ashley a diff to glance at asynchronously, per the earlier "FYI, no action needed" sharing pattern. Branch naming should include the Jira ticket key when one exists.
- **Own-It / personal / freelance:** direct merge to `main` is fine, PRs are optional ceremony since there's no one else to give visibility to. Optimize for speed over process here.

## Notes

- If the user's actual working pattern in a repo already deviates from this (e.g. an existing `develop` branch is in use, or CI/CD is wired to a specific branch name), follow the existing convention in that repo rather than forcing this structure — ask before restructuring an established repo's branching model.
- This skill governs branch/merge/release mechanics, not commit message format — pair with the `commit-message-writer` skill for that.
