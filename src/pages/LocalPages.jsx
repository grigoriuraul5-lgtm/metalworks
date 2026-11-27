import { SiteShell } from '../components/Layout.jsx';
import { SectionHeading, labelClass } from '../components/ui.jsx';
import { PageHero, FaqList, B2BQuoteForm, sectionClass } from './common.jsx';
import { PICIOARE_PATH, PORTI_PATH, BALUSTRADE_PATH } from './CategoryPages.jsx';
import { SOMIERE_PATH } from './SomierePage.jsx';
import { DEBITARE_PATH } from './DebitarePage.jsx';
import imgMM from '../assets/portofoliu/portofoliu-9.jpg';
import imgCJ from '../assets/portofoliu-real/lucrare-reala-05.jpeg';

// ─────────────────────────────────────────────────────────────────────────────
// Pagini locale: „confectii metalice Baia Mare", „... Cluj-Napoca" etc.
// Conținut diferit pe fiecare oraș, nu pagini copiate.
// ─────────────────────────────────────────────────────────────────────────────

export const LOCAL_PAGES = [
  {
    path: '/confectii-metalice-maramures',
    city: 'Maramureș',
    cities: 'Sighetu Marmației, Baia Mare, Borșa, Vișeu de Sus și tot județul',
    image: imgMM,
    title: 'Confecții metalice în Maramureș — Sighetu Marmației și Baia Mare',
    seoTitle: 'Confecții Metalice Maramureș: Sighet, Baia Mare',
    h1: 'Confecții metalice în Maramureș, direct de la producător.',
    lead: 'Producem în Sighetu Marmației: porți, garduri, balustrade, picioare de masă, debitare laser și structuri metalice. Pentru clienții din Maramureș, asta înseamnă comunicare directă cu cei care execută lucrarea și transport scurt.',
    description: 'Confecții metalice în Maramureș, produse în Sighetu Marmației: porți, garduri, balustrade, debitare laser. Ofertă în 24h pentru Sighet și Baia Mare.',
    keywords: ['confectii metalice maramures', 'confectii metalice sighetu marmatiei', 'confectii metalice baia mare', 'porti metalice baia mare', 'debitare laser baia mare', 'atelier confectii metalice sighet'],
    advantages: [
      ['Producție în județ', 'Lucrările se realizează în Sighetu Marmației. Ai un singur om de contact, de la schiță la livrare.'],
      ['Transport scurt', 'Livrarea în Sighet, Baia Mare și localitățile din județ se planifică rapid.'],
      ['Vizită pentru măsurători', 'Pentru porți, garduri și balustrade stabilim împreună cum se iau măsurătorile corect.'],
    ],
    faqs: [
      { q: 'Unde se produc lucrările KRAFT Metalworks?', a: 'Lucrările se realizează în Sighetu Marmației, județul Maramureș, și se livrează în toată țara.' },
      { q: 'Lucrați și pentru clienți din Baia Mare?', a: 'Da. Livrăm în Baia Mare și în toate localitățile din județul Maramureș.' },
      { q: 'Cât durează o ofertă?', a: 'În cel mult 24 de ore lucrătoare de la primirea dimensiunilor sau a schiței.' },
    ],
  },
  {
    path: '/confectii-metalice-cluj-napoca',
    city: 'Cluj-Napoca',
    cities: 'Cluj-Napoca, Florești, Baciu, Apahida, Turda și județul Cluj',
    image: imgCJ,
    title: 'Confecții metalice și debitare laser pentru Cluj-Napoca',
    seoTitle: 'Confecții Metalice și Debitare Laser Cluj-Napoca',
    h1: 'Confecții metalice și debitare laser pentru Cluj-Napoca.',
    lead: 'Pentru arhitecți, dezvoltatori imobiliari, firme de construcții și proprietari din Cluj: debitare laser după fișiere DXF/DWG, balustrade, porți, garduri și structuri metalice, livrate pe șantier sau la adresă.',
    description: 'Confecții metalice și debitare laser pentru Cluj-Napoca: balustrade, porți, garduri și piese după DXF. Cotație în 24h, livrare în Cluj și Florești.',
    keywords: ['confectii metalice cluj', 'debitare laser cluj', 'balustrade metalice cluj', 'porti metalice cluj', 'structuri metalice cluj-napoca'],
    advantages: [
      ['Lucrăm după proiect', 'Primim DWG, DXF, STEP sau PDF de la arhitect și livrăm desenul de execuție spre aprobare.'],
      ['Livrare pe șantier', 'Livrăm în Cluj-Napoca și în zona metropolitană, pe etape, conform graficului de lucrări.'],
      ['Serie și proiect', 'Balustrade identice pentru ansambluri rezidențiale sau piese unicat pentru o singură casă.'],
    ],
    faqs: [
      { q: 'Livrați în Cluj-Napoca?', a: 'Da. Livrăm în Cluj-Napoca, Florești, Baciu, Apahida și în tot județul Cluj, inclusiv pe șantier.' },
      { q: 'Pot trimite proiectul arhitectului?', a: 'Da. Acceptăm DWG, DXF, STEP și PDF. Îți trimitem oferta și desenul de execuție în 24 de ore lucrătoare.' },
      { q: 'Lucrați cu firme de construcții?', a: 'Da. Pentru dezvoltatori și constructori stabilim livrări pe etape și condiții de plată B2B.' },
    ],
  },
];

