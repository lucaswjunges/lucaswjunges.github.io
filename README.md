# lucaswjunges.github.io

Personal site of Lucas William Junges — bilingual (EN at `/`, PT-BR at `/pt/`).

## Structure

- `index.html` — English version (default; Googlebot and x-default land here)
- `pt/index.html` — Portuguese version
- `css/style.css` — single shared stylesheet (IBM Plex, datasheet look)
- `js/main.js` — language preference logic (banner suggestion + localStorage;
  no auto-redirect on first visit, which would break international SEO)
- `assets/cv/` — downloadable CV PDFs (EN/PT), sources live in
  `../Lucas_Junges/cv_lucas_junges_site_{en,pt}_2026.tex`
- `sitemap.xml` / `robots.txt` — both URLs with hreflang alternates
- `favicon.svg`, `404.html`

## Editing rules

- Keep both languages in sync: any content change in `index.html` needs the
  equivalent change in `pt/index.html`.
- Keep facts consistent with the LinkedIn profile and CV PDFs — recruiters
  cross-check them.
- `hreflang` + self-referencing `canonical` tags must stay as they are
  (en / pt-BR / x-default → EN root).
- After changing content, update `<lastmod>` in `sitemap.xml`.

## Local preview

```bash
python3 -m http.server 8742
# http://localhost:8742/ and http://localhost:8742/pt/
```
