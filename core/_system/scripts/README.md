# Helper scripts

Node standard library only, no packages to install. Node 20 or later. Each script's
header comment is its full usage. Run from anywhere; `--hub` defaults to this hub.

| Script | What it does | Used by |
| --- | --- | --- |
| `context.mjs --for <skill> --root <business repo> [--offer <slug>]` | Loads exactly the files a skill declares in its `reads`, from the business repo's `ads/` folder, with dates and age. Absent files are named with the skill that writes them and never block. Lists the business repo's other Markdown files by title so existing context can be found by meaning. Files older than 90 days (change with `--stale-days`) are flagged. | Every skill, at the start of a run |
| `freshness.mjs [files...] [--strict]` | Checks the `last-verified · ttl-days · refresh` header on dated reference files. Reports fresh, due soon, expired (with its refresh instruction) or broken. | The monthly refresh; the build gate (broken headers fail) |
| `route.mjs --goal "<request>"` / `--task <skill>` / `--list` | Points a request at a skill from the README task lookup and shows what that skill reads, writes and whether it can touch a live account. A plain word match: a fallback for platforms that do not list skills, not a replacement for reading the request. | Agents on Codex, Perplexity and the like |
| `route.mjs --check` | Enforces the frontmatter rules every skill must meet (CONVENTIONS sections 2 and 3, README hard rules 5 and 6). | The build gate |

Build gate, from the repo root: `npm test`. It runs the script tests against synthetic
fixtures in `test/fixtures/`, then runs the freshness and skill checks on the real hub.
