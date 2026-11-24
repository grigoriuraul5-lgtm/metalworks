import { useState } from 'react';
import { ShoppingCart, Minus, Plus, ShieldCheck, Truck, RotateCcw } from 'lucide-react';
import { SiteShell, useShop, vatNote } from '../components/Layout.jsx';
import { Breadcrumbs, sectionClass } from './common.jsx';
import { KRAFT_PRODUCTS } from '../data/kraftFeedProducts.js';
import IMAGE_SIZES from '../data/productImageSizes.json';

const dims = (slug) => {
  const [width, height] = IMAGE_SIZES[slug] || [1200, 900];
  return { width, height };
};

export const getProduct = (slug) => KRAFT_PRODUCTS.find((p) => p.slug === slug);

// Același obiect pe care îl folosește catalogul de pe prima pagină → coșul
// recunoaște produsul indiferent de unde a fost adăugat.
export const toCatalogProduct = (p) => ({
  id: `pmn-${p.slug}`,
  slug: p.slug,
  category: 'picioare-masa',
  isNew: true,
  title: p.title,
  imgRender: `/products/${p.slug}.jpg`,
  basePrice: p.basePrice,
  priceOnRequest: p.priceOnRequest,
  material: p.material,
  description: p.description,
  specs: p.specs,
});

