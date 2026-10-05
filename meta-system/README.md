# Meta layer

The thin layer that carries core decisions out on Meta (Facebook and Instagram ads).
It holds Meta's dated facts and tool how-to. It makes no strategic decisions; those
belong to the core skills.

**Status: references started, skill not built.** See `BUILD-PLAN.md`, stage 3.

## What this layer will own

- How to perform each core action through Meta's connector or command-line tool, and
  which actions must be handed to a person in Ads Manager.
- Placement shapes and specifications.
- Policy notes: restricted categories, personal attributes, before-and-after limits.
- Meta operating defaults drawn from the reviewed sources, each marked as a claim until
  checked.
- The routes for sending results back to Meta.

## References

| File | Holds | Load when |
|---|---|---|
| `references/platform-tools.md` | What Meta's official connector and command-line tool can do | Before any account read or write |
| `references/result-signals.md` | How each funnel type sends its result back to Meta | During `ad-setup` |

Every file here carries a last-verified date and a refresh instruction. Check it before
relying on the content.
