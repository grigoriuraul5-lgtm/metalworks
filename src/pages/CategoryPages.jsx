import { ShoppingCart } from 'lucide-react';
import { SiteShell, useShop, vatNote } from '../components/Layout.jsx';
import { SectionHeading, labelClass, inputClass } from '../components/ui.jsx';
import { PageHero, ProcessSteps, FaqList, B2BQuoteForm, CtaBand, sectionClass } from './common.jsx';
import { KRAFT_PRODUCTS } from '../data/kraftFeedProducts.js';
import { toCatalogProduct } from './ProductPage.jsx';
import IMAGE_SIZES from '../data/productImageSizes.json';

import imgLaserPanel from '../assets/portofoliu/portofoliu-2.jpg';
import imgForjat from '../assets/portofoliu/portofoliu-8.jpg';
import imgPanouri from '../assets/portofoliu/portofoliu-9.jpg';
import imgPoarta from '../assets/portofoliu/portofoliu-10.jpg';
import imgGard from '../assets/portofoliu/portofoliu-11.jpg';
import imgBalustrada1 from '../assets/portofoliu/portofoliu-12.jpg';
import imgBalustrada2 from '../assets/portofoliu/portofoliu-13.jpg';
import imgPicioare from '../assets/portofoliu/portofoliu-1.jpg';

// ─────────────────────────────────────────────────────────────────────────────
// Pagini de categorie: fiecare țintește o căutare reală din Google
// („picioare masa metalice", „porti metalice", „balustrade metalice").
// ─────────────────────────────────────────────────────────────────────────────

export const PICIOARE_PATH = '/picioare-masa-metalice';
export const PORTI_PATH = '/porti-garduri-metalice';
export const BALUSTRADE_PATH = '/balustrade-metalice';
export const HORECA_PATH = '/confectii-metalice-pensiuni-horeca';

export const PICIOARE_FAQ = [
  { q: 'Prețul afișat este pentru un picior sau pentru un set?', a: 'Prețul afișat pe fiecare produs corespunde configurației descrise în fișa produsului. Dacă ai nevoie de un set pentru o masă anume, scrie-ne dimensiunea blatului și îți confirmăm exact ce primești.' },
  { q: 'Pot comanda altă înălțime, lățime sau culoare?', a: 'Da. Toate modelele se pot produce la alte dimensiuni și în orice culoare RAL, prin cerere de ofertă personalizată. Răspundem în 24 de ore lucrătoare.' },
  { q: 'În cât timp primesc picioarele de masă?', a: 'Modelele de serie se execută la comandă, de regulă în 10 zile lucrătoare, plus transportul prin curier în toată România.' },
  { q: 'Ce înălțime trebuie să aibă picioarele pentru o masă de dining?', a: 'Înălțimea totală a unei mese de dining este de obicei 72–76 cm. Scazi grosimea blatului și obții înălțimea necesară a piciorului.' },
  { q: 'Puteți face picioare de masă după un model de pe internet?', a: 'Da. Trimite poza modelului (spider, trapez, cadru A sau alt design) și dimensiunile mesei. Facem desenul, îți confirmăm prețul și producem modelul la dimensiunea ta.' },
  { q: 'Vindeți și către tâmplării sau producători de mobilă?', a: 'Da. Pentru volume recurente oferim prețuri de serie și livrări programate. Cere o ofertă B2B din formularul de pe pagină.' },
];

export const PORTI_FAQ = [
  { q: 'Faceți porți și garduri după dimensiunile mele?', a: 'Da, fiecare poartă și gard se proiectează pe dimensiunile tale. Ne trimiți măsurătorile sau o schiță, iar noi îți trimitem desenul de execuție spre aprobare înainte de producție.' },
  { q: 'Ce tipuri de porți și garduri executați?', a: 'Porți batante și culisante, portițe, panouri de gard cu modele debitate laser, garduri din profile metalice moderne și elemente decorative tip fier forjat, vopsite în câmp electrostatic.' },
  { q: 'Cât costă o poartă metalică?', a: 'Prețul depinde de dimensiuni, tipul porții (batantă sau culisantă), model, material și finisaj. După ce primim dimensiunile și modelul dorit, îți trimitem oferta exactă în 24 de ore lucrătoare.' },
  { q: 'Puteți automatiza poarta?', a: 'Proiectăm poarta pregătită pentru automatizare. Spune-ne de la început dacă vrei motor, ca să prevedem structura și prinderile potrivite.' },
  { q: 'Livrați în afara Maramureșului?', a: 'Da. Producem în Sighetu Marmației și livrăm în Baia Mare, Cluj-Napoca, Transilvania și în toată țara.' },
];

