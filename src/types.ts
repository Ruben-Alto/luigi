export type ActiveTab = 'inicio' | 'servicios' | 'proyectos' | 'blog' | 'contacto';

export type ServiceId = 
  | 'lacado-armarios-empotrados-madrid'
  | 'lacado-puertas-paso-madrid'
  | 'lacado-muebles-salon-madrid'
  | 'restauracion-muebles-antiguos-madrid';

export type Neighborhood = 'Chamberí' | 'Tetuán' | 'Barrio del Pilar' | 'Chamartín' | 'Madrid Centro / Norte';

export interface ProjectItem {
  id: string;
  title: string;
  category: 'armarios' | 'puertas' | 'salon' | 'restauracion';
  categoryLabel: string;
  neighborhood: Neighborhood;
  description: string;
  beforeImg: string;
  afterImg: string;
  details: string[];
  days: number;
}

export interface ReviewItem {
  id: string;
  author: string;
  location: string;
  neighborhood: Neighborhood;
  rating: number;
  date: string;
  text: string;
  highlightedItem: string;
  finishType: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  category: 'transformacion' | 'guia' | 'sostenibilidad';
  categoryLabel: string;
  neighborhood?: Neighborhood;
  date: string;
  readTime: string;
  excerpt: string;
  image: string;
  content: string[];
  faqs?: { q: string; a: string }[];
}

export interface ServiceDetail {
  id: ServiceId;
  title: string;
  subtitle: string;
  shortDesc: string;
  h1: string;
  heroText: string;
  iconName: string;
  features: string[];
  processSteps: { title: string; desc: string }[];
  palette: { name: string; hex: string; desc: string }[];
  faqs: { question: string; answer: string }[];
  sampleImageBefore: string;
  sampleImageAfter: string;
}
