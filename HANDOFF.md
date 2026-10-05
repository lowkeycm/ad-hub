# HANDOFF

Read both blocks below before starting work. Doctrine item 12 in `AGENTS.md` explains what to do with them: same operator, same platform, within 24 hours, pick up silently; anything else, read the Last Session block back and get acknowledgment before working.

Every session ends by updating this file, committing, and pushing. Not committed means the session did not happen.

## Last Session

- **When:** 2026-10-05
- **Who:** Clay. The platform showed the account listed in `people/clay.md`.
- **Platform:** Claude Code (remote), branch `clay/agent-scaffolding`
- **Request:** Give this new repo the same agent setup as Clay's other projects, using the clay-config templates, and bring in the Ad-Hub starter skeleton he attached. Then read the build documents and report back what this repo is and what will be built first, and wait for his OK before building anything.
- **Changed:** Any agent on any platform now gets the same rulebook, operator profile and handoff as Clay's other repos, and the decisions from the Ad-Hub planning conversation are kept word for word in `AGENTS.md` 2.16 along with Clay's 2026-10-05 answers to its open questions. Files: the starter imported exactly as supplied (commit `d9ca701`); the original `CLAUDE.MD` replaced by `CLAUDE.md`; `AGENTS.md` rebuilt from the clay-config template (Section 1 unchanged, Section 2 filled from this repo); `HANDOFF.md`, `people/clay.md`, `.claude/settings.json` and `.claude/hooks/session-start.sh` added (Marketing-Hub block removed from the hook on purpose, see `AGENTS.md` 2.15); `README.md` layout and status line updated for the new files. No skill, schema or script was written.
- **Verification:** `AGENTS.md` Section 1 diffed identical to `clay-config/templates/AGENTS.md` at clay-config revision `6ab2715`. No template placeholder left in `AGENTS.md` or this file. Every relative link in the repo's Markdown resolves. The hook passes a syntax check and ran by hand with the remote flag set (exit 0, identity set); it has not yet been seen running at a real session start. `.claude/settings.json` parses. There is no build, test suite or CI to run. Section 1 was compared against the template, not against another active repo, because none was attached to this session.
- **Status:** PR [lowkeycm/ad-hub#1](https://github.com/lowkeycm/ad-hub/pull/1). This block was written before the merge; if that PR shows merged, the scaffolding is on `main`. Ad-Hub was added to the clay-config project map in [lowkeycm/clay-config#6](https://github.com/lowkeycm/clay-config/pull/6), opened the same session.
- **Next:** Clay's OK on the understanding and plan reported at the end of this session, then Stage 1 piece 1 (below).

## Prior Session (none)

This was the first session in this repo. The starter itself came out of a planning conversation that is not recorded here; its decisions are in `AGENTS.md` 2.16.

## Where We Are

Ad-Hub is a hub of paid-ads skills that business repos plug into. As of 2026-10-05 it is a written design with no working parts yet.

**What works.** Nothing executable exists. What exists is drafted text: the authority map (`README.md`), the system layer drafts (`core/_system/`: conventions, memory contract, spend authority), thirteen source reviews plus a conflicts list (`source-notes/`), the first plays library, and two dated Meta references. Their freshness dates: plays library verified 2026-10-03 with a 45-day life (refresh due 2026-11-17); `meta-system/references/platform-tools.md` 2026-10-03, 30 days (due 2026-11-02); `meta-system/references/result-signals.md` 2026-10-03, 60 days (due 2026-12-02).

**What is in progress.** This scaffolding PR only.

**What is broken or unresolved.**
- `core/_system/memory-contract.md` still calls the `ads/` layout and the ad ID format proposals, although Clay approved both on 2026-10-05.
- No business repo has been named for testing the first skill. The 2026-10-05 message left it blank.
- Marketing-Hub has its own `paid-ads`, `start-here`, `audience-research`, `competitive-intel` and `performance-review` skills. A business repo with both hubs will list both sets. Which owns ad work there is undecided (`AGENTS.md` 2.15).
- `PROVENANCE.md` open items: the Ben Heath course terms were not reviewed, and two video creators are unnamed.
- The language for the Stage 1 helper scripts is not chosen.

**What could not be determined from here.** Whether any of Clay's platforms can view Meta's Ad Library in a working browser (this one cannot, see below). Whether Meta's ads connector or the `meta-ads` command-line tool is set up anywhere for Clay; neither is connected to this session.

**Open owner actions.**
- OK the understanding and first-step plan reported at the end of this session.
- Name the business repo for the first skill test (needed after `start-here` is built, not before).
- Decide how Ad-Hub and Marketing-Hub split ad work in a business repo that uses both (needed before the first business install).

**Next concrete step.** Stage 1 piece 1 of `BUILD-PLAN.md`: mark the `ads/` layout and ad ID format approved in `core/_system/memory-contract.md`, and write the four schemas other skills depend on (offer file, authority file, ledger row, change-log entry). Then stop for Clay's review.

## Platform capability notes

These are dated observations, not permanent truths. Retest any "cannot" older than its date before relying on it, and update when reality changes (doctrine 15).

### Claude Code (remote), measured 2026-10-05

| Capability | Result |
| --- | --- |
| Build gate | None exists. No package manifest, script or test in the repo, so nothing to run. |
| Screenshot a local dev server | Partly. Headless Chromium (Playwright 1.56.1) rendered and screenshotted a local test page at 1440x900. There is no dev server in this repo to test. |
| Reach the live site | No live site exists. Primary sources instead: Meta's developer documentation is reachable by plain web request (redirects to `developers.facebook.com/documentation/ads-commerce/marketing-api`). Meta's Ad Library is not: a plain request gets Meta's bot challenge (HTTP 403), and the headless browser failed on the session proxy's certificate (`ERR_CERT_AUTHORITY_INVALID`), so no public site opened in the browser at all. PyPI is reachable, so the `meta-ads` tool version can be checked. |
| Query the database | No database. |
| Run the test suite | No suite. |
| Push and open a PR | Yes. Pushed `clay/agent-scaffolding` and opened PR #1 through the GitHub connector. |
| Other repos | clay-config reachable (templates read at `6ab2715`). Marketing-Hub attached read-only and checked out at `../marketing-hub`, revision `911e979`. |
| Meta ad tools | No Meta connector or command-line tool in this session. |
| Session hook | Runs by hand with the remote flag set; not yet observed at a real session start. |

## Recovery checkpoints

Push meaningful work to the branch during long sessions, not only at the end.
Label incomplete checkpoints honestly. Track separately: local save, remote push
(with SHA), merge (PR), deployment (URL and code SHA), and verification evidence.
A later documentation commit does not imply the deployed application changed.
Keep doctrine 12's acknowledgment rule intact so work by other operators is visible.

- 2026-10-05: starter import `d9ca701` and scaffolding pushed to `clay/agent-scaffolding`, PR #1. Nothing deploys from this repo.
