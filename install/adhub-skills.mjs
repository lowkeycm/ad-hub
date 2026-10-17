#!/usr/bin/env node
// Ad-Hub skill pointers for a business repo.
//
//   node ../ad-hub/install/adhub-skills.mjs                  # from the business repo
//   node <hub>/install/adhub-skills.mjs --root <business repo>
//   node <hub>/install/adhub-skills.mjs --root <repo> --remove   # take them out again
//
// Writes one small .claude/skills/adhub-<name>/SKILL.md per built Ad-Hub skill. A pointer
// holds only the address of the real skill in this hub plus the order of operations, so
// the hub stays the single source and nothing is copied. A file under .claude/skills is
// listed for the whole session and loaded when a task matches it; a paragraph in
// AGENTS.md alone is read once and easily forgotten.
//
// Every run starts clean: existing adhub-* folders are removed and rewritten, so a skill
// removed from the hub disappears from the repo. Folders without the adhub- prefix, such
// as Marketing-Hub's hub-* pointers, are never touched. --hub overrides the hub location
// (used by the tests); by default it is the hub this file sits in.

import { writeFileSync, mkdirSync, readdirSync, existsSync, rmSync, statSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { parseArgs, UsageError, loadSkills, run, isMain } from "../core/_system/scripts/lib.mjs";

const PREFIX = "adhub-";

function pointer(skill, hubRef) {
  const p = (rel) => path.posix.join(hubRef, rel);
  const sentence = (t) => (/[.!?]$/.test(t.trim()) ? t.trim() : `${t.trim()}.`);
  const desc = [skill.description && sentence(skill.description), skill.whenToUse && sentence(`Use when: ${skill.whenToUse}`)]
    .filter(Boolean).join(" ").replace(/\s+/g, " ").replace(/"/g, "'").slice(0, 900);
  const live = skill.live === "act" || skill.live === "prepare"
    ? `4. Before anything reaches an ad account, read \`${p("core/_system/spend-authority.md")}\` and this
   repo's \`ads/authority.md\`. No authority file means read-only. Record any approval the
   operator gives in chat in the approvals log before acting on it.
`
    : "";
  const n = live ? 5 : 4;
  return `---
name: ${PREFIX}${skill.name}
description: "${desc} Ad-Hub skill; this repo is the business workspace. If Marketing-Hub is also installed here, say which hub you used and why."
---

# ${skill.name} (Ad-Hub)

This is a pointer. The skill lives in the Ad-Hub checkout and is the only source of
truth. Do not copy its content into this repo.

Do these in order, every time this skill runs:

1. Read \`${p(`core/skills/${skill.folder}/SKILL.md`)}\` in full now, and every reference it
   tells you to load. Reading it in an earlier session does not count.
2. Load this business's context the way the skill declares it:
   \`node ${p("core/_system/scripts/context.mjs")} --for ${skill.name} --root .\`
   Add \`--offer <slug>\` when the work is for one offer.
3. Follow the skill. Write only the files it owns, inside this repo's \`ads/\` folder.
   Nothing about this business is ever written into Ad-Hub.
${live}${n}. This repo's own rules in AGENTS.md (copy rules, identity strings, approvals) still
   apply. If a step cannot be done on this platform, say which one and why. Never skip it
   silently.
`;
}

export function main(argv) {
  const args = parseArgs(argv, ["remove"]);
  const hub = path.resolve(args.hub || path.join(path.dirname(fileURLToPath(import.meta.url)), ".."));
  const root = path.resolve(args.root || process.cwd());
  if (!existsSync(root) || !statSync(root).isDirectory()) throw new UsageError(`business repo not found: ${root}`);
  if (path.relative(hub, root) === "") throw new UsageError("--root is the hub itself; run this from a business repo");
  const out = path.join(root, ".claude", "skills");

  let removed = 0;
  for (const d of existsSync(out) ? readdirSync(out) : []) {
    if (d.startsWith(PREFIX)) { rmSync(path.join(out, d), { recursive: true }); removed++; }
  }
  if (args.remove) {
    console.log(`removed ${removed} Ad-Hub skill pointer(s) from ${path.relative(root, out) || out}`);
    return 0;
  }

  // How the business repo reaches the hub: relative when the two share a parent folder
  // (the normal side-by-side checkout), so the pointers work on any machine; the full
  // path when they only meet at the filesystem root.
  const rel = path.relative(root, hub);
  const ups = rel.split(path.sep).filter((x) => x === "..").length;
  const depth = root.split(path.sep).filter(Boolean).length;
  const hubRef = path.isAbsolute(rel) || ups >= depth ? hub.split(path.sep).join("/") : rel.split(path.sep).join("/");

  const skills = loadSkills(hub).filter((s) => s.name);
  for (const s of skills) {
    const dir = path.join(out, `${PREFIX}${s.name}`);
    mkdirSync(dir, { recursive: true });
    writeFileSync(path.join(dir, "SKILL.md"), pointer(s, hubRef));
  }
  const note = skills.length ? "" : " (no skills are built in the hub yet)";
  console.log(`wrote ${skills.length} Ad-Hub skill pointer(s) to ${path.relative(root, out) || out} (hub at ${hubRef})${note}`);
  return 0;
}

if (isMain(import.meta.url)) run(main);
