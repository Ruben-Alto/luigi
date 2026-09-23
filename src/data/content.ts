import { BlogPost, ProjectItem, ReviewItem, ServiceDetail, ServiceId } from '../types';

export const BUSINESS_INFO = {
  name: 'Lacados Arribas Martín',
  founderYear: 1969,
  address: 'Calle de los Voluntarios Catalanes 20B, Tetuán, 28039 Madrid',
  street: 'Calle de los Voluntarios Catalanes 20B',
  postalCode: '28039',
  district: 'Tetuán',
  city: 'Madrid',
  shortAddress: 'Calle de los Voluntarios Catalanes 20B · Tetuán, Madrid',
  mapsUrl: 'https://maps.google.com/?q=Calle+de+los+Voluntarios+Catalanes+20B+28039+Madrid',
  phone: '+34 609 89 25 14',
  phoneRaw: '+34609892514',
  phoneDisplay: '609 89 25 14',
  whatsappNumber: '34609892514',
  whatsappDisplay: '+34 609 89 25 14',
  schedule: 'Lunes a Viernes: 9:00 - 14:00 y 17:00 - 20:00 (Sábados con cita previa)',
  scheduleWeekdays: 'Lunes a Viernes: 9:00 - 14:00 y 17:00 - 20:00',
  scheduleSaturdays: 'Sábados con cita previa',
  metro: 'Metro Estrecho (Línea 1) o Francos Rodríguez (Línea 7)',
  buses: 'Líneas 64, 124, 126, 128, 3, 44',
  zones: ['Tetuán', 'Chamberí', 'Barrio del Pilar', 'Chamartín', 'Moncloa', 'Madrid Norte y Centro']
};

