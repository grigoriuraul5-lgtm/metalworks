import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { ArrowRight, ChevronRight, Menu, X, ShoppingCart, Trash2, Minus, Plus, Phone, MessageCircle, FileUp } from 'lucide-react';
import logo1 from '../assets/logo 1.png';
import { sendLead } from '../lib/leads.js';
import { contact, company, companyAddressLine, whatsappLink, telLink } from '../siteConfig.js';
import { GdprConsent, DropZone, inputClass, labelClass, primaryButtonClass } from './ui.jsx';
import { track, loadTracking, hasConsent, trackingEnabled, CONSENT_KEY } from '../lib/analytics.js';

const contactInfo = contact;

export const lineTotal = (item) => item.price * (item.qty || 1);
export const cartTotal = (items) => items.reduce((sum, item) => sum + lineTotal(item), 0);
export const cartCount = (items) => items.reduce((sum, item) => sum + (item.qty || 1), 0);

function CartSidebar({ isOpen, items, onClose, onRemove, onQty, onCheckout }) {
  const total = cartTotal(items);

  return (
    <>
      <div
        className={`fixed inset-0 z-[9990] bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />
      <div
        className={`fixed inset-y-0 right-0 z-[9991] flex h-full w-full max-w-md flex-col overflow-hidden bg-[#111111] border-l border-white/10 shadow-2xl transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between border-b border-white/10 px-6 py-5">
          <div className="flex items-center gap-3">
            <ShoppingCart className="h-5 w-5 text-[#c5a059]" />
            <h2 className="text-sm uppercase tracking-[0.3em] text-[#f8f1e5]">Coș de Cumpărături</h2>
            {items.length > 0 && (
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#c5a059] text-[10px] font-bold text-[#0a0a0a]">
                {cartCount(items)}
              </span>
            )}
          </div>
          <button
            type="button"
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-[#f8f1e5] transition-all hover:border-[#c5a059] hover:text-[#c5a059]"
            aria-label="Închide coșul"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto px-6 py-4 space-y-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <ShoppingCart className="mb-4 h-10 w-10 text-[#cfc5ad]/70" />
              <p className="text-sm uppercase tracking-[0.25em] text-[#cfc5ad]/70">Coșul este gol</p>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={item.cartId}
                className="flex gap-4 rounded-2xl border border-white/10 bg-white/5 p-4 transition-all hover:border-[#c5a059]/20"
              >
                <img
                  src={item.product.image}
                  alt={item.product.title}
                  className="h-16 w-16 shrink-0 rounded-xl object-cover"
                />
                <div className="min-w-0 flex-1 space-y-1">
                  <p className="truncate text-sm font-medium text-[#f8f1e5]">{item.product.title}</p>
                  <p className="text-[11px] text-[#cfc5ad]/70">{item.size.label}</p>
                  <p className="text-[11px] text-[#cfc5ad]/70">{item.finish.label}</p>
                  <div className="flex items-center justify-between gap-3 pt-1">
                    <div className="flex items-center rounded-full border border-white/10">
                      <button type="button" onClick={() => onQty(item.cartId, (item.qty || 1) - 1)} className="flex h-7 w-7 items-center justify-center text-[#cfc5ad] hover:text-[#c5a059]" aria-label="Scade cantitatea">
                        <Minus className="h-3 w-3" />
                      </button>
                      <span className="w-6 text-center text-xs text-[#f8f1e5]">{item.qty || 1}</span>
                      <button type="button" onClick={() => onQty(item.cartId, (item.qty || 1) + 1)} className="flex h-7 w-7 items-center justify-center text-[#cfc5ad] hover:text-[#c5a059]" aria-label="Crește cantitatea">
                        <Plus className="h-3 w-3" />
                      </button>
                    </div>
                    <p className="text-sm font-semibold text-[#c5a059]">{lineTotal(item).toLocaleString('ro-RO')} RON</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => onRemove(item.cartId)}
                  className="shrink-0 self-start text-[#cfc5ad]/70 transition-colors hover:text-red-400"
                  aria-label="Elimină din coș"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            ))
          )}
        </div>

        {items.length > 0 && (
          <div className="border-t border-white/10 px-6 py-5 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm uppercase tracking-[0.2em] text-[#cfc5ad]/70">Total estimat</span>
              <span className="text-xl font-semibold text-[#f8f1e5]">{total.toLocaleString('ro-RO')} RON</span>
            </div>
            <button
              type="button"
              onClick={onCheckout}
              className="flex w-full items-center justify-center gap-2 rounded-full bg-[#c5a059] px-6 py-3.5 text-sm uppercase tracking-[0.25em] text-[#0a0a0a] transition-all duration-300 hover:bg-[#b79245] hover:shadow-[0_0_24px_rgba(197,160,89,0.4)]"
            >
              Finalizare Comandă <ArrowRight className="h-4 w-4" />
            </button>
            <p className="text-center text-[10px] uppercase tracking-[0.2em] text-[#cfc5ad]/70">
              {vatNote()} · Transportul se confirmă telefonic
            </p>
          </div>
        )}
      </div>
    </>
  );
}

