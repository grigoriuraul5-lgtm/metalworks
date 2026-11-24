import { useState } from 'react';
import { ArrowRight, Clock } from 'lucide-react';
import { SiteShell } from '../components/Layout.jsx';
import { SectionHeading } from '../components/ui.jsx';
import { Breadcrumbs, B2BQuoteForm, sectionClass } from './common.jsx';
import { POSTS, BLOG_CATEGORIES, getPost } from '../content/blog.js';
import { renderMarkdown } from '../lib/markdown.js';

const formatDate = (iso) =>
  new Date(`${iso}T12:00:00Z`).toLocaleDateString('ro-RO', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' });

function PostCard({ post }) {
  return (
    <a
      href={`/blog/${post.slug}`}
      className="group flex h-full flex-col rounded-3xl border border-white/10 bg-[#111] p-8 transition-all duration-500 hover:-translate-y-0.5 hover:border-[#c5a059]/40 hover:shadow-[0_12px_50px_rgba(197,160,89,0.18)]"
    >
      <span className="w-fit rounded-full border border-[#c5a059]/40 bg-black/50 px-3 py-1 text-[9px] uppercase tracking-[0.3em] text-[#c5a059]">{post.category}</span>
      <h2 className="mt-6 text-2xl font-semibold leading-snug text-[#f8f1e5] transition group-hover:text-[#c5a059]">{post.title}</h2>
      <p className="mt-4 flex-1 text-sm leading-7 text-[#cfc5ad]/80">{post.description}</p>
      <div className="mt-8 flex items-center justify-between text-[10px] uppercase tracking-[0.25em] text-[#cfc5ad]/70">
        <span className="flex items-center gap-2"><Clock className="h-3.5 w-3.5" /> {post.readMinutes} min</span>
        <span className="flex items-center gap-2 text-[#c5a059]">Citește <ArrowRight className="h-3.5 w-3.5" /></span>
      </div>
    </a>
  );
}

function BlogIndexContent() {
  const [cat, setCat] = useState('Toate');
  const shown = cat === 'Toate' ? POSTS : POSTS.filter((p) => p.category === cat);

  return (
    <section className={`${sectionClass} pt-16`}>
      <div className="mx-auto max-w-7xl">
        <Breadcrumbs items={[{ name: 'Acasă', path: '/' }, { name: 'Blog', path: '/blog' }]} />
        <SectionHeading as="h1" eyebrow="Blog tehnic KRAFT" title="Ghiduri practice pentru cine comandă metal.">
          Debitare laser, producție de serie și alegerea corectă a pieselor — scrise de echipa care le produce.
        </SectionHeading>
        <div className="mb-10 flex flex-wrap gap-2">
          {['Toate', ...BLOG_CATEGORIES].map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setCat(c)}
              aria-pressed={cat === c}
              className={`rounded-full border px-5 py-2.5 text-xs uppercase tracking-[0.25em] transition-all duration-300 ${
                cat === c
                  ? 'border-[#c5a059] bg-[#c5a059]/10 text-[#c5a059] shadow-[0_0_20px_rgba(197,160,89,0.15)]'
                  : 'border-white/10 bg-black/40 text-[#d8ccb6] hover:border-[#c5a059]/40 hover:text-[#f8f1e5]'
              }`}
            >
              {c}
            </button>
          ))}
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {shown.map((post) => <PostCard key={post.slug} post={post} />)}
        </div>
      </div>
    </section>
  );
}

export function BlogIndexPage() {
  return (
    <SiteShell>
      <BlogIndexContent />
    </SiteShell>
  );
}

function BlogPostContent({ post }) {
  const { html, toc } = renderMarkdown(post.body);
  const related = POSTS.filter((p) => p.slug !== post.slug).slice(0, 2);

  return (
    <article className={`${sectionClass} pt-16`}>
      <div className="mx-auto max-w-7xl">
        <Breadcrumbs items={[{ name: 'Acasă', path: '/' }, { name: 'Blog', path: '/blog' }, { name: post.category, path: `/blog/${post.slug}` }]} />
        <header className="max-w-4xl">
          <span className="rounded-full border border-[#c5a059]/40 bg-black/50 px-3 py-1 text-[9px] uppercase tracking-[0.3em] text-[#c5a059]">{post.category}</span>
          <h1 className="mt-6 text-4xl font-semibold leading-tight text-[#c5a059] sm:text-5xl">{post.title}</h1>
          <p className="mt-6 text-lg leading-8 text-[#d8ccb6]">{post.description}</p>
          <p className="mt-6 text-[10px] uppercase tracking-[0.3em] text-[#cfc5ad]/70">
            <time dateTime={post.date}>{formatDate(post.date)}</time> · {post.readMinutes} min de citit · Echipa KRAFT Metalworks
          </p>
        </header>

        <div className="mt-14 grid gap-12 lg:grid-cols-[16rem_1fr]">
          <aside className="lg:sticky lg:top-32 lg:self-start">
            <nav aria-label="Cuprins" className="rounded-3xl border border-white/10 bg-white/5 p-6">
              <p className="mb-4 text-[10px] uppercase tracking-[0.35em] text-[#c5a059]">Cuprins</p>
              <ol className="space-y-3 text-sm leading-6">
                {toc.map((item) => (
                  <li key={item.id}>
                    <a href={`#${item.id}`} className="text-[#cfc5ad]/80 transition hover:text-[#c5a059]">{item.text}</a>
                  </li>
                ))}
              </ol>
            </nav>
          </aside>

          <div className="min-w-0 max-w-3xl">
            <div className="kraft-prose" dangerouslySetInnerHTML={{ __html: html }} />

            <div className="mt-16">
              <B2BQuoteForm
                id="cotatie-articol"
                subject={`Cotație din articol: ${post.title}`}
                title="Ai o schiță tehnică?"
                intro="Trage fișierul DXF/DWG aici pentru cotație în 24h. Îți răspundem cu preț, termen și observații despre desen."
                dropTitle="Trage fișierul DXF / DWG / PDF aici"
                extraFields={{ sursa: `Blog — ${post.slug}` }}
              />
            </div>

            {related.length > 0 && (
              <div className="mt-16">
                <p className="mb-6 text-sm uppercase tracking-[0.35em] text-[#c5a059]">Citește și</p>
                <div className="grid gap-6 md:grid-cols-2">
                  {related.map((p) => <PostCard key={p.slug} post={p} />)}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}

export function BlogPostPage({ slug }) {
  const post = getPost(slug);
  return (
    <SiteShell>
      <BlogPostContent post={post} />
    </SiteShell>
  );
}