export const SERVICES_DATA: Record<ServiceId, ServiceDetail> = {
  'lacado-armarios-empotrados-madrid': {
    id: 'lacado-armarios-empotrados-madrid',
    title: 'Armarios Empotrados y Frentes',
    subtitle: 'Acabado sedoso y duradero sin obras',
    shortDesc: 'Actualizamos armarios empotrados de dormitorios y pasillos en tonos blanco roto, grises cálidos y colores piedra con lacado satinado uniforme a pistola.',
    h1: 'Lacado satinado y mate de armarios empotrados en Madrid norte y centro',
    heroText: 'Sustituimos el barniz anaranjado o la madera oscura de los armarios de tu vivienda por un acabado satinado sedoso y resistente al uso diario, desmontando las hojas y lacando en cabina de taller.',
    iconName: 'DoorClosed',
    sampleImageBefore: 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=900&q=80',
    sampleImageAfter: 'https://images.unsplash.com/photo-1558997519-83ea9252def8?auto=format&fit=crop&w=900&q=80',
    features: [
      'Sin obras en casa: desmontamos frentes y puertas numeradas para lacar en cabina cerrada de Tetuán',
      'Lijados sucesivos y corrección de holguras para una base ultraestable sin piel de naranja',
      'Barnices ecológicos al agua certificados para interiores de dormitorios infantiles y adultos',
      'Tonos a medida: Blancos rotos luminosos, gris piedra Chamberí, arena y topo satinado'
    ],
    processSteps: [
      { title: '1. Desmontaje y numeración', desc: 'Acudimos a tu piso en Chamberí, Tetuán o Barrio del Pilar, retiramos las puertas y frentes de armario y los protegemos para su traslado seguro al taller.' },
      { title: '2. Lijado y cabina en Tetuán', desc: 'Decapado minucioso de barnices antiguos, corrección de golpes, imprimación selladora y 3 manos cruzadas de laca satinada a pistola.' },
      { title: '3. Montaje y ajuste de bisagras', desc: 'Volvemos con las puertas curadas al 100%, las instalamos, ajustamos los cierres y enrasamos con los tapajuntas.' }
    ],
    palette: [
      { name: 'Blanco Roto Cálido', hex: '#F5F1EA', desc: 'Aporta hasta un 40% más de luminosidad natural en dormitorios y pasillos.' },
      { name: 'Gris Piedra Chamberí', hex: '#E3D9CC', desc: 'Contemporáneo, neutro y acogedor para carpinterías con moldura fina.' },
      { name: 'Verde Salvia Sedoso', hex: '#A4B3A0', desc: 'Inspiración clásica inglesa en satinado mate anti-huellas.' }
    ],
    faqs: [
      {
        question: '¿Se desprenden olores fuertes o polvo en mi vivienda?',
        answer: 'No. El 95% del trabajo sucio de lijado y aplicación a pistola se realiza en nuestra cabina de Tetuán. En tu casa solo desmontamos y volvemos a montar las piezas ya curadas e inodoras.'
      },
      {
        question: '¿Cuánto tiempo dura el proceso completo de unos armarios?',
        answer: 'Un frente de 4 a 6 puertas suele estar listo y montado entre 7 y 10 días laborables, respetando los tiempos necesarios de secado y polimerización del esmalte.'
      },
      {
        question: '¿Aguanta el roce diario de niños o aspiradoras?',
        answer: 'Absolutamente. No es pintura plástica ni chalk paint decorativa: utilizamos lacas poliuretánicas y acrílicas de dureza ebanista concebidas para soportar golpes moderados y limpieza recurrente.'
      }
    ]
  },
  'lacado-puertas-paso-madrid': {
    id: 'lacado-puertas-paso-madrid',
    title: 'Puertas de Paso y Tapajuntas',
    subtitle: 'Unificamos la arquitectura de tu vivienda',
    shortDesc: 'Lacamos puertas interiores, marcos y tapajuntas para unificar el conjunto del piso y llevarlo a un efecto mate sedoso contemporáneo y limpio.',
    h1: 'Lacado satinado de puertas de paso y marcos en Madrid norte y centro',
    heroText: 'Renueva todas las puertas interiores de tu casa sin cambiarlas. Conservamos la calidad de la madera maciza original aplicando un tratamiento sedoso que transforma la luz de pasillos y salones.',
    iconName: 'DoorOpen',
    sampleImageBefore: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=900&q=80',
    sampleImageAfter: 'https://images.unsplash.com/photo-1534349762230-e0cadf78f5da?auto=format&fit=crop&w=900&q=80',
    features: [
      'Tratamiento íntegro de hojas, galces, marcos y tapajuntas para una continuidad visual perfecta',
      'Cantos finos y juntas limpias sin chorretones ni gotas acumuladas',
      'Opcional: Sustitución o restauración de manillas, rosetas y pernios en latón satinado o negro forja',
      'Ideal para pisos de los años 70 a 90 con puertas de sapelly, roble o pino oscurecido'
    ],
    processSteps: [
      { title: '1. Descolgado y desherraje', desc: 'Retiramos las hojas de las puertas marcando su posición exacta y retiramos manillas y pernios.' },
      { title: '2. Tratamiento en cabina', desc: 'Lijado mecánico de desbaste, fondeo aislante contra taninos de madera vieja y lacado a pistola en horizontal para máxima planitud.' },
      { title: '3. Lacado de marcos in situ', desc: 'Protegemos suelo y paredes con plástico electrostático para lacar cercos y tapajuntas con micro-turbina sin manchar nada.' }
    ],
    palette: [
      { name: 'Blanco Puro Sedoso', hex: '#FFFFFF', desc: 'Luz limpia y atemporal que combina con cualquier suelo de tarima o parquet.' },
      { name: 'Gris Humo Satinado', hex: '#6B6560', desc: 'Elegancia sobria para pisos señoriales en Chamberí o Tetuán.' },
      { name: 'Verde Botella Atelier', hex: '#2F4F3A', desc: 'Acento señorial para la puerta principal o acceso al salón.' }
    ],
    faqs: [
      {
        question: '¿Es mejor lacar mis puertas viejas o comprar unas nuevas baratas de block?',
        answer: 'Las puertas de pisos construidos en Madrid entre 1960 y 2000 suelen tener almas macizas o chapas de madera noble de gran peso y aislamiento acústico. Comprar puertas huecas actuales cuesta más y aísla mucho menos que actualizar las tuyas con laca ebanista.'
      },
      {
        question: '¿Qué se hace con los marcos fijos en la pared?',
        answer: 'Los marcos y tapajuntas se lian y tratan in situ de forma meticulosa por nuestros oficiales protegiendo paredes y suelos para que queden con el mismo tono y brillo sedoso que las hojas.'
      }
    ]
  },
  'lacado-muebles-salon-madrid': {
    id: 'lacado-muebles-salon-madrid',
    title: 'Muebles de Salón y Comedor',
    subtitle: 'Segunda vida de diseño para tus mejores piezas',
    shortDesc: 'Rescatamos aparadores, vitrinas, librerías, mesas de comedor y muebles de TV en Chamberí, Tetuán y Barrio del Pilar con un acabado mate sedoso de alta resistencia.',
    h1: 'Lacado satinado de muebles de salón (aparadores, librerías, mesas) en Madrid',
    heroText: 'Tu aparador o mesa de madera maciza merece seguir en casa. Transformamos muebles oscuros o desfasados en piezas protagonistas de revista de interiorismo, sin brillos plásticos.',
    iconName: 'Armchair',
    sampleImageBefore: 'https://images.unsplash.com/photo-1540518614846-7ede433c4ef2?auto=format&fit=crop&w=900&q=80',
    sampleImageAfter: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=900&q=80',
    features: [
      'Tratamiento hidrófugo y anti-manchas en encimeras de mesas de comedor y aparadores',
      'Combinación de tonos: cajas lacadas con tapas en madera natural encerada o viceversa',
      'Respeto por molduras, tallas y herrajes originales en latón o hierro',
      'Servicio integral de recogida y entrega en domicilio con embalaje de alta protección'
    ],
    processSteps: [
      { title: '1. Recogida en planta', desc: 'Retiramos el mueble con personal propio cualificado y mantas de mudanza acolchadas.' },
      { title: '2. Decapado ebanista', desc: 'Eliminamos barnices antiguos de nitrocelulosa o poliuretano respetando las aristas y perfiles de moldura.' },
      { title: '3. Lacado sedoso y curado', desc: 'Aplicación en capas de laca satinada táctil con alta resistencia al calor de platos y roce de vasos.' }
    ],
    palette: [
      { name: 'Gris Topo Suave', hex: '#C2B39A', desc: 'Evoca maderas nórdicas lavadas con una calidez envolvente.' },
      { name: 'Negro Carbón Mate', hex: '#343434', desc: 'Contraste arquitectónico sofisticado para vitrinas y librerías.' },
      { name: 'Blanco Roto Lino', hex: '#F5F1EA', desc: 'El estándar de oro para dar amplitud sin frialdad hospitalaria.' }
    ],
    faqs: [
      {
        question: '¿Si lacamos la mesa del comedor, se marcará con platos calientes o líquidos?',
        answer: 'Aplicamos un barniz poliuretánico de dos componentes de formulación dura que resiste derrames de agua, café o vino y la limpieza con paño húmedo.'
      },
      {
        question: '¿Podéis lacar el mueble manteniendo la tapa en madera original?',
        answer: 'Sí, es una de las soluciones más demandadas en Chamberí: decapamos y protegemos la tapa en madera natural con aceite cera mate y lacamos la estructura en blanco roto satinado.'
      }
    ]
  },
  'restauracion-muebles-antiguos-madrid': {
    id: 'restauracion-muebles-antiguos-madrid',
    title: 'Restauración de Muebles Antiguos',
    subtitle: 'Oficio artesano, valor sentimental y economía circular',
    shortDesc: 'Si tienes un aparador, cómoda o mesa antigua con valor sentimental, la restauramos y la llevamos a un satinado suave que respeta la pieza y la integra en interiores actuales.',
    h1: 'Restauración de muebles antiguos en acabado satinado en Madrid',
    heroText: 'Desde 1969 aplicamos el oficio tradicional de ebanistería: desinsectación de carcoma, consolidación estructural, sustitución de barnices quemados por lacas sedosas y pulido de bronces.',
    iconName: 'Sparkles',
    sampleImageBefore: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=900&q=80',
    sampleImageAfter: 'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=900&q=80',
    features: [
      'Tratamiento curativo y preventivo antitermitas y anticarcoma con cámara de reposo',
      'Encolado con adhesivos reversibles de ebanistería y reposición de chapas nobles despegadas',
      'Limpieza y abrillantado de tiradores, cerraduras y bocallaves en latón de época',
      'Acabados en muñequilla con goma laca, cera de abejas o lacado satinado mate sobrio'
    ],
    processSteps: [
      { title: '1. Diagnóstico de la madera', desc: 'Evaluamos la especie (nogal, caoba, cerezo, castaño), el estado de los ensambles y posibles xilófagos.' },
      { title: '2. Sanado y reconstrucción', desc: 'Restauramos patas, ensambles de cola de milano y faltantes de madera sin alterar la pátina histórica.' },
      { title: '3. Acabado de coleccionista', desc: 'Aplicamos el tratamiento acordado: desde restauración conservadora hasta modernización cromática sutil.' }
    ],
    palette: [
      { name: 'Cobre Satinado', hex: '#C39A6B', desc: 'Matiz noble que resalta la veta profunda de nogales y caobas.' },
      { name: 'Verde Botella Vintage', hex: '#2F4F3A', desc: 'Resalta molduras y frentes de cómodas con un aire botánico señorial.' },
      { name: 'Marfil Antiguo', hex: '#E3D9CC', desc: 'Reproduce el envejecimiento natural y suave de la pintura de época.' }
    ],
    faqs: [
      {
        question: '¿Pierde valor un mueble antiguo al lacarlo?',
        answer: 'En piezas de ebanistería popular de principios o mediados del siglo XX que tienen barnices de poliéster gruesos o deteriorados, un buen decapado y lacado satinado en cabina aumenta su valor decorativo y de uso diario.'
      },
      {
        question: '¿Qué hacéis si la madera tiene carcoma activa?',
        answer: 'Sometemos la pieza a un tratamiento insecticida por impregnación profunda y embolsado hermético que garantiza la eliminación de larvas y adultos antes de iniciar el acabado.'
      }
    ]
  }
};

