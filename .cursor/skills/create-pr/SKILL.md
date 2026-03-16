---
name: create-pr
description: Creates GitHub pull requests using git and the gh CLI with consistent summaries and test plans. Use when the user asks to open, prepare, or update a pull request, share a GitHub PR URL, or mention "create PR", "open PR", or "pull request".
---

# Create PR

## Quick start

When the user asks to create a pull request:

1. **Understand intent**
   - Identify the **base branch** (default to `main` if not specified).
   - Confirm whether to **use the current branch** or create a new one.
   - Check if the user wants any **specific PR title, labels, or reviewers**.

2. **Inspect local changes**
   - Run `git status` to see untracked and modified files.
   - Run `git diff` to understand what will be included.
   - Run `git log --oneline -n 10` to see recent commits and style.

3. **Prepare commits**
   - Stage only relevant files with `git add`.
   - Create one or more commits with clear messages that explain the **why**, not just the **what**.
   - Avoid committing secrets or environment files (e.g. `.env`, `*.pem`, API keys).

4. **Sync with remote**
   - Ensure the base branch (e.g. `main`) is up to date: `git fetch` then `git rebase origin/main` or `git merge origin/main` according to project conventions.
   - Push the feature branch with `git push -u origin <branch-name>`.

5. **Create the PR with `gh`**
   - Use `gh pr create` with:
     - **Title**: short, action-oriented summary.
     - **Body**: include `## Summary` and `## Test plan` sections (see template below).
     - **Base and head** branches if needed (e.g. `--base main --head my-feature-branch`).

6. **Share result**
   - Capture and return the created PR URL to the user.
   - Briefly summarize what is included in the PR in natural language.

## Standard PR body template

When creating a PR body, use this structure and adapt bullets to the actual changes:

```md
## Summary
- [ ] Short bullet describing the main change
- [ ] Additional bullet(s) for key behavior or UI changes

## Test plan
- [ ] Tests run (unit/integration/e2e) and key scenarios verified
- [ ] Manual steps the reviewer can follow, if applicable

## Notes
- [ ] Known limitations, follow-ups, or related tickets (if any)
```

## Detailed workflow

Use this checklist when the user explicitly asks you to "create a PR" or "open a PR":

1. **Analyze the diff**
   - Review **all** changes that will be part of the PR (not just the latest commit).
   - Group changes into 2–5 bullet points for the PR summary.

2. **Draft commit and PR messages**
   - Align with the repo’s existing commit and PR style (tense, prefixes, ticket IDs).
   - Prefer titles like `Fix ...`, `Add ...`, `Refactor ...`, or `Update ...`.

3. **Create or reuse the branch**
   - If on `main` (or the base branch), create a new branch with a descriptive name (e.g. `feature/user-auth`, `fix/navbar-layout`).
   - If already on a feature branch, reuse it unless the user asks otherwise.

4. **Push and create PR**
   - Push with `git push -u origin HEAD` if the branch is new.
   - Run `gh pr create` with:
     - `--title "<concise title>"`
     - `--body "<markdown body using the template>"`
     - `--base <base-branch>` when needed.

5. **After creation**
   - Return the PR URL and final title.
   - Mention any **manual steps** reviewers must take (migrations, feature flags, config changes).
   - If requested, also run `gh pr view --web` or show `gh pr view` summary for verification.

This skill assumes:
- The local repo is already authenticated with GitHub and the `gh` CLI is installed.
- Project-specific branching or labeling conventions should be inferred from existing PRs when possible and followed consistently.

