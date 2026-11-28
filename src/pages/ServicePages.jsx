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
import imgSuportVin from '../assets/elemente design inetrior exterior.json/suport vinuri si pahare.jpg';
import imgRaftGeometric from '../assets/elemente design inetrior exterior.json/dulap genial.jpg';
import imgBanca from '../assets/elemente design inetrior exterior.json/scaun de satat jos.jpg';
import realBazaX from '../assets/lucrari-noi/baza-x-serie.jpg';
import realSuportMasurat from '../assets/lucrari-noi/suport-masurat.jpg';
import realCadre from '../assets/lucrari-noi/cadre-ambalate.jpg';
import realProfil from '../assets/lucrari-noi/profil-vopsit.jpg';
import realSuportT from '../assets/lucrari-noi/suport-t.jpg';
import realZincat from '../assets/lucrari-noi/suport-zincat.jpg';
import realMecanism from '../assets/lucrari-noi/mecanism-pat.jpg';
import realSuportiAlbi from '../assets/lucrari-noi/suporti-albi.jpg';
import realDisc from '../assets/lucrari-noi/disc-perforat.jpg';
import realPlaca from '../assets/lucrari-noi/placa-prindere.jpg';
import realCapac from '../assets/lucrari-noi/capac-tabla.jpg';
import randManere from '../assets/randari-noi/manere-bucatarie.jpg';
import randSuportiRaft from '../assets/randari-noi/suporti-raft.jpg';
import randLoft from '../assets/randari-noi/perete-loft.jpg';
import randRaftGeo from '../assets/randari-noi/raft-geometric.jpg';
import randVin from '../assets/randari-noi/suport-vin-perete.jpg';
import randMasaX from '../assets/randari-noi/masa-x-loft.jpg';
import randMasaCasa from '../assets/randari-noi/masa-casa-maramures.jpg';
import randLaser from '../assets/randari-noi/debitare-laser.jpg';
import randSudura from '../assets/randari-noi/sudura-cadru.jpg';
import randAbkant from '../assets/randari-noi/abkant-cnc.jpg';

// ─────────────────────────────────────────────────────────────────────────────
// Pagini de servicii construite din lista de cuvinte cheie a fondatorului.
// Fiecare pagină = o intenție de căutare, cu conținut propriu (nu pagini clonate).
// Pentru a adăuga o pagină: copiezi un obiect, schimbi `path` și textele;
// apare automat în site, sitemap și llms.txt.
// ─────────────────────────────────────────────────────────────────────────────

