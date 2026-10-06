# Schema: offer file

File in the business repo: `ads/offers/<offer>.md`, one per offer. The business owns the
facts; `start-here` records what the business supplies and nothing else. Rules behind
it: [memory-contract.md](../memory-contract.md), "Offer file" and "Funnel types".

**How to read the markers.** Nothing here blocks drafting. A sentence and a goal is
enough to start. Fields marked **[live]** must be filled, and Owner-confirmed, before
any ad for this offer goes live ([spend-authority.md](../spend-authority.md), "Gates
before anything goes live"). Fields marked **[scale]** must be filled before budget is
raised with confidence; until then they are reported as gaps. Unmarked fields improve
the work and never gate it.

**Status labels.** Every fact carries one: `Owner-confirmed` (the business said it),
`Observed` (seen in a source, which is named), or `Proposed` (an inference to check).
Unknown stays `unknown`. It is never filled with a guess.

## Template

```markdown
---
offer: <slug>                 # lowercase letters, digits and hyphens; used in every ad ID
updated: YYYY-MM-DD
updated-by: start-here        # or "business"
---

# <Offer name>

## What is sold
- What it is: ...                                  (status)
- Who it is for: ...                               (status)
- Where the ad sends people: <url or place>        (status)   [live]

## Result loop
- Funnel type: direct online sale | lead, then sale | direct booking | in-person sale   [live]
- Result source: <the system where the real result is recorded>                         [live]
- Result that counts: <the event or status, in plain words>                             [live]
- Signal sent to the platform: <the event the platform learns from; may be earlier than the result that counts>
- Deciding metric: ROAS | cost per result | cost per qualified lead, then revenue        [live]

## Numbers
- Average order value, or first transaction value: ...    (status)   [scale]
- Gross margin: ...%                                       (status)   [scale]
- Repeat purchases: <how often, over what period, or none> (status)
- Lead-to-customer rate: ...% (lead funnels only)          (status)   [scale]
- Break-even cost per result: ... (worked out below)                  [scale]
  - Working: <show the arithmetic and which numbers it used>

## Limits
- Capacity or stock limit: <what slows or stops spend, or none>   (status)
- Restricted ad category: <category, or none>                     (status)   [live]

## Proof the ads may use
| Proof | Kind (review, result, credential, number, story) | Where it comes from | Status |
| --- | --- | --- | --- |

## Gaps
- <missing fact> blocks <drafting nothing | going live | confident scaling>
```

## Notes

- **Break-even, default working.** Direct sale: first order value times gross margin,
  plus repeat value only if the business confirms repeat purchases. Lead funnel: that
  same value times the lead-to-customer rate. Show the working so a wrong input is easy
  to spot. A business may set its own target instead; record it as Owner-confirmed.
- **Restricted category** names the kind of offer in plain words (housing, employment,
  credit, financial products, social issues and the like). The platform layer maps it
  to the platform's own category and rules. Core files never carry platform settings.
- **Proof** is the only source of claims. A claim an ad makes that is not in this table
  does not go live (README hard rule 4).
- A test of the result arriving on the platform is recorded by `ad-setup` in
  `ads/platform/<platform>.md`, not here.
