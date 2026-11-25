import { SiteShell } from '../components/Layout.jsx';
import { Breadcrumbs, sectionClass } from './common.jsx';
import { company, contact, companyAddressLine, BRAND_NAME } from '../siteConfig.js';

const UPDATED = 'noiembrie 2026';

function companyLine() {
  const bits = [
    company.legalName || BRAND_NAME,
    company.cui && `CUI ${company.cui}`,
    company.regCom && `nr. Reg. Com. ${company.regCom}`,
    `sediu: ${companyAddressLine()}`,
  ].filter(Boolean);
  return bits.join(', ');
}

function LegalLayout({ title, path, children }) {
  return (
    <section className={`${sectionClass} pt-16`}>
      <div className="mx-auto max-w-3xl">
        <Breadcrumbs items={[{ name: 'Acasă', path: '/' }, { name: title, path }]} />
        <h1 className="text-4xl font-semibold leading-tight text-[#c5a059] sm:text-5xl">{title}</h1>
        <p className="mt-4 text-xs uppercase tracking-[0.25em] text-[#cfc5ad]/70">Ultima actualizare: {UPDATED}</p>
        <div className="kraft-prose mt-10">{children}</div>
      </div>
    </section>
  );
}

function TermsContent() {
  return (
    <LegalLayout title="Termeni și condiții" path="/termeni-si-conditii">
      <h2>1. Cine suntem</h2>
      <p>
        Site-ul kraftmetalworks.ro este operat de {companyLine()}. Ne poți contacta la {contact.phone}, {contact.phone2} sau{' '}
        <a href={`mailto:${contact.email}`}>{contact.email}</a>, {contact.schedule}.
      </p>

      <h2>2. Cum se încheie comanda</h2>
      <p>
        Trimiterea unei comenzi sau a unei cereri de ofertă din site nu creează încă un contract. Te contactăm pentru a confirma
        produsul, dimensiunile, finisajul, prețul final, costul transportului și termenul. Contractul se consideră încheiat în
        momentul în care confirmăm comanda în scris (email sau mesaj) și primim avansul agreat.
      </p>

      <h2>3. Prețuri și plată</h2>
      <ul>
        <li>Prețurile sunt afișate în lei (RON).{company.vatPayer === true && ' Prețurile includ TVA.'}{company.vatPayer === false && ' Firma nu este plătitoare de TVA.'}</li>
        <li>Costul transportului nu este inclus în prețul produsului și îți este comunicat înainte de plată.</li>
        <li>Plata se face prin transfer bancar, în avans sau în tranșele stabilite la confirmarea comenzii.</li>
        <li>Pentru proiectele personalizate, prețul este cel din oferta scrisă acceptată de tine.</li>
      </ul>

      <h2>4. Execuție și livrare</h2>
      <p>
        Produsele sunt fabricate la comandă. Termenul de execuție este cel comunicat la confirmarea comenzii (pentru produsele de
        serie, de regulă 10 zile lucrătoare), la care se adaugă timpul de transport. Livrarea se face prin curier sau transport
        dedicat, la adresa indicată de tine. La primire, te rugăm să verifici coletul și să notezi pe documentul de transport
        orice deteriorare vizibilă.
      </p>

      <h2>5. Dreptul de retragere și retururi</h2>
      <p>
        Pentru produsele standard cumpărate online ai dreptul să te retragi din contract în 14 zile de la primire, fără să
        motivezi decizia. Produsele realizate după specificațiile tale sau personalizate clar sunt exceptate de la acest drept
        (OUG 34/2014, art. 16 lit. c). Detaliile complete sunt în <a href="/politica-retur.html">Politica de retur</a>.
      </p>

      <h2>6. Garanție și conformitate</h2>
      <p>
        Răspundem pentru conformitatea produselor conform legii (OUG 140/2021 privind vânzarea de bunuri). Dacă produsul are un defect de
        fabricație sau nu corespunde comenzii confirmate, îl reparăm, îl înlocuim sau îți rambursăm suma, fără costuri
        suplimentare pentru tine.
      </p>

      <h2>7. Clienți persoane juridice (B2B)</h2>
      <p>
        Pentru comenzile firmelor se aplică oferta tehnică și comercială acceptată, care stabilește specificațiile, toleranțele,
        prețul, avansul, termenele de livrare și condițiile de recepție. Prevederile privind dreptul de retragere se aplică
        doar consumatorilor.
      </p>

      <h2>8. Proprietate intelectuală</h2>
      <p>
        Textele, fotografiile, randările și desenele de pe site aparțin {BRAND_NAME} și nu pot fi copiate fără acordul nostru
        scris. Fișierele și desenele trimise de tine rămân proprietatea ta și sunt folosite doar pentru oferta și execuția
        comenzii tale.
      </p>

      <h2>9. Litigii</h2>
      <p>
        Încercăm să rezolvăm orice nemulțumire direct și rapid. Dacă nu ajungem la o soluție, te poți adresa Autorității
        Naționale pentru Protecția Consumatorilor (<a href="https://anpc.ro" target="_blank" rel="noopener noreferrer">anpc.ro</a>) sau
        poți folosi procedura de soluționare alternativă a litigiilor (
        <a href="https://anpc.ro/ce-este-sal/" target="_blank" rel="noopener noreferrer">SAL</a>). Litigiile nesoluționate pe cale
        amiabilă sunt de competența instanțelor din România.
      </p>
    </LegalLayout>
  );
}

