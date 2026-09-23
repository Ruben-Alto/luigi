import React from 'react';
import { ActiveTab, ServiceId } from '../types';
import { BUSINESS_INFO, SERVICES_DATA } from '../data/content';
import { MapPin, Phone, MessageSquare, Clock, ShieldCheck, Award } from 'lucide-react';

interface FooterProps {
  onSelectTab: (tab: ActiveTab) => void;
  onSelectService: (serviceId: ServiceId) => void;
  onOpenWhatsApp: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onSelectTab,
  onSelectService,
  onOpenWhatsApp
}) => {
  return (
    <footer id="global-footer" className="bg-[#C2B39A] text-[#343434] border-t border-[#B08C4F]/40 pt-12 pb-8 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          
          {/* Columna 1: Branding y Storytelling */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <span className="font-sans font-bold text-xl text-[#343434]">
                Arribas Martín
              </span>
            </div>
            <p className="text-xs uppercase tracking-wider text-[#2F4F3A] font-semibold">
              Taller de lacado familiar desde 1969
            </p>
            <p className="text-sm text-[#343434]/90 leading-relaxed">
              Especialistas en lacado artesanal satinado y mate a pistola para armarios empotrados, puertas de paso y muebles de salón en Tetuán, Chamberí y Barrio del Pilar.
            </p>
            <div className="flex items-center space-x-2 text-xs text-[#343434] bg-[#E3D9CC]/70 p-2.5 rounded-lg border border-[#B08C4F]/30">
              <Award className="w-4 h-4 text-[#2F4F3A] shrink-0" />
              <span>Más de 50 años de oficio ininterrumpido en Madrid</span>
            </div>
          </div>

          {/* Columna 2: Especialidades / SEO */}
          <div>
            <h3 className="font-sans text-sm font-bold uppercase tracking-wider text-[#2F4F3A] mb-4">
              Especialidades del Taller
            </h3>
            <ul className="space-y-2.5 text-sm">
              {Object.values(SERVICES_DATA).map((service) => (
                <li key={service.id}>
                  <button
                    onClick={() => {
                      onSelectService(service.id);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="hover:text-[#2F4F3A] hover:translate-x-1 transition-all text-left block text-[#343434]/90 cursor-pointer"
                  >
                    • {service.title}
                  </button>
                </li>
              ))}
              <li className="pt-2">
                <button
                  onClick={() => {
                    onSelectTab('proyectos');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="text-xs font-semibold text-[#2F4F3A] underline underline-offset-4 hover:text-[#243E2E]"
                >
                  Ver proyectos antes/después →
                </button>
              </li>
            </ul>
          </div>

          {/* Columna 3: Contacto y Ubicación Tetuán */}
          <div>
            <h3 className="font-sans text-sm font-bold uppercase tracking-wider text-[#2F4F3A] mb-4">
              Taller en Tetuán
            </h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start space-x-2">
                <MapPin className="w-4 h-4 text-[#2F4F3A] shrink-0 mt-0.5" />
                <span>
                  <strong className="block text-[#343434]">{BUSINESS_INFO.street}</strong>
                  <span className="text-xs text-[#343434]/80">{BUSINESS_INFO.postalCode} {BUSINESS_INFO.district}, {BUSINESS_INFO.city}</span>
                </span>
              </li>
              <li className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-[#2F4F3A] shrink-0" />
                <a
                  href={`tel:${BUSINESS_INFO.phoneRaw}`}
                  className="hover:text-[#2F4F3A] font-medium"
                >
                  {BUSINESS_INFO.phone}
                </a>
              </li>
              <li className="flex items-center space-x-2">
                <MessageSquare className="w-4 h-4 text-[#2F4F3A] shrink-0" />
                <button
                  onClick={onOpenWhatsApp}
                  className="hover:text-[#2F4F3A] font-semibold text-[#2F4F3A] underline cursor-pointer"
                >
                  WhatsApp: {BUSINESS_INFO.whatsappDisplay}
                </button>
              </li>
              <li className="flex items-start space-x-2 text-xs text-[#343434]/80 pt-1">
                <Clock className="w-3.5 h-3.5 text-[#2F4F3A] shrink-0 mt-0.5" />
                <span>{BUSINESS_INFO.schedule}</span>
              </li>
            </ul>
          </div>

          {/* Columna 4: Garantías y Exclusión Táctica */}
          <div>
            <h3 className="font-sans text-sm font-bold uppercase tracking-wider text-[#2F4F3A] mb-4">
              Honestidad Artesanal
            </h3>
            <div className="bg-[#F5F1EA] p-4 rounded-xl border border-[#B08C4F]/30 space-y-2 text-xs">
              <div className="flex items-center space-x-1.5 font-semibold text-[#2F4F3A]">
                <ShieldCheck className="w-4 h-4" />
                <span>Exclusión Táctica Clara</span>
              </div>
              <p className="text-[#343434]/90 leading-relaxed">
                No realizamos alto brillo industrial de cocina ni producciones en masa de carpintería en serie.
              </p>
              <p className="text-[#6B6B6B]">
                Nos centramos al 100% en el lacado satinado y mate de alta resistencia para interiores de viviendas vividas.
              </p>
            </div>
            <div className="mt-3">
              <button
                onClick={() => {
                  onSelectTab('contacto');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="w-full text-center text-xs font-semibold py-2 px-3 rounded-lg bg-[#2F4F3A] text-white hover:bg-[#243E2E] transition-colors"
              >
                Solicitar orientación honesta →
              </button>
            </div>
          </div>

        </div>

        {/* Zona inferior de enlaces legales y copyright */}
        <div className="pt-6 border-t border-[#B08C4F]/30 flex flex-col sm:flex-row items-center justify-between text-xs text-[#343434]/80 space-y-4 sm:space-y-0">
          <p>
            © {new Date().getFullYear()} Lacados Arribas Martín S.L. Todos los derechos reservados.
          </p>
          <div className="flex items-center space-x-4">
            <span className="hover:text-[#2F4F3A] cursor-pointer" onClick={() => alert(`Aviso Legal: ${BUSINESS_INFO.name} S.L. - ${BUSINESS_INFO.address}. Registro Mercantil de Madrid.`)}>
              Aviso Legal
            </span>
            <span>·</span>
            <span className="hover:text-[#2F4F3A] cursor-pointer" onClick={() => alert('Política de Privacidad: Cumplimiento estricto RGPD. Los datos y fotos enviados se emplean exclusivamente para elaborar presupuestos de lacado.')}>
              Privacidad
            </span>
            <span>·</span>
            <span className="hover:text-[#2F4F3A] cursor-pointer" onClick={() => alert('Política de Cookies: Utilizamos cookies técnicas para garantizar el correcto funcionamiento del sitio.')}>
              Cookies
            </span>
            <span>·</span>
            <button
              onClick={() => {
                onSelectTab('contacto');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="text-[#2F4F3A] font-semibold"
            >
              Cómo llegar (Metro Cuatro Caminos)
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
