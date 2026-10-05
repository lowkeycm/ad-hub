# Meta's official tools for agents (perishable: check the header first)

last-verified: 2026-10-03 · ttl-days: 30 · refresh: re-read Meta's developer documentation for "ads AI connectors" (the Ads MCP server overview, get-started, tools and rules pages); run `pip index versions meta-ads` and `meta ads --help` for the command-line tool; update every line below and bump last-verified.
changes: 2026-10-03, first written from Meta's documentation and the tool's own help output (version 1.2.0).

Load before any account read or write, and when deciding whether a step can be done by
the agent or must be handed to a person.

## What exists

Meta released official tools for AI agents on 2026-04-29: a connector (an MCP server)
and a command-line tool. On 2026-07-16 Meta added support for using your own developer
app, and rules that let whoever has full control of a business portfolio limit what an
AI agent may do on the ad account.

Use these before any hand-built API code. Earlier guides that start with creating a
developer app and a system-user token predate them.

## Connector (MCP server)

Endpoint per Meta's documentation: `https://mcp.facebook.com/ads`. Sign-in is with the
business's own Meta login.

Tool families documented by Meta:

- **Reporting.** Performance by campaign, ad set and ad, including conversions and
  ROAS over time; anomaly signals; industry benchmarks; an opportunity score.
- **Create and manage.** Campaigns, ad sets and ads. Writes create entities paused, and
  the client asks for confirmation before activation.
- **Creative.** A single-image link creative, and ad previews.
- **Ad Library search.** The public Ad Library, for competitor research.
- **Audiences.** Custom audiences.
- **Experiments.** A/B tests and conversion lift studies.
- **Signals.** Dataset (pixel and server events) health and diagnostics.
- **Activity log.** What changed on the account and when.
- **Help search.** Meta's help centre.

## Command-line tool

Package `meta-ads` on PyPI, command `meta`, version 1.2.0 on the verify date. Needs
Python 3.12 or later.

Command groups: `ad`, `adaccount`, `adset`, `campaign`, `catalog`, `creative`,
`dataset`, `guidance`, `insights`, `page`, `product-feed`, `product-item`,
`product-set`, `study`.

Confirmed from the tool's help:

- `campaign create` takes an objective (sales, leads, traffic, awareness, engagement,
  app promotion), a daily budget in cents, a special ad category (credit, employment,
  financial products and services, housing, issues and politics, online gambling, or
  none), an initial status, and `--execution-options validate_only` for a dry run.
- `creative create` uploads an image or a video, builds multi-image and multi-text
  creatives, can reuse an existing post, supports catalogue creatives, and takes
  tracking parameters for the destination link.
- `ad create` attaches a creative to an ad set, with optional start and end times.
- `adset update` changes daily or lifetime budget and status (active, paused,
  archived).
- `insights get` prints the raw API response. It filters by campaign, ad set or ad,
  takes date presets or a date range, a time increment, and a breakdown (age, gender,
  country, platform, device, placement). It has no "level" option, so per-ad numbers
  across an account mean asking per ad or using the connector's reporting.
- `dataset` manages pixels; `study` manages experiments; `guidance` returns Meta's
  recommendations.

## Not yet verified

Whether either tool can: set up the creative testing feature; create automated budget
rules; create or apply value rules; change the attribution setting; switch off the
local "reach more people" expansion; control individual creative enhancements; set up
partnership ads. Check each when the skill that needs it is built. Until then, plan
for a short hand-off list a person completes in Ads Manager.

## Standing cautions

- Treat Meta's recommendations and its assistant's suggestions as input to check.
- Platform data for the most recent two to three days is still settling.
- Heavy reporting through the API has been reported to get accounts flagged. Take a
  small daily snapshot and analyse that.
