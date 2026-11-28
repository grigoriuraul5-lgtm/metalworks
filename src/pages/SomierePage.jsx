import { useState } from 'react';
import { Factory, Hotel, Truck } from 'lucide-react';
import { SiteShell, useShop } from '../components/Layout.jsx';
import { SectionHeading, labelClass, inputClass } from '../components/ui.jsx';
import { PageHero, SpecGrid, ProcessSteps, FaqList, B2BQuoteForm, CtaBand, sectionClass } from './common.jsx';
import imgHero from '../assets/portofoliu-real/lucrare-reala-17.jpeg';
import realMecanism from '../assets/lucrari-noi/mecanism-pat.jpg';
import realCadre from '../assets/lucrari-noi/cadre-ambalate.jpg';
import realProfil from '../assets/lucrari-noi/profil-vopsit.jpg';
import realSuportT from '../assets/lucrari-noi/suport-t.jpg';
import realZincat from '../assets/lucrari-noi/suport-zincat.jpg';
import realSuportiAlbi from '../assets/lucrari-noi/suporti-albi.jpg';

const REAL_SERIE = [
  { src: realMecanism, alt: 'Cadru metalic montat într-un pat tapițat' },
  { src: realCadre, alt: 'Cadre metalice de pat ambalate pentru livrare' },
  { src: realProfil, alt: 'Profil metalic vopsit pentru cadru de pat' },
  { src: realSuportT, alt: 'Suport metalic în T pentru mobilier' },
  { src: realZincat, alt: 'Piesă de prindere zincată' },
  { src: realSuportiAlbi, alt: 'Suporturi metalice vopsite alb, în serie' },
];

export const SOMIERE_PATH = '/somiere-metalice-serie';
export const SOMIERE_PDF = '/fise/fisa-tehnica-cadre-somiere-kraft.pdf';

export const SOMIERE_SPECS = [
  { label: 'Capacitate de producție', value: '500–1.000 buc / 2 săpt.', note: 'Loturi planificate, cu livrări la date fixe pentru comenzi recurente.' },
  { label: 'Pas de perforare', value: '38 mm', note: 'Pas constant pe toată lungimea profilului de cadru.' },
  { label: 'Diametru găuri', value: 'ø 8,2 mm', note: 'Pentru fixarea casetelor de plastic fără joc.' },
  { label: 'Casete compatibile', value: '68 × 8 mm', note: 'Casete de plastic standard pentru lamele.' },
  { label: 'Lamele', value: 'Fag', note: 'Cadrul poate fi livrat cu sau fără lamele montate.' },
  { label: 'Execuție și finisaj', value: 'MIG/TIG + electrostatic', note: 'Sudură completă la colțuri, vopsire în câmp electrostatic, culoare RAL la alegere.' },
];

export const SOMIERE_FAQ = [
  {
    q: 'Câte cadre de somieră puteți produce și în cât timp?',
    a: 'Producem loturi de 500–1.000 de cadre metalice la fiecare 2 săptămâni. Pentru comenzi recurente rezervăm capacitatea în avans și stabilim un calendar fix de livrări.',
  },
  {
    q: 'Ce casete și lamele se potrivesc pe cadrele voastre?',
    a: 'Profilul cadrului este perforat la pas de 38 mm, cu găuri de ø 8,2 mm, compatibile cu casete de plastic de 68 × 8 mm și lamele din fag.',
  },
  {
    q: 'Puteți produce după dimensiunile și desenul nostru?',
    a: 'Da. Trimiteți desenul (DXF, DWG, STEP sau PDF cotat) sau doar dimensiunile cadrului și cantitatea estimată. Primiți oferta tehnică și termenul în 24 de ore lucrătoare.',
  },
  {
    q: 'Livrați în afara Maramureșului?',
    a: 'Da. Producem în Sighetu Marmației și livrăm în Baia Mare, Cluj-Napoca, în toată Transilvania și la nivel național.',
  },
  {
    q: 'Se poate comanda o mostră înainte de serie?',
    a: 'Da, recomandăm aprobarea unei mostre înainte de lansarea seriei, pe care să montați casetele și lamelele pe care le folosiți deja.',
  },
];

const SIZE_OPTIONS = ['90 × 200 cm', '140 × 200 cm', '160 × 200 cm', '180 × 200 cm', 'Altă dimensiune / desen propriu'];

function estimateWeeks(qty) {
  // Capacitate 500–1.000 buc la 2 săptămâni → interval estimativ.
  const fast = Math.max(2, Math.ceil(qty / 1000) * 2);
  const slow = Math.max(2, Math.ceil(qty / 500) * 2);
  return fast === slow ? `${fast} săptămâni` : `${fast}–${slow} săptămâni`;
}

