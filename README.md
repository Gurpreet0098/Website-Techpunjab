# Tech Punjab — website

Bilingual (English / ਪੰਜਾਬੀ) go-to-market website for **Tech Punjab**, a managed IT services provider (MSP) for businesses in Punjab, India.

Plain static HTML/CSS/JS with no build step and no dependencies, served as a Cloudflare Worker (static assets).

Live (temporary): https://website-techpunjab.ventacoremsp.workers.dev

| URL    | Language         | File              |
|--------|------------------|-------------------|
| `/`    | English          | `index.html`      |
| `/pa/` | Punjabi (Gurmukhi) | `pa/index.html` |

## Before you go live: replace the placeholders

Do a find-and-replace across the repo (`index.html`, `pa/index.html`, `robots.txt`, `sitemap.xml`):

| Placeholder                     | Replace with                                           |
|---------------------------------|--------------------------------------------------------|
| `910000000000`                  | Your WhatsApp number: country code + number, digits only (e.g. `919812345678`). It's used only inside WhatsApp links and is never shown on the page. |
| `hello@techpunjab.example`      | Your real business email                               |
| `https://website-techpunjab.ventacoremsp.workers.dev` | Your custom domain, once you have one |

Also check:
- **Cities served** (the "Serving businesses across Punjab" section and the `areaServed` list in the JSON-LD block, on both pages). Only list cities where you can actually get an engineer on-site.
- **Office hours** (contact section and `openingHours` in the JSON-LD block).
- **Plan contents**: each plan's features are promises. Remove anything you don't deliver yet.

## Deploy on Cloudflare (Workers)

The site is connected as a Worker named `website-techpunjab`. `wrangler.jsonc` tells Cloudflare to serve this folder as static files:
- `/pa/` serves `pa/index.html`
- unknown URLs show `404.html`
- `.assetsignore` keeps `.git`, `README.md` and config files from being published
- `_headers` (security headers) and `_redirects` (`/en` → `/`, `/punjabi` → `/pa/`) are applied automatically

Every push to the connected branch redeploys. To add a custom domain later, open the Worker in Cloudflare → **Settings** → **Domains & Routes** → **Add custom domain**. Then replace the workers.dev URL in the HTML, `robots.txt` and `sitemap.xml`.

## How it works

- **Language switch:** the header button links between `/` and `/pa/`. The choice is remembered in the browser, so a returning visitor who picked Punjabi goes straight to `/pa/`. Search engines get `hreflang` tags and a sitemap covering both versions.
- **Contact form:** there is no server. Submitting the form opens WhatsApp with the visitor's details pre-filled in their language, and nothing is stored on the site. "Get a quote" on a plan pre-fills the form with that plan.
- **Editing text:** each language's copy lives in its own HTML file. When you change a section, change it in **both** `index.html` and `pa/index.html`.

## Structure

```
index.html            English home page
pa/index.html         Punjabi home page
404.html              Not-found page
assets/css/style.css  All styles (shared)
assets/js/main.js     Mobile menu, language memory, form → WhatsApp
assets/js/lang.js     Redirects returning Punjabi visitors from / to /pa/
assets/img/logo.svg   Logo / favicon
assets/img/icons.svg  Icon sprite
_headers, _redirects  Cloudflare headers & redirects
wrangler.jsonc        Cloudflare Worker config (static assets)
.assetsignore         Files kept off the live site
robots.txt, sitemap.xml
```

## Preview locally

```bash
python3 -m http.server 8080
# open http://localhost:8080
```
