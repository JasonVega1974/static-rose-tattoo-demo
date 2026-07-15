#!/usr/bin/env node
/**
 * clone.mjs — stamp out a customized copy of the Static Rose Tattoo site for a buyer.
 *
 * Bare Node 20+. Zero dependencies, no npm install, native APIs only.
 *
 *   node tools/clone.mjs --name "Boise Ink House" --slug boise-ink-house \
 *     --owner buyerGithubUser --repo boise-ink-house-site \
 *     --email owner@studio.com --phone "(208) 555-0123" --city "Boise, ID" \
 *     --artist "Jamie Fox" [--out DIR]
 *
 * Copies index.html, admin/index.html, content.json and SETUP.md into --out,
 * rewriting the demo brand/contact strings and the admin's OWNER/REPO config.
 * Strips the fictional-business disclosure. KEEPS the Systems by Vega credit.
 */

import fs from "node:fs";
import path from "node:path";
import { parseArgs } from "node:util";
import { fileURLToPath } from "node:url";

const SITE = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

/* ------------------------------------------------------------------ *
 * REPLACEMENTS — every demo-brand variant that actually appears in the
 * files (populated by grepping index.html / admin/index.html / content.json).
 * ORDER MATTERS: longest / most specific first, so "Static Rose Tattoo"
 * is consumed before the bare "Static Rose" rule can touch it.
 * ------------------------------------------------------------------ */
const REPLACEMENTS = (v) => [
  // --- URLs & slugs (before bare-word rules) ---
  ["https://jasonvega1974.github.io/static-rose-tattoo-demo/", v.siteUrl],
  ["static-rose-tattoo-demo", v.repo],
  ["static-rose-tattoo", v.slug],

  // --- email / handle domains (before brand-name rules) ---
  ["books@staticrosetattoo.com", v.email],
  ["@staticrosetattoo", "@" + v.handle],
  ["staticrosetattoo.com", v.domain],
  ["staticrosetattoo", v.handle],
  ["info@kingdom-creatives.com", v.leadEmail],

  // --- brand name, exact-case variants ---
  ["STATIC ROSE TATTOO", v.name.toUpperCase()],
  ["Static Rose Tattoo", v.name],
  ["STATIC ROSE", v.short.toUpperCase()],
  ["Static Rose", v.short],

  // --- artist name (10x "Rae Costa", plus bare "Rae" in prose) ---
  ["Rae Costa", v.artist],
  [/\bRae\b/g, v.artistFirst],

  // --- contact details ---
  ["(208) 555-0177", v.phone],
  ["tel:+12085550177", "tel:+" + v.phoneDigits],
  ["Boise, Idaho", v.city],
  ["Boise, ID", v.city],
  [/\bBoise\b/g, v.cityShort],

  // --- admin config block ---
  [/\/\* SWAP:CONFIG \*\/[\s\S]*?\/\* \/SWAP:CONFIG \*\//,
    `/* SWAP:CONFIG */\n  var OWNER="${v.owner}", REPO="${v.repo}", BRANCH="main";\n  /* /SWAP:CONFIG */`],
];

/* Strip the demo-only disclosure, the "Demo note:" comments, and the
   installer-only section of SETUP.md (the buyer copy has no tools/ dir). */
const DISCLOSURE_RE = /<!--\s*SWAP:DISCLOSURE\s*-->[\s\S]*?<!--\s*\/SWAP:DISCLOSURE\s*-->/g;
const DEMO_NOTE_RE = /<!--[^>]*?Demo note:[\s\S]*?-->\s*/g;
const INSTALLER_RE = /<!--\s*SWAP:INSTALLER\s*-->[\s\S]*?<!--\s*\/SWAP:INSTALLER\s*-->\s*/g;

const FILES = ["index.html", "admin/index.html", "content.json", "SETUP.md"];

const USAGE = `
clone.mjs — stamp out a customized copy of this site for a buyer.

Usage:
  node tools/clone.mjs --name "Boise Ink House" --slug boise-ink-house \\
    --owner buyerGithubUser --repo boise-ink-house-site \\
    --email owner@studio.com --phone "(208) 555-0123" \\
    [--city "Boise, ID"] [--artist "Jamie Fox"] [--out DIR]

Required:
  --name    Business name, as it should appear on the site
  --slug    URL-safe short name (lowercase, hyphens)
  --owner   Buyer's GitHub username (goes in the admin config)
  --repo    Buyer's GitHub repo name (goes in the admin config)
  --email   Public + booking-delivery email address
  --phone   Public phone number, e.g. "(208) 555-0123"

Optional:
  --city    City line, e.g. "Boise, ID"        (default: "Boise, ID")
  --artist  Artist's name                       (default: --name)
  --out     Output directory                    (default: ../<slug>/)
  --help    Show this message
`.trim();

function fail(msg) {
  console.error("Error: " + msg + "\n\n" + USAGE);
  process.exit(1);
}

/**
 * Two-pass replace. Every match is first swapped for an opaque sentinel, and
 * only at the end are sentinels expanded to the real values.
 *
 * This is what stops a later rule from chewing on an earlier rule's output —
 * e.g. --name "Boise Ink House" with --city "Meridian, ID": a naive sequential
 * pass would let the `\bBoise\b` -> city rule rewrite the brand name it had
 * just written, yielding "Meridian Ink House". Sentinels make the rule table
 * order-independent with respect to its own output.
 */
