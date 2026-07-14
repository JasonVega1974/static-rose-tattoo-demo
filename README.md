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

## Rebranding for a paying artist

Everything an artist changes is localized. Search `index.html` for **"Rebrand note"** comments, then:

1. **Identity:** studio/artist name (nav brand, hero `h1`, titles, footer), `<title>`, meta description, og tags, JSON-LD names, favicon colors if desired.
2. **Photos:** the CSS art is designed to be swapped without layout changes —
   - Hero portrait: drop `<img src="assets/portrait.jpg" alt="…">` inside `.portrait`; the ink-wash mark treatment disappears automatically (`:not(:has(img))` pattern).
   - Gallery: in each tile, replace `<span class="tile__art art a-…">` with `<img class="tile__art" src="assets/gallery/<slug>.jpg" alt="…">` and update `data-title` / `data-tag` (the lightbox reads those). With real images, also update `lbRender` in the script to show the tile's image on the stage instead of the `data-art` class.
   - Flash cards: same swap inside `.flash-card__art`; About photo: `<img>` inside `.about__photo`.
3. **Contact:** phone `(208) 555-0177` (footer + desktop toast text in the script), `books@staticrosetattoo.com` (form alt link, socials, footer, error message), Instagram/DM links — currently routed to `https://systemsbyvega.com` because the demo handle is fictional; point them at the artist's real profile.
4. **Lead inbox:** `LEAD.email` in the script → artist's inbox, then redo the one-time FormSubmit activation.
5. **Business facts:** stats (years / pieces / studio), flash names + prices, deposit amount ($100 appears in step 2, the consent line, and the FAQ), FAQ policies, bio, credential chips.
6. **Footer credit:** keep or renegotiate the "Concept build by Systems by Vega" line; remove the "fictional studio" disclosure once the site represents a real business.
7. **URLs:** canonical / og:url / JSON-LD `url`,`@id`s → the artist's domain; add a real `og:image` (1200×630) and switch `twitter:card` back to `summary_large_image`.

## Design tokens

Ink near-black `#0a0a0d` / `#101014` / `#16151b` · blood-crimson `#c42b3d` (bright `#e0475a`, deep `#6e1622`) · bone `#ede4d3`, muted `#a89d8d` · antique gold `#c9a86a` (flash prices only) · fonts **Cormorant Unicase** (display) + **Space Grotesk** (body).
