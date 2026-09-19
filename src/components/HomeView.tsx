import React, { useState } from 'react';
import { 
  Check, 
  Phone, 
  ArrowRight, 
  ShieldCheck, 
  Sparkles, 
  Star, 
  MapPin, 
  Clock, 
  DoorClosed, 
  DoorOpen, 
  Armchair, 
  Scale, 
  HelpCircle,
  Camera,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { ActiveTab, ServiceId, Neighborhood } from '../types';
import { BUSINESS_INFO, SERVICES_DATA, COMPARISON_TABLE, REVIEWS_DATA } from '../data/content';

interface HomeViewProps {
  onSelectTab: (tab: ActiveTab) => void;
  onSelectService: (serviceId: ServiceId) => void;
  onOpenWhatsApp: (customMessage?: string) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  onSelectTab,
  onSelectService,
  onOpenWhatsApp
}) => {
  const [activeReviewFilter, setActiveReviewFilter] = useState<string>('todos');
  const [expandedFaq, setExpandedFaq] = useState<number | null>(0);

  const filteredReviews = activeReviewFilter === 'todos' 
    ? REVIEWS_DATA 
    : REVIEWS_DATA.filter(r => r.neighborhood.toLowerCase().includes(activeReviewFilter.toLowerCase()));

  const faqsList = [
    {
      q: '¿Se desprenden olores o se genera polvo en mi casa durante el lacado?',
      a: 'No. El 95% del trabajo pesado de lijado, imprimación y aplicación a pistola se realiza en nuestra cabina cerrada con extracción en el taller de Tetuán. En tu vivienda solo desmontamos las hojas y, tras el secado y curado completo, volvemos a montarlas e instalarlas limpias y sin olores residuales.'
    },
    {
      q: '¿Por qué el lacado satinado en cabina dura mucho más que la chalk paint decorativa?',
      a: 'La pintura de tiza o chalk paint se aplica con brocha o rodillo sin penetración polimérica, rayándose y perdiendo color con el roce diario de ropa o aspiradoras. Nuestro lacado satinado emplea barnices poliuretánicos y acrílicos en cabina cerrada, creando una película elástica, uniforme, sedosa al tacto y 100% lavable con un paño húmedo.'
    },
    {
      q: '¿Hacéis presupuesto con fotos por WhatsApp antes de venir?',
      a: 'Sí, es la forma más rápida y cómoda para ti: nos envías 2 o 3 fotos de tus armarios, puertas o muebles por WhatsApp indicando tu barrio (Chamberí, Tetuán, Barrio del Pilar, etc.), y en menos de 24 horas te damos una orientación honesta con rango de precios orientativo sin compromiso.'
    },
    {
      q: '¿Cuánto tiempo tarda el proceso completo de unos armarios o puertas?',
      a: 'El plazo habitual para un conjunto de armarios empotrados o puertas de paso es de 7 a 10 días laborables, lo que permite respetar escrupulosamente los tiempos de evaporación y curado en taller para que no se peguen ni marquen al usarlas.'
    },
    {
      q: '¿Hacéis cocinas de alto brillo industrial?',
      a: 'No, lo excluimos de forma clara y transparente. No somos una fábrica industrial de cocinas en serie. Somos un taller artesanal ebanista especializado exclusivamente en lacados satinados y mates para estructuras del hogar (armarios, puertas, boiseries) y mobiliario de salón o dormitorio.'
    }
  ];

  return (
    <div className="w-full">
      {/* =========================================================================
          BLOQUE 1: HERO DE IMPACTO (Claim GEO-Ready + CTAs Directos)
          ========================================================================= */}
      <section className="relative bg-[#F5F1EA] pt-8 pb-16 md:pt-14 md:pb-24 border-b border-[#E3D9CC] overflow-hidden">
        {/* Adorno sutil de fondo */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-[#E3D9CC]/30 blur-3xl pointer-events-none"></div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            {/* Badge de confianza */}
            <div className="inline-flex items-center space-x-2 bg-[#E3D9CC]/60 border border-[#B08C4F]/40 rounded-full px-3.5 py-1.5 mb-5 text-xs font-semibold text-[#2F4F3A]">
              <span className="w-2 h-2 rounded-full bg-[#2F4F3A] animate-pulse"></span>
              <span>Taller familiar en Tetuán desde 1969 · Especialistas en acabados satinados y mates</span>
            </div>

            <h1 className="font-editorial text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#343434] leading-[1.15] mb-5 tracking-tight">
              Lacado satinado y mate de armarios, puertas y salones en Madrid norte y centro
            </h1>

            <p className="text-base sm:text-lg text-[#343434]/90 mb-6 leading-relaxed">
              Actualizamos armarios empotrados, puertas de paso y muebles de salón en pisos de <strong className="text-[#2F4F3A] font-semibold">Chamberí, Tetuán, Barrio del Pilar y alrededores</strong> con un acabado sedoso, uniforme y duradero, sin obras en casa.
            </p>

            {/* Bullets diferenciales */}
            <ul className="space-y-2.5 mb-8 text-sm sm:text-base text-[#343434]">
              <li className="flex items-start space-x-3">
                <span className="mt-1 flex items-center justify-center w-5 h-5 rounded-full bg-[#2F4F3A] text-white shrink-0 text-xs">
                  <Check className="w-3 h-3 stroke-[3]" />
                </span>
                <span>
                  <strong>Especialistas en estructuras del hogar:</strong> armarios, puertas y boiseries, no en alto brillo de cocina ni producciones industriales.
                </span>
              </li>
              <li className="flex items-start space-x-3">
                <span className="mt-1 flex items-center justify-center w-5 h-5 rounded-full bg-[#2F4F3A] text-white shrink-0 text-xs">
                  <Check className="w-3 h-3 stroke-[3]" />
                </span>
                <span>
                  <strong>Acabados satinados y mates de tacto sedoso:</strong> aguantan el uso diario y la limpieza frecuente mucho mejor que la chalk paint decorativa.
                </span>
              </li>
              <li className="flex items-start space-x-3">
                <span className="mt-1 flex items-center justify-center w-5 h-5 rounded-full bg-[#2F4F3A] text-white shrink-0 text-xs">
                  <Check className="w-3 h-3 stroke-[3]" />
                </span>
                <span>
                  <strong>Taller ebanista en Tetuán (Calle Olite 45):</strong> con barnices ecológicos certificados pensados para el interior de tu hogar.
                </span>
              </li>
            </ul>

            {/* Grupo de CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 mb-4">
              <button
                id="hero-whatsapp-btn"
                onClick={() => onOpenWhatsApp('Hola, he visto vuestra web de Lacados Arribas Martín. Me gustaría enviar fotos de mis armarios o puertas para presupuesto orientativo.')}
                className="flex items-center justify-center space-x-2.5 bg-[#2F4F3A] hover:bg-[#243E2E] text-white font-semibold py-4 px-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer active:scale-98"
              >
                <svg className="w-5 h-5 fill-current shrink-0" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                </svg>
                <span>Enviar fotos por WhatsApp y te orientamos en &lt; 24 h</span>
              </button>

              <a
                id="hero-call-btn"
                href={`tel:${BUSINESS_INFO.phoneRaw}`}
                className="flex items-center justify-center space-x-2 bg-transparent hover:bg-[#E3D9CC]/50 text-[#2F4F3A] font-semibold py-4 px-6 rounded-lg border-1.5 border-[#2F4F3A] transition-colors text-center"
              >
                <Phone className="w-4 h-4 text-[#2F4F3A]" />
                <span>¿Prefieres hablar? Llamar ahora</span>
              </a>
            </div>

            <p className="text-xs text-[#6B6B6B] leading-relaxed">
              <span className="font-semibold text-[#343434]">Sin compromiso:</span> Nos envías fotos por WhatsApp desde Chamberí, Tetuán o Barrio del Pilar y te respondemos en menos de 24 h con una orientación honesta.
            </p>
          </div>
        </div>
      </section>

      {/* =========================================================================
          BLOQUE 2: PROPUESTA DE VALOR EN 3 TARJETAS
          ========================================================================= */}
      <section className="bg-[#E3D9CC]/40 py-14 md:py-20 border-b border-[#E3D9CC]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="font-editorial text-2xl sm:text-3xl lg:text-4xl font-semibold text-[#343434] mb-3">
              Por qué elegir un lacado satinado profesional en Madrid norte y centro
            </h2>
            <p className="text-sm sm:text-base text-[#343434]/80">
              Si vives en Chamberí, Tetuán o Barrio del Pilar, probablemente tus armarios y puertas son de madera de calidad. Nosotros los actualizamos sin obra, con un acabado mate o satinado sedoso que dura años.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {/* Tarjeta 1 */}
            <div className="bg-[#F5F1EA] rounded-xl p-6 sm:p-7 border border-[#B08C4F]/20 shadow-xs hover:shadow-md transition-shadow">
              <div className="w-10 h-10 rounded-lg bg-[#2F4F3A]/10 text-[#2F4F3A] flex items-center justify-center mb-4">
                <DoorClosed className="w-5 h-5" />
              </div>
              <h3 className="font-sans font-semibold text-lg text-[#2F4F3A] mb-2.5">
                Especialistas en estructuras del hogar
              </h3>
              <p className="text-sm text-[#343434]/90 leading-relaxed">
                Nos centramos en armarios empotrados, puertas de paso, boiseries y muebles de salón y dormitorio, no en cocinas de alto brillo ni producciones en serie.
              </p>
            </div>

            {/* Tarjeta 2 */}
            <div className="bg-[#F5F1EA] rounded-xl p-6 sm:p-7 border border-[#B08C4F]/20 shadow-xs hover:shadow-md transition-shadow">
              <div className="w-10 h-10 rounded-lg bg-[#2F4F3A]/10 text-[#2F4F3A] flex items-center justify-center mb-4">
                <Sparkles className="w-5 h-5" />
              </div>
              <h3 className="font-sans font-semibold text-lg text-[#2F4F3A] mb-2.5">
                Acabado sedoso que aguanta el día a día
              </h3>
              <p className="text-sm text-[#343434]/90 leading-relaxed">
                Lacado satinado y mate aplicado a pistola en cabina tradicional, pensado para soportar golpes, roces y limpieza frecuente mejor que la chalk paint decorativa.
              </p>
            </div>

            {/* Tarjeta 3 */}
            <div className="bg-[#F5F1EA] rounded-xl p-6 sm:p-7 border border-[#B08C4F]/20 shadow-xs hover:shadow-md transition-shadow">
              <div className="w-10 h-10 rounded-lg bg-[#2F4F3A]/10 text-[#2F4F3A] flex items-center justify-center mb-4">
                <Camera className="w-5 h-5" />
              </div>
              <h3 className="font-sans font-semibold text-lg text-[#2F4F3A] mb-2.5">
                Proceso sencillo: fotos y orientación
              </h3>
              <p className="text-sm text-[#343434]/90 leading-relaxed">
                Nos envías fotos por WhatsApp, te orientamos sin compromiso en 24 h y, si encaja, planificamos fechas y recogida de piezas en tu piso de Madrid norte o centro.
              </p>
            </div>
          </div>

          <div className="text-center">
            <button
              onClick={() => onOpenWhatsApp('Hola, quiero saber si mis armarios o puertas son buena base para lacar en satinado. Os adjunto unas fotos.')}
              className="inline-flex items-center space-x-2 text-sm font-semibold text-[#2F4F3A] hover:text-[#243E2E] underline underline-offset-4 cursor-pointer"
            >
              <span>Quiero saber si mis armarios son buena base para lacar en satinado</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* =========================================================================
          BLOQUE 3: CATÁLOGO DE ESPECIALIDADES (4 Landings)
          ========================================================================= */}
      <section className="bg-[#F5F1EA] py-16 md:py-24 border-b border-[#E3D9CC]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs uppercase tracking-wider text-[#2F4F3A] font-semibold block mb-1">
              Catálogo de Servicios
            </span>
            <h2 className="font-editorial text-2xl sm:text-3xl lg:text-4xl font-semibold text-[#343434] mb-3">
              Especialidades de lacado satinado y mate en Madrid
            </h2>
            <p className="text-sm sm:text-base text-[#6B6B6B]">
              Transformamos armarios empotrados, puertas de paso y muebles de salón en pisos de Madrid norte y centro con acabados satinados y mates de tacto sedoso, sin brillos agresivos.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {Object.values(SERVICES_DATA).map((srv) => (
              <article
                key={srv.id}
                className="bg-[#FFFFFF] rounded-xl border border-[#E3D9CC] p-7 shadow-xs hover:shadow-md hover:border-[#2F4F3A]/60 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 rounded-lg bg-[#E3D9CC]/30 text-[#2F4F3A]">
                      {srv.iconName === 'DoorClosed' && <DoorClosed className="w-6 h-6" />}
                      {srv.iconName === 'DoorOpen' && <DoorOpen className="w-6 h-6" />}
                      {srv.iconName === 'Armchair' && <Armchair className="w-6 h-6" />}
                      {srv.iconName === 'Sparkles' && <Sparkles className="w-6 h-6" />}
                    </div>
                    <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-[#E3D9CC]/50 text-[#343434]">
                      En taller Tetuán
                    </span>
                  </div>

                  <h3 className="font-sans font-bold text-xl text-[#2F4F3A] mb-2.5">
                    {srv.title}
                  </h3>

                  <p className="text-sm text-[#343434]/90 mb-4 leading-relaxed">
                    {srv.shortDesc}
                  </p>

                  <div className="border-l-2 border-[#A4B3A0] pl-3 py-1 mb-6 text-xs text-[#6B6B6B] italic">
                    {srv.features[0]}
                  </div>
                </div>

                <div className="pt-4 border-t border-[#E3D9CC] flex items-center justify-between">
                  <button
                    onClick={() => onSelectService(srv.id)}
                    className="text-sm font-semibold text-[#2F4F3A] hover:text-[#243E2E] flex items-center space-x-1 cursor-pointer"
                  >
                    <span>Ver detalles y proceso</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => onOpenWhatsApp(`Hola, quiero pedir presupuesto para el servicio de: ${srv.title}`)}
                    className="text-xs font-medium text-[#6B6B6B] hover:text-[#2F4F3A] underline"
                  >
                    Consultar por WhatsApp
                  </button>
                </div>
              </article>
            ))}
          </div>

          <div className="text-center">
            <button
              onClick={() => onOpenWhatsApp('Hola, no sé exactamente cuál es mi caso. Os envío fotos de mis muebles y armarios para que me orientéis.')}
              className="inline-flex items-center space-x-2 bg-[#2F4F3A] hover:bg-[#243E2E] text-white font-semibold py-3.5 px-6 rounded-lg shadow-sm hover:shadow transition-colors"
            >
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
              </svg>
              <span>¿No sabes cuál es tu caso? Envíanos fotos por WhatsApp</span>
            </button>
          </div>
        </div>
      </section>

      {/* =========================================================================
          BLOQUE 4: PROCESO DE CONFIANZA DEL TALLER
          ========================================================================= */}
      <section className="bg-[#E3D9CC]/50 py-16 md:py-24 border-b border-[#E3D9CC]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs uppercase tracking-wider text-[#2F4F3A] font-semibold block mb-1">
              Oficio de Taller
            </span>
            <h2 className="font-editorial text-2xl sm:text-3xl lg:text-4xl font-semibold text-[#343434] mb-3">
              Cómo trabajamos tus armarios, puertas y muebles en nuestro taller de Tetuán
            </h2>
            <p className="text-sm text-[#6B6B6B]">
              Nuestro taller familiar lleva décadas especializado en lacado satinado y mate con un enfoque ebanista y control de cada capa para evitar piel de naranja, marcas de rodillo o brillos industriales.
            </p>
          </div>

          <div className="space-y-6 mb-12">
            {/* Paso 1 */}
            <div className="bg-[#F5F1EA] rounded-xl p-6 sm:p-8 border border-[#B08C4F]/30 flex flex-col sm:flex-row items-start gap-5 shadow-xs">
              <div className="w-12 h-12 rounded-full bg-[#2F4F3A] text-white flex items-center justify-center font-bold text-xl shrink-0 shadow-sm">
                1
              </div>
              <div>
                <h3 className="font-sans font-bold text-lg text-[#343434] mb-2">
                  Desmontaje y numeración en tu casa
                </h3>
                <p className="text-sm text-[#343434]/90 leading-relaxed">
                  Podemos encargarnos del desmontaje completo de puertas, frentes y piezas de mobiliario, numerando cada elemento y protegiéndolo para el transporte a nuestro taller, minimizando el impacto en tu día a día sin olores en la vivienda.
                </p>
              </div>
            </div>

            {/* Paso 2 */}
            <div className="bg-[#F5F1EA] rounded-xl p-6 sm:p-8 border border-[#B08C4F]/30 flex flex-col sm:flex-row items-start gap-5 shadow-xs">
              <div className="w-12 h-12 rounded-full bg-[#2F4F3A] text-white flex items-center justify-center font-bold text-xl shrink-0 shadow-sm">
                2
              </div>
              <div>
                <h3 className="font-sans font-bold text-lg text-[#343434] mb-2">
                  Preparación minuciosa y lijados sucesivos en cabina
                </h3>
                <p className="text-sm text-[#343434]/90 leading-relaxed">
                  En cabina cerrada en nuestro taller de la calle Olite, preparamos la base con lijados por fases, corregimos golpes y defectos de la madera, aplicamos imprimaciones selladoras y varias manos de laca satinada a pistola aerográfica.
                </p>
              </div>
            </div>

            {/* Paso 3 */}
            <div className="bg-[#F5F1EA] rounded-xl p-6 sm:p-8 border border-[#B08C4F]/30 flex flex-col sm:flex-row items-start gap-5 shadow-xs">
              <div className="w-12 h-12 rounded-full bg-[#2F4F3A] text-white flex items-center justify-center font-bold text-xl shrink-0 shadow-sm">
                3
              </div>
              <div>
                <h3 className="font-sans font-bold text-lg text-[#343434] mb-2">
                  Lacado a pistola, curado real y montaje final
                </h3>
                <p className="text-sm text-[#343434]/90 leading-relaxed">
                  Una vez curado el lacado completamente, montamos de nuevo las piezas en tu piso de Chamberí, Tetuán o Barrio del Pilar, revisamos cierres y bisagras, y te explicamos pautas sencillas de limpieza para mantener el tacto sedoso intacto durante años.
                </p>
              </div>
            </div>
          </div>

          <div className="text-center">
            <button
              onClick={() => onOpenWhatsApp('Hola, quiero saber si mis armarios o puertas se pueden lacar con este proceso de 3 pasos.')}
              className="inline-flex items-center space-x-2 bg-transparent hover:bg-[#E3D9CC]/60 text-[#2F4F3A] font-semibold py-3 px-6 rounded-lg border-1.5 border-[#2F4F3A] transition-colors"
            >
              <span>Quiero saber si mis armarios se pueden lacar así</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* =========================================================================
          BLOQUE 5: TABLA COMPARATIVA CHALK PAINT VS LACADO SATINADO EBANISTA
          ========================================================================= */}
      <section className="bg-[#F5F1EA] py-16 md:py-24 border-b border-[#E3D9CC]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-flex items-center space-x-1.5 text-xs uppercase tracking-wider text-[#B08C4F] font-bold mb-2">
              <Scale className="w-4 h-4" />
              <span>Comparativa Técnica y Objetiva</span>
            </div>
            <h2 className="font-editorial text-2xl sm:text-3xl lg:text-4xl font-semibold text-[#343434] mb-3">
              Chalk paint decorativa vs Lacado satinado ebanista
            </h2>
            <p className="text-sm sm:text-base text-[#6B6B6B]">
              Muchos clientes acuden a nosotros tras frustrarse con la pintura a tiza. Te explicamos las diferencias reales de durabilidad y tacto en armarios y puertas sometidos al uso diario.
            </p>
          </div>

          {/* Tabla responsive */}
          <div className="overflow-x-auto rounded-xl border border-[#B08C4F]/30 bg-white shadow-sm mb-8">
            <table className="w-full text-left text-sm border-collapse min-w-[620px]">
              <thead>
                <tr className="bg-[#E3D9CC]/60 text-[#343434] border-b border-[#B08C4F]/30 font-sans">
                  <th className="p-4 font-bold text-xs uppercase tracking-wider w-1/4">Criterio</th>
                  <th className="p-4 font-semibold text-xs uppercase tracking-wider w-1/3 text-[#6B6B6B]">
                    Chalk Paint (Pintura a la tiza)
                  </th>
                  <th className="p-4 font-bold text-xs uppercase tracking-wider w-5/12 text-[#2F4F3A] bg-[#2F4F3A]/5">
                    Lacado Satinado Arribas Martín
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E3D9CC]">
                {COMPARISON_TABLE.map((row, idx) => (
                  <tr key={idx} className={idx % 2 === 0 ? 'bg-[#FFFFFF]' : 'bg-[#F5F1EA]/50'}>
                    <td className="p-4 font-semibold text-[#343434]">
                      {row.criterion}
                    </td>
                    <td className="p-4 text-[#6B6B6B] leading-relaxed">
                      {row.chalkPaint}
                    </td>
                    <td className="p-4 text-[#2F4F3A] font-medium bg-[#2F4F3A]/5 leading-relaxed">
                      <div className="flex items-start space-x-2">
                        <Check className="w-4 h-4 text-[#2F4F3A] shrink-0 mt-0.5" />
                        <span>{row.arribasMartin}</span>
                      </div>
                      <span className="block text-[11px] text-[#B08C4F] font-semibold mt-1">
                        Ventaja: {row.advantage}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="bg-[#E3D9CC]/30 border border-[#B08C4F]/30 rounded-xl p-5 text-center max-w-2xl mx-auto text-xs text-[#343434]">
            <p>
              <strong>Conclusión ebanista:</strong> La pintura de tiza es divertida para una pieza decorativa auxiliar sin uso. Para armarios empotrados y puertas de paso que se abren 20 veces al día, el lacado poliuretánico en cabina es la única garantía duradera.
            </p>
          </div>
        </div>
      </section>

      {/* =========================================================================
          BLOQUE 6: RESEÑAS GEO DE CLIENTES (Tetuán, Chamberí, Barrio del Pilar)
          ========================================================================= */}
      <section className="bg-[#E3D9CC]/30 py-16 md:py-24 border-b border-[#E3D9CC]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <div className="flex items-center justify-center space-x-1 mb-2">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-[#B08C4F] text-[#B08C4F]" />
              ))}
            </div>
            <h2 className="font-editorial text-2xl sm:text-3xl lg:text-4xl font-semibold text-[#343434] mb-2">
              Reseñas de vecinos en Madrid norte y centro
            </h2>
            <p className="text-sm text-[#6B6B6B]">
              Opiniones reales de clientes en Chamberí, Tetuán y Barrio del Pilar sobre nuestro lacado satinado/mate.
            </p>

            {/* Filtros de barrio para reseñas */}
            <div className="flex flex-wrap items-center justify-center gap-2 mt-6">
              {['todos', 'Chamberí', 'Tetuán', 'Barrio del Pilar', 'Chamartín'].map((b) => (
                <button
                  key={b}
                  onClick={() => setActiveReviewFilter(b)}
                  className={`text-xs px-3 py-1.5 rounded-full transition-colors cursor-pointer ${
                    activeReviewFilter === b
                      ? 'bg-[#2F4F3A] text-white font-semibold'
                      : 'bg-[#F5F1EA] text-[#343434] hover:bg-[#E3D9CC] border border-[#B08C4F]/30'
                  }`}
                >
                  {b === 'todos' ? 'Todos los barrios' : b}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            {filteredReviews.slice(0, 3).map((review) => (
              <div
                key={review.id}
                className="bg-[#F5F1EA] rounded-xl p-6 border border-[#B08C4F]/20 shadow-xs flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-1">
                      {[...Array(review.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-[#B08C4F] text-[#B08C4F]" />
                      ))}
                    </div>
                    <span className="text-[11px] font-medium text-[#6B6B6B]">{review.date}</span>
                  </div>

                  <p className="text-sm text-[#343434] leading-relaxed mb-4 italic">
                    "{review.text}"
                  </p>
                </div>

                <div className="pt-3 border-t border-[#E3D9CC] text-xs">
                  <span className="font-bold text-[#343434] block">{review.author}</span>
                  <span className="text-[#2F4F3A] font-medium flex items-center space-x-1 mt-0.5">
                    <MapPin className="w-3 h-3" />
                    <span>{review.location}</span>
                  </span>
                  <span className="block text-[11px] text-[#6B6B6B] mt-1">
                    Piezas: {review.highlightedItem}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="https://maps.google.com/?q=Calle+Olite+45+Madrid"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-semibold text-[#2F4F3A] hover:underline flex items-center space-x-1"
            >
              <span>Ver ficha y reseñas en Google Maps</span>
              <ArrowRight className="w-4 h-4" />
            </a>

            <button
              onClick={() => onOpenWhatsApp('Hola, he leído las opiniones de clientes de mi barrio y quiero que mi piso sea el próximo antes/después.')}
              className="text-sm font-semibold text-[#2F4F3A] bg-white border border-[#2F4F3A] px-4 py-2 rounded-lg hover:bg-[#2F4F3A] hover:text-white transition-colors cursor-pointer"
            >
              Quiero que mi piso sea el próximo antes/después
            </button>
          </div>
        </div>
      </section>

      {/* =========================================================================
          BLOQUE 7: STORYTELLING DEL TALLER DESDE 1969
          ========================================================================= */}
      <section className="bg-[#F5F1EA] py-16 md:py-20 border-b border-[#E3D9CC]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#FFFFFF] rounded-2xl p-8 sm:p-12 border border-[#B08C4F]/30 shadow-xs flex flex-col md:flex-row items-center gap-8">
            <div className="w-full md:w-1/3 text-center md:text-left">
              <span className="text-xs uppercase tracking-widest text-[#B08C4F] font-bold block mb-1">
                Ebanistería Tradicional
              </span>
              <h3 className="font-editorial text-3xl sm:text-4xl font-semibold text-[#343434] mb-2">
                Fundado en 1969
              </h3>
              <p className="text-xs font-semibold text-[#2F4F3A] uppercase tracking-wider mb-4">
                Calle Olite 45 · Tetuán, Madrid
              </p>
              <div className="w-12 h-0.5 bg-[#B08C4F] mx-auto md:mx-0"></div>
            </div>

            <div className="w-full md:w-2/3 space-y-4 text-sm sm:text-base text-[#343434]/90 leading-relaxed">
              <p>
                Durante más de 50 años, la familia Arribas Martín ha mantenido vivo el saber hacer ebanista en el corazón de Tetuán. No hemos querido convertirnos en una planta robotizada de cocinas de melamina ni en una gran fábrica de alto brillo.
              </p>
              <p>
                Nuestra vocación es el <strong className="text-[#2F4F3A]">lacado satinado y mate de alta escuela</strong>: ajustar la pistola según la porosidad de la madera, respetar el reposo entre manos y devolver el esplendor a las carpinterías que visten los hogares de Chamberí, Tetuán y Barrio del Pilar.
              </p>
              <div className="pt-2 flex items-center space-x-4 text-xs text-[#6B6B6B]">
                <span>✓ Barnices ecológicos al agua</span>
                <span>✓ Recogida y entrega propia</span>
                <span>✓ Trato directo sin intermediarios</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          BLOQUE 8: FAQS DE DECISIÓN RÁPIDA
          ========================================================================= */}
      <section className="bg-[#E3D9CC]/30 py-16 md:py-20 border-b border-[#E3D9CC]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="inline-flex items-center space-x-1 text-xs uppercase tracking-wider text-[#2F4F3A] font-semibold mb-2">
              <HelpCircle className="w-4 h-4" />
              <span>Preguntas Frecuentes</span>
            </div>
            <h2 className="font-editorial text-2xl sm:text-3xl font-semibold text-[#343434]">
              Dudas habituales antes de lacar tus armarios o puertas
            </h2>
          </div>

          <div className="space-y-3.5">
            {faqsList.map((faq, index) => (
              <div
                key={index}
                className="bg-[#F5F1EA] rounded-xl border border-[#B08C4F]/25 overflow-hidden transition-colors"
              >
                <button
                  onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                  className="w-full text-left p-5 flex items-center justify-between space-x-4 font-semibold text-[#343434] hover:text-[#2F4F3A] cursor-pointer"
                >
                  <span className="text-sm sm:text-base">{faq.q}</span>
                  {expandedFaq === index ? (
                    <ChevronUp className="w-5 h-5 text-[#2F4F3A] shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-[#6B6B6B] shrink-0" />
                  )}
                </button>

                {expandedFaq === index && (
                  <div className="px-5 pb-5 pt-1 text-sm text-[#343434]/90 border-t border-[#E3D9CC]/60 leading-relaxed">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          BLOQUE 9: CIERRE DE CONVERSIÓN Y MAPA GEO TETUÁN
          ========================================================================= */}
      <section className="bg-[#F5F1EA] py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#E3D9CC]/50 rounded-2xl p-8 sm:p-12 border border-[#B08C4F]/30">
            <div className="max-w-3xl mx-auto text-center mb-10">
              <h2 className="font-editorial text-2xl sm:text-3xl lg:text-4xl font-semibold text-[#343434] mb-3">
                Estamos en Tetuán, muy cerca de Chamberí y Barrio del Pilar
              </h2>
              <p className="text-sm sm:text-base text-[#343434]/80 leading-relaxed">
                Trabajamos cada día para pisos de Madrid norte y centro: Tetuán, Chamberí, Barrio del Pilar, Chamartín y alrededores. Conocemos bien el parque de viviendas de la zona y las necesidades de sus armarios y puertas.
              </p>
            </div>

            {/* Espacio reservado para mapa e indicaciones */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8 items-stretch">
              <div className="lg:col-span-2 bg-white rounded-xl border-2 border-dashed border-[#B08C4F]/50 p-6 flex flex-col items-center justify-center text-center min-h-[260px]">
                <MapPin className="w-10 h-10 text-[#2F4F3A] mb-3 opacity-70" />
                <h4 className="font-sans font-bold text-base text-[#343434] mb-1">
                  Taller Lacados Arribas Martín
                </h4>
                <p className="text-sm text-[#2F4F3A] font-semibold mb-2">
                  Calle Olite 45, 28020 Tetuán, Madrid
                </p>
                <p className="text-xs text-[#6B6B6B] max-w-md">
                  A escasos minutos de la calle Bravo Murillo y la glorieta de Cuatro Caminos. Visitas con cita previa o envíanos fotos por WhatsApp para ahorrar tiempo.
                </p>
                <div className="mt-4 flex flex-wrap gap-2 justify-center">
                  <span className="text-[11px] bg-[#F5F1EA] px-2.5 py-1 rounded-md border border-[#E3D9CC] text-[#343434]">
                    🚇 Metro Cuatro Caminos / Alvarado
                  </span>
                  <span className="text-[11px] bg-[#F5F1EA] px-2.5 py-1 rounded-md border border-[#E3D9CC] text-[#343434]">
                    🚌 Buses 3, 45, 64, 127
                  </span>
                </div>
              </div>

              <div className="bg-white rounded-xl border border-[#E3D9CC] p-6 flex flex-col justify-between">
                <div>
                  <h4 className="font-sans font-bold text-sm text-[#2F4F3A] uppercase tracking-wider mb-3">
                    Horario de Atención
                  </h4>
                  <p className="text-xs text-[#343434] mb-1">
                    <strong>Lunes a Viernes:</strong> 8:30 a 18:30 h
                  </p>
                  <p className="text-xs text-[#343434] mb-4">
                    <strong>Sábados:</strong> Con cita previa concertada
                  </p>
                  <h4 className="font-sans font-bold text-sm text-[#2F4F3A] uppercase tracking-wider mb-2">
                    Contacto Directo
                  </h4>
                  <p className="text-xs text-[#343434] mb-1">
                    Tel: <a href={`tel:${BUSINESS_INFO.phoneRaw}`} className="text-[#2F4F3A] font-semibold hover:underline">{BUSINESS_INFO.phone}</a>
                  </p>
                  <p className="text-xs text-[#343434]">
                    WhatsApp: <span className="text-[#2F4F3A] font-semibold">{BUSINESS_INFO.whatsappDisplay}</span>
                  </p>
                </div>

                <div className="pt-4 border-t border-[#E3D9CC] mt-4">
                  <a
                    href="https://maps.google.com/?q=Calle+Olite+45+Madrid"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-block text-center py-2 px-3 text-xs font-semibold rounded-lg bg-[#E3D9CC] text-[#343434] hover:bg-[#C2B39A] transition-colors"
                  >
                    Abrir en Google Maps →
                  </a>
                </div>
              </div>
            </div>

            {/* Botonera de conversión final */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                id="final-section-whatsapp-btn"
                onClick={() => onOpenWhatsApp('Hola, quiero enviar fotos de mis armarios, puertas o muebles de salón para presupuesto en Madrid.')}
                className="w-full sm:w-auto flex items-center justify-center space-x-2 bg-[#2F4F3A] hover:bg-[#243E2E] text-white font-semibold py-4 px-8 rounded-lg shadow-md hover:shadow-lg transition-all"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                </svg>
                <span>Enviar fotos por WhatsApp (Respuesta &lt; 24h)</span>
              </button>

              <a
                href={`tel:${BUSINESS_INFO.phoneRaw}`}
                className="w-full sm:w-auto flex items-center justify-center space-x-2 bg-transparent hover:bg-[#E3D9CC] text-[#2F4F3A] font-semibold py-4 px-6 rounded-lg border-1.5 border-[#2F4F3A] transition-colors"
              >
                <Phone className="w-4 h-4 text-[#2F4F3A]" />
                <span>Llamar al taller: {BUSINESS_INFO.phone}</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
