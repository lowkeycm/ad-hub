// Tests for the Ad-Hub helper scripts. Run from the repo root: npm test
// Fixtures are synthetic (test/fixtures/README.md). The last tests run the checks
// against the real hub, so a broken freshness header or a skill that breaks the
// frontmatter rules fails the build gate.

import { test } from "node:test";
import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const scripts = path.resolve(here, "..");
const fx = (p) => path.join(here, "fixtures", p);
const run = (script, ...args) => {
  const r = spawnSync(process.execPath, [path.join(scripts, script), ...args], { encoding: "utf8" });
  return { code: r.status, out: r.stdout, err: r.stderr };
};
const ctx = (...a) => run("context.mjs", "--hub", fx("hub"), "--today", "2026-10-10", ...a);

test("context: loads the offer, the named section and filtered learnings", () => {
  const r = ctx("--for", "ad-strategy", "--root", fx("business"), "--offer", "loaf");
  assert.equal(r.code, 0, r.err);
  assert.match(r.out, /## ads\/offers\/loaf\.md\n\nUpdated 2026-09-01 \(file header\), 39 days old\./);
  assert.match(r.out, /## Customer types\n\n- Busy parents/);
  assert.doesNotMatch(r.out, /## Awareness/);
  assert.match(r.out, /\[loaf\] Founder-led video/);
  assert.doesNotMatch(r.out, /\[cake\] Testimonial/);
});

test("context: flags stale files and names the skill that refreshes them", () => {
  const r = ctx("--for", "ad-strategy", "--root", fx("business"), "--offer", "loaf");
  assert.match(r.out, /audience\.md#customer-types\n\nUpdated 2026-01-02 \(file header\), 281 days old\. STALE: older than 90 days; refresh with audience-research/);
});

test("context: absent files are reported with their writer and never block", () => {
  const r = ctx("--for", "ad-strategy", "--root", fx("business"), "--offer", "loaf");
  assert.equal(r.code, 0);
  assert.match(r.out, /## ads\/research\/voc\.md\n\nAbsent\. Written by audience-research\./);
  assert.match(r.out, /Summary: 4 present, 1 absent, 1 stale\./);
});

test("context: folders are listed, not loaded", () => {
  const r = ctx("--for", "ad-strategy", "--root", fx("business"), "--offer", "loaf");
  assert.match(r.out, /Folder, 1 file\(s\)\. Open only what the task needs:\n- ads\/creative\/2610-a\/loaf-2610-001\.md/);
  assert.doesNotMatch(r.out, /loaf-2610-001 brief/);
});

test("context: other business files are listed by title, outside ads/ only", () => {
  const r = ctx("--for", "ad-strategy", "--root", fx("business"), "--offer", "loaf");
  assert.match(r.out, /- README\.md: Example Bakery/);
  assert.match(r.out, /- notes\/brand-notes\.md: How we sound/);
  assert.doesNotMatch(r.out, /- ads\/offers\/cake\.md:/);
  assert.doesNotMatch(r.out, /Warm and plain/);
});

test("context: with two offers and none chosen, asks for one", () => {
  const r = ctx("--for", "ad-strategy", "--root", fx("business"));
  assert.equal(r.code, 0);
  assert.match(r.out, /Offer: not chosen \(offers: cake, loaf\)/);
  assert.match(r.out, /Needs an offer\. Pass --offer <slug> \(offers: cake, loaf\)/);
});

test("context: a business with no ads/ folder still gets a usable answer", () => {
  const r = ctx("--for", "ad-strategy", "--root", fx("business-empty"));
  assert.equal(r.code, 0);
  assert.match(r.out, /No ads\/ folder yet\. Drafting can start from the request/);
  assert.match(r.out, /- README\.md: Brand-new business/);
});

test("context: unknown skill is a usage error", () => {
  const r = ctx("--for", "no-such-skill", "--root", fx("business"));
  assert.equal(r.code, 2);
  assert.match(r.err, /no built skill named "no-such-skill".*built: ad-review, ad-strategy, audience-research/);
});

test("freshness: fresh, expired and broken headers", () => {
  const files = ["fresh.md", "expired.md", "broken.md"].map((f) => fx(`dated/${f}`));
  const r = run("freshness.mjs", "--today", "2026-10-10", ...files);
  assert.equal(r.code, 2);
  assert.match(r.out, /fresh +.*fresh\.md: expires in 21 days/);
  assert.match(r.out, /expired +.*expired\.md: verified 2026-08-01, 40 days past its 30-day life\. Refresh: re-read/);
  assert.match(r.out, /broken +.*broken\.md: last-verified is not a YYYY-MM-DD date; ttl-days is missing or not a whole number; refresh instruction is missing/);
});

test("freshness: expiry fails only with --strict", () => {
  const f = fx("dated/expired.md");
  assert.equal(run("freshness.mjs", "--today", "2026-10-10", f).code, 0);
  assert.equal(run("freshness.mjs", "--today", "2026-10-10", "--strict", f).code, 1);
  assert.match(run("freshness.mjs", "--today", "2026-08-27", fx("dated/expired.md")).out, /due soon/);
});

test("route: picks the matching skill and falls back to start-here", () => {
  const go = (g) => run("route.mjs", "--hub", fx("hub"), "--goal", g).out;
  assert.match(go("who are our customers and what do they say"), /^Start with: audience-research\n/);
  assert.match(go("what should we test in the next batch"), /^Start with: ad-strategy\n/);
  assert.match(go("help me with ads"), /^Start with: start-here \(not built yet/);
  assert.match(go("what should we test"), /Reads: offers\/<offer>\.md, research\/audience\.md#customer-types/);
});

test("route --check: passes a well-formed hub", () => {
  const r = run("route.mjs", "--hub", fx("hub"), "--check");
  assert.equal(r.code, 0, r.out);
  assert.match(r.out, /Check passed: 3 built skill\(s\), 4 in the README task table/);
});

test("route --check: catches every rule the rogue skill breaks", () => {
  const r = run("route.mjs", "--hub", fx("bad-hub"), "--check");
  assert.equal(r.code, 1);
  for (const want of [
    /name "rogue-skill" does not match folder/,
    /layer must be one of/,
    /live: act is allowed only for ad-launch and ad-manage/,
    /not listed in the README task table/,
    /"ads\/offers\/x\.md" must be a path inside the business ads\/ folder/,
    /only ad-review writes learnings\.md/,
    /strategy\/diagnosis\.md and strategy\/diagnosis\.md: two writers/,
  ]) assert.match(r.out, want);
});

test("real hub: freshness headers are valid", () => {
  const r = run("freshness.mjs");
  assert.equal(r.code, 0, r.out);
});

test("real hub: skills pass the structural check", () => {
  const r = run("route.mjs", "--check");
  assert.equal(r.code, 0, r.out);
});
