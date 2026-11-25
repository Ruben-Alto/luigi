const CLARITY_ID = import.meta.env.VITE_CLARITY_ID as string | undefined;

let clarityLoaded = false;

export function loadAnalytics(): void {
  if (typeof (window as any).gtag === 'function') {
    (window as any).gtag('consent', 'update', { analytics_storage: 'granted' });
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
  if (typeof (window as any).gtag === 'function') {
    (window as any).gtag('event', name, params || {});
  }
}

export function trackPageView(path: string): void {
  if (typeof (window as any).gtag === 'function') {
    (window as any).gtag('event', 'page_view', {
      page_location: window.location.href,
      page_path: path,
    });
  }
}

export const hasGaId = true;
export const hasClarityId = !!CLARITY_ID;