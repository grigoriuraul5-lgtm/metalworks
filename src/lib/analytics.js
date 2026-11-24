import { tracking } from '../siteConfig.js';

// Măsoară cererile de ofertă, comenzile și contactele, ca să știi ce aduce vânzări.
// Nu încarcă nimic fără consimțământ.

export const CONSENT_KEY = 'kraft-consent-v1';
export const trackingEnabled = () => Boolean(tracking.ga4 || tracking.googleAds || tracking.metaPixel);

let loaded = false;

function addScript(src) {
  const s = document.createElement('script');
  s.async = true;
  s.src = src;
  document.head.appendChild(s);
}

export function loadTracking() {
  if (loaded || typeof window === 'undefined' || !trackingEnabled()) return;
  loaded = true;
  const gId = tracking.ga4 || tracking.googleAds;
  if (gId) {
    window.dataLayer = window.dataLayer || [];
    window.gtag = function gtag() { window.dataLayer.push(arguments); };
    window.gtag('js', new Date());
    if (tracking.ga4) window.gtag('config', tracking.ga4);
    if (tracking.googleAds) window.gtag('config', tracking.googleAds);
    addScript(`https://www.googletagmanager.com/gtag/js?id=${gId}`);
  }
  if (tracking.metaPixel) {
    /* eslint-disable */
    !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');
    /* eslint-enable */
    window.fbq('init', tracking.metaPixel);
    window.fbq('track', 'PageView');
  }
}

export function hasConsent() {
  try { return window.localStorage.getItem(CONSENT_KEY) === 'granted'; } catch { return false; }
}

// Evenimente: 'lead' (formular trimis), 'order' (comandă), 'add_to_cart', 'contact' (WhatsApp/telefon)
export function track(event, params = {}) {
  if (typeof window === 'undefined' || !loaded) return;
  const gtag = window.gtag;
  const fbq = window.fbq;
  if (event === 'lead' || event === 'order') {
    gtag?.('event', 'generate_lead', { currency: 'RON', value: params.value || 0, form: params.form });
    if (tracking.googleAds && tracking.googleAdsLeadLabel) {
      gtag?.('event', 'conversion', { send_to: `${tracking.googleAds}/${tracking.googleAdsLeadLabel}`, value: params.value || 0, currency: 'RON' });
    }
    fbq?.('track', 'Lead', { value: params.value || 0, currency: 'RON' });
  } else if (event === 'add_to_cart') {
    gtag?.('event', 'add_to_cart', { currency: 'RON', value: params.value || 0, items: [{ item_name: params.name }] });
    fbq?.('track', 'AddToCart', { value: params.value || 0, currency: 'RON', content_name: params.name });
  } else if (event === 'contact') {
    gtag?.('event', 'contact', { method: params.method });
    fbq?.('track', 'Contact');
  }
}