function CustomRequestOverlay({ product, onClose }) {
  const [status, setStatus] = useState('idle'); // idle | sending | sent | error

  useEffect(() => {
    setStatus('idle');
  }, [product?.id]);

  if (!product) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');
    try {
      await sendLead(e.target, {
        _subject: `Cerere ofertă — ${product.title}`,
        produs: product.title,
        categorie: product.category || '',
      });
      setStatus('sent');
      e.target.reset();
    } catch (err) {
      setStatus('error');
    }
  };

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-start justify-center overflow-y-auto p-4 sm:items-center sm:p-6"
      style={{ background: 'rgba(10,10,10,0.92)' }}
    >
      <div className="relative my-auto w-full max-w-lg rounded-3xl border border-white/10 bg-[#141414] p-8 shadow-2xl">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-[#f8f1e5] transition-all hover:border-[#c5a059] hover:text-[#c5a059]"
          aria-label="Închide"
        >
          <X className="h-4 w-4" />
        </button>

        <p className="mb-1 text-xs uppercase tracking-[0.35em] text-[#c5a059]">Cerere Personalizată</p>

        {product.imgRender && (
          <div className="mb-5 flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-3">
            <img
              src={product.imgRender}
              alt={product.title}
              className="h-16 w-16 shrink-0 rounded-xl object-cover"
            />
            <div className="min-w-0">
              <p className="text-[10px] uppercase tracking-[0.2em] text-[#cfc5ad]/70">Produs selectat</p>
              <p className="truncate text-sm font-semibold text-[#f8f1e5]">{product.title}</p>
            </div>
          </div>
        )}
        <h3 className="mb-6 text-2xl font-semibold text-[#f8f1e5]">{product.imgRender ? 'Cerere ofertă pentru acest produs' : product.title}</h3>

        {status === 'sent' ? (
          <div className="rounded-2xl border border-[#c5a059]/30 bg-[#c5a059]/10 p-6 text-center">
            <p className="text-sm font-semibold text-[#f8f1e5]">Cererea a fost trimisă!</p>
            <p className="mt-2 text-xs text-[#cfc5ad]/70">Echipa KRAFT te contactează în 24 de ore.</p>
            <button
              type="button"
              onClick={onClose}
              className="mt-5 rounded-full bg-[#c5a059] px-6 py-2.5 text-xs uppercase tracking-[0.2em] text-[#0a0a0a] transition hover:bg-[#b79245]"
            >
              Închide
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block text-xs uppercase tracking-[0.18em] text-[#cfc5ad]">
                Nume
                <input
                  type="text"
                  name="nume"
                  required
                  placeholder="Numele complet"
                  className="mt-2 w-full rounded-2xl border border-white/10 bg-[#0f0f0f] px-4 py-3 text-sm text-[#f8f1e5] outline-none transition focus:border-[#c5a059] focus:ring-2 focus:ring-[#c5a059]/20"
                />
              </label>
              <label className="block text-xs uppercase tracking-[0.18em] text-[#cfc5ad]">
                Telefon
                <input
                  type="tel"
                  name="telefon"
                  required
                  placeholder="+40 7xx xxx xxx"
                  className="mt-2 w-full rounded-2xl border border-white/10 bg-[#0f0f0f] px-4 py-3 text-sm text-[#f8f1e5] outline-none transition focus:border-[#c5a059] focus:ring-2 focus:ring-[#c5a059]/20"
                />
              </label>
            </div>
            <label className="block text-xs uppercase tracking-[0.18em] text-[#cfc5ad]">
              Email
              <input
                type="email"
                name="email"
                placeholder="email@exemplu.ro"
                className="mt-2 w-full rounded-2xl border border-white/10 bg-[#0f0f0f] px-4 py-3 text-sm text-[#f8f1e5] outline-none transition focus:border-[#c5a059] focus:ring-2 focus:ring-[#c5a059]/20"
              />
            </label>
            <label className="block text-xs uppercase tracking-[0.18em] text-[#cfc5ad]">
              Dimensiuni dorite
              <input
                type="text"
                name="dimensiuni"
                placeholder="ex: 120×80 cm, grosime 8 mm..."
                className="mt-2 w-full rounded-2xl border border-white/10 bg-[#0f0f0f] px-4 py-3 text-sm text-[#f8f1e5] outline-none transition focus:border-[#c5a059] focus:ring-2 focus:ring-[#c5a059]/20"
              />
            </label>
            <label className="block text-xs uppercase tracking-[0.18em] text-[#cfc5ad]">
              Detalii suplimentare
              <textarea
                rows="3"
                name="detalii"
                placeholder="Alte cerințe tehnice sau estetice..."
                className="mt-2 w-full rounded-2xl border border-white/10 bg-[#0f0f0f] px-4 py-3 text-sm text-[#f8f1e5] outline-none transition focus:border-[#c5a059] focus:ring-2 focus:ring-[#c5a059]/20"
              />
            </label>
            <DropZone title="Ai o schiță sau o poză? Trage-o aici (opțional)" />
            <GdprConsent />
            <button
              type="submit"
              disabled={status === 'sending'}
              className="w-full rounded-full bg-[#c5a059] py-3.5 text-sm uppercase tracking-[0.25em] text-[#0a0a0a] transition-all duration-300 hover:bg-[#b79245] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {status === 'sending' ? 'Se trimite...' : 'Trimite Cererea'}
            </button>
            {status === 'error' && (
              <p className="text-center text-xs text-red-400">
                A apărut o eroare. Sună-ne direct la {contactInfo.phone}.
              </p>
            )}
          </form>
        )}
      </div>
    </div>
  );
}