function VolumeConfigurator({ qty, setQty, size, setSize, slats, setSlats }) {
  return (
    <div className="rounded-[2rem] border border-white/10 bg-white/5 p-8 backdrop-blur-md lg:p-10">
      <p className="mb-6 text-xs uppercase tracking-[0.35em] text-[#c5a059]">Configurator de volum</p>
      <label className={labelClass}>
        Cantitate estimată: <span className="text-[#f8f1e5]">{qty.toLocaleString('ro-RO')} buc</span>
        <input
          type="range"
          min="100"
          max="5000"
          step="100"
          value={qty}
          onChange={(e) => setQty(Number(e.target.value))}
          className="mt-4 w-full accent-[#c5a059]"
        />
      </label>
      <div className="mt-2 flex justify-between text-[10px] uppercase tracking-[0.2em] text-[#cfc5ad]/70">
        <span>100</span><span>5.000+</span>
      </div>
      <label className={`${labelClass} mt-6`}>
        Dimensiune somieră
        <select value={size} onChange={(e) => setSize(e.target.value)} className={`${inputClass} appearance-none`}>
          {SIZE_OPTIONS.map((s) => <option key={s}>{s}</option>)}
        </select>
      </label>
      <fieldset className="mt-6">
        <legend className={labelClass}>Livrare</legend>
        <div className="mt-3 grid grid-cols-2 gap-3">
          {['Doar cadru metalic', 'Cadru + casete + lamele fag'].map((opt) => (
            <button
              key={opt}
              type="button"
              onClick={() => setSlats(opt)}
              aria-pressed={slats === opt}
              className={`rounded-2xl border px-4 py-3 text-xs leading-5 transition ${
                slats === opt ? 'border-[#c5a059] bg-[#c5a059]/10 text-[#c5a059]' : 'border-white/10 text-[#cfc5ad] hover:border-[#c5a059]/40'
              }`}
            >
              {opt}
            </button>
          ))}
        </div>
      </fieldset>
      <div className="mt-8 rounded-2xl border border-[#c5a059]/20 bg-[#c5a059]/5 p-5">
        <p className="text-[10px] uppercase tracking-[0.3em] text-[#cfc5ad]/70">Termen estimat de producție</p>
        <p className="mt-2 text-3xl font-semibold text-[#c5a059]">{estimateWeeks(qty)}</p>
        <p className="mt-2 text-xs leading-5 text-[#cfc5ad]/70">
          Calculat la capacitatea de 500–1.000 buc / 2 săptămâni. Termenul ferm îl confirmăm în oferta tehnică.
        </p>
      </div>
    </div>
  );
}

