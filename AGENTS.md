# AGENTS.md

This is the canonical instruction file for this repository. Every agent and every human working here reads it, on every platform.

Claude Code reads `CLAUDE.md`, which contains a single line pointing at this file. Codex reads `AGENTS.md` natively. Perplexity Computer and anything else should be pointed here directly. There is one set of rules, in one place, so a rule learned on one platform is not lost when the work moves to another.

Section 1 is universal doctrine and is shared verbatim across projects. Do not edit it here. Section 2 is specific to this repository.

---

## Section 1: Working Doctrine

Fifteen rules. Every agent, every platform, every operator. Nothing in `people/` or anywhere else relaxes them. Project facts live in Section 2; current state lives in `HANDOFF.md`; how to communicate with the operator lives in `people/`.

1. **Think with the end in mind.** Before changing anything, answer: what is this for, who uses it and in what moment, what must they walk away with. Hold the result to those answers, not to "it compiles" or "the ticket is closed."

2. **Verify before declaring done.** UI work: render the actual surface and look at it. Data work: validate against live data. Bug fixes: reproduce first, then prove the fix kills that exact reproduction. If your platform cannot do the needed verification, item 15 applies.

3. **Root cause over patches.** If two symptoms share one cause, name it and fix it once. Never ship a workaround dressed as a fix.

4. **No half-builds.** If the work is bigger than the session, stop and propose it as a scoped follow-up instead of leaving something that looks finished and is not.

5. **Do not reintroduce fixed bugs.** Read `HANDOFF.md` and recent history for the area before working in it.

6. **Git discipline.** Set identity at session start, before any commit: `lowkeycm` / `lowkeycm@users.noreply.github.com`. Never commit to `main`. Branch `clay/what-it-does`. Open a PR with a conventional-commit title, merge it yourself once checks pass, delete the branch. Do not ask the operator to merge.

7. **Verify deploys.** Confirm what actually shipped rather than assuming a green build shipped the right thing.

8. **Secrets stay out of chat, commits, and logs.** Read them only from the locations in the Section 2 secrets map. A value you cannot read is not a value that is missing.

9. **Data isolation between businesses.** One business's data never touches another's database, CRM, or webhooks. Where two products share one database, the same rule applies between the products: touch only the tables and functions this repo owns (Section 2 lists them).

