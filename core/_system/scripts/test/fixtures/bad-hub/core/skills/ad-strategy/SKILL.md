---
name: ad-strategy
description: Decide what to make and test next for one offer.
when_to_use: what should we test, plan the next batch, which angle
metadata:
  adhub:
    version: 0.1.0
    layer: strategy
    reads: [offers/<offer>.md, research/audience.md#customer-types, research/voc.md, learnings.md, creative/<batch>/]
    writes:
      - strategy/diagnosis.md
      - strategy/test-plan.md
      - ledger.md#ids
    live: none
---

# ad-strategy (fixture)
