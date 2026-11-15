import { useEffect } from 'react';

interface PageMeta {
  title: string;
  description: string;
  path?: string;
}

/**
 * Actualiza de forma dinámica el <title>, las meta etiquetas, la etiqueta
 * <link rel="canonical"> y og:image de la página actual para que cada ruta
 * del SPA tenga su propio título, descripción y URL canónica optimizados para SEO.
 */
export function usePageMeta({ title, description, path = '/' }: PageMeta) {
  useEffect(() => {
    document.title = title;

    const upsertMeta = (name: string, value: string) => {
      let el = document.querySelector(`meta[name="${name}"]`);
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute('name', name);
        document.head.appendChild(el);
      }
      el.setAttribute('content', value);
    };

    upsertMeta('description', description);
    upsertMeta('og:title', title);
    upsertMeta('og:description', description);

    const canonicalBase = 'https://lacadosarribasmartin.es';
    const canonicalUrl = path === '/' ? canonicalBase : `${canonicalBase}${path}`;

    let link = document.querySelector('link[rel="canonical"]');
    if (!link) {
      link = document.createElement('link');
      link.setAttribute('rel', 'canonical');
      document.head.appendChild(link);
    }
    link.setAttribute('href', canonicalUrl);

    let ogImage = document.querySelector('meta[property="og:image"]');
    if (!ogImage) {
      ogImage = document.createElement('meta');
      ogImage.setAttribute('property', 'og:image');
      document.head.appendChild(ogImage);
    }
    ogImage.setAttribute('content', `${canonicalBase}/logo.png`);
  }, [title, description, path]);
}