10. **Copy standards.** In anything customer-facing (site and app copy, marketing email and SMS, social posts, ad copy, anything an assistant says to a customer): no em dashes, no emojis, plain language, no filler, no corporate hedging. Internal docs, commit messages, PR bodies, and code comments are exempt from the punctuation ban but keep the plain-language bar. Legal text is precision, not marketing: do not restyle it unprompted. Never address a person by a name inferred from an email address. For tone and depth when talking to the operator, follow their file in `people/` (Clay's bans em dashes in messages to him).

11. **Ask before large or ambiguous changes.** When scope grows past what was agreed or the answer needs a product decision, stop and check. Non-owners cannot approve scope changes (see the Operator section).

12. **Handoff hygiene.** At session start read `HANDOFF.md`. Same operator, same platform, within 24 hours: pick up silently. Anything else: read the Last Session block back and get acknowledgment before working. At session end update `HANDOFF.md`, commit, push. Not committed means the session did not happen.

13. **Durable learnings go in the repo, not platform memory.** Platform memory does not travel. Rules and corrections belong in this file, current state in `HANDOFF.md`, operator preferences in `people/`.

14. **Confirm the target before infrastructure operations.** Before any deploy, migration, or secrets change, state which project you are targeting and check it against Section 2. The deploy credential reaches every project on the account, across separate businesses.

15. **Capability honesty.** If you cannot perform a required verification from your platform, say so plainly and hand that part back. Never skip it silently, never substitute a weaker check and present it as the real one. Capability notes recorded in `HANDOFF.md` go stale: retest any "cannot" before relying on it, and update the note when reality has changed.

## Section 2 - Project specifics

### 2.1 Identity

| Field | Value |
| --- | --- |
| What it is | A self-contained hub of skills and rules for developing and managing paid ads: research, strategy, creative, account setup, launch, management and review. It holds capability only. Business repos plug into it and keep their own context and records. Meta is the first platform; others follow as thin layers. |
| Business | None. Brand-neutral tooling owned by Clay, meant to serve any of his businesses. It holds no business's facts, results or learnings (README hard rule 6). |
| Live URL | Not deployed. Nothing here is a website or an app. |
| Repo | github.com/lowkeycm/ad-hub |
| Hosting | None. |
| Database | None. By design the hub stores no business data. |
| Other systems | Planned, not connected: Meta's official ads connector and the `meta-ads` command-line tool, used only against a business's own ad account under that business's recorded spend authority. See `meta-system/references/platform-tools.md`. |
| Owner | Clay. See `people/clay.md`. |

No compliance-sensitive strings live in this repo. Each business's legal name, phone, address and consent language stay in that business's repo. Never copy them here.

### 2.2 Git identity and workflow

- Commits are authored as `lowkeycm` / `lowkeycm@users.noreply.github.com`. Set this during session bootstrap, before any work, not at commit time:
  ```
  git config user.name "lowkeycm"
  git config user.email "lowkeycm@users.noreply.github.com"
  ```
- **Never commit to `main`.** Every session opens its own branch.
- Branch naming: `clay/what-it-does`. Platform-generated names do not meet this. Rename before opening a PR.
- Open a pull request with a conventional-commit title. Merge it yourself once CI is green. Do not ask the owner to click merge. Delete the branch after merge.
- At session start, run `git branch -r --sort=-committerdate | head` and check whether another open branch is already touching the area you are about to work in.
- Pushes route through a proxy and occasionally fail with HTTP 407. Wait a few seconds and retry.

### 2.3 Operator

The operator is the person directing this session. It is not the commit account. That is always `lowkeycm` regardless of who is working, so it identifies nobody. Never infer the operator from git config, a commit email, or any address you find in the repo.

Profiles live in `people/`. Each begins with the person's name, role, and the account they work from.

**If `people/` contains exactly one profile, that person is the operator. Use it and do not ask.**

**If it contains more than one:**

1. Use the platform's authenticated account if you can see it, matched against the account listed in the profile header.
2. If the platform does not expose it, ask once, then continue.
3. If a person states who they are in the conversation, that overrides everything else.

Record the operator in the Last Session block of `HANDOFF.md`.

**Authority.** Clay is the owner and can approve product decisions, scope changes, and changes of direction. Other operators cannot. If a non-owner requests something that changes agreed scope, do it only if it clearly sits inside the existing plan. Otherwise say plainly that it needs Clay's sign off, and never treat silence as approval.

**Scope limit.** Profiles govern communication, context, and authority only. They never modify quality standards. Doctrine items 1 through 15 apply identically to every operator.

**Related.** `github.com/lowkeycm/clay-config` holds cross-project preferences and the project map. It is often unreachable from a single-repo session, which is why `people/clay.md` lives here. Nothing in this repo depends on reaching it.

### 2.4 Stack

Checked against the repository on 2026-10-10.

- **Content:** Markdown only. Rules, references, source reviews and the plays library are `.md` files. No skill (`SKILL.md`) exists yet.
- **Code:** Node, standard library only, no packages (Clay, 2026-10-10). Helper scripts in `core/_system/scripts/` (context loader, freshness checker, router and skill check), tested with Node's built-in test runner. `package.json` exists only to name the test command; there is no lockfile and nothing to install. Node 20 or later. Keep new scripts dependency-free unless Clay approves a package.
- **CI:** none. No `.github/workflows/` yet.
- **Planned:** the pointer generator for business repos (Stage 1), in the same style.
- **Seen on Claude Code (remote), 2026-10-05:** Node 22.22.0 and Python 3.11.15 installed. That describes the platform, not a project requirement.

### 2.5 Secrets map

**Locations only. Never record a value here, in a commit, in a PR body, or in chat.**

| Name | Where it lives | Used by |
| --- | --- | --- |
| None today | Nothing in this repo reads a secret. | n/a |
| Meta ad account access (planned) | Outside version control, in the business's own environment or the operator's connected Meta tools. Exact location decided when `ad-setup` or `ad-launch` is built. UNVERIFIED. | Future `ad-launch`, `ad-manage`, and account reads |

Rules:
- Anything prefixed `VITE_` or `NEXT_PUBLIC_` is compiled into the browser bundle and is public by definition. Never put a secret behind such a name.
- `.env` and `.env.*` are gitignored. Do not add a real `.env` to the repo.
- Ad account identifiers may be written in a business repo's `ads/platform/<platform>.md`. Tokens and credentials never are (`core/_system/memory-contract.md`, "What never goes in a repo").
- This hub never stores a business's credentials, not even in a test case.

**Known gotcha, do not relearn this the hard way:** the Supabase Management API `GET /v1/projects/*/secrets` endpoint returns SHA-256 hashes, not values. Never conclude a key is fake, empty, or a placeholder from that endpoint. Check the store that actually holds the value.

**Blast radius:** the Supabase access token (`SUPABASE_ACCESS_TOKEN`) is account-wide. It reaches every Supabase project on the account, across separate businesses. Before any infrastructure operation, list the projects, confirm the ref matches 2.1, and say out loud which project you are targeting. The Supabase MCP connector may be scoped to a different organization than this project; if it cannot see this project's ref, do not reach for the closest available project.

This repo has no Supabase project. An Ad-Hub session has no reason to run a Supabase operation; if one seems needed, stop and ask.

### 2.6 Build and verification commands

Run everything from the repo root.

| Command | What it does | Verified |
| --- | --- | --- |
| none | No install step: the scripts use only Node's standard library. | 2026-10-10 |
| `npm test` | Runs the helper-script tests against synthetic fixtures, then checks the real hub: every freshness header valid, every built skill passes `route.mjs --check`. | 2026-10-10, 15 of 15 passing on Node 22.22.0 |

**Build gate: `npm test` must pass before every commit.** It covers the scripts and the structure of the hub, not the quality of a skill's output. For every change also re-read the diff, confirm every relative link you added points at a real file, confirm no template placeholder is left in `AGENTS.md` or `HANDOFF.md` (the check in clay-config `NEW-PROJECT.md`), and keep the README layout and task table matching what actually exists. There is no CI, so the gate runs only when an agent runs it. The Stage 1 regression cases become the acceptance test for each skill (`core/_system/CONVENTIONS.md` section 11).

### 2.7 Deploy process

- Nothing deploys. There is no hosting, no production environment and no live URL.
- The hub reaches users by being checked out beside a business repo, which then gets `adhub-` pointer skills generated into it (`install/README.md`, built in Stage 1). Merging to `main` is the release: the next business-repo session that reads the hub picks up the change.
- So a merged change to a skill changes behavior in every business repo that uses the hub. Treat it as a release and say so in `HANDOFF.md`.
- Live ad accounts are not a deploy target of this repo. A change to a live account happens from a business repo session, through `ad-launch` or `ad-manage`, under `core/_system/spend-authority.md`. It is an infrastructure operation under doctrine 14.

### 2.8 UI and design standards

This repo has no UI and no design system. If one is ever added, the standard rule applies: **visual verification is required for any UI change, before committing.** Load the affected page, screenshot desktop at 1440x900 and mobile at 390x844, confirm the change and that nothing else broke. If your platform cannot render a browser, say so and hand the verification back (doctrine 15).

The visual check that matters for this hub is ad creative: a finished ad is inspected as the actual render at the size it will be seen (`core/_system/CONVENTIONS.md` section 8). That happens in the business repo where the ad is made.

### 2.9 Copy doctrine

Doctrine item 10 applies. In addition for this project:

- The hub has no customer-facing copy of its own. The ad copy its skills produce is customer-facing, so doctrine 10 applies to that output in every business repo, and no skill may instruct otherwise.
- The truth rule is a hard rule: claims, testimonials, stories, numbers, urgency and scarcity must be real and traceable to the business's proof, and AI-made people are never presented as customers (README hard rule 4, `core/_system/spend-authority.md`).
- Voice belongs to the business. Skills read each business's voice and context from that business's repo, by meaning. The hub carries no brand voice; examples and test businesses are synthetic and brand-neutral.
- Skill text follows `core/_system/CONVENTIONS.md` section 1: plain, confident, operator to operator, no hype, no filler, each rule stated once.

### 2.10 Identity facts, source of truth

Not applicable. The hub holds no business identity strings. Each business repo owns its own and names the file that holds them; skills read them from there and never paraphrase them.

### 2.11 Scope

Default posture on this repo is active build.

**Pre-approved:** work needed to build a feature Clay asked for, including schema migrations, new pinned packages, preview settings and preview deploys, in this project's own database and hosting only. A roadmap is not a feature request.

**In scope, just do it:**
- The current item in `BUILD-PLAN.md`, one piece at a time. Clay asked on 2026-10-05 to stop for his review after each piece. Finishing a piece means: its own branch and PR, a plain-language report, and a wait for his review before merging it or starting the next piece.
- Fixing errors, broken links, and mismatches between the README, the system layer and what has been built.
- Writing a source review in `source-notes/` and adding its plays when Clay supplies a source (`source-notes/README.md`, "Adding a source").
- Synthetic regression cases and test fixtures inside this repo.

**Always ask first**, even inside a requested feature:
- Deleting real data, touching production (the live domain, production deploys or production settings), emailing or messaging anyone other than Clay, spending money, rotating secrets, editing identity strings, or starting a feature Clay has not asked for.
- Writing anything into a business repo, including the first-skill test. Clay names the business repo first (still open on 2026-10-05, see 2.16).
- Anything that reaches a live ad account, even a read, until that business has recorded authority in its `ads/authority.md`.
- Vendoring or copying outside code or text into the hub. Clay decided on 2026-10-05 to rewrite from the reviews instead.
- Adding a dependency on another hub, Marketing-Hub included (2.15).
- Reopening a settled decision in 2.16.

Never allowed: anything touching another business's data (doctrine 9). Also never allowed here: storing any business's facts, results, learnings or credentials in this repo (README hard rule 6), and storing raw transcripts or course files (2.16, decision 12).

The project `.claude/settings.json` lets Supabase and Vercel tools run without prompts, except irreversible or costly ones (purchases, domains, promotions, rollbacks, protection and firewall changes, project pause or creation, database branches). None of this relaxes Section 1 or confirming the target before infrastructure work (doctrine 14).

### 2.12 Bootstrap capability checklist

Run this at session start, before real work. Report anything on this list you cannot do (doctrine 15).

1. **Handoff read.** Read `HANDOFF.md`, both blocks. Apply doctrine item 12.
2. **Operator identified.** Resolve per 2.3.
3. **Git identity set.** `git config user.name` returns `lowkeycm`.
4. **Branch created.** On a `clay/...` branch, not `main`.
5. **Other branches checked.** `git branch -r --sort=-committerdate | head`.
6. **Full working tree present.** Some environments hand you a sparse checkout. If folders are missing, run `git sparse-checkout disable` before concluding anything.
7. **Dependencies installed.**
8. **Build gate runnable.** The commands in 2.6 complete.
9. **Browser rendering available.** Can you load a page and take a screenshot? Test it, do not infer it from the platform name.
10. **Live site reachable.** Separate from rendering; test it on its own.
11. **Database reachable.** Most sessions do not need it. Say so if a task depends on it.
12. **GitHub reachable.** Can you push and open a PR? Retry once on a proxy 407.

If items 8, 9, or 10 fail, you can still do useful work. You cannot describe that work as verified.

Notes for this repo:

- Item 7: there are no dependencies to install; Node 20 or later is enough.
- Item 8: run `npm test` (2.6).
- Item 10: there is no live site. Test instead whether you can reach the primary sources the build depends on: Meta's developer documentation, and Meta's Ad Library in a real browser.
- Item 11: there is no database.
- One extra item: is a Marketing-Hub checkout present? Needed only for the install piece, and only as a structural model (2.15).

### 2.13 Repo map

```
ad-hub/
├── AGENTS.md            this file: doctrine, project specifics, build decisions (2.16)
├── CLAUDE.md            one line pointing here
├── HANDOFF.md           current state and the last session; read it first
├── README.md            authority map: layout, task lookup, decision owners, hard rules
├── BUILD-PLAN.md        the build queue with a brief per skill; this repo's roadmap
├── PROVENANCE.md        where each outside source came from and its rights status
├── package.json         names the test command only; no dependencies
├── people/clay.md       operator profile
├── .claude/             Claude Code settings and the session-start hook
├── core/
│   ├── _system/         CONVENTIONS.md, memory-contract.md, spend-authority.md (drafts), schemas/, scripts/ (helper scripts and their tests)
│   ├── skills/          one folder per skill; only ad-strategy/references/plays.md exists
│   └── automations/     README.md only; routines not built
├── meta-system/         Meta layer: README.md plus dated references/ (platform-tools, result-signals)
├── install/             README.md only; pointer generator not built
└── source-notes/        written reviews of outside sources, conflicts.md, index in README.md
```

### 2.14 Gotchas

- 2026-10-05: The repo was created with a `CLAUDE.MD` file (upper-case extension). It was replaced by `CLAUDE.md`. Do not re-add the upper-case name: on Mac and Windows the two names are the same file and the checkout breaks.
- 2026-10-05: The starter arrived with its own `AGENTS.md`, a build handoff. Its content now lives in 2.16 (decisions, how to build, owner answers) and in `HANDOFF.md` (current state). Where `README.md` calls AGENTS.md the handoff, it means this file.
- 2026-10-05: The clay-config hook template refreshes Marketing-Hub pointers. That block was removed from `.claude/hooks/session-start.sh` here on purpose (2.15). Do not restore it when syncing the hook with the template.
- 2026-10-05: Plain web requests to Meta's Ad Library get a bot challenge instead of the page. Competitor research that depends on it needs a real browser; see the capability notes in `HANDOFF.md` for whether the platform has one that works.

### 2.15 Marketing work and Marketing-Hub

Kept, and adapted to an owner decision. Ad-Hub is itself a capability hub for one part of marketing, paid ads. It is a sibling of Marketing-Hub, not a client of it.

- **Owner decision** (starter decision 1, restated by Clay on 2026-10-05): Ad-Hub is self-contained. Marketing-Hub (`github.com/lowkeycm/Marketing-Hub`) is its structural model only: authority map, shared system layer, one skill pattern, dated facts, source reviews, provenance, regression cases, and the `install/` pointer generator. Do not copy Marketing-Hub content into this repo, and do not make any Ad-Hub skill read, call or require Marketing-Hub.
- **So no `hub-` pointers are installed in this repo**, and its session hook does not generate them. That is deliberate, not a missed setup step. The usual rule, Marketing-Hub as the canonical marketing method, governs business repos, not this hub's own skills.
- **In a business repo**, ad work goes through Ad-Hub's own pointers, prefixed `adhub-` (Clay, 2026-10-05), so they never collide with Marketing-Hub's `hub-` pointers. Non-ad marketing work (website, SEO, email, social, brand) stays with Marketing-Hub in that business repo.
- **Who owns ad work in a business repo with both hubs** (Clay, 2026-10-06): ultimately Marketing-Hub. Marketing-Hub also has `paid-ads`, `start-here`, `audience-research`, `competitive-intel` and `performance-review` skills. Reconcile the two once Ad-Hub works on its own; until then build Ad-Hub independently and do not design around the merge. In a business repo that has both before then, say which one you used and why.
- **Access on 2026-10-05:** reachable from Claude Code (remote), checked out beside this repo at `../marketing-hub` (lower case), revision `911e979` (2026-10-03). `PROVENANCE.md` records the starter as modelled on revision `05fe2d34` (2026-10-01).
- Marketing-Hub is reference material. Do not modify it from an Ad-Hub session unless Clay explicitly asks.

### 2.16 Build decisions and owner answers

Carried over word for word from the starter's handoff, written 2026-10-03 at the end of a planning conversation no agent can see. Current state moved to `HANDOFF.md`.

**Decisions already made.** Treat these as settled unless the owner reopens them.

1. **Self-contained.** Ad-Hub does not depend on any other hub. The owner's
   Marketing-Hub repo was used only as the structural model: authority map, shared
   system layer, one skill pattern, thin layers over a chassis, few hard rules, dated
   facts with an expiry, a single writer for learnings, written source reviews, a
   provenance record, regression cases.
2. **Universal.** The hub holds capability. Each business repo holds its own context and
   records. Funnel type and result source are set per offer, not per business.
3. **Core plus platform layers.** Core decides. A platform layer carries the decision
   out on one platform and holds that platform's dated facts. Meta first.
4. **Skeleton approved.** The layout in the README, with placeholder skill names.
5. **Specifics are kept.** Named tactics from sources go into the plays library as dated
   claims to test. Do not sand them down into generic advice, and do not drop them
   because they may expire. Expiry is handled by the refresh, not by omission.
6. **Results stay with the business.** The hub never records how a play performed for a
   business. That goes in the business repo through `ad-review`.
7. **Two skills touch live accounts.** `ad-launch` and `ad-manage`. Both check spend
   authority first and log every change.
8. **Watch daily, act on a schedule.** Daily runs look for emergencies only. Changes are
   made in one batch on a schedule set by each offer's conversion volume. An automated
   optimiser that acts daily would automate over-tinkering.
9. **One deciding metric.** ROAS where value is tracked, otherwise cost per result.
   Every other metric explains why; none of them decides.
10. **Result loop.** Each offer sends its real result back to the platform from wherever
    that result is recorded: checkout, CRM status, booking tool or point of sale.
11. **Truth rule.** Claims, testimonials, stories, numbers and scarcity must be real and
    traceable to the business's proof. AI-made people are never presented as customers.
12. **Sources stay outside.** Reviews are written in our own words. Raw transcripts and
    course files are not stored in this repo.
13. **Build order.** Finish `_system`, then build skills one at a time in the order the
    work flows. Test each skill against one business repo before writing the next.

**How the owner works on this build.** From the planning conversation; `people/clay.md` covers the rest.

- Plain language. Short explanations.
- The quickest path to the next usable step beats a complete design.
- Ask when scope is unclear. State your understanding and get it confirmed before
  building in a direction. Two wrong turns in planning both came from building on an
  unverified reading of a request.
- He reviews structure before content.
- He wants real swings and testing, not safe generic rules. Be critical of sources, and
  keep unconventional ideas that have a plausible reason to work.
- No disclaimers or caveat padding.

**How to build.**

- Follow [CONVENTIONS.md](core/_system/CONVENTIONS.md). Skills are floors, not ceilings.
- Draw on `source-notes/` and the plays library; do not treat either as doctrine.
- Verify platform facts against primary sources at build time. The files in
  `meta-system/references/` carry a last-verified date and a refresh instruction.
- Keep the hub brand-neutral. Example businesses in tests are synthetic.
- When a design choice is not covered here, propose it briefly and ask.

**Owner answers to the starter's open questions** (Clay, 2026-10-05).

| # | Question | Answer |
| --- | --- | --- |
| 1 | The `ads/` folder layout and the ad ID format in the memory contract | Approved as written. `core/_system/memory-contract.md` still calls them proposals; updating that wording is the first Stage 1 piece. |
| 2 | Whether fixed file names are required for existing business context | None required. Read existing business context by meaning, wherever it sits. |
| 3 | Which business repo tests the first skill | Open. The repo name was left blank in the 2026-10-05 message. Ask Clay before the first skill test. |
| 4 | Pin parts of the MIT-licensed Meta kit, or rewrite from the review | Rewrite what is needed from `source-notes/meta-ads-kit-review.md`. Do not vendor it. |
| 5 | Prefix for pointer skills generated into business repos | `adhub-` |

The Marketing-Hub location was also left blank in that message; 2.15 uses the address recorded in `PROVENANCE.md`.

**To verify during the build.**

- Which steps Meta's connector and command-line tool can perform, and which exist only
  in Ads Manager: the creative testing feature, automated rules, value rules,
  attribution settings, the local "reach more people" expansion, creative enhancements.
- The current requirements for sending results back to Meta
  ([result-signals.md](meta-system/references/result-signals.md)).
- Any creator claim before it is written as a default.
