# Tech Punjab — website

Bilingual (English / ਪੰਜਾਬੀ) go-to-market website for **Tech Punjab**, a managed IT services provider (MSP) for businesses in Punjab, India.

Plain static HTML/CSS/JS with no build step and no dependencies. It's ready for Cloudflare Pages.

| URL    | Language         | File              |
|--------|------------------|-------------------|
| `/`    | English          | `index.html`      |
| `/pa/` | Punjabi (Gurmukhi) | `pa/index.html` |

## Before you go live: replace the placeholders

Do a find-and-replace across the repo (`index.html`, `pa/index.html`, `robots.txt`, `sitemap.xml`):

| Placeholder                     | Replace with                                           |
|---------------------------------|--------------------------------------------------------|
| `910000000000`                  | Your WhatsApp/phone number: country code + number, digits only (e.g. `919812345678`) |
| `+91 00000 00000`               | The same number, formatted for display                 |
| `hello@techpunjab.example`      | Your real business email                               |
| `https://techpunjab.pages.dev`  | Your final domain (e.g. `https://techpunjab.in`)      |

Also check:
- **Cities served** (the "Serving businesses across Punjab" section and the `areaServed` list in the JSON-LD block, on both pages). Only list cities where you can actually get an engineer on-site.
- **Office hours** (contact section and `openingHours` in the JSON-LD block).
- **Plan contents**: each plan's features are promises. Remove anything you don't deliver yet.

## Deploy on Cloudflare Pages

1. Cloudflare dashboard → **Workers & Pages** → **Create** → **Pages** → **Connect to Git**.
2. Pick the `Website-Techpunjab` repository and the branch you want to deploy.
3. Build settings:
   - **Framework preset:** None
   - **Build command:** *(leave empty)*
   - **Build output directory:** `/`
4. **Save and Deploy**. Every push to that branch redeploys automatically.
5. Custom domain: Pages project → **Custom domains** → add your domain.

Cloudflare Pages picks up these files automatically:
- `_headers`: security headers (CSP, frame protection, etc.)
- `_redirects`: short redirects (`/en` → `/`, `/punjabi` → `/pa/`)
- `404.html`: bilingual not-found page

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
_headers, _redirects  Cloudflare Pages config
robots.txt, sitemap.xml
```

## Preview locally

```bash
python3 -m http.server 8080
# open http://localhost:8080
```
