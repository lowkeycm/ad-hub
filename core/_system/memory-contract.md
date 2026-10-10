# Memory contract (draft)

How Ad-Hub remembers. The hub holds no business facts. Everything about a business,
its offers, its accounts and its results lives in that business's own repo. The owner
approved the folder layout and the ad ID format below on 2026-10-05. The fill-in
templates for the files other skills depend on are in [schemas/](schemas/): offer file,
authority file, ledger row and change-log entry.

## Two kinds of context

**Business context** is whatever the business repo already holds about itself: who it
is, how it sounds, what it sells, its proof. Ad-Hub reads this from wherever it sits and
finds it by meaning. It never requires particular file names, and it never writes
there.

**The ad workspace** is one folder in the business repo that Ad-Hub owns: `ads/`.

## The ad workspace

```
ads/
  ads.yaml              manifest: offers, platforms in use, file dates
  authority.md          spend authority: levels, ceilings, approvals   (business-authored)
  calendar.md           promo calendar, seasonal pattern, outside events
  offers/
    <offer>.md          one per offer: see "Offer file"
  research/
    audience.md         customer types, awareness, objections, triggers
    voc.md              verbatim customer language with sources
    competitors.md      what competitors run
    swipe/              saved ad references
  strategy/
    diagnosis.md        current diagnosis and gaps
    test-plan.md        what is being tested, shares, cadence
  ledger.md             one row per ad: ID, offer, tags, status
  creative/<batch>/     briefs, copy and assets, named by ad ID
  platform/<platform>.md  account, tracking, signal path, settings baseline (no secrets)
  changes/              one entry per live change
  results/              snapshots and review reports
  learnings.md          append-only findings
```

## Who writes what

| File | Writer |
|---|---|
| `authority.md` | The business. `start-here` records explicit decisions only. |
| `offers/<offer>.md`, `calendar.md` | The business; `start-here` records what is supplied. `ad-review` may append observed outside events to the calendar. |
| `research/audience.md`, `research/voc.md` | `audience-research` |
| `research/competitors.md`, `research/swipe/` | `competitor-ads` |
| `strategy/*`, ledger IDs and tags | `ad-strategy` |
| `creative/<batch>/` | `ad-creative` |
| `platform/<platform>.md` | `ad-setup` |
| ledger status, `changes/` | `ad-launch`, `ad-manage` (earlier ledger statuses: see [schemas/ledger-row.md](schemas/ledger-row.md)) |
| `results/`, `learnings.md` | `ad-review` only |
| `ads.yaml` | whichever skill last wrote a file updates that file's entry |

A skill never writes a file it does not own. Profile-style files are versioned before
they are overwritten. `learnings.md` and `changes/` are append-only.

## Offer file

Funnel type and result source are set per offer, because one business can run several
kinds. An offer file holds:

- what is being sold, to whom, and where the ad sends people
- **funnel type** and **result source** (table below)
- the result that counts, and the deciding metric
- the numbers: average order value or first transaction value, gross margin, repeat
  purchases, lead-to-customer rate where there is one
- break-even cost per result, worked out from those numbers
- capacity or stock limits that should slow or stop spend
- any restricted ad category
- proof the ads may use, with where each item comes from

Missing numbers do not block drafting. They block confident scaling and are reported
as gaps.

## Funnel types and the result loop

Each offer has one place where the real result is recorded. That result is sent back to
the ad platform so it learns who to look for, and the same record is what `ad-review`
judges ads on.

| Funnel type | Result source | Signal sent to the platform | Deciding metric |
|---|---|---|---|
| Direct online sale | Checkout or payment platform | The purchase and its value, at the moment of sale | ROAS |
| Lead, then sale | CRM status | The earliest status that marks a real buyer and happens soon enough for the platform to use | Cost per qualified lead, then revenue |
| Direct booking | Scheduling tool | The confirmed booking | Cost per booking |
| In-person sale | Point of sale or invoice | The purchase, uploaded afterwards | ROAS |

Later statuses are still recorded and reviewed even when they arrive too late for the
platform to learn from. Platform-specific requirements live in the platform layer.

## The ad ID thread

One ID follows an ad from idea to result. `ad-strategy` creates it; nobody renames it.

Format (approved 2026-10-05): `<offer>-<yymm>-<nnn>`, with `-v2`, `-v3` for revisions.
Example: `song-2610-007`.

The same ID is the brief name, the asset file name, the ad's name on the platform, the
tracking parameter on its link, its ledger row and its row in every result snapshot.
Results that cannot be matched to an ID stay visible as unmatched; they are never
forced.

## Ledger tags

Tags live in the ledger, not in the ID. They are how results are rolled up.

| Tag | Values |
|---|---|
| plays | slugs from the plays library |
| customer type | from `research/audience.md` |
| awareness | unaware, problem-aware, solution-aware, product-aware, most aware |
| format | image, video, carousel |
| style | for example UGC, founder-led, demonstration, testimonial, animated |
| breadth | focused (one customer type, one job) or broad (covers many) |
| origin | research-driven, modelled on a competitor, a play, a remix of an own winner |
| risk | safe or bold |
| status | planned, copy-ready, creative-ready, approved, live, paused, retired |

## Reading

- Zero context works. A sentence and a goal is enough to draft; context improves the
  work, it never gates it. Going live has gates; see spend authority.
- Say what shaped the output in a line or two, so stale context gets caught.
- Flag files by age and name the skill that refreshes them. The context loader
  (`core/_system/scripts/context.mjs`) does this and loads only what a skill declares.
- Keep Observed, Owner-confirmed and Proposed apart in every file a skill reads alone.

## Learnings

Only `ad-review` writes them, from real results. One line each:

`- [date] [offer] finding (n=<sample>, source: <where the numbers came from>)`

Default bar for writing one: a clear difference on enough results to be confident, or
the same direction across several independent periods, or a prediction that was
plainly refuted. Below the bar, the observation stays in the report. Every skill that
generates anything reads the learnings for its offer and says which ones it applied.

## What never goes in a repo

Secrets and tokens. Account identifiers are fine; credentials live outside version
control. Raw personal data from customers stays in the system it came from.

## What never goes in the hub

Any business's facts, results or learnings. The hub is shared; a business repo is not.
