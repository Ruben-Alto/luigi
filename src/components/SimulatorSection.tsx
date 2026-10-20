import React, { useState, useRef, useEffect } from 'react';
import { 
  Sparkles, 
  Upload, 
  Key, 
  Check, 
  RefreshCw, 
  Download, 
  Send, 
  Sliders, 
  Eye, 
  EyeOff, 
  Palette, 
  Info, 
  AlertCircle,
  HelpCircle,
  CheckCircle2,
  Wand2,
  Layers,
  ArrowRightLeft,
  X
} from 'lucide-react';
import { BUSINESS_INFO } from '../data/content';

interface SimulatorSectionProps {
  onOpenWhatsApp: (customMessage?: string) => void;
}

const SAMPLE_IMAGES = [
  {
    id: 'armario',
    label: 'Armario Empotrado',
    url: '/images/armarios-empotrados-bg.jpg',
    defaultType: 'Armario Empotrado',
  },
  {
    id: 'puerta',
    label: 'Puerta de Paso Sapelly',
    url: '/images/puertas-paso-bg.jpg',
    defaultType: 'Puerta de Paso',
  },
  {
    id: 'salon',
    label: 'Mueble de Salón / Boisserie',
    url: '/images/muebles-salon-bg.jpg',
    defaultType: 'Mueble de Salón / Librería',
  },
  {
    id: 'antiguo',
    label: 'Mueble Antiguo / Restaurar',
    url: '/images/restauracion-muebles-antiguos.jpg',
    defaultType: 'Cómoda / Mueble Antiguo',
  },
];

const LACQUER_COLORS = [
  { id: 'blanco-roto', name: 'Blanco Roto Satinado', hex: '#F3EFE6', badge: 'Firma Arribas Martín' },
  { id: 'verde-salvia', name: 'Verde Salvia Elegante', hex: '#8FA38D', badge: 'Tendencia Madrid' },
  { id: 'gris-topo', name: 'Gris Topo Cálido', hex: '#AE9E88', badge: 'Clásico Renovado' },
  { id: 'gris-piedra', name: 'Gris Piedra Neutro', hex: '#C7C0B5', badge: 'Muy Luminoso' },
  { id: 'negro-carbon', name: 'Negro Carbón / Azabache', hex: '#2B2B2B', badge: 'Moderno' },
  { id: 'blanco-nieve', name: 'Blanco Nieve Puro', hex: '#F9F9F9', badge: 'Luminosidad Máxima' },
  { id: 'custom', name: 'Color Personalizado', hex: 'rainbow', badge: 'RAL / NCS' },
];

const SHEEN_LEVELS = [
  { id: 'satinado-sedoso', label: 'Satinado Sedoso (15% brillo)', desc: 'Especialidad exclusiva del taller. Tacto sedoso, fácil limpieza y máxima durabilidad.', recommended: true },
];

const HARDWARE_OPTIONS = [
  { id: 'conservar', label: 'Conservar tiradores originales', icon: '🔒' },
  { id: 'laton-envejecido', label: 'Nuevos tiradores Latón Envejecido / Dorado Mate', icon: '✨' },
  { id: 'cobre-calido', label: 'Nuevos tiradores Cobre Cálido', icon: '🔶' },
  { id: 'negro-mate', label: 'Nuevos tiradores Negro Mate Minimalista', icon: '⬛' },
  { id: 'uñero-push', label: 'Sistema Apertura PUSH / Uñero sin tirador', icon: '🖐️' },
];

const REPAIR_PREPS = [
  { id: 'estandar', label: 'Lijado minucioso + Masillado de golpes + Imprimación selladora' },
  { id: 'decapado-profundo', label: 'Decapado completo de barniz previo desgastado' },
  { id: 'melamina-directo', label: 'Tratamiento de alta adherencia sobre superficie sintética/melamina' },
  { id: 'molduras-conservar', label: 'Restauración artesanal de molduras y ornamentos de madera' },
];

