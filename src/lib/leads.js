import { contact } from '../siteConfig.js';
import { track } from './analytics.js';

// ─────────────────────────────────────────────────────────────────────────────
// Trimite orice formular din site.
//   1. Încearcă serverul propriu: /api/send-lead (Vercel + Resend).
//   2. Dacă acesta nu răspunde OK (ex: RESEND_API_KEY încă neconfigurată),
//      trimite automat prin FormSubmit.co, ca până acum. Nu se pierde niciun lead.
// ─────────────────────────────────────────────────────────────────────────────

export const MAX_UPLOAD_BYTES = 4 * 1024 * 1024; // limita Vercel pentru corpul cererii ≈ 4,5 MB

function buildFormData(formEl, extraFields) {
  const formData = new FormData(formEl);
  // Un input de fișier gol rămâne ca File(size=0) — îl scoatem, altfel
  // unele servicii trimit emailul gol.
  for (const [key, value] of Array.from(formData.entries())) {
    if (value instanceof File && value.size === 0 && value.name === '') {
      formData.delete(key);
    }
  }
  Object.entries(extraFields).forEach(([key, value]) => {
    if (value != null && value !== '') formData.append(key, value);
  });
  if (!formData.get('_subject')) {
    formData.append('_subject', 'Cerere nouă — KRAFT Metalworks');
  }
  if (typeof window !== 'undefined') {
    formData.append('pagina', window.location.pathname);
  }
  return formData;
}

export async function sendLead(formEl, extraFields = {}) {
  const result = await deliver(formEl, extraFields);
  track(extraFields.total_estimat ? 'order' : 'lead', { form: extraFields._subject, value: Number(String(extraFields.total_estimat || '').replace(/\D/g, '')) || 0 });
  return result;
}

async function deliver(formEl, extraFields) {
  try {
    const response = await fetch('/api/send-lead', {
      method: 'POST',
      body: buildFormData(formEl, extraFields),
    });
    if (response.ok) return { ok: true, via: 'resend' };
  } catch {
    // trecem la varianta de rezervă
  }

  const fallback = buildFormData(formEl, extraFields);
  fallback.append('_captcha', 'false');
  fallback.append('_template', 'table');
  const response = await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(contact.email)}`, {
    method: 'POST',
    headers: { Accept: 'application/json' },
    body: fallback,
  });
  if (!response.ok) throw new Error(`Trimitere eșuată (${response.status})`);
  return { ok: true, via: 'formsubmit' };
}
