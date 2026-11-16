import React from 'react';

interface CookieConsentProps {
  onAccept: () => void;
  onDecline: () => void;
}

export const CookieConsent: React.FC<CookieConsentProps> = ({ onAccept, onDecline }) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-[60] bg-[#F5F1EA] border-t border-[#B08C4F]/40 shadow-lg px-4 py-3 sm:px-6">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <p className="text-xs sm:text-sm text-[#343434] leading-relaxed">
          Usamos cookies analíticas para mejorar la web. Puedes aceptarlas o usar solo las necesarias.
        </p>
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={onDecline}
            className="text-xs font-semibold px-3 py-1.5 rounded-lg border border-[#B08C4F]/40 text-[#343434] hover:bg-[#E3D9CC] transition-colors"
          >
            Solo necesarias
          </button>
          <button
            onClick={onAccept}
            className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-[#2F4F3A] text-white hover:bg-[#243E2E] transition-colors"
          >
            Aceptar analítica
          </button>
        </div>
      </div>
    </div>
  );
};