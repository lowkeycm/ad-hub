#!/usr/bin/env node
// Context loader: gives one skill exactly the business files it declares, and nothing else.
//
//   node <hub>/core/_system/scripts/context.mjs --for <skill> [--root <business repo>]
//        [--offer <slug>] [--stale-days 90] [--today YYYY-MM-DD] [--hub <dir>]
//
// Reads the skill's `metadata.adhub.reads` list from its SKILL.md frontmatter, resolves
// each entry inside the business repo's ads/ folder, and prints one Markdown block:
// each file's content (or the named #section) with its date and age, folders as file
// lists, and absent files with the skill that writes them. It also lists the business
// repo's other Markdown files by title, so the agent can find existing business context
// by meaning without fixed file names (memory contract, "Two kinds of context").
//
// Missing files never block: absence is reported, exit code stays 0. Exit 2 is a usage
// error (unknown skill, missing repo). Rules: core/_system/memory-contract.md.

import { readFileSync, readdirSync, existsSync, statSync } from "node:fs";
import path from "node:path";
import {
  DEFAULT_HUB, parseArgs, UsageError, loadSkills, today, daysBetween, parseDate,
  fileDate, markdownFiles, run, isMain,
} from "./lib.mjs";

const MAX_CONTEXT_FILES = 60;

// "offers/<offer>.md" -> regex over paths relative to ads/. Trailing "/" is a folder.
function patternRegex(p) {
  const esc = p.replace(/[.+?^${}()|[\]\\]/g, "\\$&").replace(/<[a-z-]+>/g, "[^/]+");
  return new RegExp(`^${esc}${p.endsWith("/") ? ".*" : ""}$`);
}

function filesUnder(dir) {
  if (!existsSync(dir)) return [];
  const out = [];
  const walk = (d) => {
    for (const e of readdirSync(d, { withFileTypes: true }).sort((a, b) => a.name.localeCompare(b.name))) {
      const p = path.join(d, e.name);
      if (e.isDirectory()) walk(p);
      else out.push(path.relative(dir, p).split(path.sep).join("/"));
    }
  };
  walk(dir);
  return out;
}

const slug = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

