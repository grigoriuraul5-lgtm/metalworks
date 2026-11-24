import { useState } from 'react';
import { ArrowRight, ChevronRight } from 'lucide-react';
import { sendLead } from '../lib/leads.js';
import { contact, whatsappLink } from '../siteConfig.js';
import { DropZone, GdprConsent, inputClass, labelClass, primaryButtonClass } from '../components/ui.jsx';

export function Breadcrumbs({ items }) {
  return (
    <nav aria-label="Navigare" className="mb-8 flex flex-wrap items-center gap-2 text-[10px] uppercase tracking-[0.25em] text-[#cfc5ad]/70">
      {items.map((item, i) => (
        <span key={item.path} className="flex items-center gap-2">
          {i > 0 && <ChevronRight className="h-3 w-3 text-[#c5a059]/80" />}
          {i < items.length - 1 ? (
            <a href={item.path} className="transition hover:text-[#c5a059]">{item.name}</a>
          ) : (
            <span className="text-[#cfc5ad]/80">{item.name}</span>
          )}
        </span>
      ))}
    </nav>
  );
}

// Hero de pagină interioară — aceleași culori/tipografie ca hero-ul principal.
export function PageHero({ crumbs, eyebrow, title, lead, primary, secondary, image }) {
  return (
    <section
      className="relative overflow-hidden border-b border-white/10 px-6 pb-20 pt-16 lg:px-8"
      style={{
        backgroundColor: '#0a0a0a',
        backgroundImage: image
          ? `linear-gradient(180deg, rgba(10,10,10,0.75), rgba(10,10,10,0.95)), url(${image})`
          : 'radial-gradient(ellipse at top, rgba(197,160,89,0.10), transparent 60%)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="mx-auto max-w-7xl">
        {crumbs && <Breadcrumbs items={crumbs} />}
        <span className="mb-6 inline-flex text-sm font-bold uppercase tracking-[0.15em] text-[#c5a059] sm:tracking-[0.35em]">{eyebrow}</span>
        <h1 className="max-w-4xl text-4xl font-semibold leading-tight text-[#c5a059] sm:text-5xl lg:text-6xl">{title}</h1>
        <p className="mt-8 max-w-2xl text-base leading-8 text-[#d8ccb6] sm:text-lg">{lead}</p>
        {(primary || secondary) && (
          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            {primary && (
              <a href={primary.href} onClick={primary.onClick} className="inline-flex items-center justify-center gap-2 rounded-full bg-[#c5a059] px-8 py-3.5 text-sm uppercase tracking-[0.3em] text-[#0a0a0a] transition duration-300 hover:bg-[#b8924b]">
                {primary.label} <ChevronRight className="h-4 w-4" />
              </a>
            )}
            {secondary && (
              <a href={secondary.href} {...(secondary.download ? { download: true } : {})} className="inline-flex items-center justify-center gap-2 rounded-full border border-[#c5a059] bg-black/70 px-8 py-3.5 text-sm uppercase tracking-[0.3em] transition duration-300 hover:bg-[#141414]">
                {secondary.label} <ArrowRight className="h-4 w-4" />
              </a>
            )}
          </div>
        )}
      </div>
    </section>
  );
}

export function SpecGrid({ items }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {items.map(({ label, value, note }) => (
        <div key={label} className="rounded-3xl border border-white/5 bg-white/10 p-6 backdrop-blur-md">
          <p className="text-[10px] uppercase tracking-[0.3em] text-[#cfc5ad]/70">{label}</p>
          <p className="mt-3 text-2xl font-semibold text-[#c5a059]">{value}</p>
          {note && <p className="mt-2 text-sm leading-6 text-[#cfc5ad]">{note}</p>}
        </div>
      ))}
    </div>
  );
}

export function ProcessSteps({ steps, compact = false }) {
  return (
    <ol className={`grid gap-4 md:grid-cols-2 ${compact ? '' : 'lg:grid-cols-4'}`}>
      {steps.map(({ title, text }, i) => (
        <li key={title} className="rounded-3xl border border-white/10 bg-white/5 p-6">
          <span className="text-xs font-semibold uppercase tracking-[0.3em] text-[#c5a059]">Pasul {i + 1}</span>
          <p className="mt-3 text-lg font-semibold text-[#f8f1e5]">{title}</p>
          <p className="mt-2 text-sm leading-6 text-[#cfc5ad]/80">{text}</p>
        </li>
      ))}
    </ol>
  );
}

export function FaqList({ faqs }) {
  return (
    <div className="divide-y divide-white/10 rounded-[2rem] border border-white/10 bg-white/5">
      {faqs.map(({ q, a }) => (
        <details key={q} className="group px-6 py-5 sm:px-8">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-base font-semibold text-[#f8f1e5] marker:hidden">
            {q}
            <span className="shrink-0 text-xl text-[#c5a059] transition group-open:rotate-45">+</span>
          </summary>
          <p className="mt-4 text-sm leading-7 text-[#cfc5ad]">{a}</p>
        </details>
      ))}
    </div>
  );
}

// Formular de cotație B2B cu drag & drop — folosit pe paginile de servicii.
export function B2BQuoteForm({ id, subject, title, intro, children, dropTitle, extraFields = {} }) {
  const [status, setStatus] = useState('idle');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');
    try {
      await sendLead(e.target, { _subject: subject, ...extraFields });
      setStatus('sent');
      e.target.reset();
    } catch {
      setStatus('error');
    }
  };

  if (status === 'sent') {
    return (
      <div id={id} className="flex flex-col items-center justify-center rounded-[2rem] border border-[#c5a059]/30 bg-[#c5a059]/10 p-10 text-center shadow-luxe">
        <p className="text-xl font-semibold text-[#f8f1e5]">Cererea a fost trimisă!</p>
        <p className="mt-2 text-sm text-[#cfc5ad]/70">Revenim cu oferta tehnică în cel mult 24 de ore lucrătoare.</p>
        <button type="button" onClick={() => setStatus('idle')} className="mt-6 rounded-full bg-[#c5a059] px-8 py-3 text-xs uppercase tracking-[0.25em] text-[#0a0a0a] transition hover:bg-[#b79245]">
          Trimite altă cerere
        </button>
      </div>
    );
  }

  return (
    <form id={id} onSubmit={handleSubmit} className="scroll-mt-28 rounded-[2rem] border border-white/10 bg-white/5 p-8 shadow-luxe backdrop-blur-md lg:p-10">
      <p className="mb-2 text-xs uppercase tracking-[0.35em] text-[#c5a059]">{title}</p>
      {intro && <p className="mb-6 text-sm leading-6 text-[#cfc5ad]/80">{intro}</p>}
      <div className="space-y-5">
        <DropZone large title={dropTitle || 'Trage fișierul .DXF / .DWG / .PDF aici pentru cotație tehnică'} />
        <div className="grid gap-4 sm:grid-cols-2">
          <label className={labelClass}>
            Firmă
            <input type="text" name="firma" placeholder="Denumire firmă (opțional)" className={inputClass} />
          </label>
          <label className={labelClass}>
            Persoană de contact
            <input type="text" name="nume" required placeholder="Nume și prenume" className={inputClass} />
          </label>
          <label className={labelClass}>
            Telefon
            <input type="tel" name="telefon" required placeholder="+40 7xx xxx xxx" className={inputClass} />
          </label>
          <label className={labelClass}>
            Email
            <input type="email" name="email" placeholder="email@firma.ro" className={inputClass} />
          </label>
        </div>
        {children}
        <GdprConsent />
        <button type="submit" disabled={status === 'sending'} className={primaryButtonClass}>
          {status === 'sending' ? 'Se trimite...' : 'Cere Cotația'} <ArrowRight className="h-4 w-4" />
        </button>
        {status === 'error' && (
          <p className="text-center text-xs text-red-400">
            Cererea nu a plecat. Sună la {contact.phone} sau{' '}
            <a href={whatsappLink()} className="underline">scrie pe WhatsApp</a>.
          </p>
        )}
      </div>
    </form>
  );
}

export function CtaBand({ title, text, onQuote }) {
  return (
    <div className="flex flex-col items-start justify-between gap-6 rounded-[2rem] border border-[#c5a059]/20 bg-[#c5a059]/5 p-8 sm:flex-row sm:items-center lg:p-10">
      <div>
        <p className="text-2xl font-semibold text-[#f8f1e5]" style={{ fontFamily: "'Playfair Display', serif" }}>{title}</p>
        <p className="mt-2 max-w-xl text-sm leading-6 text-[#cfc5ad]">{text}</p>
      </div>
      <div className="flex shrink-0 flex-col gap-3 sm:flex-row">
        <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center rounded-full border border-[#c5a059]/50 px-6 py-3 text-xs uppercase tracking-[0.25em] text-[#c5a059] transition hover:bg-[#c5a059]/10">
          WhatsApp
        </a>
        <button type="button" onClick={onQuote} className="inline-flex items-center justify-center gap-2 rounded-full bg-[#c5a059] px-6 py-3 text-xs uppercase tracking-[0.25em] text-[#0a0a0a] transition hover:bg-[#b79245]">
          Cere Cotație <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

export const sectionClass = 'px-6 py-20 lg:px-8';
