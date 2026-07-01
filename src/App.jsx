import { useEffect, useRef, useState } from 'react';
import { ArrowRight, Shield, Sparkles, Mail, ChevronRight, Menu, X, ShoppingCart, Trash2, Upload } from 'lucide-react';
import heroBG from './assets/imagine hero 1.jpeg';
import logo1 from './assets/logo 1.png';
import proiectArhitectural from './assets/proiect_arhitectural.jpg';
import { contactInfo } from './productsData.js';
import { CatalogShowroom } from './CatalogShowroom.jsx';



function CartSidebar({ isOpen, items, onClose, onRemove, onCheckout }) {
  const total = items.reduce((sum, item) => sum + item.price, 0);

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
                {items.length}
              </span>
            )}
          </div>
          <button
            type="button"
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-[#f8f1e5] transition-all hover:border-[#c5a059] hover:text-[#c5a059]"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto px-6 py-4 space-y-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <ShoppingCart className="mb-4 h-10 w-10 text-[#cfc5ad]/30" />
              <p className="text-sm uppercase tracking-[0.25em] text-[#cfc5ad]/40">Coșul este gol</p>
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
                  <p className="text-[11px] text-[#cfc5ad]/60">{item.size.label}</p>
                  <p className="text-[11px] text-[#cfc5ad]/60">{item.finish.label}</p>
                  <p className="text-sm font-semibold text-[#c5a059]">{item.price.toLocaleString('ro-RO')} RON</p>
                </div>
                <button
                  type="button"
                  onClick={() => onRemove(item.cartId)}
                  className="shrink-0 self-start text-[#cfc5ad]/40 transition-colors hover:text-red-400"
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
              <span className="text-sm uppercase tracking-[0.2em] text-[#cfc5ad]/60">Total estimat</span>
              <span className="text-xl font-semibold text-[#f8f1e5]">{total.toLocaleString('ro-RO')} RON</span>
            </div>
            <button
              type="button"
              onClick={onCheckout}
              className="flex w-full items-center justify-center gap-2 rounded-full bg-[#c5a059] px-6 py-3.5 text-sm uppercase tracking-[0.25em] text-[#0a0a0a] transition-all duration-300 hover:bg-[#b79245] hover:shadow-[0_0_24px_rgba(197,160,89,0.4)]"
            >
              Finalizare Comandă <ArrowRight className="h-4 w-4" />
            </button>
            <p className="text-center text-[10px] uppercase tracking-[0.2em] text-[#cfc5ad]/40">
              Prețuri orientative · confirmăm înainte de execuție
            </p>
          </div>
        )}
      </div>
    </>
  );
}

