import { FileCode2, Box, FileText, Camera } from 'lucide-react';
import { SiteShell, useShop } from '../components/Layout.jsx';
import { SectionHeading, labelClass, inputClass } from '../components/ui.jsx';
import { PageHero, ProcessSteps, FaqList, B2BQuoteForm, CtaBand, sectionClass } from './common.jsx';
import imgHero from '../assets/portofoliu-real/lucrare-reala-05.jpeg';

export const DEBITARE_PATH = '/debitare-laser-teava-tabla';

export const DEBITARE_FAQ = [
  {
    q: 'Ce formate de fișiere acceptați pentru debitare laser?',
    a: 'DXF și DWG pentru piese plane din tablă, STEP/STP pentru țeavă, profile și piese îndoite sau ansambluri, plus PDF cotat. Acceptăm și o schiță fotografiată cu dimensiuni; desenul de execuție îl facem noi și ți-l trimitem spre aprobare.',
  },
  {
    q: 'În cât timp primesc cotația?',
    a: 'În cel mult 24 de ore lucrătoare de la primirea fișierului și a datelor despre material, grosime și cantitate.',
  },
  {
    q: 'Ce materiale prelucrați?',
    a: 'Oțel carbon (OL37, OL52, S235, S355), tablă neagră, decapată, zincată și striată, inox AISI 304 și oțel Corten, sub formă de tablă, țeavă pătrată, dreptunghiulară și rotundă, profile și bară plină. Lucrezi cu aluminiu, inox 316, alamă sau cupru? Trimite fișierul și îți confirmăm în 24h.',
  },
  {
    q: 'Ce toleranțe obțineți la debitare?',
    a: 'Toleranța depinde de material și grosime. O confirmăm în scris în oferta tehnică, pentru fiecare reper, după analiza fișierului tău.',
  },
  {
    q: 'Există o cantitate minimă de comandă?',
    a: 'Lucrăm atât prototipuri și piese unicat, cât și serii. Prețul pe bucată scade odată cu volumul, pentru că pregătirea mașinii se face o singură dată pe comandă.',
  },
  {
    q: 'Cât costă debitarea laser pe metru liniar?',
    a: 'Prețul nu se stabilește doar pe metru liniar: contează materialul, grosimea, lungimea totală de tăiere, numărul de găuri și cantitatea. Trimite fișierul DXF și primești prețul exact în 24 de ore. Detalii în ghidul nostru despre prețul debitării laser.',
  },
  {
    q: 'Faceți și debitare cu plasmă sau waterjet?',
    a: 'Laserul fiber e potrivit pentru majoritatea pieselor. Ai tablă foarte groasă sau un material care nu suportă căldura? Spune-ne grosimea și materialul și îți confirmăm dacă și cum îl putem debita cu plasmă sau waterjet.',
  },
  {
    q: 'Puteți face și sudura și vopsirea?',
    a: 'Da. Pe lângă debitare executăm sudură TIG/MIG, asamblare și vopsire în câmp electrostatic, astfel încât primești piesa finită de la un singur furnizor.',
  },
];

const FORMATS = [
  { Icon: FileCode2, ext: '.DXF / .DWG', t: 'Piese plane din tablă', d: 'Scară 1:1, în milimetri, cu contururi închise și textul convertit în curbe.' },
  { Icon: Box, ext: '.STEP / .STP', t: 'Țeavă, profile, piese îndoite', d: 'Model 3D pentru debitare pe țeavă, îndoiri și ansambluri sudate.' },
  { Icon: FileText, ext: '.PDF', t: 'Desen tehnic cotat', d: 'Desen 2D cu toate cotele; îl transformăm noi în fișier de tăiere.' },
  { Icon: Camera, ext: '.JPG / .PNG', t: 'Schiță sau poză', d: 'O schiță cu dimensiunile scrise de mână e suficientă pentru o primă ofertă.' },
];

const CAPABILITIES = [
  ['Debitare laser tablă', 'Piese plane, panouri decorative, flanșe, plăci de prindere, repere pentru ansambluri.'],
  ['Debitare laser țeavă și profil', 'Țeavă rotundă, pătrată și dreptunghiulară și profile, tăiate cu laser fiber CNC, cu decupaje și îmbinări gata pentru sudură.'],
  ['Plasmă sau waterjet?', 'Ai tablă foarte groasă sau un material sensibil la căldură? Întreabă-ne și îți spunem în 24h ce soluție avem.'],
  ['Sudură TIG / MIG', 'Ansambluri sudate, cadre, structuri, cu cordon curat acolo unde rămâne vizibil.'],
  ['Vopsire în câmp electrostatic', 'Finisaj uniform și rezistent, în orice culoare RAL.'],
];

