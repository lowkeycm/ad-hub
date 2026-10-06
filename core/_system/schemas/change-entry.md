# Schema: change-log entry

Folder in the business repo: `ads/changes/`, one file per live change. Written by
`ad-launch` or `ad-manage` (the daily watch writes one when it uses the emergency stop).
Append only: an entry is never edited after it is written. Undoing a change is a new
entry that names the one it reverses. Rules behind it:
[spend-authority.md](../spend-authority.md), hard rule 4 and "Rollback".

File name: `YYYY-MM-DD-HHMM-<offer>-<action>.md`, for example
`2026-10-06-0930-song-pause.md`. Changes made in one scheduled session share a session
ID so the batch can be read and undone together.

## Template

```markdown
---
when: YYYY-MM-DDTHH:MM+00:00      # with timezone
session: YYYY-MM-DD-<offer>-<n>    # the scheduled session or emergency stop this belongs to
skill: ad-launch | ad-manage | daily-watch
platform: <platform>
account: <account identifier, never a credential>
offer: <slug>
---

# <action> <what, in plain words>

- **Object:** <campaign | ad set | ad>, <ad ID or name>, platform ID <id>
- **Change:** <setting or state>, before: <value>, after: <value>
- **Why:** <the rulebook line, approval or emergency condition that called for it>
- **Evidence:** <numbers with their source and date window, or "approval only">
- **Authorised by:** <pre-approved level 2 action in ads/authority.md | approval log line of YYYY-MM-DD by <who> | emergency stop>
- **Checked first:** <validation run and change list shown, yes or no and why>
- **Result:** <confirmed on the platform | failed: what the platform said>
- **Undo:** <the exact steps to put it back>
- **Reverses:** <file name of the entry this undoes, or none>
```

## Notes

- One type of account change per session (spend-authority, "Watch daily, act on a
  schedule"). Pausing weak ads and adding new ones count as one type.
- "Result" records what the platform reports after the change, not what was sent. A
  change that failed is still logged.
- Money values are in the account's currency. Percentages say what they are of.