function CustomRequestOverlay({ product, onClose }) {
  if (!product) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center p-6"
      style={{ background: 'rgba(10,10,10,0.92)' }}
    >
      <div className="relative w-full max-w-lg rounded-3xl border border-white/10 bg-[#141414] p-8 shadow-2xl">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-[#f8f1e5] transition-all hover:border-[#c5a059] hover:text-[#c5a059]"
        >
          <X className="h-4 w-4" />
        </button>

        <p className="mb-1 text-xs uppercase tracking-[0.35em] text-[#c5a059]">Cerere Personalizată</p>
        <h3 className="mb-6 text-2xl font-semibold text-[#f8f1e5]">{product.title}</h3>

        <form onSubmit={(e) => { e.preventDefault(); onClose(); }} className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block text-xs uppercase tracking-[0.18em] text-[#cfc5ad]">
              Nume
              <input
                type="text"
                placeholder="Numele complet"
                className="mt-2 w-full rounded-2xl border border-white/10 bg-[#0f0f0f] px-4 py-3 text-sm text-[#f8f1e5] outline-none transition focus:border-[#c5a059] focus:ring-2 focus:ring-[#c5a059]/20"
              />
            </label>
            <label className="block text-xs uppercase tracking-[0.18em] text-[#cfc5ad]">
              Telefon
              <input
                type="tel"
                placeholder="+40 7xx xxx xxx"
                className="mt-2 w-full rounded-2xl border border-white/10 bg-[#0f0f0f] px-4 py-3 text-sm text-[#f8f1e5] outline-none transition focus:border-[#c5a059] focus:ring-2 focus:ring-[#c5a059]/20"
              />
            </label>
          </div>
          <label className="block text-xs uppercase tracking-[0.18em] text-[#cfc5ad]">
            Email
            <input
              type="email"
              placeholder="email@exemplu.ro"
              className="mt-2 w-full rounded-2xl border border-white/10 bg-[#0f0f0f] px-4 py-3 text-sm text-[#f8f1e5] outline-none transition focus:border-[#c5a059] focus:ring-2 focus:ring-[#c5a059]/20"
            />
          </label>
          <label className="block text-xs uppercase tracking-[0.18em] text-[#cfc5ad]">
            Dimensiuni dorite
            <input
              type="text"
              placeholder="ex: 120×80 cm, grosime 8 mm..."
              className="mt-2 w-full rounded-2xl border border-white/10 bg-[#0f0f0f] px-4 py-3 text-sm text-[#f8f1e5] outline-none transition focus:border-[#c5a059] focus:ring-2 focus:ring-[#c5a059]/20"
            />
          </label>
          <label className="block text-xs uppercase tracking-[0.18em] text-[#cfc5ad]">
            Detalii suplimentare
            <textarea
              rows="3"
              placeholder="Alte cerințe tehnice sau estetice..."
              className="mt-2 w-full rounded-2xl border border-white/10 bg-[#0f0f0f] px-4 py-3 text-sm text-[#f8f1e5] outline-none transition focus:border-[#c5a059] focus:ring-2 focus:ring-[#c5a059]/20"
            />
          </label>
          <button
            type="submit"
            className="w-full rounded-full bg-[#c5a059] py-3.5 text-sm uppercase tracking-[0.25em] text-[#0a0a0a] transition-all duration-300 hover:bg-[#b79245]"
          >
            Trimite Cererea
          </button>
        </form>
      </div>
    </div>
  );
}

function CheckoutOverlay({ isOpen, items, onClose }) {
  if (!isOpen) return null;
  const total = items.reduce((sum, item) => sum + item.price, 0);

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
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Body — scrollable */}
        <div className="min-h-0 flex-1 overflow-y-auto px-8 py-6 space-y-8">
          {/* Order summary */}
          <div className="space-y-3">
            <p className="text-[10px] uppercase tracking-[0.35em] text-[#cfc5ad]/50">Sumar comandă</p>
            {items.map((item) => (
              <div key={item.cartId} className="flex items-center gap-4 rounded-2xl border border-white/8 bg-white/4 p-3">
                <img src={item.product.image} alt={item.product.title} className="h-12 w-12 shrink-0 rounded-xl object-cover" />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-[#f8f1e5]">{item.product.title}</p>
                  <p className="text-[11px] text-[#cfc5ad]/60">{item.size.label} · {item.finish.label}</p>
                </div>
                <p className="shrink-0 text-sm font-semibold text-[#c5a059]">{item.price.toLocaleString('ro-RO')} RON</p>
              </div>
            ))}
            <div className="flex items-center justify-between rounded-2xl border border-[#c5a059]/20 bg-[#c5a059]/5 px-5 py-4">
              <span className="text-sm uppercase tracking-[0.2em] text-[#cfc5ad]/70">Total estimat</span>
              <span className="text-xl font-semibold text-[#c5a059]">{total.toLocaleString('ro-RO')} RON</span>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={(e) => { e.preventDefault(); onClose(); }} className="space-y-4">
            <p className="text-[10px] uppercase tracking-[0.35em] text-[#cfc5ad]/50">Date de contact și livrare</p>
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block text-xs uppercase tracking-[0.18em] text-[#cfc5ad]">
                Nume complet
                <input type="text" required placeholder="Ion Popescu" className="mt-2 w-full rounded-2xl border border-white/10 bg-[#0f0f0f] px-4 py-3 text-sm text-[#f8f1e5] outline-none transition focus:border-[#c5a059] focus:ring-2 focus:ring-[#c5a059]/20" />
              </label>
              <label className="block text-xs uppercase tracking-[0.18em] text-[#cfc5ad]">
                Telefon
                <input type="tel" required placeholder="+40 7xx xxx xxx" className="mt-2 w-full rounded-2xl border border-white/10 bg-[#0f0f0f] px-4 py-3 text-sm text-[#f8f1e5] outline-none transition focus:border-[#c5a059] focus:ring-2 focus:ring-[#c5a059]/20" />
              </label>
            </div>
            <label className="block text-xs uppercase tracking-[0.18em] text-[#cfc5ad]">
              Email
              <input type="email" required placeholder="email@exemplu.ro" className="mt-2 w-full rounded-2xl border border-white/10 bg-[#0f0f0f] px-4 py-3 text-sm text-[#f8f1e5] outline-none transition focus:border-[#c5a059] focus:ring-2 focus:ring-[#c5a059]/20" />
            </label>
            <label className="block text-xs uppercase tracking-[0.18em] text-[#cfc5ad]">
              Adresă livrare
              <input type="text" placeholder="Stradă, număr, oraș, județ" className="mt-2 w-full rounded-2xl border border-white/10 bg-[#0f0f0f] px-4 py-3 text-sm text-[#f8f1e5] outline-none transition focus:border-[#c5a059] focus:ring-2 focus:ring-[#c5a059]/20" />
            </label>
            <label className="block text-xs uppercase tracking-[0.18em] text-[#cfc5ad]">
              Mențiuni suplimentare (opțional)
              <textarea rows="3" placeholder="Detalii de montaj, specificații speciale..." className="mt-2 w-full rounded-2xl border border-white/10 bg-[#0f0f0f] px-4 py-3 text-sm text-[#f8f1e5] outline-none transition focus:border-[#c5a059] focus:ring-2 focus:ring-[#c5a059]/20" />
            </label>
            <button
              type="submit"
              className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-[#c5a059] px-8 py-4 text-sm uppercase tracking-[0.25em] text-[#0a0a0a] transition duration-300 hover:bg-[#b79245] hover:shadow-[0_0_24px_rgba(197,160,89,0.4)]"
            >
              Confirmă Comanda <ArrowRight className="h-4 w-4" />
            </button>
            <p className="text-center text-[10px] uppercase tracking-[0.2em] text-[#cfc5ad]/40">
              Echipa KRAFT va confirma disponibilitatea și termenul de execuție în 24h
            </p>
          </form>
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

  const handleNav = (id) => {
    onClose();
    setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    }, 420);
  };

  return (
    <div
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center overflow-y-auto py-16 backdrop-blur-xl transition-opacity duration-500 ${
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
            className={`mb-1 text-[10px] uppercase tracking-[0.5em] text-[#c5a059]/50 transition-all duration-500 ${isOpen ? 'opacity-100' : 'opacity-0'}`}
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
            className={`mb-1 text-[10px] uppercase tracking-[0.5em] text-[#c5a059]/50 transition-all duration-500 ${isOpen ? 'opacity-100' : 'opacity-0'}`}
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
        </nav>
      </div>

      <div className="mt-10 h-px w-16 bg-[#c5a059]/30" />
    </div>
  );
}

function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [headerVisible, setHeaderVisible] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [customRequestProduct, setCustomRequestProduct] = useState(null);
  const lastScrollYRef = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      setIsScrolled(currentY > 20);
      if (currentY <= 0) {
        setHeaderVisible(true);
      } else if (currentY > lastScrollYRef.current + 5) {
        setHeaderVisible(false);
      } else if (currentY < lastScrollYRef.current) {
        setHeaderVisible(true);
      }
      lastScrollYRef.current = currentY;
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id) => (e) => {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const addToCart = (item) => {
    setCartItems((prev) => [...prev, { ...item, cartId: Date.now() + Math.random() }]);
    setCartOpen(true);
  };

  const removeFromCart = (cartId) => {
    setCartItems((prev) => prev.filter((item) => item.cartId !== cartId));
  };


  return (
    <div className="min-h-screen overflow-x-hidden bg-[#0a0a0a] text-[#f8f1e5] antialiased">
      <NavigationOverlay isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
      <CartSidebar
        isOpen={cartOpen}
        items={cartItems}
        onClose={() => setCartOpen(false)}
        onRemove={removeFromCart}
        onCheckout={() => { setCartOpen(false); setCheckoutOpen(true); }}
      />
      <CheckoutOverlay isOpen={checkoutOpen} items={cartItems} onClose={() => setCheckoutOpen(false)} />
      <CustomRequestOverlay product={customRequestProduct} onClose={() => setCustomRequestProduct(null)} />

      <header
        className={`fixed left-0 right-0 top-0 z-50 w-full transition-all duration-300 ${
          headerVisible ? 'translate-y-0' : '-translate-y-full'
        } ${isScrolled ? 'backdrop-blur-xl bg-black/80 shadow-black/30 shadow-xl' : 'bg-transparent'}`}
      >
        {/* ── Mobile: hamburger · logo · cart ── */}
        <div className="grid grid-cols-[1fr_auto_1fr] items-center px-4 py-3 md:hidden">
          <button
            type="button"
            onClick={() => setIsMenuOpen(true)}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-[#d8ccb6] transition-all duration-300 hover:border-[#c5a059] hover:text-[#c5a059]"
            aria-label="Deschide meniu"
          >
            <Menu className="h-5 w-5" />
          </button>

          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="border-0 bg-transparent p-0"
            aria-label="Scroll la începutul paginii"
          >
            <img src={logo1} alt="KRAFT METALWORKS" className="h-14 w-auto object-contain" />
          </button>

          <div className="flex justify-end">
            <button
              type="button"
              onClick={() => setCartOpen(true)}
              className="relative flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-[#d8ccb6] transition-all duration-300 hover:border-[#c5a059] hover:text-[#c5a059]"
              aria-label="Coș cumpărături"
            >
              <ShoppingCart className="h-5 w-5" />
              {cartItems.length > 0 && (
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#c5a059] text-[9px] font-bold text-[#0a0a0a]">
                  {cartItems.length}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* ── Desktop: logo · nav + cart ── */}
        <div className="mx-auto hidden max-w-7xl items-center justify-between px-5 py-4 md:flex lg:px-8">
          <button
            type="button"
            onClick={() => setIsMenuOpen(true)}
            className="cursor-pointer border-0 bg-transparent p-0"
            aria-label="Deschide meniu navigare"
          >
            <img src={logo1} alt="KRAFT METALWORKS" className="h-20 w-auto object-contain" />
          </button>
          <nav className="flex items-center gap-8 text-sm uppercase text-[#d8ccb6]">
            <a href="#collection" className="tracking-[0.35em] transition duration-300 hover:text-[#c5a059]">Colecție Produse în Serie</a>
            <a href="#heritage" className="tracking-[0.35em] transition duration-300 hover:text-[#c5a059]">Proiecte Arhitecturale</a>
            <a href="#story" className="tracking-[0.35em] transition duration-300 hover:text-[#c5a059]">Despre Noi</a>
            <a href="#proiecte-custom" onClick={scrollTo('proiecte-custom')} className="tracking-[0.35em] transition duration-300 hover:text-[#c5a059]">Proiecte Custom</a>
            <a href="#contact" className="tracking-[0.35em] transition duration-300 hover:text-[#c5a059]">Contact</a>
            <button
              type="button"
              onClick={() => setCartOpen(true)}
              className="relative flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-[#d8ccb6] transition-all duration-300 hover:border-[#c5a059] hover:text-[#c5a059]"
              aria-label="Coș cumpărături"
            >
              <ShoppingCart className="h-4 w-4" />
              {cartItems.length > 0 && (
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#c5a059] text-[9px] font-bold text-[#0a0a0a]">
                  {cartItems.length}
                </span>
              )}
            </button>
          </nav>
        </div>
      </header>

      <main className="pt-20 md:pt-28">
        <section
          id="home"
          className="relative overflow-hidden"
          style={{
            backgroundImage: `linear-gradient(180deg, rgba(10,10,10,0.6), rgba(10,10,10,0.85)), url(${heroBG})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="mx-auto flex min-h-[calc(100vh-80px)] max-w-7xl flex-col justify-center px-6 pb-24 pt-24 text-center md:min-h-[calc(100vh-112px)] lg:px-8">
            <span className="mb-6 inline-flex text-base font-bold uppercase tracking-[0.15em] text-[#c5a059] sm:text-xl sm:tracking-[0.35em]">
              Confecții metalice de lux
            </span>
            <h1 className="mx-auto max-w-4xl text-5xl font-semibold leading-tight text-[#c5a059] sm:text-6xl lg:text-7xl">
              Inginerie de Precizie.
            </h1>
            <p className="mx-auto mt-8 max-w-2xl text-base leading-8 text-[#d8ccb6] sm:text-lg">
              Specialiști în balustrade arhitecturale, scări metalice și design industrial high-end, cu o experiență de peste 30 de ani în prelucrarea oțelului.
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

        <CatalogShowroom onAddToCart={addToCart} />

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
                      Metal periat, tonuri profunde și reflexii discrete pentru proiecte high-end.
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
              <form
                onSubmit={(e) => e.preventDefault()}
                className="rounded-[2rem] border border-white/10 bg-white/5 p-8 backdrop-blur-md shadow-luxe"
              >
                <p className="mb-6 text-xs uppercase tracking-[0.35em] text-[#c5a059]">Cerere Consultanță Tehnică</p>
                <div className="space-y-5">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <label className="block text-xs uppercase tracking-[0.18em] text-[#cfc5ad]">
                      Nume complet
                      <input type="text" placeholder="Ion Popescu" className="mt-2 w-full rounded-3xl border border-white/10 bg-[#0f0f0f] px-4 py-3.5 text-sm text-[#f8f1e5] outline-none transition focus:border-[#c5a059] focus:ring-2 focus:ring-[#c5a059]/20" />
                    </label>
                    <label className="block text-xs uppercase tracking-[0.18em] text-[#cfc5ad]">
                      Telefon
                      <input type="tel" placeholder="+40 7xx xxx xxx" className="mt-2 w-full rounded-3xl border border-white/10 bg-[#0f0f0f] px-4 py-3.5 text-sm text-[#f8f1e5] outline-none transition focus:border-[#c5a059] focus:ring-2 focus:ring-[#c5a059]/20" />
                    </label>
                  </div>
                  <label className="block text-xs uppercase tracking-[0.18em] text-[#cfc5ad]">
                    Email
                    <input type="email" placeholder="email@exemplu.ro" className="mt-2 w-full rounded-3xl border border-white/10 bg-[#0f0f0f] px-4 py-3.5 text-sm text-[#f8f1e5] outline-none transition focus:border-[#c5a059] focus:ring-2 focus:ring-[#c5a059]/20" />
                  </label>
                  <label className="block text-xs uppercase tracking-[0.18em] text-[#cfc5ad]">
                    Tip Proiect
                    <select className="mt-2 w-full appearance-none rounded-3xl border border-white/10 bg-[#0f0f0f] px-4 py-3.5 text-sm text-[#f8f1e5] outline-none transition focus:border-[#c5a059] focus:ring-2 focus:ring-[#c5a059]/20">
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
                      placeholder="Dimensiuni, materiale, destinație, termen dorit, buget estimat..."
                      className="mt-2 w-full rounded-[1.5rem] border border-white/10 bg-[#0f0f0f] px-4 py-3.5 text-sm text-[#f8f1e5] outline-none transition focus:border-[#c5a059] focus:ring-2 focus:ring-[#c5a059]/20"
                    />
                  </label>
                  <div>
                    <p className="mb-2 text-xs uppercase tracking-[0.18em] text-[#cfc5ad]">Schițe / Fotografii (opțional)</p>
                    <label className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-[1.5rem] border border-dashed border-white/15 bg-white/3 px-6 py-6 transition-all hover:border-[#c5a059]/40 hover:bg-[#c5a059]/5">
                      <Upload className="h-6 w-6 text-[#cfc5ad]/40" />
                      <span className="text-xs text-[#cfc5ad]/60">Trage fișierele sau apasă pentru a selecta</span>
                      <span className="text-[10px] uppercase tracking-[0.2em] text-[#cfc5ad]/40">PNG, JPG, PDF · max 10 MB</span>
                      <input type="file" multiple accept=".png,.jpg,.jpeg,.pdf" className="sr-only" />
                    </label>
                  </div>
                  <button
                    type="submit"
                    className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-[#c5a059] px-8 py-4 text-sm uppercase tracking-[0.25em] text-[#0a0a0a] transition duration-300 hover:bg-[#b79245] hover:shadow-[0_0_20px_rgba(197,160,89,0.3)]"
                  >
                    Trimite Cererea <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </form>
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
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-3xl border border-white/5 bg-white/10 p-8 backdrop-blur-md">
                <p className="text-sm uppercase tracking-[0.25em] text-[#c5a059]">30+ ani experiență</p>
                <p className="mt-4 text-sm leading-7 text-[#cfc5ad]">Am livrat proiecte pentru spații premium, birouri corporate și reședințe private.</p>
              </div>
              <div className="rounded-3xl border border-white/5 bg-white/10 p-8 backdrop-blur-md">
                <p className="text-sm uppercase tracking-[0.25em] text-[#c5a059]">Toleranțe stricte</p>
                <p className="mt-4 text-sm leading-7 text-[#cfc5ad]">Controlul dimensional și al finisajului este realizat la nivel de micron pentru fiecare piesă.</p>
              </div>
            </div>
          </div>
        </section>

        <section id="proiecte-custom" className="bg-[#0d0d0d] px-6 py-24 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div>
              <div className="mb-10 max-w-2xl">
                <p className="mb-3 text-sm uppercase tracking-[0.35em] text-[#c5a059]">Proiect la Comandă</p>
                <h3 className="text-3xl font-semibold leading-tight text-[#f8f1e5] sm:text-4xl">
                  Ai o idee? Hai s-o construim împreună.
                </h3>
                <p className="mt-4 text-base leading-8 text-[#cfc5ad]/80">
                  Completează formularul cu detaliile proiectului tău și adaugă schițe sau fotografii. Echipa Kraft te contactează în 24 de ore.
                </p>
              </div>

              <form
                onSubmit={(e) => e.preventDefault()}
                className="rounded-[2rem] border border-white/10 bg-white/5 p-8 backdrop-blur-md shadow-luxe lg:p-12"
              >
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  <label className="block text-xs uppercase tracking-[0.18em] text-[#cfc5ad]">
                    Nume complet
                    <input type="text" placeholder="Ion Popescu" className="mt-3 w-full rounded-3xl border border-white/10 bg-[#111111] px-4 py-4 text-sm text-[#f8f1e5] outline-none transition focus:border-[#c5a059] focus:ring-2 focus:ring-[#c5a059]/20" />
                  </label>
                  <label className="block text-xs uppercase tracking-[0.18em] text-[#cfc5ad]">
                    Email
                    <input type="email" placeholder="email@exemplu.ro" className="mt-3 w-full rounded-3xl border border-white/10 bg-[#111111] px-4 py-4 text-sm text-[#f8f1e5] outline-none transition focus:border-[#c5a059] focus:ring-2 focus:ring-[#c5a059]/20" />
                  </label>
                  <label className="block text-xs uppercase tracking-[0.18em] text-[#cfc5ad]">
                    Telefon
                    <input type="tel" placeholder="+40 7xx xxx xxx" className="mt-3 w-full rounded-3xl border border-white/10 bg-[#111111] px-4 py-4 text-sm text-[#f8f1e5] outline-none transition focus:border-[#c5a059] focus:ring-2 focus:ring-[#c5a059]/20" />
                  </label>
                </div>

                <div className="mt-6">
                  <label className="block text-xs uppercase tracking-[0.18em] text-[#cfc5ad]">
                    Tip Proiect
                    <select className="mt-3 w-full appearance-none rounded-3xl border border-white/10 bg-[#111111] px-4 py-4 text-sm text-[#f8f1e5] outline-none transition focus:border-[#c5a059] focus:ring-2 focus:ring-[#c5a059]/20">
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
                      placeholder="Dimensiuni, materiale preferate, destinație (interior/exterior), volum estimat, termen dorit..."
                      className="mt-3 w-full rounded-[1.5rem] border border-white/10 bg-[#111111] px-4 py-4 text-sm text-[#f8f1e5] outline-none transition focus:border-[#c5a059] focus:ring-2 focus:ring-[#c5a059]/20"
                    />
                  </label>
                </div>

                <div className="mt-6">
                  <p className="mb-3 text-xs uppercase tracking-[0.18em] text-[#cfc5ad]">Schițe / Fotografii (opțional)</p>
                  <label className="flex cursor-pointer flex-col items-center justify-center gap-3 rounded-[1.5rem] border border-dashed border-white/15 bg-white/3 px-6 py-8 transition-all hover:border-[#c5a059]/40 hover:bg-[#c5a059]/5">
                    <Upload className="h-7 w-7 text-[#cfc5ad]/40" />
                    <span className="text-sm text-[#cfc5ad]/60">Trage fișierele aici sau apasă pentru a selecta</span>
                    <span className="text-[11px] uppercase tracking-[0.2em] text-[#cfc5ad]/40">PNG, JPG, PDF · max 10 MB</span>
                    <input type="file" multiple accept=".png,.jpg,.jpeg,.pdf" className="sr-only" />
                  </label>
                </div>

                <button
                  type="submit"
                  className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#c5a059] px-8 py-4 text-sm uppercase tracking-[0.25em] text-[#0a0a0a] transition duration-300 hover:bg-[#b79245] hover:shadow-[0_0_20px_rgba(197,160,89,0.3)]"
                >
                  Trimite Cererea de Proiect <ArrowRight className="h-4 w-4" />
                </button>
              </form>
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
                href={`tel:${contactInfo.phone}`}
                className="group flex flex-col gap-5 rounded-3xl border border-[#c5a059]/20 bg-[#c5a059]/5 p-8 backdrop-blur-md transition-all duration-300 hover:border-[#c5a059]/60 hover:bg-[#c5a059]/10 hover:shadow-[0_6px_40px_rgba(197,160,89,0.15)]"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-[#c5a059]/40 bg-[#c5a059]/15">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#c5a059]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" /></svg>
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-[0.3em] text-[#cfc5ad]/50 mb-2">Sună Acum</p>
                  <p className="text-xl font-bold tracking-wide text-[#c5a059] transition-colors group-hover:text-[#e2bc77]">{contactInfo.phone}</p>
                  <p className="mt-1 text-xs text-[#cfc5ad]/60">Click pentru apel direct</p>
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
                  <p className="text-[10px] uppercase tracking-[0.3em] text-[#cfc5ad]/50 mb-2">Trimite Email</p>
                  <p className="text-lg font-bold text-[#c5a059] transition-colors group-hover:text-[#e2bc77] break-all">{contactInfo.email}</p>
                  <p className="mt-1 text-xs text-[#cfc5ad]/60">Click pentru email direct</p>
                </div>
              </a>

              {/* Schedule */}
              <div className="flex flex-col gap-5 rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-md">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-[#c5a059]/30 bg-[#c5a059]/10">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#c5a059]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-[0.3em] text-[#cfc5ad]/50 mb-2">Program</p>
                  <p className="text-base font-semibold text-[#f8f1e5]">{contactInfo.schedule}</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/10 bg-[#0a0a0a] px-6 py-10 lg:px-8">
        <div className="mx-auto max-w-7xl flex flex-col items-center gap-5 text-center sm:flex-row sm:justify-between sm:text-left">
          <p className="text-sm text-[#b8ab95]">© 2026 KRAFT METALWORKS · Fabricat în România · Calitate Industrială Fără Compromis</p>
          <div className="flex flex-col items-center gap-3 sm:flex-row sm:gap-6">
            <a
              href={`tel:${contactInfo.phone}`}
              className="text-sm font-bold text-[#c5a059] transition-colors hover:text-[#e2bc77]"
            >
              {contactInfo.phone}
            </a>
            <span className="hidden text-[#b8ab95]/30 sm:inline">|</span>
            <a
              href={`mailto:${contactInfo.email}`}
              className="text-sm font-bold text-[#c5a059] transition-colors hover:text-[#e2bc77]"
            >
              {contactInfo.email}
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
