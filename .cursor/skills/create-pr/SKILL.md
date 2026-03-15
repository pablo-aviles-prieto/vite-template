---
name: create-pr
description: Prepares and creates a GitHub pull request against a base branch (default main), including origin verification, quality checks, merge/rebase, PR body generation, and optional Copilot review. Use when the user asks to create a PR, open a pull request, or get changes ready for review.
---

# Create Pull Request

## Base branch

- **Default**: `main`. Use this unless the user specifies another base (e.g. "PR against develop").
- If the user provides a branch name in the instruction, use that as the base branch.

## Workflow

Follow these steps in order. If any step fails, fix the issue before continuing.

### 1. Verify GitHub origin

- Run: `git remote get-url origin`
- Confirm the remote is GitHub (`github.com` in the URL). If there is no `origin` or it is not GitHub, stop and tell the user to add a GitHub remote.
- Parse **owner** and **repo** from the URL:
  - `https://github.com/OWNER/REPO.git` or `https://github.com/OWNER/REPO`
  - `git@github.com:OWNER/REPO.git`
  - `ssh://git@github.com/OWNER/REPO.git`
- Ensure the current branch is pushed: `git push -u origin HEAD` (or push the current branch name). Resolve push failures before continuing.

### 2. Run quality checks (package.json scripts)

Run these so the PR is ready and CI is likely to pass. Use the project’s `package.json`; if scripts differ, run the equivalents.

**Always run (if present):**

- `npm run build` (or `pnpm build` / `yarn build`)
- `npm run lint` (or `lint:fix` only if the user prefers auto-fix)
- `npm run test:unit` (or `test` / `vitest run` / equivalent)

**Optional but recommended when fast enough:**

- `npm run test:e2e` if the user wants full e2e coverage before opening the PR.

If `package.json` has different script names (e.g. `check`, `validate`, `test:all`), run the ones that correspond to build, lint, and tests. If any script fails, fix the failures or report them and do not create the PR until they pass (unless the user explicitly asks to open the PR anyway).

### 3. Merge base branch locally

Avoid merge conflicts on GitHub by updating the current branch with the base:

- Ensure the working tree is clean (no uncommitted changes). If there are uncommitted changes, commit them or stash (`git stash`) before merging or rebasing; otherwise `git merge`/`git rebase` can fail or produce confusing results.
- Fetch: `git fetch origin BASE` (e.g. `git fetch origin main`)
- Merge: `git merge origin/BASE` (e.g. `git merge origin/main`)
- If there are conflicts, resolve them, then run the relevant quality checks again (step 2). Do not create the PR until the merge is clean and checks pass.
- If the user prefers rebase: `git rebase origin/BASE`, then resolve conflicts and re-run checks if needed.

### 4. Push after merge/rebase

- After **merge**: run `git push origin HEAD` (or push the current branch). Ensure the branch on GitHub is up to date before creating the PR.
- After **rebase**: history was rewritten, so use `git push --force-with-lease origin HEAD` (a normal push will be rejected). After a merge, use a normal push only.

### 5. Build PR description (diff vs base)

Include a concise summary of what changed so reviewers see the scope. Generate it from git:

**Commits in this branch (not in base):**

```bash
git log origin/BASE..HEAD --oneline
```

**Files changed (summary):**

```bash
git diff origin/BASE...HEAD --stat
```

Optionally, for a short list of changed files only:

```bash
git diff origin/BASE...HEAD --name-only
```

Use the output to write a **"Changes in this PR"** (or similar) section in the PR body, e.g.:

- List of commit titles (or paste the `git log` output).
- List of files changed or a short summary (from `git diff --stat`).

Do not paste a huge full diff into the description; summary and file list are enough. If the diff is small, a brief inline summary is fine.

### 6. Create the PR

- Use the GitHub MCP tool **create_pull_request** with:
  - **owner**, **repo**: from step 1
  - **head**: current branch name (e.g. `git branch --show-current`)
  - **base**: base branch (e.g. `main` or the branch the user requested)
  - **title**: clear, concise PR title
  - **body**: description including the "Changes in this PR" summary from step 5 (and any other context the user wants).
- If the tool returns an error (e.g. PR already exists), check existing PRs and either update that PR or tell the user.

### 7. Request Copilot review (if available)

- After the PR is created, call the GitHub MCP tool **request_copilot_review** with:
  - **owner**, **repo**: same as step 1
  - **pullNumber**: the number of the PR just created
- If the tool is not available or returns an error (e.g. Copilot not enabled), skip this step and mention to the user that Copilot review was not requested.

## Checklist (for the agent)

- [ ] Origin is GitHub; owner and repo parsed
- [ ] Current branch pushed to origin
- [ ] `build`, `lint`, and test scripts from package.json run and pass
- [ ] Base branch merged (or rebased) locally; no conflicts
- [ ] Branch pushed after merge/rebase
- [ ] PR description includes commit list and file-change summary vs base
- [ ] PR created against the correct base (main or user-specified)
- [ ] Copilot review requested when the MCP tool is available

## Optional: Getting PR number after create

The **create_pull_request** result should include the new PR number. Use that value as **pullNumber** for **request_copilot_review**. If the result format does not include the number, use **list_pull_requests** (filter by head branch and open state) to get the PR number.
