import App from './App.jsx';
import SomierePage, { SOMIERE_PATH, SOMIERE_FAQ } from './pages/SomierePage.jsx';
import DebitarePage, { DEBITARE_PATH, DEBITARE_FAQ } from './pages/DebitarePage.jsx';
import { BlogIndexPage, BlogPostPage } from './pages/BlogPages.jsx';
import ProductPage, { getProduct } from './pages/ProductPage.jsx';
import { TermsPage, PrivacyPage } from './pages/LegalPages.jsx';
import NotFoundPage from './pages/NotFoundPage.jsx';
import {
  PicioareMasaPage, PortiGarduriPage, BalustradePage, PICIOARE_PATH, PORTI_PATH, BALUSTRADE_PATH,
  PICIOARE_FAQ, PORTI_FAQ, BALUSTRADE_FAQ, listedProducts, HorecaPage, HORECA_PATH, HORECA_FAQ,
} from './pages/CategoryPages.jsx';
import { LocalPage, LOCAL_PAGES } from './pages/LocalPages.jsx';
import { ServicePage, SERVICE_PAGES } from './pages/ServicePages.jsx';
import { POSTS, getPost } from './content/blog.js';
import { KRAFT_PRODUCTS } from './data/kraftFeedProducts.js';
import {
  organizationSchema, localBusinessSchema, websiteSchema, breadcrumbSchema, faqSchema,
  serviceSchema, productSchema, blogPostingSchema, itemListSchema, localBusinessSchema as lbSchema, graph,
} from './seo/schema.js';

// ─────────────────────────────────────────────────────────────────────────────
// Toate paginile site-ului + datele lor SEO. Prerender-ul (scripts/prerender.mjs)
// generează din lista asta HTML static, sitemap.xml și llms.txt.
// ─────────────────────────────────────────────────────────────────────────────

const BASE_KEYWORDS = [
  'kraft metalworks', 'kraft metal', 'kraft confectii metalice', 'confectii metalice', 'debitare laser',
  'debitare laser tabla', 'debitare laser teava', 'confectii metalice maramures', 'confectii metalice cluj',
  'sighetu marmatiei', 'baia mare', 'cluj-napoca',
];

const SOMIERE_DESC = 'Cadre metalice pentru somiere în serie: 500–1.000 buc / 2 săptămâni, profil perforat la pas de 38 mm (ø 8,2 mm) pentru casete 68×8 mm și lamele fag. Pentru fabrici de mobilă și HoReCa.';
const DEBITARE_DESC = 'Debitare laser țeavă și tablă după fișierul tău DXF, DWG sau STEP. Sudură TIG/MIG, vopsire electrostatică. Cotație în 24h. Maramureș, Cluj-Napoca, livrare națională.';

