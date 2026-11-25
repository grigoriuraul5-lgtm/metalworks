import { SiteShell } from '../components/Layout.jsx';
import { SectionHeading } from '../components/ui.jsx';
import { sectionClass } from './common.jsx';
import { CustomCategoryContent } from './CategoryPages.jsx';

import imgLaser from '../assets/portofoliu-real/lucrare-reala-05.jpeg';
import imgCnc from '../assets/portofoliu-real/lucrare-reala-03.jpeg';
import imgSerie from '../assets/portofoliu-real/lucrare-reala-17.jpeg';
import imgPanou from '../assets/portofoliu/portofoliu-2.jpg';
import imgForjat from '../assets/portofoliu/portofoliu-8.jpg';
import imgPanouri from '../assets/portofoliu/portofoliu-9.jpg';
import imgPoarta from '../assets/portofoliu/portofoliu-10.jpg';
import imgGard from '../assets/portofoliu/portofoliu-11.jpg';
import imgBalustrada1 from '../assets/portofoliu/portofoliu-12.jpg';
import imgBalustrada2 from '../assets/portofoliu/portofoliu-13.jpg';
import imgPicioare from '../assets/portofoliu/portofoliu-1.jpg';

// ─────────────────────────────────────────────────────────────────────────────
// Pagini de servicii construite din lista de cuvinte cheie a fondatorului.
// Fiecare pagină = o intenție de căutare, cu conținut propriu (nu pagini clonate).
// Pentru a adăuga o pagină: copiezi un obiect, schimbi `path` și textele;
// apare automat în site, sitemap și llms.txt.
// ─────────────────────────────────────────────────────────────────────────────

const MATERIALS = [
  ['Oțel carbon', 'OL37, OL52, S235, S355 — tablă neagră HR/CR, tablă decapată, oțel de structură'],
  ['Inox', 'AISI 304 și AISI 316, finisaj satinat, mat sau oglindă'],
  ['Aluminiu', 'AlMg3 și alte aliaje uzuale, tablă și profile'],
  ['Oțel Corten', 'oțel autoprotejat cu patină naturală, pentru exterior'],
  ['Tablă zincată și striată', 'tablă zincată, tablă striată / lăcrimată pentru trepte și platforme'],
  ['Neferoase', 'alamă, cupru și bronz, la cerere, pentru elemente decorative'],
];

const PROFILES = [
  ['Țeavă', 'pătrată, dreptunghiulară, rotundă / tubulară'],
  ['Profile laminate', 'HEA, HEB, IPE, UNP, cornier, platbandă'],
  ['Bară plină', 'rotundă, pătrată, hexagonală'],
  ['Tablă', 'de la tablă subțire la tablă groasă, plus tablă perforată cu model custom'],
];