function CheckoutOverlay({ isOpen, items, onClose, onOrderSuccess }) {
  const [status, setStatus] = useState('idle'); // idle | sending | sent | error

  useEffect(() => {
    if (isOpen) setStatus('idle');
  }, [isOpen]);

  if (!isOpen) return null;
  const total = cartTotal(items);

  const orderSummary = items
    .map((item, idx) => `${idx + 1}) ${item.product.title} · ${item.size.label} · ${item.finish.label} · ${item.qty || 1} buc × ${item.price.toLocaleString('ro-RO')} RON = ${lineTotal(item).toLocaleString('ro-RO')} RON`)
    .join('   |   ');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');
    try {
      await sendLead(e.target, {
        _subject: 'Comandă nouă — KRAFT Metalworks',
        numar_produse: cartCount(items),
        comanda: orderSummary,
        total_estimat: `${total.toLocaleString('ro-RO')} RON`,
      });
      setStatus('sent');
    } catch (err) {
      setStatus('error');
    }
  };

  return (
    <div
      className="fixed inset-0 z-[10000] flex items-center justify-center p-4 sm:p-6"
      style={{ background: 'rgba(10,10,10,0.95)' }}
    >
      <div className="relative flex max-h-[90vh] w-full max-w-2xl flex-col overflow-hidden rounded-3xl border border-white/10 bg-[#141414] shadow-2xl">
        {/* Header */}
        <div className="flex shrink-0 items-center justify-between border-b border-white/10 px-8 py-6">
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-[#c5a059]">Finalizare</p>
            <h2 className="mt-1 text-2xl font-semibold text-[#f8f1e5]">Comandă</h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-[#f8f1e5] transition-all hover:border-[#c5a059] hover:text-[#c5a059]"
            aria-label="Închide"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Body — scrollable */}
        <div className="min-h-0 flex-1 overflow-y-auto px-8 py-6 space-y-8">
          {/* Order summary */}
          <div className="space-y-3">
            <p className="text-[10px] uppercase tracking-[0.35em] text-[#cfc5ad]/70">Sumar comandă</p>
            {items.map((item) => (
              <div key={item.cartId} className="flex items-center gap-4 rounded-2xl border border-white/8 bg-white/4 p-3">
                <img src={item.product.image} alt={item.product.title} className="h-12 w-12 shrink-0 rounded-xl object-cover" />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-[#f8f1e5]">{item.product.title}</p>
                  <p className="text-[11px] text-[#cfc5ad]/70">{item.size.label} · {item.finish.label} · {item.qty || 1} buc</p>
                </div>
                <p className="shrink-0 text-sm font-semibold text-[#c5a059]">{lineTotal(item).toLocaleString('ro-RO')} RON</p>
              </div>
            ))}
            <div className="flex items-center justify-between rounded-2xl border border-[#c5a059]/20 bg-[#c5a059]/5 px-5 py-4">
              <span className="text-sm uppercase tracking-[0.2em] text-[#cfc5ad]/70">Total estimat</span>
              <span className="text-xl font-semibold text-[#c5a059]">{total.toLocaleString('ro-RO')} RON</span>
            </div>
            <div className="grid gap-3 sm:grid-cols-3">
              {[
                ['Plată', 'Avans prin transfer bancar, după ce confirmăm comanda telefonic.'],
                ['Transport', 'Curier sau transport dedicat. Costul îl confirmăm înainte de plată.'],
                ['Termen', 'Execuție la comandă, de regulă 10 zile lucrătoare.'],
              ].map(([t, d]) => (
                <div key={t} className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                  <p className="text-[10px] uppercase tracking-[0.25em] text-[#c5a059]">{t}</p>
                  <p className="mt-2 text-xs leading-5 text-[#cfc5ad]/80">{d}</p>
                </div>
              ))}
            </div>
            {vatNote() && <p className="text-[11px] text-[#cfc5ad]/70">{vatNote()}.</p>}
          </div>

          {/* Form */}
          {status === 'sent' ? (
            <div className="rounded-2xl border border-[#c5a059]/30 bg-[#c5a059]/10 p-8 text-center">
              <p className="text-base font-semibold text-[#f8f1e5]">Comanda a fost trimisă!</p>
              <p className="mt-2 text-sm text-[#cfc5ad]/70">Echipa KRAFT confirmă disponibilitatea și termenul de execuție în 24h.</p>
              <button
                type="button"
                onClick={() => { onOrderSuccess?.(); }}
                className="mt-6 rounded-full bg-[#c5a059] px-8 py-3 text-xs uppercase tracking-[0.25em] text-[#0a0a0a] transition hover:bg-[#b79245]"
              >
                Închide
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <p className="text-[10px] uppercase tracking-[0.35em] text-[#cfc5ad]/70">Date de contact și livrare</p>
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block text-xs uppercase tracking-[0.18em] text-[#cfc5ad]">
                  Nume complet
                  <input type="text" name="nume" required placeholder="Ion Popescu" className="mt-2 w-full rounded-2xl border border-white/10 bg-[#0f0f0f] px-4 py-3 text-sm text-[#f8f1e5] outline-none transition focus:border-[#c5a059] focus:ring-2 focus:ring-[#c5a059]/20" />
                </label>
                <label className="block text-xs uppercase tracking-[0.18em] text-[#cfc5ad]">
                  Telefon
                  <input type="tel" name="telefon" required placeholder="+40 7xx xxx xxx" className="mt-2 w-full rounded-2xl border border-white/10 bg-[#0f0f0f] px-4 py-3 text-sm text-[#f8f1e5] outline-none transition focus:border-[#c5a059] focus:ring-2 focus:ring-[#c5a059]/20" />
                </label>
              </div>
              <label className="block text-xs uppercase tracking-[0.18em] text-[#cfc5ad]">
                Email
                <input type="email" name="email" required placeholder="email@exemplu.ro" className="mt-2 w-full rounded-2xl border border-white/10 bg-[#0f0f0f] px-4 py-3 text-sm text-[#f8f1e5] outline-none transition focus:border-[#c5a059] focus:ring-2 focus:ring-[#c5a059]/20" />
              </label>
              <label className="block text-xs uppercase tracking-[0.18em] text-[#cfc5ad]">
                Adresă livrare
                <input type="text" name="adresa" placeholder="Stradă, număr, oraș, județ" className="mt-2 w-full rounded-2xl border border-white/10 bg-[#0f0f0f] px-4 py-3 text-sm text-[#f8f1e5] outline-none transition focus:border-[#c5a059] focus:ring-2 focus:ring-[#c5a059]/20" />
              </label>
              <label className="block text-xs uppercase tracking-[0.18em] text-[#cfc5ad]">
                Mențiuni suplimentare (opțional)
                <textarea rows="3" name="mentiuni" placeholder="Detalii de montaj, specificații speciale..." className="mt-2 w-full rounded-2xl border border-white/10 bg-[#0f0f0f] px-4 py-3 text-sm text-[#f8f1e5] outline-none transition focus:border-[#c5a059] focus:ring-2 focus:ring-[#c5a059]/20" />
              </label>
              <label className="flex items-start gap-3 text-left text-[11px] leading-5 text-[#cfc5ad]/70">
                <input type="checkbox" name="acord_termeni" value="Da" required className="mt-0.5 h-4 w-4 shrink-0 cursor-pointer accent-[#c5a059]" />
                <span>
                  Am citit și accept{' '}
                  <a href="/termeni-si-conditii" className="text-[#c5a059] underline underline-offset-2">Termenii și condițiile</a>,{' '}
                  <a href="/politica-retur.html" className="text-[#c5a059] underline underline-offset-2">Politica de retur</a> și{' '}
                  <a href="/politica-confidentialitate" className="text-[#c5a059] underline underline-offset-2">Politica de confidențialitate</a>.
                </span>
              </label>
              <button
                type="submit"
                disabled={status === 'sending'}
                className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-[#c5a059] px-8 py-4 text-sm uppercase tracking-[0.25em] text-[#0a0a0a] transition duration-300 hover:bg-[#b79245] hover:shadow-[0_0_24px_rgba(197,160,89,0.4)] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {status === 'sending' ? 'Se trimite...' : 'Trimite Comanda'} <ArrowRight className="h-4 w-4" />
              </button>
              {status === 'error' && (
                <p className="text-center text-xs text-red-400">A apărut o eroare. Sună-ne direct la {contactInfo.phone}.</p>
              )}
              <p className="text-center text-[10px] uppercase tracking-[0.2em] text-[#cfc5ad]/70">
                Echipa KRAFT va confirma disponibilitatea și termenul de execuție în 24h
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

function NavigationOverlay({ isOpen, onClose }) {
  const serieLinks = [
    { label: 'Acasă', id: 'home' },
    { label: 'Colecție Produse în Serie', id: 'collection' },
    { label: 'Proiecte Arhitecturale', id: 'heritage' },
    { label: 'Despre Noi', id: 'story' },
  ];
  const customLinks = [
    { label: 'Proiecte Custom', id: 'proiecte-custom' },
    { label: 'Contact', id: 'contact' },
  ];
  const b2bLinks = [
    { label: 'Porți și Garduri', href: '/porti-garduri-metalice' },
    { label: 'Balustrade', href: '/balustrade-metalice' },
    { label: 'Pensiuni & HoReCa', href: '/confectii-metalice-pensiuni-horeca' },
    { label: 'Somiere de Serie', href: '/somiere-metalice-serie' },
    { label: 'Debitare Laser', href: '/debitare-laser-teava-tabla' },
    { label: 'Blog Tehnic', href: '/blog' },
  ];

  const handleNav = (id) => {
    onClose();
    const target = document.getElementById(id);
    if (!target) {
      window.location.href = `/#${id}`;
      return;
    }
    setTimeout(() => {
      target.scrollIntoView({ behavior: 'smooth' });
    }, 420);
  };

  return (
    <div
      className={`fixed inset-0 z-[9999] flex flex-col items-center menu-safe-center overflow-y-auto py-16 backdrop-blur-xl transition-opacity duration-500 ${
        isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      }`}
      style={{ background: 'rgba(10, 10, 10, 0.96)' }}
    >
      <button
        type="button"
        onClick={onClose}
        className="absolute top-6 right-6 flex h-12 w-12 items-center justify-center rounded-full border border-white/10 text-[#f8f1e5] transition-all duration-300 hover:border-[#c5a059] hover:text-[#c5a059]"
        aria-label="Închide meniu"
      >
        <X className="h-5 w-5" />
      </button>

      <h2
        className={`text-center text-4xl font-bold uppercase tracking-[0.45em] text-[#c5a059] transition-all duration-500 sm:text-5xl lg:text-6xl ${
          isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
        }`}
        style={{ transitionDelay: isOpen ? '30ms' : '0ms' }}
      >
        KRAFT METALWORKS
      </h2>

      <div
        className={`mt-6 mb-8 h-px w-24 bg-[#c5a059]/40 transition-all duration-500 ${isOpen ? 'opacity-100' : 'opacity-0'}`}
        style={{ transitionDelay: isOpen ? '60ms' : '0ms' }}
      />

      <div className="flex flex-col items-center gap-0 lg:flex-row lg:gap-20">
        <nav className="flex flex-col items-center gap-4 text-center lg:items-end lg:text-right">
          <p
            className={`mb-1 text-[10px] uppercase tracking-[0.5em] text-[#c5a059]/80 transition-all duration-500 ${isOpen ? 'opacity-100' : 'opacity-0'}`}
            style={{ transitionDelay: isOpen ? '80ms' : '0ms' }}
          >
            Serie
          </p>
          {serieLinks.map(({ label, id }, index) => (
            <button
              key={id}
              type="button"
              onClick={() => handleNav(id)}
              className={`text-2xl font-semibold uppercase tracking-[0.18em] text-[#f8f1e5] transition-all duration-500 hover:text-[#c5a059] hover:tracking-[0.28em] sm:text-3xl lg:text-4xl ${
                isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              }`}
              style={{ transitionDelay: isOpen ? `${100 + index * 60}ms` : '0ms' }}
            >
              {label}
            </button>
          ))}
        </nav>

        <div
          className={`hidden lg:block h-44 w-px bg-[#c5a059]/20 transition-all duration-500 ${isOpen ? 'opacity-100' : 'opacity-0'}`}
          style={{ transitionDelay: isOpen ? '120ms' : '0ms' }}
        />
        <div
          className={`my-5 h-px w-16 bg-[#c5a059]/20 lg:hidden transition-all duration-500 ${isOpen ? 'opacity-100' : 'opacity-0'}`}
          style={{ transitionDelay: isOpen ? '120ms' : '0ms' }}
        />

        <nav className="flex flex-col items-center gap-4 text-center lg:items-start lg:text-left">
          <p
            className={`mb-1 text-[10px] uppercase tracking-[0.5em] text-[#c5a059]/80 transition-all duration-500 ${isOpen ? 'opacity-100' : 'opacity-0'}`}
            style={{ transitionDelay: isOpen ? '140ms' : '0ms' }}
          >
            Custom
          </p>
          {customLinks.map(({ label, id }, index) => (
            <button
              key={id}
              type="button"
              onClick={() => handleNav(id)}
              className={`text-2xl font-semibold uppercase tracking-[0.18em] text-[#f8f1e5] transition-all duration-500 hover:text-[#c5a059] hover:tracking-[0.28em] sm:text-3xl lg:text-4xl ${
                isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              }`}
              style={{ transitionDelay: isOpen ? `${360 + index * 60}ms` : '0ms' }}
            >
              {label}
            </button>
          ))}
          <p
            className={`mb-1 mt-6 text-[10px] uppercase tracking-[0.5em] text-[#c5a059]/80 transition-all duration-500 ${isOpen ? 'opacity-100' : 'opacity-0'}`}
            style={{ transitionDelay: isOpen ? '440ms' : '0ms' }}
          >
            Servicii
          </p>
          {b2bLinks.map(({ label, href }, index) => (
            <a
              key={href}
              href={href}
              className={`text-2xl font-semibold uppercase tracking-[0.18em] text-[#f8f1e5] transition-all duration-500 hover:text-[#c5a059] hover:tracking-[0.28em] sm:text-3xl lg:text-4xl ${
                isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              }`}
              style={{ transitionDelay: isOpen ? `${480 + index * 60}ms` : '0ms' }}
            >
              {label}
            </a>
          ))}
        </nav>
      </div>

      <div className="mt-10 h-px w-16 bg-[#c5a059]/30" />
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────

export function vatNote() {
  if (company.vatPayer === true) return 'Prețurile includ TVA';
  if (company.vatPayer === false) return 'Firmă neplătitoare de TVA';
  return 'Prețuri confirmate înainte de execuție';
}

// ── Cerere de cotație rapidă (din butonul fix „Cere Cotație") ──────────────
function QuoteOverlay({ isOpen, onClose, preset }) {
  const [status, setStatus] = useState('idle');

  useEffect(() => {
    if (isOpen) setStatus('idle');
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');
    try {
      await sendLead(e.target, { _subject: preset?.subject || 'Cerere Cotație (fișier tehnic) — KRAFT Metalworks' });
      setStatus('sent');
      e.target.reset();
    } catch {
      setStatus('error');
    }
  };

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-start justify-center overflow-y-auto p-4 sm:items-center sm:p-6"
      style={{ background: 'rgba(10,10,10,0.92)' }}
      onClick={onClose}
    >
      <div className="relative my-auto w-full max-w-lg rounded-3xl border border-white/10 bg-[#141414] p-8 shadow-2xl" onClick={(e) => e.stopPropagation()}>
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-[#f8f1e5] transition-all hover:border-[#c5a059] hover:text-[#c5a059]"
          aria-label="Închide"
        >
          <X className="h-4 w-4" />
        </button>
        <p className="mb-1 text-xs uppercase tracking-[0.35em] text-[#c5a059]">Cotație în 24h</p>
        <h3 className="mb-2 text-2xl font-semibold text-[#f8f1e5]">Trimite schița sau fișierul tehnic</h3>
        <p className="mb-6 text-sm leading-6 text-[#cfc5ad]/70">
          DXF, DWG, STEP sau o poză după schiță. Răspundem cu preț și termen în cel mult 24 de ore lucrătoare.
        </p>
        {status === 'sent' ? (
          <div className="rounded-2xl border border-[#c5a059]/30 bg-[#c5a059]/10 p-6 text-center">
            <p className="text-sm font-semibold text-[#f8f1e5]">Cererea a fost trimisă!</p>
            <p className="mt-2 text-xs text-[#cfc5ad]/70">Revenim cu oferta în cel mult 24 de ore lucrătoare.</p>
            <button type="button" onClick={onClose} className="mt-5 rounded-full bg-[#c5a059] px-6 py-2.5 text-xs uppercase tracking-[0.2em] text-[#0a0a0a] transition hover:bg-[#b79245]">
              Închide
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <label className={labelClass}>
                Nume / Firmă
                <input type="text" name="nume" required placeholder="Ion Popescu / Firma SRL" className={inputClass} />
              </label>
              <label className={labelClass}>
                Telefon
                <input type="tel" name="telefon" required placeholder="+40 7xx xxx xxx" className={inputClass} />
              </label>
            </div>
            <label className={labelClass}>
              Email
              <input type="email" name="email" placeholder="email@exemplu.ro" className={inputClass} />
            </label>
            <label className={labelClass}>
              Ce ai nevoie
              <textarea rows="3" name="detalii" defaultValue={preset?.details || ''} placeholder="Material, grosime, cantitate, termen dorit..." className="mt-2 w-full rounded-[1.5rem] border border-white/10 bg-[#0f0f0f] px-4 py-3.5 text-sm text-[#f8f1e5] outline-none transition focus:border-[#c5a059] focus:ring-2 focus:ring-[#c5a059]/20" />
            </label>
            <DropZone title="Trage fișierul .DXF / .DWG / .PDF aici" />
            <GdprConsent />
            <button type="submit" disabled={status === 'sending'} className={primaryButtonClass}>
              {status === 'sending' ? 'Se trimite...' : 'Cere Cotația'} <ArrowRight className="h-4 w-4" />
            </button>
            {status === 'error' && (
              <p className="text-center text-xs text-red-400">Cererea nu a plecat. Sună-ne la {contact.phone} sau scrie-ne pe WhatsApp.</p>
            )}
          </form>
        )}
      </div>
    </div>
  );
}

// ── Butoane fixe: WhatsApp · Apel · Cotație (toate paginile) ───────────────
function FloatingContact({ onQuote }) {
  return (
    <>
      {/* Mobil: bară fixă jos */}
      <div className="fixed inset-x-0 bottom-0 z-[60] grid grid-cols-3 border-t border-white/10 bg-[#0a0a0a]/95 backdrop-blur-xl md:hidden" style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}>
        <a href={whatsappLink()} onClick={() => track('contact', { method: 'whatsapp' })} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center justify-center gap-1 py-2.5 text-[9px] uppercase tracking-[0.15em] text-[#f8f1e5]">
          <MessageCircle className="h-5 w-5 text-[#25D366]" /> WhatsApp
        </a>
        <a href={telLink()} onClick={() => track('contact', { method: 'phone' })} className="flex flex-col items-center justify-center gap-1 border-x border-white/10 py-2.5 text-[9px] uppercase tracking-[0.15em] text-[#f8f1e5]">
          <Phone className="h-5 w-5 text-[#c5a059]" /> Sună acum
        </a>
        <button type="button" onClick={onQuote} className="flex flex-col items-center justify-center gap-1 bg-[#c5a059] py-2.5 text-[9px] font-semibold uppercase tracking-[0.15em] text-[#0a0a0a]">
          <FileUp className="h-5 w-5" /> Cere Cotație
        </button>
      </div>

      {/* Desktop: rând compact fix dreapta-jos */}
      <div className="fixed bottom-6 right-6 z-[60] hidden items-center gap-2 md:flex">
        <a href={whatsappLink()} onClick={() => track('contact', { method: 'whatsapp' })} target="_blank" rel="noopener noreferrer" title="Discută pe WhatsApp" aria-label="Discută pe WhatsApp" className="flex h-12 w-12 items-center justify-center rounded-full border border-white/15 bg-[#111]/90 shadow-luxe backdrop-blur-md transition hover:border-[#25D366]/60">
          <MessageCircle className="h-5 w-5 text-[#25D366]" />
        </a>
        <a href={telLink()} onClick={() => track('contact', { method: 'phone' })} title={`Sună: ${contact.phone}`} aria-label={`Sună la ${contact.phone}`} className="flex h-12 w-12 items-center justify-center rounded-full border border-white/15 bg-[#111]/90 shadow-luxe backdrop-blur-md transition hover:border-[#c5a059]/60">
          <Phone className="h-5 w-5 text-[#c5a059]" />
        </a>
        <button type="button" onClick={onQuote} className="inline-flex h-12 items-center gap-2 rounded-full bg-[#c5a059] px-5 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#0a0a0a] shadow-luxe transition hover:bg-[#b79245] hover:shadow-[0_0_24px_rgba(197,160,89,0.4)]">
          <FileUp className="h-4 w-4" /> Cere Cotație
        </button>
      </div>
    </>
  );
}

// ── Header (identic vizual cu cel original) ─────────────────────────────────
function SiteHeader({ isScrolled, headerVisible, count, onOpenMenu, onOpenCart }) {
  const goHome = () => {
    if (window.location.pathname === '/') window.scrollTo({ top: 0, behavior: 'smooth' });
    else window.location.href = '/';
  };
  const goCustom = (e) => {
    const target = document.getElementById('proiecte-custom');
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const CartButton = ({ size }) => (
    <button
      type="button"
      onClick={onOpenCart}
      className={`relative flex ${size === 'lg' ? 'h-11 w-11 border-white/15' : 'h-9 w-9 border-white/10'} items-center justify-center rounded-full border text-[#d8ccb6] transition-all duration-300 hover:border-[#c5a059] hover:text-[#c5a059]`}
      aria-label="Coș cumpărături"
    >
      <ShoppingCart className={size === 'lg' ? 'h-5 w-5' : 'h-4 w-4'} />
      {count > 0 && (
        <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#c5a059] text-[9px] font-bold text-[#0a0a0a]">
          {count}
        </span>
      )}
    </button>
  );

  return (
    <header
      className={`fixed left-0 right-0 top-0 z-50 w-full transition-all duration-300 ${
        headerVisible ? 'translate-y-0' : '-translate-y-full'
      } ${isScrolled ? 'backdrop-blur-xl bg-black/80 shadow-black/30 shadow-xl' : 'bg-transparent'}`}
    >
      {/* ── Mobile: hamburger · logo · cart ── */}
      <div className="grid grid-cols-[1fr_auto_1fr] items-center px-4 py-3 md:hidden">
        <button
          type="button"
          onClick={onOpenMenu}
          className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-[#d8ccb6] transition-all duration-300 hover:border-[#c5a059] hover:text-[#c5a059]"
          aria-label="Deschide meniu"
        >
          <Menu className="h-5 w-5" />
        </button>
        <button type="button" onClick={goHome} className="border-0 bg-transparent p-0" aria-label="KRAFT Metalworks — pagina principală">
          <img src={logo1} alt="KRAFT METALWORKS" width="140" height="56" className="h-14 w-auto object-contain" />
        </button>
        <div className="flex justify-end">
          <CartButton size="lg" />
        </div>
      </div>

      {/* ── Desktop: logo · nav + cart ── */}
      <div className="mx-auto hidden max-w-7xl items-center justify-between px-5 py-4 md:flex lg:px-8">
        <button type="button" onClick={onOpenMenu} className="cursor-pointer border-0 bg-transparent p-0" aria-label="Deschide meniu navigare">
          <img src={logo1} alt="KRAFT METALWORKS" width="200" height="80" className="h-20 w-auto object-contain" />
        </button>
        <nav className="flex items-center gap-8 text-sm uppercase text-[#d8ccb6]">
          <a href="/#collection" className="tracking-[0.35em] transition duration-300 hover:text-[#c5a059]">Colecție Produse în Serie</a>
          <a href="/#heritage" className="tracking-[0.35em] transition duration-300 hover:text-[#c5a059]">Proiecte Arhitecturale</a>
          <a href="/#story" className="tracking-[0.35em] transition duration-300 hover:text-[#c5a059]">Despre Noi</a>
          <a href="/#proiecte-custom" onClick={goCustom} className="tracking-[0.35em] transition duration-300 hover:text-[#c5a059]">Proiecte Custom</a>
          <a href="/#contact" className="tracking-[0.35em] transition duration-300 hover:text-[#c5a059]">Contact</a>
          <CartButton size="sm" />
        </nav>
      </div>
    </header>
  );
}

// ── Footer (original + date firmă, pagini B2B și legale, ANPC) ──────────────
function SiteFooter() {
  const legalBits = [
    company.legalName,
    company.cui && `CUI ${company.cui}`,
    company.regCom && `Reg. Com. ${company.regCom}`,
    companyAddressLine(),
  ].filter(Boolean);

  const linkClass = 'text-sm text-[#cfc5ad]/70 transition-colors hover:text-[#c5a059]';

  return (
    <footer className="border-t border-white/10 bg-[#0a0a0a] px-6 pb-28 pt-10 md:pb-10 lg:px-8">
      <div className="mx-auto max-w-7xl flex flex-col items-center gap-5 text-center sm:flex-row sm:justify-between sm:text-left">
        <p className="text-sm text-[#b8ab95]">© {new Date().getFullYear()} KRAFT METALWORKS · Fabricat în România · Calitate Industrială Fără Compromis</p>
        <div className="flex flex-col items-center gap-3 sm:flex-row sm:gap-6">
          <a href={telLink(contactInfo.phone)} className="text-sm font-bold text-[#c5a059] transition-colors hover:text-[#e2bc77]">
            {contactInfo.phone}
          </a>
          <span className="hidden text-[#b8ab95]/30 sm:inline">|</span>
          <a href={telLink(contactInfo.phone2)} className="text-sm font-bold text-[#c5a059] transition-colors hover:text-[#e2bc77]">
            {contactInfo.phone2}
          </a>
          <span className="hidden text-[#b8ab95]/30 sm:inline">|</span>
          <a href={`mailto:${contactInfo.email}`} className="text-sm font-bold text-[#c5a059] transition-colors hover:text-[#e2bc77]">
            {contactInfo.email}
          </a>
        </div>
      </div>

      <div className="mx-auto mt-8 grid max-w-7xl gap-8 border-t border-white/5 pt-8 text-center sm:grid-cols-3 sm:text-left">
        <div className="space-y-2">
          <p className="mb-3 text-[10px] uppercase tracking-[0.35em] text-[#c5a059]/90">Servicii B2B</p>
          <a href="/somiere-metalice-serie" className={`block ${linkClass}`}>Cadre metalice somiere — producție de serie</a>
          <a href="/debitare-laser-teava-tabla" className={`block ${linkClass}`}>Debitare laser țeavă și tablă</a>
          <a href="/porti-garduri-metalice" className={`block ${linkClass}`}>Porți și garduri metalice</a>
          <a href="/balustrade-metalice" className={`block ${linkClass}`}>Balustrade metalice</a>
          <a href="/confectii-metalice-pensiuni-horeca" className={`block ${linkClass}`}>Pensiuni și HoReCa</a>
        </div>
        <div className="space-y-2">
          <p className="mb-3 text-[10px] uppercase tracking-[0.35em] text-[#c5a059]/90">Resurse</p>
          <a href="/picioare-masa-metalice" className={`block ${linkClass}`}>Picioare de masă metalice</a>
          <a href="/blog" className={`block ${linkClass}`}>Blog tehnic</a>
          <a href="/confectii-metalice-maramures" className={`block ${linkClass}`}>Confecții metalice Maramureș</a>
          <a href="/confectii-metalice-cluj-napoca" className={`block ${linkClass}`}>Confecții metalice Cluj-Napoca</a>
          <a href="/#contact" className={`block ${linkClass}`}>Contact · {contactInfo.schedule}</a>
        </div>
        <div className="space-y-2">
          <p className="mb-3 text-[10px] uppercase tracking-[0.35em] text-[#c5a059]/90">Informații legale</p>
          <a href="/termeni-si-conditii" className={`block ${linkClass}`}>Termeni și condiții</a>
          <a href="/politica-retur.html" className={`block ${linkClass}`}>Politica de retur</a>
          <a href="/politica-confidentialitate" className={`block ${linkClass}`}>Politica de confidențialitate</a>
          <a href="https://anpc.ro/ce-este-sal/" target="_blank" rel="noopener noreferrer" className={`block ${linkClass}`}>ANPC — Soluționarea alternativă a litigiilor (SAL)</a>
        </div>
      </div>

      {legalBits.length > 0 && (
        <p className="mx-auto mt-8 max-w-7xl text-center text-[11px] text-[#cfc5ad]/70 sm:text-left">{legalBits.join(' · ')}</p>
      )}
    </footer>
  );
}

// ── Banner cookie-uri: apare doar dacă ai configurat GA4 / Ads / Pixel ─────
function ConsentBanner() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    if (!trackingEnabled()) return;
    let choice = null;
    try { choice = window.localStorage.getItem(CONSENT_KEY); } catch { /* ignorăm */ }
    if (choice === 'granted') loadTracking();
    else if (!choice) setVisible(true);
  }, []);
  if (!visible) return null;
  const decide = (value) => {
    try { window.localStorage.setItem(CONSENT_KEY, value); } catch { /* ignorăm */ }
    if (value === 'granted') loadTracking();
    setVisible(false);
  };
  return (
    <div role="dialog" aria-label="Cookie-uri" className="fixed inset-x-3 bottom-20 z-[70] rounded-3xl border border-white/10 bg-[#141414]/95 p-5 shadow-2xl backdrop-blur-xl md:bottom-24 md:left-6 md:right-auto md:max-w-md">
      <p className="text-sm leading-6 text-[#cfc5ad]">
        Folosim cookie-uri de analiză și marketing doar cu acordul tău, ca să vedem ce funcționează pe site.{' '}
        <a href="/politica-confidentialitate" className="text-[#c5a059] underline underline-offset-2">Detalii</a>
      </p>
      <div className="mt-4 flex gap-3">
        <button type="button" onClick={() => decide('denied')} className="flex-1 rounded-full border border-white/15 px-4 py-2.5 text-[11px] uppercase tracking-[0.2em] text-[#f8f1e5] transition hover:border-[#c5a059]/60">Refuz</button>
        <button type="button" onClick={() => decide('granted')} className="flex-1 rounded-full bg-[#c5a059] px-4 py-2.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#0a0a0a] transition hover:bg-[#b79245]">Accept</button>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// SiteShell — tot ce e comun tuturor paginilor: header, meniu, coș (salvat în
// browser), checkout, cereri de ofertă, butoane fixe de contact, footer.
// ─────────────────────────────────────────────────────────────────────────────

const ShopContext = createContext({
  addToCart: () => {},
  requestQuote: () => {},
  openQuote: () => {},
});
export const useShop = () => useContext(ShopContext);

const CART_KEY = 'kraft-cart-v1';

export function SiteShell({ children }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [headerVisible, setHeaderVisible] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [cartLoaded, setCartLoaded] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [customRequestProduct, setCustomRequestProduct] = useState(null);
  const [quote, setQuote] = useState(null); // null = închis · {} = deschis

  // Coș salvat în browser — nu se mai pierde la refresh sau între pagini.
  useEffect(() => {
    try {
      const saved = JSON.parse(window.localStorage.getItem(CART_KEY) || '[]');
      if (Array.isArray(saved)) setCartItems(saved);
    } catch { /* coș gol */ }
    setCartLoaded(true);
    const params = new URLSearchParams(window.location.search);
    if (params.get('cos') === '1') setCartOpen(true);
  }, []);
  useEffect(() => {
    if (!cartLoaded) return;
    try { window.localStorage.setItem(CART_KEY, JSON.stringify(cartItems)); } catch { /* ignorăm */ }
  }, [cartItems, cartLoaded]);

  useEffect(() => {
    let lastY = 0;
    const handleScroll = () => {
      const currentY = window.scrollY;
      setIsScrolled(currentY > 20);
      if (currentY <= 0) setHeaderVisible(true);
      else if (currentY > lastY + 5) setHeaderVisible(false);
      else if (currentY < lastY) setHeaderVisible(true);
      lastY = currentY;
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const addToCart = useCallback((item) => {
    track('add_to_cart', { name: item.product.title, value: item.price * (item.qty || 1) });
    setCartItems((prev) => {
      const key = `${item.product.id}|${item.size.label}|${item.finish.label}`;
      const existing = prev.find((i) => `${i.product.id}|${i.size.label}|${i.finish.label}` === key);
      if (existing) {
        return prev.map((i) => (i === existing ? { ...i, qty: (i.qty || 1) + (item.qty || 1) } : i));
      }
      // În coș păstrăm doar ce trebuie (fără descrieri lungi).
      const product = { id: item.product.id, title: item.product.title, image: item.product.image || item.product.imgRender, category: item.product.category };
      return [...prev, { product, size: item.size, finish: item.finish, price: item.price, qty: item.qty || 1, cartId: Date.now() + Math.random() }];
    });
    setCartOpen(true);
  }, []);

  const removeFromCart = (cartId) => setCartItems((prev) => prev.filter((i) => i.cartId !== cartId));
  const setQty = (cartId, qty) =>
    setCartItems((prev) => (qty < 1 ? prev.filter((i) => i.cartId !== cartId) : prev.map((i) => (i.cartId === cartId ? { ...i, qty: Math.min(qty, 99) } : i))));

  const shop = {
    addToCart,
    requestQuote: setCustomRequestProduct,
    openQuote: (preset = {}) => setQuote(preset),
  };

  return (
    <ShopContext.Provider value={shop}>
      <div className="min-h-screen overflow-x-hidden bg-[#0a0a0a] text-[#f8f1e5] antialiased">
        <NavigationOverlay isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
        <CartSidebar
          isOpen={cartOpen}
          items={cartItems}
          onClose={() => setCartOpen(false)}
          onRemove={removeFromCart}
          onQty={setQty}
          onCheckout={() => { setCartOpen(false); setCheckoutOpen(true); }}
        />
        <CheckoutOverlay
          isOpen={checkoutOpen}
          items={cartItems}
          onClose={() => setCheckoutOpen(false)}
          onOrderSuccess={() => { setCartItems([]); setCheckoutOpen(false); }}
        />
        <CustomRequestOverlay product={customRequestProduct} onClose={() => setCustomRequestProduct(null)} />
        <QuoteOverlay isOpen={quote !== null} preset={quote} onClose={() => setQuote(null)} />

        <SiteHeader
          isScrolled={isScrolled}
          headerVisible={headerVisible}
          count={cartCount(cartItems)}
          onOpenMenu={() => setIsMenuOpen(true)}
          onOpenCart={() => setCartOpen(true)}
        />

        <main className="pt-20 md:pt-28">{children}</main>

        <SiteFooter />
        <FloatingContact onQuote={() => setQuote({})} />
        <ConsentBanner />
      </div>
    </ShopContext.Provider>
  );
}