export const BALUSTRADE_FAQ = [
  { q: 'Ce tipuri de balustrade metalice faceți?', a: 'Balustrade pentru scări interioare, balcoane și terase: din profile metalice cu linii drepte, cu panouri debitate laser sau cu elemente decorative, vopsite electrostatic în culoarea dorită.' },
  { q: 'Cum se calculează prețul unei balustrade?', a: 'Prețul se calculează pe metru liniar și depinde de model, înălțime, tipul de prindere (pe treaptă, lateral sau în pardoseală), materiale și finisaj. Trimite lungimea și o poză cu locul de montaj pentru ofertă.' },
  { q: 'Lucrați cu arhitecți și firme de construcții?', a: 'Da. Primim proiectul în DWG, DXF sau PDF și livrăm balustradele pe etape, conform graficului de lucrări.' },
  { q: 'Ce înălțime trebuie să aibă o balustradă?', a: 'Înălțimea minimă se stabilește conform normativelor aplicabile și proiectului clădirii. O verificăm împreună cu tine sau cu proiectantul înainte de execuție.' },
];

export const HORECA_FAQ = [
  { q: 'Ce poate face KRAFT Metalworks pentru o pensiune?', a: 'Tot ce e metal: firmă luminoasă sau panou cu numele pensiunii debitat laser, poartă și gard, balustrade de terasă și scări, grătare și vetre de foc, structuri de foișor, mobilier de exterior și cadre metalice pentru paturi.' },
  { q: 'Pot comanda totul într-o singură ofertă?', a: 'Da. Primești un singur proiect, o singură ofertă și un singur termen de livrare pentru toate piesele, în același stil și aceeași culoare.' },
  { q: 'Lucrați și pentru restaurante și hoteluri?', a: 'Da. Pentru HoReCa producem și serii identice: picioare de masă, cadre de paturi, rafturi și elemente decorative pentru mai multe camere sau locații.' },
  { q: 'În cât timp primesc oferta?', a: 'În cel mult 24 de ore lucrătoare după ce primim pozele, dimensiunile sau planul.' },
];

export const listedProducts = () => KRAFT_PRODUCTS.filter((p) => !p.discontinued);

