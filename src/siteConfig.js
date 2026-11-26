// ─────────────────────────────────────────────────────────────────────────────
// SINGURA sursă pentru datele firmei: footer, pagini legale, date structurate
// (Schema.org), llms.txt, sitemap. Modifici aici și se schimbă peste tot.
//
// ⚠️ DE COMPLETAT ÎNAINTE DE RECLAME PLĂTITE: câmpurile din `company` care sunt
//    goale ('') NU se afișează pe site. Legea (OUG 34/2014, Legea 365/2002) cere
//    pentru comerțul online: denumirea firmei, CUI, nr. Reg. Com. și sediul.
// ─────────────────────────────────────────────────────────────────────────────

export const SITE_URL = 'https://www.kraftmetalworks.ro';
export const BRAND_NAME = 'KRAFT Metalworks';
export const BRAND_ALT_NAMES = [
  'Kraft Metal',
  'Kraft Metal Works',
  'Kraft Metalworks',
  'Kraft Confectii Metalice',
  'Kraft Confecții Metalice',
  'Krafat Metal',
];

export const company = {
  legalName: '', // ex: 'KRAFT METALWORKS SRL' sau 'NUME PRENUME ÎI'
  cui: '', // ex: 'RO12345678' (cu RO doar dacă e plătitor de TVA)
  regCom: '', // ex: 'J24/1234/2026'
  street: '', // ex: 'Str. Exemplu nr. 1'
  city: 'Sighetu Marmației',
  county: 'Maramureș',
  postalCode: '',
  country: 'RO',
  // true = prețurile afișate includ TVA · false = firmă neplătitoare de TVA ·
  // null = nu afișăm nicio mențiune până confirmi.
  vatPayer: null,
};

export const contact = {
  phone: '+40 743 096 269',
  phone2: '+40 746 333 104',
  whatsapp: '40743096269', // fără + și spații, pentru link wa.me
  email: 'kraftmetalworks2025@gmail.com',
  schedule: 'Luni–Vineri: 09:00–18:00',
};

// ── Măsurare vânzări (Google Analytics 4, Google Ads, Meta Pixel) ──────────
// Lași gol = nimic nu se încarcă și bannerul de cookie-uri nu apare.
// Completezi ID-ul = apare bannerul de consimțământ, iar scripturile pornesc
// doar după „Accept" (cerință GDPR/ePrivacy).
export const tracking = {
  ga4: '', // ex: 'G-XXXXXXXXXX'
  googleAds: '', // ex: 'AW-123456789'
  googleAdsLeadLabel: '', // eticheta conversiei „Lead" din Google Ads, ex: 'AbCdEfGh123'
  metaPixel: '', // ex: '123456789012345'
};

export const serviceArea = [
  'Sighetu Marmației',
  'Baia Mare',
  'Maramureș',
  'Cluj-Napoca',
  'Transilvania',
  'România',
];

export function companyAddressLine() {
  return [company.street, company.city, company.county ? `jud. ${company.county}` : '', 'România']
    .filter(Boolean)
    .join(', ');
}

export function whatsappLink(text = 'Bună ziua! Aș dori o ofertă de la KRAFT Metalworks.') {
  return `https://wa.me/${contact.whatsapp}?text=${encodeURIComponent(text)}`;
}

export function telLink(phone = contact.phone) {
  return `tel:${phone.replace(/\s+/g, '')}`;
}