export const COMPARISON_TABLE = [
  {
    criterion: 'Método de aplicación',
    chalkPaint: 'Brocha o rodillo en casa o taller decorativo',
    arribasMartin: 'Pistola aerográfica calibrada en cabina de taller con extracción',
    advantage: 'Acabado perfectamente plano y liso sin surcos'
  },
  {
    criterion: 'Textura al tacto',
    chalkPaint: 'Rugosa, porosa, tipo tiza o áspera',
    arribasMartin: 'Tacto sedoso continuo, uniforme y agradable al tacto diario',
    advantage: 'Placer táctil sin asperezas ni acumulación de polvo'
  },
  {
    criterion: 'Resistencia a roces y golpes',
    chalkPaint: 'Baja: se desconcha con facilidad y absorbe suciedad',
    arribasMartin: 'Alta: laca poliuretánica elástica formulada para interiores',
    advantage: 'Soporta el trote de niños, aspiradoras y mascotas'
  },
  {
    criterion: 'Limpieza y mantenimiento',
    chalkPaint: 'Difícil: no tolera paños húmedos ni limpiadores habituales',
    arribasMartin: 'Sencilla: paño de microfibra con agua y jabón neutro',
    advantage: 'Mantenimiento cero estrés en el día a día'
  },
  {
    criterion: 'Idoneidad para grandes frentes',
    chalkPaint: 'Mala: en puertas y armarios se aprecian sombras y cortes de rodillo',
    arribasMartin: 'Excelente: velo homogéneo en superficies de 2,5 m de altura',
    advantage: 'Aspecto de mueble de fábrica premium'
  },
  {
    criterion: 'Desglose de carpintería',
    chalkPaint: 'Solo pintura superficial, no ajustan cierres ni holguras',
    arribasMartin: 'Ajuste ebanista: bisagras, cantos, enrases y cepillados',
    advantage: 'Cierres suaves y puertas perfectamente aplomadas'
  }
];

