import { useRef, useState } from 'react';
import { ArrowRight, Shield, Sparkles, Mail, ChevronRight, ChevronLeft } from 'lucide-react';
import heroBG from './assets/imagine hero 1.jpeg';
import heroBGMobile from './assets/imagine hero 1 mobile.jpeg';
import logo1 from './assets/logo 1.png';
import proiectArhitectural from './assets/proiect_arhitectural.jpg';
import portofoliu1 from './assets/portofoliu/portofoliu-1.jpg';
import portofoliu2 from './assets/portofoliu/portofoliu-2.jpg';
import portofoliu3 from './assets/portofoliu/portofoliu-3.jpg';
import portofoliu4 from './assets/portofoliu/portofoliu-4.jpg';
import portofoliu5 from './assets/portofoliu/portofoliu-5.jpg';
import portofoliu6 from './assets/portofoliu/portofoliu-6.jpg';
import portofoliu7 from './assets/portofoliu/portofoliu-7.jpg';
import portofoliu8 from './assets/portofoliu/portofoliu-8.jpg';
import portofoliu9 from './assets/portofoliu/portofoliu-9.jpg';
import portofoliu10 from './assets/portofoliu/portofoliu-10.jpg';
import portofoliu11 from './assets/portofoliu/portofoliu-11.jpg';
import portofoliu12 from './assets/portofoliu/portofoliu-12.jpg';
import portofoliu13 from './assets/portofoliu/portofoliu-13.jpg';
import portofoliu14 from './assets/portofoliu/portofoliu-14.jpg';
import lucrareReala1 from './assets/portofoliu-real/lucrare-reala-01.jpeg';
import lucrareReala2 from './assets/portofoliu-real/lucrare-reala-02.jpeg';
import lucrareReala3 from './assets/portofoliu-real/lucrare-reala-03.jpeg';
import lucrareReala4 from './assets/portofoliu-real/lucrare-reala-04.jpeg';
import lucrareReala5 from './assets/portofoliu-real/lucrare-reala-05.jpeg';
import lucrareReala6 from './assets/portofoliu-real/lucrare-reala-06.jpeg';
import lucrareReala7 from './assets/portofoliu-real/lucrare-reala-07.jpeg';
import lucrareReala8 from './assets/portofoliu-real/lucrare-reala-08.jpeg';
import lucrareReala9 from './assets/portofoliu-real/lucrare-reala-09.jpeg';
import lucrareReala10 from './assets/portofoliu-real/lucrare-reala-10.jpeg';
import lucrareReala11 from './assets/portofoliu-real/lucrare-reala-11.jpeg';
import lucrareReala12 from './assets/portofoliu-real/lucrare-reala-12.jpeg';
import lucrareReala13 from './assets/portofoliu-real/lucrare-reala-13.jpeg';
import lucrareReala14 from './assets/portofoliu-real/lucrare-reala-14.jpeg';
import lucrareReala15 from './assets/portofoliu-real/lucrare-reala-15.jpeg';
import lucrareReala16 from './assets/portofoliu-real/lucrare-reala-16.jpeg';
import lucrareReala17 from './assets/portofoliu-real/lucrare-reala-17.jpeg';
import lucrareReala18 from './assets/portofoliu-real/lucrare-reala-18.jpeg';
import { contactInfo } from './productsData.js';
import { CatalogShowroom } from './CatalogShowroom.jsx';

import { SiteShell, useShop } from './components/Layout.jsx';
import { DropZone, GdprConsent } from './components/ui.jsx';
import { sendLead } from './lib/leads.js';
import { telLink } from './siteConfig.js';

const portfolioImages = [
  // ── Lucrări reale, din șantier/atelier (2026) — primele afișate ──
  lucrareReala1, lucrareReala2, lucrareReala3, lucrareReala4, lucrareReala5, lucrareReala6,
  lucrareReala7, lucrareReala8, lucrareReala9, lucrareReala10, lucrareReala11, lucrareReala12,
  lucrareReala13, lucrareReala14, lucrareReala15, lucrareReala16, lucrareReala17, lucrareReala18,
  // ── Arhivă randări/foto anterioare ──
  portofoliu10, portofoliu9, portofoliu11, portofoliu12, portofoliu13,
  portofoliu1, portofoliu2, portofoliu3, portofoliu4, portofoliu5, portofoliu6, portofoliu7, portofoliu8,
  portofoliu14,
];

