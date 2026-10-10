#!/usr/bin/env node
// Freshness checker for dated reference files (core/_system/CONVENTIONS.md section 6).
//
//   node <hub>/core/_system/scripts/freshness.mjs [files...] [--root <dir>] [--strict]
//        [--due-days 7] [--today YYYY-MM-DD]
//
// A dated file carries, in its first 15 lines:
//   last-verified: YYYY-MM-DD · ttl-days: N · refresh: <exact instruction>
// With no files given, every Markdown file under --root (default: the hub) that has a
// last-verified line is checked. Test fixtures are skipped.
//
// Each file is reported as fresh, due soon, expired (with its refresh instruction), or
// broken (a last-verified line without a valid date, ttl-days or refresh).
// Exit codes: 0 fine; 1 something expired and --strict was given; 2 a broken header or
// a usage error. Expiry alone exits 0 without --strict, so the build gate catches
// broken headers while the refresh routine decides what to refresh.

import { readFileSync, existsSync } from "node:fs";
import path from "node:path";
import { DEFAULT_HUB, parseArgs, UsageError, today, parseDate, daysBetween, markdownFiles, run, isMain } from "./lib.mjs";

const HEADER_LINES = 15;

export function readHeader(file) {
  const head = readFileSync(file, "utf8").split("\n").slice(0, HEADER_LINES).join("\n");
  if (!/^\s*last-verified:/m.test(head)) return null;
  const date = head.match(/last-verified:\s*(\S+)/);
  const ttl = head.match(/ttl-days:\s*(\S+)/);
  const refresh = head.match(/refresh:\s*(.+)/);
  const problems = [];
  const verified = date && parseDate(date[1].replace(/[·,]$/, ""));
  if (!verified) problems.push("last-verified is not a YYYY-MM-DD date");
  const days = ttl && /^\d+$/.test(ttl[1]) ? Number(ttl[1]) : null;
  if (days === null) problems.push("ttl-days is missing or not a whole number");
  if (!refresh || !refresh[1].trim()) problems.push("refresh instruction is missing");
  return { verified, days, refresh: refresh ? refresh[1].trim() : "", problems };
}

export function main(argv) {
  const args = parseArgs(argv, ["strict"]);
  const now = today(args.today);
  const dueDays = Number(args["due-days"] ?? 7);
  const root = path.resolve(args.root || DEFAULT_HUB);
  let files;
  if (args._.length) {
    files = args._.map((f) => path.resolve(f));
    const missing = files.filter((f) => !existsSync(f));
    if (missing.length) throw new UsageError(`not found: ${missing.join(", ")}`);
  } else {
    files = markdownFiles(root).filter((f) => !f.split(path.sep).join("/").includes("/test/fixtures/"));
  }

  const rows = [];
  for (const f of files) {
    const h = readHeader(f);
    const rel = path.relative(root, f) || f;
    if (!h) {
      if (args._.length) rows.push({ rel, state: "broken", detail: "no last-verified line in the first 15 lines" });
      continue;
    }
    if (h.problems.length) { rows.push({ rel, state: "broken", detail: h.problems.join("; ") }); continue; }
    const age = daysBetween(h.verified, now);
    const left = h.days - age;
    const due = h.verified.toISOString().slice(0, 10);
    if (left < 0) rows.push({ rel, state: "expired", detail: `verified ${due}, ${-left} days past its ${h.days}-day life. Refresh: ${h.refresh}` });
    else if (left <= dueDays) rows.push({ rel, state: "due soon", detail: `expires in ${left} days. Refresh: ${h.refresh}` });
    else rows.push({ rel, state: "fresh", detail: `expires in ${left} days` });
  }

  if (!rows.length) console.log("No dated reference files found.");
  for (const r of rows) console.log(`${r.state.padEnd(8)}  ${r.rel}: ${r.detail}`);
  const broken = rows.filter((r) => r.state === "broken").length;
  const expired = rows.filter((r) => r.state === "expired").length;
  if (rows.length) console.log(`\n${rows.length} checked: ${expired} expired, ${broken} broken.`);
  if (broken) return 2;
  if (expired && args.strict) return 1;
  return 0;
}

if (isMain(import.meta.url)) run(main);
