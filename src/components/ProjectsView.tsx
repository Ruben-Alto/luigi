import React, { useState, useMemo } from 'react';
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
import { BUSINESS_INFO } from '../data/content';
import { SimulatorSection } from './SimulatorSection';

interface ProjectsViewProps {
  onOpenWhatsApp: (customMessage?: string) => void;
}

interface DynamicProject {
  id: string;
  title: string;
  category: string;
  categoryLabel: string;
  neighborhood: string;
  description: string;
  beforeImg: string;
  afterImg: string;
  beforeImgUploaded?: string; // Foto "antes" subida por admin (solo para comparador)
  details: string[];
  days: number;
}

const DYNAMIC_PROJECTS: DynamicProject[] = [
  {
    id: 'project-1',
    title: 'Mesilla restaurada y lacada',
    category: 'restauracion',
    categoryLabel: 'Restauración antigua',
    neighborhood: 'Tetuán',
    description: 'Mesilla de noche antigua restaurada íntegramente en taller: lijado, saneado de madera, lacado satinado artesanal y patina protectora.',
    beforeImg: '/images/projects/project-1.jpeg',
    afterImg: '/images/projects/project-1.jpeg',
    beforeImgUploaded: '/images/projects/before/project-1.jpeg',
    details: ['Restauración completa', 'Lacado satinado artesanal', 'Patina protectora'],
    days: 8
  },
  {
    id: 'project-2',
    title: 'Boiserie lacada y patinada',
    category: 'salon',
    categoryLabel: 'Muebles de salón',
    neighborhood: 'Chamberí',
    description: 'Boiserie completa de salón lacada y patinada artesanalmente, respetando molduras y relieves originales con acabado satinado sedoso.',
    beforeImg: '/images/projects/project-2.jpeg',
    afterImg: '/images/projects/project-2.jpeg',
    details: ['Boiserie completa', 'Lacado y patina artesanal', 'Molduras respetadas'],
    days: 12
  },
  {
    id: 'project-3',
    title: 'Puertas de paso lacadas',
    category: 'puertas',
    categoryLabel: 'Puertas de paso',
    neighborhood: 'Tetuán',
    description: 'Conjunto de puertas de paso lacadas en satinado sedoso con marcos y tapajuntas a juego, unificando la estética de la vivienda.',
    beforeImg: '/images/projects/project-3.jpeg',
    afterImg: '/images/projects/project-3.jpeg',
    beforeImgUploaded: '/images/projects/before/project-3.jpeg',
    details: ['Lacado satinado', 'Marcos y tapajuntas a juego', 'Herrajes renovados'],
    days: 7
  },
  {
    id: 'project-4',
    title: 'Silla de comedor restaurada',
    category: 'salon',
    categoryLabel: 'Muebles de salón',
    neighborhood: 'Chamberí',
    description: 'Silla de comedor antigua restaurada y lacada en taller, conservando su estructura original con acabado satinado duradero.',
    beforeImg: '/images/projects/project-4.jpeg',
    afterImg: '/images/projects/project-4.jpeg',
    details: ['Restauración estructural', 'Lacado satinado', 'Conservación original'],
    days: 6
  },
  {
    id: 'project-5',
    title: 'Mesilla lacada y patinada',
    category: 'restauracion',
    categoryLabel: 'Restauración antigua',
    neighborhood: 'Barrio del Pilar',
    description: 'Mesilla antigua lacada y patinada con técnica artesanal, acabado satinado que realza la veta de la madera.',
    beforeImg: '/images/projects/project-5.jpeg',
    afterImg: '/images/projects/project-5.jpeg',
    details: ['Lacado artesanal', 'Patina artesanal', 'Acabado satinado'],
    days: 7
  },
  // project-6 eliminado
  {
    id: 'project-7',
    title: 'Juego de mesa y sillas de comedor',
    category: 'salon',
    categoryLabel: 'Muebles de salón',
    neighborhood: 'Chamartín',
    description: 'Conjunto completo de mesa de comedor y sillas lacadas en satinado sedoso, renovando el corazón de la estancia.',
    beforeImg: '/images/projects/project-7.jpeg',
    afterImg: '/images/projects/project-7.jpeg',
    beforeImgUploaded: '/images/projects/before/project-7.jpeg',
    details: ['Mesa + sillas', 'Lacado satinado completo', 'Conjunto unificado'],
    days: 10
  },
  {
    id: 'project-8',
    title: 'Cómoda restaurada en taller',
    category: 'restauracion',
    categoryLabel: 'Restauración antigua',
    neighborhood: 'Tetuán',
    description: 'Cómoda de madera maciza restaurada íntegramente en nuestro taller de Tetuán: desparasitado, saneado, lacado y patina.',
    beforeImg: '/images/projects/project-8.jpeg',
    afterImg: '/images/projects/project-8.jpeg',
    beforeImgUploaded: '/images/projects/before/project-8.jpeg',
    details: ['Restauración completa en taller', 'Desparasitado', 'Lacado y patina'],
    days: 12
  },
  {
    id: 'project-9',
    title: 'Biombo restaurado y lacado en negro',
    category: 'restauracion',
    categoryLabel: 'Restauración antigua',
    neighborhood: 'Chamberí',
    description: 'Biombo antiguo restaurado y lacado en negro satinado, respetando y resaltando el dibujo original de sus paneles.',
    beforeImg: '/images/projects/project-9.jpeg',
    afterImg: '/images/projects/project-9.jpeg',
    details: ['Lacado negro satinado', 'Dibujo original respetado', 'Restauración artesanal'],
    days: 10
  },
  {
    id: 'project-10',
    title: 'Mesilla auxiliar de salón',
    category: 'salon',
    categoryLabel: 'Muebles de salón',
    neighborhood: 'Moncloa',
    description: 'Mesilla auxiliar lacada en satinado artesanal, pieza funcional y decorativa con acabado sedoso al tacto.',
    beforeImg: '/images/projects/project-10.jpeg',
    afterImg: '/images/projects/project-10.jpeg',
    details: ['Lacado satinado', 'Pieza auxiliar', 'Acabado sedoso'],
    days: 6
  },
  {
    id: 'project-11',
    title: 'Mesilla lacada en negro',
    category: 'restauracion',
    categoryLabel: 'Restauración antigua',
    neighborhood: 'Tetuán',
    description: 'Mesilla antigua lacada en negro satinado elegante, transformando una pieza clásica en un elemento contemporáneo.',
    beforeImg: '/images/projects/project-11.jpeg',
    afterImg: '/images/projects/project-11.jpeg',
    details: ['Lacado negro satinado', 'Transformación contemporánea', 'Estructura conservada'],
    days: 7
  },
  {
    id: 'project-12',
    title: 'Estantería lacada - Tienda Gucci Ibiza',
    category: 'armarios',
    categoryLabel: 'Armarios empotrados',
    neighborhood: 'Ibiza',
    description: 'Estantería comercial lacada y restaurada para tienda Gucci en Ibiza, acabado satinado de alta resistencia para retail.',
    beforeImg: '/images/projects/project-12.jpeg',
    afterImg: '/images/projects/project-12.jpeg',
    beforeImgUploaded: '/images/projects/before/project-12.jpeg',
    details: ['Proyecto comercial Gucci', 'Lacado alta resistencia', 'Acabado retail'],
    days: 14
  },
  {
    id: 'project-13',
    title: 'Mesa de centro lacada y patinada',
    category: 'salon',
    categoryLabel: 'Muebles de salón',
    neighborhood: 'Chamberí',
    description: 'Mesa de centro de salón lacada y patinada artesanalmente, pieza central con acabado satinado que invita al tacto.',
    beforeImg: '/images/projects/project-13.jpeg',
    afterImg: '/images/projects/project-13.jpeg',
    details: ['Mesa de centro', 'Lacado y patina', 'Pieza central'],
    days: 7
  },
  {
    id: 'project-14',
    title: 'Estantería Gucci Madrid Castellana',
    category: 'armarios',
    categoryLabel: 'Armarios empotrados',
    neighborhood: 'Madrid Norte',
    description: 'Estantería comercial restaurada y lacada para tienda Gucci en Castellana (Madrid), acabado satinado premium para flagship.',
    beforeImg: '/images/projects/project-14.jpeg',
    afterImg: '/images/projects/project-14.jpeg',
    details: ['Flagship Gucci Castellana', 'Lacado premium', 'Proyecto comercial'],
    days: 14
  },
  {
    id: 'project-15',
    title: 'Sillas barnizadas',
    category: 'salon',
    categoryLabel: 'Muebles de salón',
    neighborhood: 'Barrio del Pilar',
    description: 'Conjunto de sillas barnizadas en satinado, renovación ligera que mantiene la calidez de la madera original.',
    beforeImg: '/images/projects/project-15.jpeg',
    afterImg: '/images/projects/project-15.jpeg',
    details: ['Barnizado satinado', 'Madera original conservada', 'Conjunto unificado'],
    days: 5
  },
  {
    id: 'project-16',
    title: 'Mesilla lacada y patinada',
    category: 'restauracion',
    categoryLabel: 'Restauración antigua',
    neighborhood: 'Tetuán',
    description: 'Mesilla antigua con doble proceso de lacado y patina artesanal, acabado satinado con profundidad y carácter.',
    beforeImg: '/images/projects/project-16.jpeg',
    afterImg: '/images/projects/project-16.jpeg',
    details: ['Lacado + patina', 'Proceso doble', 'Acabado con carácter'],
    days: 8
  },
  {
    id: 'project-17',
    title: 'Silla con patina al óleo',
    category: 'restauracion',
    categoryLabel: 'Restauración antigua',
    neighborhood: 'Chamberí',
    description: 'Silla restaurada con técnica de patina al óleo en taller, acabado artístico único que realza los relieves de la talla.',
    beforeImg: '/images/projects/project-17.jpeg',
    afterImg: '/images/projects/project-17.jpeg',
    details: ['Patina al óleo', 'Técnica artística', 'Talla realzada'],
    days: 9
  },
  {
    id: 'project-18',
    title: 'Mesilla lacada en azul con patina blanca',
    category: 'restauracion',
    categoryLabel: 'Restauración antigua',
    neighborhood: 'Chamartín',
    description: 'Mesilla lacada en azul satinado con patina blanca envejecida, combinación de color contemporáneo y técnica tradicional.',
    beforeImg: '/images/projects/project-18.jpeg',
    afterImg: '/images/projects/project-18.jpeg',
    details: ['Lacado azul satinado', 'Patina blanca envejecida', 'Color + técnica tradicional'],
    days: 8
  },
  {
    id: 'project-19',
    title: 'Lacado de cercos y barnizado in situ',
    category: 'puertas',
    categoryLabel: 'Puertas de paso',
    neighborhood: 'Tetuán',
    description: 'Lacado de cercos y marcos en domicilio con micro-turbina, y barnizado de puertas de paso sin desmontar, protección total de suelos y paredes.',
    beforeImg: '/images/projects/project-19.jpeg',
    afterImg: '/images/projects/project-19.jpeg',
    beforeImgUploaded: '/images/projects/before/project-19.jpeg',
    details: ['Lacado in situ', 'Micro-turbina', 'Protección total'],
    days: 5
  },
  {
    id: 'project-20',
    title: 'Barnizado de sillón',
    category: 'restauracion',
    categoryLabel: 'Restauración antigua',
    neighborhood: 'Moncloa',
    description: 'Sillón clásico barnizado en satinado, protección y realce de la madera noble con acabado sedoso y duradero.',
    beforeImg: '/images/projects/project-20.jpeg',
    afterImg: '/images/projects/project-20.jpeg',
    details: ['Barnizado satinado', 'Madera noble', 'Protección duradera'],
    days: 6
  },
  {
    id: 'project-21',
    title: 'Lacado de puertas de paso',
    category: 'puertas',
    categoryLabel: 'Puertas de paso',
    neighborhood: 'Chamberí',
    description: 'Conjunto de puertas de paso lacadas en satinado artesanal, incluyendo marcos y tapajuntas para continuidad perfecta.',
    beforeImg: '/images/projects/project-21.jpeg',
    afterImg: '/images/projects/project-21.jpeg',
    beforeImgUploaded: '/images/projects/before/project-21.jpeg',
    details: ['Lacado artesanal', 'Marcos y tapajuntas', 'Continuidad visual'],
    days: 8
  },
  {
    id: 'project-22',
    title: 'Sillones lacados y patinados en crema',
    category: 'restauracion',
    categoryLabel: 'Restauración antigua',
    neighborhood: 'Madrid Norte',
    description: 'Par de sillones clásicos lacados en crema satinado con patina artesanal, tapizados respetados, elegancia atemporal.',
    beforeImg: '/images/projects/project-22.jpeg',
    afterImg: '/images/projects/project-22.jpeg',
    details: ['Lacado crema satinado', 'Patina artesanal', 'Tapizados respetados'],
    days: 10
  }
];

