#!/usr/bin/env node
// Router for the README task lookup, and the structural check for built skills.
//
//   node <hub>/core/_system/scripts/route.mjs --goal "<what the person asked for>"
//   node <hub>/core/_system/scripts/route.mjs --task <skill>
//   node <hub>/core/_system/scripts/route.mjs --list
//   node <hub>/core/_system/scripts/route.mjs --check
//   (all take --hub <dir>; default: this hub)
//
// --goal is a plain word match against the README task table and each built skill's
// description and when_to_use. It is a fallback for platforms that do not list skills,
// not a substitute for reading the request: no match, or a tie, routes to start-here,
// which the README names for unclear or multi-step requests.
//
// --check enforces the hard rules a skill's frontmatter can break (CONVENTIONS sections
// 2 and 3, README hard rules 5 and 6): valid frontmatter, name matches folder, every
// built skill listed in the README table, `live: act` only for ad-launch and ad-manage,
// reads and writes inside the business ads/ folder, one writer per file or section,
// only ad-review writes learnings, SKILL.md at most 500 lines. Exit 1 on any failure.

import path from "node:path";
import { DEFAULT_HUB, parseArgs, UsageError, loadSkills, taskTable, run, isMain } from "./lib.mjs";

const LIVE_ACT = ["ad-launch", "ad-manage"];
const LAYERS = ["research", "strategy", "creative", "operations", "review"];
const LIVE = ["none", "prepare", "act"];
const FALLBACK = "start-here";
const STOP = new Set("a an and are as at be but by can do does for from get go has have how i in into is it its me my of on or our should so that the their them then there these this to us was we what when where which who why will with you your ad ads help need want please just some".split(" "));

export function words(text) {
  return new Set(
    String(text).toLowerCase().split(/[^a-z0-9]+/)
      .filter((w) => w.length > 2 && !STOP.has(w))
      .map((w) => w.replace(/(ing|ers|er|ed|es|s)$/, "").replace(/e$/, "")),
  );
}

function catalogue(hub) {
  const rows = taskTable(hub);
  const skills = loadSkills(hub);
  return rows.map((r) => ({ ...r, built: skills.find((s) => s.name === r.skill) || null }));
}

function card(entry) {
  const s = entry.built;
  const lines = [`Start with: ${entry.skill}${s ? "" : " (not built yet; its brief is in BUILD-PLAN.md)"}`, `Job: ${entry.job}`];
  if (s) {
    lines.push(`Load: ${path.relative(path.resolve(s.file, "../../../.."), s.file)}`);
    lines.push(`Reads: ${s.reads.join(", ") || "nothing declared"}`);
    lines.push(`Writes: ${s.writes.join(", ") || "nothing declared"}`);
    lines.push(`Live account: ${s.live}${s.live === "act" ? ". Check ads/authority.md first (core/_system/spend-authority.md)." : ""}`);
    lines.push(`Context: node core/_system/scripts/context.mjs --for ${s.name} --root <business repo>`);
  }
  return lines.join("\n");
}

export function route(hub, goal) {
  const cat = catalogue(hub);
  const g = words(goal);
  const scored = cat.map((e) => {
    const text = [e.job, e.skill.replace(/-/g, " "), e.built?.description, e.built?.whenToUse].join(" ");
    const w = words(text);
    return { e, score: [...g].filter((x) => w.has(x)).length };
  }).sort((a, b) => b.score - a.score);
  const top = scored[0];
  const tied = scored.filter((x) => x.score === top.score && x.score > 0);
  if (!top || top.score === 0 || tied.length > 1) {
    const fallback = cat.find((e) => e.skill === FALLBACK);
    const why = !top || top.score === 0 ? "no clear match" : `tie between ${tied.map((x) => x.e.skill).join(", ")}`;
    return { entry: fallback, why, others: scored.filter((x) => x.score > 0).slice(0, 3) };
  }
  return { entry: top.e, why: `matched ${top.score} word(s)`, others: scored.slice(1).filter((x) => x.score > 0).slice(0, 2) };
}

