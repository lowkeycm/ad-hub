// Shared helpers for the Ad-Hub scripts. Node standard library only.
//
// The scripts read the hub's own files at run time (skill frontmatter, the README
// task table, freshness headers) so there is no second copy of any rule to drift.

import { readFileSync, readdirSync, existsSync, statSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { spawnSync } from "node:child_process";

export const DEFAULT_HUB = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../../..");

// Parse command-line flags. `--name value`, bare `--flag` becomes true, the rest are positional.
export function parseArgs(argv, booleans = []) {
  const out = { _: [] };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (!a.startsWith("--")) { out._.push(a); continue; }
    const key = a.slice(2);
    if (booleans.includes(key)) out[key] = true;
    else if (i + 1 < argv.length) out[key] = argv[++i];
    else throw new UsageError(`--${key} needs a value`);
  }
  return out;
}

export class UsageError extends Error {}

function scalar(v) {
  v = v.trim();
  if ((v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'"))) return v.slice(1, -1);
  if (v.startsWith("[") && v.endsWith("]")) {
    const inner = v.slice(1, -1).trim();
    return inner ? inner.split(",").map((s) => scalar(s)) : [];
  }
  return v;
}

// Frontmatter parser for the subset the conventions use: nested maps by indentation,
// flow lists [a, b], block lists (- a), quoted or plain scalars, # comments.
export function frontmatter(text) {
  const m = text.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!m) return null;
  const root = {};
  const stack = [{ indent: -1, obj: root }];
  for (const raw of m[1].split(/\r?\n/)) {
    const line = raw.replace(/\s+#.*$/, "");
    if (!line.trim() || line.trim().startsWith("#")) continue;
    const indent = line.length - line.trimStart().length;
    const t = line.trim();
    while (stack.length > 1 && indent <= stack[stack.length - 1].indent) stack.pop();
    const top = stack[stack.length - 1];
    if (t.startsWith("- ")) {
      // Block list item: the open key becomes a list the first time one appears.
      if (top.key && !Array.isArray(top.obj) && Object.keys(top.obj).length === 0) {
        top.obj = top.parent[top.key] = [];
      }
      if (Array.isArray(top.obj)) top.obj.push(scalar(t.slice(2)));
      continue;
    }
    const kv = t.match(/^([A-Za-z0-9_-]+):\s*(.*)$/);
    if (!kv || Array.isArray(top.obj)) continue;
    const [, key, val] = kv;
    if (val === "") {
      top.obj[key] = {};
      stack.push({ indent, obj: top.obj[key], key, parent: top.obj });
    } else {
      top.obj[key] = scalar(val);
    }
  }
  return root;
}

export function asList(v) {
  if (v === undefined || v === null || v === "") return [];
  if (Array.isArray(v)) return v;
  if (typeof v === "object") return Object.keys(v).length ? [v] : [];
  return [v];
}

// Every built skill: core/skills/<name>/SKILL.md with its parsed frontmatter.
export function loadSkills(hub) {
  const dir = path.join(hub, "core", "skills");
  if (!existsSync(dir)) return [];
  const skills = [];
  for (const name of readdirSync(dir).sort()) {
    const file = path.join(dir, name, "SKILL.md");
    if (!existsSync(file)) continue;
    const text = readFileSync(file, "utf8");
    const fm = frontmatter(text) || {};
    const ad = (fm.metadata && fm.metadata.adhub) || {};
    skills.push({
      folder: name,
      file,
      text,
      fm,
      name: fm.name,
      description: fm.description || "",
      whenToUse: asList(fm.when_to_use).join(" "),
      reads: asList(ad.reads),
      writes: asList(ad.writes),
      live: ad.live,
      layer: ad.layer,
      version: ad.version,
      adhub: ad,
    });
  }
  return skills;
}

// Rows of the README "Task lookup" table: { job, skill }.
export function taskTable(hub) {
  const readme = readFileSync(path.join(hub, "README.md"), "utf8");
  const sec = readme.split(/^## Task lookup\s*$/m)[1];
  if (!sec) return [];
  const rows = [];
  for (const line of sec.split(/^## /m)[0].split("\n")) {
    const m = line.match(/^\|\s*(.+?)\s*\|\s*`([a-z0-9-]+)`\s*\|\s*$/);
    if (m) rows.push({ job: m[1], skill: m[2] });
  }
  return rows;
}

export function parseDate(s) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(String(s))) return null;
  const d = new Date(`${s}T00:00:00Z`);
  return Number.isNaN(d.getTime()) || d.toISOString().slice(0, 10) !== s ? null : d;
}

export function today(arg) {
  if (arg) {
    const d = parseDate(arg);
    if (!d) throw new UsageError(`--today must be YYYY-MM-DD, got ${arg}`);
    return d;
  }
  return parseDate(new Date().toISOString().slice(0, 10));
}

export const daysBetween = (a, b) => Math.round((b - a) / 86400000);

// When a file was last updated: its own `updated:` or `last-verified:` line, then git,
// then the file system. Returns { date: "YYYY-MM-DD", source }.
export function fileDate(file, root) {
  const head = readFileSync(file, "utf8").split("\n").slice(0, 15).join("\n");
  const own = head.match(/^\s*(?:updated|last-verified):\s*(\d{4}-\d{2}-\d{2})/m);
  if (own && parseDate(own[1])) return { date: own[1], source: "file header" };
  const git = spawnSync("git", ["-C", root, "log", "-1", "--format=%cs", "--", path.relative(root, file)], { encoding: "utf8" });
  if (git.status === 0 && /^\d{4}-\d{2}-\d{2}/.test(git.stdout.trim())) return { date: git.stdout.trim(), source: "last commit" };
  return { date: statSync(file).mtime.toISOString().slice(0, 10), source: "file system" };
}

// Markdown files under a folder, skipping hidden folders, dependencies and the given names.
export function markdownFiles(root, { skip = [], maxDepth = 6 } = {}) {
  const out = [];
  const walk = (dir, depth) => {
    if (depth > maxDepth) return;
    for (const e of readdirSync(dir, { withFileTypes: true }).sort((a, b) => a.name.localeCompare(b.name))) {
      const p = path.join(dir, e.name);
      const rel = path.relative(root, p);
      if (e.isDirectory()) {
        if (e.name.startsWith(".") || e.name === "node_modules" || skip.includes(rel)) continue;
        walk(p, depth + 1);
      } else if (e.name.endsWith(".md")) out.push(p);
    }
  };
  walk(root, 0);
  return out;
}

// True when this module is the script being run, not an import.
export const isMain = (url) => Boolean(process.argv[1]) && path.resolve(process.argv[1]) === fileURLToPath(url);

// Run a CLI main() with consistent exit codes: 2 for usage errors.
export function run(main) {
  try {
    process.exitCode = main(process.argv.slice(2)) ?? 0;
  } catch (e) {
    if (e instanceof UsageError) {
      console.error(e.message);
      process.exitCode = 2;
    } else throw e;
  }
}
