import { useEffect } from 'react';

interface PageMeta {
  title: string;
  description: string;
}

/**
 * Actualiza de forma dinámica el <title> y las meta etiquetas de la página
 * actual para que cada ruta del SPA tenga su propio título y descripción SEO.
 * También sincroniza og:title y og:description para redes sociales.
 */
export function usePageMeta({ title, description }: PageMeta) {
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
  }, [title, description]);
}
