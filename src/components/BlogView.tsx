import React, { useState } from 'react';
import { BLOG_POSTS } from '../data/content';
import { BlogPost, Neighborhood } from '../types';
import { BookOpen, Calendar, Clock, MapPin, ArrowRight, X, HelpCircle, Send } from 'lucide-react';

interface BlogViewProps {
  onOpenWhatsApp: (customMessage?: string) => void;
}

export const BlogView: React.FC<BlogViewProps> = ({ onOpenWhatsApp }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('todos');
  const [selectedNeighborhood, setSelectedNeighborhood] = useState<string>('todos');
  const [activePost, setActivePost] = useState<BlogPost | null>(null);

  const filteredPosts = BLOG_POSTS.filter((post) => {
    const matchCat = selectedCategory === 'todos' || post.category === selectedCategory;
    const matchNeigh = selectedNeighborhood === 'todos' || (post.neighborhood && post.neighborhood.toLowerCase().includes(selectedNeighborhood.toLowerCase()));
    return matchCat && matchNeigh;
  });

  return (
    <div className="w-full bg-[#F5F1EA] py-8 sm:py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Cabecera Blog */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="text-xs uppercase tracking-wider text-[#2F4F3A] font-bold bg-[#E3D9CC]/50 px-3.5 py-1.5 rounded-full inline-block mb-3">
            Cuaderno de Taller & Casos Reales
          </span>
          <h1 className="font-editorial text-3xl sm:text-4xl font-semibold text-[#343434] mb-4">
            Transformaciones reales de lacado satinado en Madrid norte y centro
          </h1>
          <p className="text-sm sm:text-base text-[#6B6B6B]">
            Crónicas de proyectos en Chamberí, Tetuán y Barrio del Pilar, guías técnicas sobre barnices ecológicos y comparativas honestas frente a la pintura de tiza.
          </p>
        </div>

        {/* Filtros */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8 pb-4 border-b border-[#E3D9CC]">
          {/* Categorías */}
          <div className="flex flex-wrap items-center gap-2">
            {[
              { id: 'todos', label: 'Todos los artículos' },
              { id: 'transformacion', label: 'Transformaciones por Barrio' },
              { id: 'guia', label: 'Guías Técnicas' },
              { id: 'sostenibilidad', label: 'Economía Circular' }
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`text-xs px-3.5 py-2 rounded-lg transition-colors cursor-pointer ${
                  selectedCategory === cat.id
                    ? 'bg-[#2F4F3A] text-white font-semibold'
                    : 'bg-white text-[#343434] hover:bg-[#E3D9CC] border border-[#E3D9CC]'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Barrios */}
          <div className="flex items-center space-x-2 text-xs">
            <span className="text-[#6B6B6B] font-medium">Barrio:</span>
            <select
              value={selectedNeighborhood}
              onChange={(e) => setSelectedNeighborhood(e.target.value)}
              className="p-1.5 rounded-md border border-[#E3D9CC] bg-white text-xs text-[#343434] focus:outline-none"
            >
              <option value="todos">Todos los barrios</option>
              <option value="Chamberí">Chamberí</option>
              <option value="Tetuán">Tetuán</option>
              <option value="Barrio del Pilar">Barrio del Pilar</option>
            </select>
          </div>
        </div>

        {/* Grid de Artículos */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {filteredPosts.map((post) => (
            <article
              key={post.id}
              className="bg-white rounded-2xl overflow-hidden border border-[#E3D9CC] hover:border-[#B08C4F]/60 transition-all shadow-xs flex flex-col justify-between group"
            >
              <div>
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 flex items-center space-x-2">
                    <span className="bg-[#2F4F3A] text-white text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md">
                      {post.categoryLabel}
                    </span>
                    {post.neighborhood && (
                      <span className="bg-white/90 backdrop-blur-xs text-[#343434] text-[11px] font-semibold px-2 py-0.5 rounded-md flex items-center space-x-1">
                        <MapPin className="w-3 h-3 text-[#2F4F3A]" />
                        <span>{post.neighborhood}</span>
                      </span>
                    )}
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-center space-x-3 text-xs text-[#6B6B6B] mb-3">
                    <span className="flex items-center space-x-1">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{post.date}</span>
                    </span>
                    <span>·</span>
                    <span className="flex items-center space-x-1">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{post.readTime}</span>
                    </span>
                  </div>

                  <h2 className="font-editorial text-xl font-semibold text-[#343434] group-hover:text-[#2F4F3A] mb-3 leading-snug">
                    {post.title}
                  </h2>

                  <p className="text-xs sm:text-sm text-[#6B6B6B] leading-relaxed line-clamp-3">
                    {post.excerpt}
                  </p>
                </div>
              </div>

              <div className="p-6 pt-0 border-t border-[#E3D9CC] flex items-center justify-between">
                <button
                  onClick={() => setActivePost(post)}
                  className="text-xs sm:text-sm font-bold text-[#2F4F3A] hover:underline flex items-center space-x-1.5 cursor-pointer"
                >
                  <span>Leer artículo completo</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => onOpenWhatsApp(`Hola, he leído vuestro artículo '${post.title}' y quiero consultar un caso similar para mi piso.`)}
                  className="text-xs text-[#6B6B6B] hover:text-[#2F4F3A]"
                >
                  Preguntar al especialista en lacado
                </button>
              </div>
            </article>
          ))}
        </div>

        {/* Modal de Lectura de Artículo Completo */}
        {activePost && (
          <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-200">
            <div className="bg-white rounded-2xl max-w-2xl w-full p-6 sm:p-8 relative max-h-[90vh] overflow-y-auto shadow-2xl border border-[#B08C4F]/40">
              
              <button
                onClick={() => setActivePost(null)}
                className="absolute top-4 right-4 p-2 text-[#6B6B6B] hover:text-[#343434] bg-[#F5F1EA] rounded-full"
                aria-label="Cerrar artículo"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center space-x-2 text-xs text-[#2F4F3A] font-bold uppercase tracking-wider mb-2">
                <span>{activePost.categoryLabel}</span>
                {activePost.neighborhood && <span>· {activePost.neighborhood}</span>}
              </div>

              <h2 className="font-editorial text-2xl sm:text-3xl font-semibold text-[#343434] mb-4 leading-tight">
                {activePost.title}
              </h2>

              <div className="flex items-center space-x-3 text-xs text-[#6B6B6B] mb-6 pb-4 border-b border-[#E3D9CC]">
                <span>{activePost.date}</span>
                <span>·</span>
                <span>{activePost.readTime}</span>
              </div>

              <div className="rounded-xl overflow-hidden mb-6 h-64">
                <img
                  src={activePost.image}
                  alt={activePost.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="space-y-4 text-sm text-[#343434]/90 leading-relaxed mb-8">
                {activePost.content.map((p, idx) => (
                  <p key={idx}>{p}</p>
                ))}
              </div>

              {activePost.faqs && (
                <div className="bg-[#F5F1EA] p-5 rounded-xl border border-[#E3D9CC] mb-8">
                  <h4 className="font-sans font-bold text-sm text-[#2F4F3A] mb-3 flex items-center space-x-1.5">
                    <HelpCircle className="w-4 h-4" />
                    <span>Preguntas frecuentes sobre este caso</span>
                  </h4>
                  <div className="space-y-3 text-xs">
                    {activePost.faqs.map((faq, i) => (
                      <div key={i}>
                        <strong className="block text-[#343434] mb-0.5">{faq.q}</strong>
                        <span className="text-[#6B6B6B]">{faq.a}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="bg-[#2F4F3A] text-white p-5 rounded-xl flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <h4 className="font-sans font-bold text-sm mb-1">
                    ¿Tienes un proyecto similar en {activePost.neighborhood || 'tu barrio'}?
                  </h4>
                  <p className="text-xs text-white/80">
                    Envíanos fotos por WhatsApp y te orientamos sin compromiso en menos de 24 horas.
                  </p>
                </div>
                <button
                  onClick={() => {
                    setActivePost(null);
                    onOpenWhatsApp(`Hola, he leído vuestro artículo '${activePost.title}' y quiero presupuesto para mi piso.`);
                  }}
                  className="bg-white hover:bg-[#F5F1EA] text-[#2F4F3A] font-bold text-xs py-2.5 px-4 rounded-lg whitespace-nowrap"
                >
                  Enviar fotos por WhatsApp
                </button>
              </div>

            </div>
          </div>
        )}

      </div>
    </div>
  );
};