const SERVICES = [
  ['Porți și garduri metalice', PORTI_PATH],
  ['Balustrade metalice', BALUSTRADE_PATH],
  ['Picioare de masă metalice', PICIOARE_PATH],
  ['Debitare laser țeavă și tablă', DEBITARE_PATH],
  ['Cadre metalice pentru somiere', SOMIERE_PATH],
];

function LocalContent({ page }) {
  return (
    <>
      <PageHero
        image={page.image}
        crumbs={[{ name: 'Acasă', path: '/' }, { name: page.city, path: page.path }]}
        eyebrow={`KRAFT Metalworks · ${page.city}`}
        title={page.h1}
        lead={page.lead}
        primary={{ label: 'Cere ofertă', href: '#cotatie' }}
      />
      <section className={sectionClass}>
        <div className="mx-auto max-w-7xl">
          <SectionHeading eyebrow={`Servicii în ${page.city}`} title="Ce putem face pentru tine.">
            Zonă deservită: {page.cities}.
          </SectionHeading>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {SERVICES.map(([t, href]) => (
              <a key={href} href={href} className="rounded-3xl border border-white/5 bg-white/10 p-6 text-sm uppercase tracking-[0.2em] text-[#c5a059] backdrop-blur-md transition hover:border-[#c5a059]/40">
                {t} →
              </a>
            ))}
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {page.advantages.map(([t, d]) => (
              <div key={t} className="rounded-3xl border border-[#c5a059]/20 bg-[#c5a059]/5 p-6">
                <h2 className="font-ui text-[11px] uppercase tracking-[0.3em] text-[#c5a059]">{t}</h2>
                <p className="mt-3 text-sm leading-7 text-[#cfc5ad]">{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className={`${sectionClass} bg-[#121212]`}>
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div>
            <SectionHeading eyebrow="Întrebări frecvente" title={`KRAFT Metalworks în ${page.city}.`} />
            <FaqList faqs={page.faqs} />
          </div>
          <B2BQuoteForm
            id="cotatie"
            subject={`Cerere ofertă ${page.city} — KRAFT Metalworks`}
            title={`Ofertă pentru ${page.city}`}
            dropTitle="Trage aici poze, schițe sau fișiere DXF/DWG (opțional)"
            extraFields={{ zona: page.city }}
          >
            <label className={labelClass}>
              Ce ai nevoie
              <textarea rows="3" name="detalii" placeholder="Ex: poartă + gard 25 m, localitatea..., termen dorit..." className="mt-2 w-full rounded-[1.5rem] border border-white/10 bg-[#0f0f0f] px-4 py-3.5 text-sm text-[#f8f1e5] outline-none transition focus:border-[#c5a059] focus:ring-2 focus:ring-[#c5a059]/20" />
            </label>
          </B2BQuoteForm>
        </div>
      </section>
    </>
  );
}

export function LocalPage({ path }) {
  const page = LOCAL_PAGES.find((p) => p.path === path);
  return (
    <SiteShell>
      <LocalContent page={page} />
    </SiteShell>
  );
}
