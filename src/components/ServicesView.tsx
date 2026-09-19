import React, { useState, useEffect } from 'react';
import { 
  DoorClosed, 
  DoorOpen, 
  Armchair, 
  Sparkles, 
  ArrowRight, 
  Check, 
  ChevronRight, 
  HelpCircle,
  Clock,
  Shield,
  Palette
} from 'lucide-react';
import { ServiceId } from '../types';
import { SERVICES_DATA, BUSINESS_INFO } from '../data/content';

interface ServicesViewProps {
  selectedServiceId?: ServiceId | null;
  onSelectService: (serviceId: ServiceId) => void;
  onOpenWhatsApp: (customMessage?: string) => void;
}

export const ServicesView: React.FC<ServicesViewProps> = ({
  selectedServiceId,
  onSelectService,
  onOpenWhatsApp
}) => {
  const [currentServiceId, setCurrentServiceId] = useState<ServiceId>(
    selectedServiceId || 'lacado-armarios-empotrados-madrid'
  );

  useEffect(() => {
    if (selectedServiceId) {
      setCurrentServiceId(selectedServiceId);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [selectedServiceId]);

  const service = SERVICES_DATA[currentServiceId];

  const getIcon = (name: string) => {
    switch (name) {
      case 'DoorClosed': return <DoorClosed className="w-6 h-6" />;
      case 'DoorOpen': return <DoorOpen className="w-6 h-6" />;
      case 'Armchair': return <Armchair className="w-6 h-6" />;
      default: return <Sparkles className="w-6 h-6" />;
    }
  };

  return (
    <div className="w-full bg-[#F5F1EA] py-8 sm:py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Migas de pan */}
        <nav className="flex items-center space-x-2 text-xs text-[#6B6B6B] mb-6">
          <span>Inicio</span>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="font-semibold text-[#343434]">Servicios</span>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-[#2F4F3A] font-medium">{service.title}</span>
        </nav>

        {/* Selector de pestañas / hub de servicios */}
        <div className="bg-[#E3D9CC]/50 p-2 rounded-2xl border border-[#B08C4F]/30 mb-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
            {Object.values(SERVICES_DATA).map((s) => {
              const isSelected = s.id === currentServiceId;
              return (
                <button
                  key={s.id}
                  id={`tab-service-${s.id}`}
                  onClick={() => {
                    setCurrentServiceId(s.id);
                    onSelectService(s.id);
                  }}
                  className={`p-3.5 rounded-xl text-left transition-all cursor-pointer flex flex-col justify-between ${
                    isSelected
                      ? 'bg-[#2F4F3A] text-white shadow-md'
                      : 'bg-[#F5F1EA] text-[#343434] hover:bg-[#E3D9CC]/80 border border-transparent'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className={isSelected ? 'text-white' : 'text-[#2F4F3A]'}>
                      {getIcon(s.iconName)}
                    </span>
                    {isSelected && (
                      <span className="text-[10px] uppercase font-bold tracking-wider bg-white/20 px-2 py-0.5 rounded-full">
                        Activo
                      </span>
                    )}
                  </div>
                  <div>
                    <span className="block font-sans font-bold text-xs sm:text-sm leading-snug">
                      {s.title}
                    </span>
                    <span className={`block text-[11px] mt-0.5 line-clamp-1 ${isSelected ? 'text-white/80' : 'text-[#6B6B6B]'}`}>
                      {s.subtitle}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Contenido Landing Específica */}
        <div className="bg-[#FFFFFF] rounded-2xl border border-[#E3D9CC] shadow-xs p-6 sm:p-10 mb-12">
          
          {/* Cabecera del servicio */}
          <div className="max-w-3xl mb-8">
            <span className="inline-block text-xs uppercase tracking-wider text-[#2F4F3A] font-bold bg-[#E3D9CC]/40 px-3 py-1 rounded-full mb-3">
              Taller Ebanista Tetuán · Madrid Norte y Centro
            </span>
            <h1 className="font-editorial text-2xl sm:text-3xl lg:text-4xl font-semibold text-[#343434] leading-tight mb-4">
              {service.h1}
            </h1>
            <p className="text-sm sm:text-base text-[#343434]/90 leading-relaxed">
              {service.heroText}
            </p>
          </div>

          {/* Características destacadas */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
            {service.features.map((feat, i) => (
              <div
                key={i}
                className="flex items-start space-x-3 bg-[#F5F1EA]/80 p-4 rounded-xl border border-[#E3D9CC]"
              >
                <span className="p-1 rounded-full bg-[#2F4F3A] text-white shrink-0 mt-0.5">
                  <Check className="w-3.5 h-3.5" />
                </span>
                <span className="text-xs sm:text-sm text-[#343434] leading-relaxed">
                  {feat}
                </span>
              </div>
            ))}
          </div>

          {/* Muestra fotográfica de acabado */}
          <div className="mb-12 bg-[#F5F1EA] p-6 rounded-xl border border-[#B08C4F]/25">
            <h3 className="font-editorial text-lg sm:text-xl font-semibold text-[#343434] mb-3 flex items-center space-x-2">
              <span>Resultado fotográfico del acabado sedoso</span>
            </h3>
            <p className="text-xs text-[#6B6B6B] mb-5">
              Sin reflejos deslumbrantes ni efecto plástico: brillo mate controlado (10-15% gloss) que armoniza con la luz natural de pisos de Madrid.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="relative rounded-lg overflow-hidden border border-[#E3D9CC] group">
                <img
                  src={service.sampleImageBefore}
                  alt="Madera antes de lacar"
                  className="w-full h-56 object-cover"
                />
                <span className="absolute top-3 left-3 bg-[#343434]/90 text-white text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md">
                  Antes: Barniz oscuro o desgastado
                </span>
              </div>

              <div className="relative rounded-lg overflow-hidden border border-[#2F4F3A]/40 group">
                <img
                  src={service.sampleImageAfter}
                  alt="Lacado satinado final"
                  className="w-full h-56 object-cover"
                />
                <span className="absolute top-3 left-3 bg-[#2F4F3A] text-white text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md shadow-sm">
                  Después: Lacado satinado sedoso
                </span>
              </div>
            </div>
          </div>

          {/* Paleta recomendada para este servicio */}
          <div className="mb-12">
            <div className="flex items-center space-x-2 mb-4">
              <Palette className="w-5 h-5 text-[#2F4F3A]" />
              <h3 className="font-editorial text-xl font-semibold text-[#343434]">
                Gama de tonos neutros más demandados
              </h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {service.palette.map((col, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl border border-[#E3D9CC] bg-[#FFFFFF] flex flex-col justify-between"
                >
                  <div className="flex items-center space-x-3 mb-2">
                    <div
                      className="w-8 h-8 rounded-full border border-black/15 shadow-inner shrink-0"
                      style={{ backgroundColor: col.hex }}
                    ></div>
                    <div>
                      <span className="block font-bold text-xs text-[#343434]">{col.name}</span>
                      <span className="block text-[10px] text-[#6B6B6B] font-mono">{col.hex}</span>
                    </div>
                  </div>
                  <p className="text-xs text-[#6B6B6B] leading-relaxed mt-1">
                    {col.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Proceso en 3 pasos específico */}
          <div className="mb-12">
            <h3 className="font-editorial text-xl font-semibold text-[#343434] mb-4">
              Paso a paso en nuestro taller de Tetuán
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {service.processSteps.map((step, idx) => (
                <div key={idx} className="bg-[#F5F1EA] p-5 rounded-xl border border-[#E3D9CC]">
                  <span className="text-xs font-bold text-[#2F4F3A] bg-[#2F4F3A]/10 px-2.5 py-1 rounded-md mb-2 inline-block">
                    Fase {idx + 1}
                  </span>
                  <h4 className="font-sans font-bold text-sm text-[#343434] mb-1.5">{step.title}</h4>
                  <p className="text-xs text-[#6B6B6B] leading-relaxed">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* FAQs de este servicio */}
          <div className="mb-10">
            <h3 className="font-editorial text-xl font-semibold text-[#343434] mb-4 flex items-center space-x-2">
              <HelpCircle className="w-5 h-5 text-[#2F4F3A]" />
              <span>Preguntas frecuentes sobre {service.title.toLowerCase()}</span>
            </h3>
            <div className="space-y-3">
              {service.faqs.map((faq, i) => (
                <div key={i} className="p-4 rounded-xl bg-[#F5F1EA] border border-[#E3D9CC]">
                  <h4 className="font-sans font-bold text-sm text-[#343434] mb-1">
                    {faq.question}
                  </h4>
                  <p className="text-xs sm:text-sm text-[#6B6B6B] leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Contextualizado */}
          <div className="bg-[#2F4F3A] text-white p-6 sm:p-8 rounded-xl flex flex-col sm:flex-row items-center justify-between gap-6 shadow-md">
            <div>
              <h4 className="font-editorial text-xl sm:text-2xl font-semibold mb-1">
                ¿Quieres presupuesto para tus {service.title.toLowerCase()}?
              </h4>
              <p className="text-xs sm:text-sm text-white/80">
                Envíanos 2 o 3 fotos de frente por WhatsApp y te damos una estimación transparente en menos de 24 horas.
              </p>
            </div>

            <button
              onClick={() => onOpenWhatsApp(`Hola, quiero pedir presupuesto para el lacado de: ${service.title}. Os adjunto unas fotos desde mi barrio en Madrid.`)}
              className="bg-white hover:bg-[#F5F1EA] text-[#2F4F3A] font-bold text-sm py-3.5 px-6 rounded-lg whitespace-nowrap shadow-sm hover:shadow transition-all shrink-0 cursor-pointer"
            >
              Enviar fotos por WhatsApp
            </button>
          </div>

        </div>

        {/* Banner de contacto alternativo */}
        <div className="text-center text-xs text-[#6B6B6B]">
          ¿Prefieres que vayamos a medir a tu piso de Madrid norte o centro?{' '}
          <a href={`tel:${BUSINESS_INFO.phoneRaw}`} className="text-[#2F4F3A] font-semibold underline">
            Llámanos al {BUSINESS_INFO.phone}
          </a>
        </div>

      </div>
    </div>
  );
};
