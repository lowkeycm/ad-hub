# HANDOFF

Read both blocks below before starting work. Doctrine item 12 in `AGENTS.md` explains what to do with them: same operator, same platform, within 24 hours, pick up silently; anything else, read the Last Session block back and get acknowledgment before working.

Every session ends by updating this file, committing, and pushing. Not committed means the session did not happen.

## Last Session

- **When:** 2026-10-10
- **Who:** Clay. The platform showed the account listed in `people/clay.md`.
- **Platform:** Claude Code (remote), branch `clay/stage1-helper-scripts`
- **Request:** "Go ahead": merge piece 1 with the proposed ledger-status split, then build Stage 1 piece 2, the helper scripts, in Node with no packages. Stop for review.
- **Changed:** An agent working in a business repo can now (1) load exactly the ad files a skill needs, with their age, and see what is missing and which skill fills it, (2) check which dated reference files need refreshing, and (3) get pointed at the right skill for a request. Skills that break the frontmatter rules now fail the build gate, and the repo has a build gate (`npm test`) for the first time. Files: `core/_system/scripts/` (lib.mjs, context.mjs, freshness.mjs, route.mjs, README.md, test/ with synthetic fixtures); `package.json` (test command only); `AGENTS.md` 2.4, 2.6, 2.12, 2.13; `README.md` layout; `core/_system/CONVENTIONS.md` sections 3 and 6 and `core/_system/memory-contract.md` "Reading" point at the scripts; hook comment updated. Piece 1 (PR #2) merged first, with the ledger split marked owner-confirmed.
- **Verification:** `npm test`: 15 of 15 pass on Node 22.22.0. Broke a real freshness header on purpose and confirmed the gate fails, then restored it. Ran the context loader from inside a business folder with no `--root`. The router was tried on a dozen plain-language requests; it is a word match and will miss phrasings it has no words for. Not run on Node 20, the stated minimum. No real business repo was used: the first one is still to be named.
- **Status:** PR open on `clay/stage1-helper-scripts`, waiting for Clay's review before merge.
- **Next:** Clay reviews piece 2. Then piece 3: synthetic regression cases, one per README acceptance case.

## Prior Session (2026-10-06, Stage 1 piece 1: schemas)

- **When:** 2026-10-06
- **Who:** Clay. The platform showed the account listed in `people/clay.md`.
- **Platform:** Claude Code (remote), branch `clay/stage1-schemas`
- **Request:** Start Stage 1 of `BUILD-PLAN.md`, piece 1: record that the `ads/` layout and ad ID format are approved, and write the four schemas other skills depend on. Stop for review. Clay also decided that Marketing-Hub will ultimately own ad work in business repos that have both hubs, reconciled once Ad-Hub works on its own.
- **Changed:** A skill writing into a business repo now has a fill-in template for each of the four files everything else depends on: the offer file, the spend authority file, a ledger row and a change-log entry. Each marks what blocks going live and what only blocks confident scaling, so thin context never blocks drafting. Files: `core/_system/schemas/` (offer.md, authority.md, ledger-row.md, change-entry.md); `core/_system/memory-contract.md` (approval recorded, schemas linked); `AGENTS.md` 2.15 (Clay's ownership decision) and 2.13 (repo map); `README.md` layout.
- **Verification:** Every relative link resolves. No template placeholder in `AGENTS.md` or this file. Section 1 unchanged. The schemas were checked by reading them against the memory contract and spend authority; no skill exists yet to exercise them, so they are untested in use.
- **Status:** PR [lowkeycm/ad-hub#2](https://github.com/lowkeycm/ad-hub/pull/2). Clay approved it and the ledger-status split on 2026-10-10; merged that day.
- **Next:** piece 2, the helper scripts.

## Prior Session (2026-10-05, agent scaffolding)

- **When:** 2026-10-05
- **Who:** Clay. The platform showed the account listed in `people/clay.md`.
- **Platform:** Claude Code (remote), branch `clay/agent-scaffolding`
- **Request:** Give this new repo the same agent setup as Clay's other projects, using the clay-config templates, and bring in the Ad-Hub starter skeleton he attached. Then read the build documents and report back what this repo is and what will be built first, and wait for his OK before building anything.
- **Changed:** Any agent on any platform now gets the same rulebook, operator profile and handoff as Clay's other repos, and the decisions from the Ad-Hub planning conversation are kept word for word in `AGENTS.md` 2.16 along with Clay's 2026-10-05 answers to its open questions. Files: the starter imported exactly as supplied (commit `d9ca701`); the original `CLAUDE.MD` replaced by `CLAUDE.md`; `AGENTS.md` rebuilt from the clay-config template (Section 1 unchanged, Section 2 filled from this repo); `HANDOFF.md`, `people/clay.md`, `.claude/settings.json` and `.claude/hooks/session-start.sh` added (Marketing-Hub block removed from the hook on purpose, see `AGENTS.md` 2.15); `README.md` layout and status line updated for the new files. No skill, schema or script was written.
- **Verification:** `AGENTS.md` Section 1 diffed identical to `clay-config/templates/AGENTS.md` at clay-config revision `6ab2715`. No template placeholder left in `AGENTS.md` or this file. Every relative link in the repo's Markdown resolves. The hook passes a syntax check and ran by hand with the remote flag set (exit 0, identity set); it has not yet been seen running at a real session start. `.claude/settings.json` parses. There is no build, test suite or CI to run. Section 1 was compared against the template, not against another active repo, because none was attached to this session.
- **Status:** PR [lowkeycm/ad-hub#1](https://github.com/lowkeycm/ad-hub/pull/1). Merged 2026-10-05. Ad-Hub was added to the clay-config project map in [lowkeycm/clay-config#6](https://github.com/lowkeycm/clay-config/pull/6), merged the same session.
- **Next:** Clay's OK on the understanding and plan reported at the end of this session, then Stage 1 piece 1 (below).

## Where We Are

Ad-Hub is a hub of paid-ads skills that business repos plug into. As of 2026-10-10 it has its rules, file schemas and helper scripts; no skill is built yet.

**What works.** The authority map (`README.md`), the system layer (`core/_system/`: conventions, memory contract, spend authority, four schemas), helper scripts with a passing build gate (`npm test`, pending merge), thirteen source reviews plus a conflicts list, the first plays library, and two dated Meta references. Freshness: plays library due 2026-11-17; `meta-system/references/platform-tools.md` due 2026-11-02; `meta-system/references/result-signals.md` due 2026-12-02.

**What is in progress.** Stage 1 piece 2, the helper-scripts PR, awaiting review.

**What is broken or unresolved.**
- No business repo named for testing the first skill.
- `PROVENANCE.md` open items: the Ben Heath course terms were not reviewed, and two video creators are unnamed.
- No CI, so `npm test` runs only when an agent runs it.
- Merged branches cannot be deleted from this platform. Leftovers: `clay/agent-scaffolding` and `clay/stage1-schemas` here, `clay/add-ad-hub-project-map` in clay-config.

**What could not be determined from here.** Whether any of Clay's platforms can view Meta's Ad Library in a working browser (this one cannot). Whether Meta's ads connector or the `meta-ads` command-line tool is set up anywhere for Clay.

**Open owner actions.**
- Review the helper-scripts PR.
- Delete the leftover branches (the "Delete branch" button on each merged PR), or turn on automatic branch deletion in each repo's settings.
- Name the business repo for the first skill test (needed after `start-here` is built).

**Next concrete step.** After review: Stage 1 piece 3, synthetic regression cases.

## Platform capability notes

These are dated observations, not permanent truths. Retest any "cannot" older than its date before relying on it, and update when reality changes (doctrine 15).

### Claude Code (remote), measured 2026-10-05

| Capability | Result |
| --- | --- |
| Build gate | 2026-10-05: none existed. 2026-10-10: `npm test` runs, 15 of 15 pass. |
| Screenshot a local dev server | Partly. Headless Chromium (Playwright 1.56.1) rendered and screenshotted a local test page at 1440x900. There is no dev server in this repo to test. |
| Reach the live site | No live site exists. Primary sources instead: Meta's developer documentation is reachable by plain web request (redirects to `developers.facebook.com/documentation/ads-commerce/marketing-api`). Meta's Ad Library is not: a plain request gets Meta's bot challenge (HTTP 403), and the headless browser failed on the session proxy's certificate (`ERR_CERT_AUTHORITY_INVALID`), so no public site opened in the browser at all. PyPI is reachable, so the `meta-ads` tool version can be checked. |
| Query the database | No database. |
| Run the test suite | No suite. |
| Push and open a PR | Yes. Pushed branches and opened and merged PRs through the GitHub connector. Deleting a remote branch is refused (HTTP 403 from the session's git proxy, 2026-10-05, retested 2026-10-10 with the same result); the connector has no branch-delete tool. |
| Other repos | clay-config reachable (templates read at `6ab2715`). Marketing-Hub attached read-only and checked out at `../marketing-hub`, revision `911e979`. |
| Meta ad tools | No Meta connector or command-line tool in this session. |
| Session hook | Runs by hand with the remote flag set; not yet observed at a real session start. |

## Recovery checkpoints

Push meaningful work to the branch during long sessions, not only at the end.
Label incomplete checkpoints honestly. Track separately: local save, remote push
(with SHA), merge (PR), deployment (URL and code SHA), and verification evidence.
A later documentation commit does not imply the deployed application changed.
Keep doctrine 12's acknowledgment rule intact so work by other operators is visible.

- 2026-10-05: starter import `d9ca701` and scaffolding pushed to `clay/agent-scaffolding`, PR #1, merged as `a67d2f4`. Nothing deploys from this repo.
- 2026-10-06: Stage 1 piece 1 (schemas) pushed to `clay/stage1-schemas`, PR #2; merged 2026-10-10 as `7a4d327`.
- 2026-10-10: Stage 1 piece 2 (helper scripts) pushed to `clay/stage1-helper-scripts`, PR open for review.