function PrivacyContent() {
  return (
    <LegalLayout title="Politica de confidențialitate" path="/politica-confidentialitate">
      <h2>1. Operatorul datelor</h2>
      <p>
        Operatorul datelor tale personale este {companyLine()}. Pentru orice întrebare despre datele tale scrie-ne la{' '}
        <a href={`mailto:${contact.email}`}>{contact.email}</a>.
      </p>

      <h2>2. Ce date colectăm</h2>
      <ul>
        <li>Datele pe care le completezi în formulare: nume, firmă, telefon, email, adresă de livrare și detaliile cererii.</li>
        <li>Fișierele pe care le încarci (schițe, desene tehnice, fotografii).</li>
        <li>Conținutul coșului de cumpărături, salvat doar în browserul tău (localStorage), ca să nu se piardă la reîncărcarea paginii.</li>
      </ul>

      <h2>3. De ce le folosim și pe ce bază legală</h2>
      <ul>
        <li><strong>Ofertare și executarea comenzii</strong> — pentru a-ți trimite oferta și a livra produsul (art. 6 alin. 1 lit. b GDPR).</li>
        <li><strong>Obligații legale</strong> — facturare și evidență contabilă (art. 6 alin. 1 lit. c GDPR).</li>
        <li><strong>Consimțământ</strong> — bifa din formular, pe care o poți retrage oricând (art. 6 alin. 1 lit. a GDPR).</li>
      </ul>
      <p>Nu folosim datele tale pentru marketing fără acordul tău separat și nu le vindem nimănui.</p>

      <h2>4. Cui le transmitem</h2>
      <ul>
        <li>Furnizorului de găzduire a site-ului (Vercel) și serviciului de trimitere email (Resend sau FormSubmit), doar pentru a ne livra cererea ta.</li>
        <li>Fabricii partenere și firmei de transport, strict cu datele necesare execuției și livrării comenzii.</li>
        <li>Autorităților, doar când legea ne obligă.</li>
      </ul>
      <p>Unii dintre acești furnizori pot procesa date în afara Uniunii Europene, cu garanțiile prevăzute de GDPR (clauze contractuale standard).</p>

      <h2>5. Cât timp le păstrăm</h2>
      <p>
        Cererile de ofertă neconcretizate le păstrăm cel mult 2 ani. Datele legate de comenzi și facturi le păstrăm pe durata
        impusă de legislația contabilă.
      </p>

      <h2>6. Drepturile tale</h2>
      <p>
        Ai dreptul de acces, rectificare, ștergere, restricționare, portabilitate și opoziție, precum și dreptul de a-ți retrage
        consimțământul. Ne scrii la <a href={`mailto:${contact.email}`}>{contact.email}</a> și răspundem în cel mult 30 de zile.
        Ai și dreptul de a depune o plângere la Autoritatea Națională de Supraveghere a Prelucrării Datelor cu Caracter Personal (
        <a href="https://www.dataprotection.ro" target="_blank" rel="noopener noreferrer">dataprotection.ro</a>).
      </p>

      <h2>7. Cookie-uri</h2>
      <p>
        Cookie-urile de analiză și marketing (Google Analytics, Google Ads, Meta Pixel) se încarcă{' '}
        <strong>numai după ce apeși „Accept"</strong> în bannerul de cookie-uri. Dacă refuzi, site-ul funcționează
        normal, fără aceste scripturi. Îți poți schimba alegerea oricând ștergând datele site-ului din browser;
        bannerul va apărea din nou.
      </p>
      <p>
        Coșul de cumpărături și alegerea ta privind cookie-urile sunt salvate local în browser (localStorage) și
        nu sunt transmise nimănui.
      </p>
    </LegalLayout>
  );
}

export function TermsPage() {
  return (
    <SiteShell>
      <TermsContent />
    </SiteShell>
  );
}

export function PrivacyPage() {
  return (
    <SiteShell>
      <PrivacyContent />
    </SiteShell>
  );
}
