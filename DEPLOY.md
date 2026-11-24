# KRAFT Metalworks — ce s-a schimbat și cum publici

## Publicare
Urci folderul pe GitHub ca până acum; Vercel rulează singur `npm run build`, care acum:
1. construiește site-ul (Vite),
2. generează HTML static pentru fiecare pagină (Google + ChatGPT/Claude/Perplexity văd tot conținutul),
3. generează `sitemap.xml`, `robots.txt`, `llms.txt`, `llms-full.txt`.

## O singură dată, după publicare
1. **Date firmă** → `src/siteConfig.js` (`legalName`, `cui`, `regCom`, `street`, `vatPayer`). Apar automat în footer, pagini legale, Schema.org.
2. **Resend** (emailuri sigure pentru formulare) → pașii din `api/send-lead.js`. Până atunci formularele merg automat prin FormSubmit.
3. **Google Search Console** → Sitemaps → `https://www.kraftmetalworks.ro/sitemap.xml`.
4. **Merchant Center** → feed-ul `/api/google-feed` trimite acum spre `/produs/<slug>` (pagini cu preț vizibil).

## Unde adaugi conținut
- Produs nou (picior de masă): `src/data/kraftFeedProducts.js` + poza în `public/products/<slug>.jpg` → apare în catalog, pagina `/produs/<slug>`, feed Google, sitemap, llms.txt. Rulează apoi `python3` sau orice tool care actualizează `src/data/productImageSizes.json` (opțional: fără el, imaginea doar nu are dimensiuni rezervate).
- Articol blog: `src/content/blog.js`.
- Fișa tehnică somiere: `public/fise/fisa-tehnica-cadre-somiere-kraft.pdf`.

## Pagini noi
`/somiere-metalice-serie`, `/debitare-laser-teava-tabla`, `/blog`, `/blog/<slug>`, `/produs/<slug>` (17), `/termeni-si-conditii`, `/politica-confidentialitate`, `404`.
