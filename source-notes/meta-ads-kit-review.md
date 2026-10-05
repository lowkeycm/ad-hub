# meta-ads-kit — evaluation notes

Source: `github.com/TheMattBerman/meta-ads-kit`, commit `dffa0daf` (2026-06-10), MIT
licence, copyright 2026 Matt Berman. Reviewed 2026-10-03 by reading the repository and
running it in its sample-data mode.

## Why it was reviewed

An open-source kit of skills and scripts for running Meta ads with an agent, offered
by the owner as a starting point.

## What it is

Six skills (daily monitoring, creative fatigue monitor, budget optimiser, copy
generator, ad upload, tracking setup) and shell scripts, packaged for the OpenClaw
agent framework. At the reviewed commit it was partway through a move to Meta's
official command-line tool.

## Concepts worth retaining

- **Safety model.** Three modes (sample data, read-only, live with approval), new ads
  always created paused, a dry-run artifact before any write, explicit approval gates.
- **Tracking reference.** A thorough guide to the pixel and server-side events, with
  audit, test and match-quality scripts and per-platform notes including GoHighLevel
  and Next.js. The best material found on tracking.
- **Daily check framing.** Five questions each morning: is spend on track, what is
  running, what is winning, what is bleeding, what is fatigued.
- **Copy skill.** Copy written to match a specific image, with variants and field
  limits, output in an upload-ready shape.
- **Upload validation rules.** Checks before an ad is created.

## What not to import as doctrine

- **Winner logic.** It ranks by click rate and cost per click, not by results. On its
  own sample data it recommended moving budget toward retargeting because that got
  more clicks.
- **Report code.** It is written around the layout of its sample file, not what Meta's
  tool returns. Its own notes say real-account mode was never validated.
- **Write actions.** There are no pause or budget commands, and "create ad" writes a
  preview file only. It does not create campaigns.
- **Swapping new creative into an existing ad** to keep its history. That blends two
  versions' results under one ad.
- Hard-coded older API versions in its examples.

## Result

Nothing is vendored yet. If parts are adopted (the tracking reference and the safety
model are the candidates), pin the commit and keep the licence notice. Feeds
`ad-setup`, `ad-manage` and `core/_system/spend-authority.md`.
