# Ben Heath Ads Academy — evaluation notes

Source: 101 one-page lesson guides ("step by step follow along guide") from the Ben
Heath Ads Academy, modules 02 to 25, supplied by the owner. Lessons 3.3, 4.1, 4.3, 4.6,
5.1 and 12.5 and module 01 were not in the set. Reviewed 2026-10-03; all 101 read.
The guides give conclusions without the evidence behind them.

## Why it was reviewed

It is a complete course from one practitioner, and it covers the management half that
the video sources barely touch: budgets, scaling, testing, fatigue, troubleshooting.

## Verdict

The strongest single source for setup, economics and management. It gives one
consistent operating model with specific defaults. Its numbers are his assertions, a
few of its points are his observation and he says so, and its platform details will
date. Adopt the operating model as defaults, keep the numbers as dated claims to test,
and put the platform details in the Meta layer with an expiry.

## The operating model in brief

- One campaign and one ad set per offer or product range, with many different ads
  inside: all formats, all customer types, warm and cold together.
- Audiences are suggestions; location is exact; automated placements and audience on.
- Split only when the offer type, price point or country costs truly differ, or when
  each part can reach about 50 results a week.
- One deciding metric. Everything else diagnoses.
- Changes on a fixed schedule set by conversion volume, made in one batch.
- New ads enter through the platform's creative testing feature, at a pace no faster
  than the last batch can be judged.
- Budget thresholds come from the business's break-even numbers.

## Module notes

Terse working notes, in our own words, by module and lesson number.

### 02 Foundations (setup)
- 2.1 Account: Business Portfolio holds assets (Page, IG pro account, ad account); currency/timezone locked at creation; team access = partial by default.
- 2.2 Three levels: campaign (objective) > ad set (targeting/placements) > ad (creative). Build in Ads Manager.
- 2.3 Pixel: install via partner integration (Shopify native / WP plugin), verify w/ Pixel Helper, investigate warnings (duplicate events). Conversion events via Event Setup Tool; prefer URL-load (thank-you page) events; attach value.
- 2.4 CAPI alongside pixel (browser + server); one-click "Set up with Meta" if not Shopify; confirm active.
- 2.5 First campaign defaults: Auction; objective Sales (online checkout) or Leads; avoid Traffic/Awareness/Engagement; naming convention; campaign budget; DECLARE special ad categories (finance, employment, housing, social issues) or risk account disable; conversion location Website (better lead quality than instant forms); perf goal = max number, or max VALUE if customer value varies a lot; correct pixel+event; location narrow; age/lang default; audience = light suggestion; Advantage+ placements; single image, original crop; creative enhancements OFF for first ad; let run a few days before judging.

### 03 Campaign Structure
- 3.1 DEFAULT: 1 campaign > 1 ad set per product range/offer, MANY ads inside. Reason: data consolidation. Split campaigns only when product range / offer type (book-a-call vs lead magnet) / price point genuinely differ. "If in doubt, fewer variables."
- 3.2 Hybrid warm+cold: audiences are suggestions; don't split warm/cold ad sets. Define Engaged Audience + Existing Customers in Advertising Settings, then Breakdown > Audience Segment shows what Meta actually did. Warm-only (Further limit reach) only if offer truly unsuitable for cold; expect worse results.
- 3.4 Mix image/video/carousel in SAME ad set; claim: Meta plans impression order across ads in an ad set (video to explain, then punchier image) and matches format to person. Don't pick a "winning format".
- 3.5 Diversify by persona AND style (founder-led, UGC, demo, time-lapse) inside one ad set. No ad-count cap: 40–50 live ads fine ("6 max" guidance gone). Split personas into own ad set only with 50+ conversions/week each + a real strategic reason.

