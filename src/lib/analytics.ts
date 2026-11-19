const GA_ID = import.meta.env.VITE_GA_ID as string | undefined;
const CLARITY_ID = import.meta.env.VITE_CLARITY_ID as string | undefined;

let gaLoaded = false;
let clarityLoaded = false;

function ensureGtag(): ((...args: any[]) => void) | null {
  if (!GA_ID) return null;
  (window as any).dataLayer = (window as any).dataLayer || [];
  if (typeof (window as any).gtag !== 'function') {
    (window as any).gtag = function (...args: any[]) {
      (window as any).dataLayer.push(args);
    };
  }
  return (window as any).gtag;
}

export function loadAnalytics(): void {
  if (GA_ID && !gaLoaded) {
    gaLoaded = true;
    const gtag = ensureGtag();
    if (gtag) {
      gtag('consent', 'default', {
        ad_storage: 'denied',
        analytics_storage: 'denied',
        ad_user_data: 'denied',
        ad_personalization: 'denied',
      });
      gtag('consent', 'update', { analytics_storage: 'granted' });
      gtag('js', new Date());
      gtag('config', GA_ID, { send_page_view: true });

      if (!document.querySelector(`script[src="https://www.googletagmanager.com/gtag/js?id=${GA_ID}"]`)) {
        const script = document.createElement('script');
        script.async = true;
        script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
        document.head.appendChild(script);
      }
    }
  }

  if (CLARITY_ID && !clarityLoaded) {
    clarityLoaded = true;
    (function (c: any, l: any, a: any, r: any, i: any, t: any, y: any) {
      c[a] =
        c[a] ||
        function () {
          (c[a].q = c[a].q || []).push(arguments);
        };
      t = l.createElement(r);
      t.async = 1;
      t.src = 'https://www.clarity.ms/tag/' + i;
      y = l.getElementsByTagName(r)[0];
      y.parentNode.insertBefore(t, y);
    })(window, document, 'clarity', 'script', CLARITY_ID, null, null);
  }
}

export function trackEvent(name: string, params?: Record<string, any>): void {
  if (!GA_ID) return;
  const gtag = ensureGtag();
  if (!gaLoaded) loadAnalytics();
  gtag?.('event', name, params || {});
}

export function trackPageView(path: string): void {
  if (!GA_ID) return;
  const gtag = ensureGtag();
  if (!gaLoaded) loadAnalytics();
  gtag?.('event', 'page_view', {
    page_location: window.location.href,
    page_path: path,
  });
}

export const hasGaId = !!GA_ID;
export const hasClarityId = !!CLARITY_ID;