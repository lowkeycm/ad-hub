# Ad-Hub

Ad-Hub is a self-contained hub for developing and managing paid ads: research, strategy,
creative, account setup, launch, management and review. It holds capability, never
business facts. Any business repo can plug into it; the business repo supplies the
context and keeps the records. The core is platform-neutral. Meta is the first platform
layer; later platforms follow the same shape.

**Status (2026-10-03): starter skeleton.** The system layer, source reviews and plays
library are drafted. No skill is built yet. [BUILD-PLAN.md](BUILD-PLAN.md) is the build
queue; [AGENTS.md](AGENTS.md) holds the working rules and the build decisions;
[HANDOFF.md](HANDOFF.md) holds the current state and the last session.

For agents maintaining or using this repository, this page is the authority map. Read the
[conventions](core/_system/CONVENTIONS.md) before writing a skill, the
[memory contract](core/_system/memory-contract.md) before touching a business repo, and
[spend authority](core/_system/spend-authority.md) before anything that reaches a live
ad account.

## Layout

```
Ad-Hub/
├── README.md            authority map (this page)
├── AGENTS.md            working rules for every agent, build decisions, owner answers
├── CLAUDE.md            points Claude Code at AGENTS.md
├── HANDOFF.md           current state and the last session; read it first
├── BUILD-PLAN.md        build queue with a brief per skill
├── PROVENANCE.md        where outside material came from
├── people/              operator profile
├── install/             plug-in mechanism for business repos (to build)
├── source-notes/        written reviews of outside sources, in our own words
├── core/                the chassis, platform-neutral
│   ├── _system/         conventions, memory contract, spend authority, schemas
│   ├── skills/          one folder per skill (to build)
│   └── automations/     scheduled routines (to build)
└── meta-system/         thin Meta layer: dated platform facts and tool how-to
```

## Task lookup

Skill names are placeholders until each is built.

| Job | Start with |
|---|---|
| Unclear or multi-step request; adding a business or an offer | `start-here` |
| Who buys, and what they say in their own words | `audience-research` |
| What competitors are running | `competitor-ads` |
| What to make and test next; gaps, angles, plays, test plan | `ad-strategy` |
| Copy and finished ads; policy and claims check | `ad-creative` |
| Account, tracking, result signal, campaign structure | `ad-setup` |
| Putting approved ads live | `ad-launch` |
| Monitoring, pausing, replacing, budget moves | `ad-manage` |
| What the results mean; learnings | `ad-review` |

Load only the skill and references the job needs.

## How the work flows

Research feeds strategy. Strategy decides what to make and how it will be tested.
Creative produces it. Setup makes sure the account can measure the real result. Launch
puts approved ads live. Management watches daily and acts on a schedule. Review reads
the results and writes what was learned, which strategy uses next time.

This is a dependency, not a waterfall. A single ad can be drafted from one sentence of
context. Missing files never block drafting. Going live is different: it needs the
gates in [spend authority](core/_system/spend-authority.md).

## Decision ownership

One owner per decision, one home per record. Paths are inside the business repo's `ads/`
folder unless marked as a hub file. The full contract is in
[memory-contract.md](core/_system/memory-contract.md).

| Decision | Owner | Home |
|---|---|---|
| Offer facts, funnel type, result source, business numbers | The business; `start-here` records what is supplied | `offers/<offer>.md` |
| Spend ceilings, approvals, what may run unattended | The business | `authority.md` |
| Promo calendar, seasonality, outside events | The business; `ad-review` appends observed events | `calendar.md` |
| Who buys, in their own words | `audience-research` | `research/audience.md`, `research/voc.md` |
| What competitors run | `competitor-ads` | `research/competitors.md`, `research/swipe/` |
| Diagnosis, gaps, angles, plays to test, test plan and cadence | `ad-strategy` | `strategy/diagnosis.md`, `strategy/test-plan.md` |
| Ad IDs and tags | `ad-strategy` creates them; nobody renames them | `ledger.md` |
| Copy, finished media, policy and claims check | `ad-creative` | `creative/<batch>/` |
| Account, tracking, result signal, campaign structure | `ad-setup` | `platform/<platform>.md` |
| Putting approved ads live | `ad-launch` | ledger status, `changes/` |
| Pause, replace, budget moves, emergency stop | `ad-manage` | `changes/` |
| What the results mean; durable learnings | `ad-review` (sole writer) | `results/`, `learnings.md` |
| Plays library and its refresh | `ad-strategy` | hub: `core/skills/ad-strategy/references/plays.md` |
| Platform facts, specs, policies, tool how-to | platform layer | hub: `meta-system/references/` |

## Core and platform layers

Core skills make the decisions. A platform layer knows how to carry them out on one
platform and holds that platform's dated facts. Core files never contain click paths,
setting names or specs; those change and belong in the platform layer with an expiry
date. Adding a platform means adding a layer, not editing the core.

## Hard rules

Few, and not negotiable. Everything else in this hub is a default an agent may improve
on, saying why in one line.

1. Nothing reaches a live ad account without recorded authority from the business.
2. Every new campaign, ad set and ad is validated first and created paused.
3. Every live change is logged with what changed, why, and how to undo it.
4. No invented claims, testimonials, results, stories or scarcity.
5. One writer per file. Only `ad-review` writes learnings.
6. Business facts and results never live in this hub.

## Plays and source material

Specific tactics are kept, not flattened into timeless rules. Each one lives in the
[plays library](core/skills/ad-strategy/references/plays.md) as a creator's claim with a
source and a date. A play becomes a finding for one business only when that business's
own results say so, and that finding is written in the business repo. The library is
refreshed on a schedule.

Outside material is reviewed in [source-notes/](source-notes/) before anything is
adopted. A source review is not doctrine. Where sources disagree, the hub tags the
difference and lets results decide; see [conflicts](source-notes/conflicts.md).

## Acceptance cases

Architecture walkthroughs used to test that the hub stays universal. They are not
client facts.

| Case | What it exercises |
|---|---|
| Digital product, direct online sale | Result is the purchase itself, sent with its value at checkout; decided on ROAS; no lead stages |
| Local service, lead then sale | Result is a status reached later in a CRM or booking tool; low volume, so slow cadence and patience rules matter most |
| Real estate brokerage | Restricted ad category; long sales cycle, so the signal sent back is an early positive status, with later ones kept for review |
| Consultancy, very low volume | Never reaches platform learning thresholds; trust-building distribution plays; decisions on thin data |
| New business, almost no context | A sentence and a goal is enough to draft; unknown proof stays unknown; nothing goes live until the gates are met |
