import React, { useState, useEffect } from 'react';
import { ActiveTab, ServiceId } from './types';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { WhatsAppButton } from './components/WhatsAppButton';
import { HomeView } from './components/HomeView';
import { ServicesView } from './components/ServicesView';
import { ProjectsView } from './components/ProjectsView';
import { BlogView } from './components/BlogView';
import { ContactView } from './components/ContactView';
import { CookieConsent } from './components/CookieConsent';
import { loadAnalytics, trackEvent, trackPageView } from './lib/analytics';
import { BUSINESS_INFO } from './data/content';
import { usePageMeta } from './hooks/usePageMeta';

const TAB_PATHS: Record<ActiveTab, string> = {
  inicio: '/',
  servicios: '/servicios',
  proyectos: '/proyectos',
  blog: '/blog',
  contacto: '/contacto',
  legal: '/legal',
};

const PATH_TABS: Record<string, ActiveTab> = Object.fromEntries(
  Object.entries(TAB_PATHS).map(([tab, path]) => [path, tab as ActiveTab])
) as Record<string, ActiveTab>;

const tabFromPath = (path: string): ActiveTab => {
  const normalized = path.replace(/\/+$/, '') || '/';
  return PATH_TABS[normalized] ?? 'inicio';
};

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>(() => tabFromPath(window.location.pathname));
  const [selectedServiceId, setSelectedServiceId] = useState<ServiceId | null>(null);
  const [legalSection, setLegalSection] = useState<'aviso' | 'privacidad' | 'cookies'>('aviso');
  const [consent, setConsent] = useState<'pending' | 'analytics' | 'necessary'>(() => {
    const stored = localStorage.getItem('cookie_consent');
    return stored === 'analytics' || stored === 'necessary' ? stored : 'pending';
  });

  const acceptConsent = () => {
    localStorage.setItem('cookie_consent', 'analytics');
    setConsent('analytics');
    loadAnalytics();
  };

  const declineConsent = () => {
    localStorage.setItem('cookie_consent', 'necessary');
    setConsent('necessary');
  };

  const openCookieSettings = () => {
    localStorage.removeItem('cookie_consent');
    setConsent('pending');
  };

  const PAGE_META: Record<ActiveTab, { title: string; description: string }> = {
    inicio: {
      title: 'Lacados Arribas Martín | Armarios Empotrados, Puertas y Muebles en Madrid',
      description:
        'Lacado satinado artesanal de armarios empotrados, puertas de paso y muebles de salón en Chamberí, Plaza de Castilla y Serrano. Taller en Tetuán desde 1969. Presupuesto sin compromiso en menos de 24 h.',
    },
    servicios: {
      title: 'Servicios de Lacado Satinado en Madrid | Arribas Martín',
      description:
        'Lacado profesional de armarios empotrados, puertas de paso y muebles de salón en Chamberí, Plaza de Castilla y Serrano. Acabado sedoso y duradero, sin obras en casa.',
    },
    proyectos: {
      title: 'Proyectos de Lacado Satinado Antes y Después | Madrid',
      description:
        'Galería de proyectos reales de lacado satinado en armarios, puertas y muebles en Chamberí, Plaza de Castilla y Serrano. Ve la transformación antes y después.',
    },
    blog: {
      title: 'Blog de Lacado Satinado y Carpintería | Arribas Martín',
      description:
        'Artículos, guías y casos reales sobre lacado satinado, restauración y acabados en Chamberí, Plaza de Castilla y Serrano, Madrid.',
    },
    contacto: {
      title: 'Contacto | Pedir Presupuesto de Lacado en Madrid',
      description:
        'Envíanos fotos de tus armarios o muebles y te orientamos en menos de 24 h. Taller de lacado en Tetuán, sirve Chamberí, Plaza de Castilla y Serrano.',
    },
    legal: {
      title: 'Aviso Legal y Privacidad | Lacados Arribas Martín',
        description:
          'Aviso legal, política de privacidad y política de cookies de Lacados Arribas Martín. Taller en Tetuán, Manuel Arribas Caballero, Calle de los Voluntarios Catalanes 20B, 28039 Madrid.',
    },
  };

  usePageMeta({ ...PAGE_META[activeTab], path: TAB_PATHS[activeTab] });

  const handleOpenWhatsApp = (customMessage?: string) => {
    const defaultMsg = 'Hola, he visto vuestra web de Lacados Arribas Martín. Me gustaría pedir orientación y presupuesto para lacar en satinado mis armarios, puertas o muebles en Madrid. Os envío fotos.';
    const textToEncode = customMessage || defaultMsg;
    const url = `https://wa.me/${BUSINESS_INFO.whatsappNumber}?text=${encodeURIComponent(textToEncode)}`;
    window.open(url, '_blank');
  };

  const handleSelectService = (serviceId: ServiceId) => {
    setSelectedServiceId(serviceId);
    setActiveTab('servicios');
    const path = TAB_PATHS.servicios;
    if (window.location.pathname !== path) {
      window.history.pushState({ tab: 'servicios' }, '', path);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectTab = (tab: ActiveTab) => {
    setActiveTab(tab);
    const path = TAB_PATHS[tab];
    if (window.location.pathname !== path) {
      window.history.pushState({ tab }, '', path);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenLegal = (section: 'aviso' | 'privacidad' | 'cookies') => {
    setLegalSection(section);
    setActiveTab('legal');
    const path = TAB_PATHS.legal;
    if (window.location.pathname !== path) {
      window.history.pushState({ tab: 'legal' }, '', path);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    if (consent === 'analytics') loadAnalytics();
  }, [consent]);

  useEffect(() => {
    if (consent === 'analytics') trackPageView(TAB_PATHS[activeTab]);
  }, [activeTab, consent]);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (consent !== 'analytics') return;
      const target = e.target as HTMLElement | null;
      const anchor = target?.closest?.('a') as HTMLAnchorElement | null;
      if (anchor && anchor.href) {
        const href = anchor.href;
        if (href.startsWith('https://wa.me') || href.startsWith('https://whatsapp.com') || /whatsapp/i.test(href)) {
          trackEvent('click_whatsapp', { page_location: window.location.href });
        } else if (href.startsWith('tel:')) {
          trackEvent('click_llamada', { page_location: window.location.href });
        }
      }
      const btn = target?.closest?.('button');
      if (btn && /whatsapp/i.test((btn as HTMLElement).textContent || '')) {
        trackEvent('click_whatsapp', { page_location: window.location.href });
      }
    };
    const onSubmit = (e: Event) => {
      if (consent !== 'analytics') return;
      trackEvent('envio_formulario', { page_location: window.location.href });
    };
    document.addEventListener('click', onClick, true);
    document.addEventListener('submit', onSubmit, true);
    return () => {
      document.removeEventListener('click', onClick, true);
      document.removeEventListener('submit', onSubmit, true);
    };
  }, [consent]);
  useEffect(() => {
    const onPopState = () => {
      setActiveTab(tabFromPath(window.location.pathname));
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    window.addEventListener('popstate', onPopState);
    window.scrollTo(0, 0);
    // Sincroniza la URL inicial si no coincide (ej. entrada directa)
    const initialPath = TAB_PATHS[tabFromPath(window.location.pathname)];
    if (window.location.pathname !== initialPath) {
      window.history.replaceState({ tab: tabFromPath(window.location.pathname) }, '', initialPath);
    } else {
      window.history.replaceState({ tab: tabFromPath(window.location.pathname) }, '', window.location.pathname);
    }
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-[#F5F1EA] text-[#343434] selection:bg-[#A4B3A0]/30 selection:text-[#2F4F3A]">
      {/* Header fijo de 64px */}
      <Header
        activeTab={activeTab}
        onSelectTab={handleSelectTab}
        onSelectService={handleSelectService}
        onOpenWhatsApp={handleOpenWhatsApp}
      />

      {/* Contenedor principal con compensación de 64px de altura del header */}
      <main className="flex-1 mt-16">
        {activeTab === 'inicio' && (
          <HomeView
            onSelectTab={handleSelectTab}
            onSelectService={handleSelectService}
            onOpenWhatsApp={handleOpenWhatsApp}
          />
        )}

        {activeTab === 'servicios' && (
          <ServicesView
            selectedServiceId={selectedServiceId}
            onSelectService={handleSelectService}
            onOpenWhatsApp={handleOpenWhatsApp}
          />
        )}

        {activeTab === 'proyectos' && (
          <ProjectsView
            onOpenWhatsApp={handleOpenWhatsApp}
          />
        )}

        {activeTab === 'blog' && (
          <BlogView
            onOpenWhatsApp={handleOpenWhatsApp}
          />
        )}

        {activeTab === 'contacto' && (
          <ContactView
            onOpenWhatsApp={handleOpenWhatsApp}
          />
        )}

        {activeTab === 'legal' && (
          <LegalView
            section={legalSection}
            onClose={() => handleSelectTab('inicio')}
          />
        )}
      </main>

      {/* Botón flotante de WhatsApp siempre accesible */}
      <WhatsAppButton />

      {/* Footer corporativo global */}
      <Footer
        onSelectTab={handleSelectTab}
        onSelectService={handleSelectService}
        onOpenWhatsApp={handleOpenWhatsApp}
        onOpenLegal={handleOpenLegal}
        onOpenCookieSettings={openCookieSettings}
      />
      {consent === 'pending' && (
        <CookieConsent onAccept={acceptConsent} onDecline={declineConsent} />
      )}
    </div>
  );
}

