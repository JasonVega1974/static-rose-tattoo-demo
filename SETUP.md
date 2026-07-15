# Static Rose Tattoo — Owner's Guide

How to run your site yourself. No coding, nothing to install.

Your site was set up for you. This guide starts from the part you actually use: editing it.

---

## 1. What you own

- **A one-file website.** The whole public site is a single file. No plugins to update,
  nothing to break, nothing to keep patched.
- **Free hosting. No monthly bill.** You only ever pay for a domain name if you want one
  (~$12–15/year). There's no subscription to us or anyone else.
- **Booking requests come straight to your inbox.** No database, no server, nothing to maintain.
- **A self-service admin panel** at `/admin/` — you edit your own gallery, flash, bio, prices
  and contact details. No developer, no invoice, no waiting.

You own the code outright. Nothing here phones home to anyone.

Your admin page is hidden from search engines, but **it's the PIN that protects it, not
secrecy** — so pick a real one.

---

## 2. Everyday editing

**This is the whole thing:**

1. Go to `https://<your-site>/admin/`
2. Enter your PIN
3. Change what you want
4. Hit **Save changes** → **your site is live in about a minute** (refresh to see it)

That's it. No approvals, no waiting on anyone, no "submit a ticket." Add a piece to your
gallery from your phone between clients and it's on your website before the next one sits down.

**Save applies to everything, across all tabs, in one go.** So you can update your gallery,
change a flash price and close your books in one visit, then Save once.

---

## 3. What each tab does

| Tab | What it edits |
|-----|---------------|
| **Gallery** ⭐ | **Your portfolio — the heart of the site.** Add a piece, give it a title and caption, pick which filter it shows under (Blackwork / Fine Line / Color / Flash), and **upload a photo**. The order here is the order on the site — first is top-left. This feeds the gallery and the click-to-enlarge lightbox. |
| **Flash** | Available flash designs with prices and descriptions. Each one gets a "Claim this flash" button that pre-fills your booking form with that design. Photos optional. |
| **About** | Your artist bio — the paragraph in the About section. |
| **Credentials** | The small badges under your bio (licensing, certifications, studio policy). |
| **Stats** | The three proof numbers near the top (years tattooing, pieces healed, etc.). |
| **Social** | Your social links. Pick the platform, the icon is automatic. The **first link** is what the DM button on mobile opens. |
| **Contact** | Your phone, public email, and city — updates the footer, social row and every link on the site at once. Also **where booking requests get emailed**. |
| **Booking** | Open or close your books. Turn it off when you're full: the form is swapped for a message you write, the rest of the site stays up. |

---

## 4. Tips

### Photos

Upload straight from the **Gallery** or **Flash** tabs. JPG/PNG/WebP, up to about 5 MB.

- **Resize big camera/phone photos first** — a straight-off-the-camera photo is slow to load,
  and people leave slow pages. Anything around 1500px wide is plenty.
- Leave a photo empty and the built-in ink drawing is used instead — useful while you're
  still shooting a piece, but real photos are what book clients.
- Photos are what sell the work. A gallery of real healed pieces beats anything else on the site.

### Closing your books

Fully booked? **Booking** tab → turn books **off** → write the message people should see
instead (when you'll reopen, where you announce it). The booking form is replaced with your
message and the rest of the site stays up and working — your gallery keeps doing its job.

Turn it back on when you're ready. Takes ten seconds.

### Changing your booking email

If you change the email in the **Contact** tab, the form service sends a **confirmation email
to the new address — you have to click the link in it.** Until you do, booking requests to the
new address are not delivered. Same one-time step that was done when your site was set up.

---

## 5. Your phone

**The admin works on your phone**, and for a tattoo artist that's the point — you shoot a
finished piece and it's in your gallery before you've cleaned your station.

**Each device needs its own one-time setup.** New phone, or want to use a laptop too? The
first time you open `/admin/` there, you'll paste your access token and pick a PIN for that
device. The same token works on all of them. Your installer saved that token in your password
manager — that's where to get it.

---

## 6. When something stops working

Three things can happen. All three are fixable in a minute.

### It asks for a PIN you already set, or says "set up this device again"

**Your saved login was cleared.** Phone browsers clean out stored data for sites you haven't
opened in a while — annoying, not broken, and nothing is lost.

**Fix:** tap **"Set up this device again"**, paste your access token (it's in your password
manager — your installer put it there), and pick a PIN. Back in business.

### The Save button stops working

**Your access token expired.** These last about a year, then they stop — it's a security
feature, not a fault. Everything on your live site keeps working; you just can't edit until
it's renewed.

**Fix:** contact your installer (below) — this is a two-minute job. Renew it yourself if
you're comfortable doing so.

### You forgot your PIN

**Nobody can recover it — including us.** It isn't a password on an account somewhere; it's
the key that unlocks the token stored on your own device. There's no reset email because
there's no account to email.

**Fix:** click **"Set up this device again"**, paste your token from your password manager,
and pick a new PIN.

> **The pattern:** every one of these is solved by *paste your token, pick a new PIN.* That's
> why it's in your password manager. If you ever can't find it there, call us.

---

## 7. Security notes

- **Never share your access token.** It's not just for the website — it's write access to
  where your site lives. Treat it like a password. Don't email it or paste it into a chat.
- **The PIN only protects this browser.** It encrypts the token on that one device. It's not
  an account login, and there's no "reset PIN" email — it's local encryption.
- **Assume someone could find your `/admin/` URL.** That's fine — it's the PIN that stops
  them, which is why a real PIN matters more than a memorable one.
- **Anyone with write access to your site's repository controls the site.** Be deliberate
  about who you give access to.
- **Lost the token, or think someone else got it?** Call us — it can be revoked instantly and
  replaced. Revoking kills the old one immediately.
- **Don't paste the token anywhere except the admin login box.**

---

## 8. Who to call

**Systems by Vega** — info@kingdom-creatives.com

Worth calling about: Save stopped working, leads not arriving, anything involving the token,
or you want something changed that the admin panel doesn't cover.
