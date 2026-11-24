import { SiteShell } from '../components/Layout.jsx';
import { sectionClass } from './common.jsx';

export default function NotFoundPage() {
  return (
    <SiteShell>
      <section className={`${sectionClass} min-h-[60vh] pt-24 text-center`}>
        <p className="text-sm uppercase tracking-[0.35em] text-[#c5a059]">Eroare 404</p>
        <h1 className="mt-6 text-4xl font-semibold text-[#c5a059] sm:text-5xl">Pagina asta nu există.</h1>
        <p className="mx-auto mt-6 max-w-xl text-base leading-8 text-[#cfc5ad]">Linkul poate fi vechi sau greșit. Continuă de pe una dintre paginile principale.</p>
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <a href="/" className="rounded-full bg-[#c5a059] px-8 py-3.5 text-sm uppercase tracking-[0.3em] text-[#0a0a0a] transition hover:bg-[#b8924b]">Pagina principală</a>
          <a href="/#collection" className="rounded-full border border-[#c5a059] px-8 py-3.5 text-sm uppercase tracking-[0.3em] transition hover:bg-[#141414]">Colecția</a>
        </div>
      </section>
    </SiteShell>
  );
}
