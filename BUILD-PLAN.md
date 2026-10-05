# Build plan

Order: finish the system layer, then one skill at a time in the order the work flows.
Each skill is tested against one business repo before the next is written. A skill is
done when it meets the conventions, its acceptance check passes with a fresh agent, and
the README table matches what was built.

## Stage 1: finish the system layer

- Confirm the `ads/` layout and ad ID format with the owner (see AGENTS.md).
- Schemas for the files other skills depend on: offer file, authority file, ledger row,
  change-log entry.
- Helper scripts: context loader (resolves the business repo and loads only what a skill
  declares), freshness checker for dated reference files, router for the task lookup.
- Regression cases with synthetic businesses, one per acceptance case in the README.
- Install mechanism: a pointer generator and session hook so every hub skill appears in
  a business repo without copying anything (see `install/README.md`).

## Stage 2: skills, in flow order

Each brief lists the job, what the skill owns, and which source reviews feed it.
"BH" is the Ben Heath course review; "DD" is a Dara Denney review.

### 1. start-here
Job: unclear or multi-step requests; adding a business or an offer; checking what
context exists and what is missing, without forcing a workshop.
Owns: recording supplied facts into `offers/<offer>.md`, `authority.md`, `calendar.md`.
Must capture per offer: funnel type, result source, average order value, margin, repeat
purchases, lead-to-customer rate, capacity limits, restricted category.
Feeds from: BH modules 06, 08, 09; `meta-system/references/result-signals.md`.
Acceptance: a new business with one sentence of context gets a useful draft path and a
short list of the facts that block going live.

### 2. audience-research
Job: who buys and what they say, with sources.
Owns: `research/audience.md`, `research/voc.md`.
Method to carry: retrace a buyer's own research; mine reviews, comments on the
business's own ads, forums and video comments; rank customer types by how often and how
strongly they show up; pick sources by business type (a local business leans on reviews
and its own customer conversations).
Feeds from: DD creative-strategy and creator-ads reviews; the Cody Schneider review.
Acceptance: every claim in the audience file traces to a quoted, sourced line.

### 3. competitor-ads
Job: what others run and what can be learned from it.
Owns: `research/competitors.md`, `research/swipe/`.
Method to carry: long-running, high-impression ads as the signal; launch pace, ad
lifespan, format mix, message themes, offers, landing pages; look at businesses a few
steps ahead and at adjacent industries; say plainly when a video was not actually seen.
Feeds from: BH module 13; DD claude-workflows review; both second-creator reviews.
Acceptance: output separates what was observed from what is inferred, and never claims
a competitor ad is profitable.

### 4. ad-strategy
Job: decide what to make and how it is tested.
Owns: `strategy/diagnosis.md`, `strategy/test-plan.md`, the ledger's IDs and tags, and
the hub's plays library (scout mode refreshes it).
Method to carry: a one or two sentence diagnosis; gap checks across customer type,
awareness, format, style and message; an offer check before any creative; play
selection inside the risk budget; test share, batch size and cadence worked out from
how long this offer takes to give a confident answer; an audit that classifies live ads.
Feeds from: DD creator-ads and creative-strategy reviews; BH modules 06, 07, 11, 19;
the Claude-MCP-update review; `references/plays.md`.
Acceptance: every planned ad has an ID, tags and a stated reason it is being tested.

### 5. ad-creative
Job: copy and finished ads per placement, checked before handoff.
Owns: `creative/<batch>/`.
Modes: static, video, carousel, copy only, remix (new hooks on a proven body), policy
and claims check.
Gate: understood at a glance; one job per focused ad; hook judged as text, sound and
first frame together; proof real; correct shapes for each placement; the actual render
inspected. Production tools are whatever the operator has connected, never hard-coded.
Feeds from: DD static-ads and hooks reviews; BH modules 12, 14, 15, 16; the Meta kit
review (copy skill).
Acceptance: a finished ad is a produced, inspected asset with its copy, not a brief.

### 6. ad-setup
Job: make the account able to measure the real result, and prepare the structure.
Owns: `platform/<platform>.md`.
Method to carry: tracking in browser and server, verified; result signal path chosen
from the offer's funnel type; conversion location as a tested choice; one campaign and
one ad set per offer by default; location exactly where the business can serve;
restricted category declared; settings baseline recorded.
Feeds from: BH modules 02 to 05, 10, 20; the Meta kit review (tracking reference);
`meta-system/references/`.
Acceptance: a test event for the offer's real result is seen arriving on the platform.

### 7. ad-launch
Job: put approved ads live.
Owns: ledger status changes and their change-log entries.
Method to carry: validate, create paused, name by ad ID with tracking parameters, show
a preview, record approval, activate; introduce new batches through the platform's
testing feature where one exists; keep the safe-to-risky mix.
Feeds from: `core/_system/spend-authority.md`; BH lessons 19.3, 24.5, 24.6;
`meta-system/references/platform-tools.md`.
Acceptance: nothing is activated without an approval record; a dry run produces the
exact change list.

### 8. ad-manage
Job: keep spend safe and performance improving without over-tinkering.
Owns: `changes/`.
Method to carry: daily watch for emergencies only; a scheduled session that makes all
changes in one batch; a rulebook per offer built from its break-even numbers; a
confidence bar before calling winners or losers; fatigue check; scale up and down
inside a band; rollback to last known good; a fixed troubleshooting order.
Feeds from: BH modules 09, 17, 18, 24, 25; the Claude-MCP-update review (kill rule as an
option); the Meta kit review (safety model, daily questions).
Acceptance: given the same data on consecutive days with no schedule slot, it changes
nothing and says why.

### 9. ad-review
Job: say what the results mean and write what was learned.
Owns: `results/`, `learnings.md` (sole writer).
Method to carry: read by ad ID from the platform and from the offer's result source;
judge on the deciding metric with honest handling of small numbers; diagnose with hook
rate, link click rate and landing views; roll results up by tag; weekly creative
report and hit rate; hand "do more, do less, experiment" to strategy; note outside
events before blaming a change.
Feeds from: BH modules 17, 20, 23, 25; DD claude-workflows review.
Acceptance: no learning is written without a sample size and a source.

## Stage 3: the Meta layer

A thin skill plus dated references: tool how-to for the connector and command-line
tool, placement specs, policy notes, operating defaults, result-signal routes. Built
alongside the first core skill that needs each piece.

## Stage 4: automations

Daily watch; preparation for the scheduled action session; weekly creative report;
monthly plays refresh with a freshness check on every dated reference. Routines ask no
questions and never spend, publish or change an account outside spend authority.
