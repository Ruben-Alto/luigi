import React, { useState } from 'react';
import { ActiveTab, ServiceId } from './types';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { WhatsAppButton } from './components/WhatsAppButton';
import { HomeView } from './components/HomeView';
import { ServicesView } from './components/ServicesView';
import { ProjectsView } from './components/ProjectsView';
import { BlogView } from './components/BlogView';
import { ContactView } from './components/ContactView';
import { BUSINESS_INFO } from './data/content';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('inicio');
  const [selectedServiceId, setSelectedServiceId] = useState<ServiceId | null>(null);

  const handleOpenWhatsApp = (customMessage?: string) => {
    const defaultMsg = 'Hola, he visto vuestra web de Lacados Arribas Martín. Me gustaría pedir orientación y presupuesto para lacar en satinado/mate mis armarios, puertas o muebles en Madrid. Os envío fotos.';
    const textToEncode = customMessage || defaultMsg;
    const url = `https://wa.me/${BUSINESS_INFO.whatsappNumber}?text=${encodeURIComponent(textToEncode)}`;
    window.open(url, '_blank');
  };

  const handleSelectService = (serviceId: ServiceId) => {
    setSelectedServiceId(serviceId);
    setActiveTab('servicios');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectTab = (tab: ActiveTab) => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

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
      </main>

      {/* Botón flotante de WhatsApp siempre accesible */}
      <WhatsAppButton />

      {/* Footer corporativo global */}
      <Footer
        onSelectTab={handleSelectTab}
        onSelectService={handleSelectService}
        onOpenWhatsApp={handleOpenWhatsApp}
      />
    </div>
  );
}

