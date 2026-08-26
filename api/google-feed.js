// ─────────────────────────────────────────────────────────────────────────────
// Vercel Serverless Function — Feed Google Merchant Center (RSS 2.0 + g: namespace)
//
// URL live: https://www.kraftmetalworks.ro/api/google-feed
//
// Generează automat feed-ul pentru cele 17 (+viitoare) produse reale "Picioare
// de Masă" direct din src/data/kraftFeedProducts.js — SINGURA sursă de adevăr,
// folosită și de site (CatalogShowroom.jsx). Nu trebuie actualizat manual
// niciodată: orice produs nou adăugat acolo apare automat și aici, cu condiția
// să aibă un `basePrice` (produsele fără preț, ex. Picior XY, sunt excluse
// automat, pentru că Google Merchant Center respinge produsele fără preț).
//
// Cum testezi local: `vercel dev` și deschide http://localhost:3000/api/google-feed
// Cum îl adaugi în Merchant Center: Products > Feeds > Add feed > "Scheduled
// fetch", pui URL-ul de mai sus, frecvență zilnică e suficientă.
// ─────────────────────────────────────────────────────────────────────────────

import { KRAFT_PRODUCTS, BRAND, SITE_URL } from '../src/data/kraftFeedProducts.js';

const GOOGLE_PRODUCT_CATEGORY = 'Home & Garden > Furniture > Table Legs';
// ^ Cea mai apropiată categorie din taxonomia oficială Google la momentul
//   redactării acestui fișier. Verifică/actualizează în Merchant Center la
//   nevoie: https://support.google.com/merchants/answer/6324436

function escapeXml(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function addDays(days) {
  const d = new Date();
  d.setDate(d.getDate() + days);
  return d.toISOString().slice(0, 10);
}

function buildItemXml(product) {
  const link = `${SITE_URL}/#produs-${product.slug}`;
  const imageLink = `${SITE_URL}/products/${product.slug}.jpg`;
  const price = `${product.basePrice.toFixed(2)} RON`;
  const availabilityDate = addDays(product.leadDays ?? 10);

  return `
    <item>
      <g:id>${escapeXml(product.slug)}</g:id>
      <g:title>${escapeXml(product.title)}</g:title>
      <g:description>${escapeXml(product.description)}</g:description>
      <g:link>${escapeXml(link)}</g:link>
      <g:image_link>${escapeXml(imageLink)}</g:image_link>
      <g:availability>backorder</g:availability>
      <g:availability_date>${availabilityDate}</g:availability_date>
      <g:price>${escapeXml(price)}</g:price>
      <g:brand>${escapeXml(BRAND)}</g:brand>
      <g:condition>new</g:condition>
      <g:google_product_category>${escapeXml(GOOGLE_PRODUCT_CATEGORY)}</g:google_product_category>
    </item>`;
}

export default function handler(req, res) {
  const feedProducts = KRAFT_PRODUCTS.filter(
    (p) => !p.discontinued && !p.priceOnRequest && typeof p.basePrice === 'number'
  );

  const itemsXml = feedProducts.map(buildItemXml).join('');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss xmlns:g="http://base.google.com/ns/1.0" version="2.0">
  <channel>
    <title>${escapeXml(BRAND)} — Picioare de Masă</title>
    <link>${escapeXml(SITE_URL)}</link>
    <description>Feed de produse pentru Google Merchant Center — ${escapeXml(BRAND)}</description>${itemsXml}
  </channel>
</rss>`;

  res.setHeader('Content-Type', 'application/xml; charset=utf-8');
  res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate');
  res.status(200).send(xml);
}