function SomiereContent() {
  const { openQuote } = useShop();
  const [qty, setQty] = useState(1000);
  const [size, setSize] = useState(SIZE_OPTIONS[0]);
  const [slats, setSlats] = useState('Doar cadru metalic');

  const scrollToForm = (e) => {
    e.preventDefault();
    document.getElementById('cotatie-serie')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <PageHero
        image={imgHero}
        crumbs={[{ name: 'Acasă', path: '/' }, { name: 'Somiere de serie', path: SOMIERE_PATH }]}
        eyebrow="B2B · Producție de serie"
        title="Cadre metalice pentru somiere, 500–1.000 de bucăți la fiecare 2 săptămâni."
        lead="Somiere de pat metalice și cadre de pat rezistente, pentru fabrici de mobilă, hoteluri, pensiuni și rețele HoReCa. Profil perforat la pas de 38 mm pentru casete de 68 × 8 mm și lamele din fag, sudat și vopsit electrostatic, livrat în loturi la date fixe."
        primary={{ label: 'Cere cotație de serie', href: '#cotatie-serie', onClick: scrollToForm }}
        secondary={{ label: 'Descarcă fișa tehnică', href: SOMIERE_PDF, download: true }}
      />

      <section className={sectionClass}>
        <div className="mx-auto max-w-7xl">
          <SectionHeading eyebrow="Fișă tehnică" title="Cadrul metalic, pe scurt.">
            Datele de mai jos sunt și în fișa tehnică PDF, pe care o poți trimite direct echipei de achiziții.
          </SectionHeading>
          <SpecGrid items={SOMIERE_SPECS} />
        </div>
      </section>

      <section className={`${sectionClass} bg-[#121212]`}>
        <div className="mx-auto max-w-7xl">
          <SectionHeading eyebrow="Pentru cine producem" title="Gândit pentru linii de asamblare, nu pentru o singură bucată." />
          <div className="grid gap-4 md:grid-cols-3">
            {[
              { Icon: Factory, t: 'Fabrici de mobilă', d: 'Cadre livrate în loturi constante, ca linia de asamblare să nu aștepte după componente.' },
              { Icon: Hotel, t: 'Hoteluri, pensiuni, HoReCa', d: 'Somiere rezistente la utilizare intensivă, în aceeași dimensiune și culoare pe toate camerele.' },
              { Icon: Truck, t: 'Distribuitori și producători de saltele', d: 'Cadru compatibil cu casetele standard, pentru pachete complete somieră + saltea.' },
            ].map(({ Icon, t, d }) => (
              <div key={t} className="rounded-3xl border border-white/5 bg-white/10 p-8 backdrop-blur-md">
                <Icon className="h-6 w-6 text-[#c5a059]" />
                <p className="mt-5 text-sm uppercase tracking-[0.25em] text-[#c5a059]">{t}</p>
                <p className="mt-3 text-sm leading-7 text-[#cfc5ad]">{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={sectionClass} id="lucrari">
        <div className="mx-auto max-w-7xl">
          <SectionHeading eyebrow="Lucrări reale" title="Piese livrate producătorilor de mobilă.">
            Cadre, profile și piese de prindere realizate în serie, după desenul clientului.
          </SectionHeading>
          <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3">
            {REAL_SERIE.map(({ src, alt }) => (
              <div key={src} className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-white/10">
                <img src={src} alt={alt} loading="lazy" decoding="async" className="h-full w-full object-cover transition duration-500 hover:scale-105" />
                <span className="pointer-events-none absolute left-3 top-3 rounded-full bg-[#c5a059] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-black">Lucrare reală</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={sectionClass} id="configurator">
        <div className="mx-auto max-w-7xl">
          <SectionHeading eyebrow="Cotație de serie" title="Configurează volumul și cere oferta.">
            Alege cantitatea și dimensiunea; datele se completează automat în cerere. Primești prețul pe bucată și calendarul de livrări în 24 de ore lucrătoare.
          </SectionHeading>
          <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
            <VolumeConfigurator qty={qty} setQty={setQty} size={size} setSize={setSize} slats={slats} setSlats={setSlats} />
            <B2BQuoteForm
              id="cotatie-serie"
              subject={`Cotație serie somiere — ${qty} buc — KRAFT Metalworks`}
              title="Cerere cotație de serie"
              intro="Atașează desenul cadrului dacă îl ai. Dacă nu, dimensiunile din configurator sunt suficiente pentru o primă ofertă."
              dropTitle="Trage desenul cadrului (.DXF / .DWG / .PDF) aici"
              extraFields={{ produs: 'Cadre metalice somiere', cantitate: `${qty} buc`, dimensiune: size, livrare: slats, termen_estimat: estimateWeeks(qty) }}
            >
              <label className={labelClass}>
                Detalii (frecvență comandă, culoare RAL, ambalare)
                <textarea rows="3" name="detalii" placeholder="Ex: 1.000 buc lunar, RAL 9005, paletizat câte 50 buc..." className="mt-2 w-full rounded-[1.5rem] border border-white/10 bg-[#0f0f0f] px-4 py-3.5 text-sm text-[#f8f1e5] outline-none transition focus:border-[#c5a059] focus:ring-2 focus:ring-[#c5a059]/20" />
              </label>
            </B2BQuoteForm>
          </div>
        </div>
      </section>

      <section className={`${sectionClass} bg-[#0d0d0d]`}>
        <div className="mx-auto max-w-7xl">
          <SectionHeading eyebrow="Cum lucrăm" title="De la desen la livrare în loturi." />
          <ProcessSteps
            steps={[
              { title: 'Trimiți desenul', text: 'Desen, dimensiuni sau o mostră existentă, plus volumul lunar estimat.' },
              { title: 'Primești oferta', text: 'Preț pe bucată, termen pe loturi și condiții de livrare, în 24 de ore lucrătoare.' },
              { title: 'Aprobi mostra', text: 'Montezi casetele și lamelele tale pe cadrul-mostră înainte de serie.' },
              { title: 'Livrăm în loturi', text: 'Producție planificată, livrări la date fixe, paletizat cum îți convine.' },
            ]}
          />
        </div>
      </section>

      <section className={sectionClass}>
        <div className="mx-auto max-w-4xl">
          <SectionHeading eyebrow="Întrebări frecvente" title="Ce ne întreabă achizitorii." />
          <FaqList faqs={SOMIERE_FAQ} />
          <div className="mt-12">
            <CtaBand
              title="Ai un volum de discutat azi?"
              text="Sună sau scrie pe WhatsApp: îți spunem pe loc dacă avem capacitate liberă pentru termenul tău."
              onQuote={() => openQuote({ subject: 'Cerere rapidă — somiere de serie', details: 'Cadre metalice somiere, cantitate: ' })}
            />
          </div>
        </div>
      </section>
    </>
  );
}

export default function SomierePage() {
  return (
    <SiteShell>
      <SomiereContent />
    </SiteShell>
  );
}
