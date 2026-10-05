# Spend authority (draft)

This hub can reach live ad accounts. That is the one thing a content hub never does, so
this page exists. It applies to every platform layer.

## Hard rules

1. **Recorded authority.** No live action without authority recorded in the business
   repo's `ads/authority.md`. The absence of that file means read-only.
2. **Two skills only.** `ad-launch` and `ad-manage` may change a live account. Every
   other skill is read-only or prepares paused drafts.
3. **Validate, then pause.** Every create is validated first and created paused. A
   human-readable change list is produced before anything is sent.
4. **Log everything.** Every live change gets a change-log entry: when, what, the value
   before and after, the rule and evidence behind it, who or what authorised it, and
   how to undo it.
5. **Stay inside the ceilings.** A daily and monthly spend ceiling per offer is set by
   the business. Nothing raises a ceiling except the business.
6. **Never evade enforcement.** No workaround for a rejected ad, a restricted category
   or a disabled account.

## Authority levels

Set per business, and per offer where they differ.

| Level | What the hub may do |
|---|---|
| 0 Read | Read account data and report. |
| 1 Prepare | Level 0, plus create paused campaigns, ad sets and ads for review. |
| 2 Operate | Level 1, plus the pre-approved actions below, on schedule, inside the bands. |

Always needs a fresh approval, at any level:

- turning on anything that spends new money (a new campaign or ad set)
- raising a ceiling, or any budget move outside the agreed band
- changing the objective, the optimisation event, attribution or tracking
- anything in a restricted ad category
- deleting anything

Can be pre-approved at level 2:

- activating ads that the business has already approved, inside an existing ad set
- pausing ads under the offer's rulebook
- budget moves inside the agreed band
- the emergency stop

## Emergency stop

The daily watch may pause spend at once and report, without waiting for the schedule:

- spend running past the daily ceiling
- money being spent while the result signal has gone silent
- the destination page or checkout is down
- a wave of rejections or an account warning
- the business has signalled it is at capacity or out of stock

## Watch daily, act on a schedule

Default: the daily run reads and flags. Changes are made in one batch in a scheduled
session. The schedule is set per offer from how fast it produces results: daily for
high volume, every one to two weeks or monthly for low volume. Low-volume accounts need
more patience, not less.

Before a session acts on a comparison, it needs enough evidence. Default bar: about 90%
confidence that one ad is better than another on the deciding metric, or the same
direction across several independent periods. The most recent two to three days of
platform data are still settling and are not judged.

One type of account change per session. Killing weak ads and adding new ones is one
change. Do not also alter targeting, attribution or bidding in the same session.

## Budget bands

Thresholds come from the offer's own break-even numbers, never from a universal
multiple. Default shape, to be set per offer:

- scale up in small steps while the deciding metric is well inside break-even
- hold in the middle zone
- scale down when it is past a worse threshold
- a floor and a ceiling on both rules, and a short lookback window

Scale the existing campaign. Do not duplicate it to spend more.

## Risk budget

Testing takes risks on purpose, inside limits the business sets:

- **Testing share.** The share of spend given to new ads. Higher when results are poor,
  lower when they are strong.
- **Safe-to-risky mix.** Most ads in a batch should be near-certain approvals, a
  minority bold. This protects the account's approval record while unusual plays run.

## Gates before anything goes live

- The offer file names the result that counts and where it is recorded.
- A test of that result has been seen arriving on the platform.
- Every claim traces to the business's proof. Testimonials are real. AI-made people
  are not presented as customers. Urgency and scarcity are true.
- A restricted category is declared where one applies.
- The ad has an ID in the ledger and the platform name carries it.

## Rollback

Keep the last known good state: which ads were live, budgets and settings when results
were last healthy. When a change hurts, reverting is the first option, not a new fix.

## Platform advice

Treat a platform's own recommendations and assistant output as input to check. A
recommendation to spend more is not evidence that spending more is right for the
business. Where a platform lets the account owner limit what an agent can change, set
those limits as a second lock.
