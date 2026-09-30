import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  Sparkles,
  Calculator,
  MapPin,
  Send,
  Info,
  Upload,
  KeyRound,
  Loader2,
  RefreshCw,
  Download,
  X,
  AlertTriangle,
  Trash2,
  Eye,
  EyeOff
} from 'lucide-react';
import { REAL_PROJECTS, BUSINESS_INFO } from '../data/content';
import { ProjectItem } from '../types';

interface ProjectsViewProps {
  onOpenWhatsApp: (customMessage?: string) => void;
}

type FinishId = 'satinado-sedoso' | 'satinado-suave' | 'lacado-artesanal';

const STORAGE_KEY = 'arribas.openrouter.apiKey';

/** Modelos de OpenRouter que devuelven imagen, con su precio real por imagen. */
const MODELS = [
  { id: 'google/gemini-3.1-flash-lite-image', label: 'Nano Banana 2 Lite', coste: '$0.00003' },
  { id: 'google/gemini-2.5-flash-image', label: 'Nano Banana', coste: '$0.00003' },
  { id: 'google/gemini-3.1-flash-image', label: 'Nano Banana 2', coste: '$0.00006' },
  { id: 'google/gemini-3-pro-image', label: 'Nano Banana Pro', coste: '$0.002' }
];

const FINISHES: { id: FinishId; label: string; desc: string; prompt: string }[] = [
  {
    id: 'satinado-sedoso',
    label: 'Satinado Sedoso (15% gloss)',
    desc: 'Tacto agradable y fácil limpieza. El más solicitado.',
    prompt: 'acabado satinado sedoso de 15% de brillo, reflejo suave y difuso, brillo especular muy discreto'
  },
  {
    id: 'satinado-suave',
    label: 'Satinado Suave (10% gloss)',
    desc: 'Reflejo muy atenuado para estancias luminosas.',
    prompt: 'acabado satinado suave mate de 10% de brillo, reflejo muy atenuado, prácticamente mate'
  },
  {
    id: 'lacado-artesanal',
    label: 'Lacado Artesanal de Taller',
    desc: 'Veteado visible y lijada manual, como una pieza hecha a mano.',
    prompt: 'lacado artesanal a pistola de taller, con la textura sutil de la lijada manual visible, brillo medio irregular propio de mano de maestro'
  }
];

const ITEM_TYPES = [
  { id: 'armario', label: 'Armario Empotrado', desc: 'un armario empotrado de madera con puertas, bisagras y tiradores' },
  { id: 'puerta', label: 'Puerta de Paso', desc: 'una puerta de paso de madera con su marco' },
  { id: 'salon', label: 'Mueble de Salón', desc: 'un mueble de salón de madera, tipo aparador o mesa' },
  { id: 'antiguo', label: 'Mueble Antiguo', desc: 'un mueble antiguo de madera ya restaurado' }
];

const PALETTE = [
  { name: 'Blanco Roto Cálido', hex: '#F5F1EA', desc: 'Máxima luminosidad para interiores de Madrid.' },
  { name: 'Gris Piedra Chamberí', hex: '#E3D9CC', desc: 'Neutro contemporáneo suave.' },
  { name: 'Gris Topo Suave', hex: '#C2B39A', desc: 'Calidez envolvente similar al lino.' },
  { name: 'Verde Botella Satinado', hex: '#2F4F3A', desc: 'Distinción señorial británica.' },
  { name: 'Verde Salvia Sedoso', hex: '#A4B3A0', desc: 'Tendencia botánica en satinado anti-huellas.' },
  { name: 'Negro Carbón Satinado', hex: '#343434', desc: 'Elegancia sobria y sedosa para piezas singulares.' }
];

function buildPrompt(itemType: string, color: typeof PALETTE[number], finish: typeof FINISHES[number], extra: string) {
  const pieza = ITEM_TYPES.find((t) => t.id === itemType)?.desc || ITEM_TYPES[0].desc;
  return [
    'Edita esta fotografía. El resultado debe parecer una fotografía real hecha en un taller de carpintería, no una ilustración ni un render 3D.',
    `TAREA: aplica un ${finish.prompt} sobre ${pieza}.`,
    'CONSERVAR EXACTAMENTE: la forma, las dimensiones, el encuadre, la posición de la pieza, los herrajes,',
    'la iluminación, las sombras, el suelo, las paredes y todo el fondo de la foto original.',
    `COLOR DE LA LACA: ${color.name} (${color.hex}). El color debe cubrir únicamente la madera del mueble.`,
    'No pintes los herrajes metálicos (tiradores, bisagras, cerraduras), ni el zócalo, ni el suelo, ni las paredes.',
    'Realismo: la laca debe respectar el veteado natural de la madera como textura bajo el pigmento,',
    'dejar las aristas del chapado y las uniones entre piezas bien definidas, sin manchas, sin chorretones y sin marcas de brocha.',
    extra ? `INSTRUCCIÓN ADICIONAL DEL CLIENTE: ${extra}` : '',
    'Devuelve únicamente la imagen editada.'
  ].filter(Boolean).join(' ');
}