### 04 Targeting
- 4.2 Location = exactly where you can serve. Local biz: city + realistic radius; DESELECT "Reach more people likely to respond" (pulls in tourists/students interested in area). Group similar-cost countries; split very different ones (valid exception to consolidation) + tailor messaging per market.
- 4.4 Seasoned account (lots of conversions): go open/broad (18+, all genders, no detailed targeting); keep location + legal controls.
- 4.5 Custom audiences: all website visitors 180d; purchase audience retention up to 730d (CLAIM—verify); customer list split bought/not-bought + value column; lookalikes rarely needed now; Meta-source audiences rarely worth making. Feed Engaged/Existing definitions.
- 4.7 Mistakes: over-restricting (Further limit reach); location too wide or too narrow; testing targeting across ad sets (overlap makes it meaningless).
- 4.8 Creative/messaging IS targeting, strongest early. If reaching wrong people: fix creative first. WARNING: "how-to" teaching content and controversial industry takes attract industry insiders/competitors, not buyers -> shift to outcomes + social proof for people like the buyer.

### 05 Advantage+
- 5.2 Advantage+ ON by default (90–95%+ of campaigns). Three criteria: campaign budget; audience as suggestions (deselecting even one turns it off); all placements. OFF only for warm-only or non-conversion objectives (Traffic -> manual placements to avoid Audience Network).

### 06 Funnels
- 6.1 Direct to Offer = default: one Sales/Leads campaign straight to the offer. Low AOV (<~$100) has no other viable option. High value: change the ask (free quote, call booking), not the structure. Multi-step linear funnels mostly dead.
- 6.2 Lead Magnet First: for higher AOV (high hundreds+), expertise-led, bespoke/quiz. Magnet solves ONE specific problem. Separate campaign from Direct to Offer (different optimisation); one campaign per magnet; can run both in parallel.
- 6.3 Omnipresent Content (specific recipe, PLAY): Awareness objective; 14 ad sets x 1 ad each; frequency CAP 1 per 7 days; same warm audience on all; ~$1/day per ad set; 4 buckets (Value, Demonstration, Testimonial, CTA); run 3+ months; judge by engagement not conversions. For high-ticket expertise businesses in crowded markets. Used less post-Andromeda.

### 07 Offers
- 7.1 Offer > setup. Good offer rescues bad setup, not vice versa. Zero leads/sales at all = almost always offer problem, not targeting. Offer = product + everything bundled (bonuses, BOGO, install, speed).
- 7.2 Hormozi value equation: (dream outcome x perceived likelihood) / (time delay x effort&sacrifice). Bottom two often have more room. Improve one component at a time.
- 7.3 Guarantees: results-based (top half) vs process-based (bottom half); forms: no pay / refund / discount / work free till result. Only guarantee what you can deliver. Premium brands: guarantee can cheapen; if used, aim at time/effort not likelihood.
- 7.4 Urgency (time-based): must be TRUE. Build recurring promo calendar with real fixed end dates (seasonal, milestones, launches).
- 7.5 Scarcity (supply-based): usually already real (stock, capacity: "3 spots this month"); state it. Underused.

### 08 Numbers
- 8.1 Unit economics: worth of customer (AOV/LTV) vs cost to acquire. Raising revenue per customer often easier than lowering CPA. (Interior design $1k CAC fine at $100k LTV; £20 haircut needs £6 booking = unrealistic unless LTV counted.)
- 8.2 LTGP:CAC. LTGP = AOV x purchases per customer x gross margin. CAC = spend / new customers. Example ratio 10 = strong. Number of purchases = biggest lever.
- 8.3 Break-even (first transaction only, cash-flow view). Ecom: AOV x margin = max cost per purchase. Lead-gen: first transaction x margin x lead-to-client rate = max cost per lead (rate swings this massively). Very low gross profit per customer = business model problem, not ads.

### 09 Budgets
- 9.1 Starter budget: amount you could lose but wouldn't want to. Hold until profitable, then scale from strength.
- 9.2 "Ideal" = cost per conversion x 50/week PER AD SET (x4 for month). Guideline only; many good accounts never hit 50/wk. Prefer deepest trackable event over a cheaper earlier one just to hit 50. More ad sets multiply required budget -> argument for consolidation. More budget doesn't fix a failing campaign.
- 9.3 Business before algorithm: cut/pause for capacity or stock limits; raise for real events (flash sale). Learning-phase fears overblown. Otherwise keep stable.

