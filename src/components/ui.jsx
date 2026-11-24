import { useRef, useState } from 'react';
import { Upload, FileText, X } from 'lucide-react';
import { MAX_UPLOAD_BYTES } from '../lib/leads.js';

// Aceleași clase ca în formularele originale ale site-ului.
export const inputClass =
  'mt-2 w-full rounded-3xl border border-white/10 bg-[#0f0f0f] px-4 py-3.5 text-sm text-[#f8f1e5] outline-none transition focus:border-[#c5a059] focus:ring-2 focus:ring-[#c5a059]/20';
export const labelClass = 'block text-xs uppercase tracking-[0.18em] text-[#cfc5ad]';
export const primaryButtonClass =
  'inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#c5a059] px-8 py-4 text-sm uppercase tracking-[0.25em] text-[#0a0a0a] transition duration-300 hover:bg-[#b79245] hover:shadow-[0_0_20px_rgba(197,160,89,0.3)] disabled:cursor-not-allowed disabled:opacity-60';

export const TECH_ACCEPT = '.dxf,.dwg,.step,.stp,.pdf,.png,.jpg,.jpeg';

// ── Bifă GDPR — obligatorie pe orice formular care colectează date ──────────
export function GdprConsent({ className = '' }) {
  return (
    <label className={`flex items-start gap-3 text-left text-[11px] leading-5 text-[#cfc5ad]/70 ${className}`}>
      <input
        type="checkbox"
        name="acord_gdpr"
        value="Da"
        required
        className="mt-0.5 h-4 w-4 shrink-0 cursor-pointer accent-[#c5a059]"
      />
      <span>
        Sunt de acord ca datele mele să fie folosite pentru a primi oferta solicitată, conform{' '}
        <a href="/politica-confidentialitate" className="text-[#c5a059] underline underline-offset-2">
          Politicii de confidențialitate
        </a>
        .
      </span>
    </label>
  );
}

// ── Zonă drag & drop reală (păstrează aspectul vechiului câmp de upload) ────
export function DropZone({
  name = 'fisiere',
  accept = TECH_ACCEPT,
  title = 'Trage fișierele aici sau apasă pentru a selecta',
  hint = 'DXF, DWG, STEP, PDF, JPG · max 4 MB în total',
  large = false,
}) {
  const inputRef = useRef(null);
  const [files, setFiles] = useState([]);
  const [dragging, setDragging] = useState(false);

  const totalBytes = files.reduce((sum, f) => sum + f.size, 0);
  const tooBig = totalBytes > MAX_UPLOAD_BYTES;

  const syncFromInput = () => setFiles(Array.from(inputRef.current?.files || []));

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    const dropped = e.dataTransfer?.files;
    if (!dropped || !dropped.length || !inputRef.current) return;
    try {
      const dt = new DataTransfer();
      Array.from(dropped).forEach((f) => dt.items.add(f));
      inputRef.current.files = dt.files;
    } catch {
      return;
    }
    syncFromInput();
  };

  const removeAll = (e) => {
    e.preventDefault();
    if (inputRef.current) inputRef.current.value = '';
    setFiles([]);
  };

  return (
    <div>
      <label
        onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDrop={handleDrop}
        className={`flex cursor-pointer flex-col items-center justify-center gap-2 rounded-[1.5rem] border border-dashed px-6 text-center transition-all ${
          large ? 'py-10' : 'py-6'
        } ${
          dragging
            ? 'border-[#c5a059] bg-[#c5a059]/10'
            : 'border-white/15 bg-white/[0.03] hover:border-[#c5a059]/40 hover:bg-[#c5a059]/5'
        }`}
      >
        <Upload className={`${large ? 'h-8 w-8' : 'h-6 w-6'} text-[#c5a059]/70`} />
        <span className={`${large ? 'text-sm' : 'text-xs'} text-[#cfc5ad]/80`}>{title}</span>
        <span className="text-[10px] uppercase tracking-[0.2em] text-[#cfc5ad]/70">{hint}</span>
        <input
          ref={inputRef}
          type="file"
          name={name}
          multiple
          accept={accept}
          onChange={syncFromInput}
          className="sr-only"
        />
      </label>
      {files.length > 0 && (
        <div className="mt-3 space-y-2">
          {files.map((f) => (
            <div key={f.name + f.size} className="flex items-center gap-2 text-xs text-[#cfc5ad]">
              <FileText className="h-3.5 w-3.5 shrink-0 text-[#c5a059]" />
              <span className="truncate">{f.name}</span>
              <span className="shrink-0 text-[#cfc5ad]/70">{Math.max(1, Math.round(f.size / 1024))} KB</span>
            </div>
          ))}
          <button type="button" onClick={removeAll} className="inline-flex items-center gap-1 text-[10px] uppercase tracking-[0.2em] text-[#cfc5ad]/70 hover:text-[#c5a059]">
            <X className="h-3 w-3" /> Șterge fișierele
          </button>
          {tooBig && (
            <p className="text-xs text-amber-400">
              Fișierele depășesc 4 MB. Trimite cererea fără ele și ți le cerem pe WhatsApp sau email.
            </p>
          )}
        </div>
      )}
    </div>
  );
}

// ── Date structurate Schema.org ─────────────────────────────────────────────
export function JsonLd({ data }) {
  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, '\\u003c') }}
    />
  );
}

// ── Titlu de secțiune în stilul site-ului ───────────────────────────────────
export function SectionHeading({ eyebrow, title, children, as: Tag = 'h2' }) {
  return (
    <div className="mb-12 max-w-3xl">
      {eyebrow && <p className="mb-4 text-sm uppercase tracking-[0.35em] text-[#c5a059]">{eyebrow}</p>}
      <Tag className="text-4xl font-semibold leading-tight text-[#c5a059] sm:text-5xl">{title}</Tag>
      {children && <div className="mt-6 max-w-2xl text-base leading-8 text-[#cfc5ad]">{children}</div>}
    </div>
  );
}
