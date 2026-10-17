# Plugging Ad-Hub into a business repo

Four steps, once per business repo. After them, every Ad-Hub skill shows up in the agent's
skill list as `adhub-<name>`, and its steps load at the moment of the task. The hub stays
the single source: nothing is copied into the business repo except small pointer files.

Writing into a business repo needs Clay's go-ahead for that repo (`AGENTS.md` 2.11).

1. **Check the hub out beside the business repo** as `../ad-hub`, or set `AD_HUB` to
   wherever it lives.

2. **Generate the skill pointers** from inside the business repo:

   ```
   node ../ad-hub/install/adhub-skills.mjs
   ```

   This writes `.claude/skills/adhub-<name>/SKILL.md` for every skill built in the hub.
   Commit them, so platforms that do not run hooks still see them. Rerun after a skill is
   added, removed or renamed in the hub. Editing the inside of a skill needs no rerun; a
   pointer only holds the address. `--remove` takes every `adhub-` pointer out again.

3. **Add the session-start hook** so the pointers refresh themselves. Copy
   `install/session-start.sh` to `<repo>/.claude/hooks/session-start.sh`, make it
   executable, and register it in `<repo>/.claude/settings.json`:

   ```json
   {
     "hooks": {
       "SessionStart": [
         { "hooks": [ { "type": "command", "command": "$CLAUDE_PROJECT_DIR/.claude/hooks/session-start.sh" } ] }
       ]
     }
   }
   ```

   If the repo already has a session-start hook (most of Clay's repos do, from the
   clay-config template), paste the lines between `--- Ad-Hub` and `--- end Ad-Hub` into
   it instead of replacing it.

4. **Add this paragraph** to the business repo's `AGENTS.md`, in Section 2:

   > **Paid ads go through Ad-Hub.** Ad-Hub (`github.com/lowkeycm/ad-hub`, checked out
   > at `../ad-hub`) holds the method; this repo holds this business's ad records in
   > `ads/`. Use the `adhub-` skills under `.claude/skills/`. On a platform without
   > skills, read `../ad-hub/README.md`, then the skill for the job, and load context with
   > `node ../ad-hub/core/_system/scripts/context.mjs --for <skill> --root .`. Nothing
   > about this business is ever written into Ad-Hub. Nothing reaches a live ad account
   > without `ads/authority.md` (`../ad-hub/core/_system/spend-authority.md`).

## Repos that also use Marketing-Hub

Both hubs can be installed side by side. Ad-Hub pointers start with `adhub-`, Marketing-Hub
pointers with `hub-`, and neither installer touches the other's. Both hooks can live in
one session-start file.

Marketing-Hub also has skills for paid ads. Clay decided on 2026-10-06 that Marketing-Hub
will ultimately own ad work, reconciled once Ad-Hub works on its own (`AGENTS.md` 2.15).
Until then, an agent in a repo with both says which hub it used for ad work and why.