function FactsGrid({ eyebrow, title, intro, rows }) {
  return (
    <section className={`${sectionClass} bg-[#0d0d0d]`}>
      <div className="mx-auto max-w-7xl">
        <SectionHeading eyebrow={eyebrow} title={title}>{intro}</SectionHeading>
        <div className="divide-y divide-white/5 overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.04]">
          {rows.map(([label, value]) => (
            <div key={label} className="grid gap-1 px-6 py-4 sm:grid-cols-[14rem_1fr] sm:gap-6">
              <h3 className="font-ui text-xs uppercase tracking-[0.25em] text-[#c5a059]">{label}</h3>
              <p className="text-sm leading-6 text-[#cfc5ad]">{value}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export const SERVICE_PAGES = [
  {
    path: '/confectii-metalice-la-comanda',
    crumb: 'Confecții metalice la comandă',
    eyebrow: 'Atelier și fabrică de confecții metalice · România',
    title: 'Confecții metalice la comandă, de la piesă unicat la serie mare.',
    lead: 'Proiectăm și producem confecții metalice pe comandă pentru persoane fizice, arhitecți, constructori și industrie: debitare laser, îndoire CNC, sudură, uzinare, vopsire și asamblare, într-o fabrică din Maramureș. Livrăm în Cluj, Transilvania și în toată România.',
    heroImage: imgSerie,
    typesTitle: 'Tot lanțul de producție, într-un singur loc.',
    types: [
      ['Piese unicat și prototipare', 'Prototipare metalică după schiță sau model 3D, ca să testezi piesa înainte de serie.'],
      ['Serie mică și serie mare', 'Confecții structurale de serie, subansamble metalice industriale și repere repetitive, cu calitate constantă de la lot la lot.'],
      ['Arhitectură și construcții', 'Confecții metalice pentru arhitectură: structuri portante, construcții metalice ușoare, scări, balustrade, fațade și copertine.'],
      ['Design și mobilier', 'Mobilier metalic custom, picioare de masă, cadre de pat și obiecte de metal art în stil industrial, loft sau minimalist.'],
    ],
    extraRows: {
      eyebrow: 'Materiale și semifabricate',
      title: 'Ce prelucrăm.',
      intro: 'Alegem materialul după rolul piesei: rezistență mecanică, rigiditate, anticoroziune sau aspect.',
      rows: [...MATERIALS, ...PROFILES],
    },
    gallery: [
      { src: imgLaser, alt: 'Piese debitate laser din tablă în fabrica parteneră' },
      { src: imgSerie, alt: 'Confecții metalice de serie pregătite pentru livrare' },
      { src: imgCnc, alt: 'Piese metalice uzinate pe strung CNC' },
      { src: imgPoarta, alt: 'Poartă metalică în execuție' },
      { src: imgBalustrada1, alt: 'Balustradă metalică în atelier' },
      { src: imgPanou, alt: 'Panou decorativ debitat laser' },
    ],
    galleryTitle: 'Lucrări reale din fabrică.',
    faqs: [
      { q: 'Ce fel de confecții metalice executați?', a: 'Practic orice piesă sau structură din metal: de la flanșe și plăcuțe de prindere, la porți, balustrade, scări, mobilier industrial, cadre de pat și subansamble pentru industrie. Lucrăm după desenul tău sau proiectăm noi piesa.' },
      { q: 'Lucrați și serie mică, nu doar serie mare?', a: 'Da. Facem piese unicat, prototipuri, serie mică și serie mare. Prețul pe bucată scade odată cu volumul, pentru că pregătirea producției se face o singură dată.' },
      { q: 'Cum primesc un deviz pentru confecții metalice?', a: 'Trimite schița, desenul CAD, fișierul DXF sau câteva poze cu dimensiuni. Primești devizul cu preț, termen și materiale în cel mult 24 de ore lucrătoare.' },
      { q: 'Unde livrați?', a: 'Producem în Sighetu Marmației, Maramureș, și livrăm în Baia Mare, Cluj-Napoca, în toată Transilvania și în restul României.' },
      { q: 'Do you work with international clients?', a: 'Yes. KRAFT Metalworks offers custom metal fabrication and sheet metal laser cutting from Romania for clients across the EU. Send your DXF, DWG or STEP files and we reply with a quote within 24 working hours.' },
    ],
    faqTitle: 'Despre confecțiile metalice la comandă.',
    subject: 'Cerere deviz confecții metalice — KRAFT Metalworks',
    product: 'Confecții metalice la comandă',
    detailsPlaceholder: 'Ex: 40 de suporturi din țeavă 40×40, vopsite RAL 7016, după desenul atașat...',
    head: {
      title: 'Confecții Metalice la Comandă — Atelier și Fabrică, Serie Mică și Mare | KRAFT Metalworks',
      description: 'Confecții metalice pe comandă în România: piese unicat, prototipare, serie mică și mare, subansamble industriale, structuri și confecții pentru arhitectură. Debitare laser, îndoire CNC, sudură, vopsire. Deviz în 24h.',
      keywords: ['confectii metalice', 'confectii metalice pe comanda', 'atelier confectii metalice', 'fabrica metal', 'confectii metalice uzinate', 'confectii structurale de serie', 'subansamble metalice industriale', 'piese metalice unicat', 'serie mica confectii metalice', 'prototipare metalica', 'deviz confectii metalice', 'confectii metalice arhitectura', 'confectii metalice transilvania', 'confectii metalice romania', 'custom metal fabrication romania', 'metalworking romania'],
      serviceType: 'Confecții metalice la comandă',
    },
  },
  {
    path: '/prelucrari-metalice-cnc',
    crumb: 'Prelucrări metalice CNC',
    eyebrow: 'Procese tehnologice de producție',
    title: 'Îndoire CNC, uzinare, sudură și finisare, sub același acoperiș.',
    lead: 'După debitare, piesa trece prin îndoire pe abkant CNC, uzinare mecanică, sudură MIG-MAG sau TIG, sablare și vopsire în câmp electrostatic. Pentru zincare termică sau electrolitică și debitare waterjet lucrăm cu parteneri verificați, ca să primești piesa finită de la un singur furnizor.',
    heroImage: imgCnc,
    typesTitle: 'Ce operații executăm.',
    types: [
      ['Îndoire tablă CNC', 'Bituire și îndoire pe abkant CNC, cu unghiuri repetabile de la prima piesă la ultima.'],
      ['Uzinare mecanică', 'Strunjire CNC și frezare CNC pentru bucșe, axe, flanșe și piese de precizie.'],
      ['Sudură', 'Sudură MIG-MAG pentru structuri, sudură TIG / WIG pentru inox și aluminiu, sudură robotizată pentru serii, cu cordon polizat fin unde rămâne vizibil.'],
      ['Finisare', 'Sablare metalică, vopsire în câmp electrostatic (vopsire pulbere), periere și satinare inox, lustruire.'],
      ['Perforare și embosare', 'Tablă perforată cu model custom și embosare pentru panouri decorative și fațade.'],
      ['Protecție anticorozivă', 'Galvanizare la cald, zincare termică sau electrolitică prin parteneri, plus vopsire în strat gros pentru exterior.'],
      ['Debitare', 'Debitare laser fiber pentru tablă, țeavă și profil, debitare plasmă pentru tablă groasă, waterjet la cerere.'],
      ['Asamblare', 'Montaj de subansamble, feronerie și verificare dimensională înainte de livrare.'],
    ],
    gallery: [
      { src: imgCnc, alt: 'Piese strunjite pe CNC' },
      { src: imgLaser, alt: 'Debitare laser tablă' },
      { src: imgBalustrada2, alt: 'Structură sudată din profile metalice' },
      { src: imgSerie, alt: 'Piese de serie vopsite electrostatic' },
    ],
    galleryTitle: 'Procese din fabrică.',
    faqs: [
      { q: 'Faceți îndoire de tablă pe abkant CNC?', a: 'Da. Îndoim tablă pe abkant CNC după desenul tău, inclusiv piese debitate laser care trebuie apoi îndoite și sudate.' },
      { q: 'Ce tip de sudură folosiți?', a: 'Sudură MIG-MAG pentru structuri din oțel, sudură TIG / WIG pentru inox și aluminiu, iar pentru serii mari sudură robotizată. Acolo unde sudura rămâne la vedere, o polizăm fin.' },
      { q: 'Puteți face și zincare sau galvanizare?', a: 'Da, prin parteneri: galvanizare la cald, zincare termică sau electrolitică. Organizăm noi transportul, iar piesa vine înapoi gata de livrare.' },
      { q: 'Care e diferența dintre vopsirea electrostatică și vopsirea clasică?', a: 'Vopsirea în câmp electrostatic folosește pulbere care se polimerizează în cuptor. Stratul e mai uniform și mai rezistent la zgârieturi decât vopseaua lichidă, potrivit și pentru exterior.' },
    ],
    faqTitle: 'Despre procesele de producție.',
    subject: 'Cerere ofertă prelucrări CNC — KRAFT Metalworks',
    product: 'Prelucrări metalice CNC',
    detailsPlaceholder: 'Ex: 200 piese din tablă 3 mm, debitare + îndoire + vopsire RAL 9005, desen atașat...',
    head: {
      title: 'Îndoire Tablă CNC, Strunjire, Frezare, Sudură MIG-TIG, Vopsire | KRAFT Metalworks',
      description: 'Prelucrări metalice CNC: îndoire tablă pe abkant CNC, strunjire și frezare CNC, sudură MIG-MAG, TIG și robotizată, sablare, vopsire în câmp electrostatic, zincare prin parteneri. Ofertă în 24h.',
      keywords: ['indoire tabla cnc', 'abkant cnc', 'bituire tabla', 'strunjire cnc', 'frezare cnc', 'uzinare mecanica', 'sudura mig mag', 'sudura tig', 'sudura robotizata', 'sudura aluminiu inox', 'vopsire in camp electrostatic', 'vopsire pulbere', 'sablare metalica', 'galvanizare la cald', 'zincare termica', 'perforare tabla', 'embosare metalica', 'periere inox'],
      serviceType: 'Prelucrări metalice CNC',
    },
  },
  {
    path: '/scari-metalice',
    crumb: 'Scări metalice',
    eyebrow: 'Interior · Exterior · Industrial',
    title: 'Scări metalice de interior și exterior, pe măsura casei tale.',
    lead: 'Scări drepte, în L, în U sau elicoidale, cu structură metalică portantă și trepte din tablă striată, lemn sau sticlă. Le proiectăm pe măsurătorile tale, le producem în fabrică și le livrăm gata de montaj.',
    heroImage: imgBalustrada2,
    types: [
      ['Scări interioare', 'Structură pe vang central sau lateral, cu trepte din lemn sau metal, în stil industrial ori minimalist.'],
      ['Scări exterioare', 'Scări de acces, de serviciu sau de evacuare, protejate anticoroziv pentru exterior.'],
      ['Trepte metalice', 'Trepte din tablă striată, tablă perforată sau grătar, sudate sau demontabile.'],
      ['Balustradă asortată', 'Balustrada scării produsă în același stil și aceeași culoare.'],
    ],
    gallery: [
      { src: imgBalustrada1, alt: 'Structură metalică sudată pentru scară și balustradă' },
      { src: imgBalustrada2, alt: 'Profile metalice sudate în atelier' },
    ],
    galleryTitle: 'Structuri metalice în execuție.',
    faqs: [
      { q: 'Faceți scări metalice pe măsură?', a: 'Da. Fiecare scară se proiectează pe măsurătorile golului, ale înălțimii între niveluri și pe tipul treptelor dorite. Primești desenul spre aprobare înainte de producție.' },
      { q: 'Ce trepte se pot monta pe structura metalică?', a: 'Trepte din lemn masiv, din tablă striată, din tablă perforată sau din sticlă, în funcție de stil și de utilizare.' },
      { q: 'Faceți și scări exterioare?', a: 'Da. Pentru exterior folosim protecție anticorozivă potrivită: vopsire electrostatică sau zincare prin parteneri.' },
    ],
    faqTitle: 'Despre scările metalice.',
    subject: 'Cerere ofertă scară metalică — KRAFT Metalworks',
    product: 'Scări metalice',
    detailsPlaceholder: 'Ex: scară interioară în L, înălțime 2,9 m, trepte de stejar, balustradă metalică...',
    head: {
      title: 'Scări Metalice de Interior și Exterior la Comandă, Trepte Metalice | KRAFT Metalworks',
      description: 'Scări metalice de interior și exterior la comandă: structuri portante, trepte metalice din tablă striată sau lemn, balustrade asortate. Proiect pe măsurători, producție în Maramureș, livrare în toată țara.',
      keywords: ['scari metalice', 'scari metalice interior', 'scari metalice exterior', 'trepte metalice', 'scara metalica la comanda', 'structura metalica scara', 'scari metalice maramures', 'scari metalice cluj'],
      serviceType: 'Scări metalice',
    },
  },
  {
    path: '/mobilier-metalic-industrial',
    crumb: 'Mobilier metalic industrial',
    eyebrow: 'Stil industrial · Loft · Metal și lemn',
    title: 'Mobilier metalic custom în stil industrial și loft.',
    lead: 'Mese industriale, rafturi și etajere metalice, cadre de canapea, structuri pentru baruri și mobilier urban, din oțel brut, vopsit sau combinat cu lemn masiv. Pentru case, birouri, cafenele și producători de mobilă.',
    heroImage: imgPicioare,
    types: [
      ['Mese și baze de masă', 'Mese industriale, baze metalice pentru mese, cadre de birou și de bar.'],
      ['Rafturi și etajere', 'Rafturi metalice și etajere de perete sau de sine stătătoare, combinate cu lemn.'],
      ['Cadre de mobilier', 'Cadru metalic pentru canapea, pat, bancă sau comodă, pentru producători de mobilă.'],
      ['HoReCa și urban', 'Structuri de bar, mobilier pentru terase și mobilier urban metalic: bănci, coșuri, rasteluri.'],
    ],
    extraRows: {
      eyebrow: 'Finisaje',
      title: 'Cum poate arăta metalul.',
      intro: 'Alegi aspectul; noi alegem tratamentul potrivit utilizării.',
      rows: [
        ['Oțel brut (raw steel)', 'textură metalică naturală, protejată cu lac mat'],
        ['Vopsit electrostatic', 'finisaj mat, lucios sau texturat, în orice culoare RAL'],
        ['Inox periat', 'satinat sau oglindă, pentru bucătării și HoReCa'],
        ['Sudură invizibilă', 'îmbinări polizate fin, pentru un design minimalist'],
      ],
    },
    gallery: [
      { src: imgPicioare, alt: 'Picioare de masă metalice în stil industrial' },
      { src: imgSerie, alt: 'Cadre metalice de mobilier produse în serie' },
    ],
    galleryTitle: 'Mobilier metalic din atelier.',
    faqs: [
      { q: 'Faceți mobilier metalic după designul meu?', a: 'Da. Trimite o schiță, o poză de inspirație sau dimensiunile, iar noi facem proiectul 3D și execuția.' },
      { q: 'Combinați metalul cu lemnul?', a: 'Da. Producem structura metalică și o putem livra cu blat sau polițe din lemn masiv, ori doar structura, pentru tâmplarul tău.' },
      { q: 'Lucrați pentru producători de mobilă?', a: 'Da. Pentru producătorii de mobilă facem cadre și componente metalice în serie, cu livrări programate.' },
    ],
    faqTitle: 'Despre mobilierul metalic.',
    subject: 'Cerere ofertă mobilier metalic — KRAFT Metalworks',
    product: 'Mobilier metalic industrial',
    detailsPlaceholder: 'Ex: raft metal + lemn 180×200 cm, negru mat, 3 polițe de stejar...',
    head: {
      title: 'Mobilier Metalic Industrial și Loft la Comandă — Mese, Rafturi, Etajere | KRAFT Metalworks',
      description: 'Mobilier metalic custom în stil industrial și loft: mese industriale, rafturi și etajere metalice, cadre de canapea, structuri de bar HoReCa, mobilier urban. Metal și lemn, producție în România.',
      keywords: ['mobilier metalic', 'mobilier stil industrial', 'mobilier loft', 'mobilier metalic custom', 'mese industriale', 'rafturi metalice', 'etajere metalice', 'cadru metalic canapea', 'structuri bar horeca', 'mobilier urban metalic', 'producator mobilier metalic', 'metal si lemn', 'design industrial'],
      serviceType: 'Mobilier metalic la comandă',
    },
  },
  {
    path: '/pereti-despartitori-metalici-loft',
    crumb: 'Pereți despărțitori loft',
    eyebrow: 'Loft partitions · Uși cu profil metalic',
    title: 'Pereți despărțitori metalici și uși loft cu sticlă.',
    lead: 'Pereți despărțitori în stil loft și uși cu profil metalic subțire și sticlă, pentru apartamente, birouri și spații comerciale. Rama metalică o producem noi, la milimetru; sticla o montăm împreună cu partenerii noștri.',
    heroImage: imgPanou,
    types: [
      ['Pereți despărțitori', 'Compartimentare cu ramă metalică și sticlă, care păstrează lumina în toată casa.'],
      ['Uși loft', 'Uși batante sau glisante cu profil metalic și sticlă clară, mată sau reeded.'],
      ['Vitrine și separatoare', 'Separatoare pentru bucătărie, birou sau dormitor, la orice dimensiune.'],
      ['Finisaj', 'Negru mat clasic sau orice culoare RAL, cu feronerie asortată.'],
    ],
    faqs: [
      { q: 'Faceți pereți loft pe măsură?', a: 'Da. Măsurăm golul, facem desenul ramei și producem structura metalică pe dimensiunile exacte, iar sticla se montează în ramă.' },
      { q: 'Ce sticlă se poate folosi?', a: 'Sticlă securizată clară, mată, fumurie sau reeded (cu striații), în funcție de cât de multă intimitate vrei.' },
      { q: 'Se pot face și uși glisante?', a: 'Da, uși batante sau glisante, cu feronerie potrivită greutății ușii.' },
    ],
    faqTitle: 'Despre pereții loft.',
    subject: 'Cerere ofertă perete loft / ușă cu sticlă — KRAFT Metalworks',
    product: 'Pereți despărțitori metalici loft',
    detailsPlaceholder: 'Ex: perete loft 3,2 × 2,6 m cu ușă glisantă, sticlă clară, negru mat...',
    head: {
      title: 'Pereți Despărțitori Metalici Loft și Uși cu Profil Metalic și Sticlă | KRAFT Metalworks',
      description: 'Pereți despărțitori în stil loft și uși cu profil metalic și sticlă, la comandă, pentru apartamente și birouri. Ramă metalică produsă la milimetru, finisaj negru mat sau RAL. Ofertă în 24h.',
      keywords: ['pereti despartitori metalici', 'perete loft', 'loft partition', 'usi cu profil metalic si sticla', 'usa loft', 'compartimentare sticla metal', 'pereti sticla rama metalica'],
      serviceType: 'Pereți despărțitori metalici',
    },
  },
  {
    path: '/feronerie-accesorii-metalice',
    crumb: 'Feronerie și accesorii metalice',
    eyebrow: 'Componente · Hardware · Mobilier',
    title: 'Feronerie metalică și accesorii pentru mobilier, la comandă.',
    lead: 'Plăcuțe de prindere și flanșe debitate laser, colțare metalice rezistente, conectori, suporturi de raft, balamale sudate, mânere și baze de mese. Le producem după desenul tău, de la câteva bucăți la mii.',
    heroImage: imgLaser,
    types: [
      ['Plăcuțe și flanșe', 'Plăcuțe de prindere și flanșe debitate laser, cu găuri și forme după desen.'],
      ['Colțare și conectori', 'Colțare metalice rezistente, conectori și elemente de îmbinare pentru structuri și mobilier.'],
      ['Suporturi și baze', 'Suporturi metalice pentru rafturi, console, baze metalice pentru mese.'],
      ['Feronerie decorativă', 'Mânere pentru uși și sertare, balamale sudate sau cu rulment, inele, bride și elemente decorative metalice.'],
    ],
    gallery: [
      { src: imgLaser, alt: 'Piese mici debitate laser din tablă' },
      { src: imgCnc, alt: 'Piese de feronerie strunjite pe CNC' },
    ],
    galleryTitle: 'Componente din fabrică.',
    faqs: [
      { q: 'Faceți feronerie custom pentru producători de mobilă?', a: 'Da. Producem componente metalice pentru mobilier în serie, după desenul vostru: plăcuțe, colțare, suporturi, baze și mânere.' },
      { q: 'Care e cantitatea minimă?', a: 'Lucrăm de la câteva bucăți pentru prototip până la serii de mii de bucăți. Prețul pe bucată scade odată cu volumul.' },
      { q: 'În ce finisaje se pot livra?', a: 'Brut, vopsit electrostatic în orice culoare RAL, zincat prin parteneri sau din inox periat.' },
    ],
    faqTitle: 'Despre feronerie și accesorii.',
    subject: 'Cerere ofertă feronerie / accesorii metalice — KRAFT Metalworks',
    product: 'Feronerie și accesorii metalice',
    detailsPlaceholder: 'Ex: 2.000 plăcuțe de prindere 80×80×4 mm, 4 găuri ø9, zincate...',
    head: {
      title: 'Feronerie Metalică și Accesorii Mobilier la Comandă — Flanșe, Colțare, Suporturi | KRAFT Metalworks',
      description: 'Feronerie metalică custom și accesorii pentru mobilier: plăcuțe de prindere și flanșe debitate laser, colțare, conectori, suporturi de raft, balamale, mânere și baze de mese. De la prototip la serie.',
      keywords: ['feronerie metalica', 'accesorii metalice mobilier', 'flanse debitate laser', 'placute de prindere', 'coltare metalice', 'conectori metalici', 'suporturi metalice raft', 'balamale sudate', 'manere metalice', 'baze metalice mese', 'elemente decorative metalice', 'feronerie custom mobilier'],
      serviceType: 'Feronerie metalică la comandă',
    },
  },
  {
    path: '/copertine-grilaje-metalice',
    crumb: 'Copertine și grilaje metalice',
    eyebrow: 'Protecție · Intrări · Terase',
    title: 'Copertine metalice și grilaje de protecție, pe dimensiunile tale.',
    lead: 'Copertine pentru intrări și terase, cu structură metalică și acoperire din sticlă, policarbonat sau tablă, plus grilaje de protecție pentru ferestre și uși, simple sau decorative, debitate laser.',
    heroImage: imgForjat,
    types: [
      ['Copertine intrare', 'Structură metalică cu sticlă sau policarbonat, prinsă în perete, deasupra ușii.'],
      ['Copertine terasă și auto', 'Structuri mai mari pentru terase, carport sau spații comerciale.'],
      ['Grilaje de protecție', 'Grilaje pentru ferestre și uși, fixe sau rabatabile.'],
      ['Grilaje decorative', 'Modele debitate laser sau tip fier forjat, asortate cu poarta și gardul.'],
    ],
    gallery: [
      { src: imgForjat, alt: 'Elemente metalice decorative pentru grilaje' },
      { src: imgPanouri, alt: 'Panouri metalice decorative debitate laser' },
      { src: imgGard, alt: 'Structuri din profile metalice în atelier' },
    ],
    galleryTitle: 'Elemente metalice din atelier.',
    faqs: [
      { q: 'Ce acoperire poate avea copertina?', a: 'Sticlă securizată, policarbonat compact sau tablă, în funcție de lumina dorită și de buget.' },
      { q: 'Grilajele pot fi și decorative?', a: 'Da. Le producem cu model debitat laser sau cu elemente tip fier forjat, ca să se potrivească cu poarta și gardul casei.' },
      { q: 'Cum se protejează la exterior?', a: 'Prin vopsire în câmp electrostatic sau zincare prin parteneri, pentru rezistență la intemperii.' },
    ],
    faqTitle: 'Despre copertine și grilaje.',
    subject: 'Cerere ofertă copertină / grilaje — KRAFT Metalworks',
    product: 'Copertine și grilaje metalice',
    detailsPlaceholder: 'Ex: copertină intrare 2,0 × 1,0 m cu sticlă + 4 grilaje fereastră 120×140 cm...',
    head: {
      title: 'Copertine Metalice și Grilaje de Protecție la Comandă | KRAFT Metalworks',
      description: 'Copertine metalice pentru intrări și terase, cu sticlă sau policarbonat, și grilaje de protecție pentru ferestre și uși, simple sau decorative debitate laser. Producție în Maramureș, livrare în toată țara.',
      keywords: ['copertine metalice', 'copertina intrare', 'copertina sticla', 'grilaje metalice', 'grilaje de protectie', 'grilaje ferestre', 'grilaje decorative'],
      serviceType: 'Copertine și grilaje metalice',
    },
  },
  {
    path: '/proiectare-3d-confectii-metalice',
    crumb: 'Proiectare 3D confecții metalice',
    eyebrow: 'Design · CAD · DXF',
    title: 'Proiectare 3D și desene de execuție pentru confecții metalice.',
    lead: 'De la o schiță pe hârtie la modelul 3D, desenul de execuție și fișierele DXF gata de debitare laser. Vezi produsul înainte să fie fabricat și aprobi fiecare detaliu.',
    heroImage: imgPanou,
    types: [
      ['Din schiță în 3D', 'Transformăm schița, poza de inspirație sau măsurătorile într-un model 3D.'],
      ['Desen de execuție', 'Cote, materiale, îmbinări și finisaje, gata pentru producție.'],
      ['Fișiere DXF', 'Fișiere DXF curate pentru debitare laser, cu contururi închise și straturi separate.'],
      ['Deviz din proiect', 'Din același proiect calculăm devizul exact de materiale și manoperă.'],
    ],
    faqs: [
      { q: 'Am doar o schiță de mână. E suficient?', a: 'Da. O schiță cu dimensiunile principale și o poză a locului de montaj sunt suficiente ca să pornim proiectul 3D.' },
      { q: 'Primesc fișierele DXF?', a: 'Da. Fișierele de execuție sunt pregătite pentru debitare laser și pot fi folosite la producția în fabrica noastră.' },
      { q: 'Proiectul se plătește separat?', a: 'Pentru lucrările comandate la noi, proiectarea face parte din ofertă. Pentru proiecte livrate doar ca fișiere, primești un preț separat.' },
    ],
    faqTitle: 'Despre proiectare.',
    subject: 'Cerere proiectare 3D — KRAFT Metalworks',
    product: 'Proiectare 3D confecții metalice',
    detailsPlaceholder: 'Ex: am o schiță pentru o balustradă de terasă, vreau model 3D și ofertă de execuție...',
    head: {
      title: 'Proiectare 3D Confecții Metalice, Schițe CAD și Fișiere DXF pentru Debitare | KRAFT Metalworks',
      description: 'Proiectare 3D pentru confecții metalice: din schiță în model 3D, desen de execuție CAD și fișiere DXF gata de debitare laser, plus deviz exact. Pentru persoane fizice, arhitecți și producători.',
      keywords: ['proiectare 3d confectii metalice', 'schite cad confectii metalice', 'fisiere dxf debitare laser', 'desen executie metal', 'deviz confectii metalice', 'proiectare confectii metalice'],
      serviceType: 'Proiectare 3D confecții metalice',
    },
  },
];

export function ServicePage({ path }) {
  const page = SERVICE_PAGES.find((p) => p.path === path);
  const extra = page.extraRows ? <FactsGrid {...page.extraRows} /> : null;
  return (
    <SiteShell>
      <CustomCategoryContent {...page} extra={extra} />
    </SiteShell>
  );
}