function ProductGrid() {
  const { addToCart, requestQuote } = useShop();
  return (
    <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-3 xl:grid-cols-4">
      {listedProducts().map((p) => {
        const [w, h] = IMAGE_SIZES[p.slug] || [1200, 900];
        const item = toCatalogProduct(p);
        const hasPrice = !p.priceOnRequest && typeof p.basePrice === 'number';
        return (
          <article key={p.slug} className="group flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#111] transition-all duration-500 hover:-translate-y-0.5 hover:border-[#c5a059]/40 hover:shadow-[0_12px_50px_rgba(197,160,89,0.18)]">
            <a href={`/produs/${p.slug}`} className="block">
              <img src={`/products/${p.slug}.jpg`} alt={`${p.title} — picior de masă metalic`} width={w} height={h} loading="lazy" decoding="async" className="h-auto w-full" />
            </a>
            <div className="flex flex-1 flex-col justify-between gap-3 px-4 py-4">
              <div>
                <h3 className="font-ui text-[12px] font-semibold uppercase tracking-[0.15em] text-[#f8f1e5]/90">
                  <a href={`/produs/${p.slug}`} className="hover:text-[#c5a059]">{p.title}</a>
                </h3>
                <p className="mt-1 line-clamp-2 text-xs leading-5 text-[#cfc5ad]/70">{p.material}</p>
              </div>
              <div className="flex items-center justify-between gap-2">
                <p className="text-sm font-semibold text-[#c5a059]">
                  {hasPrice ? <>{p.basePrice.toLocaleString('ro-RO')} <span className="text-[10px] font-normal text-[#c5a059]/80">RON</span></> : 'La cerere'}
                </p>
                <button
                  type="button"
                  onClick={() => (hasPrice ? addToCart({ product: item, size: { label: 'Standard' }, finish: { label: 'Negru Mat' }, price: p.basePrice, qty: 1 }) : requestQuote(item))}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-[#c5a059]/40 text-[#c5a059] transition hover:bg-[#c5a059] hover:text-[#0a0a0a]"
                  aria-label={hasPrice ? `Adaugă ${p.title} în coș` : `Cere ofertă pentru ${p.title}`}
                >
                  <ShoppingCart className="h-4 w-4" />
                </button>
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
}

function PicioareContent() {
  return (
    <>
      <PageHero
        image={imgPicioare}
        crumbs={[{ name: 'Acasă', path: '/' }, { name: 'Picioare de masă metalice', path: PICIOARE_PATH }]}
        eyebrow="Colecția de serie · Prețuri publice"
        title="Picioare de masă metalice, produse în România."
        lead={`${listedProducts().length} modele pentru mese de dining, birouri, cafenele și HoReCa: cadru U, X, A, H, trapez, picior central, spider (păianjen) și modele debitate laser, din profil metalic în stil industrial. Vopsite electrostatic, executate la comandă în 10 zile lucrătoare, livrate prin curier în toată țara.`}
        primary={{ label: 'Vezi modelele', href: '#modele' }}
        secondary={{ label: 'Cum alegi înălțimea', href: '/blog/picioare-masa-metalice-cum-alegi-profilul' }}
      />
      <section id="modele" className={`${sectionClass} scroll-mt-24`}>
        <div className="mx-auto max-w-7xl">
          <SectionHeading eyebrow="Toate modelele" title="Alege forma potrivită pentru blatul tău.">
            Prețurile sunt afișate pe fiecare model ({vatNote().toLowerCase()}). Pentru altă dimensiune sau culoare, cere o ofertă personalizată din pagina produsului.
          </SectionHeading>
          <ProductGrid />
        </div>
      </section>
      <section className={`${sectionClass} bg-[#121212]`}>
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-2 lg:items-start">
          <div>
            <SectionHeading eyebrow="Pentru tâmplării și producători" title="Comenzi de serie, la preț de producător." />
            <p className="text-base leading-8 text-[#cfc5ad]">
              Dacă produci mese în serie, îți livrăm picioarele în loturi programate, în aceeași culoare și la aceeași cotă de la un lot la altul. Trimite modelul și volumul lunar estimat.
            </p>
          </div>
          <B2BQuoteForm
            id="cotatie-picioare"
            subject="Cotație serie picioare de masă — KRAFT Metalworks"
            title="Ofertă pentru serie sau model custom"
            dropTitle="Ai o schiță a mesei? Trage-o aici (opțional)"
            extraFields={{ produs: 'Picioare de masă metalice' }}
          >
            <label className={labelClass}>
              Model, dimensiuni, culoare, cantitate
              <textarea rows="3" name="detalii" placeholder="Ex: model X, 72 cm înălțime, RAL 9005, 40 seturi lunar..." className="mt-2 w-full rounded-[1.5rem] border border-white/10 bg-[#0f0f0f] px-4 py-3.5 text-sm text-[#f8f1e5] outline-none transition focus:border-[#c5a059] focus:ring-2 focus:ring-[#c5a059]/20" />
            </label>
          </B2BQuoteForm>
        </div>
      </section>
      <section className={sectionClass}>
        <div className="mx-auto max-w-4xl">
          <SectionHeading eyebrow="Întrebări frecvente" title="Despre picioarele de masă." />
          <FaqList faqs={PICIOARE_FAQ} />
        </div>
      </section>
    </>
  );
}

function Gallery({ images }) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3">
      {images.map(({ src, alt, tag }) => (
        <div key={src} className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-white/10">
          <img src={src} alt={alt} loading="lazy" decoding="async" className="h-full w-full object-cover transition duration-500 hover:scale-105" />
          {tag && (
            <span className={`pointer-events-none absolute left-3 top-3 rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] backdrop-blur-md ${tag === 'Lucrare reală' ? 'bg-[#c5a059] text-black' : 'bg-black/55 text-[#f8f1e5]'}`}>{tag}</span>
          )}
        </div>
      ))}
    </div>
  );
}

export function CustomCategoryContent({ path, crumb, eyebrow, title, lead, heroImage, gallery, galleryTitle, types, typesTitle, faqs, subject, product, detailsPlaceholder, faqTitle, extra }) {
  const { openQuote } = useShop();
  const scrollToForm = (e) => {
    e.preventDefault();
    document.getElementById('cotatie')?.scrollIntoView({ behavior: 'smooth' });
  };
  return (
    <>
      <PageHero
        image={heroImage}
        crumbs={[{ name: 'Acasă', path: '/' }, { name: crumb, path }]}
        eyebrow={eyebrow}
        title={title}
        lead={lead}
        primary={{ label: 'Cere ofertă gratuită', href: '#cotatie', onClick: scrollToForm }}
        secondary={gallery?.length ? { label: 'Vezi lucrări', href: '#lucrari' } : undefined}
      />
      <section className={sectionClass}>
        <div className="mx-auto max-w-7xl">
          <SectionHeading eyebrow="Ce executăm" title={typesTitle || `${crumb}, la comandă.`} />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {types.map(([t, d]) => (
              <div key={t} className="rounded-3xl border border-white/5 bg-white/10 p-6 backdrop-blur-md">
                <h3 className="font-ui text-sm uppercase tracking-[0.25em] text-[#c5a059]">{t}</h3>
                <p className="mt-3 text-sm leading-7 text-[#cfc5ad]">{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="px-6 pb-4 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-4 rounded-3xl border border-[#c5a059]/20 bg-[#c5a059]/5 p-6 sm:flex-row sm:items-center">
          <p className="text-sm leading-6 text-[#cfc5ad]">
            <span className="font-semibold text-[#f8f1e5]">Nu găsești exact ce cauți?</span> Spune-ne piesa, materialul sau procesul de care ai nevoie. Verificăm și îți răspundem în 24 de ore.
          </p>
          <a href="#cotatie" onClick={scrollToForm} className="shrink-0 rounded-full border border-[#c5a059]/60 px-6 py-3 text-xs uppercase tracking-[0.25em] text-[#c5a059] transition hover:bg-[#c5a059]/10">
            Întreabă-ne
          </a>
        </div>
      </section>
      {extra}
      {gallery?.length > 0 && (
        <section id="lucrari" className={`${sectionClass} scroll-mt-24 bg-[#121212]`}>
          <div className="mx-auto max-w-7xl">
            <SectionHeading eyebrow="Din atelier" title={galleryTitle}>
              Fotografii reale din producție, înainte de vopsire și livrare.
            </SectionHeading>
            <Gallery images={gallery} />
          </div>
        </section>
      )}
      <section className={sectionClass}>
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div>
            <SectionHeading eyebrow="Cum lucrăm" title="De la măsurători la montaj." />
            <ProcessSteps
              compact
              steps={[
                { title: 'Ne trimiți dimensiunile', text: 'Măsurători, o poză a locului și modelul dorit (sau o idee).' },
                { title: 'Primești desenul și oferta', text: 'Desen de execuție și preț ferm, în 24 de ore lucrătoare.' },
                { title: 'Producem', text: 'Debitare laser, sudură și vopsire electrostatică în culoarea aleasă.' },
                { title: 'Livrăm', text: 'Livrare la adresă; montajul se stabilește în ofertă.' },
              ]}
            />
          </div>
          <B2BQuoteForm
            id="cotatie"
            subject={subject}
            title="Cere ofertă gratuită"
            intro="Completează ce știi. Dacă nu ai măsurători exacte, te ajutăm noi să le iei corect."
            dropTitle="Trage aici poze, schițe sau planul (opțional)"
            extraFields={{ produs: product }}
          >
            <label className={labelClass}>
              Localitate
              <input type="text" name="localitate" placeholder="Ex: Baia Mare" className={inputClass} />
            </label>
            <label className={labelClass}>
              Dimensiuni și model dorit
              <textarea rows="3" name="detalii" placeholder={detailsPlaceholder} className="mt-2 w-full rounded-[1.5rem] border border-white/10 bg-[#0f0f0f] px-4 py-3.5 text-sm text-[#f8f1e5] outline-none transition focus:border-[#c5a059] focus:ring-2 focus:ring-[#c5a059]/20" />
            </label>
          </B2BQuoteForm>
        </div>
      </section>
      <section className={`${sectionClass} bg-[#0d0d0d]`}>
        <div className="mx-auto max-w-4xl">
          <SectionHeading eyebrow="Întrebări frecvente" title={faqTitle} />
          <FaqList faqs={faqs} />
          <div className="mt-12">
            <CtaBand title="Vrei o părere rapidă?" text="Trimite o poză pe WhatsApp cu locul unde vrei lucrarea și îți spunem ce variante ai." onQuote={() => openQuote({ subject })} />
          </div>
        </div>
      </section>
    </>
  );
}

export function PicioareMasaPage() {
  return (
    <SiteShell>
      <PicioareContent />
    </SiteShell>
  );
}

export function PortiGarduriPage() {
  return (
    <SiteShell>
      <CustomCategoryContent
        path={PORTI_PATH}
        crumb="Porți și garduri metalice"
        eyebrow="Rezidențial · Pensiuni · Spații comerciale"
        title="Porți și garduri metalice pe dimensiunile tale."
        lead="Porți batante și culisante, portițe și panouri de gard cu modele debitate laser, proiectate pe măsurătorile tale și vopsite electrostatic. Producție în Maramureș, livrare în Baia Mare, Cluj-Napoca și în toată țara."
        heroImage={imgPoarta}
        types={[
          ['Porți batante', 'Una sau două canate, cu portiță asortată, pregătite pentru automatizare.'],
          ['Porți culisante', 'Pentru intrări largi sau spațiu limitat, cu structură dimensionată pe deschidere.'],
          ['Panouri de gard', 'Modele moderne din profile sau panouri de gard laser cut, debitate laser după modelul ales.'],
          ['Elemente decorative', 'Modele clasice tip fier forjat, executate pe desenul ales de tine.'],
        ]}
        gallery={[
          { src: imgPoarta, alt: 'Poartă metalică în execuție în atelierul KRAFT Metalworks' },
          { src: imgGard, alt: 'Panouri de gard metalic din profile, în atelier' },
          { src: imgPanouri, alt: 'Panouri de gard decorative debitate laser, paletizate pentru livrare' },
          { src: imgForjat, alt: 'Gard cu elemente decorative tip fier forjat' },
          { src: imgLaserPanel, alt: 'Panou metalic decorativ debitat laser' },
          { src: imgBalustrada2, alt: 'Structură metalică sudată din profile' },
        ]}
        galleryTitle="Porți și garduri în execuție."
        faqs={PORTI_FAQ}
        faqTitle="Despre porți și garduri."
        subject="Cerere ofertă porți / garduri metalice — KRAFT Metalworks"
        product="Porți și garduri metalice"
        detailsPlaceholder="Ex: poartă culisantă 4,5 m + portiță 1 m, înălțime 1,6 m, model modern, negru mat..."
      />
    </SiteShell>
  );
}

export function BalustradePage() {
  return (
    <SiteShell>
      <CustomCategoryContent
        path={BALUSTRADE_PATH}
        crumb="Balustrade metalice"
        eyebrow="Scări · Balcoane · Terase"
        title="Balustrade metalice moderne, la metru liniar sau la proiect."
        lead="Balustrade pentru scări interioare, balcoane și terase, din profile metalice sau cu panouri debitate laser, vopsite electrostatic. Pentru case, pensiuni, hoteluri și dezvoltatori imobiliari."
        heroImage={imgBalustrada1}
        types={[
          ['Scări interioare', 'Balustrade cu prindere pe treaptă sau laterală, pe forma exactă a scării.'],
          ['Balcoane și terase', 'Structuri pentru exterior, vopsite electrostatic pentru rezistență la intemperii.'],
          ['Panouri decorative', 'Balustradă debitată laser sau din tablă perforată, cu model geometric, vegetal sau logo; variante din inox; aluminiu la cerere.'],
          ['Proiecte de serie', 'Balustrade identice pentru blocuri, hoteluri și ansambluri rezidențiale.'],
        ]}
        gallery={[
          { src: imgBalustrada1, alt: 'Balustradă metalică din profile, în execuție' },
          { src: imgBalustrada2, alt: 'Panou de balustradă metalică sudat' },
          { src: imgLaserPanel, alt: 'Panou decorativ debitat laser pentru balustradă' },
          { src: imgForjat, alt: 'Elemente decorative metalice pentru balustrade' },
          { src: imgGard, alt: 'Structuri metalice din profile în atelier' },
          { src: imgPanouri, alt: 'Panouri metalice decorative paletizate pentru livrare' },
        ]}
        galleryTitle="Balustrade și panouri în execuție."
        faqs={BALUSTRADE_FAQ}
        faqTitle="Despre balustrade."
        subject="Cerere ofertă balustrade metalice — KRAFT Metalworks"
        product="Balustrade metalice"
        detailsPlaceholder="Ex: balustradă scară interioară, 6 m liniari, prindere laterală, negru mat..."
      />
    </SiteShell>
  );
}

export function HorecaPage() {
  return (
    <SiteShell>
      <CustomCategoryContent
        path={HORECA_PATH}
        crumb="Confecții metalice pentru pensiuni și HoReCa"
        eyebrow="Pensiuni · Hoteluri · Restaurante"
        title="Tot ce e metal la pensiunea ta, într-o singură comandă."
        lead="Firmă debitată laser, poartă, balustrade de terasă, grătar, vatră de foc, mobilier de exterior și cadre de paturi, proiectate în același stil și produse în Maramureș. Un singur proiect, o singură ofertă, un singur termen."
        heroImage={imgLaserPanel}
        types={[
          ['Identitate', 'Firmă sau panou cu numele pensiunii, debitat laser, cu sau fără iluminare.'],
          ['Exterior', 'Poartă, gard, balustrade de terasă, structuri de foișor și pergole.'],
          ['Grădină și foc', 'Grătare, vetre de foc, suporturi de lemne, jardiniere din Corten.'],
          ['Camere și restaurant', 'Picioare de masă, cadre de paturi, rafturi și elemente decorative în serie.'],
        ]}
        gallery={[
          { src: imgLaserPanel, alt: 'Panou metalic decorativ debitat laser' },
          { src: imgPanouri, alt: 'Panouri metalice decorative pentru gard și terasă' },
          { src: imgPoarta, alt: 'Poartă metalică în execuție' },
          { src: imgBalustrada1, alt: 'Balustradă metalică pentru terasă, în execuție' },
          { src: imgPicioare, alt: 'Picioare de masă metalice pentru restaurant' },
          { src: imgForjat, alt: 'Elemente metalice decorative' },
        ]}
        galleryTitle="Lucrări din atelier."
        faqs={HORECA_FAQ}
        faqTitle="Despre proiectele pentru pensiuni și HoReCa."
        subject="Cerere ofertă pensiune / HoReCa — KRAFT Metalworks"
        product="Pachet metal pensiune / HoReCa"
        detailsPlaceholder="Ex: pensiune în Breb, firmă la intrare, balustradă terasă 12 m, grătar de exterior, 8 cadre de pat 160×200..."
      />
    </SiteShell>
  );
}
