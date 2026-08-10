# GeoHuB — Lead Generation Setup

Everything in the code is done. What follows can only be done by you, in accounts I
have no access to. **Steps 1 and 2 are the difference between a website and a
lead-generating website.** The rest compounds over months.

---

## Repositioning: global remote GIS, not Kenya fieldwork

The site originally leaned local — a dedicated "Land Surveying in Kenya" page, Google
Business Profile as the top priority, Kenya-first SEO. You corrected that: you do not
want physical land surveys, and there is no realistic market for you in that space —
local surveyors already own it. What you actually sell is **remote GIS mapping, spatial
analysis, remote sensing and web GIS development**, plus **processing** survey data
that someone else captured in the field.

What changed as a result:

- `land-surveying-kenya.html` is **retired** (301s to `/gis-mapping-services`). It was
  built entirely around dispatching local field surveyors, which is not your business.
- Every remaining mention of surveying, on the homepage and on `/land-infrastructure`,
  now reads as **data processing and CAD drafting** — "topographic survey data
  processed into DWG/DXF," not "we conduct surveys." Check the on-page FAQ "How can you
  survey my site if you are not physically there?" — that answer is the honest version
  of your business and everything else was brought in line with it.
- The homepage title and meta description dropped "Nairobi" as the lead hook and now
  open with GIS Mapping, Remote Sensing and Spatial Analysis — the global-intent terms
  a UK or US buyer actually searches.
- **Google Business Profile moved from priority #1 to optional** (see §4 below) — it
  targets local search, which is no longer the market you're chasing.

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

## 3. Testimonials — done

Three real reviews are now live in the Client Feedback section, taken verbatim from
your Fiverr profile:

| Client | Country | Why this one |
|---|---|---|
| `fns_surveying` | United Kingdom | A **surveying firm** hired you. Another survey business trusting you is the strongest proof on the page |
| `rogerarias1992` | United States | Specific and detailed — names responsiveness, clear communication and a professional result |
| `jordansloan494` | United States | **Repeat client.** Someone coming back is worth more than any adjective |

Only trimming and sentence-case were applied. No wording was added and nothing is
invented, so every quote can be checked against your public profile — which is exactly
why the section links to it and states the review count.

**If you add more later, keep the same rule:** real words only, and keep the handle and
country so the review stays verifiable. One fabricated quote discovered by a serious
client costs more than all 43 real ones earn you.

### Two things worth doing with these

- **Deliberately no star-rating markup.** Google does not show review stars for
  self-hosted testimonials about your own business, and marking them up can trigger a
  Search Console warning. The count and the profile link do that job honestly instead.
- **The "43 reviews" figure is now hardcoded.** Update it in `index.html` when it
  grows — search for `43</strong> client reviews`. A stale number is a small credibility
  leak.

---

## 4. Google Business Profile — optional now, not the priority

Previously framed as the #1 action. Downgraded because it primarily helps **local**
search — "land surveyor Nairobi," "GIS mapping Kenya" — and you've decided that's not
your market. A profile under category **Surveyor** would actively attract the wrong
enquiries: people wanting someone to show up on site.

**Worth doing anyway, but as a trust signal, not a lead channel:** when a prospect
finds you through Fiverr or the website and searches your name before hiring, a
verified Google listing reads as a real, established business rather than a one-person
Fiverr gig. If you set one up:

1. <https://business.google.com> → create a profile for **GeoHuB | The Spatial Network**
2. Category: **GIS software company** or **Data processing service** — not "Surveyor."
   The category is what determines which searches you show up for.
3. Set it as a **service-area business** rather than publishing a street address — you
   are not trying to rank for "near me" searches
4. Phone and website must be **character-for-character identical** to the site
5. Upload real work: map outputs, screenshots of platforms you built, processed survey
   deliverables

Skip this entirely for now if you'd rather spend the twenty minutes elsewhere — nothing
downstream depends on it.

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
| **Indexable pages** | Went from **1 indexable page to 6** — the four sector pages were previously invisible to search engines |
| **Positioning** | Repositioned from Kenya-local fieldwork to global remote GIS — see the section above |
| **Robustness** | The site no longer renders blank if JavaScript fails |

### Honest expectations

Sections 1–3 change your conversion rate the day they ship. Sections 5–6 do not work on
a schedule: a new site with no backlinks typically takes **3–6 months** to rank for
anything competitive, and global remote-service terms are more competitive than local
ones — expect the slower end of that range. There is no local-search shortcut here
anymore, since that's no longer the market.

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
