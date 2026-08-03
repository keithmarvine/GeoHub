# GeoHuB — Lead Generation Setup

Everything in the code is done. What follows can only be done by you, in accounts I
have no access to. **Steps 1 and 2 are the difference between a website and a
lead-generating website.** The rest compounds over months.

---

## 1. Check Netlify for leads you may already have — do this first

Your contact form has carried `data-netlify="true"` since it first went live, which
means **Netlify has probably been capturing submissions all along**. They just never
reached you, because Netlify does not email anyone by default.

1. Go to <https://app.netlify.com> → your site → **Forms**
2. Look for a form named **contact**
3. Read anything sitting there

There may be real enquiries in that list. If there are, reply to them before doing
anything else on this page — even a late reply beats no reply.

---

## 2. Turn on email notifications — without this, nothing else matters

Netlify stores submissions but will not tell you about them until you ask it to.

1. Netlify → your site → **Site configuration** → **Notifications**
   (older UI: **Site settings → Forms → Form notifications**)
2. **Add notification** → **Email notification**
3. Event: **New form submission**
4. Form: **contact**
5. Email to notify: `gisdev67@gmail.com`
6. Save

**Then test it properly:**

- Open the live site, fill in the form with real-looking details, submit
- You should see the inline "Enquiry received" panel — the page must *not* reload
- Within a minute or two the email should arrive
- Confirm it also appears under **Forms → contact**
- **Check your spam folder.** Netlify notification emails often land there the first
  time. Mark it "not spam" and add the sender to your contacts, or you will miss leads
  without ever knowing.

> Free tier allows **100 submissions per month**. If you ever exceed that, submissions
> are rejected rather than queued — worth knowing before it happens.

### If the email never arrives

The form is built so a failure is never silent: if the submission cannot go through,
the visitor is shown your WhatsApp number and email address directly instead of a dead
button. But you should still fix the root cause. In order of likelihood: the
notification was not saved; the email went to spam; or the form was not re-detected
after deploy (make a trivial edit to `index.html` and redeploy to force it).

---

## 3. Add your real testimonials — the biggest single conversion lever left

`index.html` has a testimonials section built and styled, containing **three
placeholder cards**. They are deliberately loud and ugly: dashed amber borders and a
warning banner, so they cannot go live unnoticed.

I did not write testimonials for you. Invented client quotes are the fastest way to
lose a serious client who checks, and they are illegal in several of the markets you
sell into.

**Your Fiverr reviews are real testimonials and you are free to quote them.** For each
one, send me:

1. The quote text — the buyer's own words, lightly trimmed is fine
2. First name or initials
3. Country
4. Project type, e.g. "Topographic survey, 40 ha"

Specific beats glowing. *"Delivered the contours in the CAD format our engineers
needed"* outperforms *"great service"* every time, because it proves a competence the
next buyer is worried about.

**Until you send them, do one of two things — do not leave it as-is:**

- Fill the three cards in, then delete `is-placeholder` from
  `<section class="testimonials is-placeholder" id="testimonials">` and delete the
  `.placeholder-notice` block, **or**
- Delete the whole `<section class="testimonials ...">` block

---

## 4. Google Business Profile — highest-return action on this entire page

This will almost certainly bring you Kenyan clients **before** the website ranks for
anything. It is free and takes about twenty minutes.

1. <https://business.google.com> → create a profile for **GeoHuB | The Spatial Network**
2. Category: **Surveyor** (add secondary: *Mapping service*, *Engineering consultant*)
3. If you do not want your address public, set it as a **service-area business** and
   list the counties or regions you cover
4. Phone and website must be **character-for-character identical** to the site:
   - Phone: `+254 719 576 228`
   - Website: `https://geohub-spatial-network.netlify.app/`
5. Complete verification (postcard, phone or video — Google decides which)
6. Upload real work: survey drawings, map outputs, screenshots of platforms you built
7. **Ask past clients for Google reviews.** Review count and recency are among the
   strongest local ranking factors that are actually within your control.

> The address, phone and business name in the site's structured data must match this
> profile exactly. If you change one, change the other — mismatches actively weaken
> local ranking. In `index.html`, search for `"@type": ["ProfessionalService"` and you
> will find them.

---

## 5. Google Search Console

Without this you are guessing about your own site.

1. <https://search.google.com/search-console> → add property →
   `https://geohub-spatial-network.netlify.app`
2. Verify via the **HTML tag** method — paste the `<meta name="google-site-verification" ...>`
   tag into the `<head>` of `index.html`, just under the `<title>`, then redeploy
3. **Sitemaps** → submit `sitemap.xml`
4. **URL Inspection** → paste each page URL → **Request indexing**:
   - `/`
   - `/land-surveying-kenya`
   - `/gis-mapping-services`
   - `/land-infrastructure`
   - `/environment-agriculture`
   - `/urban-planning`
   - `/disaster-risk`

Then leave it alone for a month. Checking daily tells you nothing.

Optional but cheap: repeat at <https://www.bing.com/webmasters>. Bing feeds ChatGPT
search, DuckDuckGo and others, and competition there is far thinner.

---

## 6. Custom domain — worth doing before you promote the site

`geohub-spatial-network.netlify.app` reads as a free hosting subdomain, which quietly
undermines you with exactly the government and corporate buyers you are targeting. A
`.co.ke` or `.com` costs very little and is a real trust signal.

When you buy one, **tell me before you switch** — roughly forty absolute URLs in the
canonical tags, Open Graph tags, structured data and `sitemap.xml` all point at the
Netlify domain and must be updated together. Changing the domain without updating them
would undo a good part of the SEO work here.

---

## What I changed, in brief

| Area | Change |
|---|---|
| **Form** | Fixed the bug that made submissions unreliable; added validation, an inline success panel, and a WhatsApp/email fallback so a failed submit never loses a lead |
| **Lead quality** | Added phone, project location, timeline and budget fields — you can now triage enquiries before replying |
| **Conversion** | Outcome-led hero, trust bar, WhatsApp everywhere, sticky mobile bar, "How We Work", 7-question FAQ, and three new CTA points |
| **SEO** | Real page titles, canonicals, Open Graph, LocalBusiness + FAQ structured data, `robots.txt`, `sitemap.xml` |
| **Indexable pages** | Went from **1 indexable page to 7** — the four sector pages were previously invisible to search engines |
| **Robustness** | The site no longer renders blank if JavaScript fails |

### Honest expectations

Sections 1–3 change your conversion rate the day they ship. Sections 4–6 do not work on
a schedule: a new site with no backlinks typically takes **3–6 months** to rank for
anything competitive. The Google Business Profile will very likely produce Kenyan leads
before the website does.

This work makes ranking possible. It does not make it immediate, and anyone who tells
you otherwise is selling something.

---

## Two things to be aware of

**The hero still claims "Clients in 8+ Countries."** That was already on the site and I
left it alone. If you can stand behind it, keep it. If not, change it in `index.html` —
search for `Clients in 8+ Countries`. An unverifiable number next to real testimonials
undermines the testimonials.

**Two different phone numbers are now live.** WhatsApp links use `+254 701 644 626`, the
number you gave me. The displayed phone and the structured data still use
`+254 719 576 228`, which was already on the site. That is fine if both are yours and
both are answered — but the number in your Google Business Profile must match the one in
the structured data, so decide which is the business number and tell me if you want them
unified.
