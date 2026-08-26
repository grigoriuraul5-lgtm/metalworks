// ─────────────────────────────────────────────────────────────────────────────
// Sursă unică de adevăr pentru cele 17 (+viitoare) produse reale "Picioare de
// Masă" — folosită ATÂT de site (CatalogShowroom.jsx) CÂT ȘI de feed-ul
// Google Merchant Center (api/google-feed.js).
//
// CUM ADAUGI UN PRODUS NOU ÎN VIITOR:
//   1. Pune poza optimizată (sub ~300KB, format .jpg) în: public/products/<slug>.jpg
//   2. Adaugă un obiect nou în array-ul de mai jos, cu un `slug` unic.
//   3. Publică pe GitHub — apare automat și pe site, și în feed-ul Google,
//      fără nicio altă modificare de cod.
//
// NU șterge niciodată un produs care a fost deja trimis către Google Merchant
// Center dintr-un import istoric — mai bine setează `discontinued: true`
// (vezi mai jos) ca feed-ul să-l scoată curat din vânzare.
// ─────────────────────────────────────────────────────────────────────────────

export const BRAND = 'KRAFT Metalworks';
export const SITE_URL = 'https://www.kraftmetalworks.ro';

export const KRAFT_PRODUCTS = [
  {
    slug: 'picior-canon',
    title: 'Picior Canon',
    basePrice: 689,
    priceOnRequest: false,
    material: 'Țeavă rotundă 100×40 mm · vopsire electrostatică alb mat',
    description: 'Picior tip Canon cu bază cruciformă lată, gândit pentru stabilitate maximă la mese mari. Finisaj alb mat pentru interioare luminoase, scandinave.',
    specs: [
      { label: 'Profil', value: 'Țeavă 100×40 mm' },
      { label: 'Finisaj', value: 'Alb mat electrostatic' },
      { label: 'Bază', value: 'Cruciformă 700×700 mm' },
      { label: 'Înălțime', value: '740 mm' },
      { label: 'Livrare', value: '10 zile lucrătoare' },
    ],
    leadDays: 10,
  },
  {
    slug: 'picior-farm',
    title: 'Picior Farm',
    basePrice: 770,
    priceOnRequest: false,
    material: 'Profil masiv 100×50 mm · vopsire electrostatică negru mat',
    description: 'Profil masiv Farm, robust și simplu, potrivit pentru mese de bucătărie sau birouri de tip atelier.',
    specs: [
      { label: 'Profil', value: '100×50 mm' },
      { label: 'Finisaj', value: 'Negru mat electrostatic' },
      { label: 'Dimensiuni', value: 'H 740 mm / L 800 mm' },
      { label: 'Livrare', value: '10 zile lucrătoare' },
    ],
    leadDays: 10,
  },
  {
    slug: 'picior-h',
    title: 'Picior H',
    basePrice: 780,
    priceOnRequest: false,
    material: 'Profil masiv 100×100 mm · vopsire electrostatică negru mat',
    description: 'Set de două picioare tip H, cu profil gros de 100×100 mm — soluție solidă pentru blaturi late sau lungi.',
    specs: [
      { label: 'Profil', value: '100×100 mm' },
      { label: 'Finisaj', value: 'Negru mat electrostatic' },
      { label: 'Dimensiuni', value: 'H 740 mm / L 770 mm' },
      { label: 'Livrare', value: 'Set 2 bucăți · 10 zile lucrătoare' },
    ],
    leadDays: 10,
  },
  {
    slug: 'picior-manuta',
    title: 'Picior Mânuță',
    basePrice: 625,
    priceOnRequest: false,
    material: 'Profil 80×40 mm · vopsire electrostatică negru mat',
    description: 'Set de două picioare Mânuță, profil compact, ideal pentru mese de zi cu zi în spații mai mici.',
    specs: [
      { label: 'Profil', value: '80×40 mm' },
      { label: 'Finisaj', value: 'Negru mat electrostatic' },
      { label: 'Dimensiuni', value: 'H 740 mm / L 600 mm' },
      { label: 'Livrare', value: 'Set 2 bucăți · 8 zile lucrătoare' },
    ],
    leadDays: 8,
  },
  {
    slug: 'picior-spin-salon',
    title: 'Picior Spin Salon',
    basePrice: 790,
    priceOnRequest: false,
    material: 'Țeavă 80×80 mm sau 100×100 mm · vopsire electrostatică negru mat',
    description: 'Picior Spider Salon cu braț radiant, disponibil în două lungimi — pentru mese de living de dimensiuni medii sau mari. Prețul afișat e cel de bază (varianta H740/L1400); varianta mai mare costă 830 RON.',
    specs: [
      { label: 'Varianta 1', value: 'H740 / L1400 / l690 · 790 RON' },
      { label: 'Varianta 2', value: 'H740 / L1470 / l710 · 830 RON' },
      { label: 'Finisaj', value: 'Negru mat electrostatic' },
      { label: 'Livrare', value: 'Specifică varianta dorită la comandă' },
    ],
    leadDays: 10,
  },
  {
    slug: 'picior-u-mic',
    title: 'Picior U Mic',
    basePrice: 410,
    priceOnRequest: false,
    material: 'Profil 80×80 mm · vopsire electrostatică negru mat',
    description: 'Set de două picioare U Mic, înălțime joasă — gândite special pentru măsuțe de cafea sau console joase.',
    specs: [
      { label: 'Profil', value: '80×80 mm' },
      { label: 'Finisaj', value: 'Negru mat electrostatic' },
      { label: 'Dimensiuni', value: 'H 340 mm / L 580 mm' },
      { label: 'Livrare', value: 'Set 2 bucăți · 7 zile lucrătoare' },
    ],
    leadDays: 7,
  },
  {
    slug: 'picior-u',
    title: 'Picior U',
    basePrice: 560,
    priceOnRequest: false,
    material: 'Profil 80×40 mm · vopsire electrostatică negru mat',
    description: 'Set de două picioare U, profil 80×40 mm, echilibru între stabilitate și eleganță minimalistă.',
    specs: [
      { label: 'Profil', value: '80×40 mm' },
      { label: 'Finisaj', value: 'Negru mat electrostatic' },
      { label: 'Dimensiuni', value: 'H 740 mm / L 770 mm' },
      { label: 'Livrare', value: 'Set 2 bucăți · 10 zile lucrătoare' },
    ],
    leadDays: 10,
  },
  {
    slug: 'picior-ufo',
    title: 'Picior UFO',
    basePrice: 295,
    priceOnRequest: false,
    material: 'Profil 40×30 mm · vopsire electrostatică negru mat',
    description: 'Picior UFO, compact și discret, potrivit pentru mese mici, birouri sau console de hol.',
    specs: [
      { label: 'Profil', value: '40×30 mm' },
      { label: 'Finisaj', value: 'Negru mat electrostatic' },
      { label: 'Dimensiuni', value: 'H 420 mm / L 400 mm' },
      { label: 'Livrare', value: '7 zile lucrătoare' },
    ],
    leadDays: 7,
  },
  {
    slug: 'picior-v',
    title: 'Picior V',
    basePrice: 695,
    priceOnRequest: false,
    material: 'Profil 80×40 mm · vopsire electrostatică negru mat',
    description: 'Set de două picioare V, cu geometrie deschisă pentru stabilitate laterală crescută.',
    specs: [
      { label: 'Profil', value: '80×40 mm' },
      { label: 'Finisaj', value: 'Negru mat electrostatic' },
      { label: 'Dimensiuni', value: 'H 740 mm / L 570 mm' },
      { label: 'Livrare', value: 'Set 2 bucăți · 10 zile lucrătoare' },
    ],
    leadDays: 10,
  },
  {
    slug: 'picior-x-mic',
    title: 'Picior X Mic',
    basePrice: 420,
    priceOnRequest: false,
    material: 'Profil 80×80 mm · vopsire electrostatică negru mat',
    description: 'Set de două picioare X Mic, format compact, potrivit pentru mese de bistro sau spații reduse.',
    specs: [
      { label: 'Profil', value: '80×80 mm' },
      { label: 'Finisaj', value: 'Negru mat electrostatic' },
      { label: 'Dimensiuni', value: 'H 370 mm / L 580 mm' },
      { label: 'Livrare', value: 'Set 2 bucăți · 7 zile lucrătoare' },
    ],
    leadDays: 7,
  },
  {
    slug: 'picior-x',
    title: 'Picior X',
    basePrice: 790,
    priceOnRequest: false,
    material: 'Profil masiv 100×100 mm · vopsire electrostatică negru mat',
    description: 'Set de două picioare X, profil masiv 100×100 mm — clasicul industrial, foarte stabil pe orice tip de blat.',
    specs: [
      { label: 'Profil', value: '100×100 mm' },
      { label: 'Finisaj', value: 'Negru mat electrostatic' },
      { label: 'Dimensiuni', value: 'H 740 mm / L 770 mm' },
      { label: 'Livrare', value: 'Set 2 bucăți · 10 zile lucrătoare' },
    ],
    leadDays: 10,
  },
  {
    // Fără preț fix încă (de completat de Raul) — exclus automat din feed-ul
    // Google până primește un `basePrice`, pentru că Merchant Center respinge
    // produsele fără preț.
    slug: 'picior-xy',
    title: 'Picior XY',
    basePrice: null,
    priceOnRequest: true,
    material: 'Profil oțel · vopsire electrostatică negru mat',
    description: 'Picior XY cu geometrie dublă în X, pentru mese late sau de dimensiuni speciale. Dimensiuni și preț exact confirmate la cerere, în funcție de configurație.',
    specs: [
      { label: 'Finisaj', value: 'Negru mat electrostatic' },
      { label: 'Dimensiuni', value: 'La cerere' },
      { label: 'Livrare', value: 'Confirmăm termenul la comandă' },
    ],
    leadDays: 10,
  },
  {
    slug: 'picior-masa-oval',
    title: 'Picior Masă Oval',
    basePrice: 500,
    priceOnRequest: false,
    material: 'Țeavă rotundă Ø76 mm, bază disc Ø400 mm · vopsire electrostatică negru mat',
    description: 'Bază pedestal cu coloană centrală și disc de sprijin, potrivită pentru blaturi rotunde sau ovale de dimensiuni medii.',
    specs: [
      { label: 'Bază', value: 'Disc Ø400 mm' },
      { label: 'Finisaj', value: 'Negru mat electrostatic' },
      { label: 'Înălțime', value: '~720 mm' },
      { label: 'Livrare', value: '10 zile lucrătoare' },
    ],
    leadDays: 10,
  },
  {
    slug: 'picior-tubular-cap-patrat',
    title: 'Picior Tubular Cap Pătrat',
    basePrice: 560,
    priceOnRequest: false,
    material: '4× țeavă rotundă Ø25 mm, bază în cruce · vopsire electrostatică negru mat',
    description: 'Bază cu patru picioare zvelte și cadru în cruce, aspect minimalist pentru mese înalte sau de bar.',
    specs: [
      { label: 'Design', value: '4 picioare subțiri' },
      { label: 'Bază', value: 'Stabilă, în cruce' },
      { label: 'Finisaj', value: 'Negru mat electrostatic' },
      { label: 'Livrare', value: '10 zile lucrătoare' },
    ],
    leadDays: 10,
  },
  {
    slug: 'picior-patrat-dublu',
    title: 'Picior Pătrat Dublu',
    basePrice: 850,
    priceOnRequest: false,
    material: '2× țeavă pătrată 60×60 mm · vopsire electrostatică negru mat',
    description: 'Bază dublă cu profil pătrat, gândită pentru mese console sau blaturi dreptunghiulare late.',
    specs: [
      { label: 'Profil', value: 'Dublu 60×60 mm' },
      { label: 'Bază', value: 'Dreptunghiulară, stabilă' },
      { label: 'Finisaj', value: 'Negru mat electrostatic' },
      { label: 'Livrare', value: '10 zile lucrătoare' },
    ],
    leadDays: 10,
  },
  {
    slug: 'picior-masa-cafenea',
    title: 'Picior Masă Cafenea',
    basePrice: 490,
    priceOnRequest: false,
    material: 'Țeavă rotundă Ø60 mm, bază disc Ø350 mm · vopsire electrostatică negru mat',
    description: 'Picior dedicat măsuțelor de cafea, cu bază disc pentru stabilitate maximă la înălțime joasă.',
    specs: [
      { label: 'Bază', value: 'Disc Ø350 mm' },
      { label: 'Finisaj', value: 'Negru mat electrostatic' },
      { label: 'Înălțime', value: '~420 mm' },
      { label: 'Livrare', value: '7 zile lucrătoare' },
    ],
    leadDays: 7,
  },
  {
    slug: 'picior-anaconda',
    title: 'Picior Anaconda',
    basePrice: 390,
    priceOnRequest: false,
    material: 'Platbandă curbată 80×8 mm · vopsire electrostatică negru mat',
    description: 'Piesă sculpturală Anaconda, din platbandă curbată manual — design unicat pentru mese statement.',
    specs: [
      { label: 'Fabricație', value: 'Manuală, piesă unicat' },
      { label: 'Design', value: 'Sculptural, curbat' },
      { label: 'Finisaj', value: 'Negru mat electrostatic' },
      { label: 'Livrare', value: '12–15 zile lucrătoare' },
    ],
    leadDays: 15,
  },
];