/** Reduce la foto antes de enviarla para no gastar tokens ni tiempo. */
function fileToDataUrl(file: File, maxEdge = 1024): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error('No se pudo leer el archivo.'));
    reader.onload = () => {
      const img = new Image();
      img.onerror = () => reject(new Error('El archivo no es una imagen válida.'));
      img.onload = () => {
        const scale = Math.min(1, maxEdge / Math.max(img.width, img.height));
        const w = Math.round(img.width * scale);
        const h = Math.round(img.height * scale);
        const c = document.createElement('canvas');
        c.width = w;
        c.height = h;
        c.getContext('2d')?.drawImage(img, 0, 0, w, h);
        resolve(c.toDataURL('image/jpeg', 0.9));
      };
      img.src = reader.result as string;
    };
    reader.readAsDataURL(file);
  });
}

export const ProjectsView: React.FC<ProjectsViewProps> = ({ onOpenWhatsApp }) => {
  const [categoryFilter, setCategoryFilter] = useState<string>('todos');
  const [activeProjectForSlider, setActiveProjectForSlider] = useState<ProjectItem>(REAL_PROJECTS[0]);
  const [sliderPosition, setSliderPosition] = useState<number>(50);

  // Estado del simulador
  const [photo, setPhoto] = useState<string | null>(null);
  const [photoName, setPhotoName] = useState<string>('');
  const [itemType, setItemType] = useState<string>('armario');
  const [color, setColor] = useState(PALETTE[0]);
  const [finish, setFinish] = useState<FinishId>('satinado-sedoso');
  const [model, setModel] = useState(MODELS[0].id);
  const [extraNote, setExtraNote] = useState<string>('');
  const [apiKey, setApiKey] = useState<string>('');
  const [showKey, setShowKey] = useState(false);
  const [rememberKey, setRememberKey] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [dragging, setDragging] = useState(false);
  const [viewMode, setViewMode] = useState<'original' | 'result'>('result');
  const fileRef = useRef<HTMLInputElement | null>(null);

  const filteredProjects = REAL_PROJECTS.filter((p) => categoryFilter === 'todos' || p.category === categoryFilter);
  const activeFinish = FINISHES.find((f) => f.id === finish) || FINISHES[0];
  const activeModel = MODELS.find((m) => m.id === model) || MODELS[0];

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      setApiKey(saved);
      setRememberKey(true);
    }
  }, []);

  const handleFile = useCallback(async (file: File) => {
    setUploadError(null);
    if (!file.type.startsWith('image/')) {
      setUploadError('Selecciona un archivo de imagen (JPG o PNG).');
      return;
    }
    if (file.size > 15 * 1024 * 1024) {
      setUploadError('La imagen supera los 15 MB. Redimensiónala y vuelve a intentarlo.');
      return;
    }
    try {
      setPhoto(await fileToDataUrl(file));
      setPhotoName(file.name);
      setResult(null);
      setError(null);
    } catch (err) {
      setUploadError(err instanceof Error ? err.message : 'No se pudo cargar la imagen.');
    }
  }, []);

  const generate = useCallback(async () => {
    if (!photo) {
      setError('Primero sube la foto de tu mueble.');
      return;
    }
    if (!apiKey.trim()) {
      setError('Pega tu clave de OpenRouter en el campo de arriba para generar la imagen.');
      return;
    }

    setLoading(true);
    setError(null);
    setViewMode('result');

    try {
      const res = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${apiKey.trim()}`,
          'HTTP-Referer': window.location.origin,
          'X-Title': 'Lacados Arribas Martin'
        },
        body: JSON.stringify({
          model,
          modalities: ['image', 'text'],
          messages: [
            {
              role: 'user',
              content: [
                { type: 'text', text: buildPrompt(itemType, color, activeFinish, extraNote) },
                { type: 'image_url', image_url: { url: photo } }
              ]
            }
          ]
        })
      });

      const data = await res.json();

      if (!res.ok) {
        const msg = data?.error?.message || `OpenRouter respondió ${res.status}.`;
        setError(msg);
        return;
      }

      const message = data?.choices?.[0]?.message || {};
      const images = Array.isArray(message.images) ? message.images : [];
      if (images.length === 0) {
        setError(message.content || 'El modelo no devolvió ninguna imagen. Prueba con otro modelo.');
        return;
      }

      const first = images[0];
      setResult(typeof first === 'string' ? first : first?.image_url?.url);

      if (rememberKey) localStorage.setItem(STORAGE_KEY, apiKey.trim());
    } catch (err) {
      setError(err instanceof Error ? `Error de red: ${err.message}` : 'No se pudo contactar con OpenRouter.');
    } finally {
      setLoading(false);
    }
  }, [photo, apiKey, model, itemType, color, activeFinish, extraNote, rememberKey]);

  const clearKey = useCallback(() => {
    setApiKey('');
    setRememberKey(false);
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  const handleDownload = useCallback(() => {
    if (!result) return;
    const a = document.createElement('a');
    a.href = result;
    a.download = `acabado-${color.name.toLowerCase().replace(/\s+/g, '-')}.png`;
    a.click();
  }, [result, color.name]);

  const reset = useCallback(() => {
    setPhoto(null);
    setPhotoName('');
    setResult(null);
    setError(null);
    setUploadError(null);
    setExtraNote('');
    setViewMode('result');
    if (fileRef.current) fileRef.current.value = '';
  }, []);

  const handleSendToWhatsApp = () => {
    const msg = `Hola, he generado una previsualización con IA de ${ITEM_TYPES.find((t) => t.id === itemType)?.label.toLowerCase()} en acabado ${color.name} (${color.hex}) con ${activeFinish.label}. Os adjunto la imagen. ¿Me confirmáis disponibilidad y presupuesto?`;
    onOpenWhatsApp(msg);
  };

  return (
    <div className="w-full bg-[#F5F1EA] py-8 sm:py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Cabecera */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs uppercase tracking-wider text-[#2F4F3A] font-bold bg-[#E3D9CC]/50 px-3.5 py-1.5 rounded-full inline-block mb-3">
            Galería & Herramientas
          </span>
          <h1 className="font-editorial text-3xl sm:text-4xl font-semibold text-[#343434] mb-4">
            Proyectos de lacado satinado en Tetuán, Chamberí y Barrio del Pilar
          </h1>
          <p className="text-sm sm:text-base text-[#6B6B6B]">
            Casos reales de armarios empotrados, puertas y salones modernizados con acabado sedoso en Madrid norte y centro. Compara el antes y después y prueba el simulador con IA.
          </p>
        </div>

        {/* Comparador antes / después */}
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

          <div className="relative w-full h-[320px] sm:h-[440px] rounded-xl overflow-hidden select-none border border-[#E3D9CC]">
            <img src={activeProjectForSlider.afterImg} alt="Después de lacar" className="absolute inset-0 w-full h-full object-cover" />
            <div className="absolute inset-0 overflow-hidden" style={{ width: `${sliderPosition}%` }}>
              <img src={activeProjectForSlider.beforeImg} alt="Antes de lacar" className="absolute inset-0 w-full h-full object-cover max-w-none" />
              <span className="absolute top-4 left-4 bg-[#343434]/90 text-white text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-md shadow">
                Antes (Madera original)
              </span>
            </div>
            <span className="absolute top-4 right-4 bg-[#2F4F3A] text-white text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-md shadow">
              Después (Lacado Satinado)
            </span>
            <div
              className="absolute top-0 bottom-0 w-1 bg-white shadow-xl cursor-ew-resize flex items-center justify-center pointer-events-none"
              style={{ left: `${sliderPosition}%` }}
            >
              <div className="w-8 h-8 rounded-full bg-white text-[#2F4F3A] shadow-lg border border-[#B08C4F] flex items-center justify-center text-xs font-bold pointer-events-auto">↔</div>
            </div>
            <input
              type="range" min="0" max="100" value={sliderPosition}
              onChange={(e) => setSliderPosition(Number(e.target.value))}
              className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-10"
              aria-label="Arrastrar slider antes y después"
            />
          </div>

          <div className="flex flex-wrap items-center justify-between text-xs text-[#6B6B6B] mt-4 pt-3 border-t border-[#E3D9CC]">
            <p><em>Arrastra el círculo blanco hacia los lados para comparar la transformación de textura y luminosidad.</em></p>
            <div className="flex items-center space-x-2 mt-2 sm:mt-0">
              {activeProjectForSlider.details.map((d, i) => (
                <span key={i} className="bg-[#E3D9CC]/40 text-[#343434] px-2 py-0.5 rounded text-[11px]">{d}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Galería */}
        <div className="mb-14">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <h3 className="font-editorial text-2xl font-semibold text-[#343434]">Galería de Proyectos en Madrid</h3>
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
                    categoryFilter === f.id ? 'bg-[#2F4F3A] text-white font-semibold' : 'bg-white text-[#343434] hover:bg-[#E3D9CC] border border-[#E3D9CC]'
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>

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
                    <img src={proj.afterImg} alt={proj.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <span className="absolute top-3 left-3 bg-[#2F4F3A] text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded">{proj.categoryLabel}</span>
                    <span className="absolute bottom-3 right-3 bg-white/90 text-[#343434] text-[10px] font-semibold px-2 py-0.5 rounded flex items-center space-x-1">
                      <MapPin className="w-3 h-3 text-[#2F4F3A]" />
                      <span>{proj.neighborhood}</span>
                    </span>
                  </div>
                  <div className="p-5">
                    <h4 className="font-sans font-bold text-base text-[#343434] group-hover:text-[#2F4F3A] mb-2 leading-snug">{proj.title}</h4>
                    <p className="text-xs text-[#6B6B6B] line-clamp-2 leading-relaxed">{proj.description}</p>
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
            SIMULADOR CON IA (#simulador)
            ========================================================================= */}
        <section id="simulador" className="bg-white rounded-2xl border border-[#B08C4F]/40 p-6 sm:p-10 mb-14 shadow-sm">
          <div className="max-w-3xl mb-8">
            <div className="inline-flex items-center space-x-1.5 text-xs uppercase tracking-wider text-[#2F4F3A] font-bold bg-[#E3D9CC]/50 px-3 py-1 rounded-full mb-2">
              <Sparkles className="w-4 h-4 text-[#B08C4F]" />
              <span>Simulador con IA</span>
            </div>
            <h2 className="font-editorial text-2xl sm:text-3xl font-semibold text-[#343434] mb-2">
              Sube la foto de tu mueble y la IA le aplica el acabado que elijas
            </h2>
            <p className="text-xs sm:text-sm text-[#6B6B6B] leading-relaxed">
              Haz una foto con luz natural a tu armario, puerta o mueble, elige el color y el brillo, y la IA
              devolverá la misma foto con el lacado aplicado. Usa tu propia clave de OpenRouter.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Controles */}
            <div className="lg:col-span-5 space-y-6">

              {/* Paso 1: API key */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#343434] mb-2">
                  1. Tu clave de OpenRouter
                </label>
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6B6B6B]" />
                    <input
                      type={showKey ? 'text' : 'password'}
                      value={apiKey}
                      onChange={(e) => setApiKey(e.target.value)}
                      placeholder="sk-or-v1-..."
                      autoComplete="off"
                      spellCheck={false}
                      className="w-full pl-9 pr-10 p-2.5 rounded-lg border border-[#E3D9CC] bg-white text-xs text-[#343434] focus:outline-none focus:border-[#2F4F3A] font-mono"
                    />
                    <button
                      type="button"
                      onClick={() => setShowKey((v) => !v)}
                      className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-[#6B6B6B] hover:text-[#343434] cursor-pointer"
                      aria-label={showKey ? 'Ocultar clave' : 'Mostrar clave'}
                    >
                      {showKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                  {apiKey && (
                    <button
                      onClick={clearKey}
                      className="p-2.5 rounded-lg border border-[#E3D9CC] text-[#6B6B6B] hover:text-[#8C3B2E] hover:border-[#8C3B2E] cursor-pointer"
                      aria-label="Borrar clave"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
                <div className="mt-2 flex items-start gap-2 text-[11px] text-[#6B6B6B]">
                  <input
                    type="checkbox"
                    id="recordar-clave"
                    checked={rememberKey}
                    onChange={(e) => setRememberKey(e.target.checked)}
                    className="w-3.5 h-3.5 mt-0.5 rounded accent-[#2F4F3A]"
                  />
                  <label htmlFor="recordar-clave" className="cursor-pointer">
                    Recordar la clave en este dispositivo
                    <span className="block text-[10px] text-[#8C3B2E]">
                      La clave se guarda en el navegador y se envía directamente a OpenRouter. Si usas un ordenador
                      compartido, no la guardes.
                    </span>
                  </label>
                </div>
                <p className="text-[10px] text-[#6B6B6B] mt-1.5">
                  Créala gratis en <span className="font-semibold">openrouter.ai/keys</span>. La consumimos tú, no
                  nosotros: la petición va de tu navegador a OpenRouter y nosotros no vemos tu clave.
                </p>
              </div>

              {/* Paso 2: subida */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#343434] mb-2">
                  2. Sube la foto de tu mueble
                </label>

                {!photo ? (
                  <label
                    onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
                    onDragLeave={() => setDragging(false)}
                    onDrop={(e) => {
                      e.preventDefault();
                      setDragging(false);
                      const f = e.dataTransfer.files?.[0];
                      if (f) handleFile(f);
                    }}
                    className={`flex flex-col items-center justify-center gap-2 p-8 rounded-xl border-2 border-dashed cursor-pointer transition-colors ${
                      dragging ? 'border-[#2F4F3A] bg-[#E3D9CC]/40' : 'border-[#E3D9CC] bg-[#F5F1EA] hover:border-[#B08C4F]'
                    }`}
                  >
                    <Upload className="w-7 h-7 text-[#2F4F3A]" />
                    <span className="text-xs font-bold text-[#343434] text-center">Arrastra tu foto aquí</span>
                    <span className="text-[11px] text-[#6B6B6B] text-center">o pulsa para elegir · JPG o PNG · máx. 15 MB</span>
                    <input
                      ref={fileRef}
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        const f = e.target.files?.[0];
                        if (f) handleFile(f);
                      }}
                    />
                  </label>
                ) : (
                  <div className="flex items-center gap-3 p-3 rounded-xl border border-[#E3D9CC] bg-[#F5F1EA]">
                    <img src={photo} alt="Foto cargada" className="w-14 h-14 rounded-lg object-cover border border-[#E3D9CC]" />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-bold text-[#343434] truncate">{photoName}</p>
                      <p className="text-[11px] text-[#6B6B6B]">Lista para generar</p>
                    </div>
                    <button onClick={reset} className="p-2 rounded-lg text-[#6B6B6B] hover:bg-white hover:text-[#343434] cursor-pointer" aria-label="Quitar foto">
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                )}

                {uploadError && (
                  <div className="mt-2 flex items-start gap-2 text-[11px] text-[#8C3B2E] bg-[#F7E4E0] p-3 rounded-lg">
                    <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
                    <span>{uploadError}</span>
                  </div>
                )}
              </div>

              {/* Paso 3: tipo de pieza */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#343434] mb-2">
                  3. ¿Qué pieza vas a lacar?
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {ITEM_TYPES.map((t) => (
                    <button
                      key={t.id}
                      onClick={() => setItemType(t.id)}
                      className={`p-2.5 rounded-lg text-xs font-medium border transition-all cursor-pointer ${
                        itemType === t.id
                          ? 'bg-[#2F4F3A] text-white border-[#2F4F3A] font-semibold'
                          : 'bg-[#F5F1EA] text-[#343434] border-[#E3D9CC] hover:bg-[#E3D9CC]/60'
                      }`}
                    >
                      {t.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Paso 4: color */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#343434] mb-2">
                  4. Elige el tono de laca
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {PALETTE.map((c) => (
                    <button
                      key={c.hex}
                      onClick={() => { setColor(c); setResult(null); }}
                      className={`p-2 rounded-lg border transition-all cursor-pointer flex flex-col items-center text-center ${
                        color.hex === c.hex ? 'border-[#2F4F3A] ring-2 ring-[#2F4F3A]/30 bg-[#F5F1EA]' : 'border-[#E3D9CC] hover:border-[#B08C4F]'
                      }`}
                    >
                      <div className="w-7 h-7 rounded-full border border-black/20 shadow-xs mb-1.5" style={{ backgroundColor: c.hex }} />
                      <span className="text-[11px] font-medium text-[#343434] line-clamp-1">{c.name}</span>
                    </button>
                  ))}
                </div>
                <p className="text-[11px] text-[#6B6B6B] mt-2 italic">
                  <strong>{color.name}</strong> — {color.desc}
                </p>
              </div>

              {/* Paso 5: acabado */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#343434] mb-2">
                  5. Grado de acabado
                </label>
                <div className="space-y-2">
                  {FINISHES.map((f) => (
                    <button
                      key={f.id}
                      onClick={() => { setFinish(f.id); setResult(null); }}
                      className={`w-full p-3 rounded-lg border text-left cursor-pointer transition-all ${
                        finish === f.id ? 'bg-[#2F4F3A] text-white border-[#2F4F3A]' : 'bg-[#F5F1EA] text-[#343434] border-[#E3D9CC]'
                      }`}
                    >
                      <span className="block text-xs font-bold">{f.label}</span>
                      <span className={`block text-[10px] mt-0.5 ${finish === f.id ? 'text-white/80' : 'text-[#6B6B6B]'}`}>{f.desc}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Paso 6: modelo */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#343434] mb-2">
                  6. Modelo de IA
                </label>
                <select
                  value={model}
                  onChange={(e) => setModel(e.target.value)}
                  className="w-full p-2.5 rounded-lg border border-[#E3D9CC] bg-[#F5F1EA] text-xs font-medium text-[#343434] focus:outline-none focus:border-[#2F4F3A]"
                >
                  {MODELS.map((m) => (
                    <option key={m.id} value={m.id}>{m.label} — {m.coste} por imagen</option>
                  ))}
                </select>
              </div>

              {/* Paso 7: instrucción extra */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#343434] mb-2">
                  7. Instrucción para la IA (opcional)
                </label>
                <textarea
                  value={extraNote}
                  onChange={(e) => setExtraNote(e.target.value)}
                  rows={2}
                  maxLength={300}
                  placeholder="Ej: conserva el tirador de latón, no cambies la perspectiva"
                  className="w-full p-2.5 rounded-lg border border-[#E3D9CC] bg-[#F5F1EA] text-xs text-[#343434] focus:outline-none focus:border-[#2F4F3A] resize-none"
                />
                <p className="text-[10px] text-[#6B6B6B] mt-1">{extraNote.length}/300</p>
              </div>
            </div>

            {/* Resultado */}
            <div className="lg:col-span-7 bg-[#F5F1EA] rounded-xl border border-[#E3D9CC] p-5">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                <span className="text-xs font-bold text-[#343434]">
                  {result ? 'Previsualización generada' : photo ? 'Foto lista para generar' : 'Generador de acabados'}
                </span>
                {result && (
                  <span className="text-[11px] text-[#2F4F3A] font-semibold">{color.name} · {activeFinish.label.split(' (')[0]}</span>
                )}
              </div>

              <div className="relative rounded-lg overflow-hidden border border-[#B08C4F]/30 bg-[#E3D9CC]/30 shadow-inner aspect-[4/3] flex items-center justify-center">
                {!photo ? (
                  <div className="text-center px-6">
                    <Sparkles className="w-8 h-8 text-[#6B6B6B] mx-auto mb-2" />
                    <p className="text-xs text-[#6B6B6B] leading-relaxed">
                      Sube una foto de tu mueble, elige el color y el acabado, y pulsa el botón para que la IA lo
                      vicie. Tarda entre 10 y 30 segundos.
                    </p>
                  </div>
                ) : (
                  <>
                    <img
                      src={viewMode === 'result' && result ? result : photo}
                      alt="Mueble"
                      className="absolute inset-0 w-full h-full object-contain"
                    />

                    {loading && (
                      <div className="absolute inset-0 bg-[#343434]/75 flex flex-col items-center justify-center gap-2 text-white px-6 text-center">
                        <Loader2 className="w-7 h-7 animate-spin" />
                        <span className="text-xs font-semibold">La IA está lacando tu mueble…</span>
                        <span className="text-[10px] text-white/75">Suele tardar entre 10 y 30 segundos. No cierres la pestaña.</span>
                      </div>
                    )}

                    {!loading && viewMode === 'result' && result && (
                      <span className="absolute top-3 left-3 bg-[#2F4F3A] text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md">
                        Acabado generado por IA
                      </span>
                    )}
                    {!loading && viewMode === 'original' && (
                      <span className="absolute top-3 left-3 bg-[#343434]/90 text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md">
                        Tu foto original
                      </span>
                    )}
                  </>
                )}
              </div>

              {/* Acciones */}
              {photo && (
                <div className="mt-4 flex flex-wrap gap-2">
                  <button
                    onClick={generate}
                    disabled={loading}
                    className="flex-1 min-w-[200px] flex items-center justify-center gap-2 bg-[#2F4F3A] hover:bg-[#243E2E] text-white font-semibold py-3 px-4 rounded-lg shadow-sm transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
                    <span className="text-xs sm:text-sm">{loading ? 'Generando…' : 'Generar con IA'}</span>
                  </button>

                  {result && (
                    <>
                      <button
                        onClick={() => setViewMode((v) => (v === 'result' ? 'original' : 'result'))}
                        className="flex items-center justify-center gap-2 bg-white border border-[#E3D9CC] text-[#343434] font-semibold py-3 px-4 rounded-lg cursor-pointer hover:bg-[#F5F1EA]"
                      >
                        <RefreshCw className="w-4 h-4" />
                        <span className="text-xs">{viewMode === 'result' ? 'Ver original' : 'Ver resultado'}</span>
                      </button>
                      <button
                        onClick={handleDownload}
                        className="flex items-center justify-center gap-2 bg-white border border-[#E3D9CC] text-[#343434] font-semibold py-3 px-4 rounded-lg cursor-pointer hover:bg-[#F5F1EA]"
                        aria-label="Descargar imagen"
                      >
                        <Download className="w-4 h-4" />
                      </button>
                    </>
                  )}
                </div>
              )}

              {error && (
                <div className="mt-3 flex items-start gap-2 text-[11px] text-[#8C3B2E] bg-[#F7E4E0] p-3 rounded-lg">
                  <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
                  <span>{error}</span>
                </div>
              )}

              <div className="mt-4 flex items-start gap-2 text-[11px] text-[#6B6B6B] bg-white p-3 rounded-lg border border-[#E3D9CC]">
                <Info className="w-4 h-4 text-[#B08C4F] shrink-0 mt-0.5" />
                <span>
                  <strong>Nota del maestro lacador:</strong> la IA te sirve para decidir el color, pero el tono final
                  depende de la luz de tu casa y del estado real de la madera. En el taller aplicamos muestras físicas
                  antes de iniciar el lacado definitivo.
                </span>
              </div>

              {result && (
                <div className="mt-5">
                  <button
                    onClick={handleSendToWhatsApp}
                    className="w-full flex items-center justify-center gap-2 bg-[#2F4F3A] hover:bg-[#243E2E] text-white font-semibold py-3.5 px-4 rounded-lg shadow-sm transition-all cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                    <span className="text-xs sm:text-sm">Pedir este acabado en el taller</span>
                  </button>
                  <p className="text-[10px] text-[#6B6B6B] mt-2 text-center">
                    Descarga la imagen y adjúntala por WhatsApp junto con la referencia {color.name}.
                  </p>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Calculadora */}
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
              Introduce los datos básicos de tu vivienda en Madrid norte o centro y obtén un rango orientativo en menos de 1 minuto. No sustituye al presupuesto final, que ajustamos tras ver fotos reales.
            </p>
          </div>
          <BudgetCalculator onOpenWhatsApp={onOpenWhatsApp} />
        </section>

      </div>
    </div>
  );
};

/* ===========================================================================
   Calculadora de presupuesto
   =========================================================================== */
const BudgetCalculator: React.FC<{ onOpenWhatsApp: (msg?: string) => void }> = ({ onOpenWhatsApp }) => {
  const [serviceType, setServiceType] = useState<'armarios' | 'puertas' | 'salon' | 'restauracion'>('armarios');
  const [quantity, setQuantity] = useState<number>(6);
  const [includeFrames, setIncludeFrames] = useState<boolean>(true);
  const [neighborhood, setNeighborhood] = useState<string>('Chamberí');
  const [woodCondition, setWoodCondition] = useState<'bueno' | 'medio' | 'antiguo'>('medio');

  const estimate = (() => {
    let min = 0, max = 0, days = '7 - 10 días laborables';
    if (serviceType === 'armarios') {
      const base = includeFrames ? 140 : 120;
      const mult = woodCondition === 'antiguo' ? 1.25 : woodCondition === 'bueno' ? 0.95 : 1.1;
      min = Math.round(quantity * base * mult);
      max = Math.round(min * 1.3);
      days = quantity > 8 ? '10 - 14 días' : '7 - 10 días';
    } else if (serviceType === 'puertas') {
      const base = includeFrames ? 160 : 130;
      const mult = woodCondition === 'antiguo' ? 1.2 : 1.05;
      min = Math.round(quantity * base * mult);
      max = Math.round(min * 1.28);
      days = quantity > 6 ? '9 - 12 días' : '6 - 8 días';
    } else if (serviceType === 'salon') {
      min = Math.round(quantity * 450 * (woodCondition === 'antiguo' ? 1.3 : 1.1));
      max = Math.round(min * 1.35);
      days = '8 - 12 días';
    } else {
      min = Math.round(quantity * 520);
      max = Math.round(min * 1.4);
      days = '12 - 18 días';
    }
    return { min, max, days };
  })();

  const handleSend = () => {
    const name =
      serviceType === 'armarios' ? 'Armarios empotrados' :
      serviceType === 'puertas' ? 'Puertas de paso' :
      serviceType === 'salon' ? 'Muebles de salón' : 'Restauración antigua';
    const msg = `Hola, he calculado en vuestra web un presupuesto orientativo para ${quantity} unidades de ${name} en ${neighborhood} (estado ${woodCondition}). El rango estimado fue de ${estimate.min}€ a ${estimate.max}€. Os adjunto fotos para presupuesto cerrado.`;
    onOpenWhatsApp(msg);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
      <div className="lg:col-span-7 bg-white p-6 rounded-xl border border-[#E3D9CC] space-y-5">
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-[#343434] mb-2">Tipo de estructura o mueble</label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {[
              { id: 'armarios', label: 'Armarios' },
              { id: 'puertas', label: 'Puertas paso' },
              { id: 'salon', label: 'Mueble salón' },
              { id: 'restauracion', label: 'Restauración' }
            ].map((s) => (
              <button
                key={s.id}
                onClick={() => setServiceType(s.id as typeof serviceType)}
                className={`p-2.5 rounded-lg text-xs font-semibold border transition-all cursor-pointer text-center ${
                  serviceType === s.id ? 'bg-[#2F4F3A] text-white border-[#2F4F3A]' : 'bg-[#F5F1EA] text-[#343434] border-[#E3D9CC] hover:bg-[#E3D9CC]'
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-1">
            <label className="text-xs font-bold uppercase tracking-wider text-[#343434]">
              {serviceType === 'armarios' ? 'Número de puertas / hojas de frente:' : serviceType === 'puertas' ? 'Número de puertas de paso:' : 'Número de piezas:'}
            </label>
            <span className="text-base font-bold text-[#2F4F3A] bg-[#F5F1EA] px-3 py-0.5 rounded-md border border-[#E3D9CC]">
              {quantity} {quantity === 1 ? 'unidad' : 'unidades'}
            </span>
          </div>
          <input
            type="range" min="1" max={serviceType === 'armarios' ? 16 : 12} value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            className="w-full accent-[#2F4F3A] cursor-pointer"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#343434] mb-1.5">Barrio o zona de Madrid</label>
            <select
              value={neighborhood} onChange={(e) => setNeighborhood(e.target.value)}
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
            <label className="block text-xs font-bold uppercase tracking-wider text-[#343434] mb-1.5">Estado actual de la madera</label>
            <select
              value={woodCondition} onChange={(e) => setWoodCondition(e.target.value as typeof woodCondition)}
              className="w-full p-2.5 rounded-lg border border-[#E3D9CC] bg-[#F5F1EA] text-xs font-medium text-[#343434] focus:outline-none focus:border-[#2F4F3A]"
            >
              <option value="bueno">Buen estado (solo cambiar color y barniz)</option>
              <option value="medio">Estado medio (algún golpe y holgura leve)</option>
              <option value="antiguo">Antiguo o barniz cuarteado (requiere decapado)</option>
            </select>
          </div>
        </div>

        <div className="pt-2">
          <label className="flex items-center space-x-2 text-xs text-[#343434] cursor-pointer">
            <input
              type="checkbox" checked={includeFrames} onChange={(e) => setIncludeFrames(e.target.checked)}
              className="w-4 h-4 rounded text-[#2F4F3A] accent-[#2F4F3A]"
            />
            <span>Incluir lacado de marcos fijos y tapajuntas a juego (Recomendado para continuidad)</span>
          </label>
        </div>
      </div>

      <div className="lg:col-span-5 bg-[#2F4F3A] text-white p-6 sm:p-7 rounded-xl flex flex-col justify-between shadow-md">
        <div>
          <span className="text-[11px] uppercase tracking-wider font-semibold text-white/70 block mb-1">Rango de Presupuesto Estimado</span>
          <div className="text-3xl sm:text-4xl font-editorial font-bold text-white mb-2">
            {estimate.min.toLocaleString('es-ES')} € - {estimate.max.toLocaleString('es-ES')} €
          </div>
          <p className="text-xs text-white/80 leading-relaxed mb-4">
            Estimación basada en desmontaje, preparación, lijado, lacado artesanal a pistola en nuestro taller de Tetuán y montaje final.
          </p>
          <div className="space-y-2 border-t border-white/20 pt-4 text-xs text-white/90">
            <div className="flex justify-between"><span>Plazo estimado de taller:</span><strong className="text-white">{estimate.days}</strong></div>
            <div className="flex justify-between"><span>Zona de intervención:</span><strong className="text-white">{neighborhood}</strong></div>
            <div className="flex justify-between"><span>Tipo de acabado:</span><strong className="text-white">Satinado Sedoso (sin obras)</strong></div>
          </div>
        </div>
        <div className="pt-6 mt-6 border-t border-white/20">
          <button
            onClick={handleSend}
            className="w-full flex items-center justify-center gap-2 bg-white hover:bg-[#F5F1EA] text-[#2F4F3A] font-bold py-3.5 px-4 rounded-lg transition-all shadow cursor-pointer text-xs sm:text-sm"
          >
            <Send className="w-4 h-4" />
            <span>Enviar este cálculo al taller por WhatsApp</span>
          </button>
          <p className="text-[10px] text-center text-white/70 mt-2">Respuesta en menos de 24h con presupuesto cerrado</p>
        </div>
      </div>
    </div>
  );
};
