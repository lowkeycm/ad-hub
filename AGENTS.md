# Handoff for the building agent

You are picking up a repository that was designed in a long planning conversation you
cannot see. Everything decided there is recorded here and in the files this page points
to. Read this page, then [README.md](README.md), then the three files in
`core/_system/`, then [BUILD-PLAN.md](BUILD-PLAN.md).

## What this is

Ad-Hub is a universal, self-contained hub for the development and management of paid
ads. The goal is performing ads that are created, launched, monitored and replaced with
discipline, not a box-ticking presence on a platform. It starts with Meta and is built
so other platforms can be added as thin layers.

## Where things stand (2026-10-03)

Done: the authority map, the system layer drafts (conventions, memory contract, spend
authority), reviews of every outside source, a cross-source conflict list, the first
plays library, and dated Meta platform references.

Not done: every skill, the schemas, the helper scripts, the regression cases, the
install mechanism, the Meta layer's skill file, the automations.

## Decisions already made

Treat these as settled unless the owner reopens them.

1. **Self-contained.** Ad-Hub does not depend on any other hub. The owner's
   Marketing-Hub repo was used only as the structural model: authority map, shared
   system layer, one skill pattern, thin layers over a chassis, few hard rules, dated
   facts with an expiry, a single writer for learnings, written source reviews, a
   provenance record, regression cases.
2. **Universal.** The hub holds capability. Each business repo holds its own context and
   records. Funnel type and result source are set per offer, not per business.
3. **Core plus platform layers.** Core decides. A platform layer carries the decision
   out on one platform and holds that platform's dated facts. Meta first.
4. **Skeleton approved.** The layout in the README, with placeholder skill names.
5. **Specifics are kept.** Named tactics from sources go into the plays library as dated
   claims to test. Do not sand them down into generic advice, and do not drop them
   because they may expire. Expiry is handled by the refresh, not by omission.
6. **Results stay with the business.** The hub never records how a play performed for a
   business. That goes in the business repo through `ad-review`.
7. **Two skills touch live accounts.** `ad-launch` and `ad-manage`. Both check spend
   authority first and log every change.
8. **Watch daily, act on a schedule.** Daily runs look for emergencies only. Changes are
   made in one batch on a schedule set by each offer's conversion volume. An automated
   optimiser that acts daily would automate over-tinkering.
9. **One deciding metric.** ROAS where value is tracked, otherwise cost per result.
   Every other metric explains why; none of them decides.
10. **Result loop.** Each offer sends its real result back to the platform from wherever
    that result is recorded: checkout, CRM status, booking tool or point of sale.
11. **Truth rule.** Claims, testimonials, stories, numbers and scarcity must be real and
    traceable to the business's proof. AI-made people are never presented as customers.
12. **Sources stay outside.** Reviews are written in our own words. Raw transcripts and
    course files are not stored in this repo.
13. **Build order.** Finish `_system`, then build skills one at a time in the order the
    work flows. Test each skill against one business repo before writing the next.

## How the owner works

- Plain language. Short explanations.
- The quickest path to the next usable step beats a complete design.
- Ask when scope is unclear. State your understanding and get it confirmed before
  building in a direction. Two wrong turns in planning both came from building on an
  unverified reading of a request.
- He reviews structure before content.
- He wants real swings and testing, not safe generic rules. Be critical of sources, and
  keep unconventional ideas that have a plausible reason to work.
- No disclaimers or caveat padding.

## How to build

- Follow [CONVENTIONS.md](core/_system/CONVENTIONS.md). Skills are floors, not ceilings.
- Draw on `source-notes/` and the plays library; do not treat either as doctrine.
- Verify platform facts against primary sources at build time. The files in
  `meta-system/references/` carry a last-verified date and a refresh instruction.
- Keep the hub brand-neutral. Example businesses in tests are synthetic.
- When a design choice is not covered here, propose it briefly and ask.

## Open questions for the owner

1. The `ads/` folder layout and the ad ID format in the memory contract are proposals.
   Confirm or change them before the first skill writes into a business repo.
2. Business context that already exists in a business repo is read by meaning from
   wherever it sits. Confirm that no fixed file names should be required.
3. Which business repo is used to test the first skill.
4. Whether to pin parts of the open-source Meta kit (tracking reference, safety model)
   under its MIT licence, or rewrite from the review.
5. The prefix for the pointer skills generated into business repos.

## To verify during the build

- Which steps Meta's connector and command-line tool can perform, and which exist only
  in Ads Manager: the creative testing feature, automated rules, value rules,
  attribution settings, the local "reach more people" expansion, creative enhancements.
- The current requirements for sending results back to Meta
  ([result-signals.md](meta-system/references/result-signals.md)).
- Any creator claim before it is written as a default.
