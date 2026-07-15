# Static Rose Tattoo — live concept demo

A complete one-page site for **Static Rose Tattoo**, a *fictional* private tattoo studio in Boise, Idaho (artist: "Rae Costa"). Built by **Systems by Vega** as a pitchable concept demo for real Boise-area tattoo artists.

- **Status:** demo-ready. Zero unresolved placeholders — every SWAP marker has been replaced with final fictional content.
- **Deploy target:** `https://jasonvega1974.github.io/static-rose-tattoo-demo/` (canonical, og:url and JSON-LD already point there).
- **Stack:** one `index.html`, vanilla HTML/CSS/JS. No frameworks, no build step, no backend. Only external requests: Google Fonts (Cormorant Unicase + Space Grotesk) and the FormSubmit lead endpoint.
- **Disclosure:** the footer carries "Demonstration website for a fictional studio · Concept build by Systems by Vega." The phone number `(208) 555-0177` is in the reserved fictional range and stays that way on the demo.

## What the demo shows

- Fixed nav + full-viewport identity hero (ink-mote animation, CSS ink-wash portrait mark)
- **Signature: filterable portfolio gallery + lightbox** — 5 style filters over 12 pure-CSS "ink study" tiles (each a distinct gradient/pattern composition with a shared vignette), zero-dependency lightbox with prev/next, Esc/arrow keys, focus handling, click-outside close; navigation respects the active filter
- **Flash strip** — 4 priced designs; "Claim this flash" pre-fills the booking form (style → Flash, budget → flash price, removable claimed-design field). Deep link: `?flash=Thorned%20Heart` pre-claims on load
- About with fictional bio + credential chips, 3-step booking process, native-details FAQ (deposit, pain, touch-ups, aftercare, cover-ups, age/ID)
- Booking form: validation, honeypot, FormSubmit `fetch`, personalized success card
- Socials row, footer, sticky mobile Book/DM bar, reveal-on-scroll, `prefers-reduced-motion` kill-switch, JSON-LD (`TattooParlor` + `Person`), inline SVG favicon

## Lead delivery (FormSubmit)

The form POSTs JSON to `https://formsubmit.co/ajax/info@kingdom-creatives.com` (see `LEAD` in the script). **One-time activation:** the first real submission makes FormSubmit email an activation link to that inbox — click it once and every subsequent request is delivered, subject "Booking request — Static Rose Tattoo." Visible copy on the page uses the fictional `books@staticrosetattoo.com`; only the invisible delivery address is real.

## Deploy to GitHub Pages

1. Create the repo `static-rose-tattoo-demo` under `jasonvega1974` and push this folder's contents.
2. **Settings → Pages → Source: Deploy from a branch**, branch `main`, folder `/ (root)`.
3. Live at `https://jasonvega1974.github.io/static-rose-tattoo-demo/` within a couple of minutes. No build step — the file is the site.
4. After deploy, submit the form once and click FormSubmit's activation link (see above).

## Owner admin, buyer handoff & cloning

The site now ships with the SiteLab owner-admin pattern (same architecture as domvegz, proven live):

- **`content.json`** (repo root) — the live content override. `DEFAULT_CONTENT` inline in `index.html` (~line 952) is the fallback that ships with the page and renders immediately; `content.json` is fetched at runtime and merged over it (`Object.assign`). A 404/offline just leaves the defaults standing — the page never hard-fails. **Keep the two shapes in sync**: `brand`, `stats`, `gallery`, `flash`, `bio`, `chips`, `social`, `settings`. Both `renderContent()` and the admin panel depend on those exact keys.
- **`admin/index.html`** — PIN-gated, 100% client-side admin. The owner pastes a fine-grained GitHub PAT once; it's AES-GCM encrypted with a PIN (PBKDF2, 250k iterations) and stored **only in that browser's localStorage** (key `srt_enc`) — never in the repo. Saves go straight to the GitHub Contents API. Tabs: Gallery, Flash, About, Credentials, Stats, Social, Contact, Booking. Gallery and Flash have image upload (files land in `assets/img/`). Live in ~1 minute after Save.
- **`SETUP.md`** — the non-technical buyer handoff guide: what they own, one-time setup (Pages, custom domain + DNS, FormSubmit activation, token creation, first login), everyday editing per tab, and security notes. Ends with a "For the installer" section for Jason.
- **`tools/clone.mjs`** — stamps out a customized copy for a new buyer. Bare Node 20, zero deps:
  ```bash
  node tools/clone.mjs --name "Boise Ink House" --slug boise-ink-house \
    --owner buyerGithubUser --repo boise-ink-house-site \
    --email owner@studio.com --phone "(208) 555-0123" \
    --city "Meridian, ID" --artist "Jamie Fox" [--out DIR]
  ```
  Rewrites every demo-brand variant, contact details, the FormSubmit destination, and the admin's `/* SWAP:CONFIG */` block; strips the `<!-- SWAP:DISCLOSURE -->` block and the installer-only part of SETUP.md; **keeps the Systems by Vega credit**. `--help` for full usage. Refuses to overwrite a non-empty `--out`.

## Rebranding for a paying artist

> Most of this is now handled by `/admin/` (content) and `tools/clone.mjs` (identity/contact). This section is the manual fallback.

Everything an artist changes is localized. Search `index.html` for **"Rebrand note"** comments, then:

1. **Identity:** studio/artist name (nav brand, hero `h1`, titles, footer), `<title>`, meta description, og tags, JSON-LD names, favicon colors if desired.
2. **Photos:** the CSS art is designed to be swapped without layout changes —
   - Hero portrait: drop `<img src="assets/portrait.jpg" alt="…">` inside `.portrait`; the ink-wash mark treatment disappears automatically (`:not(:has(img))` pattern).
   - Gallery + flash: **use `/admin/` instead** — upload a photo on a Gallery/Flash card and it's stored in `content.json` as `image`. `renderGallery()` swaps the CSS art for an `<img>`, and `lbRender()` already shows the photo on the lightbox stage; leave `image` empty to keep the built-in drawing. No code edit needed.
   - Flash cards: same swap inside `.flash-card__art`; About photo: `<img>` inside `.about__photo`.
3. **Contact:** phone `(208) 555-0177` (footer + desktop toast text in the script), `books@staticrosetattoo.com` (form alt link, socials, footer, error message), Instagram/DM links — currently routed to `https://systemsbyvega.com` because the demo handle is fictional; point them at the artist's real profile.
4. **Lead inbox:** `LEAD.email` in the script → artist's inbox, then redo the one-time FormSubmit activation.
5. **Business facts:** stats (years / pieces / studio), flash names + prices, deposit amount ($100 appears in step 2, the consent line, and the FAQ), FAQ policies, bio, credential chips.
6. **Footer credit:** keep or renegotiate the "Concept build by Systems by Vega" line; remove the "fictional studio" disclosure once the site represents a real business.
7. **URLs:** canonical / og:url / JSON-LD `url`,`@id`s → the artist's domain; add a real `og:image` (1200×630) and switch `twitter:card` back to `summary_large_image`.

## Design tokens

Ink near-black `#0a0a0d` / `#101014` / `#16151b` · blood-crimson `#c42b3d` (bright `#e0475a`, deep `#6e1622`) · bone `#ede4d3`, muted `#a89d8d` · antique gold `#c9a86a` (flash prices only) · fonts **Cormorant Unicase** (display) + **Space Grotesk** (body).
