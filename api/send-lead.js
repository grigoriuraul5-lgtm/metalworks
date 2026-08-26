// ─────────────────────────────────────────────────────────────────────────────
// Vercel Edge Function — trimite toate cererile din site (comandă, cerere
// ofertă, consultanță, proiect custom) direct pe email, prin Resend.
//
// Înlocuiește FormSubmit.co (care necesita activare manuală prin link, se
// putea "strica" la reactivare, și genera uneori emailuri goale la formulare
// cu upload de poze). Aici totul e sub controlul tău, în contul tău Vercel.
//
// CE TREBUIE SĂ FACI TU O SINGURĂ DATĂ, ca să meargă:
//   1. Cont gratuit pe resend.com (până la 3000 emailuri/lună, gratuit).
//   2. În Resend: Domains → Add Domain → kraftmetalworks.ro → copiezi
//      înregistrările DNS (TXT/CNAME) pe care ți le arată și le adaugi acolo
//      unde îți administrezi DNS-ul domeniului (Vercel → Domains, sau la
//      registrarul de unde ai cumpărat domeniul). Așteaptă până apare
//      „Verified" în Resend (de obicei minute, uneori câteva ore).
//   3. În Resend: API Keys → Create API Key → copiezi cheia (începe cu „re_").
//   4. În Vercel: Project → Settings → Environment Variables → adaugi
//      RESEND_API_KEY = <cheia de la pasul 3> → apoi faci un nou deploy
//      (orice re-upload/redeploy e suficient ca variabila să se activeze).
//
// Până nu faci pașii de mai sus, formularele vor răspunde cu eroare — asta e
// normal și așteptat, nu un bug.
// ─────────────────────────────────────────────────────────────────────────────

export const config = { runtime: 'edge' };

const TO_EMAIL = 'contact@kraftmetalworks.ro';
const FROM_EMAIL = 'Site KRAFT Metalworks <site@kraftmetalworks.ro>';
const MAX_ATTACHMENT_BYTES = 5 * 1024 * 1024; // 5 MB per fișier

function escapeHtml(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function arrayBufferToBase64(buffer) {
  let binary = '';
  const bytes = new Uint8Array(buffer);
  const chunkSize = 0x8000;
  for (let i = 0; i < bytes.length; i += chunkSize) {
    binary += String.fromCharCode.apply(null, bytes.subarray(i, i + chunkSize));
  }
  return btoa(binary);
}

export default async function handler(req) {
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), { status: 405 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return new Response(
      JSON.stringify({ error: 'RESEND_API_KEY nu este configurată în Vercel. Vezi comentariul din api/send-lead.js.' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }

  try {
    const formData = await req.formData();
    const fields = {};
    const attachments = [];
    const ignoredFiles = [];

    for (const [key, value] of formData.entries()) {
      if (value instanceof File) {
        if (value.size === 0) continue; // input de fișier lăsat gol
        if (value.size > MAX_ATTACHMENT_BYTES) {
          ignoredFiles.push(`${value.name} (${Math.round(value.size / 1024)} KB — peste limita de 5MB)`);
          continue;
        }
        const buffer = await value.arrayBuffer();
        attachments.push({ filename: value.name, content: arrayBufferToBase64(buffer) });
      } else {
        fields[key] = value;
      }
    }

    const subject = fields._subject || 'Cerere nouă — KRAFT Metalworks';
    const replyTo = fields.email && fields.email.includes('@') ? fields.email : undefined;

    const rows = Object.entries(fields)
      .filter(([key]) => !key.startsWith('_'))
      .map(
        ([key, value]) => `
          <tr>
            <td style="padding:8px 14px;font-weight:600;border-bottom:1px solid #eee;white-space:nowrap;vertical-align:top;">${escapeHtml(key)}</td>
            <td style="padding:8px 14px;border-bottom:1px solid #eee;">${escapeHtml(value).replace(/\n/g, '<br/>')}</td>
          </tr>`
      )
      .join('');

    const attachmentsNote = attachments.length
      ? `<p style="font-size:13px;color:#555;">📎 ${attachments.length} fișier(e) atașat(e) la acest email.</p>`
      : '';
    const ignoredNote = ignoredFiles.length
      ? `<p style="font-size:13px;color:#b45309;">⚠️ Nu au putut fi atașate (prea mari): ${escapeHtml(ignoredFiles.join(', '))} — cere-i clientului să le trimită direct pe WhatsApp/telefon.</p>`
      : '';

    const html = `
      <div style="font-family:Arial,Helvetica,sans-serif;">
        <h2 style="margin:0 0 16px;">${escapeHtml(subject)}</h2>
        <table style="border-collapse:collapse;font-size:14px;width:100%;max-width:640px;">${rows}</table>
        ${attachmentsNote}
        ${ignoredNote}
      </div>`;

    const resendResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: FROM_EMAIL,
        to: [TO_EMAIL],
        reply_to: replyTo,
        subject,
        html,
        attachments: attachments.length ? attachments : undefined,
      }),
    });

    if (!resendResponse.ok) {
      const details = await resendResponse.text();
      return new Response(JSON.stringify({ error: 'Trimiterea către Resend a eșuat', details }), {
        status: 502,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: 'Eroare server', details: String(err) }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