function DebitareContent() {
  const { openQuote } = useShop();
  const scrollToForm = (e) => {
    e.preventDefault();
    document.getElementById('cotatie-laser')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <PageHero
        image={imgHero}
        crumbs={[{ name: 'Acasă', path: '/' }, { name: 'Debitare laser', path: DEBITARE_PATH }]}
        eyebrow="B2B · Ingineri · Arhitecți · Dezvoltatori"
        title="Debitare laser țeavă și tablă, după fișierul tău. Cotație în 24 de ore."
        lead="Trimite DXF, DWG sau STEP și primești preț, termen și toleranțe confirmate în scris. Debitare, sudură TIG/MIG și vopsire electrostatică într-un singur loc, cu producție în Maramureș și livrare în Cluj-Napoca, Transilvania și toată țara."
        primary={{ label: 'Încarcă fișierul', href: '#cotatie-laser', onClick: scrollToForm }}
        secondary={{ label: 'Ghid: pregătirea fișierului DXF', href: '/blog/cum-pregatesti-fisier-dxf-debitare-laser' }}
      />

      <section className={sectionClass}>
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
          <B2BQuoteForm
            id="cotatie-laser"
            subject="Cotație debitare laser — KRAFT Metalworks"
            title="Cotație tehnică instant"
            intro="Trage fișierul în zona de mai jos și completează datele de bază. Restul le clarificăm la telefon."
            extraFields={{ serviciu: 'Debitare laser țeavă / tablă' }}
          >
            <div className="grid gap-4 sm:grid-cols-3">
              <label className={labelClass}>
                Material
                <select name="material" className={`${inputClass} appearance-none`}>
                  <option value="">Alege</option>
                  <option>Oțel carbon</option>
                  <option>Inox AISI 304</option>
                  <option>Oțel Corten</option>
                  <option>Nu știu încă</option>
                </select>
              </label>
              <label className={labelClass}>
                Grosime (mm)
                <input type="text" name="grosime" inputMode="decimal" placeholder="ex: 3" className={inputClass} />
              </label>
              <label className={labelClass}>
                Cantitate
                <input type="text" name="cantitate" inputMode="numeric" placeholder="ex: 250 buc" className={inputClass} />
              </label>
            </div>
            <label className={labelClass}>
              Finisaj, termen, localitate de livrare
              <textarea rows="3" name="detalii" placeholder="Ex: vopsit RAL 7016, livrare Cluj-Napoca, până pe 15 decembrie..." className="mt-2 w-full rounded-[1.5rem] border border-white/10 bg-[#0f0f0f] px-4 py-3.5 text-sm text-[#f8f1e5] outline-none transition focus:border-[#c5a059] focus:ring-2 focus:ring-[#c5a059]/20" />
            </label>
          </B2BQuoteForm>

          <div>
            <p className="mb-6 text-sm uppercase tracking-[0.35em] text-[#c5a059]">Formate acceptate</p>
            <div className="space-y-4">
              {FORMATS.map(({ Icon, ext, t, d }) => (
                <div key={ext} className="flex gap-4 rounded-3xl border border-white/5 bg-white/10 p-5 backdrop-blur-md">
                  <Icon className="mt-1 h-6 w-6 shrink-0 text-[#c5a059]" />
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#c5a059]">{ext}</p>
                    <p className="mt-1 text-sm font-semibold text-[#f8f1e5]">{t}</p>
                    <p className="mt-1 text-sm leading-6 text-[#cfc5ad]">{d}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className={`${sectionClass} bg-[#121212]`}>
        <div className="mx-auto max-w-7xl">
          <SectionHeading eyebrow="Ce executăm" title="Piesa finită, de la un singur furnizor.">
            Nu muți reperele între ateliere: debitarea, sudura și vopsirea se fac în aceeași fabrică, după același desen aprobat.
          </SectionHeading>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {CAPABILITIES.map(([t, d]) => (
              <div key={t} className="rounded-3xl border border-white/5 bg-white/10 p-8 backdrop-blur-md">
                <p className="text-sm uppercase tracking-[0.25em] text-[#c5a059]">{t}</p>
                <p className="mt-3 text-sm leading-7 text-[#cfc5ad]">{d}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {[
              ['Materiale', 'Oțel carbon S235 / S355, inox 304, Corten, tablă zincată și striată. Alt material? Întreabă-ne.'],
              ['Toleranțe', 'Confirmate în scris în oferta tehnică, per reper, în funcție de material și grosime.'],
              ['Volume', 'De la prototip și piese unicat până la serii; prețul pe bucată scade cu volumul.'],
            ].map(([t, d]) => (
              <div key={t} className="rounded-3xl border border-[#c5a059]/20 bg-[#c5a059]/5 p-6">
                <p className="text-[10px] uppercase tracking-[0.3em] text-[#c5a059]">{t}</p>
                <p className="mt-3 text-sm leading-6 text-[#cfc5ad]">{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={sectionClass}>
        <div className="mx-auto max-w-7xl">
          <SectionHeading eyebrow="Cum lucrăm" title="De la fișier la piesă livrată." />
          <ProcessSteps
            steps={[
              { title: 'Încarci fișierul', text: 'DXF, DWG, STEP, PDF sau o schiță, plus material, grosime și cantitate.' },
              { title: 'Verificăm desenul', text: 'Analizăm geometria și te anunțăm dacă ceva trebuie corectat înainte de tăiere.' },
              { title: 'Primești oferta', text: 'Preț, termen și toleranțe confirmate în scris, în 24 de ore lucrătoare.' },
              { title: 'Producem și livrăm', text: 'Debitare, sudură, vopsire și livrare la adresa ta din România.' },
            ]}
          />
        </div>
      </section>

      <section className={`${sectionClass} bg-[#0d0d0d]`}>
        <div className="mx-auto max-w-4xl">
          <SectionHeading eyebrow="Întrebări frecvente" title="Ce trebuie să știi înainte de comandă." />
          <FaqList faqs={DEBITARE_FAQ} />
          <div className="mt-12">
            <CtaBand
              title="Ai o piesă urgentă?"
              text="Trimite fișierul pe WhatsApp sau prin formular și te sunăm noi cu termenul."
              onQuote={() => openQuote({ subject: 'Cerere rapidă — debitare laser' })}
            />
          </div>
        </div>
      </section>
    </>
  );
}

export default function DebitarePage() {
  return (
    <SiteShell>
      <DebitareContent />
    </SiteShell>
  );
}
