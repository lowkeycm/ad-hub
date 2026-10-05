# Plugging Ad-Hub into a business repo (to build)

Intended mechanism, mirroring the owner's Marketing-Hub. Nothing here is built yet.

1. Check the hub out beside the business repo (or set an environment variable to where
   it lives).
2. Run a generator from the business repo. It writes one small pointer file per hub
   skill into the business repo's skills folder. A pointer holds only the address of
   the real skill, so the hub stays the single source and nothing is copied.
3. Add a session-start hook that reruns the generator, so pointers refresh themselves.
4. Add a short paragraph to the business repo's `AGENTS.md` telling agents that ad work
   goes through Ad-Hub, where it is, and that this repo is the business workspace.

Pointers carry a prefix so they never collide with same-named skills from elsewhere.
The prefix is an open question in `AGENTS.md`.
