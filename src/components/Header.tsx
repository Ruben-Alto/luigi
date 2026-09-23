import React, { useState, useRef, useEffect } from 'react';
import { Menu, X, Phone, ChevronDown, Sparkles, DoorClosed, DoorOpen, Armchair } from 'lucide-react';
import { ActiveTab, ServiceId } from '../types';
import { BUSINESS_INFO, SERVICES_DATA } from '../data/content';

interface HeaderProps {
  activeTab: ActiveTab;
  onSelectTab: (tab: ActiveTab) => void;
  onSelectService: (serviceId: ServiceId) => void;
  onOpenWhatsApp: (customMessage?: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  onSelectTab,
  onSelectService,
  onOpenWhatsApp
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Cerrar dropdown al hacer click fuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setServicesDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleServiceClick = (serviceId: ServiceId) => {
    onSelectService(serviceId);
    setServicesDropdownOpen(false);
    setMobileMenuOpen(false);
  };

  const handleNavClick = (tab: ActiveTab) => {
    onSelectTab(tab);
    setMobileMenuOpen(false);
    setServicesDropdownOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const getServiceIcon = (name: string) => {
    switch (name) {
      case 'DoorClosed': return <DoorClosed className="w-4 h-4 text-[#2F4F3A]" />;
      case 'DoorOpen': return <DoorOpen className="w-4 h-4 text-[#2F4F3A]" />;
      case 'Armchair': return <Armchair className="w-4 h-4 text-[#2F4F3A]" />;
      default: return <Sparkles className="w-4 h-4 text-[#2F4F3A]" />;
    }
  };

  return (
    <>
      <header
        id="main-header"
        className="fixed top-0 left-0 right-0 h-16 bg-[#F5F1EA] border-b border-[#B08C4F]/60 z-50 transition-shadow duration-200 shadow-xs"
      >
        <div className="max-w-7xl mx-auto h-full px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Móvil: Menú hamburguesa */}
          <div className="flex items-center md:hidden">
            <button
              id="mobile-menu-toggle-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-[#343434] hover:text-[#2F4F3A] focus:outline-none"
              aria-label="Abrir menú de navegación"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>

          {/* Logotipo */}
          <div className="flex items-center space-x-2">
            <button
              id="brand-logo-btn"
              onClick={() => handleNavClick('inicio')}
              className="text-left group cursor-pointer focus:outline-none"
            >
              <span className="block font-sans font-bold text-lg sm:text-xl tracking-tight text-[#343434] group-hover:text-[#2F4F3A] transition-colors">
                Arribas Martín
              </span>
              <span className="hidden sm:block text-[11px] uppercase tracking-wider text-[#6B6B6B] font-medium">
                Taller ebanista en Tetuán · Desde 1969
              </span>
            </button>
          </div>

          {/* Navegación Desktop */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-4" aria-label="Navegación principal">
            <button
              id="nav-inicio-btn"
              onClick={() => handleNavClick('inicio')}
              className={`px-3 py-2 text-sm font-medium transition-colors cursor-pointer rounded-md ${
                activeTab === 'inicio'
                  ? 'text-[#2F4F3A] font-semibold bg-[#E3D9CC]/40 border-b-2 border-[#2F4F3A]'
                  : 'text-[#343434] hover:text-[#2F4F3A] hover:bg-[#E3D9CC]/20'
              }`}
            >
              Inicio
            </button>

            {/* Dropdown Servicios */}
            <div className="relative" ref={dropdownRef}>
              <button
                id="nav-servicios-dropdown-btn"
                onClick={() => setServicesDropdownOpen(!servicesDropdownOpen)}
                className={`flex items-center space-x-1 px-3 py-2 text-sm font-medium transition-colors cursor-pointer rounded-md ${
                  activeTab === 'servicios'
                    ? 'text-[#2F4F3A] font-semibold bg-[#E3D9CC]/40 border-b-2 border-[#2F4F3A]'
                    : 'text-[#343434] hover:text-[#2F4F3A] hover:bg-[#E3D9CC]/20'
                }`}
                aria-expanded={servicesDropdownOpen}
              >
                <span>Servicios</span>
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${servicesDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {servicesDropdownOpen && (
                <div className="absolute left-0 mt-2 w-72 bg-[#FFFFFF] rounded-xl shadow-xl border border-[#B08C4F]/30 p-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                  <div className="px-3 py-2 text-xs font-semibold text-[#6B6B6B] uppercase tracking-wider border-b border-[#E3D9CC]">
                    Especialidades del Taller
                  </div>
                  {Object.values(SERVICES_DATA).map((srv) => (
                    <button
                      key={srv.id}
                      id={`dropdown-srv-${srv.id}`}
                      onClick={() => handleServiceClick(srv.id)}
                      className="w-full flex items-start space-x-3 p-2.5 rounded-lg hover:bg-[#F5F1EA] text-left transition-colors group cursor-pointer"
                    >
                      <div className="mt-0.5 p-1.5 rounded-md bg-[#E3D9CC]/40 group-hover:bg-[#2F4F3A]/10">
                        {getServiceIcon(srv.iconName)}
                      </div>
                      <div>
                        <span className="block text-sm font-semibold text-[#343434] group-hover:text-[#2F4F3A]">
                          {srv.title}
                        </span>
                        <span className="block text-xs text-[#6B6B6B] line-clamp-1">
                          {srv.subtitle}
                        </span>
                      </div>
                    </button>
                  ))}
                  <div className="pt-2 mt-1 border-t border-[#E3D9CC]">
                    <button
                      id="dropdown-ver-todos-btn"
                      onClick={() => handleNavClick('servicios')}
                      className="w-full text-center py-1.5 text-xs font-semibold text-[#2F4F3A] hover:underline"
                    >
                      Ver todos los servicios en detalle →
                    </button>
                  </div>
                </div>
              )}
            </div>

            <button
              id="nav-proyectos-btn"
              onClick={() => handleNavClick('proyectos')}
              className={`px-3 py-2 text-sm font-medium transition-colors cursor-pointer rounded-md ${
                activeTab === 'proyectos'
                  ? 'text-[#2F4F3A] font-semibold bg-[#E3D9CC]/40 border-b-2 border-[#2F4F3A]'
                  : 'text-[#343434] hover:text-[#2F4F3A] hover:bg-[#E3D9CC]/20'
              }`}
            >
              Proyectos
            </button>

            <button
              id="nav-blog-btn"
              onClick={() => handleNavClick('blog')}
              className={`px-3 py-2 text-sm font-medium transition-colors cursor-pointer rounded-md ${
                activeTab === 'blog'
                  ? 'text-[#2F4F3A] font-semibold bg-[#E3D9CC]/40 border-b-2 border-[#2F4F3A]'
                  : 'text-[#343434] hover:text-[#2F4F3A] hover:bg-[#E3D9CC]/20'
              }`}
            >
              Blog
            </button>

            <button
              id="nav-contacto-btn"
              onClick={() => handleNavClick('contacto')}
              className={`px-3 py-2 text-sm font-medium transition-colors cursor-pointer rounded-md ${
                activeTab === 'contacto'
                  ? 'text-[#2F4F3A] font-semibold bg-[#E3D9CC]/40 border-b-2 border-[#2F4F3A]'
                  : 'text-[#343434] hover:text-[#2F4F3A] hover:bg-[#E3D9CC]/20'
              }`}
            >
              Contacto
            </button>
          </nav>

          {/* Botones de acción derecha */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            <a
              id="header-call-btn"
              href={`tel:${BUSINESS_INFO.phoneRaw}`}
              className="hidden lg:inline-flex items-center space-x-1 text-sm font-medium text-[#343434] hover:text-[#2F4F3A] px-2.5 py-1.5 rounded-lg border border-[#343434]/20 hover:border-[#2F4F3A] transition-colors"
              title="Llamar directamente al taller"
            >
              <Phone className="w-3.5 h-3.5 text-[#2F4F3A]" />
              <span>{BUSINESS_INFO.phone}</span>
            </a>

            {/* Botón WhatsApp circular en móvil / botón con texto en desktop */}
            <button
              id="header-whatsapp-cta-btn"
              onClick={() => onOpenWhatsApp()}
              className="md:hidden w-11 h-11 bg-[#2F4F3A] hover:bg-[#243E2E] text-white rounded-full flex items-center justify-center shadow-sm active:scale-95 transition-transform"
              aria-label="Abrir WhatsApp para orientación"
            >
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
              </svg>
            </button>

            <button
              id="desktop-header-whatsapp-btn"
              onClick={() => onOpenWhatsApp()}
              className="hidden md:inline-flex items-center space-x-2 bg-[#2F4F3A] hover:bg-[#243E2E] text-white text-sm font-semibold px-4 py-2 rounded-lg shadow-sm hover:shadow transition-all cursor-pointer"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
              </svg>
              <span>Fotos por WhatsApp</span>
            </button>
          </div>
        </div>
      </header>

      {/* Menú Desplegable Overlay Móvil */}
      {mobileMenuOpen && (
        <div
          id="mobile-menu-overlay"
          className="fixed inset-0 bg-[#F5F1EA] z-50 flex flex-col p-6 overflow-y-auto animate-in fade-in duration-200"
        >
          <div className="flex items-center justify-between pb-6 border-b border-[#E3D9CC]">
            <div>
              <span className="font-sans font-bold text-xl text-[#343434]">Arribas Martín</span>
              <p className="text-xs text-[#6B6B6B]">Taller de lacado en Tetuán desde 1969</p>
            </div>
            <button
              id="mobile-menu-close-btn"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 text-[#343434] hover:text-[#2F4F3A]"
              aria-label="Cerrar menú"
            >
              <X className="w-7 h-7" />
            </button>
          </div>

          {/* Botones de contacto prioritarios en el menú */}
          <div className="py-6 space-y-3">
            <button
              id="menu-overlay-whatsapp-cta"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenWhatsApp();
              }}
              className="w-full flex items-center justify-center space-x-2 bg-[#2F4F3A] text-white font-semibold py-3.5 px-4 rounded-lg shadow-sm"
            >
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
              </svg>
              <span>Enviar fotos por WhatsApp</span>
            </button>

            <a
              id="menu-overlay-call-cta"
              href={`tel:${BUSINESS_INFO.phoneRaw}`}
              className="w-full flex items-center justify-center space-x-2 bg-transparent border-1.5 border-[#2F4F3A] text-[#2F4F3A] font-semibold py-3 px-4 rounded-lg"
            >
              <Phone className="w-4 h-4" />
              <span>Llamar al taller: {BUSINESS_INFO.phone}</span>
            </a>
          </div>

          {/* Enlaces de navegación móvil */}
          <div className="flex flex-col space-y-1 divide-y divide-[#E3D9CC]">
            <button
              onClick={() => handleNavClick('inicio')}
              className="py-3.5 text-left font-sans text-lg font-medium text-[#343434] hover:text-[#2F4F3A]"
            >
              Inicio
            </button>

            <div className="py-3">
              <button
                onClick={() => handleNavClick('servicios')}
                className="w-full flex items-center justify-between font-sans text-lg font-medium text-[#343434] hover:text-[#2F4F3A]"
              >
                <span>Servicios (4 especialidades)</span>
              </button>
              <div className="mt-2 pl-3 space-y-2 border-l-2 border-[#2F4F3A]/30">
                {Object.values(SERVICES_DATA).map((srv) => (
                  <button
                    key={srv.id}
                    onClick={() => handleServiceClick(srv.id)}
                    className="block text-sm text-[#6B6B6B] hover:text-[#2F4F3A] py-1 text-left"
                  >
                    • {srv.title}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={() => handleNavClick('proyectos')}
              className="py-3.5 text-left font-sans text-lg font-medium text-[#343434] hover:text-[#2F4F3A]"
            >
              Proyectos (Galería & Simulador)
            </button>

            <button
              onClick={() => handleNavClick('blog')}
              className="py-3.5 text-left font-sans text-lg font-medium text-[#343434] hover:text-[#2F4F3A]"
            >
              Blog & Casos por Barrio
            </button>

            <button
              onClick={() => handleNavClick('contacto')}
              className="py-3.5 text-left font-sans text-lg font-medium text-[#343434] hover:text-[#2F4F3A]"
            >
              Contacto & Taller Tetuán
            </button>
          </div>

          {/* Pie del menú móvil */}
          <div className="mt-auto pt-6 border-t border-[#E3D9CC] text-xs text-[#6B6B6B] space-y-1">
            <p className="font-semibold text-[#343434]">{BUSINESS_INFO.name} S.L.</p>
            <p>{BUSINESS_INFO.address}</p>
            <p>Horario: {BUSINESS_INFO.schedule}</p>
          </div>
        </div>
      )}
    </>
  );
};
