# "Build FB Ads AI Agent" — evaluation notes

Source: YouTube class transcript, presenter Cody Schneider, recorded around May 2026.
Reviewed 2026-10-03 from the transcript only.

## Why it was reviewed

The first source the owner supplied. It describes an end-to-end loop for running Meta
ads with an AI agent, which is close to the goal of this hub.

## Concepts worth retaining

- **The loop.** Research customer pain, make many varied ads, test, promote winners, cut
  losers, remix winners back into testing.
- **Fresh inputs each cycle.** An agent left alone converges on the same ideas. Feed it
  new material every round: new research, new formats seen elsewhere.
- **Customer language from forums.** Mine public discussion for the words buyers use.
- **Send quality back.** Score leads on the server and send the good ones back to the
  platform as the conversion, so it learns from quality and not from form fills.
- **Keep analytics off the ads API.** Heavy reporting through the API can get an account
  flagged. Take a small daily snapshot and analyse that.
- **Budget starting points** (his claim): about $30 a day for two weeks for a local
  business, about $100 a day nationally.
- **Production stack idea.** An image model for statics, an avatar plus voice tool for
  presenter video, a premium video model for hero pieces.

## What not to import as doctrine

- The data warehouse stack. It is sized for far larger data than a small account
  produces, and the presenter sells a hosted version.
- The developer-app and system-user setup. Meta's official connector and command-line
  tool now cover most of it.
- "Interest targeting is gone" as an absolute, and 50 to 100 ad variations as a target.
  See the cadence rule in the course review.

## Conflicts

- Structure: a testing campaign of several small ad sets plus a winners campaign,
  against the single consolidated ad set in the course.
- Conversion event: start with an easier event and move deeper, against "deepest event
  you can track".

## Result

Feeds `ad-strategy` (remix and fresh inputs), `ad-setup` (result signal), `ad-review`
(snapshot store) and the plays library.