### 10 Conversion Locations
- 10.1 Where the conversion happens: Website, Instant Forms, Messaging (Messenger/IG DM/WhatsApp), call, app. Depends on business type + geography. No universal answer -> test.
- 10.2 Landing pages: dearer clicks, better lead quality, builds brand. Structure: header nav (not a dead end), repeated CTAs but ONE simple next step, credibility headline on outcome, say who you serve, PROOF > features (biggest single fix = more evidence), lean on personal brand. Polish matters less than elements.
- 10.3 Instant Forms: Leads objective; if Website+Forms both on, Meta sends most to Forms. Types: More Volume (start) / Higher Intent (only if quality issue) / phone OTP (last resort) / Rich Creative (rarely). Flexible Form Delivery on. Phone REQUIRED. Extra questions only if needed. Conditional logic to pre-qualify (trains Meta on qualified leads). End pages E1 (qualified) / E2 (not). Consider turning off multi-advertiser ads.
- 10.4 Message funnels: availability/behaviour varies by market (WhatsApp conversation optimisation not available in UK/parts of EU -> becomes link clicks = avoid). Start with "Start Conversations" (human) to learn real questions/objections, THEN automate.
- 10.5 Choose: volume/cheap -> Instant Forms; quality/brand -> landing page; message funnels live or die on execution. Judge on REVENUE not cost per lead. Follow-up speed is a bigger lever than funnel choice (24h -> <1 min tripled results in one case).

### 11 Ad Creative Strategy
- 11.1 Creative = the visual; biggest performance lever now. Claimed win rates: video best ~60% of businesses, image ~25–30%, carousel ~10–15%. Make all three.
- 11.2 Volume: launch ~20 genuinely different ads per ad set (4 is an OK floor); multi-offer businesses 20 each; keep adding weekly/biweekly/monthly by spend + fatigue. After offer validated, most time goes to creative production.

### 12 Ad Creative Types (each = a PLAY family)
- 12.1 UGC: feels like a friend's recommendation; person should resemble buyer. Simple (footage + music, no script) or structured (hook, pain, relatable scene, benefit). Image UGC works too. Now used beyond ecom.
- 12.2 Founder-led: "had the problem, built the fix" story; authority; pre-empt objections; interview/podcast variant; SIMPLE version = founder photo + plain copy + one CTA.
- 12.3 Demonstration: product in use / time-lapse of service result; best for visual product or outcome; entertain + educate; polished OR one specific relatable use case with no dialogue.
- 12.4 Testimonials: build a SYSTEM to collect (incentive, on-site recording spot, 3 structured questions, remote self-record); video > text; honest "review-style" incl. trade-offs; montage of varied customers; end with next step.
- 12.6 Animated: no-camera option; stands out as UGC saturates; refresh for fatigue; needs brand fit.

### 13 Ad Creative Inspiration
- 13.1 Swipe file: capture ads the moment you see them; review before each creative batch; shared drop spot.
- 13.2 Ads Library basics: pick delivery country, search advertiser or keyword, see active ad count, start dates, versions, AND click through to landing page (research whole funnel).
- 13.3 Strategy: sort by impressions high->low AND check long runtime = best signal of a real performer. Break down hook / style / messaging+proof / partnership ad?. Adapt, don't duplicate. Model from businesses a couple of steps ahead (not giants: brand equity misleads) + ADJACENT, more sophisticated industries. Volume of modelled ads raises odds.

