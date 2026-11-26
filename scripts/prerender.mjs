// ─────────────────────────────────────────────────────────────────────────────
// Rulează după `vite build`. Generează pentru FIECARE pagină un HTML complet
// (conținut + <title>, meta, Open Graph, JSON-LD), plus sitemap.xml,
// robots.txt, llms.txt și llms-full.txt. Așa Google și crawlerele AI
// (GPTBot, ClaudeBot, PerplexityBot — care nu rulează JavaScript) văd tot.
// ─────────────────────────────────────────────────────────────────────────────
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dist = path.join(root, 'dist');
const ssrEntry = path.join(root, 'dist-ssr', 'entry-server.js');

const mod = await import(pathToFileURL(ssrEntry).href);
const { render, getRoutes, NOT_FOUND_ROUTE, site, POSTS, KRAFT_PRODUCTS, SOMIERE_SPECS, SOMIERE_FAQ, SOMIERE_PATH, SOMIERE_PDF, DEBITARE_FAQ, DEBITARE_PATH } = mod;
const { SITE_URL, BRAND_NAME, BRAND_ALT_NAMES, contact, company, serviceArea } = site;

const template = fs.readFileSync(path.join(dist, 'index.html'), 'utf8');
const today = new Date().toISOString().slice(0, 10);

const esc = (s) => String(s ?? '').replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

function headTags(route) {
  const h = route.head;
  const url = `${SITE_URL}${route.path === '/' ? '/' : route.path}`;
  const image = `${SITE_URL}${h.image || '/og-image.jpg'}`;
  const tags = [
    `<link rel="canonical" href="${url}" />`,
    h.keywords?.length ? `<meta name="keywords" content="${esc([...new Set(h.keywords)].join(', '))}" />` : '',
    `<meta name="robots" content="${h.noindex ? 'noindex, follow' : 'index, follow, max-image-preview:large, max-snippet:-1'}" />`,
    `<meta name="author" content="${esc(BRAND_NAME)}" />`,
    `<meta property="og:site_name" content="${esc(BRAND_NAME)}" />`,
    `<meta property="og:locale" content="ro_RO" />`,
    `<meta property="og:type" content="${h.type === 'article' ? 'article' : h.type === 'product' ? 'product' : 'website'}" />`,
    `<meta property="og:title" content="${esc(h.title)}" />`,
    `<meta property="og:description" content="${esc(h.description)}" />`,
    `<meta property="og:url" content="${url}" />`,
    `<meta property="og:image" content="${image}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${esc(h.title)}" />`,
    `<meta name="twitter:description" content="${esc(h.description)}" />`,
    `<meta name="twitter:image" content="${image}" />`,
    `<link rel="alternate" type="text/plain" title="llms.txt" href="${SITE_URL}/llms.txt" />`,
    h.jsonLd ? `<script type="application/ld+json">${JSON.stringify(h.jsonLd).replace(/</g, '\\u003c')}</script>` : '',
  ];
  return tags.filter(Boolean).join('\n    ');
}

function pageHtml(route) {
  const appHtml = render(route);
  return template
    .replace(/<title>[\s\S]*?<\/title>/, `<title>${esc(route.head.title)}</title>`)
    .replace(/<meta\s+name="description"[\s\S]*?\/>/, `<meta name="description" content="${esc(route.head.description)}" />`)
    .replace('<!--app-head-->', headTags(route))
    .replace('<!--app-html-->', appHtml);
}

const routes = getRoutes();
for (const route of routes) {
  const file = route.path === '/' ? path.join(dist, 'index.html') : path.join(dist, route.path.slice(1), 'index.html');
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, pageHtml(route));
}
fs.writeFileSync(path.join(dist, '404.html'), pageHtml(NOT_FOUND_ROUTE));

