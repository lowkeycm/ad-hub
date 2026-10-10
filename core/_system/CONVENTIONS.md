# Ad-Hub authoring conventions (draft)

Every skill in this hub follows this page. The root `README.md` defines authority and
boundaries; this page defines how a skill is written.

## 0. Floors, not ceilings

A skill is the worst output an agent should ever produce, never a cap on what it may
think of. Two classes of rule, kept apart in the wording:

- **Hard rules (few).** Truth of claims, data-quality labels, write ownership, spend
  authority, validate-and-pause before anything goes live, a log for every live change.
  MUST and never are reserved for these.
- **Defaults (everything else).** Methods, sequences, thresholds, cadences. Written as
  "default" or "start here". An agent may take a better path and says why in one line.
  Deviating silently is the only wrong way to deviate.

If more than a handful of a skill's rules are hard, the skill is over-strict. Recut it.

## 1. What a skill carries

Judgment, not steps. Keep what a model cannot infer: when to apply a method, when to
leave it, what good and mediocre look like, which trade-off governs the choice. Cut
procedure any capable agent would follow anyway.

- Plain, confident, operator to operator. No hype, no filler.
- State each rule once.
- Never fabricate performance numbers in examples. Mark illustrative numbers as such.
- Perishable facts never go in a `SKILL.md` body (see section 6).
- Core skills never name a platform's buttons, settings or specs. Those live in the
  platform layer.

## 2. Structure and size

```
skills/<skill-name>/
├── SKILL.md       decision layer, 500 lines at most
├── references/    knowledge loaded on demand; each file says when to load it
└── scripts/       optional helpers
```

Prefer a mode inside an existing skill over a new skill. A new skill is justified when
it owns a different decision or a different file.

## 3. Frontmatter

```yaml
---
name: skill-name
description: <what it does, then when to use it. Key use first.>
when_to_use: <phrases a person would actually type>
metadata:
  adhub:
    version: 0.1.0
    layer: research | strategy | creative | operations | review
    reads: [<files in the business repo's ads/ folder; use file#section for parts>]
    writes: [<files this skill owns>]
    live: none | prepare | act     # whether it can reach a live ad account
---
```

`reads` and `writes` are the contract. A skill writes only what it owns. `live: act` is
allowed for `ad-launch` and `ad-manage` only. `node core/_system/scripts/route.mjs --check`
enforces these rules and is part of the build gate.

## 4. Skeleton of a SKILL.md

Mission in two or three sentences (the job, what done means, the judgment it carries).
Context (one block: how to load business context, and what to do when it is missing).
Modes, if more than one. The method. A quality gate. Output (what is written where).
What's next (two to four next skills with reasons).

## 5. Evidence and research

- Research by evidence need. Return facts, verbatim quotes, links and limits.
- Label data once per deliverable: `Data: LIVE (n sources)` or
  `Data: MODEL KNOWLEDGE (verify before spending)`. Estimates carry `~`.
- Keep three statuses apart everywhere: **Observed** (what a source says or does),
  **Owner-confirmed** (a fact or direction the business owner stated), **Proposed** (an
  inference or recommendation). A proposal never becomes a fact by repetition.
- Data boundary: a skill reads the current business repo, the public web, and that
  business's own connected ad account when authority allows. Nothing else. Nothing
  from one business is ever written into another business's files or into the hub.
- Research budgets are finite. When one is hit, write with what there is and say so.

## 6. Freshness

Dated facts live in reference files with this header in the first lines:

`last-verified: YYYY-MM-DD · ttl-days: N · refresh: <exact instruction>`

At use time, if today is past last-verified plus ttl, refresh first and say so in one
line. `node core/_system/scripts/freshness.mjs` reports every dated file's state. Platform facts are verified against the platform's own documentation or tools,
not against a creator's video.

## 7. Plays

A play is a specific, named tactic from a source. Plays live in
`skills/ad-strategy/references/plays.md`, each with a source and a date.

- Every play is **Observed**: a creator's claim. It is a candidate to test, not a rule.
- Do not generalise a play into vague advice, and do not drop one because it may
  expire. The refresh handles expiry.
- The hub never records how a play performed for a business. That is written in the
  business repo by `ad-review` and read back by `ad-strategy` for that business only.
- Plays that conflict stay in the library side by side. The ledger tags let results
  settle the question per business.

## 8. Quality gates

Generation never ends at "here you go".

- Copy and concepts: score against the skill's rubric with calibrated anchors, revise
  the weak part, rescore. Three passes at most, then present the best with its history.
- Finished creative: inspect the actual render at the size it will be seen. A brief is
  not an ad. An unchecked asset is not a finished one.
- Numbers: re-check any figure taken from an account before reporting it.
- Cite the business's own learnings when they shaped the output.

## 9. Output

Files first: write the deliverable into the business repo, then summarise in chat. End
with the files saved and two to four next steps.

Quick mode: a specific single-asset request gets the asset, not a scan or a workshop.
Quick mode never waives a hard rule.

## 10. Outside sources

Nothing is adopted from an outside source without a written review in `source-notes/`:
why it was reviewed, what is worth retaining, what not to import as doctrine, where it
conflicts with other sources, and where it lands. Reviews are in our own words. Raw
transcripts, course files and vendor text are not stored here. Anything vendored is
pinned to a revision with its licence, and recorded in `PROVENANCE.md`.

## 11. Tests

Regression cases use synthetic businesses. Run each in a fresh agent given only the hub
path, a client folder and the request. Judge the artifacts before reading their
self-scores. A passing case is not proof of performance.
