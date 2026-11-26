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

const WEB3FORMS_KEY = 'e687de75-5460-4f70-aa32-72104082eaf5'; // cheie publică, făcută să stea în site

async function viaWeb3Forms(formEl, extraFields) {
  const data = buildFormData(formEl, extraFields);
  const files = [];
  for (const [key, value] of Array.from(data.entries())) {
    if (value instanceof File) {
      files.push(`${value.name} (${Math.round(value.size / 1024)} KB)`);
      data.delete(key);
    }
  }
  if (files.length) {
    data.append('fisiere_atasate', `${files.join(', ')} — pe planul gratuit fișierele nu trec prin formular; cere-le clientului pe email sau WhatsApp.`);
  }
  data.append('access_key', WEB3FORMS_KEY);
  data.append('subject', data.get('_subject') || 'Cerere nouă — KRAFT Metalworks');
  data.append('from_name', 'Site KRAFT Metalworks');
  const clientEmail = data.get('email');
  if (clientEmail) data.append('replyto', clientEmail);
  const response = await fetch('https://api.web3forms.com/submit', {
    method: 'POST',
    headers: { Accept: 'application/json' },
    body: data,
  });
  const json = await response.json().catch(() => ({}));
  if (!response.ok || json.success !== true) throw new Error(json.message || `Web3Forms ${response.status}`);
  return { ok: true, via: 'web3forms', filesNotSent: files.length > 0 };
}

async function deliver(formEl, extraFields) {
  // 1. Serverul propriu (Resend) — singurul care trimite și fișierele, când RESEND_API_KEY e setată.
  try {
    const response = await fetch('/api/send-lead', {
      method: 'POST',
      body: buildFormData(formEl, extraFields),
    });
    if (response.ok) return { ok: true, via: 'resend' };
  } catch {
    // trecem mai departe
  }

  // 2. Web3Forms — principalul canal acum, fără activare.
  try {
    return await viaWeb3Forms(formEl, extraFields);
  } catch {
    // trecem la ultima rezervă
  }

  // 3. FormSubmit — rezervă.
  const fallback = buildFormData(formEl, extraFields);
  fallback.append('_captcha', 'false');
  fallback.append('_template', 'table');
  const response = await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(contact.email)}`, {
    method: 'POST',
    headers: { Accept: 'application/json' },
    body: fallback,
  });
  if (!response.ok) throw new Error(`Trimitere eșuată (${response.status})`);
  // FormSubmit răspunde 200 și când formularul nu e activat ({ success: "false" }).
  const data = await response.json().catch(() => ({}));
  if (String(data.success) !== 'true') {
    throw new Error(data.message || 'Trimiterea nu a fost confirmată');
  }
  return { ok: true, via: 'formsubmit' };
}
