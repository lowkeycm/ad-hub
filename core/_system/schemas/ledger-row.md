# Schema: ledger row

File in the business repo: `ads/ledger.md`, one table, one row per ad. The ad ID is the
thread from idea to result. Rules behind it: [memory-contract.md](../memory-contract.md),
"The ad ID thread" and "Ledger tags".

## Ad ID

Format (approved 2026-10-05): `<offer>-<yymm>-<nnn>`, with `-v2`, `-v3` for revisions.
Example: `song-2610-007`.

- `<offer>` is the offer slug from `ads/offers/<offer>.md`.
- `<yymm>` is the month the ad was planned.
- `<nnn>` counts up per offer and is never reused, even for a retired ad.
- Read an ID from the right: the last parts are the revision, then `nnn`, then `yymm`;
  everything before is the offer slug, which may contain hyphens.
- `ad-strategy` creates IDs. Nobody renames one. A changed ad gets a revision suffix
  or a new ID, never an edited one.

## Row

```markdown
| ID | Offer | Batch | Status | Plays | Customer type | Awareness | Format | Style | Breadth | Origin | Risk | Why it is tested | Updated |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| song-2610-007 | song | 2610-a | planned | hook-day-without | gift giver | problem-aware | video | founder-led | focused | a play | bold | Tests whether a changed-state opening beats the current proof-led opening for gift givers | 2026-10-06 |
```

The example is illustrative, not a real ad.

| Column | Values |
| --- | --- |
| Batch | `<yymm>-<letter>`; the folder in `ads/creative/<batch>/` |
| Status | planned, copy-ready, creative-ready, approved, live, paused, retired |
| Plays | slugs from the hub plays library, comma separated, or none |
| Customer type | a name from `ads/research/audience.md` |
| Awareness | unaware, problem-aware, solution-aware, product-aware, most aware |
| Format | image, video, carousel |
| Style | for example UGC, founder-led, demonstration, testimonial, animated |
| Breadth | focused (one customer type, one job) or broad |
| Origin | research-driven, modelled on a competitor, a play, a remix of an own winner |
| Risk | safe or bold |
| Why it is tested | one sentence: what this ad tests that the others do not |
| Updated | date of the last change to this row |

## Who writes which column

The memory contract gives IDs and tags to `ad-strategy` and status to `ad-launch` and
`ad-manage`, but it does not say who moves an ad through the earlier statuses. Proposed,
pending owner confirmation:

| Status change | Writer |
| --- | --- |
| row created as planned, all tags, "why it is tested" | `ad-strategy` |
| planned to copy-ready to creative-ready | `ad-creative` |
| creative-ready to approved | `ad-launch`, only when the approval is in `ads/authority.md` |
| approved to live, live to paused, paused to live | `ad-launch`, `ad-manage` |
| any status to retired | `ad-manage`, or `ad-strategy` for an ad that never went live |

Each skill touches only its own columns and transitions. A status change made on a live
account always has a matching entry in `ads/changes/`.
