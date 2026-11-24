import { SITE_URL, BRAND_NAME, BRAND_ALT_NAMES, company, contact, serviceArea, companyAddressLine } from '../siteConfig.js';

// Date structurate Schema.org (JSON-LD), refolosite pe toate paginile.

const ORG_ID = `${SITE_URL}/#organization`;
const BUSINESS_ID = `${SITE_URL}/#localbusiness`;
const SITE_ID = `${SITE_URL}/#website`;

const e164 = (phone) => phone.replace(/\s+/g, '');

export function postalAddress() {
  return {
    '@type': 'PostalAddress',
    ...(company.street && { streetAddress: company.street }),
    addressLocality: company.city,
    addressRegion: company.county,
    ...(company.postalCode && { postalCode: company.postalCode }),
    addressCountry: company.country,
  };
}

export function organizationSchema() {
  return {
    '@type': 'Organization',
    '@id': ORG_ID,
    name: BRAND_NAME,
    alternateName: BRAND_ALT_NAMES,
    ...(company.legalName && { legalName: company.legalName }),
    ...(company.cui && { taxID: company.cui }),
    url: SITE_URL,
    logo: `${SITE_URL}/logo.png`,
    image: `${SITE_URL}/og-image.jpg`,
    email: contact.email,
    telephone: e164(contact.phone),
    address: postalAddress(),
    brand: {
      '@type': 'Brand',
      name: BRAND_NAME,
      alternateName: BRAND_ALT_NAMES,
      logo: `${SITE_URL}/logo.png`,
    },
    knowsAbout: [
      'Debitare laser tablă',
      'Debitare laser țeavă',
      'Confecții metalice',
      'Sudură TIG și MIG',
      'Vopsire în câmp electrostatic',
      'Cadre metalice pentru somiere',
      'Picioare de masă metalice',
      'Porți și garduri metalice',
      'Balustrade metalice',
    ],
    contactPoint: [
      {
        '@type': 'ContactPoint',
        telephone: e164(contact.phone),
        email: contact.email,
        contactType: 'sales',
        areaServed: 'RO',
        availableLanguage: ['ro'],
      },
    ],
  };
}

export function localBusinessSchema() {
  return {
    '@type': 'LocalBusiness',
    '@id': BUSINESS_ID,
    // Fabrică / unitate de producție (Wikidata: factory)
    additionalType: 'https://www.wikidata.org/wiki/Q83405',
    name: BRAND_NAME,
    alternateName: BRAND_ALT_NAMES,
    url: SITE_URL,
    image: `${SITE_URL}/og-image.jpg`,
    logo: `${SITE_URL}/logo.png`,
    telephone: e164(contact.phone),
    email: contact.email,
    address: postalAddress(),
    areaServed: serviceArea.map((name) => ({ '@type': 'Place', name })),
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '09:00',
        closes: '18:00',
      },
    ],
    parentOrganization: { '@id': ORG_ID },
  };
}

export function websiteSchema() {
  return {
    '@type': 'WebSite',
    '@id': SITE_ID,
    url: SITE_URL,
    name: BRAND_NAME,
    alternateName: BRAND_ALT_NAMES,
    inLanguage: 'ro-RO',
    publisher: { '@id': ORG_ID },
  };
}

export function breadcrumbSchema(items) {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: `${SITE_URL}${item.path}`,
    })),
  };
}

export function faqSchema(faqs) {
  return {
    '@type': 'FAQPage',
    mainEntity: faqs.map(({ q, a }) => ({
      '@type': 'Question',
      name: q,
      acceptedAnswer: { '@type': 'Answer', text: a },
    })),
  };
}

export function serviceSchema({ name, description, path, serviceType }) {
  return {
    '@type': 'Service',
    name,
    description,
    serviceType,
    url: `${SITE_URL}${path}`,
    provider: { '@id': BUSINESS_ID },
    brand: { '@type': 'Brand', name: BRAND_NAME },
    areaServed: serviceArea.map((n) => ({ '@type': 'Place', name: n })),
  };
}

export function productSchema(p) {
  const url = `${SITE_URL}/produs/${p.slug}`;
  const base = {
    '@type': 'Product',
    '@id': `${url}#product`,
    name: p.title,
    description: p.description,
    image: [`${SITE_URL}/products/${p.slug}.jpg`],
    sku: p.slug,
    url,
    brand: { '@type': 'Brand', name: BRAND_NAME },
    manufacturer: { '@id': ORG_ID },
    material: p.material,
    category: 'Picioare de masă',
  };
  if (p.priceOnRequest || typeof p.basePrice !== 'number') return base;
  return {
    ...base,
    offers: {
      '@type': 'Offer',
      url,
      priceCurrency: 'RON',
      price: p.basePrice.toFixed(2),
      availability: 'https://schema.org/InStock',
      itemCondition: 'https://schema.org/NewCondition',
      seller: { '@id': ORG_ID },
      hasMerchantReturnPolicy: {
        '@type': 'MerchantReturnPolicy',
        applicableCountry: 'RO',
        returnPolicyCategory: 'https://schema.org/MerchantReturnFiniteReturnWindow',
        merchantReturnDays: 14,
        returnMethod: 'https://schema.org/ReturnByMail',
        returnFees: 'https://schema.org/ReturnShippingFees',
      },
    },
  };
}

export function blogPostingSchema(post) {
  const url = `${SITE_URL}/blog/${post.slug}`;
  return {
    '@type': 'BlogPosting',
    '@id': `${url}#article`,
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.updated || post.date,
    inLanguage: 'ro-RO',
    articleSection: post.category,
    mainEntityOfPage: url,
    image: `${SITE_URL}/og-image.jpg`,
    author: { '@id': ORG_ID },
    publisher: { '@id': ORG_ID },
  };
}

export function graph(...nodes) {
  return { '@context': 'https://schema.org', '@graph': nodes.flat().filter(Boolean) };
}

export { companyAddressLine };

export function itemListSchema(products) {
  return {
    '@type': 'ItemList',
    name: 'Picioare de masă metalice KRAFT Metalworks',
    numberOfItems: products.length,
    itemListElement: products.map((p, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      url: `${SITE_URL}/produs/${p.slug}`,
      name: p.title,
    })),
  };
}
