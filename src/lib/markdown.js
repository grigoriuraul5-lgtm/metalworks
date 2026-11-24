import { Marked } from 'marked';

export function slugify(text) {
  return String(text)
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/<[^>]+>/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .slice(0, 80);
}

const marked = new Marked({
  gfm: true,
  renderer: {
    heading({ tokens, depth }) {
      const inner = this.parser.parseInline(tokens);
      const id = slugify(inner);
      return `<h${depth} id="${id}">${inner}</h${depth}>\n`;
    },
    link({ href, title, tokens }) {
      const inner = this.parser.parseInline(tokens);
      const external = /^https?:\/\//.test(href) && !href.includes('kraftmetalworks.ro');
      return `<a href="${href}"${title ? ` title="${title}"` : ''}${external ? ' target="_blank" rel="noopener noreferrer"' : ''}>${inner}</a>`;
    },
  },
});

export function renderMarkdown(md) {
  const toc = marked
    .lexer(md)
    .filter((t) => t.type === 'heading' && t.depth === 2)
    .map((t) => ({ id: slugify(t.text), text: t.text.replace(/[*_`]/g, '') }));
  return { html: marked.parse(md), toc };
}
