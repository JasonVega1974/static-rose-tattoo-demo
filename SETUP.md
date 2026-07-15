# Static Rose Tattoo — Setup & Owner's Guide

Everything you need to get this site live and run it yourself. No coding.

---

## 1. What you own

- **A one-file website.** The whole public site is a single `index.html`. No plugins to update, nothing to break.
- **Hosted free on GitHub Pages.** No monthly hosting bill. You only ever pay for a domain name if you want one (~$12–15/year).
- **A booking form with no backend.** Requests are emailed to you through a free service called **FormSubmit**. There's no database, no server, nothing to maintain.
- **A self-service admin panel** at `yoursite.com/admin/`. You edit your gallery, flash, bio, prices and contact details yourself. Hit Save and the site updates in about a minute.

You own the code outright. Nothing here phones home to anyone.

---

## 2. One-time setup

Do this once. If Systems by Vega is installing for you, they'll do steps a–f and walk you through g.

### a. Get a GitHub account

Go to [github.com](https://github.com) and sign up (free), or use an account you already have. This is where your site lives. Write down the username — you'll need it below.

### b. Get the code into your repo

**Option 1 — transfer (easiest).** Ask whoever built your site to transfer the repo to you: on the repo, Settings → General → Danger Zone → **Transfer ownership** → your GitHub username. Accept the emailed invite.

**Option 2 — push a fresh copy.** If you were handed a customized folder from the clone tool:

```bash
cd your-site-folder
git init
git add -A
git commit -m "Initial site"
git branch -M main
git remote add origin https://github.com/<your-username>/<your-repo>.git
git push -u origin main
```

Create `<your-repo>` on GitHub first (github.com → New repository, **Public**, no README).

### c. Turn on GitHub Pages

On your repo: **Settings → Pages → Source: Deploy from a branch** → branch **`main`**, folder **`/ (root)`** → Save.

Wait ~2 minutes. Your site is live at `https://<your-username>.github.io/<your-repo>/`.

### d. Custom domain (optional)

If you bought a domain (e.g. `staticrosetattoo.com`):

1. **Settings → Pages → Custom domain** → type your domain → Save. (This writes a `CNAME` file to your repo — that's expected.)
2. At your domain registrar, set DNS records:

   | Type  | Name  | Value                     |
   |-------|-------|---------------------------|
   | A     | `@`   | `185.199.108.153`         |
   | A     | `@`   | `185.199.109.153`         |
   | A     | `@`   | `185.199.110.153`         |
   | A     | `@`   | `185.199.111.153`         |
   | CNAME | `www` | `<your-username>.github.io` |

3. DNS can take up to 24 hours (usually much less). Once it resolves, tick **Enforce HTTPS** in the Pages settings.

### e. Turn on your booking form

Your email address is already set as the form's destination.

**You must activate it once:** go to your live site, fill in the booking form, and submit it. FormSubmit will email you a **confirmation link** — click it. That's it, forever.

> **Until you click that link, booking requests are not delivered.** Do this before you send anyone to the site.

### f. Create your admin token

This is the password that lets the admin panel save changes to your site.

1. Go to **GitHub → Settings → Developer settings → Personal access tokens → Fine-grained tokens → Generate new token**.
2. **Token name:** anything (e.g. "Website admin").
3. **Resource owner:** the GitHub account that owns this site's repo (yours).
4. **Expiration:** up to 1 year. Put a reminder in your calendar for a week before.
5. **Repository access:** *Only select repositories* → pick this site's repo.
6. **Permissions:** Repository permissions → **Contents** → **Read and write**. (Nothing else.)
7. Generate, then **copy the token** — GitHub only shows it once.

### g. First admin login

1. Open `https://<your-site>/admin/`.
2. Paste the token.
3. **Choose a PIN** (6+ digits) you'll remember.
4. Save & enter.

Your token is encrypted with your PIN and stored **only in that browser**. It never gets written into the website's code, so nobody visiting your site can ever see it.

---

## 3. Everyday editing

Go to `https://<your-site>/admin/`, enter your PIN, edit, hit **Save changes**. Your site updates in about a minute (refresh the page to see it).

### What each tab does

| Tab | What it edits |
|-----|---------------|
| **Gallery** | Your portfolio. Add a piece, give it a title and caption, pick which filter it shows under (Blackwork / Fine Line / Color / Flash), and **upload a photo**. The order here is the order on the site — first is top-left. This feeds the gallery and the click-to-enlarge lightbox. |
| **Flash** | Available flash designs with prices and descriptions. Each one gets a "Claim this flash" button that pre-fills your booking form with that design. Photos optional. |
| **About** | Your artist bio — the paragraph in the About section. |
| **Credentials** | The small badges under your bio (licensing, certifications, studio policy). |
| **Stats** | The three proof numbers near the top (years tattooing, pieces healed, etc.). |
| **Social** | Your social links. Pick the platform, the icon is automatic. The **first link** is what the DM button on mobile opens. |
| **Contact** | Your phone, public email, and city — updates the footer, social row and every link on the site at once. Also **where booking requests get emailed**. |
| **Booking** | Open or close your books. Turn it off when you're full: the form is swapped for a message you write, the rest of the site stays up. |

### Photos

Upload straight from the Gallery or Flash tabs. JPG/PNG/WebP, up to about 5 MB — **resize big camera/phone photos first** or the page loads slowly. Leave a photo empty and the built-in ink drawing is used instead.

### Good to know

- **Save applies to everything**, across all tabs, in one go.
- **Each device is separate.** New phone or laptop? You'll paste the token and pick a PIN again there. Same token works on all of them.
- **Forgot your PIN?** On the login screen click **"Set up this device again"** — then paste your token and pick a new PIN. (If you no longer have the token, make a new one: step 2f.)
- **Token expired?** The admin will say it was rejected. Make a new token (step 2f), click "Set up this device again", paste it.
- **Changing the booking inbox** in the Contact tab means FormSubmit sends a fresh confirmation email to the new address — click it, same as step 2e.

---

## 4. Security notes

- **Never share your token.** It's not just for the website — it's write access to your repo. Treat it like a password. Don't email it or paste it into a chat.
- **The PIN only protects this browser.** It encrypts the token on that one device. It is not an account login and there's no "reset PIN" email — it's not a service, it's local encryption.
- **Anyone with write access to the repo controls the site.** Be deliberate about who you add as a collaborator on GitHub.
- **Lost the token, or think someone else got it?** Go to GitHub → Settings → Developer settings → Fine-grained tokens → **Revoke** it, then generate a new one. Revoking instantly kills the old one.
- **Don't paste the token anywhere except the admin login box.**

<!-- SWAP:INSTALLER -->
---

## For the installer (Systems by Vega)

- **Clone a fresh copy for a buyer:**
  ```bash
  node tools/clone.mjs --name "Buyer Studio" --slug buyer-studio \
    --owner buyerGithubUser --repo buyer-studio-site \
    --email owner@studio.com --phone "(208) 555-0123" --city "Boise, ID" \
    --artist "Artist Name"
  ```
  Run `node tools/clone.mjs --help` for the full list. It rewrites brand strings, contact details, the admin's `OWNER`/`REPO` config block, and **strips the fictional-business disclosure**. It keeps the "Systems by Vega" credit.
- **Web-search the business name for collisions before you commit to it** — house rule, do it first.
- The clone output is a plain folder. `git init`, push to the buyer's repo, enable Pages, then hand them this file.
- **Content model:** `content.json` at the repo root is the live content; `DEFAULT_CONTENT` inline in `index.html` is the fallback that ships with the page. Keep the two shapes in sync — the admin panel and `renderContent()` both depend on those exact keys.
- The admin is 100% client-side (GitHub Contents API + PBKDF2/AES-GCM). No backend to stand up, nothing to bill monthly.
<!-- /SWAP:INSTALLER -->
