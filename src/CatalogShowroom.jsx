import { useState, useMemo, useEffect, useRef } from 'react';
import { ShoppingCart, X } from 'lucide-react';
import logo from './assets/logo 1.png';

// ── Porți & Garduri ───────────────────────────────────────────────────────────
import pgR1 from './assets/porti,garduri.json/poarta gard 1.jpg';
import pgR2 from './assets/porti,garduri.json/poarta gard 2.jpg';
import pgR3 from './assets/porti,garduri.json/poarta gard 3.jpg';
import pgR4 from './assets/porti,garduri.json/poarta gard 4.jpg';
import pgR5 from './assets/porti,garduri.json/poarta gard 5.jpg';
import pgR6 from './assets/porti,garduri.json/poarta gard 6.jpg';
import pgR7 from './assets/porti,garduri.json/poarta gard 7.jpg';
import pgS1 from './assets/porti,garduri.json/schita poarta gard 1.jpg';
import pgS2 from './assets/porti,garduri.json/schita poarta gard 2.jpg';
import pgS3 from './assets/porti,garduri.json/schita poarta gard 3.jpg';
import pgS4 from './assets/porti,garduri.json/schita poarta gard 4.jpg';
import pgS5 from './assets/porti,garduri.json/schita poarta gard 5.jpg';
import pgS6 from './assets/porti,garduri.json/schita poarta gard 6.jpg';
import pgS7 from './assets/porti,garduri.json/schita poarta gard 7.jpg';

// ── Feronerie ─────────────────────────────────────────────────────────────────
import ferR1 from './assets/elemente feronerie,exemple.json/1.jpg';
import ferR2 from './assets/elemente feronerie,exemple.json/2.jpg';
import ferR3 from './assets/elemente feronerie,exemple.json/3.jpg';
import ferR4 from './assets/elemente feronerie,exemple.json/4.jpg';
import ferS1 from './assets/elemente feronerie,exemple.json/1 si.jpg';
import ferS2 from './assets/elemente feronerie,exemple.json/2 si.jpg';
import ferS3 from './assets/elemente feronerie,exemple.json/3 si.jpg';
import ferS4 from './assets/elemente feronerie,exemple.json/si 4.jpg';

// ── Grătare Outdoor ───────────────────────────────────────────────────────────
import grat1 from './assets/gratare outdor.json/gratar 1.jpg';
import grat2 from './assets/gratare outdor.json/gratar 2.jpg';
import grat3 from './assets/gratare outdor.json/gratar 3.jpg';
import grat4 from './assets/gratare outdor.json/gratar 4 (2).jpg';
import grat5 from './assets/gratare outdor.json/gratar 5.jpg';

// ── Picioare de Masă ──────────────────────────────────────────────────────────
import pm1  from './assets/picioare masa.json/picioare de masa 1.jpg';
import pm2  from './assets/picioare masa.json/picioare de masa 2.jpeg';
import pm3  from './assets/picioare masa.json/picioare de masa 3.jpg';
import pm4  from './assets/picioare masa.json/picioare de masa 4.jpeg';
import pm5  from './assets/picioare masa.json/picioare de masa 5.jpeg';
import pm6  from './assets/picioare masa.json/picioare de masa 6.jpg';
import pm7  from './assets/picioare masa.json/masa decorativa 7.jpg';
import pm8  from './assets/picioare masa.json/picioare de masa 8.jpeg';
import pm9  from './assets/picioare masa.json/picioare masa 9.jpg';
import pm10 from './assets/picioare masa.json/picioare de masa 10.jpg';

// ── Design Interior & Exterior ────────────────────────────────────────────────
import di1 from './assets/elemente design inetrior exterior.json/dulap genial.jpg';
import di2 from './assets/elemente design inetrior exterior.json/masa confort filigorie.jpg';
import di3 from './assets/elemente design inetrior exterior.json/scaun de satat jos.jpg';
import di4 from './assets/elemente design inetrior exterior.json/suport vinuri si pahare.jpg';

// ─────────────────────────────────────────────────────────────────────────────

const CATEGORIES = [
  { id: 'all',             label: 'Toate Produsele' },
  { id: 'porti-garduri',   label: 'Porți & Garduri' },
  { id: 'feronerie',       label: 'Feronerie' },
  { id: 'gratare',         label: 'Grătare Outdoor' },
  { id: 'picioare-masa',   label: 'Picioare de Masă' },
  { id: 'design-interior', label: 'Design Interior & Exterior' },
];

