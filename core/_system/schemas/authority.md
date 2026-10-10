# Schema: spend authority file

File in the business repo: `ads/authority.md`, one per business. **The business writes
it.** `start-here` may record a decision the business states explicitly in the session,
with the date and who said it; it never fills a field by inference. Rules behind it:
[spend-authority.md](../spend-authority.md).

**No file means read-only.** A missing field means the safest reading: no level means
level 0, no ceiling means nothing may spend, no band means no budget moves.

## Template

```markdown
---
business: <name as the business writes it>
updated: YYYY-MM-DD
---

# Spend authority

## Who can approve
| Person or role | Can approve | Since |
| --- | --- | --- |
| ... | everything / launches only / budget moves only | YYYY-MM-DD |

## Per offer
| Offer | Level (0 read, 1 prepare, 2 operate) | Daily ceiling | Monthly ceiling | Since |
| --- | --- | --- | --- | --- |

## Pre-approved at level 2
Tick only what the business agrees may happen on schedule without a fresh approval.
- [ ] Activate ads the business already approved, inside an existing ad set
- [ ] Pause ads under the offer's rulebook
- [ ] Budget moves inside the band below
- [ ] Emergency stop (pause at once and report)

## Budget band, per offer
| Offer | Step size | Scale up while metric is better than | Scale down when worse than | Floor | Ceiling | Lookback |
| --- | --- | --- | --- | --- | --- | --- |

## Risk budget, per offer
| Offer | Testing share of spend | Safe-to-bold mix in a batch |
| --- | --- | --- |

## Second lock on the platform
<Any limit set on the platform itself on what an agent may change, or "none set".>

## Approvals log
Append only. One line per approval.
- YYYY-MM-DD, <who>, approved <what exactly>, for <offer or ad IDs>
```

## Notes

- The list of actions that always need a fresh approval, at any level, is fixed in
  [spend-authority.md](../spend-authority.md). It is not a setting here and this file
  cannot waive it.
- Ceilings are money amounts in the account's currency. Only the business raises one.
- Band thresholds come from the offer's break-even numbers in `ads/offers/<offer>.md`,
  never from a universal multiple.
- An approval for one ad, batch or move covers only that. "Go ahead" in chat is
  recorded here before `ad-launch` or `ad-manage` acts on it.