// The part of a Markdown file under the heading whose slug matches, down to the next
// heading of the same or a higher level. null when no heading matches.
export function section(text, name) {
  const lines = text.split("\n");
  const want = slug(name);
  const start = lines.findIndex((l) => /^#{1,6}\s/.test(l) && slug(l.replace(/^#+\s*/, "")) === want);
  if (start < 0) return null;
  const level = lines[start].match(/^#+/)[0].length;
  let end = lines.length;
  for (let i = start + 1; i < lines.length; i++) {
    const h = lines[i].match(/^(#+)\s/);
    if (h && h[1].length <= level) { end = i; break; }
  }
  return lines.slice(start, end).join("\n").trim();
}

function title(file) {
  const text = readFileSync(file, "utf8");
  const body = text.replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n/, "");
  const h = body.match(/^#\s+(.+)$/m);
  const first = h ? h[1] : (body.split("\n").find((l) => l.trim()) || "").trim();
  return first.length > 90 ? `${first.slice(0, 87)}...` : first;
}

export function main(argv) {
  const args = parseArgs(argv);
  if (!args.for) throw new UsageError("usage: context.mjs --for <skill> [--root <business repo>] [--offer <slug>]");
  const hub = path.resolve(args.hub || DEFAULT_HUB);
  const root = path.resolve(args.root || process.cwd());
  if (!existsSync(root) || !statSync(root).isDirectory()) throw new UsageError(`business repo not found: ${root}`);
  const now = today(args.today);
  const staleDays = Number(args["stale-days"] ?? 90);

  const skills = loadSkills(hub);
  const skill = skills.find((s) => s.name === args.for || s.folder === args.for);
  if (!skill) {
    const built = skills.map((s) => s.name).join(", ") || "none yet";
    throw new UsageError(`no built skill named "${args.for}" in ${hub}/core/skills (built: ${built})`);
  }

  const ads = path.join(root, "ads");
  const adsFiles = filesUnder(ads);
  const offers = adsFiles.filter((f) => /^offers\/[^/]+\.md$/.test(f)).map((f) => f.slice(7, -3));
  let offer = args.offer || null;
  if (!offer && offers.length === 1 && skill.reads.some((r) => r.includes("<offer>"))) offer = offers[0];

  const writerOf = (rel) => skills
    .filter((s) => s.writes.some((w) => patternRegex(w.split("#")[0]).test(rel)))
    .map((s) => s.name);

  const out = [];
  const counts = { present: 0, absent: 0, stale: 0 };
  out.push(`# Ad-Hub context for ${skill.name}`);
  out.push("");
  out.push(`- Business repo: ${root}`);
  out.push(`- Offer: ${offer || (offers.length ? `not chosen (offers: ${offers.join(", ")})` : "none recorded yet")}`);
  out.push(`- Declared reads: ${skill.reads.length ? skill.reads.join(", ") : "none"}`);
  if (!existsSync(ads)) out.push("- No ads/ folder yet. Drafting can start from the request; start-here records the facts the business supplies.");
  out.push("");

  for (const entry of skill.reads) {
    const [rawPath, sec] = entry.split("#");
    const want = offer ? rawPath.replaceAll("<offer>", offer) : rawPath;
    const label = `ads/${want}${sec ? `#${sec}` : ""}`;
    if (want.includes("<offer>")) {
      out.push(`## ${label}`, "", `Needs an offer. Pass --offer <slug>${offers.length ? ` (offers: ${offers.join(", ")})` : ""}.`, "");
      continue;
    }
    const matches = /<[a-z-]+>|\/$/.test(want) ? adsFiles.filter((f) => patternRegex(want).test(f)) : (adsFiles.includes(want) ? [want] : []);
    if (!matches.length) {
      counts.absent++;
      const w = writerOf(want);
      out.push(`## ${label}`, "", `Absent. Written by ${w.length ? w.join(", ") : "no built skill yet"}. Proceed without it and say so.`, "");
      continue;
    }
    if (want.endsWith("/")) {
      out.push(`## ${label}`, "", `Folder, ${matches.length} file(s). Open only what the task needs:`);
      for (const m of matches) out.push(`- ads/${m} (${fileDate(path.join(ads, m), root).date})`);
      out.push("");
      counts.present++;
      continue;
    }
    for (const m of matches) {
      counts.present++;
      const file = path.join(ads, m);
      const d = fileDate(file, root);
      const age = daysBetween(parseDate(d.date), now);
      const stale = age > staleDays;
      if (stale) counts.stale++;
      const writers = writerOf(m);
      let text = readFileSync(file, "utf8").trim();
      let note = "";
      if (sec) {
        const part = section(text, sec);
        if (part === null) note = ` Section "${sec}" not found; whole file shown.`;
        else text = part;
      }
      if (path.basename(m) === "learnings.md" && offer) {
        const kept = text.split("\n").filter((l) => !/^- \[/.test(l) || l.includes(`[${offer}]`));
        text = kept.join("\n");
        note += ` Learnings filtered to offer "${offer}".`;
      }
      out.push(`## ads/${m}${sec ? `#${sec}` : ""}`);
      out.push("");
      out.push(`Updated ${d.date} (${d.source}), ${age} days old.${stale ? ` STALE: older than ${staleDays} days; refresh with ${writers.length ? writers.join(", ") : "the business"} or say it may be out of date.` : ""}${note}`);
      out.push("", text, "");
    }
  }

  const context = markdownFiles(root, { skip: ["ads"] });
  out.push("## Other business context (read by meaning; nothing loaded)", "");
  if (!context.length) out.push("No other Markdown files in the business repo.");
  for (const f of context.slice(0, MAX_CONTEXT_FILES)) out.push(`- ${path.relative(root, f)}: ${title(f)}`);
  if (context.length > MAX_CONTEXT_FILES) out.push(`- ...and ${context.length - MAX_CONTEXT_FILES} more`);
  out.push("");
  out.push(`Summary: ${counts.present} present, ${counts.absent} absent, ${counts.stale} stale.`);
  console.log(out.join("\n"));
  return 0;
}

if (isMain(import.meta.url)) run(main);