function applyAll(text, rules) {
  // A sentinel that cannot occur in HTML/JSON/Markdown source, so it can
  // never collide with real content and adds no characters of its own.
  const NUL = String.fromCharCode(0);
  const vals = [];
  rules.forEach(([from, to], i) => {
    const mark = NUL + i + NUL;
    vals[i] = to;
    text = typeof from === "string" ? text.split(from).join(mark) : text.replace(from, mark);
  });
  // function form => the value is inserted literally ($& etc. are not special)
  const markRe = new RegExp(NUL + "([0-9]+)" + NUL, "g");
  return text.replace(markRe, (_, i) => vals[Number(i)]);
}

function main() {
  let args;
  try {
    ({ values: args } = parseArgs({
      options: {
        name: { type: "string" }, slug: { type: "string" }, owner: { type: "string" },
        repo: { type: "string" }, email: { type: "string" }, phone: { type: "string" },
        city: { type: "string" }, artist: { type: "string" }, out: { type: "string" },
        help: { type: "boolean", short: "h" },
      },
      strict: true,
    }));
  } catch (e) {
    fail(e.message);
  }

  if (args.help) { console.log(USAGE); return; }

  for (const k of ["name", "slug", "owner", "repo", "email", "phone"]) {
    if (!args[k] || !String(args[k]).trim()) fail(`--${k} is required.`);
  }
  if (!/^[a-z0-9][a-z0-9-]*$/.test(args.slug)) fail("--slug must be lowercase letters, numbers and hyphens.");
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(args.email)) fail("--email doesn't look like an email address.");

  const phoneDigits = (() => {
    let d = String(args.phone).replace(/\D/g, "");
    if (d.length === 10) d = "1" + d;
    return d;
  })();
  if (phoneDigits.length < 11) fail("--phone needs at least 10 digits.");

  const name = args.name.trim();
  const city = (args.city || "Boise, ID").trim();
  const artist = (args.artist || name).trim();
  // "Static Rose Tattoo" -> "Static Rose": drop a trailing generic word so the
  // short brand lockup (nav, hero) reads naturally.
  const short = name.replace(/\s+(Tattoo|Tattoos|Studio|Ink|Co\.?|Company|LLC)$/i, "").trim() || name;

  const v = {
    name, short, artist,
    artistFirst: artist.split(/\s+/)[0],
    slug: args.slug, owner: args.owner.trim(), repo: args.repo.trim(),
    email: args.email.trim(), leadEmail: args.email.trim(),
    handle: args.slug.replace(/-/g, ""),
    domain: args.slug.replace(/-/g, "") + ".com",
    phone: args.phone.trim(), phoneDigits,
    city, cityShort: city.split(",")[0].trim(),
    siteUrl: `https://${args.owner.trim().toLowerCase()}.github.io/${args.repo.trim()}/`,
  };

  const out = path.resolve(args.out ? args.out : path.join(SITE, "..", v.slug));
  if (fs.existsSync(out) && fs.readdirSync(out).length > 0) {
    fail(`output directory is not empty: ${out}\nPick another --out, or remove it first.`);
  }

  const rules = REPLACEMENTS(v);
  for (const rel of FILES) {
    const src = path.join(SITE, rel);
    if (!fs.existsSync(src)) fail(`missing source file: ${rel}`);
    let text = fs.readFileSync(src, "utf8");

    if (rel.endsWith(".html")) {
      text = text.replace(DISCLOSURE_RE, "").replace(DEMO_NOTE_RE, "");
    }
    if (rel === "SETUP.md") {
      // the buyer copy has no tools/ dir — drop the installer-only section
      text = text.replace(INSTALLER_RE, "");
    }
    text = applyAll(text, rules);

    const dest = path.join(out, rel);
    fs.mkdirSync(path.dirname(dest), { recursive: true });
    fs.writeFileSync(dest, text);
    console.log("  wrote " + rel);
  }

  // fresh, minimal README for the buyer copy
  fs.writeFileSync(path.join(out, "README.md"), `# ${name}

The website for ${name} — one self-contained \`index.html\`, hosted free on GitHub Pages.
No frameworks, no build step, no backend.

Edit your own content at \`/admin/\` — gallery, flash, bio, prices, contact details.

**Start here: [SETUP.md](SETUP.md)** — getting live, activating the booking form,
creating your admin token, and what each admin tab does.

Built by [Systems by Vega](https://systemsbyvega.com).
`);
  console.log("  wrote README.md");

  console.log(`
Done → ${out}

Next steps:
  1. WEB-SEARCH "${name}" FIRST — check the name isn't already taken by a real
     business in the area (and that the domain/handles are free). Do this before
     anything else; renaming later is expensive.
  2. Review the output. Skim index.html for any leftover demo wording.
  3. Publish:
       cd "${out}"
       git init && git add -A && git commit -m "Initial site"
       git branch -M main
       git remote add origin https://github.com/${v.owner}/${v.repo}.git
       git push -u origin main
  4. On GitHub: create the repo ${v.owner}/${v.repo} (public) before pushing.
     Then Settings -> Pages -> Deploy from a branch -> main -> / (root).
  5. Live at ${v.siteUrl}
  6. Hand the owner SETUP.md and walk them through the token + PIN (section 2f-2g),
     and the one-time FormSubmit activation (section 2e).
`);
}

main();