export const SimulatorSection: React.FC<SimulatorSectionProps> = ({ onOpenWhatsApp }) => {
  // API Key state
  const [apiKey, setApiKey] = useState<string>(() => {
    return localStorage.getItem('google_gemini_api_key') || '';
  });
  const [showApiKey, setShowApiKey] = useState<boolean>(false);
  const [hasServerKey, setHasServerKey] = useState<boolean>(true);

  // Check health / server key on mount
  useEffect(() => {
    fetch('/api/health')
      .then(r => r.json())
      .then(data => {
        if (typeof data.hasEnvKey === 'boolean') {
          setHasServerKey(data.hasEnvKey);
        }
      })
      .catch(() => setHasServerKey(true));
  }, []);

  const handleApiKeyChange = (val: string) => {
    setApiKey(val);
    localStorage.setItem('google_gemini_api_key', val);
  };

  // Image & Selection states
  const [selectedImage, setSelectedImage] = useState<string>(SAMPLE_IMAGES[0].url);
  const [selectedSampleId, setSelectedSampleId] = useState<string>('armario');
  const [fileName, setFileName] = useState<string>('Ejemplo: Armario Empotrado');
  const [customColorName, setCustomColorName] = useState<string>('');

  // Finishes
  const [furnitureType, setFurnitureType] = useState<string>('Armario Empotrado');
  const [lacquerColor, setLacquerColor] = useState<string>('Blanco Roto Satinado');
  const [sheenLevel, setSheenLevel] = useState<string>('Satinado Sedoso (15% brillo)');
  const [hardware, setHardware] = useState<string>('Conservar tiradores originales');
  const [repairPrep, setRepairPrep] = useState<string>('Lijado minucioso + Masillado de golpes + Imprimación selladora');
  const [additionalNotes, setAdditionalNotes] = useState<string>('');
  const [modelChoice, setModelChoice] = useState<'flash' | 'pro'>('flash');

  // Generation status & result
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [loadingStep, setLoadingStep] = useState<string>('');
  const [resultImage, setResultImage] = useState<string | null>(null);
  const [resultNotes, setResultNotes] = useState<string>('');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Comparison slider
  const [sliderPos, setSliderPos] = useState<number>(50);
  const [viewMode, setViewMode] = useState<'slider' | 'side' | 'result'>('slider');

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Load a sample image as base64 or URL
  const handleSelectSample = async (sample: typeof SAMPLE_IMAGES[0]) => {
    setSelectedSampleId(sample.id);
    setSelectedImage(sample.url);
    setFileName(`Muestra: ${sample.label}`);
    setFurnitureType(sample.defaultType);
    setResultImage(null);
    setErrorMsg(null);
  };

  // Upload custom file
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setErrorMsg('Por favor selecciona un archivo de imagen válido (JPG, PNG, WEBP).');
      return;
    }

    if (file.size > 15 * 1024 * 1024) {
      setErrorMsg('La imagen supera el límite de 15 MB. Por favor elige una imagen más ligera.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        setSelectedImage(event.target.result as string);
        setSelectedSampleId('custom');
        setFileName(file.name);
        setResultImage(null);
        setErrorMsg(null);
      }
    };
    reader.readAsDataURL(file);
  };

  // Convert image URL to base64 if it's a sample path
  const getBase64FromUrl = async (url: string): Promise<string> => {
    if (url.startsWith('data:image')) {
      return url;
    }
    const response = await fetch(url);
    const blob = await response.blob();
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  };

  // Trigger AI generation
  const handleGenerate = async () => {
    if (!selectedImage) {
      setErrorMsg('Por favor sube una imagen de tu mueble o selecciona una muestra.');
      return;
    }

    setIsGenerating(true);
    setErrorMsg(null);
    setResultImage(null);

    const steps = [
      'Analizando madera y geometría del mueble original...',
      'Preparando capa de imprimación aislante Arribas Martín...',
      'Aplicando pigmentos y velo satinado con Nano Banana Gemini...',
      'Refinando nivel de brillo y acabados de herrajes...',
      'Finalizando renderizado de alta resolución...'
    ];

    let stepIdx = 0;
    setLoadingStep(steps[0]);
    const stepInterval = setInterval(() => {
      stepIdx = (stepIdx + 1) % steps.length;
      setLoadingStep(steps[stepIdx]);
    }, 2200);

    try {
      const base64Data = await getBase64FromUrl(selectedImage);

      const colorToUse = lacquerColor === 'Color Personalizado' 
        ? (customColorName || 'Color personalizado especificado por el cliente')
        : lacquerColor;

      const response = await fetch('/api/gemini/simulate-finish', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          image: base64Data,
          mimeType: 'image/jpeg',
          customApiKey: apiKey.trim() || undefined,
          modelChoice,
          finishOptions: {
            furnitureType,
            lacquerColor: colorToUse,
            sheenLevel,
            hardware,
            repairPrep,
            additionalNotes
          }
        })
      });

      const data = await response.json();
      clearInterval(stepInterval);

      if (!response.ok) {
        throw new Error(data.error || 'Error en la respuesta del servidor');
      }

      setResultImage(data.imageUrl);
      setResultNotes(data.notes || '');
      setSliderPos(50);
    } catch (err: any) {
      clearInterval(stepInterval);
      setErrorMsg(err.message || 'No se pudo generar la previsualización. Verifica tu API Key de Google o vuelve a intentarlo.');
    } finally {
      setIsGenerating(false);
    }
  };

  // WhatsApp formal quote message generator
  const handleQuoteViaWhatsApp = () => {
    const finalColor = lacquerColor === 'Color Personalizado' ? (customColorName || 'Personalizado') : lacquerColor;
    const msg = `Hola Lacados Arribas Martín, he probado vuestro Simulador de IA con mi mueble.
 Me gustaría solicitar presupuesto real para lacar:

📋 REQUISITOS DEL TRABAJO:
• Tipo de elemento: ${furnitureType}
• Color elegido: ${finalColor}
• Acabado / Brillo: ${sheenLevel}
• Herrajes: ${hardware}
• Preparación previa: ${repairPrep}
${additionalNotes ? `• Notas: ${additionalNotes}` : ''}

¿Podríais darme un presupuesto orientativo para hacerlo en vuestro taller de Tetuán? Les puedo enviar las fotos directamente por aquí.`;

    onOpenWhatsApp(msg);
  };

  return (
    <section id="simulador" className="bg-[#F5F1EA] py-16 md:py-24 border-b border-[#E3D9CC]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Cabecera del Simulador */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center space-x-2 bg-[#2F4F3A] text-white px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider mb-3 shadow-xs">
            <Wand2 className="w-4 h-4 text-[#C39A6B] animate-pulse" />
            <span>Simulador de Acabados e IA Gemini (Nano Banana)</span>
          </div>

          <h2 className="font-editorial text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#343434] mb-4">
            Visualiza el cambio antes de entrar en taller
          </h2>

          <p className="text-sm sm:text-base text-[#6B6B6B] leading-relaxed">
            Sube una foto de tus armarios, puertas o muebles y la inteligencia artificial <strong className="text-[#2F4F3A]">Nano Banana Gemini</strong> aplicará el lacado artesanal de nuestro taller de Tetuán en el color y acabado que selecciones.
          </p>
          <p className="text-xs text-[#6B6B6B] mt-3">
            Taller en {BUSINESS_INFO.district}: {BUSINESS_INFO.scheduleWeekdays} · {BUSINESS_INFO.scheduleSaturdays} · Zona de servicio: Chamberí, Plaza de Castilla, Serrano y todo Madrid.
          </p>
        </div>

        {/* BARRA DE API KEY DE GOOGLE */}
        <div className="bg-[#FFFFFF] border border-[#B08C4F]/30 rounded-2xl p-4 sm:p-5 mb-8 shadow-xs">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-[#2F4F3A]/10 text-[#2F4F3A] flex items-center justify-center shrink-0">
                <Key className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <h3 className="font-sans font-bold text-sm text-[#343434]">
                    Clave de API de Google Gemini (Opcional)
                  </h3>
                  {apiKey.trim() ? (
                    <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full flex items-center space-x-1">
                      <Check className="w-3 h-3" />
                      <span>Clave Personal Activa</span>
                    </span>
                  ) : hasServerKey ? (
                    <span className="text-[11px] font-semibold text-[#2F4F3A] bg-[#2F4F3A]/10 px-2 py-0.5 rounded-full">
                      Usando Clave del Taller
                    </span>
                  ) : (
                    <span className="text-[11px] font-semibold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full">
                      Ingresa tu API Key de Google
                    </span>
                  )}
                </div>
                <p className="text-xs text-[#6B6B6B] mt-0.5">
                  Pegar tu API Key de Google AI Studio te garantiza generación ilimitada y prioridad con el modelo Nano Banana.
                </p>
              </div>
            </div>

            <div className="w-full md:w-80 flex items-center space-x-2">
              <div className="relative flex-1">
                <input
                  type={showApiKey ? 'text' : 'password'}
                  value={apiKey}
                  onChange={(e) => handleApiKeyChange(e.target.value)}
                  placeholder="Pega tu Google API Key (AIzaSy...)"
                  className="w-full text-xs bg-[#F5F1EA] border border-[#E3D9CC] rounded-lg px-3 py-2 pr-9 focus:outline-none focus:border-[#2F4F3A] text-[#343434] font-mono"
                />
                <button
                  type="button"
                  onClick={() => setShowApiKey(!showApiKey)}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#6B6B6B] hover:text-[#343434] cursor-pointer"
                  title={showApiKey ? 'Ocultar' : 'Mostrar'}
                >
                  {showApiKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {apiKey && (
                <button
                  onClick={() => handleApiKeyChange('')}
                  className="text-xs text-red-600 hover:text-red-800 underline px-2 cursor-pointer"
                  title="Borrar clave guardada"
                >
                  Borrar
                </button>
              )}
            </div>
          </div>
        </div>

        {/* PANEL PRINCIPAL EN 2 COLUMNAS */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* COLUMNA IZQUIERDA: SELECCIÓN DE IMAGEN Y CONFIGURACIÓN */}
          <div className="lg:col-span-6 space-y-6">
            
            {/* PASO 1: SUBIR O SELECCIONAR FOTO */}
            <div className="bg-[#FFFFFF] rounded-2xl p-6 border border-[#B08C4F]/30 shadow-xs">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <span className="w-6 h-6 rounded-full bg-[#2F4F3A] text-white flex items-center justify-center text-xs font-bold">1</span>
                  <h3 className="font-sans font-bold text-base text-[#343434]">
                    Foto de tu Mueble o Muestra
                  </h3>
                </div>
                <span className="text-xs text-[#6B6B6B]">JPG, PNG, WEBP</span>
              </div>

              {/* Botón Upload Drag & Drop */}
              <div 
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-[#B08C4F]/40 hover:border-[#2F4F3A] bg-[#F5F1EA]/50 rounded-xl p-5 text-center cursor-pointer transition-colors group mb-4"
              >
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  onChange={handleFileUpload} 
                  accept="image/*" 
                  className="hidden" 
                />
                <Upload className="w-8 h-8 mx-auto text-[#2F4F3A] group-hover:scale-110 transition-transform mb-2" />
                <p className="text-xs font-bold text-[#343434] mb-1">
                  Haz clic para subir la foto de tu mueble
                </p>
                <p className="text-[11px] text-[#6B6B6B]">
                  Saca una foto frontal bien iluminada de tu armario, puerta o mueble
                </p>
              </div>

              {/* Muestras rápidas predeterminadas */}
              <div>
                <p className="text-xs font-semibold text-[#6B6B6B] mb-2.5">
                  O prueba al instante con una foto de muestra:
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {SAMPLE_IMAGES.map((sample) => {
                    const isSelected = selectedSampleId === sample.id;
                    return (
                      <button
                        key={sample.id}
                        type="button"
                        onClick={() => handleSelectSample(sample)}
                        className={`relative rounded-lg overflow-hidden border-2 text-left cursor-pointer transition-all aspect-4/3 group ${
                          isSelected ? 'border-[#2F4F3A] ring-2 ring-[#2F4F3A]/30' : 'border-[#E3D9CC] opacity-80 hover:opacity-100'
                        }`}
                      >
                        <img 
                          src={sample.url} 
                          alt={sample.label} 
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end p-1.5">
                          <span className="text-[10px] font-bold text-white leading-tight drop-shadow-xs line-clamp-1">
                            {sample.label}
                          </span>
                        </div>
                        {isSelected && (
                          <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-[#2F4F3A] text-white flex items-center justify-center">
                            <Check className="w-2.5 h-2.5 stroke-[3]" />
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* PASO 2: SELECCIÓN DE ACABADOS Y REQUISITOS */}
            <div className="bg-[#FFFFFF] rounded-2xl p-6 border border-[#B08C4F]/30 shadow-xs space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-[#E3D9CC]">
                <div className="flex items-center space-x-2">
                  <span className="w-6 h-6 rounded-full bg-[#2F4F3A] text-white flex items-center justify-center text-xs font-bold">2</span>
                  <h3 className="font-sans font-bold text-base text-[#343434]">
                    Requisitos del Trabajo y Acabados
                  </h3>
                </div>
                <span className="text-xs font-semibold text-[#B08C4F] flex items-center space-x-1">
                  <Sliders className="w-3.5 h-3.5" />
                  <span>Personalizado</span>
                </span>
              </div>

              {/* Tipo de mueble */}
              <div>
                <label className="block text-xs font-bold text-[#343434] uppercase tracking-wider mb-2">
                  Tipo de elemento a lacar
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {[
                    'Armario Empotrado',
                    'Puerta de Paso',
                    'Mueble de Salón / Librería',
                    'Cómoda / Aparador',
                    'Mesa / Silla',
                    'Otro Mueble'
                  ].map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setFurnitureType(t)}
                      className={`text-xs p-2.5 rounded-lg text-center font-medium border cursor-pointer transition-colors ${
                        furnitureType === t
                          ? 'bg-[#2F4F3A] text-white border-[#2F4F3A] font-bold shadow-xs'
                          : 'bg-[#F5F1EA] text-[#343434] border-[#E3D9CC] hover:bg-[#E3D9CC]/50'
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              {/* Gama de Color de Lacado */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-bold text-[#343434] uppercase tracking-wider">
                    Color de Lacado Satinado
                  </label>
                  <span className="text-[11px] font-semibold text-[#2F4F3A]">{lacquerColor}</span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-2">
                  {LACQUER_COLORS.map((c) => {
                    const isSelected = lacquerColor === c.name || (c.id === 'custom' && lacquerColor === 'Color Personalizado');
                    return (
                      <button
                        key={c.id}
                        type="button"
                        onClick={() => {
                          if (c.id === 'custom') {
                            setLacquerColor('Color Personalizado');
                          } else {
                            setLacquerColor(c.name);
                          }
                        }}
                        className={`p-2.5 rounded-lg border text-left flex items-center space-x-2 cursor-pointer transition-all ${
                          isSelected
                            ? 'border-[#2F4F3A] ring-2 ring-[#2F4F3A]/20 bg-[#F5F1EA]'
                            : 'border-[#E3D9CC] hover:border-[#B08C4F]'
                        }`}
                      >
                        {c.hex === 'rainbow' ? (
                          <span className="w-5 h-5 rounded-full bg-gradient-to-tr from-rose-400 via-amber-300 to-emerald-400 shrink-0 border border-black/20"></span>
                        ) : (
                          <span className="w-5 h-5 rounded-full shrink-0 border border-black/20 shadow-xs" style={{ backgroundColor: c.hex }}></span>
                        )}
                        <div className="min-w-0">
                          <span className="block text-[11px] font-bold text-[#343434] truncate">
                            {c.name}
                          </span>
                          <span className="block text-[9px] text-[#6B6B6B] truncate">
                            {c.badge}
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>

                {lacquerColor === 'Color Personalizado' && (
                  <input
                    type="text"
                    value={customColorName}
                    onChange={(e) => setCustomColorName(e.target.value)}
                    placeholder="Escribe el código RAL/NCS o nombre de color (ej. Verde Oliva RAL 6003)..."
                    className="w-full text-xs bg-[#F5F1EA] border border-[#2F4F3A] rounded-lg px-3 py-2 mt-2 text-[#343434] focus:outline-none"
                  />
                )}
              </div>

              {/* Modelo de IA Gemini */}
              <div>
                <label className="block text-xs font-bold text-[#343434] uppercase tracking-wider mb-2">
                  Motor de IA Gemini Nano Banana
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setModelChoice('flash')}
                    className={`p-2.5 rounded-lg border text-left cursor-pointer transition-colors ${
                      modelChoice === 'flash'
                        ? 'bg-[#2F4F3A] text-white border-[#2F4F3A]'
                        : 'bg-[#F5F1EA] text-[#343434] border-[#E3D9CC]'
                    }`}
                  >
                    <span className="block text-xs font-bold">Nano Banana Flash</span>
                    <span className="block text-[10px] opacity-80">Rápido y fluido</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setModelChoice('pro')}
                    className={`p-2.5 rounded-lg border text-left cursor-pointer transition-colors ${
                      modelChoice === 'pro'
                        ? 'bg-[#2F4F3A] text-white border-[#2F4F3A]'
                        : 'bg-[#F5F1EA] text-[#343434] border-[#E3D9CC]'
                    }`}
                  >
                    <span className="block text-xs font-bold">Nano Banana 2.1 HD</span>
                    <span className="block text-[10px] opacity-80">Ultra detalle 1K</span>
                  </button>
                </div>
              </div>

              {/* Observaciones adicionales */}
              <div>
                <label className="block text-xs font-bold text-[#343434] uppercase tracking-wider mb-1.5">
                  Observaciones o Detalles Especiales (Opcional)
                </label>
                <textarea
                  value={additionalNotes}
                  onChange={(e) => setAdditionalNotes(e.target.value)}
                  placeholder="Ej. Dejar el marco de las cristalerías en tono madera o restaurar solo las puertas exteriores..."
                  rows={2}
                  className="w-full text-xs bg-[#F5F1EA] border border-[#E3D9CC] rounded-lg p-2.5 text-[#343434] focus:outline-none focus:border-[#2F4F3A]"
                />
              </div>

              {/* Botón de Generación */}
              <button
                type="button"
                onClick={handleGenerate}
                disabled={isGenerating}
                className="w-full flex items-center justify-center space-x-2.5 bg-[#2F4F3A] hover:bg-[#243E2E] text-white font-bold py-4 px-6 rounded-xl shadow-md hover:shadow-lg transition-all disabled:opacity-60 cursor-pointer text-sm tracking-wide"
              >
                {isGenerating ? (
                  <>
                    <RefreshCw className="w-5 h-5 animate-spin text-[#C39A6B]" />
                    <span>Generando Previsualización con IA...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5 text-[#C39A6B]" />
                    <span>✨ Generar Previsualización con IA (Nano Banana)</span>
                  </>
                )}
              </button>

              {/* Mensaje de error si hubiese */}
              {errorMsg && (
                <div className="p-3.5 bg-red-50 border border-red-200 rounded-xl flex items-start space-x-2.5 text-xs text-red-700">
                  <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-red-600" />
                  <div className="leading-relaxed">
                    <span className="font-bold block">Error al procesar la simulación:</span>
                    <span>{errorMsg}</span>
                  </div>
                </div>
              )}
            </div>

          </div>

          {/* COLUMNA DERECHA: VISUALIZADOR DE RESULTADOS Y COMPARADOR SLIDER */}
          <div className="lg:col-span-6 space-y-6">
            
            <div className="bg-[#FFFFFF] rounded-2xl p-6 border border-[#B08C4F]/30 shadow-xs sticky top-20">
              
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-[#E3D9CC]">
                <div className="flex items-center space-x-2">
                  <span className="w-6 h-6 rounded-full bg-[#2F4F3A] text-white flex items-center justify-center text-xs font-bold">3</span>
                  <h3 className="font-sans font-bold text-base text-[#343434]">
                    Previsualización y Comparador
                  </h3>
                </div>

                {/* Modos de vista */}
                {resultImage && (
                  <div className="flex items-center space-x-1 bg-[#F5F1EA] p-1 rounded-lg border border-[#E3D9CC]">
                    <button
                      onClick={() => setViewMode('slider')}
                      className={`px-2.5 py-1 text-[11px] font-bold rounded-md transition-colors cursor-pointer ${
                        viewMode === 'slider' ? 'bg-[#2F4F3A] text-white' : 'text-[#6B6B6B] hover:text-[#343434]'
                      }`}
                    >
                      Deslizador
                    </button>
                    <button
                      onClick={() => setViewMode('side')}
                      className={`px-2.5 py-1 text-[11px] font-bold rounded-md transition-colors cursor-pointer ${
                        viewMode === 'side' ? 'bg-[#2F4F3A] text-white' : 'text-[#6B6B6B] hover:text-[#343434]'
                      }`}
                    >
                      Lado a Lado
                    </button>
                  </div>
                )}
              </div>

              {/* CONTENEDOR DE LA IMAGEN O ESTADO DE GENERACIÓN */}
              {isGenerating ? (
                <div className="relative aspect-4/3 rounded-xl bg-[#F5F1EA] border border-[#E3D9CC] flex flex-col items-center justify-center p-8 text-center overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#2F4F3A]/5 to-transparent animate-pulse pointer-events-none"></div>
                  <RefreshCw className="w-12 h-12 text-[#2F4F3A] animate-spin mb-4" />
                  <h4 className="font-editorial text-xl font-bold text-[#343434] mb-2">
                    Aplicando Lacado Satinado con IA
                  </h4>
                  <p className="text-xs text-[#2F4F3A] font-medium bg-[#2F4F3A]/10 px-3 py-1 rounded-full animate-bounce">
                    {loadingStep}
                  </p>
                  <p className="text-[11px] text-[#6B6B6B] mt-4 max-w-xs">
                    Tarda entre 6 y 12 segundos. Gemini Nano Banana está ajustando el velo satinado y la iluminación.
                  </p>
                </div>
              ) : resultImage ? (
                /* RESULTADO GENERADO: VISTA COMPARATIVA O RESULTADO */
                <div className="space-y-4">
                  
                  {viewMode === 'slider' && (
                    <div className="relative aspect-4/3 rounded-xl overflow-hidden border border-[#E3D9CC] shadow-inner select-none group">
                      {/* Imagen Después (Resultado AI) */}
                      <img 
                        src={resultImage} 
                        alt="Resultado Lacado" 
                        className="absolute inset-0 w-full h-full object-cover" 
                      />

                      {/* Imagen Antes (Original recortada por el slider) */}
                      <div 
                        className="absolute top-0 bottom-0 left-0 overflow-hidden" 
                        style={{ width: `${sliderPos}%` }}
                      >
                        <img 
                          src={selectedImage} 
                          alt="Mueble Original" 
                          className="w-full h-full object-cover max-w-none" 
                          style={{ width: '100%', height: '100%' }}
                        />
                      </div>

                      {/* Línea divisoria y manija del slider */}
                      <div 
                        className="absolute top-0 bottom-0 w-1 bg-white shadow-lg cursor-ew-resize flex items-center justify-center z-10" 
                        style={{ left: `${sliderPos}%` }}
                      >
                        <div className="w-8 h-8 rounded-full bg-[#2F4F3A] text-white flex items-center justify-center shadow-xl border-2 border-white">
                          <ArrowRightLeft className="w-4 h-4" />
                        </div>
                      </div>

                      {/* Input de rango transparente para arrastrar el slider */}
                      <input 
                        type="range" 
                        min="0" 
                        max="100" 
                        value={sliderPos} 
                        onChange={(e) => setSliderPos(Number(e.target.value))}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-20"
                      />

                      {/* Etiquetas Antes / Después */}
                      <span className="absolute bottom-3 left-3 bg-black/70 text-white text-[10px] font-bold px-2.5 py-1 rounded-md backdrop-blur-xs">
                        ANTES (Original)
                      </span>
                      <span className="absolute bottom-3 right-3 bg-[#2F4F3A] text-white text-[10px] font-bold px-2.5 py-1 rounded-md shadow-md">
                        DESPUÉS (IA Nano Banana)
                      </span>
                    </div>
                  )}

                  {viewMode === 'side' && (
                    <div className="grid grid-cols-2 gap-3">
                      <div className="relative aspect-square rounded-xl overflow-hidden border border-[#E3D9CC]">
                        <img src={selectedImage} alt="Original" className="w-full h-full object-cover" />
                        <span className="absolute bottom-2 left-2 bg-black/70 text-white text-[9px] font-bold px-2 py-0.5 rounded-md">
                          Original
                        </span>
                      </div>
                      <div className="relative aspect-square rounded-xl overflow-hidden border-2 border-[#2F4F3A]">
                        <img src={resultImage} alt="Lacado AI" className="w-full h-full object-cover" />
                        <span className="absolute bottom-2 right-2 bg-[#2F4F3A] text-white text-[9px] font-bold px-2 py-0.5 rounded-md">
                          Lacado IA
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Resumen de configuración del resultado */}
                  <div className="bg-[#F5F1EA] p-4 rounded-xl border border-[#E3D9CC] space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-[#2F4F3A]">Resultado Obtenido:</span>
                      <span className="text-[11px] font-semibold text-[#6B6B6B]">{lacquerColor} · {sheenLevel.split(' ')[0]}</span>
                    </div>
                    {resultNotes && (
                      <p className="text-xs text-[#343434]/90 italic leading-snug">
                        "{resultNotes}"
                      </p>
                    )}
                  </div>

                  {/* CTAS DE ACCIÓN TRAS GENERACIÓN */}
                  <div className="space-y-2.5 pt-2">
                    <button
                      type="button"
                      onClick={handleQuoteViaWhatsApp}
                      className="w-full flex items-center justify-center space-x-2 bg-[#2F4F3A] hover:bg-[#243E2E] text-white font-bold py-3.5 px-5 rounded-xl shadow-md transition-all cursor-pointer text-xs uppercase tracking-wider"
                    >
                      <Send className="w-4 h-4" />
                      <span>Pedir Presupuesto Real por WhatsApp</span>
                    </button>

                    <div className="grid grid-cols-2 gap-2">
                      <a
                        href={resultImage}
                        download={`Lacados-Arribas-Martin-${furnitureType.replace(/\s+/g, '-')}.png`}
                        className="flex items-center justify-center space-x-1.5 bg-[#FFFFFF] hover:bg-[#F5F1EA] text-[#343434] font-semibold py-2.5 px-3 rounded-lg border border-[#E3D9CC] text-xs transition-colors text-center"
                      >
                        <Download className="w-3.5 h-3.5 text-[#2F4F3A]" />
                        <span>Descargar Foto</span>
                      </a>

                      <button
                        type="button"
                        onClick={() => {
                          setResultImage(null);
                          setErrorMsg(null);
                        }}
                        className="flex items-center justify-center space-x-1.5 bg-[#FFFFFF] hover:bg-[#F5F1EA] text-[#6B6B6B] hover:text-[#343434] font-semibold py-2.5 px-3 rounded-lg border border-[#E3D9CC] text-xs transition-colors cursor-pointer"
                      >
                        <RefreshCw className="w-3.5 h-3.5" />
                        <span>Probar Otro Acabado</span>
                      </button>
                    </div>
                  </div>

                </div>
              ) : (
                /* ESTADO INICIAL SIN RESULTADO GENERADO */
                <div className="space-y-4">
                  <div className="relative aspect-4/3 rounded-xl overflow-hidden border border-[#E3D9CC] bg-[#F5F1EA] group">
                    <img 
                      src={selectedImage} 
                      alt="Mueble Seleccionado" 
                      className="w-full h-full object-cover" 
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                      <span className="bg-white/90 text-[#2F4F3A] text-xs font-bold px-3 py-1.5 rounded-full shadow-md backdrop-blur-xs flex items-center space-x-1.5">
                        <Eye className="w-4 h-4" />
                        <span>Foto Base Seleccionada</span>
                      </span>
                    </div>
                  </div>

                  <div className="p-4 bg-[#F5F1EA] rounded-xl border border-[#E3D9CC] text-center space-y-2">
                    <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-[#2F4F3A]">
                      ¿Listo para ver el cambio?
                    </h4>
                    <p className="text-xs text-[#6B6B6B]">
                      Selecciona el color ({lacquerColor}), el acabado y pulsa el botón verde para que Nano Banana genere tu simulación fotorrealista.
                    </p>
                  </div>
                </div>
              )}

              {/* Garantía del Taller */}
              <div className="mt-6 pt-4 border-t border-[#E3D9CC] text-[11px] text-[#6B6B6B] flex items-center justify-between">
                <span className="flex items-center space-x-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#2F4F3A]" />
                  <span>Lacado 100% lavable y duradero</span>
                </span>
                <span className="font-semibold text-[#2F4F3A]">Taller Tetuán desde 1969 · {BUSINESS_INFO.scheduleWeekdays}</span>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
