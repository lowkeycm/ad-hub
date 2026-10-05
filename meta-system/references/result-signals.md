# Sending results back to Meta (perishable: check the header first)

last-verified: 2026-10-03 · ttl-days: 60 · refresh: re-read Meta's developer documentation for "Conversions API for CRM integration" and its payload specification, and the Conversions API overview; confirm the fit criteria and which lead sources the Conversion Leads goal supports; update and bump last-verified.
changes: 2026-10-03, first written from Meta's documentation; two lines marked secondary come from partner articles.

Load during `ad-setup`, after the offer file names its funnel type and result source.

## The idea

Each offer has one place where its real result is recorded. That result is sent back
to Meta so it learns who to look for. The same record is what the hub judges ads on.

## Routes by funnel type

**Direct online sale.** The checkout sends a purchase event with its value, from the
browser and from the server, de-duplicated. The campaign optimises for purchases, or
for purchase value when order values vary. Nothing else is needed.

**Lead captured on Meta's own form (Instant Form), then a later status.** Meta has a
performance goal for this, Conversion Leads, fed by its Conversions API for CRM. On the
verify date Meta's documentation says:

- it works only with Instant Forms
- good fit means: the Meta lead ID (15 to 17 digits) is stored with each lead, at least
  200 leads a month, the stage being optimised for happens within 28 days of the lead,
  and that stage's conversion rate is between 1% and 40%
- every stage should be sent as it updates, including the initial lead
- events are marked as system-generated, with the CRM as the event source

**Lead captured on a website form, then a later status.** The system holding the status
sends it as an ordinary server event, matched by the click identifier and hashed
contact details. The campaign optimises for that event. There is no 200-lead rule, but
Meta still needs enough of those events to learn from.

**Direct booking.** The scheduling tool's confirmation is the event.

**In-person sale.** The purchase is uploaded afterwards as a server event. Secondary:
Meta retired its separate Offline Conversions API in May 2025, and offline events now
go through the standard Conversions API.

## Choosing the status to send for optimisation

Pick the earliest status that marks a real buyer and arrives soon enough to be used.
A sale that closes months later cannot be learned from; an appointment booked in the
first weeks can. Keep sending the later statuses anyway, with their values, because
review uses them.

## Lighter alternatives when volume is low

- Qualifying questions on the form, so unqualified answers are never counted as leads.
- Value rules that tell Meta a segment is worth more or less.

Both are plays in the library and both come from the course review.

## Notes

- Secondary: Meta is reported to claim about 15% lower cost per quality lead for
  Instant Form campaigns using Conversion Leads with a connected CRM.
- Each result source sends events its own way. Keep one short note per system
  (checkout platform, CRM, booking tool, point of sale) beside this file as they are
  set up.
