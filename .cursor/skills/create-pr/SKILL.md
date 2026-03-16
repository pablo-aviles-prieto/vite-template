---
name: create-pr
description: Creates GitHub pull requests using git and the GitHub MCP tools with consistent summaries, test plans, and verification checks. Use when the user asks to open, prepare, or update a pull request, share a GitHub PR URL, or mention "create PR", "open PR", or "pull request".
---

# Create PR

## Quick start

When the user asks to create a pull request:

1. **Understand intent**
   - Identify the **base branch**:
     - **Default**: `main`.
     - If the user explicitly mentions a different target (e.g. "against `develop`"), use that as the base.
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

4. **Verify branch is up to date**
   - Determine the base branch (default `main`, or the one the user specified).
   - Ensure your **working tree is clean** (no uncommitted changes) before syncing.
   - Run:
     - `git fetch origin`
     - `git merge origin/<base-branch>` **or** `git rebase origin/<base-branch>` according to project conventions.
   - Resolve any conflicts and re-run checks before continuing.

5. **Run checks (tests, linting, TypeScript)**
   - From `package.json` scripts, run at least:
     - `pnpm build` or `npm run build` – validates TypeScript (`tsc -b`) and the build.
     - `pnpm lint` or `npm run lint` – static analysis / linting.
     - `pnpm test:unit` or `npm run test:unit` – unit tests.
   - If the project has e2e tests and they are reasonable to run:
     - `pnpm test:e2e` or `npm run test:e2e`.
   - If any command fails, **fix the issue first** or explicitly confirm with the user if they want to proceed with a failing check.

6. **Sync feature branch to remote**
   - Ensure the current branch is pushed:
     - For a new branch: `git push -u origin HEAD`.
     - For an existing branch: `git push origin HEAD`.

7. **Create the PR using GitHub MCP**
   - Use the GitHub MCP tool `create_pull_request` with:
     - `owner`: repository owner (parsed from `git remote get-url origin`).
     - `repo`: repository name (remote name without `.git`).
     - `head`: current branch name (e.g. output of `git branch --show-current`).
     - `base`: base branch (default `main` or user-specified).
     - `title`: short, action-oriented summary (see below).
     - `body`: markdown body using the PR body template below.
   - Optionally, request Copilot review using `request_copilot_review` with:
     - `owner`, `repo`.
     - `pullNumber` from the created PR.

8. **Share result**
   - Capture and return the created PR URL to the user.
   - Briefly summarize what is included in the PR in natural language.
   - Mention any manual steps (e.g. migrations, feature flags) reviewers must know about.

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

4. **Ensure branch is up to date with base**
   - Confirm which base branch to use:
     - Default `main`.
     - Or a specific base explicitly requested by the user.
   - Run:
     - `git fetch origin`
     - `git merge origin/<base-branch>` or `git rebase origin/<base-branch>`.
   - Resolve conflicts and re-run `build`, `lint`, and tests.

5. **Run verification checks**
   - Make sure the following (or project equivalents) all pass:
     - **TypeScript/build**: `pnpm build` / `npm run build`.
     - **Linting**: `pnpm lint` / `npm run lint`.
     - **Unit tests**: `pnpm test:unit` / `npm run test:unit`.
   - If available and appropriate:
     - **E2E tests**: `pnpm test:e2e` / `npm run test:e2e`.
   - If any check fails, either fix it or clearly note the failure in the PR body and confirm with the user before opening.

6. **Push and create PR using MCP**
   - Push with `git push -u origin HEAD` if the branch is new (or `git push` if it already exists).
   - Call the GitHub MCP tool `create_pull_request` with:
     - `owner`, `repo`: parsed from the `origin` remote.
     - `head`: current branch name.
     - `base`: base branch (default `main` unless overridden by the user).
     - `title`: concise, action-oriented.
     - `body`: markdown description using the template from **Standard PR body template**.

7. **Optionally request Copilot review**
   - If available and appropriate, call `request_copilot_review` with:
     - `owner`, `repo`.
     - `pullNumber` from the created PR.

8. **After creation**
   - Return the PR URL and final title.
   - Mention any **manual steps** reviewers must take (migrations, feature flags, config changes).
   - If requested, also fetch additional details using MCP tools (e.g. `pull_request_read`).

This skill assumes:
- The local repo is already authenticated with GitHub via the MCP GitHub integration.
- Project-specific branching, testing, and labeling conventions should be inferred from existing PRs when possible and followed consistently.

