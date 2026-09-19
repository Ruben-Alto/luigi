import React, { useState } from 'react';
import { 
  Phone, 
  MapPin, 
  Clock, 
  Send, 
  CheckCircle2, 
  Camera, 
  HelpCircle, 
  Navigation,
  MessageSquare
} from 'lucide-react';
import { BUSINESS_INFO } from '../data/content';

interface ContactViewProps {
  onOpenWhatsApp: (customMessage?: string) => void;
}

export const ContactView: React.FC<ContactViewProps> = ({ onOpenWhatsApp }) => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    projectType: 'armarios',
    neighborhood: 'Chamberí',
    message: '',
    privacyAccepted: true
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) {
      alert('Por favor, indica al menos tu nombre y teléfono móvil.');
      return;
    }
    setFormSubmitted(true);
  };

  const handleWhatsAppWithNeighborhood = (neighborhood: string) => {
    const msg = `Hola, he visto vuestra web de Lacados Arribas Martín. Quiero pedir presupuesto para lacar en satinado mis armarios/puertas/muebles de salón en ${neighborhood} de Madrid. Os envío fotos.`;
    onOpenWhatsApp(msg);
  };

  const contactFaqs = [
    {
      q: '¿Cuál es la forma más rápida de pedir presupuesto?',
      a: 'Enviarnos 2 o 3 fotos por WhatsApp del trabajo que necesitas (armarios, puertas o muebles de salón) indicando tu barrio. Te respondemos en menos de 24 horas con orientación honesta y, si encaja, un presupuesto aproximado cerrado.'
    },
    {
      q: '¿Puedo ir directamente al taller de Tetuán sin cita previa?',
      a: 'Trabajamos con cita previa para asegurar que el maestro ebanista o técnico esté en taller y pueda atenderte sin prisas. Llámanos antes al 915 70 82 14 o escríbenos por WhatsApp para fijar hora.'
    },
    {
      q: '¿Hacéis presupuestos a domicilio en mi piso?',
      a: 'Sí, para proyectos de armarios empotrados completos o varias puertas de paso en Madrid norte y centro acudimos a medir in situ. Primero recomendamos enviarnos fotos por WhatsApp para confirmar que el trabajo encaja con nuestro tipo de lacado artesanal.'
    },
    {
      q: '¿Atendéis proyectos fuera de Tetuán, Chamberí y Barrio del Pilar?',
      a: 'Sí, trabajamos en todo Madrid norte y centro (Chamartín, Salamanca, Moncloa, Retiro, Mirasierra, etc.). Indícanos tu barrio al contactar y te confirmamos disponibilidad inmediata.'
    }
  ];

  return (
    <div className="w-full bg-[#F5F1EA]">
      {/* =========================================================================
          BLOQUE 1: HERO DE CONVERSIÓN INMEDIATA (Verde Botella #2F4F3A)
          ========================================================================= */}
      <section className="bg-[#2F4F3A] text-white py-12 sm:py-16 border-b border-[#B08C4F]/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-xs uppercase tracking-widest text-[#A4B3A0] font-bold block mb-2">
            Contacto Directo con el Taller
          </span>
          <h1 className="font-editorial text-3xl sm:text-4xl lg:text-5xl font-semibold mb-4 text-white leading-tight">
            Envíanos fotos de tus armarios o muebles y te orientamos en menos de 24 h
          </h1>
          <p className="text-sm sm:text-base text-white/80 max-w-2xl mx-auto mb-8 leading-relaxed">
            Sin desplazamientos innecesarios ni esperas: valoramos el estado de la madera y te damos una estimación transparente antes de acudir a medir.
          </p>

          {/* 2 Botones Primarios de ancho completo en móvil */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-xl mx-auto">
            <button
              id="contact-hero-whatsapp-btn"
              onClick={() => handleWhatsAppWithNeighborhood(formData.neighborhood)}
              className="w-full sm:w-auto flex-1 flex items-center justify-center space-x-2.5 bg-[#FFFFFF] hover:bg-[#F5F1EA] text-[#2F4F3A] font-bold py-4 px-6 rounded-lg shadow-lg hover:shadow-xl transition-all cursor-pointer"
            >
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
              </svg>
              <span>Enviar fotos por WhatsApp</span>
            </button>

            <a
              id="contact-hero-call-btn"
              href={`tel:${BUSINESS_INFO.phoneRaw}`}
              className="w-full sm:w-auto flex-1 flex items-center justify-center space-x-2 bg-transparent hover:bg-white/10 text-white font-semibold py-4 px-6 rounded-lg border-1.5 border-white transition-colors"
            >
              <Phone className="w-4 h-4 text-white" />
              <span>Llamar ahora: {BUSINESS_INFO.phone}</span>
            </a>
          </div>
          <p className="text-[11px] text-white/70 mt-3">
            Horario: Lunes a Viernes de 8:30 a 18:30 h
          </p>
        </div>
      </section>

      {/* =========================================================================
          BLOQUE 2 & 3: FORMULARIO Y MAPA DE TETUÁN
          ========================================================================= */}
      <section className="py-14 sm:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            
            {/* Formulario alternativo (7 columnas) */}
            <div className="lg:col-span-7 bg-white rounded-2xl border border-[#E3D9CC] p-6 sm:p-8 shadow-xs">
              <h3 className="font-editorial text-2xl font-semibold text-[#343434] mb-2">
                O rellena este formulario y te llamamos nosotros
              </h3>
              <p className="text-xs text-[#6B6B6B] mb-6">
                Indícanos tu barrio y qué piezas te gustaría lacar. Nos pondremos en contacto contigo en menos de 24 horas laborables.
              </p>

              {formSubmitted ? (
                <div className="bg-[#2F4F3A]/10 border border-[#2F4F3A] rounded-xl p-8 text-center space-y-3">
                  <CheckCircle2 className="w-12 h-12 text-[#2F4F3A] mx-auto" />
                  <h4 className="font-sans font-bold text-lg text-[#2F4F3A]">
                    ¡Consulta recibida con éxito!
                  </h4>
                  <p className="text-sm text-[#343434]">
                    Gracias <strong>{formData.name}</strong>. Un ebanista de nuestro taller de Tetuán revisará tu solicitud para <strong>{formData.neighborhood}</strong> y te llamará al {formData.phone} en menos de 24 horas laborables.
                  </p>
                  <button
                    onClick={() => {
                      setFormSubmitted(false);
                      setFormData({
                        name: '',
                        phone: '',
                        projectType: 'armarios',
                        neighborhood: 'Chamberí',
                        message: '',
                        privacyAccepted: true
                      });
                    }}
                    className="text-xs font-semibold text-[#2F4F3A] underline mt-4 cursor-pointer"
                  >
                    Enviar otra consulta
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#343434] mb-1">
                      Nombre y apellidos *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Ej. Carmen García"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full p-3 rounded-lg border border-[#E3D9CC] bg-[#F5F1EA] text-sm text-[#343434] focus:outline-none focus:border-[#2F4F3A]"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#343434] mb-1">
                        Teléfono móvil *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="Ej. 644 12 34 56"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full p-3 rounded-lg border border-[#E3D9CC] bg-[#F5F1EA] text-sm text-[#343434] focus:outline-none focus:border-[#2F4F3A]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#343434] mb-1">
                        Barrio en Madrid *
                      </label>
                      <select
                        value={formData.neighborhood}
                        onChange={(e) => setFormData({ ...formData, neighborhood: e.target.value })}
                        className="w-full p-3 rounded-lg border border-[#E3D9CC] bg-[#F5F1EA] text-sm text-[#343434] focus:outline-none focus:border-[#2F4F3A]"
                      >
                        <option value="Chamberí">Chamberí</option>
                        <option value="Tetuán">Tetuán</option>
                        <option value="Barrio del Pilar">Barrio del Pilar</option>
                        <option value="Chamartín">Chamartín</option>
                        <option value="Moncloa">Moncloa / Argüelles</option>
                        <option value="Otra zona Madrid">Otra zona Madrid norte/centro</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#343434] mb-1">
                      Tipo de proyecto
                    </label>
                    <select
                      value={formData.projectType}
                      onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                      className="w-full p-3 rounded-lg border border-[#E3D9CC] bg-[#F5F1EA] text-sm text-[#343434] focus:outline-none focus:border-[#2F4F3A]"
                    >
                      <option value="armarios">Armarios empotrados y frentes</option>
                      <option value="puertas">Puertas de paso y tapajuntas</option>
                      <option value="salon">Muebles de salón (aparador, mesa, librería)</option>
                      <option value="restauracion">Restauración de mueble antiguo</option>
                      <option value="combinado">Varios elementos combinados</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#343434] mb-1">
                      Mensaje o detalles de las piezas (opcional)
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Cuéntanos brevemente: número de hojas, estado actual de la madera o tono que buscas..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full p-3 rounded-lg border border-[#E3D9CC] bg-[#F5F1EA] text-sm text-[#343434] focus:outline-none focus:border-[#2F4F3A]"
                    ></textarea>
                  </div>

                  <div className="flex items-center space-x-2 text-xs text-[#6B6B6B]">
                    <input
                      type="checkbox"
                      id="privacy-check"
                      checked={formData.privacyAccepted}
                      onChange={(e) => setFormData({ ...formData, privacyAccepted: e.target.checked })}
                      className="w-4 h-4 rounded text-[#2F4F3A] accent-[#2F4F3A]"
                      required
                    />
                    <label htmlFor="privacy-check" className="cursor-pointer">
                      Acepto la política de privacidad y el tratamiento de mis datos para el presupuesto.
                    </label>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-[#2F4F3A] hover:bg-[#243E2E] text-white font-bold py-3.5 px-4 rounded-lg shadow-sm hover:shadow transition-all cursor-pointer text-sm"
                  >
                    Enviar consulta de presupuesto
                  </button>
                </form>
              )}
            </div>

            {/* Datos de taller y Mapa (5 columnas) */}
            <div className="lg:col-span-5 space-y-6">
              
              {/* Tarjeta de Ubicación */}
              <div className="bg-white rounded-2xl border border-[#B08C4F]/30 p-6 shadow-xs">
                <div className="flex items-center space-x-2 text-xs font-bold text-[#2F4F3A] uppercase tracking-wider mb-2">
                  <MapPin className="w-4 h-4" />
                  <span>Taller Físico en Madrid</span>
                </div>
                <h3 className="font-editorial text-xl font-semibold text-[#343434] mb-1">
                  Lacados Arribas Martín S.L.
                </h3>
                <p className="text-xs text-[#6B6B6B] mb-4">
                  Fundado en 1969 en el distrito de Tetuán.
                </p>

                <div className="space-y-3 text-xs text-[#343434] border-t border-[#E3D9CC] pt-4">
                  <p>
                    <strong className="block text-[#2F4F3A]">Dirección:</strong>
                    Calle Olite 45, 28020 Tetuán, Madrid
                  </p>
                  <p>
                    <strong className="block text-[#2F4F3A]">Transporte Público:</strong>
                    Metro Cuatro Caminos (L1, L2, L6) o Alvarado (L1).<br />
                    Autobuses líneas 3, 45, 64, 124, 127.
                  </p>
                  <p>
                    <strong className="block text-[#2F4F3A]">Horario de Taller:</strong>
                    Lunes a Viernes: 8:30 - 18:30 h (Ininterrumpido).<br />
                    Sábados: Con cita previa confirmada.
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-[#E3D9CC] flex flex-col sm:flex-row gap-2">
                  <a
                    href="https://maps.google.com/?q=Calle+Olite+45+Madrid"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 text-center py-2.5 px-3 bg-[#E3D9CC] hover:bg-[#C2B39A] text-[#343434] font-semibold text-xs rounded-lg transition-colors"
                  >
                    Abrir en Google Maps
                  </a>
                  <a
                    href={`tel:${BUSINESS_INFO.phoneRaw}`}
                    className="flex-1 text-center py-2.5 px-3 bg-[#2F4F3A] hover:bg-[#243E2E] text-white font-semibold text-xs rounded-lg transition-colors"
                  >
                    Llamar al taller
                  </a>
                </div>
              </div>

              {/* Caja de recomendaciones para visitas */}
              <div className="bg-[#E3D9CC]/40 rounded-xl p-5 border border-[#B08C4F]/30 text-xs text-[#343434] space-y-2">
                <strong className="block text-sm text-[#2F4F3A]">Visitas con Cita Previa</strong>
                <p className="text-[#6B6B6B] leading-relaxed">
                  Para poder dedicarte el tiempo que tu proyecto requiere y atenderte con el catálogo físico de muestras y tonos, te recomendamos llamarnos o avisarnos previamente por WhatsApp antes de venir al taller.
                </p>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* =========================================================================
          BLOQUE 4: FAQS DE CONTACTO
          ========================================================================= */}
      <section className="bg-[#E3D9CC]/30 py-12 sm:py-16 border-t border-[#E3D9CC]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h3 className="font-editorial text-2xl font-semibold text-[#343434]">
              Preguntas frecuentes sobre cómo contactarnos y pedir presupuesto
            </h3>
          </div>

          <div className="space-y-3">
            {contactFaqs.map((faq, i) => (
              <div key={i} className="bg-white p-5 rounded-xl border border-[#E3D9CC]">
                <h4 className="font-sans font-bold text-sm text-[#2F4F3A] mb-1">
                  {faq.q}
                </h4>
                <p className="text-xs sm:text-sm text-[#6B6B6B] leading-relaxed">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