export const REAL_PROJECTS: ProjectItem[] = [
  {
    id: 'armarios-alonso-cano',
    title: 'Frentes de vestidor en Blanco Roto Satinado',
    category: 'armarios',
    categoryLabel: 'Armarios empotrados',
    neighborhood: 'Chamberí',
    description: 'Piso señorial en calle Alonso Cano. 8 hojas de armario empotrado con moldura clásica barnizadas en sapelly oscuro de 1982, actualizadas a blanco roto satinado luminoso.',
    beforeImg: 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=800&q=80',
    afterImg: 'https://images.unsplash.com/photo-1558997519-83ea9252def8?auto=format&fit=crop&w=800&q=80',
    details: ['8 puertas en cabina', 'Ajuste de pernios y tiradores latón', 'Blanco roto cálido (#F5F1EA)'],
    days: 9
  },
  {
    id: 'puertas-barrio-pilar',
    title: 'Unificación de 7 puertas de paso con marcos',
    category: 'puertas',
    categoryLabel: 'Puertas de paso',
    neighborhood: 'Barrio del Pilar',
    description: 'Vivienda familiar de 1978. Puertas de paso con barniz anaranjado brillante convertidas en puertas contemporáneas en gris suave satinado con marcos a juego.',
    beforeImg: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80',
    afterImg: 'https://images.unsplash.com/photo-1534349762230-e0cadf78f5da?auto=format&fit=crop&w=800&q=80',
    details: ['7 puertas de paso + 1 vidriera', 'Tapajuntas nuevos lacados', 'Manillas cambiadas'],
    days: 8
  },
  {
    id: 'salon-tetuan-bravo-murillo',
    title: 'Aparador nórdico y mesa de centro en mate sedoso',
    category: 'salon',
    categoryLabel: 'Muebles de salón',
    neighborhood: 'Tetuán',
    description: 'Piso reformado cerca de Bravo Murillo. Conjunto de aparador de teca y mesa de centro lacados en verde salvia grisáceo con encimeras protegidas con tratamiento anti-manchas.',
    beforeImg: 'https://images.unsplash.com/photo-1540518614846-7ede433c4ef2?auto=format&fit=crop&w=800&q=80',
    afterImg: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80',
    details: ['Aparador 2,10m + Mesa', 'Tacto mate sedoso anti-huellas', 'Verde salvia (#A4B3A0)'],
    days: 6
  },
  {
    id: 'aparador-antiguo-chamartin',
    title: 'Restauración de cómoda de nogal con tiradores de bronce',
    category: 'restauracion',
    categoryLabel: 'Restauración antigua',
    neighborhood: 'Chamartín',
    description: 'Cómoda francesa de herencia familiar con barniz cuarteado. Desparasitada, saneada y acabada en satinado sutil marfil respetando los herrajes cincelados originales.',
    beforeImg: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80',
    afterImg: 'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=800&q=80',
    details: ['Tratamiento antitermita', 'Pulido de bronces con cera', 'Acabado ebanista marfil'],
    days: 12
  },
  {
    id: 'armarios-tetuan-valdeacederas',
    title: 'Armario empotrado de 4 metros en dormitorio principal',
    category: 'armarios',
    categoryLabel: 'Armarios empotrados',
    neighborhood: 'Tetuán',
    description: 'Piso en Valdeacederas. Frente corrido con altillos de 2,60m de altura, lacado a pistola en blanco puro satinado con tiradores embutidos.',
    beforeImg: 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=800&q=80',
    afterImg: 'https://images.unsplash.com/photo-1558997519-83ea9252def8?auto=format&fit=crop&w=800&q=80',
    details: ['10 hojas y 4 altillos', 'Sellado de ranuras antiguas', 'Garantía 5 años'],
    days: 10
  },
  {
    id: 'boiserie-chamberi-martinez-campos',
    title: 'Boiserie completa de salón con librería integrada',
    category: 'salon',
    categoryLabel: 'Muebles de salón',
    neighborhood: 'Chamberí',
    description: 'Paseo del General Martínez Campos. Gran boiserie de roble teñido que oscurecía todo el salón, transformada a un blanco roto con fondo piedra de gran elegancia.',
    beforeImg: 'https://images.unsplash.com/photo-1540518614846-7ede433c4ef2?auto=format&fit=crop&w=800&q=80',
    afterImg: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80',
    details: ['Librería 5 metros lineales', 'Iluminación cálida respetada', 'Laca ignífuga para interior'],
    days: 14
  }
];