const PRODUCTS = [
  {
    id: 'pg-1', category: 'porti-garduri', title: 'Poartă Culisantă Meridian',
    imgRender: pgR1, imgSketch: pgS1, aspect: 'portrait', hasSketch: true,
    basePrice: 2800, material: 'Oțel structural S355 · grosime 4 mm · vopsit electrostatic',
    description: 'Poartă culisantă cu lamele verticale fine din oțel S355 de 4 mm, sudată complet MIG și apretată cu grund epoxidic bicomponent înainte de vopsirea electrostatică în câmp. Compoziția lineară și precizia cordonului de sudură TIG asigură o estetică industrială de nivel premium, cu rezistență la coroziune și intemperii pentru decenii.',
    specs: [
      { label: 'Material', value: 'Oțel structural S355' },
      { label: 'Grosime profil', value: '4 mm' },
      { label: 'Dim. standard', value: 'H: 2.000 mm × L: 1.000 mm' },
      { label: 'Finisaj', value: 'Sablare + Vopsire electrostatică mată' },
      { label: 'Mecanism', value: 'Manual · Motor electric opțional' },
    ],
  },
  {
    id: 'pg-2', category: 'porti-garduri', title: 'Poartă Batantă Oxford',
    imgRender: pgR2, imgSketch: pgS2, aspect: 'portrait', hasSketch: true,
    basePrice: 3200, material: 'Oțel structural S355 · grosime 5 mm · negru mat / antracit',
    description: 'Construcție masivă din oțel structural S355 de 5 mm, proiectată pentru proprietăți rezidențiale de lux care cer deopotrivă securitate și estetică impecabilă. Disponibilă în antracit mat sau negru profund, cu posibilitate de automatizare completă prin motor hidraulic sau electromecanic.',
    specs: [
      { label: 'Material', value: 'Oțel structural S355' },
      { label: 'Grosime profil', value: '5 mm' },
      { label: 'Dim. standard', value: 'H: 2.000 mm × L: 1.000 mm' },
      { label: 'Finisaj', value: 'Negru mat / Antracit RAL 7016' },
      { label: 'Mecanism', value: 'Manual · Hidraulic opțional' },
    ],
  },
  {
    id: 'pg-3', category: 'porti-garduri', title: 'Poartă Corten Signature',
    imgRender: pgR3, imgSketch: pgS3, aspect: 'portrait', hasSketch: true,
    basePrice: 3500, material: 'Oțel Corten A · patinare naturală auto-protectivă',
    description: 'Poartă din oțel Corten A cu patinare naturală auto-protectivă — un finisaj unic care elimină complet necesitatea vopsirii pe toată durata de viață a produsului. Caracterul autentic al oxidării controlate și grimasajul bronzat fac din această poartă o piesă de arhitectură peisagistică.',
    specs: [
      { label: 'Material', value: 'Oțel Corten A (EN 10025-5)' },
      { label: 'Grosime profil', value: '4 mm' },
      { label: 'Finisaj', value: 'Patinare naturală / Negru mat' },
      { label: 'Rezistență', value: '50+ ani exterior fără vopsire' },
      { label: 'Mecanism', value: 'Manual · Electric opțional' },
    ],
  },
  {
    id: 'pg-4', category: 'porti-garduri', title: 'Poartă Artizanală Essex',
    imgRender: pgR4, imgSketch: pgS4, aspect: 'portrait', hasSketch: true,
    basePrice: 2500, material: 'Oțel S235 · grosime 3 mm · vopsit electrostatic',
    description: 'Design elegant și curat, realizat din oțel S235 de 3 mm, perfect pentru proprietăți rezidențiale care caută echilibrul dintre securitate, estetica modernă și un preț accesibil în segmentul premium. Fiecare element este vopsit electrostatic pentru o finisare uniformă și durabilă.',
    specs: [
      { label: 'Material', value: 'Oțel S235' },
      { label: 'Grosime profil', value: '3 mm' },
      { label: 'Dim. standard', value: 'H: 2.000 mm × L: 1.000 mm' },
      { label: 'Finisaj', value: 'Vopsire electrostatică negru mat' },
      { label: 'Mecanism', value: 'Manual' },
    ],
  },
  {
    id: 'pg-5', category: 'porti-garduri', title: 'Panou Gard Linear 05',
    imgRender: pgR5, imgSketch: pgS5, aspect: 'portrait', hasSketch: true,
    basePrice: 1800, material: 'Oțel S235 · profil tub pătrat 40×40 mm',
    description: 'Sistem modular de împrejmuire din tuburi pătrate 40×40 mm, conceput pentru instalare rapidă în serii mari. Rigiditate structurală maximă, aspect curat și minimalist, livrat la comandă cu orice lungime de panou.',
    specs: [
      { label: 'Material', value: 'Oțel S235' },
      { label: 'Profil tub', value: 'Pătrat 40×40 mm · perete 2 mm' },
      { label: 'Înălțime standard', value: '1.500–2.000 mm' },
      { label: 'Finisaj', value: 'Grunduire + Negru mat electrostatic' },
      { label: 'Livrare', value: 'Per panou la comandă' },
    ],
  },
  {
    id: 'pg-6', category: 'porti-garduri', title: 'Panou Gard Industrial 06',
    imgRender: pgR6, imgSketch: pgS6, aspect: 'portrait', hasSketch: true,
    basePrice: 2100, material: 'Oțel S355 · profil tub pătrat 50×50 mm · antracit',
    description: 'Profil robust 50×50 mm din oțel structural S355, destinat proprietăților comerciale sau rezidențiale care necesită un sistem de împrejmuire cu rezistență structurală superioară și aspect premium. Vopsit electrostatic în antracit mat RAL 7016.',
    specs: [
      { label: 'Material', value: 'Oțel structural S355' },
      { label: 'Profil tub', value: 'Pătrat 50×50 mm · perete 3 mm' },
      { label: 'Înălțime standard', value: '1.800–2.200 mm' },
      { label: 'Finisaj', value: 'Antracit mat RAL 7016 electrostatic' },
      { label: 'Livrare', value: 'Per panou la comandă' },
    ],
  },
  {
    id: 'pg-7', category: 'porti-garduri', title: 'Gard Lamele Horizon',
    imgRender: pgR7, imgSketch: pgS7, aspect: 'portrait', hasSketch: true,
    basePrice: 2400, material: 'Oțel S355 · design contemporan cu lamele orizontale',
    description: 'Design contemporan cu lamele orizontale fine, creând un efect vizual de orizont deschis care sporește eleganța oricărei proprietăți. Disponibil în Corten natural sau negru mat, la dimensiuni complet personalizabile.',
    specs: [
      { label: 'Material', value: 'Oțel S355' },
      { label: 'Design', value: 'Lamele orizontale fine' },
      { label: 'Finisaj', value: 'Negru mat / Corten natural' },
      { label: 'Dimensiuni', value: 'Complet personalizabile' },
      { label: 'Livrare', value: 'La comandă · termen 10–15 zile' },
    ],
  },
  {
    id: 'fer-1', category: 'feronerie', title: 'Sistem Feronerie Kinematics 01',
    imgRender: ferR1, imgSketch: ferS1, aspect: 'portrait', hasSketch: true,
    basePrice: 480, material: 'Oțel carbon / Inox AISI 304 · finisaj mat satinat',
    description: 'Ansamblu de feronerie arhitecturală din oțel carbon și inox AISI 304, executat prin sudare MIG/TIG cu cordon uniform și șlefuit la finisaj mat satinat. Conceput pentru montaj integrat pe structuri de sticlă, lemn sau metal — precizia execuției este garantată de ingineria echipei noastre.',
    specs: [
      { label: 'Material', value: 'Oțel carbon / Inox AISI 304' },
      { label: 'Execuție', value: 'Sudat MIG/TIG + șlefuit manual' },
      { label: 'Finisaj', value: 'Negru mat satinat' },
      { label: 'Toleranță', value: '±0,2 mm' },
      { label: 'Prindere', value: 'Sudare sau șuruburi M8 inox' },
    ],
  },
  {
    id: 'fer-2', category: 'feronerie', title: 'Mâner Arhitectural Precision',
    imgRender: ferR2, imgSketch: ferS2, aspect: 'portrait', hasSketch: true,
    basePrice: 520, material: 'Inox AISI 304 · frezat CNC · toleranță ±0,1 mm',
    description: 'Mâner monobloc frezat CNC din inox AISI 304, cu toleranțe dimensionale de ±0,1 mm. Fiecare piesă este inspectată individual și livrată cu certificat de conformitate. Finisaj ales: satinat periat 180 grit, mat sau oglindă.',
    specs: [
      { label: 'Material', value: 'Inox AISI 304' },
      { label: 'Execuție', value: 'Frezare CNC + lefuire manuală' },
      { label: 'Finisaj', value: 'Satinat / Mat / Oglindă' },
      { label: 'Toleranță', value: '±0,1 mm' },
      { label: 'Lungime standard', value: '300 mm / 600 mm' },
    ],
  },
  {
    id: 'fer-3', category: 'feronerie', title: 'Balamă Structurală Forge',
    imgRender: ferR3, imgSketch: ferS3, aspect: 'portrait', hasSketch: true,
    basePrice: 380, material: 'Oțel masiv S355 · sudat TIG · cordon vizibil',
    description: 'Balamă din oțel masiv S355, sudată TIG cu cordon uniform vizibil — estetică industrial-autentică transformată în statement de design. Disponibilă în negru mat sau bronz patinat pentru proiecte cu caracter vintage-industrial. Sarcina dinamică admisă: 200 kg per balamă.',
    specs: [
      { label: 'Material', value: 'Oțel S355 masiv' },
      { label: 'Sudură', value: 'TIG – cordon uniform aparent' },
      { label: 'Finisaj', value: 'Negru mat / Bronz patinat' },
      { label: 'Sarcina dinamică', value: '200 kg / balamă' },
      { label: 'Livrare', value: 'Per bucată sau set' },
    ],
  },
  {
    id: 'fer-4', category: 'feronerie', title: 'Feronerie Presată Compact',
    imgRender: ferR4, imgSketch: ferS4, aspect: 'portrait', hasSketch: true,
    basePrice: 290, material: 'Oțel carbon · presat + sudat · vopsit electrostatic',
    description: 'Element de feronerie din oțel carbon, realizat prin presare industrială și sudare punct — eficiență inginerească pentru serii mari fără compromis la calitate. Vopsit electrostatic în negru mat sau orice culoare din paleta RAL la cerere.',
    specs: [
      { label: 'Material', value: 'Oțel carbon DC01' },
      { label: 'Execuție', value: 'Presare + sudare punct' },
      { label: 'Finisaj', value: 'Vopsire electrostatică negru mat' },
      { label: 'Culori disponibile', value: 'Negru mat / Orice RAL' },
      { label: 'Livrare', value: 'Per bucată sau set' },
    ],
  },
  {
    id: 'gr-1', category: 'gratare', title: 'Grătar Outdoor Vulcan 01',
    imgRender: grat1, aspect: 'landscape', hasSketch: false,
    basePrice: 1800, material: 'Oțel carbon S235 · bare plate 25×6 mm · rezistență 600°C',
    description: 'Grătar outdoor profesional din bare de oțel carbon S235 cu secțiune 25×6 mm, proiectat să reziste la temperaturi de peste 600°C fără deformare. Construcție solidă, sudată manual și finisată termorezistent — o soluție robustă pentru grădini private sau catering.',
    specs: [
      { label: 'Material', value: 'Oțel carbon S235' },
      { label: 'Secțiune bare', value: '25×6 mm plate' },
      { label: 'Rezistență termică', value: '600°C+ susținut' },
      { label: 'Finisaj', value: 'Brut / Vopsire termorezistentă' },
      { label: 'Dimensiuni', value: 'Standard sau la comandă' },
    ],
  },
  {
    id: 'gr-2', category: 'gratare', title: 'Grătar Heavy Duty Titan',
    imgRender: grat2, aspect: 'landscape', hasSketch: false,
    basePrice: 2400, material: 'Oțel carbon S355 · bare 30×8 mm · heavy duty',
    description: 'Construcție masivă din S355 cu bare de 30×8 mm, concepută pentru utilizare intensivă în restaurante cu foc deschis, catering profesional sau grădini de mari dimensiuni. Grunduit epoxi bicomponent pentru protecție maximă. Greutate ~45 kg/m².',
    specs: [
      { label: 'Material', value: 'Oțel structural S355' },
      { label: 'Secțiune bare', value: '30×8 mm plate' },
      { label: 'Rezistență termică', value: '600°C+ continuu' },
      { label: 'Finisaj', value: 'Grund epoxi bicomponent' },
      { label: 'Greutate', value: '~45 kg/m²' },
    ],
  },
  {
    id: 'gr-3', category: 'gratare', title: 'Grătar Corten Natura',
    imgRender: grat3, aspect: 'landscape', hasSketch: false,
    basePrice: 2200, material: 'Oțel Corten A · patinare naturală · rezistență 50+ ani',
    description: 'Grătar outdoor din oțel Corten A cu patinare naturală auto-protectivă — fără nicio vopsire necesară pe durata de viață a produsului. Caracterul industrial-rustic și rezistența de 50+ ani la exterior îl recomandă pentru proiecte de arhitectură peisagistică și amenajări premium.',
    specs: [
      { label: 'Material', value: 'Oțel Corten A (EN 10025-5)' },
      { label: 'Finisaj', value: 'Patinare naturală auto-protectivă' },
      { label: 'Rezistență exterior', value: '50+ ani fără vopsire' },
      { label: 'Greutate', value: '~38 kg/m²' },
      { label: 'Dimensiuni', value: 'Complet la comandă' },
    ],
  },
  {
    id: 'gr-4', category: 'gratare', title: 'Grătar Expandat Mesh',
    imgRender: grat4, aspect: 'landscape', hasSketch: false,
    basePrice: 1600, material: 'Oțel carbon S235 · tablă expandată romb · 6 mm',
    description: 'Grătar din tablă expandată cu motiv romb, grosime 6 mm — suprafața texturată asigură prindere excelentă a alimentelor și drenaj optim al grăsimilor. Soluție versatilă și rezistentă pentru platforme BBQ, pasarele industriale sau grătare de mari dimensiuni.',
    specs: [
      { label: 'Material', value: 'Oțel carbon S235' },
      { label: 'Tip tablă', value: 'Expandată romb' },
      { label: 'Grosime', value: '6 mm' },
      { label: 'Finisaj', value: 'Brut / Grunduit' },
      { label: 'Dimensiuni', value: 'Standard sau la comandă' },
    ],
  },
  {
    id: 'gr-5', category: 'gratare', title: 'Grătar Premium Inox',
    imgRender: grat5, aspect: 'landscape', hasSketch: false,
    basePrice: 2800, material: 'Inox AISI 304 · bare rotunde Ø12 mm · periat 180 grit',
    description: 'Execuție de înaltă clasă din bare rotunde Ø12 mm în inox AISI 304, periat la 180 grit pentru un aspect curat și premium. Rezistența la coroziune testată 1000h spray salin îl recomandă pentru instalații maritime sau restaurante de lux.',
    specs: [
      { label: 'Material', value: 'Inox AISI 304' },
      { label: 'Bare', value: 'Rotunde Ø12 mm' },
      { label: 'Finisaj', value: 'Periat 180 grit' },
      { label: 'Rezistență coroziune', value: '1.000h spray salin' },
      { label: 'Dimensiuni', value: 'La comandă' },
    ],
  },
  {
    id: 'pm-1', category: 'picioare-masa', title: 'Picior Masă Steel Classic',
    imgRender: pm1, aspect: 'landscape', hasSketch: false,
    basePrice: 850, material: 'Oțel S235 · vopsit electrostatic negru mat · H reglabil',
    description: 'Set de 2 picioare din oțel S235 cu înălțime reglabilă 71–76 cm și plăcuțe de prindere pre-găurite pentru montaj rapid pe orice blat din lemn masiv, piatră sau sticlă. Finisaj electrostatic negru mat cu rezistență la zgarieturi.',
    specs: [
      { label: 'Material', value: 'Oțel S235' },
      { label: 'Înălțime', value: 'H 71–76 cm (reglabil)' },
      { label: 'Finisaj', value: 'Negru mat electrostatic' },
      { label: 'Sarcina maximă', value: '300 kg' },
      { label: 'Livrare', value: 'Set 2 picioare + șuruburi' },
    ],
  },
  {
    id: 'pm-2', category: 'picioare-masa', title: 'Picior Flatbar Brushed',
    imgRender: pm2, aspect: 'landscape', hasSketch: false,
    basePrice: 1100, material: 'Oțel S355 · platbandă 80×10 mm · finisaj periat brushed',
    description: 'Design arhitectural din platbandă masivă 80×10 mm din oțel S355, cu finisaj periat brushed — estetică industrială premium care transformă masa într-o piesă de mobilier statement. Rigiditate structurală excepțională, sarcina maximă 500 kg.',
    specs: [
      { label: 'Material', value: 'Oțel S355' },
      { label: 'Profil', value: 'Platbandă 80×10 mm' },
      { label: 'Finisaj', value: 'Periat brushed 240 grit' },
      { label: 'Înălțime', value: 'H 71–76 cm' },
      { label: 'Sarcina maximă', value: '500 kg' },
    ],
  },
  {
    id: 'pm-3', category: 'picioare-masa', title: 'Picior Tube Square Loft',
    imgRender: pm3, aspect: 'landscape', hasSketch: false,
    basePrice: 950, material: 'Oțel S355 · tub pătrat 60×60×4 mm · negru mat / antracit',
    description: 'Structură din tuburi pătrate 60×60×4 mm din oțel S355 — design minimalist și versatil care se integrează perfect cu blaturi de lemn masiv, marmură sau prefabricate. Disponibil în negru mat sau antracit, cu plăcuțe de prindere pre-frezate incluse.',
    specs: [
      { label: 'Material', value: 'Oțel S355' },
      { label: 'Profil tub', value: 'Pătrat 60×60×4 mm' },
      { label: 'Finisaj', value: 'Negru mat / Antracit RAL 7016' },
      { label: 'Înălțime', value: 'H 71 cm standard' },
      { label: 'Sarcina maximă', value: '400 kg' },
    ],
  },
  {
    id: 'pm-4', category: 'picioare-masa', title: 'Picior Hairpin Forge',
    imgRender: pm4, aspect: 'landscape', hasSketch: false,
    basePrice: 780, material: 'Oțel S235 · hairpin 3 tije Ø12 mm · negru mat satinat',
    description: 'Set de 4 picioare hairpin cu 3 tije Ø12 mm — tendința industrial-vintage în designul mobilierului contemporan, realizată cu precizie inginerească. Finisaj negru mat satinat, montaj simplu cu șuruburi incluse.',
    specs: [
      { label: 'Material', value: 'Oțel S235' },
      { label: 'Tip', value: 'Hairpin · 3 tije Ø12 mm' },
      { label: 'Finisaj', value: 'Negru mat satinat' },
      { label: 'Înălțime', value: 'H 71 cm standard' },
      { label: 'Livrare', value: 'Set 4 picioare + șuruburi M8' },
    ],
  },
  {
    id: 'pm-5', category: 'picioare-masa', title: 'Picior L-Shape Minimal',
    imgRender: pm5, aspect: 'landscape', hasSketch: false,
    basePrice: 680, material: 'Oțel S235 · profil L minimalist · negru mat',
    description: 'Design minimal rafinat din profil L de oțel S235 — elegant, eficient și extrem de versatil. Ideal pentru birouri, mese de coffee-shop sau countertop-uri de bucătărie. Sarcina maximă 250 kg, finisaj negru mat rezistent la zgarieturi.',
    specs: [
      { label: 'Material', value: 'Oțel S235' },
      { label: 'Tip', value: 'Profil L minimalist' },
      { label: 'Finisaj', value: 'Negru mat electrostatic' },
      { label: 'Înălțime', value: 'H 71–76 cm' },
      { label: 'Sarcina maximă', value: '250 kg' },
    ],
  },
  {
    id: 'pm-6', category: 'picioare-masa', title: 'Picior X-Frame Industrial',
    imgRender: pm6, aspect: 'landscape', hasSketch: false,
    basePrice: 920, material: 'Oțel S355 · design X-frame · negru mat / periat',
    description: 'Structura X-frame cu impact vizual geometric puternic, executată din oțel structural S355 pentru mese de dining premium, birou executiv sau showroom. Disponibil în negru mat sau periat brushed, sarcina maximă de 450 kg.',
    specs: [
      { label: 'Material', value: 'Oțel structural S355' },
      { label: 'Design', value: 'X-frame industrial' },
      { label: 'Finisaj', value: 'Negru mat / Periat 240 grit' },
      { label: 'Înălțime', value: 'H 71–76 cm' },
      { label: 'Sarcina maximă', value: '450 kg' },
    ],
  },
  {
    id: 'pm-7', category: 'picioare-masa', title: 'Masă Decorativă Apex',
    imgRender: pm7, aspect: 'landscape', hasSketch: false,
    basePrice: 1400, material: 'Oțel S355 · structură completă · blat la alegere',
    description: 'Masă completă din oțel structural S355 cu blat la alegere — lemn masiv, sticlă securizată sau piatră naturală. Finisaj negru mat sau Corten, dimensiuni complet personalizabile la comandă.',
    specs: [
      { label: 'Material structură', value: 'Oțel structural S355' },
      { label: 'Blat', value: 'Lemn masiv / Sticlă / Piatră' },
      { label: 'Finisaj metal', value: 'Negru mat / Corten' },
      { label: 'Dimensiuni', value: 'Complet personalizabile' },
      { label: 'Sarcina maximă', value: '200 kg' },
    ],
  },
  {
    id: 'pm-8', category: 'picioare-masa', title: 'Suport Trestle Symmetric',
    imgRender: pm8, aspect: 'landscape', hasSketch: false,
    basePrice: 750, material: 'Oțel S235 · trestle simetric · profil U 60×30 mm',
    description: 'Design trestle simetric clasic reinterpretat în oțel industrial — o formă arhisimplă executată cu precizie desăvârșită din profil U 60×30 mm. Stabilitate maximă, sarcina admisă 350 kg.',
    specs: [
      { label: 'Material', value: 'Oțel S235' },
      { label: 'Design', value: 'Trestle simetric' },
      { label: 'Profil', value: 'U 60×30 mm' },
      { label: 'Înălțime', value: 'H 71 cm standard' },
      { label: 'Sarcina maximă', value: '350 kg' },
    ],
  },
  {
    id: 'pm-9', category: 'picioare-masa', title: 'Picior V-Cut Angular',
    imgRender: pm9, aspect: 'landscape', hasSketch: false,
    basePrice: 820, material: 'Oțel S355 · design angular V-cut · H 72 cm',
    description: 'Design geometric angular V-cut cu impact vizual distinct — liniile înclinate creează o tensiune estetică ce transformă orice masă într-o sculptură funcțională. Finisaj negru mat sau ivory, înălțime standard H 72 cm, sarcina maximă 300 kg.',
    specs: [
      { label: 'Material', value: 'Oțel structural S355' },
      { label: 'Design', value: 'Angular V-cut' },
      { label: 'Finisaj', value: 'Negru mat / Ivory RAL 9001' },
      { label: 'Înălțime', value: 'H 72 cm' },
      { label: 'Sarcina maximă', value: '300 kg' },
    ],
  },
  {
    id: 'pm-10', category: 'picioare-masa', title: 'Picior Monobloc Laser',
    imgRender: pm10, aspect: 'landscape', hasSketch: false,
    basePrice: 880, material: 'Oțel S355 · tablă 15 mm · tăiere laser + îndoire presă',
    description: 'Executat dintr-o singură bucată monobloc de tablă de oțel S355 de 15 mm prin tăiere laser de precizie și îndoire la presă hidraulică. Rigiditate absolută, sarcina maximă 600 kg, finisaj periat 240 grit sau vopsit RAL la alegere.',
    specs: [
      { label: 'Material', value: 'Oțel S355 · tablă 15 mm' },
      { label: 'Execuție', value: 'Tăiere laser + îndoire presă hidraulică' },
      { label: 'Finisaj', value: 'Periat 240 grit / Vopsit RAL' },
      { label: 'Înălțime', value: 'H 71–75 cm' },
      { label: 'Sarcina maximă', value: '600 kg' },
    ],
  },
  {
    id: 'di-1', category: 'design-interior', title: 'Dulap Industrial Genial',
    imgRender: di1, aspect: 'landscape', hasSketch: false,
    basePrice: 1800, material: 'Tablă oțel 2 mm · structurată · vopsit negru mat electrostatic',
    description: 'Dulap din tablă de oțel de 2 mm, structurat și vopsit electrostatic negru mat — o îmbinare de funcționalitate industrială și design minimalist pentru spații rezidențiale sau comerciale. Uși cu balamale piano din inox pentru deschidere lină și silențioasă.',
    specs: [
      { label: 'Material', value: 'Tablă oțel DC01 · 2 mm' },
      { label: 'Finisaj', value: 'Vopsire electrostatică negru mat' },
      { label: 'Uși', value: 'Balamale piano inox AISI 304' },
      { label: 'Montaj interior', value: 'Raft(uri) reglabile la comandă' },
      { label: 'Dimensiuni', value: 'Complet personalizabile' },
    ],
  },
  {
    id: 'di-2', category: 'design-interior', title: 'Masă Filigorie Confort',
    imgRender: di2, aspect: 'landscape', hasSketch: false,
    basePrice: 2200, material: 'Oțel S355 · structură + blat lemn masiv / sticlă / piatră',
    description: 'Masă premium pentru filigorie, terasă sau dining exterior — structură din oțel S355 finisată negru mat rezistent la UV, cu blat din lemn masiv, sticlă securizată sau piatră naturală la alegere. Design echilibrat între robustețe și eleganță.',
    specs: [
      { label: 'Material structură', value: 'Oțel structural S355' },
      { label: 'Blat disponibil', value: 'Lemn masiv / Sticlă / Piatră' },
      { label: 'Finisaj metal', value: 'Negru mat rezistent UV' },
      { label: 'Destinație', value: 'Interior · Filigorie · Exterior' },
      { label: 'Dimensiuni', value: 'Complet personalizabile' },
    ],
  },
  {
    id: 'di-3', category: 'design-interior', title: 'Scaun Lounge Forge',
    imgRender: di3, aspect: 'landscape', hasSketch: false,
    basePrice: 750, material: 'Oțel S235 fasonat · șezut tapițerie premium · negru mat',
    description: 'Scaun lounge cu cadru din oțel S235 fasonat manual și șezut tapițat la alegere — un obiect de mobilier care combină confortul cu estetica industrială. Finisaj negru mat satinat, înălțime șezut 44–46 cm, sarcina maximă 150 kg.',
    specs: [
      { label: 'Material cadru', value: 'Oțel S235 fasonat' },
      { label: 'Șezut', value: 'Tapițerie la alegere (stofă / piele)' },
      { label: 'Finisaj metal', value: 'Negru mat satinat' },
      { label: 'Înălțime șezut', value: '44–46 cm' },
      { label: 'Sarcina maximă', value: '150 kg' },
    ],
  },
  {
    id: 'di-4', category: 'design-interior', title: 'Suport Vinuri & Pahare Barista',
    imgRender: di4, aspect: 'landscape', hasSketch: false,
    basePrice: 420, material: 'Oțel carbon sudat · capacitate 6–12 sticle · negru mat',
    description: 'Suport mural din oțel carbon sudat, cu capacitate pentru 6–12 sticle și pahare suspendate — o piesă de design pentru bucătării deschise, baruri de lux sau restaurante cu concept industrial. Finisaj negru mat sau natural, montaj perete sau blat.',
    specs: [
      { label: 'Material', value: 'Oțel carbon sudat TIG' },
      { label: 'Capacitate', value: '6–12 sticle + pahare' },
      { label: 'Finisaj', value: 'Negru mat / Natural' },
      { label: 'Montaj', value: 'Perete (dibluri incluse) / Blat' },
      { label: 'Greutate proprie', value: '~3,5 kg' },
    ],
  },
];

