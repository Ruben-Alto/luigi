import React from 'react';
import { ActiveTab } from '../types';
import { BUSINESS_INFO } from '../data/content';

interface LegalViewProps {
  section: 'aviso' | 'privacidad' | 'cookies';
  onClose: () => void;
}

const TITULAR = 'Manuel Arribas Caballero';
const DENOMINACION = 'Lacados Arribas Martín S.L.';
const DIRECCION = `${BUSINESS_INFO.street}, ${BUSINESS_INFO.postalCode} ${BUSINESS_INFO.district}, ${BUSINESS_INFO.city}`;
const TELEFONO = BUSINESS_INFO.phone;
const EMAIL = 'info@lacadosarribasmartin.es';

export const LegalView: React.FC<LegalViewProps> = ({ section, onClose }) => {
  const isAviso = section === 'aviso';
  const isPrivacidad = section === 'privacidad';
  const isCookies = section === 'cookies';

  const titleMap: Record<string, string> = {
    aviso: 'Aviso Legal',
    privacidad: 'Política de Privacidad',
    cookies: 'Política de Cookies'
  };

  return (
    <div className="bg-[#F5F1EA] min-h-screen py-12 sm:py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <button
          onClick={onClose}
          className="inline-flex items-center space-x-1 text-xs font-semibold text-[#2F4F3A] hover:text-[#243E2E] mb-8"
          aria-label="Volver al inicio"
        >
          ← Volver al inicio
        </button>

        <h1 className="font-editorial text-2xl sm:text-3xl font-semibold text-[#343434] mb-6">
          {titleMap[section]}
        </h1>

        <div className="bg-white rounded-xl p-8 sm:p-12 border border-[#E3D9CC] shadow-xs text-[#343434] leading-relaxed">
          <p className="text-sm mb-4 text-[#6B6B6B]">
            Última actualización: 15 de noviembre de 2026.
          </p>

          {isAviso && (
            <>
              <h2 className="font-bold text-lg text-[#2F4F3A] mb-3 mt-6">1. Titular del sitio web</h2>
              <p className="mb-4">
                El titular de este sitio web es <strong>{TITULAR}</strong>, en su condición de
                representante de <strong>{DENOMINACION}</strong>, con domicilio en{' '}
                <strong>{DIRECCION}</strong>, teléfonos de contacto <strong>{TELEFONO}</strong> y{' '}
                <strong>{EMAIL}</strong>.
              </p>
              <h2 className="font-bold text-lg text-[#2F4F3A] mb-3 mt-6">2. Objeto</h2>
              <p className="mb-4">
                El presente aviso legal regula el uso y acceso al sitio web
                <strong>https://lacadosarribasmartin.es</strong>, dedicado a la difusión de
                servicios de lacado satinado artesanal de armarios empotrados, puertas de paso y
                muebles de salón en Chamberí, Plaza de Castilla, Serrano y resto de Madrid.
              </p>
              <h2 className="font-bold text-lg text-[#2F4F3A] mb-3 mt-6">3. Propiedad intelectual e industrial</h2>
              <p className="mb-4">
                Todos los contenidos, textos, imágenes, logotipos y diseños de este sitio web son
                propiedad de {DENOMINACION} o de terceros que han autorizado su uso. Queda
                prohibida su reproducción, distribución o transformación sin autorización previa
                por escrito del titular.
              </p>
              <h2 className="font-bold text-lg text-[#2F4F3A] mb-3 mt-6">4. Responsabilidad</h2>
              <p className="mb-4">
                El titular no se responsabiliza del uso indebido de los contenidos ni de los daños
                que pudieran derivarse del acceso o de la imposibilidad de acceso al sitio web.
              </p>
              <h2 className="font-bold text-lg text-[#2F4F3A] mb-3 mt-6">5. Ley aplicable y jurisdicción</h2>
              <p className="mb-4">
                Estas condiciones se rigen por la legislación española. Para cualquier controversia
                derivada del acceso o uso del sitio web, las partes se someten a los juzgados y
                tribunales del domicilio del titular en Madrid.
              </p>
            </>
          )}

          {isPrivacidad && (
            <>
              <h2 className="font-bold text-lg text-[#2F4F3A] mb-3 mt-6">1. Responsable del tratamiento</h2>
              <p className="mb-4">
                <strong>{TITULAR}</strong> ({DENOMINACION}), con domicilio en{' '}
                <strong>{DIRECCION}</strong> y teléfono <strong>{TELEFONO}</strong>, es el
                responsable del tratamiento de los datos personales recabados a través de este
                sitio web.
              </p>
              <h2 className="font-bold text-lg text-[#2F4F3A] mb-3 mt-6">2. Finalidad y base legitimadora</h2>
              <p className="mb-4">
                Los datos enviados a través del formulario de contacto y WhatsApp se emplean
                exclusivamente para elaborar presupuestos de lacado, responder consultas y gestionar
                la prestación del servicio solicitado. La base legitimadora es el consentimiento
                del interesado y la ejecución de medidas precontractuales.
              </p>
              <h2 className="font-bold text-lg text-[#2F4F3A] mb-3 mt-6">3. Destinatarios</h2>
              <p className="mb-4">
                No se cederán datos a terceros salvo obligación legal. Los datos se almacenan
                únicamente para la gestión interna del taller de lacado en Tetuán.
              </p>
              <h2 className="font-bold text-lg text-[#2F4F3A] mb-3 mt-6">4. Derechos</h2>
              <p className="mb-4">
                Puede ejercer sus derechos de acceso, rectificación, supresión, limitación,
                oposición y portabilidad dirigiéndose por escrito a{' '}
                <strong>{DIRECCION}</strong> o por correo electrónico a{' '}
                <strong>{EMAIL}</strong>, adjuntando copia de su DNI. También puede presentar
                reclamación ante la Agencia Española de Protección de Datos (AEPD).
              </p>
            </>
          )}

          {isCookies && (
            <>
              <h2 className="font-bold text-lg text-[#2F4F3A] mb-3 mt-6">1. Qué son las cookies</h2>
              <p className="mb-4">
                Las cookies son pequeños archivos de texto que se almacenan en su dispositivo al
                visitar este sitio web para garantizar su correcto funcionamiento y mejorar su
                experiencia de navegación.
              </p>
              <h2 className="font-bold text-lg text-[#2F4F3A] mb-3 mt-6">2. Tipos de cookies utilizadas</h2>
              <p className="mb-4">
                Este sitio utiliza únicamente cookies técnicas necesarias para el funcionamiento
                de la aplicación (sesión, navegación entre secciones y envío de formularios). No se
                utilizan cookies de análisis, publicitarias ni de seguimiento de terceros.
              </p>
              <h2 className="font-bold text-lg text-[#2F4F3A] mb-3 mt-6">3. Gestión y desactivación</h2>
              <p className="mb-4">
                Puede permitir, bloquear o eliminar las cookies instaladas configurando las
                opciones de su navegador. La desactivación de cookies técnicas podría impedir el
                correcto funcionamiento de algunas secciones del sitio.
              </p>
              <h2 className="font-bold text-lg text-[#2F4F3A] mb-3 mt-6">4. Contacto</h2>
              <p className="mb-4">
                Para cualquier duda sobre esta política de cookies, puede contactar con el titular
                en <strong>{DIRECCION}</strong> o a través de <strong>{EMAIL}</strong> y
                <strong>{TELEFONO}</strong>.
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