export const ProjectsView: React.FC<ProjectsViewProps> = ({ onOpenWhatsApp }) => {
  // Filtros de galería
  const [categoryFilter, setCategoryFilter] = useState<string>('todos');
  const [neighborhoodFilter, setNeighborhoodFilter] = useState<string>('todos');
  const [activeProjectForSlider, setActiveProjectForSlider] = useState<DynamicProject>(DYNAMIC_PROJECTS[0]);
  const [sliderPosition, setSliderPosition] = useState<number>(50);
  const [expandedProjectId, setExpandedProjectId] = useState<string | null>(null);

  // Filtrado de proyectos dinámicos
  const filteredProjects = useMemo(() => {
    return DYNAMIC_PROJECTS.filter((p) => {
      const matchCategory = categoryFilter === 'todos' || p.category === categoryFilter;
      const matchNeighborhood = neighborhoodFilter === 'todos' || p.neighborhood.toLowerCase().includes(neighborhoodFilter.toLowerCase());
      return matchCategory && matchNeighborhood;
    });
  }, [categoryFilter, neighborhoodFilter]);

  const handleCardClick = (proj: DynamicProject) => {
    if (expandedProjectId === proj.id) {
      setExpandedProjectId(null);
    } else {
      setExpandedProjectId(proj.id);
    }
  };

  const handleComparatorClick = (proj: DynamicProject, e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveProjectForSlider(proj);
    setExpandedProjectId(null);
    window.scrollTo({ top: 260, behavior: 'smooth' });
  };

  const getBeforeImageForComparator = (proj: DynamicProject) => {
    return proj.beforeImgUploaded || proj.afterImg;
  };

  return (
    <div className="w-full bg-[#F5F1EA] py-8 sm:py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Cabecera Proyectos */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs uppercase tracking-wider text-[#2F4F3A] font-bold bg-[#E3D9CC]/50 px-3.5 py-1.5 rounded-full inline-block mb-3">
            Galería & Herramientas
          </span>
          <h1 className="font-editorial text-3xl sm:text-4xl font-semibold text-[#343434] mb-4">
            Proyectos de lacado satinado en Chamberí, Plaza de Castilla, Serrano y en todo Madrid
          </h1>
          <p className="text-sm sm:text-base text-[#6B6B6B]">
            Casos reales de armarios empotrados, puertas y salones modernizados con acabado sedoso en Chamberí, Plaza de Castilla, Serrano y el resto de Madrid. Compara el antes y después y prueba nuestro simulador.
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
                src={getBeforeImageForComparator(activeProjectForSlider)}
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
            {filteredProjects.map((proj) => {
              const isExpanded = expandedProjectId === proj.id;
              return (
                <div
                  key={proj.id}
                  className={`bg-white rounded-xl overflow-hidden border transition-all ${
                    activeProjectForSlider.id === proj.id
                      ? 'border-[#2F4F3A] ring-2 ring-[#2F4F3A]/30 shadow-md'
                      : 'border-[#E3D9CC] hover:border-[#B08C4F]/60 shadow-xs'
                  }`}
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={proj.afterImg}
                      alt={proj.title}
                      className={`w-full h-full object-cover transition-transform duration-500 ${
                        isExpanded ? 'scale-100' : 'group-hover:scale-105'
                      }`}
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
                    <h4 className="font-sans font-bold text-base text-[#343434] mb-2 leading-snug">
                      {proj.title}
                    </h4>
                    <p className={`text-xs text-[#6B6B6B] leading-relaxed transition-all ${
                      isExpanded ? 'max-h-96 opacity-100' : 'line-clamp-2 max-h-10 opacity-80'
                    }`}>
                      {proj.description}
                    </p>
                    {isExpanded && (
                      <div className="mt-3 pt-3 border-t border-[#E3D9CC] space-y-2 text-xs text-[#6B6B6B]">
                        <div className="font-semibold text-[#343434]">Detalles:</div>
                        <ul className="space-y-1 pl-4 list-disc">
                          {proj.details.map((d, i) => (
                            <li key={i}>{d}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>

                  <div className="px-5 pb-5 pt-0 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs">
                    <button
                      onClick={(e) => handleComparatorClick(proj, e)}
                      className="flex items-center justify-center space-x-1.5 text-[#2F4F3A] font-semibold hover:text-[#243E2E] cursor-pointer px-3 py-2 rounded-lg bg-[#E3D9CC]/40 hover:bg-[#E3D9CC]/60 transition-colors w-full sm:w-auto"
                    >
                      <span>Ver en comparador</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleCardClick(proj);
                      }}
                      className="w-full sm:w-auto px-3 py-2 text-xs text-[#6B6B6B] hover:text-[#343434] font-medium cursor-pointer transition-colors"
                    >
                      {isExpanded ? '⌄ Ver menos' : '⌃ Ver más'}
                    </button>
                  </div>
                </div>
              );
            })}
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
