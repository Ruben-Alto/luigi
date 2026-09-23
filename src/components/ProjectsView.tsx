import React, { useState } from 'react';
import { 
  Sparkles, 
  Calculator, 
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

interface ProjectsViewProps {
  onOpenWhatsApp: (customMessage?: string) => void;
}

export const ProjectsView: React.FC<ProjectsViewProps> = ({ onOpenWhatsApp }) => {
  // Filtros de galería
  const [categoryFilter, setCategoryFilter] = useState<string>('todos');
  const [neighborhoodFilter, setNeighborhoodFilter] = useState<string>('todos');
  const [activeProjectForSlider, setActiveProjectForSlider] = useState<ProjectItem>(REAL_PROJECTS[0]);
  const [sliderPosition, setSliderPosition] = useState<number>(50);

  // Estados del Simulador IA de Acabados
  const [simulatorItemType, setSimulatorItemType] = useState<string>('armario');
  const [simulatorColor, setSimulatorColor] = useState<{ name: string; hex: string; desc: string }>({
    name: 'Blanco Roto Cálido',
    hex: '#F5F1EA',
    desc: 'Luminosidad neutra sin deslumbramientos.'
  });
  const [simulatorFinish, setSimulatorFinish] = useState<'satinado' | 'mate'>('satinado');
  const [uploadedImagePreview, setUploadedImagePreview] = useState<string | null>(null);

  // Estados de la Calculadora de Presupuesto
  const [calcServiceType, setCalcServiceType] = useState<'armarios' | 'puertas' | 'salon' | 'restauracion'>('armarios');
  const [calcQuantity, setCalcQuantity] = useState<number>(6); // ej. 6 puertas de armario
  const [calcIncludeFrames, setCalcIncludeFrames] = useState<boolean>(true);
  const [calcNeighborhood, setCalcNeighborhood] = useState<string>('Chamberí');
  const [calcWoodCondition, setCalcWoodCondition] = useState<'bueno' | 'medio' | 'antiguo'>('medio');

  // Filtrado de proyectos
  const filteredProjects = REAL_PROJECTS.filter((p) => {
    const matchCategory = categoryFilter === 'todos' || p.category === categoryFilter;
    const matchNeighborhood = neighborhoodFilter === 'todos' || p.neighborhood.toLowerCase().includes(neighborhoodFilter.toLowerCase());
    return matchCategory && matchNeighborhood;
  });

  // Muestras para el simulador
  const sampleImagesByType: Record<string, { before: string; title: string }> = {
    armario: {
      before: 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=800&q=80',
      title: 'Armario empotrado sapelly clásico'
    },
    puerta: {
      before: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80',
      title: 'Puerta de paso con barniz anaranjado'
    },
    salon: {
      before: 'https://images.unsplash.com/photo-1540518614846-7ede433c4ef2?auto=format&fit=crop&w=800&q=80',
      title: 'Aparador de salón madera oscura'
    },
    antiguo: {
      before: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80',
      title: 'Cómoda antigua herencia familiar'
    }
  };

  const paletteOptions = [
    { name: 'Blanco Roto Cálido', hex: '#F5F1EA', desc: 'Máxima luminosidad para interiores de Madrid.' },
    { name: 'Gris Piedra Chamberí', hex: '#E3D9CC', desc: 'Neutro contemporáneo suave.' },
    { name: 'Gris Topo Suave', hex: '#C2B39A', desc: 'Calidez envolvente similar al lino.' },
    { name: 'Verde Botella Satinado', hex: '#2F4F3A', desc: 'Distinción señorial británica.' },
    { name: 'Verde Salvia Sedoso', hex: '#A4B3A0', desc: 'Tendencia botánica mate anti-huellas.' },
    { name: 'Negro Carbón Mate', hex: '#343434', desc: 'Elegancia sobria para piezas singulares.' }
  ];

  // Cálculo de presupuesto orientativo
  const calculateEstimate = () => {
    let min = 0;
    let max = 0;
    let days = '7 - 10 días laborables';

    if (calcServiceType === 'armarios') {
      const basePerDoor = calcIncludeFrames ? 140 : 120;
      const multiplier = calcWoodCondition === 'antiguo' ? 1.25 : calcWoodCondition === 'bueno' ? 0.95 : 1.1;
      min = Math.round(calcQuantity * basePerDoor * multiplier);
      max = Math.round(min * 1.3);
      days = calcQuantity > 8 ? '10 - 14 días' : '7 - 10 días';
    } else if (calcServiceType === 'puertas') {
      const basePerDoor = calcIncludeFrames ? 160 : 130;
      const multiplier = calcWoodCondition === 'antiguo' ? 1.2 : 1.05;
      min = Math.round(calcQuantity * basePerDoor * multiplier);
      max = Math.round(min * 1.28);
      days = calcQuantity > 6 ? '9 - 12 días' : '6 - 8 días';
    } else if (calcServiceType === 'salon') {
      // Aparadores, mesas, librerías
      const basePiece = 450;
      min = Math.round(calcQuantity * basePiece * (calcWoodCondition === 'antiguo' ? 1.3 : 1.1));
      max = Math.round(min * 1.35);
      days = '8 - 12 días';
    } else {
      // Restauración antigua
      min = Math.round(calcQuantity * 520);
      max = Math.round(min * 1.4);
      days = '12 - 18 días';
    }

    return { min, max, days };
  };

  const estimate = calculateEstimate();

  const handleSendSimulatorToWhatsApp = () => {
    const msg = `Hola, he utilizado el simulador de vuestra web de Lacados Arribas Martín. Me interesa un acabado en color ${simulatorColor.name} (${simulatorColor.hex}) en acabado ${simulatorFinish} para un proyecto de tipo ${simulatorItemType}. ¿Me podéis orientar sobre fechas y presupuesto?`;
    onOpenWhatsApp(msg);
  };

  const handleSendEstimateToWhatsApp = () => {
    const serviceName = 
      calcServiceType === 'armarios' ? 'Armarios empotrados' :
      calcServiceType === 'puertas' ? 'Puertas de paso' :
      calcServiceType === 'salon' ? 'Muebles de salón' : 'Restauración antigua';

    const msg = `Hola, he calculado en vuestra web un presupuesto orientativo para ${calcQuantity} unidades de ${serviceName} en ${calcNeighborhood} (estado ${calcWoodCondition}). El rango estimado fue de ${estimate.min}€ a ${estimate.max}€. Os adjunto fotos para presupuesto cerrado.`;
    onOpenWhatsApp(msg);
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
            Proyectos de lacado satinado en Tetuán, Chamberí y Barrio del Pilar
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
            SECCIÓN 3: SIMULADOR IA DE ACABADOS Y TONOS (#simulador)
            ========================================================================= */}
        <section id="simulador" className="bg-[#FFFFFF] rounded-2xl border border-[#B08C4F]/40 p-6 sm:p-10 mb-14 shadow-sm">
          <div className="max-w-3xl mb-8">
            <div className="inline-flex items-center space-x-1.5 text-xs uppercase tracking-wider text-[#2F4F3A] font-bold bg-[#E3D9CC]/50 px-3 py-1 rounded-full mb-2">
              <Sparkles className="w-4 h-4 text-[#B08C4F]" />
              <span>Innovación Taller: Herramienta de Previsualización</span>
            </div>
            <h2 className="font-editorial text-2xl sm:text-3xl font-semibold text-[#343434] mb-2">
              Previsualiza cómo quedarían tus armarios o muebles en satinado
            </h2>
            <p className="text-xs sm:text-sm text-[#6B6B6B] leading-relaxed">
              Elige el tipo de elemento, selecciona el color y el grado de brillo para ver una recreación visual aproximada. Te ayuda a decidir antes de enviarnos fotos reales por WhatsApp.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Controles de selección (5 columnas) */}
            <div className="lg:col-span-5 space-y-6">
              
              {/* Paso 1: Tipo de elemento */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#343434] mb-2">
                  1. Selecciona la pieza a lacar
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { id: 'armario', label: 'Armario Empotrado' },
                    { id: 'puerta', label: 'Puerta de Paso' },
                    { id: 'salon', label: 'Mueble de Salón' },
                    { id: 'antiguo', label: 'Mueble Antiguo' }
                  ].map((item) => (
                    <button
                      key={item.id}
                      onClick={() => setSimulatorItemType(item.id)}
                      className={`p-2.5 rounded-lg text-xs font-medium text-left border transition-all cursor-pointer ${
                        simulatorItemType === item.id
                          ? 'bg-[#2F4F3A] text-white border-[#2F4F3A] font-semibold'
                          : 'bg-[#F5F1EA] text-[#343434] border-[#E3D9CC] hover:bg-[#E3D9CC]/60'
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Paso 2: Paleta de color */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#343434] mb-2">
                  2. Elige el tono de laca
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {paletteOptions.map((color) => {
                    const isSelected = simulatorColor.hex === color.hex;
                    return (
                      <button
                        key={color.hex}
                        onClick={() => setSimulatorColor(color)}
                        className={`p-2 rounded-lg border text-left transition-all cursor-pointer flex flex-col items-center justify-center text-center ${
                          isSelected
                            ? 'border-[#2F4F3A] ring-2 ring-[#2F4F3A]/30 bg-[#F5F1EA]'
                            : 'border-[#E3D9CC] hover:border-[#B08C4F]'
                        }`}
                      >
                        <div
                          className="w-7 h-7 rounded-full border border-black/20 shadow-xs mb-1.5"
                          style={{ backgroundColor: color.hex }}
                        ></div>
                        <span className="text-[11px] font-medium text-[#343434] line-clamp-1">
                          {color.name}
                        </span>
                      </button>
                    );
                  })}
                </div>
                <p className="text-[11px] text-[#6B6B6B] mt-2 italic">
                  Tono seleccionado: <strong>{simulatorColor.name}</strong> ({simulatorColor.desc})
                </p>
              </div>

              {/* Paso 3: Grado de brillo */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#343434] mb-2">
                  3. Grado de acabado sedoso
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setSimulatorFinish('satinado')}
                    className={`p-3 rounded-lg border text-left cursor-pointer transition-all ${
                      simulatorFinish === 'satinado'
                        ? 'bg-[#2F4F3A] text-white border-[#2F4F3A]'
                        : 'bg-[#F5F1EA] text-[#343434] border-[#E3D9CC]'
                    }`}
                  >
                    <span className="block text-xs font-bold">Satinado Sedoso (15% gloss)</span>
                    <span className={`block text-[10px] mt-0.5 ${simulatorFinish === 'satinado' ? 'text-white/80' : 'text-[#6B6B6B]'}`}>
                      Tacto agradable y fácil limpieza. El más solicitado.
                    </span>
                  </button>

                  <button
                    onClick={() => setSimulatorFinish('mate')}
                    className={`p-3 rounded-lg border text-left cursor-pointer transition-all ${
                      simulatorFinish === 'mate'
                        ? 'bg-[#2F4F3A] text-white border-[#2F4F3A]'
                        : 'bg-[#F5F1EA] text-[#343434] border-[#E3D9CC]'
                    }`}
                  >
                    <span className="block text-xs font-bold">Mate Profundo (5% gloss)</span>
                    <span className={`block text-[10px] mt-0.5 ${simulatorFinish === 'mate' ? 'text-white/80' : 'text-[#6B6B6B]'}`}>
                      Cero reflejos, ideal para salones con luz directa.
                    </span>
                  </button>
                </div>
              </div>

            </div>

            {/* Vista previa simulada (7 columnas) */}
            <div className="lg:col-span-7 bg-[#F5F1EA] rounded-xl border border-[#E3D9CC] p-5">
              <div className="flex items-center justify-between mb-3 text-xs">
                <span className="font-bold text-[#343434]">
                  Simulación estimada de acabado:
                </span>
                <span className="text-[#2F4F3A] font-semibold">
                  {simulatorColor.name} · {simulatorFinish.toUpperCase()}
                </span>
              </div>

              {/* Canvas visual de simulación */}
              <div className="relative h-72 sm:h-80 rounded-lg overflow-hidden border border-[#B08C4F]/30 bg-black/10 shadow-inner flex items-center justify-center">
                {/* Imagen base de muestra */}
                <img
                  src={sampleImagesByType[simulatorItemType]?.before}
                  alt="Muestra a simular"
                  className="w-full h-full object-cover"
                />

                {/* Filtro cromático superpuesto con modo blend multiply/overlay para simular la mano de laca */}
                <div
                  className="absolute inset-0 transition-all duration-500 pointer-events-none"
                  style={{
                    backgroundColor: simulatorColor.hex,
                    opacity: simulatorFinish === 'satinado' ? 0.78 : 0.85,
                    mixBlendMode: 'multiply'
                  }}
                ></div>

                {/* Reflejo sedoso simulado */}
                {simulatorFinish === 'satinado' && (
                  <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent pointer-events-none"></div>
                )}

                {/* Badge superpuesto en la simulación */}
                <div className="absolute bottom-3 left-3 bg-white/95 backdrop-blur-xs p-3 rounded-lg shadow-lg border border-[#B08C4F]/40 max-w-xs">
                  <div className="flex items-center space-x-2">
                    <div
                      className="w-4 h-4 rounded-full border border-black/20"
                      style={{ backgroundColor: simulatorColor.hex }}
                    ></div>
                    <span className="text-xs font-bold text-[#343434]">
                      {simulatorColor.name}
                    </span>
                  </div>
                  <span className="block text-[10px] text-[#6B6B6B] mt-0.5">
                    Acabado {simulatorFinish} sobre {sampleImagesByType[simulatorItemType]?.title}
                  </span>
                </div>
              </div>

              {/* Disclaimer de honestidad */}
              <div className="mt-4 flex items-start space-x-2 text-[11px] text-[#6B6B6B] bg-[#E3D9CC]/40 p-3 rounded-lg">
                <Info className="w-4 h-4 text-[#B08C4F] shrink-0 mt-0.5" />
                <span>
                  <strong>Nota del maestro lacador:</strong> Esta previsualización digital es orientativa. En el taller aplicamos muestras físicas sobre madera real para que compruebes el tono exacto bajo la luz de tu casa antes de iniciar el lacado definitivo.
                </span>
              </div>

              {/* Botón WhatsApp prellenado con la simulación */}
              <div className="mt-5">
                <button
                  onClick={handleSendSimulatorToWhatsApp}
                  className="w-full flex items-center justify-center space-x-2 bg-[#2F4F3A] hover:bg-[#243E2E] text-white font-semibold py-3.5 px-4 rounded-lg shadow-sm hover:shadow transition-all cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>Enviar esta simulación al taller por WhatsApp</span>
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECCIÓN 4: CALCULADORA DE PRESUPUESTO ORIENTATIVO (#calculadora)
            ========================================================================= */}
        <section id="calculadora" className="bg-[#E3D9CC]/40 rounded-2xl border border-[#B08C4F]/40 p-6 sm:p-10 mb-12 shadow-sm">
          <div className="max-w-3xl mb-8">
            <div className="inline-flex items-center space-x-1.5 text-xs uppercase tracking-wider text-[#2F4F3A] font-bold bg-white px-3 py-1 rounded-full mb-2">
              <Calculator className="w-4 h-4 text-[#2F4F3A]" />
              <span>Calculadora Transparente</span>
            </div>
            <h2 className="font-editorial text-2xl sm:text-3xl font-semibold text-[#343434] mb-2">
              Estimación orientativa de presupuesto para tu proyecto
            </h2>
            <p className="text-xs sm:text-sm text-[#6B6B6B]">
              Introduce los datos básicos de tu vivienda en Madrid norte o centro y obtén un rango orientativo en menos de 1 minuto. No sustituye el presupuesto final, que ajustamos tras ver fotos reales.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            
            {/* Formulario interactivo (7 columnas) */}
            <div className="lg:col-span-7 bg-white p-6 rounded-xl border border-[#E3D9CC] space-y-5">
              
              {/* Tipo de proyecto */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#343434] mb-2">
                  Tipo de estructura o mueble
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {[
                    { id: 'armarios', label: 'Armarios' },
                    { id: 'puertas', label: 'Puertas paso' },
                    { id: 'salon', label: 'Mueble salón' },
                    { id: 'restauracion', label: 'Restauración' }
                  ].map((s) => (
                    <button
                      key={s.id}
                      onClick={() => setCalcServiceType(s.id as any)}
                      className={`p-2.5 rounded-lg text-xs font-semibold border transition-all cursor-pointer text-center ${
                        calcServiceType === s.id
                          ? 'bg-[#2F4F3A] text-white border-[#2F4F3A]'
                          : 'bg-[#F5F1EA] text-[#343434] border-[#E3D9CC] hover:bg-[#E3D9CC]'
                      }`}
                    >
                      {s.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Cantidad / Unidades con slider */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs font-bold uppercase tracking-wider text-[#343434]">
                    {calcServiceType === 'armarios' ? 'Número de puertas / hojas de frente:' :
                     calcServiceType === 'puertas' ? 'Número de puertas de paso:' : 'Número de piezas:'}
                  </label>
                  <span className="text-base font-bold text-[#2F4F3A] bg-[#F5F1EA] px-3 py-0.5 rounded-md border border-[#E3D9CC]">
                    {calcQuantity} {calcQuantity === 1 ? 'unidad' : 'unidades'}
                  </span>
                </div>
                <input
                  type="range"
                  min="1"
                  max={calcServiceType === 'armarios' ? 16 : 12}
                  value={calcQuantity}
                  onChange={(e) => setCalcQuantity(Number(e.target.value))}
                  className="w-full accent-[#2F4F3A] cursor-pointer"
                />
              </div>

              {/* Barrio de Madrid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#343434] mb-1.5">
                    Barrio o zona de Madrid
                  </label>
                  <select
                    value={calcNeighborhood}
                    onChange={(e) => setCalcNeighborhood(e.target.value)}
                    className="w-full p-2.5 rounded-lg border border-[#E3D9CC] bg-[#F5F1EA] text-xs font-medium text-[#343434] focus:outline-none focus:border-[#2F4F3A]"
                  >
                    <option value="Chamberí">Chamberí (Almagro, Trafalgar, Vallehermoso)</option>
                    <option value="Tetuán">Tetuán (Cuatro Caminos, Bellas Vistas, Castillejos)</option>
                    <option value="Barrio del Pilar">Barrio del Pilar / La Paz</option>
                    <option value="Chamartín">Chamartín (El Viso, Prosperidad, Bernabéu)</option>
                    <option value="Moncloa">Moncloa / Argüelles</option>
                    <option value="Otro Madrid">Otra zona Madrid Norte o Centro</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#343434] mb-1.5">
                    Estado actual de la madera
                  </label>
                  <select
                    value={calcWoodCondition}
                    onChange={(e) => setCalcWoodCondition(e.target.value as any)}
                    className="w-full p-2.5 rounded-lg border border-[#E3D9CC] bg-[#F5F1EA] text-xs font-medium text-[#343434] focus:outline-none focus:border-[#2F4F3A]"
                  >
                    <option value="bueno">Buen estado (solo cambiar color y barniz)</option>
                    <option value="medio">Estado medio (algún golpe y holgura leve)</option>
                    <option value="antiguo">Antiguo o barniz cuarteado (requiere decapado)</option>
                  </select>
                </div>
              </div>

              {/* Opción marcos y tapajuntas */}
              <div className="pt-2">
                <label className="flex items-center space-x-2 text-xs text-[#343434] cursor-pointer">
                  <input
                    type="checkbox"
                    checked={calcIncludeFrames}
                    onChange={(e) => setCalcIncludeFrames(e.target.checked)}
                    className="w-4 h-4 rounded text-[#2F4F3A] accent-[#2F4F3A]"
                  />
                  <span>Incluir lacado de marcos fijos y tapajuntas a juego (Recomendado para continuidad)</span>
                </label>
              </div>

            </div>

            {/* Tarjeta de resultado del presupuesto (5 columnas) */}
            <div className="lg:col-span-5 bg-[#2F4F3A] text-white p-6 sm:p-7 rounded-xl flex flex-col justify-between shadow-md">
              <div>
                <span className="text-[11px] uppercase tracking-wider font-semibold text-white/70 block mb-1">
                  Rango de Presupuesto Estimado
                </span>
                <div className="text-3xl sm:text-4xl font-editorial font-bold text-white mb-2">
                  {estimate.min.toLocaleString('es-ES')} € - {estimate.max.toLocaleString('es-ES')} €
                </div>
                <p className="text-xs text-white/80 leading-relaxed mb-4">
                  Estimación basada en desmontaje, preparación, lijado, lacado artesanal a pistola en nuestro taller de Tetuán y montaje final.
                </p>

                <div className="space-y-2 border-t border-white/20 pt-4 text-xs text-white/90">
                  <div className="flex justify-between">
                    <span>Plazo estimado de taller:</span>
                    <strong className="text-white">{estimate.days}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Zona de intervención:</span>
                    <strong className="text-white">{calcNeighborhood}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Tipo de acabado:</span>
                    <strong className="text-white">Satinado Sedoso (sin obras)</strong>
                  </div>
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-white/20">
                <button
                  onClick={handleSendEstimateToWhatsApp}
                  className="w-full flex items-center justify-center space-x-2 bg-white hover:bg-[#F5F1EA] text-[#2F4F3A] font-bold py-3.5 px-4 rounded-lg transition-all shadow cursor-pointer text-xs sm:text-sm"
                >
                  <Send className="w-4 h-4" />
                  <span>Enviar este cálculo al taller por WhatsApp</span>
                </button>
                <p className="text-[10px] text-center text-white/70 mt-2">
                  Respuesta en menos de 24h con presupuesto cerrado
                </p>
              </div>
            </div>

          </div>
        </section>

      </div>
    </div>
  );
};