export function check(hub) {
  const errors = [];
  const rows = taskTable(hub);
  const listed = rows.map((r) => r.skill);
  if (!rows.length) errors.push("README.md has no Task lookup table rows");
  listed.filter((s, i) => listed.indexOf(s) !== i).forEach((s) => errors.push(`README task table lists ${s} twice`));
  const skills = loadSkills(hub);
  const owners = [];
  for (const s of skills) {
    const where = `core/skills/${s.folder}/SKILL.md`;
    if (!s.fm || !s.name) { errors.push(`${where}: missing frontmatter or name`); continue; }
    if (s.name !== s.folder) errors.push(`${where}: name "${s.name}" does not match folder`);
    if (!s.description) errors.push(`${where}: description is empty`);
    if (!s.adhub.version) errors.push(`${where}: metadata.adhub.version missing`);
    if (!LAYERS.includes(s.layer)) errors.push(`${where}: layer must be one of ${LAYERS.join(", ")}`);
    if (!LIVE.includes(s.live)) errors.push(`${where}: live must be one of ${LIVE.join(", ")}`);
    if (s.live === "act" && !LIVE_ACT.includes(s.name)) errors.push(`${where}: live: act is allowed only for ${LIVE_ACT.join(" and ")}`);
    if (!listed.includes(s.name)) errors.push(`${where}: not listed in the README task table`);
    const lines = s.text.split("\n").length;
    if (lines > 500) errors.push(`${where}: ${lines} lines, more than 500`);
    for (const p of [...s.reads, ...s.writes]) {
      if (typeof p !== "string" || p.startsWith("/") || p.startsWith("ads/") || p.split("/").includes("..")) {
        errors.push(`${where}: "${p}" must be a path inside the business ads/ folder, written without the ads/ prefix`);
      }
    }
    for (const w of s.writes) {
      const [file, sec] = String(w).split("#");
      owners.push({ skill: s.name, file, sec: sec || null });
      if (file === "learnings.md" && s.name !== "ad-review") errors.push(`${where}: only ad-review writes learnings.md`);
    }
  }
  for (let i = 0; i < owners.length; i++) {
    for (let j = i + 1; j < owners.length; j++) {
      const a = owners[i], b = owners[j];
      if (a.skill === b.skill || a.file !== b.file) continue;
      if (!a.sec || !b.sec || a.sec === b.sec) {
        errors.push(`${a.file}${a.sec ? `#${a.sec}` : ""} and ${b.file}${b.sec ? `#${b.sec}` : ""}: two writers (${a.skill}, ${b.skill})`);
      }
    }
  }
  return { errors, built: skills.length, listed: rows.length };
}

export function main(argv) {
  const args = parseArgs(argv, ["list", "check"]);
  const hub = path.resolve(args.hub || DEFAULT_HUB);
  if (args.check) {
    const { errors, built, listed } = check(hub);
    for (const e of errors) console.log(`FAIL  ${e}`);
    console.log(`${errors.length ? "Check failed" : "Check passed"}: ${built} built skill(s), ${listed} in the README task table, ${errors.length} problem(s).`);
    return errors.length ? 1 : 0;
  }
  if (args.list) {
    for (const e of catalogue(hub)) console.log(`${e.built ? "built    " : "not built"}  ${e.skill.padEnd(18)} ${e.job}`);
    return 0;
  }
  if (args.task) {
    const e = catalogue(hub).find((x) => x.skill === args.task);
    if (!e) throw new UsageError(`"${args.task}" is not in the README task table`);
    console.log(card(e));
    return 0;
  }
  if (args.goal) {
    const r = route(hub, args.goal);
    console.log(card(r.entry));
    console.log(`Why: ${r.why}.`);
    if (r.others.length) console.log(`Also matched: ${r.others.map((x) => x.e.skill).join(", ")}`);
    return 0;
  }
  throw new UsageError('usage: route.mjs (--goal "<request>" | --task <skill> | --list | --check)');
}

if (isMain(import.meta.url)) run(main);
