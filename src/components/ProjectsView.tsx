import React, { useState } from 'react';
import { 
  Sparkles, 
  Filter, 
  Calendar, 
  MapPin, 
  Clock, 
  Check, 
  Camera, 
  RefreshCw, 
  Send, 
  ChevronRight,
  Info
} from 'lucide-react';
import { REAL_PROJECTS, BUSINESS_INFO } from '../data/content';
import { ProjectItem, Neighborhood } from '../types';
import { SimulatorSection } from './SimulatorSection';

interface ProjectsViewProps {
  onOpenWhatsApp: (customMessage?: string) => void;
}

export const ProjectsView: React.FC<ProjectsViewProps> = ({ onOpenWhatsApp }) => {
  // Filtros de galería
  const [categoryFilter, setCategoryFilter] = useState<string>('todos');
  const [neighborhoodFilter, setNeighborhoodFilter] = useState<string>('todos');
  const [activeProjectForSlider, setActiveProjectForSlider] = useState<ProjectItem>(REAL_PROJECTS[0]);
  const [sliderPosition, setSliderPosition] = useState<number>(50);

  // Filtrado de proyectos
  const filteredProjects = REAL_PROJECTS.filter((p) => {
    const matchCategory = categoryFilter === 'todos' || p.category === categoryFilter;
    const matchNeighborhood = neighborhoodFilter === 'todos' || p.neighborhood.toLowerCase().includes(neighborhoodFilter.toLowerCase());
    return matchCategory && matchNeighborhood;
  });

  return (
    <div className="w-full bg-[#F5F1EA] py-8 sm:py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Cabecera Proyectos */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs uppercase tracking-wider text-[#2F4F3A] font-bold bg-[#E3D9CC]/50 px-3.5 py-1.5 rounded-full inline-block mb-3">
            Galería & Herramientas
          </span>
          <h1 className="font-editorial text-3xl sm:text-4xl font-semibold text-[#343434] mb-4">
            Proyectos de lacado satinado en Tetuán, Chamberí y Barrio del Pilar o cualquier otra zona de Madrid
          </h1>
          <p className="text-sm sm:text-base text-[#6B6B6B]">
            Casos reales de armarios empotrados, puertas y salones modernizados con acabado sedoso en Madrid norte y centro. Compara el antes y después y prueba nuestro simulador.
          </p>
        </div>

        {/* =========================================================================
            SECCIÓN 1: COMPARADOR INTERACTIVO ANTES / DESPUÉS
            ========================================================================= */}
        <div className="bg-white rounded-2xl border border-[#B08C4F]/30 p-6 sm:p-8 mb-12 shadow-sm">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
            <div>
              <span className="text-xs font-semibold text-[#2F4F3A] uppercase tracking-wider block">
                Proyecto Destacado · {activeProjectForSlider.neighborhood}
              </span>
              <h2 className="font-editorial text-xl sm:text-2xl font-semibold text-[#343434]">
                {activeProjectForSlider.title}
              </h2>
            </div>
            <span className="text-xs text-[#6B6B6B] bg-[#F5F1EA] px-3 py-1.5 rounded-lg border border-[#E3D9CC]">
              Plazo de taller: {activeProjectForSlider.days} días laborables
            </span>
          </div>

          {/* Visor interactivo Slider Antes/Después */}
          <div className="relative w-full h-[320px] sm:h-[440px] rounded-xl overflow-hidden select-none border border-[#E3D9CC]">
            {/* Imagen DESPUÉS (Base) */}
            <img
              src={activeProjectForSlider.afterImg}
              alt="Después de lacar"
              className="absolute inset-0 w-full h-full object-cover"
            />

            {/* Imagen ANTES (Recortada por el slider) */}
            <div
              className="absolute inset-0 overflow-hidden"
              style={{ width: `${sliderPosition}%` }}
            >
              <img
                src={activeProjectForSlider.beforeImg}
                alt="Antes de lacar"
                className="absolute inset-0 w-full h-full object-cover max-w-none"
                style={{ width: '100%', height: '100%' }}
              />
              <span className="absolute top-4 left-4 bg-[#343434]/90 text-white text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-md shadow">
                Antes (Madera original)
              </span>
            </div>

            <span className="absolute top-4 right-4 bg-[#2F4F3A] text-white text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-md shadow">
              Después (Lacado Satinado)
            </span>

            {/* Línea divisoria del slider */}
            <div
              className="absolute top-0 bottom-0 w-1 bg-white shadow-xl cursor-ew-resize flex items-center justify-center pointer-events-none"
              style={{ left: `${sliderPosition}%` }}
            >
              <div className="w-8 h-8 rounded-full bg-white text-[#2F4F3A] shadow-lg border border-[#B08C4F] flex items-center justify-center text-xs font-bold pointer-events-auto">
                ↔
              </div>
            </div>

            {/* Input range invisible para control táctil y ratón */}
            <input
              type="range"
              min="0"
              max="100"
              value={sliderPosition}
              onChange={(e) => setSliderPosition(Number(e.target.value))}
              className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-10"
              aria-label="Arrastrar slider antes y después"
            />
          </div>

          <div className="flex flex-wrap items-center justify-between text-xs text-[#6B6B6B] mt-4 pt-3 border-t border-[#E3D9CC]">
            <p>
              💡 <em>Arrastra el círculo blanco hacia los lados para comparar la transformación de textura y luminosidad.</em>
            </p>
            <div className="flex items-center space-x-2 mt-2 sm:mt-0">
              {activeProjectForSlider.details.map((d, i) => (
                <span key={i} className="bg-[#E3D9CC]/40 text-[#343434] px-2 py-0.5 rounded text-[11px]">
                  {d}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* =========================================================================
            SECCIÓN 2: FILTROS Y GRID DE PROYECTOS
            ========================================================================= */}
        <div className="mb-14">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <h3 className="font-editorial text-2xl font-semibold text-[#343434]">
              Galería de Proyectos en Madrid
            </h3>

            {/* Filtros por Categoría */}
            <div className="flex flex-wrap items-center gap-2">
              {[
                { id: 'todos', label: 'Todos' },
                { id: 'armarios', label: 'Armarios' },
                { id: 'puertas', label: 'Puertas' },
                { id: 'salon', label: 'Salones' },
                { id: 'restauracion', label: 'Restauración' }
              ].map((f) => (
                <button
                  key={f.id}
                  onClick={() => setCategoryFilter(f.id)}
                  className={`text-xs px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                    categoryFilter === f.id
                      ? 'bg-[#2F4F3A] text-white font-semibold'
                      : 'bg-white text-[#343434] hover:bg-[#E3D9CC] border border-[#E3D9CC]'
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>

          {/* Grid de proyectos */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((proj) => (
              <div
                key={proj.id}
                onClick={() => {
                  setActiveProjectForSlider(proj);
                  window.scrollTo({ top: 260, behavior: 'smooth' });
                }}
                className={`bg-white rounded-xl overflow-hidden border transition-all cursor-pointer group flex flex-col justify-between ${
                  activeProjectForSlider.id === proj.id
                    ? 'border-[#2F4F3A] ring-2 ring-[#2F4F3A]/30 shadow-md'
                    : 'border-[#E3D9CC] hover:border-[#B08C4F]/60 shadow-xs'
                }`}
              >
                <div>
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={proj.afterImg}
                      alt={proj.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <span className="absolute top-3 left-3 bg-[#2F4F3A] text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded">
                      {proj.categoryLabel}
                    </span>
                    <span className="absolute bottom-3 right-3 bg-white/90 text-[#343434] text-[10px] font-semibold px-2 py-0.5 rounded flex items-center space-x-1">
                      <MapPin className="w-3 h-3 text-[#2F4F3A]" />
                      <span>{proj.neighborhood}</span>
                    </span>
                  </div>

                  <div className="p-5">
                    <h4 className="font-sans font-bold text-base text-[#343434] group-hover:text-[#2F4F3A] mb-2 leading-snug">
                      {proj.title}
                    </h4>
                    <p className="text-xs text-[#6B6B6B] line-clamp-2 leading-relaxed">
                      {proj.description}
                    </p>
                  </div>
                </div>

                <div className="px-5 pb-5 pt-0 flex items-center justify-between text-xs font-semibold text-[#2F4F3A]">
                  <span>Ver en comparador ↑</span>
                  <span className="text-[11px] text-[#6B6B6B] font-normal">{proj.days} días</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* =========================================================================
            SECCIÓN 3: SIMULADOR IA DE ACABADOS CON GEMINI NANO BANANA (#simulador)
            ========================================================================= */}
        <SimulatorSection onOpenWhatsApp={onOpenWhatsApp} />

      </div>
    </div>
  );
};