export function getRoutes() {
  const routes = [
    {
      path: '/',
      Component: App,
      head: {
        title: 'KRAFT Metalworks | Confecții Metalice de Precizie & Debitare Laser',
        description: 'KRAFT Metalworks — confecții metalice de precizie, debitare laser țeavă și tablă, picioare de masă metalice, porți, garduri și balustrade. Producție în Maramureș, livrare în toată România.',
        keywords: [...BASE_KEYWORDS, 'picioare de masa metalice', 'porti metalice', 'garduri metalice', 'balustrade metalice'],
        jsonLd: graph(organizationSchema(), localBusinessSchema(), websiteSchema()),
        priority: '1.0',
      },
    },
    {
      path: SOMIERE_PATH,
      Component: SomierePage,
      head: {
        title: 'Cadre Metalice Somiere în Serie — 500–1.000 buc / 2 săpt. | KRAFT Metalworks',
        description: SOMIERE_DESC,
        keywords: [...BASE_KEYWORDS, 'cadre metalice somiere', 'somiere metalice serie', 'somiere pat metalice', 'cadru pat metalic', 'structura metalica pat', 'somiera metalica rezistenta', 'somiera cu lamele fag', 'producator cadre somiere', 'somiere horeca', 'casete lamele 68x8'],
        jsonLd: graph(
          organizationSchema(),
          serviceSchema({ name: 'Producție de serie cadre metalice pentru somiere', description: SOMIERE_DESC, path: SOMIERE_PATH, serviceType: 'Producție de serie confecții metalice' }),
          faqSchema(SOMIERE_FAQ),
          breadcrumbSchema([{ name: 'Acasă', path: '/' }, { name: 'Somiere de serie', path: SOMIERE_PATH }]),
        ),
        priority: '0.9',
      },
    },
    {
      path: DEBITARE_PATH,
      Component: DebitarePage,
      head: {
        title: 'Debitare Laser Tablă, Țeavă și Profil — Laser Fiber CNC, Maramureș - Cluj | KRAFT Metalworks',
        description: DEBITARE_DESC,
        keywords: [...BASE_KEYWORDS, 'debitare laser dxf', 'taiere laser metal', 'debitare laser inox', 'debitare laser baia mare', 'debitare laser cluj', 'debitare laser profil', 'taiere laser fiber', 'taiere laser cnc', 'debitare plasma', 'debitare waterjet', 'pret debitare laser metru liniar', 'furnizor debitare laser', 'servicii de debitare la comanda', 'debitare laser b2b', 'debitari industriale de precizie', 'sheet metal laser cutting'],
        jsonLd: graph(
          organizationSchema(),
          serviceSchema({ name: 'Debitare laser țeavă și tablă', description: DEBITARE_DESC, path: DEBITARE_PATH, serviceType: 'Debitare laser' }),
          faqSchema(DEBITARE_FAQ),
          breadcrumbSchema([{ name: 'Acasă', path: '/' }, { name: 'Debitare laser', path: DEBITARE_PATH }]),
        ),
        priority: '0.9',
      },
    },
    {
      path: PICIOARE_PATH,
      Component: PicioareMasaPage,
      head: {
        title: 'Picioare de Masă Metalice — Prețuri, Modele U, X, H | KRAFT Metalworks',
        description: `Picioare de masă metalice produse în România: ${listedProducts().length} modele (U, X, H, V, picior central), vopsite electrostatic, prețuri publice de la ${Math.min(...listedProducts().filter((p) => p.basePrice).map((p) => p.basePrice))} RON. Livrare în toată țara.`,
        keywords: [...BASE_KEYWORDS, 'picioare masa metalice', 'picioare metalice masa', 'picioare masa industriale', 'picioare masa stil industrial', 'picior masa metalic x', 'picioare masa u', 'picioare masa trapez', 'picioare masa spider', 'picioare masa paianjen', 'picioare masa debitate laser', 'picioare masa profil metalic', 'cadru metalic masa', 'baze metalice mese'],
        jsonLd: graph(
          organizationSchema(),
          itemListSchema(listedProducts()),
          faqSchema(PICIOARE_FAQ),
          breadcrumbSchema([{ name: 'Acasă', path: '/' }, { name: 'Picioare de masă metalice', path: PICIOARE_PATH }]),
        ),
        priority: '0.9',
      },
    },
    {
      path: PORTI_PATH,
      Component: PortiGarduriPage,
      head: {
        title: 'Porți și Garduri Metalice la Comandă — Maramureș, Cluj | KRAFT Metalworks',
        description: 'Porți batante și culisante, portițe și garduri metalice pe dimensiunile tale, cu modele debitate laser și vopsire electrostatică. Producție în Sighetu Marmației, livrare Baia Mare, Cluj și național. Ofertă în 24h.',
        keywords: [...BASE_KEYWORDS, 'porti metalice', 'porti debitate laser', 'garduri metalice', 'panouri gard laser cut', 'porti culisante', 'porti batante', 'gard metalic modern', 'porti metalice baia mare', 'porti metalice cluj', 'porti metalice sighet'],
        jsonLd: graph(
          organizationSchema(),
          serviceSchema({ name: 'Porți și garduri metalice la comandă', description: 'Porți batante, culisante și garduri metalice pe dimensiunile clientului.', path: PORTI_PATH, serviceType: 'Confecții metalice — porți și garduri' }),
          faqSchema(PORTI_FAQ),
          breadcrumbSchema([{ name: 'Acasă', path: '/' }, { name: 'Porți și garduri metalice', path: PORTI_PATH }]),
        ),
        priority: '0.9',
      },
    },
    {
      path: BALUSTRADE_PATH,
      Component: BalustradePage,
      head: {
        title: 'Balustrade Metalice Moderne pentru Scări, Balcoane, Terase | KRAFT Metalworks',
        description: 'Balustrade metalice moderne la comandă pentru scări interioare, balcoane și terase: profile metalice sau panouri debitate laser, vopsite electrostatic. Ofertă în 24h, livrare în Maramureș, Cluj și național.',
        keywords: [...BASE_KEYWORDS, 'balustrade metalice', 'balustrada metalica scara', 'balustrade balcon', 'balustrade moderne', 'balustrada debitata laser', 'balustrada tabla perforata', 'balustrada inox', 'balustrada aluminiu', 'balustrade metalice cluj', 'balustrade baia mare'],
        jsonLd: graph(
          organizationSchema(),
          serviceSchema({ name: 'Balustrade metalice la comandă', description: 'Balustrade metalice pentru scări, balcoane și terase.', path: BALUSTRADE_PATH, serviceType: 'Confecții metalice — balustrade' }),
          faqSchema(BALUSTRADE_FAQ),
          breadcrumbSchema([{ name: 'Acasă', path: '/' }, { name: 'Balustrade metalice', path: BALUSTRADE_PATH }]),
        ),
        priority: '0.9',
      },
    },
    {
      path: HORECA_PATH,
      Component: HorecaPage,
      head: {
        title: 'Confecții Metalice pentru Pensiuni și HoReCa — Maramureș | KRAFT Metalworks',
        description: 'Firmă debitată laser, porți, balustrade de terasă, grătare, vetre de foc, mobilier de exterior și cadre de paturi pentru pensiuni, hoteluri și restaurante. Un singur proiect și o ofertă în 24h, producție în Maramureș.',
        keywords: [...BASE_KEYWORDS, 'confectii metalice pensiuni', 'firma luminoasa pensiune', 'mobilier metalic horeca', 'balustrade terasa pensiune', 'gratar exterior pensiune', 'pensiuni maramures'],
        jsonLd: graph(
          organizationSchema(),
          serviceSchema({ name: 'Confecții metalice pentru pensiuni și HoReCa', description: 'Pachet complet de elemente metalice pentru pensiuni, hoteluri și restaurante.', path: HORECA_PATH, serviceType: 'Confecții metalice HoReCa' }),
          faqSchema(HORECA_FAQ),
          breadcrumbSchema([{ name: 'Acasă', path: '/' }, { name: 'Pensiuni și HoReCa', path: HORECA_PATH }]),
        ),
        priority: '0.8',
      },
    },
    ...SERVICE_PAGES.map((page) => ({
      path: page.path,
      Component: ServicePage,
      props: { path: page.path },
      head: {
        title: page.head.title,
        description: page.head.description,
        keywords: [...BASE_KEYWORDS, ...page.head.keywords],
        jsonLd: graph(
          organizationSchema(),
          serviceSchema({ name: page.crumb, description: page.head.description, path: page.path, serviceType: page.head.serviceType }),
          faqSchema(page.faqs),
          breadcrumbSchema([{ name: 'Acasă', path: '/' }, { name: page.crumb, path: page.path }]),
        ),
        priority: '0.8',
      },
    })),
    ...LOCAL_PAGES.map((page) => ({
      path: page.path,
      Component: LocalPage,
      props: { path: page.path },
      head: {
        title: `${page.title} | KRAFT Metalworks`,
        description: page.description,
        keywords: [...BASE_KEYWORDS, ...page.keywords],
        jsonLd: graph(
          organizationSchema(),
          lbSchema(),
          faqSchema(page.faqs),
          breadcrumbSchema([{ name: 'Acasă', path: '/' }, { name: page.city, path: page.path }]),
        ),
        priority: '0.8',
      },
    })),
    {
      path: '/blog',
      Component: BlogIndexPage,
      head: {
        title: 'Blog Tehnic — Debitare Laser, Somiere de Serie, Ghiduri | KRAFT Metalworks',
        description: 'Ghiduri practice despre debitare laser, pregătirea fișierelor DXF, producția de serie și alegerea pieselor metalice, de la echipa KRAFT Metalworks.',
        keywords: [...BASE_KEYWORDS, 'ghid debitare laser', 'fisier dxf debitare'],
        jsonLd: graph(organizationSchema(), breadcrumbSchema([{ name: 'Acasă', path: '/' }, { name: 'Blog', path: '/blog' }])),
        priority: '0.7',
      },
    },
    ...POSTS.map((post) => ({
      path: `/blog/${post.slug}`,
      Component: BlogPostPage,
      props: { slug: post.slug },
      head: {
        title: `${post.title} | KRAFT Metalworks`,
        description: post.description,
        keywords: BASE_KEYWORDS,
        type: 'article',
        jsonLd: graph(
          organizationSchema(),
          blogPostingSchema(post),
          breadcrumbSchema([{ name: 'Acasă', path: '/' }, { name: 'Blog', path: '/blog' }, { name: post.title, path: `/blog/${post.slug}` }]),
        ),
        lastmod: post.updated || post.date,
        priority: '0.6',
      },
    })),
    ...KRAFT_PRODUCTS.filter((p) => !p.discontinued).map((p) => ({
      path: `/produs/${p.slug}`,
      Component: ProductPage,
      props: { slug: p.slug },
      head: {
        title: `${p.title} — Picior de Masă Metalic${p.basePrice ? ` · ${p.basePrice} RON` : ''} | KRAFT Metalworks`,
        description: `${p.description} ${p.material}.`.slice(0, 300),
        keywords: [...BASE_KEYWORDS, 'picioare masa metalice', `${p.title.toLowerCase()}`],
        image: `/products/${p.slug}.jpg`,
        type: 'product',
        jsonLd: graph(
          organizationSchema(),
          productSchema(p),
          breadcrumbSchema([{ name: 'Acasă', path: '/' }, { name: 'Picioare de masă', path: '/picioare-masa-metalice' }, { name: p.title, path: `/produs/${p.slug}` }]),
        ),
        priority: '0.8',
      },
    })),
    {
      path: '/termeni-si-conditii',
      Component: TermsPage,
      head: { title: 'Termeni și condiții | KRAFT Metalworks', description: 'Termenii și condițiile de vânzare KRAFT Metalworks: comandă, plată, livrare, retur, garanție.', jsonLd: graph(organizationSchema()), priority: '0.3' },
    },
    {
      path: '/politica-confidentialitate',
      Component: PrivacyPage,
      head: { title: 'Politica de confidențialitate | KRAFT Metalworks', description: 'Cum colectează și protejează KRAFT Metalworks datele personale trimise prin formularele site-ului (GDPR).', jsonLd: graph(organizationSchema()), priority: '0.3' },
    },
  ];
  return routes;
}

export const NOT_FOUND_ROUTE = {
  path: '/404',
  Component: NotFoundPage,
  head: { title: 'Pagina nu a fost găsită | KRAFT Metalworks', description: 'Pagina căutată nu există.', noindex: true, jsonLd: graph(organizationSchema()) },
};

export function matchRoute(pathname) {
  const clean = pathname.replace(/\/+$/, '') || '/';
  return getRoutes().find((r) => r.path === clean) || NOT_FOUND_ROUTE;
}

export { getPost, getProduct };