function HomePage() {
  const { addToCart, requestQuote } = useShop();
  const [portfolioExpanded, setPortfolioExpanded] = useState(false);
  const [consultStatus, setConsultStatus] = useState('idle'); // idle | sending | sent | error
  const [proiectStatus, setProiectStatus] = useState('idle'); // idle | sending | sent | error

  const handleConsultSubmit = async (e) => {
    e.preventDefault();
    setConsultStatus('sending');
    try {
      await sendLead(e.target, { _subject: 'Cerere Consultanță Tehnică — KRAFT Metalworks' });
      setConsultStatus('sent');
      e.target.reset();
    } catch (err) {
      setConsultStatus('error');
    }
  };

  const handleProiectSubmit = async (e) => {
    e.preventDefault();
    setProiectStatus('sending');
    try {
      await sendLead(e.target, { _subject: 'Cerere Proiect Custom — KRAFT Metalworks' });
      setProiectStatus('sent');
      e.target.reset();
    } catch (err) {
      setProiectStatus('error');
    }
  };
  const portfolioScrollRef = useRef(null);

  const scrollPortfolio = (dir) => {
    const el = portfolioScrollRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * 340, behavior: 'smooth' });
  };
  const scrollTo = (id) => (e) => {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };


  return (
    <>
        <section
          id="home"
          className="relative overflow-hidden hero-section"
          style={{
            backgroundColor: '#0a0a0a',
            backgroundImage: `linear-gradient(180deg, rgba(10,10,10,0.6), rgba(10,10,10,0.85)), url(${heroBG})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <style>{`
            @media (max-width: 768px) {
              .hero-section {
                background-image: linear-gradient(180deg, rgba(10,10,10,0.6), rgba(10,10,10,0.85)), url(${heroBGMobile}) !important;
              }
            }
          `}</style>
          <div className="mx-auto flex min-h-[calc(100vh-80px)] max-w-7xl flex-col justify-center px-6 pb-24 pt-24 text-center md:min-h-[calc(100vh-112px)] lg:px-8">
            <h1 className="font-ui mb-6 inline-flex justify-center text-base font-bold uppercase tracking-[0.15em] text-[#c5a059] sm:text-xl sm:tracking-[0.35em]">
              <span className="sr-only">KRAFT Metalworks — </span>Confecții metalice de precizie
            </h1>
            <p className="mx-auto max-w-4xl text-5xl font-semibold leading-tight text-[#c5a059] sm:text-6xl lg:text-7xl" style={{ fontFamily: "'Playfair Display', serif" }}>
              Inginerie de Precizie.
            </p>
            <p className="mx-auto mt-8 max-w-2xl text-base leading-8 text-[#d8ccb6] sm:text-lg">
              Specialiști în balustrade arhitecturale, scări metalice și design industrial modern, executate într-o fabrică partener cu peste 30 de ani de experiență în prelucrarea oțelului.
            </p>
            <div className="mx-auto mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <a
                href="#collection"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-[#c5a059] bg-black/70 px-8 py-3 text-sm uppercase tracking-[0.35em] transition duration-300 hover:bg-[#141414] hover:text-[#f8f1e5]"
              >
                Explorează Colecția <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href="#proiecte-custom"
                onClick={scrollTo('proiecte-custom')}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#c5a059] px-8 py-3 text-sm uppercase tracking-[0.35em] text-[#0a0a0a] transition duration-300 hover:bg-[#b8924b]"
              >
                Proiecte Custom <ChevronRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </section>

        <CatalogShowroom onAddToCart={addToCart} onRequestQuote={requestQuote} />

        <section id="heritage" className="bg-[#121212] px-6 py-24 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="mb-14 max-w-3xl">
              <p className="mb-4 text-sm uppercase tracking-[0.35em] text-[#c5a059]">Proiecte Arhitecturale / B2B</p>
              <h2 className="text-4xl font-semibold leading-tight text-[#c5a059] sm:text-5xl">
                Consultanță Tehnică pentru Proiecte de Scară Mare.
              </h2>
              <p className="mt-6 max-w-2xl text-base leading-8 text-[#cfc5ad]">
                Colaborăm direct cu arhitecți, designeri și dezvoltatori imobiliari. Trimite detaliile proiectului și primești o propunere tehnică detaliată în 24 de ore.
              </p>
              <nav aria-label="Servicii" className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-xs uppercase tracking-[0.25em]">
                {[
                  ['Porți și garduri', '/porti-garduri-metalice'],
                  ['Balustrade', '/balustrade-metalice'],
                  ['Debitare laser', '/debitare-laser-teava-tabla'],
                  ['Somiere de serie', '/somiere-metalice-serie'],
                ].map(([t, href]) => (
                  <a key={href} href={href} className="text-[#c5a059] underline decoration-[#c5a059]/30 underline-offset-4 transition hover:decoration-[#c5a059]">{t} →</a>
                ))}
              </nav>
            </div>

            <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
              {/* Left: image + feature cards */}
              <div className="space-y-6">
                <div className="relative overflow-hidden rounded-[2rem] border border-white/5 shadow-luxe bg-[#0a0a0a]">
                  <img
                    src={proiectArhitectural}
                    alt="Proiect arhitectural Kraft Metalworks"
                    className="w-full h-auto block max-h-[85vh] object-contain"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/25 to-black/65" />
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="rounded-3xl border border-white/5 bg-white/10 p-5 backdrop-blur-md">
                    <div className="flex items-center gap-3 text-[#c5a059]">
                      <Sparkles className="h-4 w-4" />
                      <span className="uppercase tracking-[0.25em] text-xs">Finitură premium</span>
                    </div>
                    <p className="mt-3 text-sm leading-6 text-[#cfc5ad]">
                      Metal periat, tonuri profunde și reflexii discrete pentru fiecare proiect.
                    </p>
                  </div>
                  <div className="rounded-3xl border border-white/5 bg-white/10 p-5 backdrop-blur-md">
                    <div className="flex items-center gap-3 text-[#c5a059]">
                      <Shield className="h-4 w-4" />
                      <span className="uppercase tracking-[0.25em] text-xs">Infrastructură robustă</span>
                    </div>
                    <p className="mt-3 text-sm leading-6 text-[#cfc5ad]">
                      Standarde industriale și control de calitate pentru proiecte de scară mare.
                    </p>
                  </div>
                </div>
              </div>

              {/* Right: consultancy form */}
              {consultStatus === 'sent' ? (
                <div className="flex flex-col items-center justify-center rounded-[2rem] border border-[#c5a059]/30 bg-[#c5a059]/10 p-8 text-center shadow-luxe">
                  <p className="text-lg font-semibold text-[#f8f1e5]">Cererea a fost trimisă!</p>
                  <p className="mt-2 text-sm text-[#cfc5ad]/70">Echipa KRAFT te contactează în 24 de ore.</p>
                  <button
                    type="button"
                    onClick={() => setConsultStatus('idle')}
                    className="mt-6 rounded-full bg-[#c5a059] px-8 py-3 text-xs uppercase tracking-[0.25em] text-[#0a0a0a] transition hover:bg-[#b79245]"
                  >
                    Trimite altă cerere
                  </button>
                </div>
              ) : (
                <form
                  onSubmit={handleConsultSubmit}
                  className="rounded-[2rem] border border-white/10 bg-white/5 p-8 backdrop-blur-md shadow-luxe"
                >
                  <p className="mb-6 text-xs uppercase tracking-[0.35em] text-[#c5a059]">Cerere Consultanță Tehnică</p>
                  <div className="space-y-5">
                    <div className="grid gap-4 sm:grid-cols-2">
                      <label className="block text-xs uppercase tracking-[0.18em] text-[#cfc5ad]">
                        Nume complet
                        <input type="text" name="nume" placeholder="Ion Popescu" className="mt-2 w-full rounded-3xl border border-white/10 bg-[#0f0f0f] px-4 py-3.5 text-sm text-[#f8f1e5] outline-none transition focus:border-[#c5a059] focus:ring-2 focus:ring-[#c5a059]/20" />
                      </label>
                      <label className="block text-xs uppercase tracking-[0.18em] text-[#cfc5ad]">
                        Telefon
                        <input type="tel" name="telefon" required placeholder="+40 7xx xxx xxx" className="mt-2 w-full rounded-3xl border border-white/10 bg-[#0f0f0f] px-4 py-3.5 text-sm text-[#f8f1e5] outline-none transition focus:border-[#c5a059] focus:ring-2 focus:ring-[#c5a059]/20" />
                      </label>
                    </div>
                    <label className="block text-xs uppercase tracking-[0.18em] text-[#cfc5ad]">
                      Email
                      <input type="email" name="email" placeholder="email@exemplu.ro" className="mt-2 w-full rounded-3xl border border-white/10 bg-[#0f0f0f] px-4 py-3.5 text-sm text-[#f8f1e5] outline-none transition focus:border-[#c5a059] focus:ring-2 focus:ring-[#c5a059]/20" />
                    </label>
                    <label className="block text-xs uppercase tracking-[0.18em] text-[#cfc5ad]">
                      Tip Proiect
                      <select name="tip_proiect" className="mt-2 w-full appearance-none rounded-3xl border border-white/10 bg-[#0f0f0f] px-4 py-3.5 text-sm text-[#f8f1e5] outline-none transition focus:border-[#c5a059] focus:ring-2 focus:ring-[#c5a059]/20">
                        <option value="">Selectează tipul proiectului</option>
                        <option>Balustradă / Scară Arhitecturală</option>
                        <option>Poartă / Gard Monumental</option>
                        <option>Structură Exterioară / Pergolă</option>
                        <option>Compartimentare / Design Interior</option>
                        <option>Fațadă / Placare Exterioară</option>
                        <option>Proiect Custom Complex</option>
                      </select>
                    </label>
                    <label className="block text-xs uppercase tracking-[0.18em] text-[#cfc5ad]">
                      Descrierea Proiectului
                      <textarea
                        rows="4"
                        name="descriere"
                        placeholder="Dimensiuni, materiale, destinație, termen dorit, buget estimat..."
                        className="mt-2 w-full rounded-[1.5rem] border border-white/10 bg-[#0f0f0f] px-4 py-3.5 text-sm text-[#f8f1e5] outline-none transition focus:border-[#c5a059] focus:ring-2 focus:ring-[#c5a059]/20"
                      />
                    </label>
                    <div>
                      <p className="mb-2 text-xs uppercase tracking-[0.18em] text-[#cfc5ad]">Schițe / Planuri / Fotografii (opțional)</p>
                      <DropZone title="Trage fișierele sau apasă pentru a selecta" />
                    </div>
                    <GdprConsent />
                    <button
                      type="submit"
                      disabled={consultStatus === 'sending'}
                      className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-[#c5a059] px-8 py-4 text-sm uppercase tracking-[0.25em] text-[#0a0a0a] transition duration-300 hover:bg-[#b79245] hover:shadow-[0_0_20px_rgba(197,160,89,0.3)] disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {consultStatus === 'sending' ? 'Se trimite...' : 'Trimite Cererea'} <ArrowRight className="h-4 w-4" />
                    </button>
                    {consultStatus === 'error' && (
                      <p className="text-center text-xs text-red-400">A apărut o eroare. Sună-ne direct la {contactInfo.phone}.</p>
                    )}
                  </div>
                </form>
              )}
            </div>
          </div>
        </section>

        <section id="story" className="px-6 py-24 lg:px-8">
          <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
            <div className="space-y-6">
              <p className="text-sm uppercase tracking-[0.35em] text-[#c5a059]">Despre noi</p>
              <h2 className="text-4xl font-semibold leading-tight text-[#c5a059] sm:text-5xl">
                Fabricație românească cu suflet industrial.
              </h2>
              <p className="max-w-2xl text-base leading-8 text-[#cfc5ad]">
                KRAFT Metalworks combină rafinamentul estetic cu precizia ingineriei metalice. Fiecare componentă este evaluată pentru funcționalitate, durabilitate și impact vizual.
              </p>
              <a href="#proiecte-custom" className="inline-flex items-center gap-2 text-sm uppercase tracking-[0.2em] text-[#c5a059] underline decoration-[#c5a059]/40 underline-offset-4 transition hover:decoration-[#c5a059]">
                Vezi portofoliul nostru <ArrowRight className="h-4 w-4" />
              </a>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-3xl border border-white/5 bg-white/10 p-8 backdrop-blur-md">
                <p className="text-sm uppercase tracking-[0.25em] text-[#c5a059]">30+ ani de fabricație</p>
                <p className="mt-4 text-sm leading-7 text-[#cfc5ad]">Producem în aceeași fabrică din Maramureș care execută de peste 30 de ani structuri metalice pentru reședințe, spații comerciale și industrie.</p>
              </div>
              <div className="rounded-3xl border border-white/5 bg-white/10 p-8 backdrop-blur-md">
                <p className="text-sm uppercase tracking-[0.25em] text-[#c5a059]">Toleranțe stricte</p>
                <p className="mt-4 text-sm leading-7 text-[#cfc5ad]">Fiecare piesă este verificată dimensional și la finisaj înainte de livrare, după desenul de execuție aprobat de tine.</p>
              </div>
            </div>
          </div>
        </section>

        <section id="proiecte-custom" className="bg-[#0d0d0d] px-6 py-24 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div>
              <div className="mb-10 max-w-2xl">
                <p className="mb-3 text-sm uppercase tracking-[0.35em] text-[#c5a059]">Proiect la Comandă (Portofoliu)</p>
                <h3 className="text-3xl font-semibold leading-tight text-[#f8f1e5] sm:text-4xl">
                  Ai o idee? Hai s-o construim împreună.
                </h3>
                <p className="mt-4 text-base leading-8 text-[#cfc5ad]/80">
                  Completează formularul cu detaliile proiectului tău și adaugă schițe sau fotografii. Echipa Kraft te contactează în 24 de ore.
                </p>
              </div>

              <div className="mb-16">
                <div className="mb-6 flex items-center justify-between">
                  <p className="text-sm uppercase tracking-[0.3em] text-[#c5a059]">Selecție de lucrări finalizate</p>
                  <div className="hidden gap-2 sm:flex">
                    <button
                      type="button"
                      onClick={() => scrollPortfolio(-1)}
                      aria-label="Derulează la stânga"
                      className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-[#c5a059] transition hover:border-[#c5a059]/60 hover:bg-[#c5a059]/10"
                    >
                      <ChevronLeft className="h-5 w-5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => scrollPortfolio(1)}
                      aria-label="Derulează la dreapta"
                      className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-[#c5a059] transition hover:border-[#c5a059]/60 hover:bg-[#c5a059]/10"
                    >
                      <ChevronRight className="h-5 w-5" />
                    </button>
                  </div>
                </div>

                <div
                  ref={portfolioScrollRef}
                  className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
                >
                  {(portfolioExpanded ? portfolioImages : portfolioImages.slice(0, 6)).map((src, i) => (
                    <div
                      key={i}
                      className="aspect-square w-[70%] flex-shrink-0 snap-start overflow-hidden rounded-2xl border border-white/10 bg-white/5 sm:w-[45%] lg:w-[23%]"
                    >
                      <img src={src} alt={`Lucrare KRAFT Metalworks ${i + 1}`} className="h-full w-full object-cover transition duration-500 hover:scale-105" loading="lazy" decoding="async" />
                    </div>
                  ))}
                </div>

                <div className="mt-6 flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
                  <p className="text-xs text-[#cfc5ad]/70">Exemple din proiectele noastre — portofoliul complet este în continuă extindere.</p>
                  {!portfolioExpanded && portfolioImages.length > 6 && (
                    <button
                      type="button"
                      onClick={() => setPortfolioExpanded(true)}
                      className="inline-flex items-center justify-center gap-2 rounded-full border border-[#c5a059]/40 bg-[#c5a059]/5 px-6 py-3 text-xs uppercase tracking-[0.25em] text-[#c5a059] transition duration-300 hover:border-[#c5a059] hover:bg-[#c5a059]/10"
                    >
                      Vezi mai multe lucrări <ChevronRight className="h-4 w-4" />
                    </button>
                  )}
                </div>
              </div>

              {proiectStatus === 'sent' ? (
                <div className="flex flex-col items-center justify-center rounded-[2rem] border border-[#c5a059]/30 bg-[#c5a059]/10 p-10 text-center shadow-luxe lg:p-14">
                  <p className="text-xl font-semibold text-[#f8f1e5]">Cererea de proiect a fost trimisă!</p>
                  <p className="mt-2 text-sm text-[#cfc5ad]/70">Echipa KRAFT te contactează în 24 de ore.</p>
                  <button
                    type="button"
                    onClick={() => setProiectStatus('idle')}
                    className="mt-6 rounded-full bg-[#c5a059] px-8 py-3 text-xs uppercase tracking-[0.25em] text-[#0a0a0a] transition hover:bg-[#b79245]"
                  >
                    Trimite altă cerere
                  </button>
                </div>
              ) : (
                <form
                  onSubmit={handleProiectSubmit}
                  className="rounded-[2rem] border border-white/10 bg-white/5 p-8 backdrop-blur-md shadow-luxe lg:p-12"
                >
                  <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    <label className="block text-xs uppercase tracking-[0.18em] text-[#cfc5ad]">
                      Nume complet
                      <input type="text" name="nume" placeholder="Ion Popescu" className="mt-3 w-full rounded-3xl border border-white/10 bg-[#111111] px-4 py-4 text-sm text-[#f8f1e5] outline-none transition focus:border-[#c5a059] focus:ring-2 focus:ring-[#c5a059]/20" />
                    </label>
                    <label className="block text-xs uppercase tracking-[0.18em] text-[#cfc5ad]">
                      Email
                      <input type="email" name="email" placeholder="email@exemplu.ro" className="mt-3 w-full rounded-3xl border border-white/10 bg-[#111111] px-4 py-4 text-sm text-[#f8f1e5] outline-none transition focus:border-[#c5a059] focus:ring-2 focus:ring-[#c5a059]/20" />
                    </label>
                    <label className="block text-xs uppercase tracking-[0.18em] text-[#cfc5ad]">
                      Telefon
                      <input type="tel" name="telefon" required placeholder="+40 7xx xxx xxx" className="mt-3 w-full rounded-3xl border border-white/10 bg-[#111111] px-4 py-4 text-sm text-[#f8f1e5] outline-none transition focus:border-[#c5a059] focus:ring-2 focus:ring-[#c5a059]/20" />
                    </label>
                  </div>

                  <div className="mt-6">
                    <label className="block text-xs uppercase tracking-[0.18em] text-[#cfc5ad]">
                      Tip Proiect
                      <select name="tip_proiect" className="mt-3 w-full appearance-none rounded-3xl border border-white/10 bg-[#111111] px-4 py-4 text-sm text-[#f8f1e5] outline-none transition focus:border-[#c5a059] focus:ring-2 focus:ring-[#c5a059]/20">
                        <option value="">Selectează tipul proiectului</option>
                        <option value="balustrada">Balustradă / Scară</option>
                        <option value="poarta">Poartă / Gard</option>
                        <option value="mobilier">Mobilier Metalic</option>
                        <option value="pergola">Pergolă / Structură Exterioară</option>
                        <option value="feronerie">Feronerie Custom</option>
                        <option value="arta">Artă / Sculptură</option>
                        <option value="altele">Altele</option>
                      </select>
                    </label>
                  </div>

                  <div className="mt-6">
                    <label className="block text-xs uppercase tracking-[0.18em] text-[#cfc5ad]">
                      Detalii Tehnice
                      <textarea
                        rows="5"
                        name="detalii"
                        placeholder="Dimensiuni, materiale preferate, destinație (interior/exterior), volum estimat, termen dorit..."
                        className="mt-3 w-full rounded-[1.5rem] border border-white/10 bg-[#111111] px-4 py-4 text-sm text-[#f8f1e5] outline-none transition focus:border-[#c5a059] focus:ring-2 focus:ring-[#c5a059]/20"
                      />
                    </label>
                  </div>

                  <div className="mt-6">
                    <p className="mb-3 text-xs uppercase tracking-[0.18em] text-[#cfc5ad]">Schițe / Fotografii (opțional)</p>
                    <DropZone large title="Trage fișierele aici sau apasă pentru a selecta" />
                  </div>
                  <GdprConsent className="mt-6" />

                  <button
                    type="submit"
                    disabled={proiectStatus === 'sending'}
                    className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#c5a059] px-8 py-4 text-sm uppercase tracking-[0.25em] text-[#0a0a0a] transition duration-300 hover:bg-[#b79245] hover:shadow-[0_0_20px_rgba(197,160,89,0.3)] disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {proiectStatus === 'sending' ? 'Se trimite...' : 'Trimite Cererea de Proiect'} <ArrowRight className="h-4 w-4" />
                  </button>
                  {proiectStatus === 'error' && (
                    <p className="mt-4 text-center text-xs text-red-400">A apărut o eroare. Sună-ne direct la {contactInfo.phone}.</p>
                  )}
                </form>
              )}
            </div>
          </div>
        </section>

        <section id="contact" className="bg-[#141414] px-6 py-24 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="mb-14 max-w-3xl">
              <p className="mb-4 text-sm uppercase tracking-[0.35em] text-[#c5a059]">Contact</p>
              <h2 className="text-4xl font-semibold leading-tight text-[#c5a059] sm:text-5xl">
                Suntem la dispoziția ta.
              </h2>
              <p className="mt-6 max-w-xl text-base leading-8 text-[#cfc5ad]">
                Fie că ai o întrebare rapidă sau vrei să discuți un proiect, echipa KRAFT Metalworks îți răspunde prompt.
              </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {/* Phone */}
              <a
                href={telLink(contactInfo.phone)}
                className="group flex flex-col gap-5 rounded-3xl border border-[#c5a059]/20 bg-[#c5a059]/5 p-8 backdrop-blur-md transition-all duration-300 hover:border-[#c5a059]/60 hover:bg-[#c5a059]/10 hover:shadow-[0_6px_40px_rgba(197,160,89,0.15)]"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-[#c5a059]/40 bg-[#c5a059]/15">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#c5a059]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" /></svg>
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-[0.3em] text-[#cfc5ad]/70 mb-2">Sună Acum</p>
                  <p className="text-xl font-bold tracking-wide text-[#c5a059] transition-colors group-hover:text-[#e2bc77]">{contactInfo.phone}</p>
                  <p className="mt-1 text-xs text-[#cfc5ad]/70">Click pentru apel direct</p>
                </div>
              </a>

              {/* Phone 2 */}
              <a
                href={telLink(contactInfo.phone2)}
                className="group flex flex-col gap-5 rounded-3xl border border-[#c5a059]/20 bg-[#c5a059]/5 p-8 backdrop-blur-md transition-all duration-300 hover:border-[#c5a059]/60 hover:bg-[#c5a059]/10 hover:shadow-[0_6px_40px_rgba(197,160,89,0.15)]"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-[#c5a059]/40 bg-[#c5a059]/15">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#c5a059]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" /></svg>
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-[0.3em] text-[#cfc5ad]/70 mb-2">Al Doilea Număr</p>
                  <p className="text-xl font-bold tracking-wide text-[#c5a059] transition-colors group-hover:text-[#e2bc77]">{contactInfo.phone2}</p>
                  <p className="mt-1 text-xs text-[#cfc5ad]/70">Click pentru apel direct</p>
                </div>
              </a>

              {/* Email */}
              <a
                href={`mailto:${contactInfo.email}`}
                className="group flex flex-col gap-5 rounded-3xl border border-[#c5a059]/20 bg-[#c5a059]/5 p-8 backdrop-blur-md transition-all duration-300 hover:border-[#c5a059]/60 hover:bg-[#c5a059]/10 hover:shadow-[0_6px_40px_rgba(197,160,89,0.15)]"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-[#c5a059]/40 bg-[#c5a059]/15">
                  <Mail className="h-6 w-6 text-[#c5a059]" />
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-[0.3em] text-[#cfc5ad]/70 mb-2">Trimite Email</p>
                  <p className="text-lg font-bold text-[#c5a059] transition-colors group-hover:text-[#e2bc77] break-all">{contactInfo.email}</p>
                  <p className="mt-1 text-xs text-[#cfc5ad]/70">Click pentru email direct</p>
                </div>
              </a>

              {/* Schedule */}
              <div className="flex flex-col gap-5 rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-md">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-[#c5a059]/30 bg-[#c5a059]/10">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#c5a059]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-[0.3em] text-[#cfc5ad]/70 mb-2">Program</p>
                  <p className="text-base font-semibold text-[#f8f1e5]">{contactInfo.schedule}</p>
                </div>
              </div>
            </div>
          </div>
        </section>
    </>
  );
}

function App() {
  return (
    <SiteShell>
      <HomePage />
    </SiteShell>
  );
}

export default App;