export const REVIEWS_DATA: ReviewItem[] = [
  {
    id: 'rev-1',
    author: 'Elena R. de la Vega',
    location: 'Tetuán, Madrid',
    neighborhood: 'Tetuán',
    rating: 5,
    date: 'Hace 3 semanas',
    highlightedItem: 'Armarios empotrados y puertas de paso',
    finishType: 'Blanco roto satinado',
    text: 'Lacaron todos los armarios empotrados y puertas de paso de nuestro piso en Tetuán en un blanco roto satinado. El cambio de luz en la casa ha sido brutal, sin parecer una cocina de alto brillo. Se nota que vienen del oficio ebanista de toda la vida.'
  },
  {
    id: 'rev-2',
    author: 'Ignacio M. Santamaría',
    location: 'Chamberí, Madrid',
    neighborhood: 'Chamberí',
    rating: 5,
    date: 'Hace 1 mes',
    highlightedItem: 'Boiserie, aparador y librería de salón',
    finishType: 'Mate sedoso gris piedra',
    text: 'En Chamberí nos actualizaron el salón completo: boiserie, aparador y librería en mate sedoso. Se nota que trabajan como ebanistas, no como pintura rápida a rodillo. Desmontaron todo, nos mantuvieron informados por WhatsApp con fotos del taller y montaron en 1 día.'
  },
  {
    id: 'rev-3',
    author: 'Carmen Gómez-Bravo',
    location: 'Barrio del Pilar, Madrid',
    neighborhood: 'Barrio del Pilar',
    rating: 5,
    date: 'Hace 2 meses',
    highlightedItem: 'Aparador antiguo y 6 puertas de paso',
    finishType: 'Barnices ecológicos satinados',
    text: 'Vivo en Barrio del Pilar y buscaba alguien que respetara mis muebles de calidad. Restauraron un aparador antiguo y varias puertas con barnices ecológicos satinados, y parecen nuevos. No desprendieron nada de olor en casa.'
  },
  {
    id: 'rev-4',
    author: 'Álvaro F. Pardo',
    location: 'Chamartín, Madrid',
    neighborhood: 'Chamartín',
    rating: 5,
    date: 'Hace 2 meses',
    highlightedItem: 'Frentes de vestidor a medida',
    finishType: 'Satinado tacto sedoso',
    text: 'Mandé fotos por WhatsApp un domingo por la tarde y el lunes por la mañana ya tenía una estimación transparente. Cumplieron los plazos al milímetro y el tacto de las puertas de armario es increíblemente fino.'
  }
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 'lacado-armarios-chamberi-caso-real',
    slug: 'lacado-satinado-armarios-empotrados-chamberi',
    title: 'Lacado satinado de armarios empotrados en Chamberí: caso real en calle Alonso Cano',
    category: 'transformacion',
    categoryLabel: 'Transformación real',
    neighborhood: 'Chamberí',
    date: '12 de Febrero, 2026',
    readTime: '4 min de lectura',
    excerpt: 'Cómo transformamos los armarios empotrados de un piso señorial de los años 80 sustituyendo el barniz oscuro por un blanco roto luminoso sin obras en la vivienda.',
    image: 'https://images.unsplash.com/photo-1558997519-83ea9252def8?auto=format&fit=crop&w=800&q=80',
    content: [
      'En los pisos clásicos de Chamberí es muy habitual encontrar armarios empotrados de madera maciza o chapada de extraordinaria calidad constructiva, pero con barnices anaranjados que oscurecen los dormitorios.',
      'En este proyecto de la calle Alonso Cano desmontamos 8 hojas y sus altillos correspondientes, numerando cada bisagra y cerradura.',
      'En nuestro taller de Tetuán eliminamos la vieja película brillante mediante lijado calibrado y aplicamos un fondo sellador acrílico. El acabado final se ejecutó a pistola en cabina con laca satinada en tono #F5F1EA.',
      'El resultado: un incremento notable de luz natural en la vivienda y una superficie de tacto sedoso que resiste el uso diario sin amarillear.'
    ],
    faqs: [
      { q: '¿Cuánto cuesta lacar armarios en Chamberí?', a: 'El precio medio por hoja suele oscilar entre 120€ y 190€ según tamaño, molduras y desmontaje.' },
      { q: '¿Se lacan los interiores?', a: 'Normalmente se tratan los frentes exteriores y cantos, que es lo visible. Los interiores pueden forrarse o lacarse bajo petición.' }
    ]
  },
  {
    id: 'lacado-satinado-vs-chalk-paint',
    slug: 'lacado-satinado-vs-chalk-paint-madrid',
    title: 'Lacado satinado vs chalk paint: cuándo elegir cada uno para tus muebles en Madrid',
    category: 'guia',
    categoryLabel: 'Guía técnica',
    date: '28 de Enero, 2026',
    readTime: '6 min de lectura',
    excerpt: 'Análisis honesto de un taller ebanista: por qué la pintura decorativa a tiza sirve para un jarrón o mesilla rústica, pero fracasa en armarios y puertas de uso diario.',
    image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80',
    content: [
      'La moda de la pintura chalk paint ha despertado el interés por recuperar muebles antiguos, lo cual aplaudimos desde la perspectiva de la economía circular.',
      'Sin embargo, recibimos con frecuencia clientes en Tetuán y Chamberí cuyos armarios pintados a tiza se han manchado con el roce de la ropa o cuyas puertas se han desconchado al poco tiempo.',
      'La chalk paint no tiene adherencia química profunda ni elasticidad mecánica. El lacado profesional de ebanistería a pistola utiliza resinas poliméricas que penetran en el poro y crean una capa continua, sedosa y lavable.',
      'Si buscas un acabado rústico en una mesilla auxiliar, el chalk paint es entretenido. Para armarios, puertas y aparadores que vas a abrir miles de veces al año, el lacado a pistola en taller es la única solución definitiva.'
    ]
  },
  {
    id: 'como-actualizamos-salon-tetuan-sin-obras',
    slug: 'como-actualizamos-salon-tetuan-sin-obras',
    title: 'Cómo actualizamos un salón completo en Tetuán sin obras: aparador y puertas en mate',
    category: 'transformacion',
    categoryLabel: 'Transformación real',
    neighborhood: 'Tetuán',
    date: '15 de Enero, 2026',
    readTime: '5 min de lectura',
    excerpt: 'Crónica del rescate de un mueble aparador y 4 puertas de salón en Bravo Murillo: de madera pasada de moda a una atmósfera contemporánea y serena.',
    image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80',
    content: [
      'En lugar de tirar un mueble de 1990 hecho con maderas que hoy costarían miles de euros, los propietarios decidieron invertir una fracción de su coste en un lacado satinado en nuestro taller de la calle de los Voluntarios Catalanes en Tetuán.',
      'Se aplicó una paleta sobria en blanco roto y detalles en verde botella satinado en tiradores y remates de moldura.',
      'Las puertas del salón se integraron con el mismo grado de brillo (15% gloss mate satinado), logrando que la estancia parezca el doble de amplia.'
    ]
  },
  {
    id: 'sostenibilidad-economia-circular-madrid',
    slug: 'por-que-restaurar-muebles-es-sostenible-tetuan',
    title: 'Por qué restaurar muebles y armarios es la verdadera economía circular en Madrid',
    category: 'sostenibilidad',
    categoryLabel: 'Sostenibilidad',
    date: '5 de Enero, 2026',
    readTime: '4 min de lectura',
    excerpt: 'Evitamos la tala innecesaria y el desecho de toneladas de madera de calidad prolongando la vida de las carpinterías con barnices ecológicos.',
    image: 'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=800&q=80',
    content: [
      'El mobiliario contemporáneo de grandes superficies de muebles en kit suele estar fabricado con aglomerado prensado de baja densidad con colas volátiles y una vida útil estimada de 4 a 7 años.',
      'Por contra, las carpinterías de los pisos de Madrid norte y centro esconden madera de pino de Flandes, roble español o maderas tropicales con décadas de estabilidad que nunca se deformarán.',
      'Al renovar el acabado con lacados y barnices ecológicos al agua en taller artesanal, reducimos la huella de carbono a menos de un 10% respecto a comprar carpinterías nuevas.'
    ]
  }
];