const MATERIALS = [
  ['Oțel carbon', 'OL37, OL52, S235, S355 — tablă neagră HR/CR, tablă decapată, oțel de structură'],
  ['Inox', 'AISI 304, finisaj satinat, mat sau oglindă. Ai nevoie de AISI 316 pentru exterior agresiv? Întreabă-ne.'],
  ['Aluminiu', 'Lucrezi cu aluminiu (AlMg3, AlSi)? Spune-ne aliajul și grosimea și îți confirmăm în 24h.'],
  ['Oțel Corten', 'oțel autoprotejat cu patină naturală, pentru exterior'],
  ['Tablă zincată și striată', 'tablă zincată, tablă striată / lăcrimată pentru trepte și platforme'],
  ['Neferoase', 'Alamă, cupru sau bronz pentru elemente decorative? Trimite-ne proiectul și verificăm ce se poate.'],
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
    eyebrow: 'Confecții metalice la comandă · România',
    title: 'Confecții metalice la comandă, de la piesă unicat la serie mare.',
    lead: 'Proiectăm și producem confecții metalice pe comandă pentru persoane fizice, arhitecți, constructori și industrie: debitare laser, îndoire CNC, sudură, uzinare, vopsire și asamblare, totul într-un singur loc, în Maramureș. Livrăm în Cluj, Transilvania și în toată România.',
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
      { src: realBazaX, alt: 'Baze de masă metalice în X produse în serie', tag: 'Lucrare reală' },
      { src: realMecanism, alt: 'Mecanism metalic montat în cadrul unui pat', tag: 'Lucrare reală' },
      { src: realSuportMasurat, alt: 'Suport metalic îndoit, verificat la dimensiune', tag: 'Lucrare reală' },
      { src: imgLaser, alt: 'Piese debitate laser din tablă' },
      { src: imgSerie, alt: 'Confecții metalice de serie pregătite pentru livrare' },
      { src: imgCnc, alt: 'Piese metalice uzinate pe strung CNC' },
      { src: imgPoarta, alt: 'Poartă metalică în execuție' },
      { src: imgBalustrada1, alt: 'Balustradă metalică în atelier' },
      { src: imgPanou, alt: 'Panou decorativ debitat laser' },
    ],
    galleryTitle: 'Lucrări reale.',
    faqs: [
      { q: 'Ce fel de confecții metalice executați?', a: 'Practic orice piesă sau structură din metal: de la flanșe și plăcuțe de prindere, la porți, balustrade, scări, mobilier industrial, cadre de pat și subansamble pentru industrie. Lucrăm după desenul tău sau proiectăm noi piesa.' },
      { q: 'Lucrați și serie mică, nu doar serie mare?', a: 'Da. Facem piese unicat, prototipuri, serie mică și serie mare. Prețul pe bucată scade odată cu volumul, pentru că pregătirea producției se face o singură dată.' },
      { q: 'Cum primesc un deviz pentru confecții metalice?', a: 'Trimite schița, desenul CAD, fișierul DXF sau câteva poze cu dimensiuni. Primești devizul cu preț, termen și materiale în cel mult 24 de ore lucrătoare.' },
      { q: 'Unde livrați?', a: 'Producem în Sighetu Marmației, Maramureș, și livrăm în Baia Mare, Cluj-Napoca, în toată Transilvania și în restul României.' },
      { q: 'Do you work with clients outside Romania?', a: 'KRAFT Metalworks does custom metal fabrication and sheet metal laser cutting in Romania. Have a project abroad? Send your DXF, DWG or STEP files and we will tell you within 24 working hours whether and how we can deliver it.' },
    ],
    faqTitle: 'Despre confecțiile metalice la comandă.',
    subject: 'Cerere deviz confecții metalice — KRAFT Metalworks',
    product: 'Confecții metalice la comandă',
    detailsPlaceholder: 'Ex: 40 de suporturi din țeavă 40×40, vopsite RAL 7016, după desenul atașat...',
    head: {
      title: 'Confecții Metalice la Comandă, Unicat și Serie | KRAFT',
      description: 'Confecții metalice la comandă în toată România: piese unicat, prototipuri, serie mică și mare. Debitare laser, îndoire CNC, sudură, vopsire. Deviz în 24h.',
      keywords: ['confectii metalice', 'confectii metalice pe comanda', 'atelier confectii metalice', 'fabrica metal', 'confectii metalice uzinate', 'confectii structurale de serie', 'subansamble metalice industriale', 'piese metalice unicat', 'serie mica confectii metalice', 'prototipare metalica', 'deviz confectii metalice', 'confectii metalice arhitectura', 'confectii metalice transilvania', 'confectii metalice romania', 'custom metal fabrication romania', 'metalworking romania'],
      serviceType: 'Confecții metalice la comandă',
    },
  },
  {
    path: '/prelucrari-metalice-cnc',
    crumb: 'Prelucrări metalice CNC',
    eyebrow: 'Procese tehnologice de producție',
    title: 'Îndoire CNC, uzinare, sudură și finisare, sub același acoperiș.',
    lead: 'După debitare, piesa trece prin îndoire pe abkant CNC, uzinare mecanică, sudură MIG-MAG sau TIG, sablare și vopsire în câmp electrostatic. Ai nevoie de zincare, galvanizare sau alt proces special? Spune-ne de la început și îți spunem în 24h ce variantă avem pentru proiectul tău.',
    heroImage: imgCnc,
    typesTitle: 'Ce operații executăm.',
    types: [
      ['Îndoire tablă CNC', 'Bituire și îndoire pe abkant CNC, cu unghiuri repetabile de la prima piesă la ultima.'],
      ['Uzinare mecanică', 'Strunjire CNC și frezare CNC pentru bucșe, axe, flanșe și piese de precizie.'],
      ['Sudură', 'Sudură MIG-MAG pentru structuri și TIG / WIG pentru inox, cu cordon polizat fin unde rămâne vizibil. Ai o serie mare? Întreabă-ne despre sudura robotizată.'],
      ['Finisare', 'Sablare metalică, vopsire în câmp electrostatic (vopsire pulbere), periere și satinare inox, lustruire.'],
      ['Perforare tablă', 'Tablă perforată cu model custom pentru panouri decorative și fațade. Te interesează și embosarea? Întreabă-ne.'],
      ['Protecție anticorozivă', 'Vopsire electrostatică pentru exterior. Ai nevoie de piese galvanizate la cald sau zincate? Spune-ne și verificăm varianta potrivită.'],
      ['Debitare', 'Debitare laser fiber pentru tablă, țeavă și profil. Tablă foarte groasă sau material sensibil la căldură? Întreabă-ne despre plasmă sau waterjet.'],
      ['Asamblare', 'Montaj de subansamble, feronerie și verificare dimensională înainte de livrare.'],
    ],
    gallery: [
      { src: randAbkant, alt: 'Îndoire pe abkant CNC (randare)', tag: 'Randare' },
      { src: randSudura, alt: 'Sudură TIG la un cadru metalic de masă (randare)', tag: 'Randare' },
      { src: randLaser, alt: 'Debitare laser a unui panou decorativ (randare)', tag: 'Randare' },
      { src: imgCnc, alt: 'Piese strunjite pe CNC' },
      { src: imgLaser, alt: 'Debitare laser tablă' },
      { src: imgBalustrada2, alt: 'Structură sudată din profile metalice' },
      { src: imgSerie, alt: 'Piese de serie vopsite electrostatic' },
    ],
    galleryTitle: 'Procesele noastre.',
    faqs: [
      { q: 'Faceți îndoire de tablă pe abkant CNC?', a: 'Da. Îndoim tablă pe abkant CNC după desenul tău, inclusiv piese debitate laser care trebuie apoi îndoite și sudate.' },
      { q: 'Ce tip de sudură folosiți?', a: 'Sudură MIG-MAG pentru structuri din oțel și TIG / WIG pentru inox. Acolo unde sudura rămâne la vedere, o polizăm fin. Pentru serii mari sau aluminiu, spune-ne volumul și îți confirmăm soluția.' },
      { q: 'Puteți face și zincare sau galvanizare?', a: 'Spune-ne de la început că ai nevoie de piese zincate sau galvanizate la cald. Verificăm varianta disponibilă pentru dimensiunile și cantitatea ta și ți-o confirmăm în ofertă.' },
      { q: 'Care e diferența dintre vopsirea electrostatică și vopsirea clasică?', a: 'Vopsirea în câmp electrostatic folosește pulbere care se polimerizează în cuptor. Stratul e mai uniform și mai rezistent la zgârieturi decât vopseaua lichidă, potrivit și pentru exterior.' },
    ],
    faqTitle: 'Despre procesele de producție.',
    subject: 'Cerere ofertă prelucrări CNC — KRAFT Metalworks',
    product: 'Prelucrări metalice CNC',
    detailsPlaceholder: 'Ex: 200 piese din tablă 3 mm, debitare + îndoire + vopsire RAL 9005, desen atașat...',
    head: {
      title: 'Prelucrări Metalice CNC: Îndoire, Sudură, Vopsire | KRAFT',
      description: 'Prelucrări metalice CNC: îndoire tablă, strunjire, frezare, sudură MIG-MAG și TIG, vopsire electrostatică. Ai nevoie de zincare? Întreabă-ne.',
      keywords: ['indoire tabla cnc', 'abkant cnc', 'bituire tabla', 'strunjire cnc', 'frezare cnc', 'uzinare mecanica', 'sudura mig mag', 'sudura tig', 'sudura robotizata', 'sudura aluminiu inox', 'vopsire in camp electrostatic', 'vopsire pulbere', 'sablare metalica', 'galvanizare la cald', 'zincare termica', 'perforare tabla', 'embosare metalica', 'periere inox'],
      serviceType: 'Prelucrări metalice CNC',
    },
  },
  {
    path: '/scari-metalice',
    crumb: 'Scări metalice',
    eyebrow: 'Interior · Exterior · Industrial',
    title: 'Scări metalice de interior și exterior, pe măsura casei tale.',
    lead: 'Scări drepte, în L, în U sau elicoidale, cu structură metalică portantă și trepte din tablă striată, lemn sau sticlă. Le proiectăm pe măsurătorile tale, le realizăm și le livrăm gata de montaj.',
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
      { q: 'Faceți și scări exterioare?', a: 'Da. Pentru exterior folosim vopsire electrostatică potrivită. Dacă vrei structura zincată, spune-ne și verificăm varianta.' },
    ],
    faqTitle: 'Despre scările metalice.',
    subject: 'Cerere ofertă scară metalică — KRAFT Metalworks',
    product: 'Scări metalice',
    detailsPlaceholder: 'Ex: scară interioară în L, înălțime 2,9 m, trepte de stejar, balustradă metalică...',
    head: {
      title: 'Scări Metalice Interior și Exterior la Comandă | KRAFT',
      description: 'Scări metalice de interior și exterior la comandă: structură, trepte din tablă sau lemn, balustradă asortată. Proiect pe măsurători, livrare națională.',
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
      { src: realBazaX, alt: 'Baze de masă metalice în X, în producție', tag: 'Lucrare reală' },
      { src: realCadre, alt: 'Cadre metalice de mobilier ambalate pentru livrare', tag: 'Lucrare reală' },
      { src: realMecanism, alt: 'Cadru metalic montat într-un pat tapițat', tag: 'Lucrare reală' },
      { src: randMasaX, alt: 'Masă din stejar pe picioare metalice X, într-un loft (randare)', tag: 'Randare' },
      { src: randMasaCasa, alt: 'Masă cu bază metalică într-o casă din lemn din Maramureș (randare)', tag: 'Randare' },
      { src: imgPicioare, alt: 'Picioare de masă metalice în stil industrial' },
    ],
    galleryTitle: 'Lucrări reale și cum arată în casă.',
    faqs: [
      { q: 'Faceți mobilier metalic după designul meu?', a: 'Da. Trimite o schiță, o poză de inspirație sau dimensiunile, iar noi facem proiectul 3D și execuția.' },
      { q: 'Combinați metalul cu lemnul?', a: 'Producem structura metalică gata pentru blat sau polițe din lemn. Vrei și lemnul de la noi? Întreabă-ne și îți spunem ce variante avem; altfel livrăm doar structura, pentru tâmplarul tău.' },
      { q: 'Lucrați pentru producători de mobilă?', a: 'Da. Pentru producătorii de mobilă facem cadre și componente metalice în serie, cu livrări programate.' },
    ],
    faqTitle: 'Despre mobilierul metalic.',
    subject: 'Cerere ofertă mobilier metalic — KRAFT Metalworks',
    product: 'Mobilier metalic industrial',
    detailsPlaceholder: 'Ex: raft metal + lemn 180×200 cm, negru mat, 3 polițe de stejar...',
    head: {
      title: 'Mobilier Metalic Industrial și Loft la Comandă | KRAFT',
      description: 'Mobilier metalic industrial și loft la comandă: mese, rafturi și etajere, cadre de canapea, baruri HoReCa. Metal și lemn, produs în România.',
      keywords: ['mobilier metalic', 'mobilier stil industrial', 'mobilier loft', 'mobilier metalic custom', 'mese industriale', 'rafturi metalice', 'etajere metalice', 'cadru metalic canapea', 'structuri bar horeca', 'mobilier urban metalic', 'producator mobilier metalic', 'metal si lemn', 'design industrial'],
      serviceType: 'Mobilier metalic la comandă',
    },
  },
  {
    path: '/pereti-despartitori-metalici-loft',
    crumb: 'Pereți despărțitori loft',
    eyebrow: 'Loft partitions · Uși cu profil metalic',
    title: 'Pereți despărțitori metalici și uși loft cu sticlă.',
    lead: 'Pereți despărțitori în stil loft și uși cu profil metalic subțire și sticlă, pentru apartamente, birouri și spații comerciale. Rama metalică o producem noi, la milimetru; pentru sticlă și montaj îți spunem în ofertă ce variante ai.',
    heroImage: imgPanou,
    types: [
      ['Pereți despărțitori', 'Compartimentare cu ramă metalică și sticlă, care păstrează lumina în toată casa.'],
      ['Uși loft', 'Uși batante sau glisante cu profil metalic și sticlă clară, mată sau reeded.'],
      ['Vitrine și separatoare', 'Separatoare pentru bucătărie, birou sau dormitor, la orice dimensiune.'],
      ['Finisaj', 'Negru mat clasic sau orice culoare RAL, cu feronerie asortată.'],
    ],
    gallery: [
      { src: randLoft, alt: 'Perete despărțitor loft cu ramă neagră și sticlă între living și birou (randare)', tag: 'Randare' },
      { src: imgPanou, alt: 'Panou metalic debitat laser', tag: 'Lucrare reală' },
    ],
    galleryTitle: 'Cum poate arăta la tine.',
    faqs: [
      { q: 'Faceți pereți loft pe măsură?', a: 'Da. Pe baza dimensiunilor golului facem desenul ramei și producem structura metalică pe dimensiunile exacte. Varianta de sticlă și montajul ți le confirmăm în ofertă.' },
      { q: 'Ce sticlă se poate folosi?', a: 'De obicei se folosește sticlă securizată clară, mată, fumurie sau reeded (cu striații). Spune-ne ce îți place și îți confirmăm în ofertă ce variantă putem livra.' },
      { q: 'Se pot face și uși glisante?', a: 'Da, uși batante sau glisante, cu feronerie potrivită greutății ușii.' },
    ],
    faqTitle: 'Despre pereții loft.',
    subject: 'Cerere ofertă perete loft / ușă cu sticlă — KRAFT Metalworks',
    product: 'Pereți despărțitori metalici loft',
    detailsPlaceholder: 'Ex: perete loft 3,2 × 2,6 m cu ușă glisantă, sticlă clară, negru mat...',
    head: {
      title: 'Pereți Despărțitori Metalici Loft cu Sticlă | KRAFT',
      description: 'Pereți despărțitori loft și uși cu profil metalic și sticlă, la comandă, pentru apartamente și birouri. Finisaj negru mat sau RAL. Ofertă în 24h.',
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
      { src: realSuportiAlbi, alt: 'Suporturi metalice vopsite alb pentru mobilier', tag: 'Lucrare reală' },
      { src: realSuportMasurat, alt: 'Suport metalic îndoit, măsurat înainte de livrare', tag: 'Lucrare reală' },
      { src: realSuportT, alt: 'Suport metalic în T pentru mobilier', tag: 'Lucrare reală' },
      { src: realZincat, alt: 'Piesă de prindere zincată pentru mobilier', tag: 'Lucrare reală' },
      { src: realPlaca, alt: 'Placă de prindere debitată și îndoită', tag: 'Lucrare reală' },
      { src: realDisc, alt: 'Disc din tablă perforată debitat laser', tag: 'Lucrare reală' },
      { src: realProfil, alt: 'Profil metalic vopsit pentru cadru de mobilier', tag: 'Lucrare reală' },
      { src: realCapac, alt: 'Capac din tablă striată debitat laser', tag: 'Lucrare reală' },
      { src: randManere, alt: 'Mânere bară din oțel negru pe dulapuri de stejar (randare)', tag: 'Randare' },
    ],
    galleryTitle: 'Componente realizate de noi.',
    faqs: [
      { q: 'Faceți feronerie custom pentru producători de mobilă?', a: 'Da. Producem componente metalice pentru mobilier în serie, după desenul vostru: plăcuțe, colțare, suporturi, baze și mânere.' },
      { q: 'Care e cantitatea minimă?', a: 'Lucrăm de la câteva bucăți pentru prototip până la serii de mii de bucăți. Prețul pe bucată scade odată cu volumul.' },
      { q: 'În ce finisaje se pot livra?', a: 'Brut, vopsit electrostatic în orice culoare RAL sau din inox periat. Ai nevoie de piese zincate? Întreabă-ne.' },
    ],
    faqTitle: 'Despre feronerie și accesorii.',
    subject: 'Cerere ofertă feronerie / accesorii metalice — KRAFT Metalworks',
    product: 'Feronerie și accesorii metalice',
    detailsPlaceholder: 'Ex: 2.000 plăcuțe de prindere 80×80×4 mm, 4 găuri ø9, zincate...',
    head: {
      title: 'Feronerie Metalică și Accesorii Mobilier | KRAFT Metalworks',
      description: 'Feronerie metalică și accesorii pentru mobilier la comandă: flanșe, colțare, suporturi de raft, mânere, balamale și baze de mese. De la prototip la serie.',
      keywords: ['feronerie metalica', 'accesorii metalice mobilier', 'flanse debitate laser', 'placute de prindere', 'coltare metalice', 'conectori metalici', 'suporturi metalice raft', 'balamale sudate', 'manere metalice', 'baze metalice mese', 'elemente decorative metalice', 'feronerie custom mobilier'],
      serviceType: 'Feronerie metalică la comandă',
    },
  },
  {
    path: '/obiecte-design-metal',
    crumb: 'Obiecte de design din metal',
    eyebrow: 'Decor · Interior · HoReCa',
    title: 'Obiecte de design din metal: piesele mici care fac un spațiu memorabil.',
    lead: 'Suporturi de vin și pahare, rafturi și etajere geometrice, console de raft, cuiere, suporturi de plante, panouri decorative debitate laser și plăcuțe. Le producem în stilul proiectului tău, în orice culoare RAL, de la o bucată la serie, pentru case, pensiuni, cafenele și showroom-uri.',
    heroImage: imgSuportVin,
    types: [
      ['Suporturi de vin și pahare', 'De perete sau de sine stătătoare, pentru casă, bar sau cramă, pe dimensiunile spațiului.'],
      ['Rafturi și etajere geometrice', 'Biblioteci, etajere și separatoare decorative din țeavă sau tablă, cu model propriu.'],
      ['Console de raft și cuiere', 'Console industriale pentru rafturi din lemn, cuiere de perete și de hol, în serie sau unicat.'],
      ['Suporturi de plante și jardiniere', 'Pentru interior și terase, inclusiv din oțel Corten pentru exterior.'],
      ['Panouri decorative și plăcuțe', 'Panouri de perete debitate laser, plăcuțe cu nume sau logo, numere de casă.'],
      ['Bănci, măsuțe și suporturi de lemne', 'Piese mici de mobilier și accesorii pentru șemineu, asortate cu restul interiorului.'],
    ],
    typesTitle: 'Ce putem face pentru tine.',
    gallery: [
      { src: randRaftGeo, alt: 'Raft geometric din oțel negru pe un perete cald (randare)', tag: 'Randare' },
      { src: randVin, alt: 'Suport metalic pentru vin și pahare deasupra unei comode (randare)', tag: 'Randare' },
      { src: randSuportiRaft, alt: 'Polițe de stejar pe suporți metalici negri (randare)', tag: 'Randare' },
      { src: imgSuportVin, alt: 'Randare: suport metalic de perete pentru vin și pahare' },
      { src: imgRaftGeometric, alt: 'Randare: etajeră metalică cu model geometric' },
      { src: imgBanca, alt: 'Randare: bancă metalică cu șezut din tablă perforată' },
      { src: imgPanou, alt: 'Panou decorativ metalic debitat laser, lucrare reală' },
    ],
    galleryTitle: 'Exemple de obiecte (randări) și un panou real realizat de noi.',
    faqs: [
      { q: 'Puteți face un obiect de design după o poză de pe Pinterest?', a: 'Da, ca punct de plecare. Ne trimiți poza și dimensiunile, iar noi îl adaptăm într-un model propriu, cu desen și preț în 24 de ore.' },
      { q: 'Faceți și o singură bucată?', a: 'Da. Facem unicate pentru casă și serii mici pentru pensiuni, cafenele sau magazine. Prețul pe bucată scade la cantități mai mari.' },
      { q: 'În ce culori se pot face?', a: 'Vopsim electrostatic în orice culoare RAL, mat sau lucios. Ai nevoie de alt finisaj, de exemplu inox periat sau alamă? Întreabă-ne și verificăm.' },
      { q: 'Se pot pune pe ele logo-ul sau numele localului?', a: 'Da. Prin debitare laser putem integra un logo, un nume sau un model propriu în obiect.' },
    ],
    faqTitle: 'Despre obiectele de design.',
    subject: 'Cerere ofertă obiect de design din metal — KRAFT Metalworks',
    product: 'Obiecte de design din metal',
    detailsPlaceholder: 'Ex: suport vin de perete pentru 12 sticle și 16 pahare, 120×60 cm, negru mat...',
    head: {
      title: 'Obiecte de Design din Metal la Comandă | KRAFT Metalworks',
      description: 'Suporturi de vin, rafturi geometrice, console, cuiere, suporturi de plante și panouri decorative din metal, la comandă, în orice culoare RAL.',
      keywords: ['obiecte decorative metal', 'decoratiuni metalice interior', 'suport vin metalic', 'suport sticle vin perete', 'raft metalic perete', 'etajera metalica', 'console raft metalice', 'cuier metalic perete', 'suport plante metalic', 'panou decorativ metalic', 'decor metalic debitat laser', 'obiecte design metal la comanda'],
      serviceType: 'Obiecte de design din metal la comandă',
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
      { q: 'Ce acoperire poate avea copertina?', a: 'Structura metalică o producem noi. Pentru acoperire (sticlă, policarbonat sau tablă) spune-ne ce preferi și îți confirmăm în ofertă variantele disponibile.' },
      { q: 'Grilajele pot fi și decorative?', a: 'Da. Le producem cu model debitat laser sau cu elemente tip fier forjat, ca să se potrivească cu poarta și gardul casei.' },
      { q: 'Cum se protejează la exterior?', a: 'Prin vopsire în câmp electrostatic, potrivită pentru exterior. Dacă vrei și zincare, spune-ne și verificăm varianta.' },
    ],
    faqTitle: 'Despre copertine și grilaje.',
    subject: 'Cerere ofertă copertină / grilaje — KRAFT Metalworks',
    product: 'Copertine și grilaje metalice',
    detailsPlaceholder: 'Ex: copertină intrare 2,0 × 1,0 m cu sticlă + 4 grilaje fereastră 120×140 cm...',
    head: {
      title: 'Copertine Metalice și Grilaje de Protecție | KRAFT',
      description: 'Copertine metalice pentru intrări și terase, cu sticlă sau policarbonat, și grilaje de protecție pentru ferestre și uși. Livrare în toată țara.',
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
      { q: 'Primesc fișierele DXF?', a: 'Da. Fișierele de execuție sunt pregătite pentru debitare laser și sunt folosite direct la producție.' },
      { q: 'Proiectul se plătește separat?', a: 'Îți spunem din prima ofertă dacă proiectarea e inclusă în lucrare sau are un preț separat, înainte să începem.' },
    ],
    faqTitle: 'Despre proiectare.',
    subject: 'Cerere proiectare 3D — KRAFT Metalworks',
    product: 'Proiectare 3D confecții metalice',
    detailsPlaceholder: 'Ex: am o schiță pentru o balustradă de terasă, vreau model 3D și ofertă de execuție...',
    head: {
      title: 'Proiectare 3D Confecții Metalice și Fișiere DXF | KRAFT',
      description: 'Proiectare 3D pentru confecții metalice: din schiță în model 3D, desen de execuție și fișier DXF gata de debitare laser, plus deviz exact.',
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
