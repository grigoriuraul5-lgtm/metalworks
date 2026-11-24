// ─────────────────────────────────────────────────────────────────────────────
// Articolele blogului. CUM ADAUGI UN ARTICOL NOU:
//   1. Copiezi un obiect de mai jos și schimbi `slug` (unic, fără diacritice).
//   2. Scrii conținutul în Markdown în `body`. Titlurile `##` intră automat
//      în Cuprins.
//   3. Publici pe GitHub: apare singur în /blog, în sitemap.xml și în llms.txt.
// ─────────────────────────────────────────────────────────────────────────────

export const BLOG_CATEGORIES = ['Debitare Laser', 'Somiere Serie', 'Ghiduri Tehnice'];

export const POSTS = [
  {
    slug: 'cum-pregatesti-fisier-dxf-debitare-laser',
    title: 'Cum pregătești un fișier DXF pentru debitare laser (și eviți redesenarea)',
    description:
      'Checklist practic pentru ingineri, arhitecți și producători: scară, contururi închise, straturi, text convertit în curbe și ce informații trimiți odată cu fișierul ca să primești cotația din prima.',
    category: 'Debitare Laser',
    date: '2026-11-18',
    readMinutes: 6,
    body: `
Un fișier DXF bine pregătit înseamnă o ofertă primită în 24 de ore și piese tăiate exact cum le-ai desenat. Un fișier pregătit greșit înseamnă întrebări, redesenare și zile pierdute. Mai jos găsești exact ce verificăm noi când primim un fișier, ca să-l poți verifica tu înainte.

## Desenează la scara 1:1, în milimetri

Laserul taie exact geometria din fișier. Dacă desenul e la scară 1:10 sau în inch, piesa iese de zece ori mai mică sau într-o unitate greșită. Înainte să exporți:

- setează unitățile desenului în **milimetri**;
- verifică o cotă cunoscută (de exemplu lățimea totală) cu instrumentul de măsurare din CAD;
- exportă doar piesa, nu tot planul cu chenar, indicator și cote.

## Contururile trebuie să fie închise

Laserul urmează un traseu continuu. O linie care nu se închide cu 0,01 mm lasă piesa prinsă în tablă sau produce o tăietură greșită. Verifică:

- că fiecare contur exterior și fiecare gaură sunt **polilinii închise**;
- că nu există **linii duplicate** suprapuse (dublează timpul de tăiere și pot arde marginea);
- că nu există segmente minuscule rămase din editări.

Majoritatea programelor au o comandă de tip „join” sau „overkill” care rezolvă automat aceste probleme.

## Separă pe straturi ce se taie de ce se gravează

Dacă piesa are și marcaje (numere de reper, linii de îndoire, logo), pune-le pe un strat separat, numit clar — de exemplu \`TAIERE\`, \`GRAVARE\`, \`INDOIRE\`. Altfel există riscul ca o linie de îndoire să fie tăiată complet.

## Convertește textul în curbe

Fonturile nu se transferă întotdeauna între calculatoare. Un text care arată bine la tine poate apărea la noi cu alt font sau deloc. Convertește orice text în contururi (explode / text to geometry) înainte de export.

## Respectă dimensiunile minime raportate la grosime

Ca regulă practică, o gaură sau o fantă nu ar trebui să fie mai mică decât grosimea materialului. La tablă de 6 mm, o gaură de 3 mm poate ieși neregulată sau deloc. Dacă ai nevoie de detalii foarte fine pe material gros, scrie-ne: găsim împreună soluția (altă grosime, găurire ulterioară sau alt proces).

## Ce trimiți odată cu fișierul

Fișierul spune forma. Pentru o cotație corectă mai avem nevoie de:

1. **Materialul** — oțel carbon, inox, Corten.
2. **Grosimea** în milimetri.
3. **Cantitatea** pe fiecare reper.
4. **Finisajul** — brut, sablat, vopsit electrostatic (cu codul RAL).
5. **Termenul** dorit și localitatea de livrare.

Dacă lucrezi în 3D, trimite și fișierul **STEP**: ne ajută la piesele cu îndoiri și la ansamblurile sudate.

## Nu ai DXF? Nu e o problemă

Acceptăm și PDF cotat sau chiar o schiță fotografiată cu dimensiunile scrise de mână. Partea de proiectare tehnică o facem noi, iar desenul de execuție îți este trimis spre aprobare înainte de producție.
`,
  },
  {
    slug: 'cadre-metalice-somiere-ce-verifici-la-furnizor',
    title: 'Cadre metalice pentru somiere: ce verifici la un furnizor de serie',
    description:
      'Ghid pentru fabrici de mobilă și achizitori HoReCa: capacitate reală, precizia perforării pentru casete, finisaj, ambalare și cum structurezi o comandă de serie fără întârzieri.',
    category: 'Somiere Serie',
    date: '2026-11-18',
    readMinutes: 5,
    body: `
Pentru o fabrică de mobilă sau un lanț de hoteluri, cadrul metalic al somierei e o componentă simplă, dar critică: dacă perforațiile nu sunt la pas, casetele nu intră; dacă livrarea întârzie, linia de asamblare stă. Iată ce merită verificat înainte să alegi un furnizor.

## Capacitatea reală, nu cea declarată

Întreabă câte bucăți poate livra furnizorul **într-un interval fix** și cum se schimbă termenul la volume mai mari. La KRAFT Metalworks planificăm loturi de **500–1.000 de cadre la fiecare 2 săptămâni**, iar pentru comenzi recurente rezervăm capacitatea în avans, ca să știi exact când intră marfa în depozit.

## Precizia perforării pentru casete

Casetele de plastic pentru lamele se fixează în găuri executate la pas constant. La cadrele noastre:

- pasul de perforare este de **38 mm**;
- găurile au **ø 8,2 mm**;
- sistemul este compatibil cu **casete de 68 × 8 mm** și lamele din fag.

Cere întotdeauna o mostră și montează pe ea casetele pe care le folosești deja în producție. E cel mai sigur test.

## Sudura și rigiditatea cadrului

Un cadru care se deformează la transport sau la montaj devine o reclamație. Verifică tipul de sudură (MIG/TIG), dacă colțurile sunt sudate complet și dacă furnizorul controlează diagonalele cadrului, ca acesta să rămână drept.

## Finisajul

Vopsirea în câmp electrostatic oferă un strat uniform, rezistent la zgârieturi la montaj și la utilizare. Stabilește de la început culoarea (cod RAL) și dacă ai nevoie de aceeași nuanță pe mai multe loturi.

## Ambalarea și livrarea

La serie, ambalarea contează la fel de mult ca piesa. Discută cum sunt paletizate cadrele, câte bucăți intră pe palet și cine se ocupă de transport. Un furnizor bun îți propune ambalarea care se potrivește cu felul în care descarci și depozitezi.

## Cum structurezi comanda

1. Trimite desenul sau dimensiunile cadrului și cantitatea estimată pe lună.
2. Primești oferta tehnică și de preț, plus termenul pe loturi.
3. Aprobi mostra.
4. Lansăm producția în loturi, cu livrări la date fixe.

Ai un volum de discutat? Pe pagina [Cadre metalice pentru somiere](/somiere-metalice-serie) găsești fișa tehnică și poți cere cotația de serie direct.
`,
  },
  {
    slug: 'pretul-debitarii-laser-ce-il-influenteaza',
    title: 'Cât costă debitarea laser? Cei 6 factori care fac prețul',
    description:
      'De ce două piese cu aceeași suprafață pot avea prețuri diferite: material, grosime, lungimea de tăiere, numărul de străpungeri, cantitatea și finisajul. Plus cum reduci costul fără să schimbi funcția piesei.',
    category: 'Ghiduri Tehnice',
    date: '2026-11-18',
    readMinutes: 5,
    body: `
„Cât costă metrul de debitare laser?” este întrebarea pe care o primim cel mai des. Răspunsul cinstit: prețul nu se calculează la metru pătrat de tablă, ci după timpul de mașină și materialul folosit. Iată ce intră, concret, în preț.

## 1. Materialul

Oțelul carbon, inoxul și oțelul Corten au prețuri de achiziție foarte diferite și se taie diferit. Inoxul, de exemplu, este mai scump ca material și cere alți parametri de tăiere.

## 2. Grosimea

Cu cât tabla este mai groasă, cu atât laserul taie mai încet. O piesă din tablă de 10 mm poate dura de câteva ori mai mult decât aceeași piesă din 2 mm.

## 3. Lungimea totală de tăiere

Contează perimetrul tuturor contururilor, nu suprafața piesei. Un panou decorativ cu multe decupaje are mult mai mulți metri de tăiere decât o placă simplă de aceeași mărime.

## 4. Numărul de străpungeri

Fiecare gaură sau decupaj interior începe cu o străpungere a materialului, care consumă timp. O piesă cu 200 de găuri mici costă mai mult decât una cu un singur decupaj mare.

## 5. Cantitatea

Pregătirea fișierului, încărcarea mașinii și reglajele se fac o singură dată pe comandă. La o bucată, aceste costuri se încarcă pe un singur reper; la 500 de bucăți, se împart. De aceea **prețul pe bucată scade vizibil odată cu volumul**.

## 6. Operațiile după debitare

Debavurare, îndoire, sudură, sablare, vopsire electrostatică — fiecare se adaugă la preț. Uneori e mai ieftin să cumperi totul de la același furnizor decât să muți piesele între ateliere.

## Cum reduci costul fără să schimbi funcția piesei

- Elimină decupajele pur decorative acolo unde nu se văd.
- Folosește cea mai mică grosime care își face treaba structural.
- Grupează mai multe repere în aceeași comandă, ca să se taie din aceeași tablă.
- Comandă o cantitate anuală și primește livrări pe loturi.

Cel mai rapid mod de a afla prețul real este să ne trimiți fișierul. Pe pagina [Debitare laser țeavă și tablă](/debitare-laser-teava-tabla) îl poți încărca direct și primești cotația în 24 de ore lucrătoare.
`,
  },
  {
    slug: 'picioare-masa-metalice-cum-alegi-profilul',
    title: 'Picioare de masă metalice: cum alegi forma, profilul și înălțimea',
    description:
      'Ghid pentru tâmplari, designeri și cumpărători: înălțimea corectă pentru dining, birou și cafenea, ce formă se potrivește cu ce blat și de ce contează profilul metalic.',
    category: 'Ghiduri Tehnice',
    date: '2026-11-18',
    readMinutes: 5,
    body: `
Picioarele metalice schimbă complet aspectul unei mese — dar o alegere greșită de înălțime sau formă se simte la fiecare utilizare. Iată criteriile pe care le folosim când recomandăm un model.

## Înălțimea, în funcție de utilizare

- **Masă de dining sau birou:** înălțimea totală obișnuită este în jur de 72–76 cm, inclusiv blatul.
- **Masă de cafenea / bistro:** de regulă tot în zona 72–75 cm, dar cu blat mai mic.
- **Măsuță de cafea:** mult mai joasă, în funcție de canapea.

Scade grosimea blatului din înălțimea totală dorită ca să afli ce înălțime trebuie să aibă piciorul.

## Forma, în funcție de blat

- **Picioare tip U, X sau H** — perechi laterale, potrivite pentru blaturi lungi și dreptunghiulare.
- **Picior central** (de exemplu tip cruce sau oval) — pentru blaturi rotunde sau pătrate, lasă loc complet pentru scaune.
- **Picioare individuale la colțuri** — aspect ușor, pentru blaturi mai mici.

## Profilul metalic

Profilul (secțiunea țevii sau a platbandei) dă și rigiditatea, și caracterul vizual. Un profil gros, de 100 × 100 mm, arată masiv și industrial; un profil subțire arată aerisit și scandinav. Pentru blaturi lungi și grele recomandăm profiluri mai mari, ca masa să nu se miște.

## Finisajul

Vopsirea electrostatică în negru mat sau alb mat este cea mai cerută: rezistentă la zgârieturi și ușor de întreținut. Pentru alte culori din paleta RAL, cere o ofertă personalizată.

## Montajul

Verifică dacă picioarele vin cu plăcuțe de prindere găurite și dacă grosimea blatului permite șuruburi suficient de lungi. Pentru blaturi din piatră sau sticlă, prinderea se discută separat.

Toate modelele noastre de serie sunt în [colecția de picioare de masă](/picioare-masa-metalice), cu prețuri afișate. Dacă ai nevoie de altă dimensiune, o producem la comandă.
`,
  },
];

export function getPost(slug) {
  return POSTS.find((p) => p.slug === slug);
}