// ─────────────────────────────────────────────────────────────────────────────

function ProductModal({ product, onClose, onAddToCart }) {
  const [showSketch, setShowSketch] = useState(false);
  const isSketch = product.hasSketch && showSketch;

  useEffect(() => {
    const esc = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', esc);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', esc);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  const handleAdd = () => {
    onAddToCart({
      product,
      size: { label: 'Standard' },
      finish: { label: 'Negru Mat' },
      price: product.basePrice,
    });
    onClose();
  };

  const catLabel = CATEGORIES.find((c) => c.id === product.category)?.label ?? '';

  return (
    <div
      className="fixed inset-0 z-[9995] flex items-start justify-center overflow-y-auto p-4 sm:items-center sm:p-6"
      style={{ background: 'rgba(10,10,10,0.92)' }}
      onClick={onClose}
    >
      <div
        className="relative my-auto flex w-full max-w-5xl flex-col overflow-hidden rounded-3xl border border-white/10 bg-[#111] shadow-[0_24px_80px_rgba(0,0,0,0.8)] lg:flex-row lg:max-h-[88vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close */}
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-black/60 text-[#f8f1e5] backdrop-blur-sm transition-all hover:border-[#c5a059] hover:text-[#c5a059]"
          aria-label="Închide"
        >
          <X className="h-4 w-4" />
        </button>

        {/* ── Image panel ── */}
        <div className="relative flex-1 bg-[#0a0a0a] lg:overflow-hidden" style={{ minHeight: '300px' }}>
          <img
            src={product.imgRender}
            alt={product.title}
            className={`absolute inset-0 h-full w-full object-contain transition-opacity duration-200 ${isSketch ? 'opacity-0' : 'opacity-100'}`}
          />
          {product.hasSketch && product.imgSketch && (
            <img
              src={product.imgSketch}
              alt={`${product.title} – schiță tehnică`}
              className={`absolute inset-0 h-full w-full object-contain transition-opacity duration-200 ${isSketch ? 'opacity-100' : 'opacity-0'}`}
            />
          )}
          <img
            src={logo}
            alt=""
            aria-hidden="true"
            className="pointer-events-none absolute right-4 top-4 h-10 w-auto select-none opacity-40 drop-shadow-[0_1px_4px_rgba(0,0,0,0.8)]"
          />
          {product.hasSketch && product.imgSketch && (
            <button
              type="button"
              onClick={() => setShowSketch((v) => !v)}
              className="absolute left-4 top-4 flex items-center gap-2 rounded-full border border-white/20 bg-black/70 px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-white/85 backdrop-blur-sm transition-all hover:border-[#c5a059]/80 hover:text-[#c5a059] active:scale-95"
            >
              <span className={`h-1.5 w-1.5 rounded-full transition-colors ${isSketch ? 'bg-[#c5a059]' : 'bg-white/40'}`} />
              {isSketch ? 'Randare' : 'Schiță Tehnică'}
            </button>
          )}
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-4">
            <span className="rounded-full border border-[#c5a059]/40 bg-black/50 px-3 py-1 text-[9px] uppercase tracking-[0.3em] text-[#c5a059]">
              {catLabel}
            </span>
          </div>
        </div>

        {/* ── Details panel ── */}
        <div className="flex w-full flex-col justify-between gap-5 overflow-y-auto border-t border-white/10 p-6 sm:p-8 lg:w-80 lg:border-t-0 lg:border-l lg:p-8">
          <div className="space-y-5">
            <div>
              <p className="mb-1 text-[10px] uppercase tracking-[0.3em] text-[#cfc5ad]/50">{catLabel}</p>
              <h2 className="text-2xl font-semibold leading-tight text-[#c5a059]">{product.title}</h2>
            </div>
            {product.description && (
              <p className="text-sm leading-7 text-[#cfc5ad]/80">{product.description}</p>
            )}
            <div>
              <p className="mb-1 text-[10px] uppercase tracking-[0.25em] text-[#cfc5ad]/50">Material</p>
              <p className="text-sm leading-6 text-[#cfc5ad]">{product.material}</p>
            </div>
            {product.specs && product.specs.length > 0 && (
              <div className="space-y-2">
                <p className="text-[10px] uppercase tracking-[0.3em] text-[#cfc5ad]/50">Specificații Tehnice</p>
                <div className="rounded-2xl border border-white/8 bg-white/4">
                  {product.specs.map(({ label, value }, i) => (
                    <div
                      key={label}
                      className={`flex items-baseline justify-between gap-3 px-4 py-2.5 ${i < product.specs.length - 1 ? 'border-b border-white/5' : ''}`}
                    >
                      <span className="shrink-0 text-[10px] uppercase tracking-[0.15em] text-[#cfc5ad]/50">{label}</span>
                      <span className="text-right text-xs text-[#f8f1e5]">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          <div className="space-y-3 border-t border-white/10 pt-5">
            <div>
              <p className="mb-1 text-[10px] uppercase tracking-[0.25em] text-[#cfc5ad]/50">Preț de bază</p>
              <p className="text-2xl font-semibold text-[#f8f1e5]">{product.basePrice.toLocaleString('ro-RO')} RON</p>
              <p className="mt-0.5 text-[10px] text-[#cfc5ad]/40">Prețul final poate varia în funcție de dimensiuni</p>
            </div>
            <button
              type="button"
              onClick={handleAdd}
              className="flex w-full items-center justify-center gap-2 rounded-full bg-[#c5a059] py-3.5 text-xs uppercase tracking-[0.25em] text-[#0a0a0a] transition-all duration-300 hover:bg-[#b79245] hover:shadow-[0_0_24px_rgba(197,160,89,0.4)] active:scale-[0.98]"
            >
              <ShoppingCart className="h-3.5 w-3.5" /> Adaugă în Coș
            </button>
            <p className="text-center text-[9px] uppercase tracking-[0.2em] text-[#cfc5ad]/35">
              Prețuri orientative · confirmăm înainte de execuție
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────

function ProductCard({ product, onOpenModal, onAddToCart }) {
  const [showSketch, setShowSketch] = useState(false);
  const isSketch = product.hasSketch && showSketch;

  const handleAdd = (e) => {
    e.stopPropagation();
    onAddToCart({
      product,
      size: { label: 'Standard' },
      finish: { label: 'Negru Mat' },
      price: product.basePrice,
    });
  };

  return (
    <article className="group overflow-hidden rounded-2xl border border-white/10 bg-[#111] transition-all duration-500 hover:-translate-y-0.5 hover:border-[#c5a059]/40 hover:shadow-[0_12px_50px_rgba(197,160,89,0.18)]">
      <div
        className="relative cursor-pointer overflow-hidden"
        onClick={() => onOpenModal(product)}
      >
        <img
          src={product.imgRender}
          alt={product.title}
          className={`w-full h-auto block transition-all duration-500 group-hover:brightness-[1.04] ${isSketch ? 'opacity-0' : 'opacity-100'}`}
        />
        {product.hasSketch && product.imgSketch && (
          <img
            src={product.imgSketch}
            alt={`${product.title} – schiță tehnică`}
            className={`absolute inset-0 h-full w-full object-contain bg-[#0d0d0d] transition-opacity duration-200 ${isSketch ? 'opacity-100' : 'opacity-0'}`}
          />
        )}
        <img
          src={logo}
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute right-3 top-3 h-7 w-auto select-none opacity-40 drop-shadow-[0_1px_4px_rgba(0,0,0,0.7)]"
        />
        {product.hasSketch && product.imgSketch && (
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); setShowSketch((v) => !v); }}
            className="absolute left-3 top-3 flex items-center gap-1.5 rounded-full border border-white/20 bg-black/65 px-2.5 py-1.5 text-[9px] font-semibold uppercase tracking-[0.22em] text-white/85 backdrop-blur-sm transition-all duration-200 hover:border-[#c5a059]/80 hover:text-[#c5a059] active:scale-95"
          >
            <span className={`h-1.5 w-1.5 rounded-full transition-colors duration-200 ${isSketch ? 'bg-[#c5a059]' : 'bg-white/40'}`} />
            {isSketch ? 'Randare' : 'Schiță'}
          </button>
        )}
      </div>
      <div className="flex items-center justify-between gap-2 px-4 py-3">
        <div className="min-w-0">
          <p className="truncate text-[11px] font-semibold uppercase tracking-[0.15em] text-[#f8f1e5]/90">
            {product.title}
          </p>
          <p className="mt-0.5 text-sm font-semibold text-[#c5a059]">
            {product.basePrice.toLocaleString('ro-RO')}
            <span className="ml-1 text-[10px] font-normal text-[#c5a059]/60">RON</span>
          </p>
        </div>
        <button
          type="button"
          onClick={handleAdd}
          className="shrink-0 flex items-center gap-1.5 rounded-full border border-[#c5a059]/50 bg-[#c5a059]/10 px-3 py-2 text-[9px] uppercase tracking-[0.15em] text-[#c5a059] transition-all duration-200 hover:bg-[#c5a059] hover:text-[#0a0a0a] active:scale-95"
        >
          <ShoppingCart className="h-3 w-3" />
          <span>Adaugă</span>
        </button>
      </div>
    </article>
  );
}

// ─────────────────────────────────────────────────────────────────────────────

export function CatalogShowroom({ onAddToCart }) {
  const [activeCat, setActiveCat]   = useState('all');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMobile, setIsMobile]     = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 639px)');
    setIsMobile(mq.matches);
    const handler = (e) => setIsMobile(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  const filtered = useMemo(
    () => activeCat === 'all' ? PRODUCTS : PRODUCTS.filter((p) => p.category === activeCat),
    [activeCat],
  );

  const mobilePreview = useMemo(() => {
    const cats = ['porti-garduri', 'feronerie', 'gratare', 'picioare-masa', 'design-interior'];
    return cats.map((cat) => PRODUCTS.find((p) => p.category === cat)).filter(Boolean).slice(0, 4);
  }, []);

  const handleCatChange = (catId) => {
    setActiveCat(catId);
    setIsExpanded(false);
  };

  const handleCollapse = () => {
    setIsExpanded(false);
    setTimeout(() => {
      sectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 50);
  };

  const showMobileLimit   = isMobile && activeCat === 'all' && !isExpanded;
  const displayedProducts = showMobileLimit ? mobilePreview : filtered;

  return (
    <>
      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onAddToCart={onAddToCart}
        />
      )}

      <section id="collection" ref={sectionRef} className="border-t border-white/10 px-5 py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">

          {/* ── Section header ── */}
          <div className="mb-10 max-w-3xl">
            <p className="mb-3 text-sm uppercase tracking-[0.35em] text-[#c5a059]">Showroom Interactiv</p>
            <h2 className="text-4xl font-semibold leading-tight text-[#c5a059] sm:text-5xl">
              Catalog Produse de Serie & Sursă de Inspirație.
            </h2>
            <p className="mt-6 max-w-2xl text-base leading-8 text-[#cfc5ad]/90">
              Produsele afișate reprezintă doar o parte din capacitatea tehnică și viziunea echipei noastre.
              Dincolo de modelele de serie, suntem gata să transpunem în realitate orice schiță sau idee custom,
              asigurând finisaje de lux și o execuție impecabilă.
            </p>
          </div>

          {/* ── Info banner ── */}
          <div className="mb-10 rounded-2xl border border-[#c5a059]/20 bg-[#c5a059]/5 p-5 sm:p-6">
            <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.35em] text-[#c5a059]">
              Producție proprie · Livrare rapidă în toată țara
            </p>
            <p className="text-sm leading-7 text-[#cfc5ad]">
              Aceasta este o parte din proiectele în serie pe care le putem produce prin inginerie avansată
              și design de precizie, livrate rapid în toată țara. Considerați această colecție atât un loc
              de comandă directă, cât și o sursă de inspirație: dacă aveți nevoie de alte dimensiuni sau
              modele, putem realiza pe comandă{' '}
              <span className="font-semibold text-[#c5a059]">CUSTOM</span> aproape orice vă doriți,
              într-un timp extrem de scurt.
            </p>
          </div>

          {/* ── Mobile: dropdown ── */}
          <div className="relative mb-8 sm:hidden">
            <select
              value={activeCat}
              onChange={(e) => handleCatChange(e.target.value)}
              className="w-full appearance-none rounded-2xl border border-[#c5a059]/30 bg-[#111] px-5 py-4 pr-12 text-sm text-[#f8f1e5] outline-none transition-all focus:border-[#c5a059] focus:ring-2 focus:ring-[#c5a059]/20"
              style={{ colorScheme: 'dark' }}
            >
              {CATEGORIES.map((cat) => (
                <option key={cat.id} value={cat.id}>{cat.label}</option>
              ))}
            </select>
            <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-sm text-[#c5a059]">▾</span>
          </div>

          {/* ── Desktop: tab bar ── */}
          <div className="hide-scrollbar mb-8 hidden gap-2 overflow-x-auto pb-1 sm:flex lg:flex-wrap lg:overflow-visible lg:pb-0">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => handleCatChange(cat.id)}
                className={`shrink-0 rounded-full border px-5 py-2.5 text-xs uppercase tracking-[0.25em] transition-all duration-300 ${
                  activeCat === cat.id
                    ? 'border-[#c5a059] bg-[#c5a059]/10 text-[#c5a059] shadow-[0_0_20px_rgba(197,160,89,0.15)]'
                    : 'border-white/10 bg-black/40 text-[#d8ccb6] hover:border-[#c5a059]/40 hover:text-[#f8f1e5]'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* ── Product count ── */}
          <div className="mb-5 flex items-center justify-between">
            <p className="text-[11px] uppercase tracking-[0.3em] text-[#cfc5ad]/40">
              {showMobileLimit
                ? `${displayedProducts.length} din ${filtered.length} produse`
                : `${filtered.length} ${filtered.length === 1 ? 'produs' : 'produse'}`}
            </p>
            <p className="hidden text-[10px] uppercase tracking-[0.2em] text-[#cfc5ad]/30 sm:block">
              Click pe produs pentru detalii complete
            </p>
          </div>

          {/* ── Masonry grid ── */}
          <div className="columns-1 gap-4 sm:columns-2 lg:columns-3">
            {displayedProducts.map((product) => (
              <div key={product.id} className="mb-4 break-inside-avoid">
                <ProductCard
                  product={product}
                  onOpenModal={setSelectedProduct}
                  onAddToCart={onAddToCart}
                />
              </div>
            ))}
          </div>

          {/* ── Toggle button (mobile, all category) ── */}
          {isMobile && activeCat === 'all' && PRODUCTS.length > 4 && (
            <div className="mt-6 flex flex-col items-center gap-3">
              <div className="h-px w-full bg-gradient-to-r from-transparent via-[#c5a059]/20 to-transparent" />
              <button
                type="button"
                onClick={isExpanded ? handleCollapse : () => setIsExpanded(true)}
                className="inline-flex items-center gap-3 rounded-full border border-[#c5a059]/40 bg-[#c5a059]/5 px-7 py-4 text-xs uppercase tracking-[0.25em] text-[#c5a059] transition-all duration-300 hover:border-[#c5a059]/80 hover:bg-[#c5a059]/10 hover:shadow-[0_0_30px_rgba(197,160,89,0.2)] active:scale-95"
              >
                {isExpanded ? (
                  <>
                    Ascunde din Produse
                    <span className="text-[#cfc5ad]/60 normal-case tracking-normal">(revino la secțiunile de sus)</span>
                    <span className="text-base leading-none">▴</span>
                  </>
                ) : (
                  <>
                    Explorează Toată Colecția
                    <span className="text-[#cfc5ad]/60 normal-case tracking-normal">(vezi toate cele {PRODUCTS.length} produse)</span>
                    <span className="text-base leading-none">▾</span>
                  </>
                )}
              </button>
            </div>
          )}

          {/* ── CTA ── */}
          <div className="mt-16 flex flex-col items-center gap-4 text-center">
            <div className="h-px w-12 bg-[#c5a059]/30" />
            <p className="text-xs uppercase tracking-[0.35em] text-[#cfc5ad]/50">
              Dimensiuni diferite sau model custom?
            </p>
            <a
              href="#proiecte-custom"
              className="inline-flex items-center gap-2 rounded-full border border-[#c5a059] bg-[#c5a059]/10 px-8 py-3.5 text-xs uppercase tracking-[0.3em] text-[#c5a059] transition-all duration-300 hover:bg-[#c5a059] hover:text-[#0a0a0a] hover:shadow-[0_0_24px_rgba(197,160,89,0.3)]"
            >
              Solicită Ofertă Custom
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