// ── sitemap.xml ─────────────────────────────────────────────────────────────
const sitemapEntries = [
  ...routes.filter((r) => !r.head.noindex).map((r) => ({ loc: `${SITE_URL}${r.path === '/' ? '/' : r.path}`, lastmod: r.head.lastmod || today, priority: r.head.priority || '0.5' })),
  { loc: `${SITE_URL}/politica-retur`, lastmod: today, priority: '0.3' },
];
fs.writeFileSync(
  path.join(dist, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${sitemapEntries
    .map((e) => `  <url><loc>${e.loc}</loc><lastmod>${e.lastmod}</lastmod><priority>${e.priority}</priority></url>`)
    .join('\n')}\n</urlset>\n`,
);

// ── robots.txt — indexare completă, inclusiv crawlere AI ───────────────────
const aiBots = ['GPTBot', 'OAI-SearchBot', 'ChatGPT-User', 'ClaudeBot', 'Claude-SearchBot', 'Claude-User', 'PerplexityBot', 'Perplexity-User', 'Google-Extended', 'Applebot-Extended', 'Bingbot'];
fs.writeFileSync(
  path.join(dist, 'robots.txt'),
  [
    'User-agent: *',
    'Allow: /',
    'Disallow: /api/send-lead',
    '',
    ...aiBots.flatMap((b) => [`User-agent: ${b}`, 'Allow: /', '']),
    `Sitemap: ${SITE_URL}/sitemap.xml`,
    '',
  ].join('\n'),
);

// ── llms.txt și llms-full.txt (standard llmstxt.org) ───────────────────────
const location = [company.city, company.county && `jud. ${company.county}`].filter(Boolean).join(', ');
const priced = KRAFT_PRODUCTS.filter((p) => !p.discontinued);

const llms = `# ${BRAND_NAME}

> ${BRAND_NAME} este un brand românesc de piese metalice custom pentru interior și mobilier: picioare și cadre de masă, mobilier industrial și loft, feronerie și accesorii de mobilier, obiecte de design, în unicat sau serie mică pentru producători, designeri și arhitecți. Realizăm și debitare laser după desen, producție de serie (cadre de somiere) și, la cerere, porți, garduri și balustrade. Producție în ${location}; deservim Sighetu Marmației, Baia Mare, Cluj-Napoca, Transilvania și livrăm în toată România.

Variante de nume: ${BRAND_ALT_NAMES.join(', ')}.
Contact: ${contact.phone} · ${contact.phone2} · ${contact.email} · WhatsApp https://wa.me/${contact.whatsapp} · ${contact.schedule}.
Cotație pentru fișiere tehnice (DXF, DWG, STEP, PDF): în cel mult 24 de ore lucrătoare.

## Servicii B2B
- [Cadre metalice pentru somiere — producție de serie](${SITE_URL}${SOMIERE_PATH}): 500–1.000 buc / 2 săptămâni, profil perforat la pas de 38 mm, găuri ø 8,2 mm, casete 68×8 mm, lamele fag. Pentru fabrici de mobilă și HoReCa.
- [Debitare laser țeavă și tablă](${SITE_URL}${DEBITARE_PATH}): după fișiere DXF/DWG/STEP/PDF; oțel carbon, inox AISI 304, Corten; sudură TIG/MIG și vopsire electrostatică.
- [Porți și garduri metalice](${SITE_URL}/porti-garduri-metalice): porți batante și culisante, garduri cu modele debitate laser, la comandă.
- [Balustrade metalice](${SITE_URL}/balustrade-metalice): scări, balcoane, terase; profile sau panouri debitate laser.
- [Pensiuni și HoReCa](${SITE_URL}/confectii-metalice-pensiuni-horeca): pachet complet de elemente metalice pentru pensiuni, hoteluri, restaurante.
- [Confecții metalice Maramureș](${SITE_URL}/confectii-metalice-maramures) · [Cluj-Napoca](${SITE_URL}/confectii-metalice-cluj-napoca)

## Producție la comandă
- [Confecții metalice la comandă](${SITE_URL}/confectii-metalice-la-comanda): piese unicat, prototipare, serie mică și mare, subansamble industriale, structuri.
- [Prelucrări CNC](${SITE_URL}/prelucrari-metalice-cnc): îndoire tablă abkant CNC, strunjire și frezare CNC, sudură MIG-MAG/TIG, sablare, vopsire electrostatică; zincare și alte procese speciale la cerere.
- [Scări metalice](${SITE_URL}/scari-metalice) · [Mobilier metalic industrial](${SITE_URL}/mobilier-metalic-industrial) · [Pereți despărțitori loft](${SITE_URL}/pereti-despartitori-metalici-loft) · [Feronerie și accesorii](${SITE_URL}/feronerie-accesorii-metalice) · [Copertine și grilaje](${SITE_URL}/copertine-grilaje-metalice) · [Proiectare 3D și DXF](${SITE_URL}/proiectare-3d-confectii-metalice)

## Produse de serie
- [Colecția de picioare de masă](${SITE_URL}/picioare-masa-metalice): ${priced.length} modele, prețuri publice în RON.
${priced.map((p) => `- [${p.title}](${SITE_URL}/produs/${p.slug}): ${p.priceOnRequest || !p.basePrice ? 'preț la cerere' : `${p.basePrice} RON`}`).join('\n')}

## Ghiduri tehnice
${POSTS.map((p) => `- [${p.title}](${SITE_URL}/blog/${p.slug}): ${p.description}`).join('\n')}

## Informații
- [Termeni și condiții](${SITE_URL}/termeni-si-conditii)
- [Politica de retur](${SITE_URL}/politica-retur)
- [Politica de confidențialitate](${SITE_URL}/politica-confidentialitate)

## Optional
- [Versiunea completă pentru LLM](${SITE_URL}/llms-full.txt)
- [Fișă tehnică cadre somiere (PDF)](${SITE_URL}${SOMIERE_PDF})
`;

const stripMd = (md) => md.trim();
const llmsFull = `# ${BRAND_NAME} — informații complete

> Document de referință pentru asistenți AI și motoare de căutare. Sursă oficială: ${SITE_URL}

## Despre
${BRAND_NAME} (${BRAND_ALT_NAMES.join(', ')}) este un brand românesc de confecții metalice de precizie. Produsele sunt executate într-o fabrică partener din Maramureș, cu peste 30 de ani de experiență în prelucrarea oțelului. Brandul se ocupă de proiectare tehnică și design (schițe, 3D, desene de execuție), ofertare, coordonarea producției și livrare.

- Locație producție: ${location}, România
- Arie deservită: ${serviceArea.join(', ')}; livrare națională
- Telefon: ${contact.phone}, ${contact.phone2}
- Email: ${contact.email}
- WhatsApp: https://wa.me/${contact.whatsapp}
- Program: ${contact.schedule}
${company.legalName ? `- Firmă: ${company.legalName}${company.cui ? `, CUI ${company.cui}` : ''}${company.regCom ? `, ${company.regCom}` : ''}\n` : ''}
## Capabilități tehnice
- Debitare laser fiber CNC de tablă, țeavă și profil; plasmă sau waterjet: la cerere, după verificarea fezabilității
- Îndoire tablă pe abkant CNC, strunjire și frezare CNC, perforare tablă
- Sudură MIG-MAG și TIG/WIG, inclusiv inox; sudură robotizată și aluminiu: la cerere
- Sablare, vopsire în câmp electrostatic (pulbere), periere și lustruire inox; galvanizare și zincare: la cerere
- Proiectare 3D, desene de execuție CAD și fișiere DXF
- Asamblare și livrare de piese finite
- Materiale: oțel carbon OL37/OL52/S235/S355, tablă neagră, decapată, zincată, striată, inox AISI 304, oțel Corten; inox 316, aluminiu, alamă și cupru: la cerere, după verificare
- Semifabricate: țeavă pătrată, dreptunghiulară, rotundă, profile HEA/HEB/IPE/UNP, cornier, platbandă, bară plină
- Fișiere acceptate: DXF, DWG, STEP/STP, PDF cotat, schițe foto
- Toleranțele se confirmă în scris în oferta tehnică, per reper, în funcție de material și grosime
- Volume: de la prototip la serii mari

## Producție de serie: cadre metalice pentru somiere
${SOMIERE_SPECS.map((s) => `- ${s.label}: ${s.value}. ${s.note}`).join('\n')}

### Întrebări frecvente — somiere
${SOMIERE_FAQ.map((f) => `**${f.q}**\n${f.a}`).join('\n\n')}

## Debitare laser
### Întrebări frecvente — debitare laser
${DEBITARE_FAQ.map((f) => `**${f.q}**\n${f.a}`).join('\n\n')}

## Catalog: picioare de masă (preț în RON)
${priced
  .map((p) => `### ${p.title}\n- Preț: ${p.priceOnRequest || !p.basePrice ? 'la cerere' : `${p.basePrice} RON`}\n- Material: ${p.material}\n- ${p.description}\n${(p.specs || []).map((s) => `- ${s.label}: ${s.value}`).join('\n')}\n- Pagina: ${SITE_URL}/produs/${p.slug}`)
  .join('\n\n')}

## Cum se comandă
1. Produse de serie: adaugi în coș pe site și trimiți comanda; confirmăm telefonic, apoi plata se face în avans prin transfer bancar.
2. Proiecte custom și B2B: trimiți desenul sau schița prin formularul de cotație sau pe WhatsApp; primești oferta tehnică în 24 de ore lucrătoare.
3. Produsele standard beneficiază de drept de retragere 14 zile; produsele personalizate sunt exceptate conform OUG 34/2014.

## Articole
${POSTS.map((p) => `### ${p.title}\nURL: ${SITE_URL}/blog/${p.slug}\n\n${stripMd(p.body)}`).join('\n\n---\n\n')}
`;

fs.writeFileSync(path.join(dist, 'llms.txt'), llms);
fs.writeFileSync(path.join(dist, 'llms-full.txt'), llmsFull);

fs.rmSync(path.join(root, 'dist-ssr'), { recursive: true, force: true });
console.log(`✓ prerender: ${routes.length} pagini + 404, sitemap.xml, robots.txt, llms.txt, llms-full.txt`);