### 14 Ad Creative Walkthroughs
- 14.1 Ratios: square/4:5 base always; dedicated VERTICAL edit (not crop) for Stories/Reels; horizontal optional. Text-heavy -> no auto-crop, upload purpose-made.
- 14.2 Meta AI image variations: review each; keep plausible background/context swaps; reject anything misrepresenting person/product/place; check altered text/figures; never present generated image as real work.
- 14.3 Enhancements. OFF by default: enhanced media text, Business AI, add overlays (if text-heavy), visual touch-ups (if proper versions uploaded). ON: text improvements, enhanced CTA, add animation, product tags (clean catalogue), flex media. Music = deliberate choice (Meta library avoids licensing; test).
- 14.4 Video enhancements: fewer usable than image; add details/layout (product images beside video), show highlights (timestamps; good for long demos/testimonial montages, bad for narrative), video touch-ups off if purpose-made versions exist. Business AI off unless planned; product tags if clean catalogue; text improvements on.
- 14.5 Ecom reactions (plays): visual + verbal hook naming brand and what it does; lead with core benefit vs the DEFAULT ALTERNATIVE (coffee); cultural reference; show problem with alternative then logical reasons; voice the objection and answer with review count; end on one use case. Price reframed against a familiar daily spend; "one scoop, done" simplicity; money-back guarantee close. Cinematic style for warm audiences; comparative claims vs previous version. Length 15–45s for simple purchases; considered services may need longer.
- 14.6 Lead-gen reactions (plays): personality/pattern interrupt from an unexpected brand; coined phrase + analogy; explicit audience qualifier opener ("If you're a business owner…"); plain offer + experience logic; low-stakes CTA (see if it's a fit). Credibility must already exist for claims-only ads.
- 14.7 Local reactions (plays): 15s high-energy montage; range of people so viewers see themselves; bold clear price/offer; warm tone; star rating + review count + years serving area; list range of services; one specific offer; SHOW the premises/process to cut anxiety.

### 15 Creators & Partnership Ads
- 15.1 Creators bring attention + borrowed trust; audience must overlap. Cheaper than assumed (claim: 500k+ accounts produce video assets <$1k); business creators dearest. Always secure right to run assets as paid ads (organic post dies in days).
- 15.2 Creator Marketplace (free, in Ads Manager): recommendations, filters (country, size, age/gender), profile stats (hook rate, interaction, past brand work, audience demographics); message via marketplace (priority inbox) or post a campaign brief; ALWAYS request ad-boost permission (pay uplift).
- 15.3 Practice: contact many, negotiate low, expect hit-or-miss. Brief: 2–3 videos, 5–10 HOOKS each, clear trackable CTA (unique code), benefit list, not a rigid script. Start small, reinvest in winners. Claim: creator ads lift ROAS 40–60%, up to 200%.
- 15.4 Partnership ads: ad runs from both handles, reaches creator's followers; via ad code/post ID or ongoing partnership (creator approves). Rest of setup unchanged.

### 16 Ad Messaging
- 16.1 Messaging = who it's for + what it is; consistent across every public asset; write it down; audit.
- 16.2 Meta reads copy + landing page + public messaging and uses engagement signals -> messaging does targeting. "Call out" the ideal customer at the start. Fix messaging before targeting.
- 16.3 Specific beats broad (by price point, use case, industry, life stage). Generic vs specific headline examples (dentist, accountant, products).
- 16.4 Clear beats clever: no puns/wordplay; understandable at a glance.
- 16.5 Test copy INSIDE one ad: up to 5 primary texts + 5 headlines. Call-out openers by problem/circumstance (physio, adviser, cafe, vet). Copy matters less than offer + creative. AI drafts OK if filtered.

### 17 Analysis & Optimisation
- 17.1 No fixed "days". Enough data depends on conversion volume + size of gap ($45 vs $125 needs little; $45 vs $48 needs lots). Use significance calculator, aim 90%+ confidence. 2 conversions tells nothing. Faster answers = wait or spend more.
- 17.2 Learning phase ~24–48h after launch/major edit (longer at low volume; some never exit). Discount that window in analysis; new ad vs established one looks worse unfairly. Don't refresh in real time.
- 17.3 NORTH STAR: ROAS if value tracked, else cost per conversion. It alone decides on/off/scale. Secondary metrics only explain WHY.
- 17.4 Hook rate = 3-sec plays / impressions. Diagnostic. High hook + good CPA = reuse hook. Low hook + good CPA = strong body, try better hook. OK hook + bad CPA = fix body.
- 17.5 Use LINK CTR not CTR(all). >1% decent, >2% very good. High CTR + bad ROAS = ad/landing mismatch. Strong hook + low CTR = weak CTA. LP views vs conversions isolates landing-page problems.
- 17.6 CPM mostly external (market, placement). Don't chase low CPM (quality drops). More engaging ads lower CPM modestly (~25%). Context only.
- 17.7 OPTIMISATION SCHEDULE: fixed cadence by conversion volume (daily for high volume; 7/10/14 days or monthly for low). BATCH all changes in one go (kill losers + launch new together) = one learning reset. Over-tinkering = top beginner error; low volume needs MORE patience.

### 18 Scaling
- 18.1 Expect CPA up / ROAS down as budget grows (best prospects first). Under ~$100/day doubling barely moves numbers. Trade-off scale vs profit. Room comes from unit economics + better creative.
- 18.2 AUTOMATED RULES: scale-up = +3%/day (percentage, once daily, optional max cap) when North Star beats a threshold well inside break-even (e.g. break-even 100 -> scale under 60); min 8,000 lifetime impressions; lookback ~7 days (not default months). Scale-down = -3%/day when worse than a higher threshold (e.g. 80), with a floor. => three zones: up / hold / down.
- 18.3 MANUAL: bigger, rarer steps; % shrinks as budget grows (100>200>300>450>600>800>1000>1250>1500>1750>2000); hold ~7 days each; if results worsen hold (or revert) until back with headroom. Break rules for live sale/launch/peak, or capacity/stock limits.
- 18.4 Mistakes: horizontal scaling (duplicating campaigns) fragments data; scaling too often (stuck in learning); NOT scaling a winner (opportunity cost is the bigger risk).

### 19 Testing
- 19.1 Testing share of budget: 10–20% when results strong, up to 100% when poor; typical 20–30%. Testing drags short-term results; worth it (finds better ads, fatigue pipeline).
- 19.2 Separate testing campaign only if IT gets 50+ conversions/week (20% split -> main needs 200+/wk), per offer. Otherwise lose-lose. Most businesses: test inside the one campaign/ad set.
- 19.3 Meta CREATIVE TESTING TOOL (ad level > Creative testing > Set up test): 2–5 new creatives, guaranteed even split of a set share of budget, existing ads undisturbed, compare on real conversion event (not cost per interaction default), run until significant; afterwards they become normal ads. Solves "new ads get no spend".
- 19.4 CADENCE RULE: never add new ads faster than the last batch can be validly judged. Time-to-significance IS the testing cadence (days for high volume; 2–3 weeks+ for low). Often means FEWER ads; two great > ten mediocre.
- 19.5 Learning Limited: <~50 conv/wk officially, ~20/wk often enough. Fix by consolidating (fewer variations, merge test+scale, fewer campaigns). "Spend more" only if already profitable; be sceptical of platform advice to spend more. Profitable-while-limited is fine for low-volume businesses.

### 20 Hidden Settings
- 20.1 Advertising Settings > Social Information: combine likes/reactions across similar ads = bigger visible social proof.
- 20.2 Define Engaged Audience (non-buyers: site visitors, email list) + Existing Customers (buyers); Breakdown > Audience Segment; expect cheaper results from engaged/existing, most spend on new.
- 20.3 Attribution: 1-day click, 7-day click, 1-day engaged-view, 1-day view. KEEP 7-day click (1-day click loses ~half of conversions). View-through has real value; trim only if clearly over-reporting.
- 20.4 Instant Form conditional logic: unqualified answers go to a separate end page and are NOT counted as leads -> Meta learns only from qualified leads.

### 21 Andromeda
- 21.1 Andromeda = ad retrieval system matching individual ads to individuals; explains consolidation + volume + specific messaging. Fragmented accounts got hurt.
- 21.2 Strategy recap: one campaign per offer, consolidated hybrid ad set, 20–30+ live creatives, diversity of style (UGC, founder, demo, testimonial, animated, slideshow, influencer) and format; Creative Testing tool for testing inside. Consolidating a messy account usually gives an immediate lift.

### 22 MAIBA
- 22.1 Meta AI Business Assistant (business.facebook.com/help): fixes simple account issues, escalates to humans, analyses campaigns; sometimes wrong -> validate.

### 23 Advanced
- 23.1 Value Rules (Advertising Settings): bid +/- % for segments (age, gender, location, device, placement, conversion location) that are worth more; needs real customer data; cost per result may rise; apply per ad set.
- 23.2 Incremental attribution (ad set): optimises + reports only ad-caused conversions; numbers look worse; for big brands with large warm audiences; don't compare to standard.
- 23.3 Omnichannel optimisation: one campaign across website + in-store + app, or landing page + instant form; in-store needs CRM/POS data flowing to Meta.
- 23.4 CPM creep: unexplained CPM rise can be a silent penalty (low engagement; claims Meta finds unrealistic; borderline special-category wording). His observation, not official. Compare like-for-like seasons.
- 23.5 LTGP relative to competitors is the key number; upsells/cross-sells; resilience (4:1 vs 25:1 under +25% costs); product quality + public sentiment move ad results -> check reviews/comments when results drop.
- 23.6 "Your best ad" (PLAY): strong-body ad (low hook rate, good North Star) + strong-hook ad -> hybrid; test one body against several top hooks.

### 24 Troubleshooting
- 24.1 Fatigue: check AD-level frequency (impressions/reach). >~3 with worsening cost = fatigue. <2 = look elsewhere (e.g. warm pool exhausted -> audience breakdown; offer too weak for cold). Fix = MEANINGFULLY different creative (format/style/hook switch). Keep testing so replacements are ready.
- 24.2 Campaign reset: after ruling out fatigue + offer: stop, relaunch new campaign with same ads; often a short-term lift. Last resort.
- 24.3 Tracking: ignore last 48–72h (modelled). Check Event Match Quality, coverage, deduplication. Reinstall pixel/CAPI; hand to specialist.
- 24.4 Change history: revert freely; use last-known-good as baseline.
- 24.5 New ads get no spend -> Creative Testing tool.
- 24.6 Account recovery: MAIBA + request review + any Meta rep, all at once. Protect: approval ratio (8 safe : 2 risky per batch), backup payment method. (His "new profiles/someone else's profile" fallback = ban evasion: leave out.)

### 25 Honest Takes
- 25.1 It's a competition: be best in a winnable field (local easier; national -> niche). Improve on what you model.
- 25.2 Brand: build (consistent content) and borrow (creators). Raises pricing power + perceived likelihood.
- 25.3 Dynamic market: results move for external reasons (competitors, news, weather, viral moments). Don't assume your change caused it.
- 25.4 Seasonality: learn the pattern; spend into strong seasons, pull back in weak; compare like-for-like.
- 25.5 Iterate weak points one at a time, consistently.
- 25.6 Leave ads alone: no decisions on tiny data; one type of change at a time; patience scales inversely with volume.

## What not to import as doctrine

- His numbers as fixed rules: format win rates, 20 to 50 live ads, a 3% daily budget
  step, fatigue at a frequency of about 3, 90% confidence, 20 to 30% of budget on
  testing, 8 safe ads to 2 risky. All are sensible defaults and all are his claims.
- Platform specifics without checking: audience retention windows, where message
  optimisation is unavailable, the names of creative enhancements, attribution options.
- Click-by-click steps. The hub acts through the platform's connector or command-line
  tool, and some of his steps may exist only in the Ads Manager interface.
- The fallback of opening a new account under new or borrowed profiles after a
  permanent disable. That is evading enforcement.
- Call-out examples that pair "you" with a health or money problem. Those need the
  personal-attributes policy check; his own lesson on rising costs says borderline
  wording can be penalised silently.

## Conflicts

See `conflicts.md`. The main ones: single ad set against a testing-and-winners
structure; modelling competitor ads against diagnosing gaps; deepest event against an
easier early event; confidence on a schedule against a spend-multiple kill rule.

## Result

- `ad-setup`: modules 02 to 05, 10, 20.
- `start-here` and the offer file: modules 06, 08, 09.
- `ad-strategy`: modules 06, 07, 11, 19; the plays library takes modules 12, 14, 15.
- `ad-creative`: modules 12, 14, 15, 16.
- `competitor-ads`: module 13.
- `ad-launch`: lessons 19.3, 24.5, 24.6.
- `ad-manage`: modules 09, 17, 18, 24, 25.
- `ad-review`: modules 17, 20, 23, 25.
- Meta layer: modules 05, 14, 20, 21, 22, 23 as dated facts to verify.