function ProductContent({ product }) {
  const { addToCart, requestQuote } = useShop();
  const [qty, setQty] = useState(1);
  const item = toCatalogProduct(product);
  const hasPrice = !product.priceOnRequest && typeof product.basePrice === 'number';
  const related = KRAFT_PRODUCTS.filter((p) => p.slug !== product.slug && !p.discontinued && p.basePrice).slice(0, 3);

  const handleAdd = () => {
    if (!hasPrice) {
      requestQuote(item);
      return;
    }
    addToCart({ product: item, size: { label: 'Standard' }, finish: { label: 'Negru Mat' }, price: product.basePrice, qty });
  };

  return (
    <section className={`${sectionClass} pt-16`}>
      <div className="mx-auto max-w-7xl">
        <Breadcrumbs
          items={[
            { name: 'Acasă', path: '/' },
            { name: 'Picioare de masă', path: '/picioare-masa-metalice' },
            { name: product.title, path: `/produs/${product.slug}` },
          ]}
        />
        <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
          <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-[#0a0a0a] shadow-luxe">
            <img src={`/products/${product.slug}.jpg`} alt={`${product.title} — picior de masă metalic KRAFT Metalworks`} {...dims(product.slug)} fetchpriority="high" className="mx-auto h-auto max-h-[80vh] w-auto max-w-full object-contain" />
          </div>

          <div className="space-y-6">
            <div>
              <p className="mb-2 text-[10px] uppercase tracking-[0.3em] text-[#cfc5ad]/70">Picioare de masă · Colecția 2026</p>
              <h1 className="text-4xl font-semibold leading-tight text-[#c5a059]">{product.title}</h1>
            </div>
            <p className="text-base leading-8 text-[#cfc5ad]">{product.description}</p>
            <div>
              <p className="mb-1 text-[10px] uppercase tracking-[0.25em] text-[#cfc5ad]/70">Material</p>
              <p className="text-sm leading-6 text-[#cfc5ad]">{product.material}</p>
            </div>

            {product.specs?.length > 0 && (
              <div className="rounded-2xl border border-white/10 bg-white/[0.04]">
                {product.specs.map(({ label, value }, i) => (
                  <div key={label} className={`flex items-baseline justify-between gap-3 px-5 py-3 ${i < product.specs.length - 1 ? 'border-b border-white/5' : ''}`}>
                    <span className="shrink-0 text-[10px] uppercase tracking-[0.15em] text-[#cfc5ad]/70">{label}</span>
                    <span className="text-right text-sm text-[#f8f1e5]">{value}</span>
                  </div>
                ))}
              </div>
            )}

            <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6">
              {hasPrice ? (
                <>
                  <p className="text-[10px] uppercase tracking-[0.25em] text-[#cfc5ad]/70">Preț</p>
                  <p className="mt-1 text-3xl font-semibold text-[#f8f1e5]">{product.basePrice.toLocaleString('ro-RO')} RON</p>
                  <p className="mt-1 text-[11px] text-[#cfc5ad]/70">{vatNote()} · transportul se confirmă înainte de plată</p>
                  <div className="mt-6 flex items-center gap-4">
                    <div className="flex items-center rounded-full border border-white/15">
                      <button type="button" onClick={() => setQty((q) => Math.max(1, q - 1))} className="flex h-11 w-11 items-center justify-center text-[#cfc5ad] hover:text-[#c5a059]" aria-label="Scade cantitatea">
                        <Minus className="h-4 w-4" />
                      </button>
                      <span className="w-8 text-center text-sm text-[#f8f1e5]" aria-live="polite">{qty}</span>
                      <button type="button" onClick={() => setQty((q) => Math.min(99, q + 1))} className="flex h-11 w-11 items-center justify-center text-[#cfc5ad] hover:text-[#c5a059]" aria-label="Crește cantitatea">
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>
                    <button type="button" onClick={handleAdd} className="flex flex-1 items-center justify-center gap-2 rounded-full bg-[#c5a059] py-3.5 text-xs uppercase tracking-[0.25em] text-[#0a0a0a] transition-all duration-300 hover:bg-[#b79245] hover:shadow-[0_0_24px_rgba(197,160,89,0.4)]">
                      <ShoppingCart className="h-4 w-4" /> Adaugă în Coș
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <p className="text-xl font-semibold text-[#c5a059]">Ofertă Personalizată</p>
                  <p className="mt-1 text-xs text-[#cfc5ad]/70">Prețul depinde de dimensiuni. Îl primești în 24 de ore lucrătoare.</p>
                  <button type="button" onClick={handleAdd} className="mt-5 flex w-full items-center justify-center gap-2 rounded-full bg-[#c5a059] py-3.5 text-xs uppercase tracking-[0.25em] text-[#0a0a0a] transition hover:bg-[#b79245]">
                    Cere Ofertă
                  </button>
                </>
              )}
              <button type="button" onClick={() => requestQuote(item)} className="mt-4 w-full text-center text-[10px] uppercase tracking-[0.25em] text-[#c5a059]/80 underline decoration-[#c5a059]/30 underline-offset-4 hover:text-[#c5a059]">
                Ai nevoie de altă dimensiune sau culoare? Cere ofertă custom
              </button>
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              {[
                [ShieldCheck, 'Execuție la comandă', `În ${product.leadDays || 10} zile lucrătoare`],
                [Truck, 'Livrare în toată țara', 'Cost confirmat înainte de plată'],
                [RotateCcw, 'Retur 14 zile', 'Pentru configurația standard'],
              ].map(([Icon, t, d]) => (
                <div key={t} className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                  <Icon className="h-4 w-4 text-[#c5a059]" />
                  <p className="mt-2 text-[10px] uppercase tracking-[0.2em] text-[#f8f1e5]">{t}</p>
                  <p className="mt-1 text-[11px] leading-5 text-[#cfc5ad]/70">{d}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {related.length > 0 && (
          <div className="mt-20">
            <p className="mb-6 text-sm uppercase tracking-[0.35em] text-[#c5a059]">Alte modele din colecție</p>
            <div className="grid gap-4 sm:grid-cols-3">
              {related.map((p) => (
                <a key={p.slug} href={`/produs/${p.slug}`} className="group overflow-hidden rounded-2xl border border-white/10 bg-[#111] transition-all duration-500 hover:-translate-y-0.5 hover:border-[#c5a059]/40">
                  <img src={`/products/${p.slug}.jpg`} alt={p.title} {...dims(p.slug)} loading="lazy" decoding="async" className="h-auto w-full" />
                  <div className="flex items-center justify-between px-4 py-3">
                    <p className="truncate text-[11px] font-semibold uppercase tracking-[0.15em] text-[#f8f1e5]/90">{p.title}</p>
                    <p className="shrink-0 text-sm font-semibold text-[#c5a059]">{p.basePrice.toLocaleString('ro-RO')} <span className="text-[10px] font-normal text-[#c5a059]/80">RON</span></p>
                  </div>
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default function ProductPage({ slug }) {
  return (
    <SiteShell>
      <ProductContent product={getProduct(slug)} />
    </SiteShell>
  );
}
