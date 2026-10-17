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

test("regression cases: complete, named after real skills, and consistent with the schemas", async () => {
  const { readdirSync, readFileSync, existsSync } = await import("node:fs");
  const { taskTable } = await import("../lib.mjs");
  const hub = path.resolve(here, "../../../..");
  const dir = path.join(hub, "core/_system/regression");
  const skills = taskTable(hub).map((r) => r.skill);
  const index = readFileSync(path.join(dir, "README.md"), "utf8");
  const cases = readdirSync(dir).filter((d) => /^\d\d-/.test(d));
  assert.equal(cases.length, 5);
  for (const c of cases) {
    const at = (p) => path.join(dir, c, p);
    assert.ok(index.includes(`(${c}/evaluate.md)`), `${c} missing from the regression README`);
    assert.ok(existsSync(at("business/README.md")), `${c}: business/README.md missing`);
    assert.ok(!existsSync(at("business/evaluate.md")), `${c}: evaluate.md must stay outside business/`);
    const ev = readFileSync(at("evaluate.md"), "utf8");
    const requests = ev.split(/^## Requests\s*$/m)[1];
    assert.ok(requests, `${c}: no Requests section`);
    const named = [...requests.matchAll(/^### ([a-z-]+)/gm)].map((m) => m[1]);
    assert.ok(named.length >= 3, `${c}: fewer than three requests`);
    for (const s of named) assert.ok(skills.includes(s), `${c}: request for unknown skill ${s}`);
    const offersDir = at("business/ads/offers");
    const offers = existsSync(offersDir) ? readdirSync(offersDir).map((f) => f.replace(/\.md$/, "")) : [];
    for (const o of offers) {
      assert.match(readFileSync(path.join(offersDir, `${o}.md`), "utf8"), new RegExp(`^offer: ${o}$`, "m"), `${c}: offer slug does not match file name`);
    }
    if (existsSync(at("business/ads/ledger.md"))) {
      const rows = readFileSync(at("business/ads/ledger.md"), "utf8").split("\n").filter((l) => /^\| [a-z0-9-]+-\d{4}-\d{3}/.test(l));
      assert.ok(rows.length, `${c}: ledger has no rows`);
      for (const r of rows) {
        const [id, offer] = r.split("|").slice(1, 3).map((s) => s.trim());
        assert.ok(offers.includes(offer), `${c}: ledger offer ${offer} has no offer file`);
        assert.match(id, new RegExp(`^${offer}-\\d{4}-\\d{3}(-v\\d+)?$`), `${c}: ad ID ${id} does not follow the format`);
      }
    }
    const r = run("context.mjs", "--hub", fx("hub"), "--for", "ad-strategy", "--root", at("business"), "--today", "2026-10-08");
    assert.equal(r.code, 0, `${c}: context loader failed: ${r.err}`);
  }
});

test("installer: writes one pointer per built skill, keeps other hubs' pointers, clears stale ones", async () => {
  const fs = await import("node:fs");
  const os = await import("node:os");
  const { frontmatter } = await import("../lib.mjs");
  const hub = path.resolve(here, "../../../..");
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), "adhub-install-"));
  const biz = path.join(tmp, "biz");
  fs.cpSync(path.join(hub, "core/_system/regression/02-local-service/business"), biz, { recursive: true });
  const skills = path.join(biz, ".claude/skills");
  fs.mkdirSync(path.join(skills, "hub-paid-ads"), { recursive: true });
  fs.writeFileSync(path.join(skills, "hub-paid-ads/SKILL.md"), "keep");
  fs.mkdirSync(path.join(skills, "adhub-retired-skill"), { recursive: true });
  const install = (...a) => {
    const r = spawnSync(process.execPath, [path.join(hub, "install/adhub-skills.mjs"), ...a], { encoding: "utf8" });
    return { code: r.status, out: r.stdout, err: r.stderr };
  };
  try {
    const r = install("--root", biz, "--hub", fx("hub"));
    assert.equal(r.code, 0, r.err);
    assert.match(r.out, /wrote 3 Ad-Hub skill pointer\(s\)/);
    assert.deepEqual(fs.readdirSync(skills).sort(), ["adhub-ad-review", "adhub-ad-strategy", "adhub-audience-research", "hub-paid-ads"]);
    assert.equal(fs.readFileSync(path.join(skills, "hub-paid-ads/SKILL.md"), "utf8"), "keep");
    const text = fs.readFileSync(path.join(skills, "adhub-ad-strategy/SKILL.md"), "utf8");
    assert.equal(frontmatter(text).name, "adhub-ad-strategy");
    assert.match(frontmatter(text).description, /^Decide what to make and test next for one offer\. Use when: /);
    const target = text.match(/Read `([^`]+)`/)[1];
    assert.ok(fs.existsSync(path.isAbsolute(target) ? target : path.resolve(biz, target)), `pointer target missing: ${target}`);
    assert.match(text, /context\.mjs --for ad-strategy --root \./);

    const removed = install("--root", biz, "--remove");
    assert.match(removed.out, /removed 3 Ad-Hub skill pointer\(s\)/);
    assert.deepEqual(fs.readdirSync(skills), ["hub-paid-ads"]);

    assert.equal(install("--root", hub).code, 2, "must refuse to install into the hub itself");
    assert.match(install("--root", biz).out, /wrote \d+ Ad-Hub skill pointer\(s\)/);
  } finally {
    fs.rmSync(tmp, { recursive: true, force: true });
  }
});

test("installer hook: runs the generator when the hub is present, stays quiet when it is not", async () => {
  const fs = await import("node:fs");
  const os = await import("node:os");
  const hub = path.resolve(here, "../../../..");
  const hook = path.join(hub, "install/session-start.sh");
  assert.equal(spawnSync("bash", ["-n", hook]).status, 0, "hook syntax");
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), "adhub-hook-"));
  const env = (extra) => ({ ...process.env, CLAUDE_CODE_REMOTE: "true", CLAUDE_PROJECT_DIR: tmp, ...extra });
  try {
    const found = spawnSync("bash", [hook], { encoding: "utf8", env: env({ AD_HUB: hub }) });
    assert.equal(found.status, 0, found.stderr);
    assert.match(found.stdout, /Ad-Hub skill pointer\(s\)/);
    const missing = spawnSync("bash", [hook], { encoding: "utf8", env: env({ AD_HUB: path.join(tmp, "nowhere") }) });
    assert.equal(missing.status, 0, missing.stderr);
    assert.match(missing.stdout, /Ad-Hub not found at .*; adhub- skill pointers left as committed\./);
  } finally {
    fs.rmSync(tmp, { recursive: true, force: true });
  }
});
