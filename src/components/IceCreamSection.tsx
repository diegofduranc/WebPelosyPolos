/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Search, ShoppingBag, Flame, Sparkles, Plus, Check } from 'lucide-react';
import { IceCream, CartItem } from '../types';

interface IceCreamSectionProps {
  iceCreams: IceCream[];
  cart: CartItem[];
  onAddToCart: (item: IceCream) => void;
  onOpenCart: () => void;
}

export default function IceCreamSection({
  iceCreams,
  cart,
  onAddToCart,
  onOpenCart,
}: IceCreamSectionProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<'todos' | 'frutales' | 'salados' | 'populares'>('todos');
  const [addedItemMessage, setAddedItemMessage] = useState<string | null>(null);

  // Filter logic
  const filteredIceCreams = iceCreams.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          item.flavor.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (selectedFilter === 'todos') return matchesSearch;
    if (selectedFilter === 'populares') return matchesSearch && item.popular;
    
    // Frutales category
    const isFrutal = ['Coco-Mango Tropical', 'Fresa & Banano Digestivo', 'Manzana, Miel & Canela', 'Yogurt, Arándanos & Miel'].includes(item.name);
    if (selectedFilter === 'frutales') return matchesSearch && isFrutal;
    
    // Salados (Caldos Gourmet) category
    if (selectedFilter === 'salados') return matchesSearch && !isFrutal;

    return matchesSearch;
  });

  const handleAddToCartWithAnimation = (item: IceCream) => {
    onAddToCart(item);
    setAddedItemMessage(item.name);
    setTimeout(() => {
      setAddedItemMessage(null);
    }, 2000);
  };

  // Calculate cart quantities
  const totalCartQuantity = cart.reduce((total, item) => total + item.quantity, 0);
  const totalCartPrice = cart.reduce((total, item) => total + (item.iceCream.price * item.quantity), 0);

  return (
    <section id="paletas" className="py-20 px-4 sm:px-6 lg:px-8 bg-[#09090b] border-t border-slate-900 relative">
      {/* Background soft lighting */}
      <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-[#DFBA6B]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl w-full mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-[#DFBA6B] uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Heladería Gourmet 100% Pet-Safe</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif text-[#FAF9F6] font-medium tracking-tight">
            Catálogo de <span className="italic text-[#DFBA6B] font-normal">Paletas de Helado</span>
          </h2>
          <p className="mt-3 text-slate-400 font-light max-w-2xl mx-auto text-sm sm:text-base">
            Hechas artesanalmente con ingredientes premium aptos para consumo canino. Sin azúcar, sin lactosa, ricas en vitaminas, hidratantes y con palito comestible de galleta de avena.
          </p>
        </div>

        {/* Floating Cart Status Button */}
        {totalCartQuantity > 0 && (
          <button
            onClick={onOpenCart}
            className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 px-5 py-3.5 rounded-full bg-[#DFBA6B] hover:bg-[#C5A059] text-black font-sans font-bold text-xs tracking-wider uppercase shadow-[0_10px_30px_rgba(212,175,55,0.4)] transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
          >
            <ShoppingBag className="w-4 h-4 text-black animate-bounce" />
            <span>Ver Carrito ({totalCartQuantity})</span>
            <span className="bg-black/10 px-2 py-0.5 rounded font-mono">${totalCartPrice.toLocaleString('es-CO')} COP</span>
          </button>
        )}

        {/* Temporary added notification */}
        {addedItemMessage && (
          <div className="fixed bottom-22 right-6 z-50 flex items-center gap-2 px-4 py-2.5 rounded-xl bg-green-900/90 border border-green-500/30 text-white font-sans text-xs shadow-lg animate-fade-in">
            <Check className="w-4 h-4 text-green-400 shrink-0" />
            <span>¡{addedItemMessage} añadida al carrito!</span>
          </div>
        )}

        {/* Filter and Search Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10 p-4 rounded-2xl bg-[#121214] border border-slate-800">
          
          {/* Search Input */}
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3 top-3.5 w-4 h-4 text-slate-500" />
            <input
              id="search-popsicles"
              type="text"
              placeholder="Buscar sabor o ingrediente..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-black border border-slate-800 text-white text-sm focus:outline-none focus:border-[#DFBA6B] font-sans"
            />
          </div>

          {/* Category Filter buttons */}
          <div className="flex flex-wrap items-center gap-1.5 w-full md:w-auto">
            <button
              onClick={() => setSelectedFilter('todos')}
              className={`px-4 py-2 rounded-lg text-xs font-sans tracking-wide font-medium transition-all duration-200 cursor-pointer ${
                selectedFilter === 'todos'
                  ? 'bg-[#DFBA6B] text-black shadow'
                  : 'bg-black text-slate-400 hover:text-white border border-slate-800/60'
              }`}
            >
              Todos
            </button>
            <button
              onClick={() => setSelectedFilter('populares')}
              className={`px-4 py-2 rounded-lg text-xs font-sans tracking-wide font-medium transition-all duration-200 cursor-pointer flex items-center gap-1.5 ${
                selectedFilter === 'populares'
                  ? 'bg-[#DFBA6B] text-black shadow'
                  : 'bg-black text-slate-400 hover:text-white border border-slate-800/60'
              }`}
            >
              <Flame className="w-3.5 h-3.5" />
              <span>Más Populares</span>
            </button>
            <button
              onClick={() => setSelectedFilter('frutales')}
              className={`px-4 py-2 rounded-lg text-xs font-sans tracking-wide font-medium transition-all duration-200 cursor-pointer ${
                selectedFilter === 'frutales'
                  ? 'bg-[#DFBA6B] text-black shadow'
                  : 'bg-black text-slate-400 hover:text-white border border-slate-800/60'
              }`}
            >
              Frutales & Cremosos
            </button>
            <button
              onClick={() => setSelectedFilter('salados')}
              className={`px-4 py-2 rounded-lg text-xs font-sans tracking-wide font-medium transition-all duration-200 cursor-pointer ${
                selectedFilter === 'salados'
                  ? 'bg-[#DFBA6B] text-black shadow'
                  : 'bg-black text-slate-400 hover:text-white border border-slate-800/60'
              }`}
            >
              Caldos Gourmet
            </button>
          </div>
        </div>

        {/* Ice Cream Grid */}
        {filteredIceCreams.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 text-left">
            {filteredIceCreams.map((item) => (
              <div
                key={item.id}
                className="group relative flex flex-col justify-between p-6 rounded-2xl bg-[#121214] border border-slate-800 hover:border-[#DFBA6B]/50 transition-all duration-300 shadow-xl hover:scale-[1.01]"
              >
                {/* Popularity Badge */}
                {item.popular && (
                  <div className="absolute top-4 right-4 inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#DFBA6B]/10 border border-[#DFBA6B]/30 text-[10px] font-mono text-[#DFBA6B] tracking-wider uppercase font-semibold">
                    <Flame className="w-3 h-3 fill-[#DFBA6B]" />
                    <span>Popular</span>
                  </div>
                )}

                <div>
                  {/* Visually stunning popsicle image or illustrative placeholder */}
                  <div className="w-full h-44 rounded-xl relative mb-6 overflow-hidden border border-white/5 bg-[#121214] flex items-center justify-center">
                    {item.imageUrl ? (
                      <img 
                        src={item.imageUrl} 
                        alt={item.name}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className={`w-full h-full ${item.color} bg-gradient-to-br flex flex-col items-center justify-center w-full`}>
                        {/* Background visual curves */}
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.1),transparent)]" />
                        
                        {/* Emoji Illustration */}
                        <span className="text-6xl select-none filter drop-shadow-md transform group-hover:scale-110 group-hover:rotate-6 transition-transform duration-350">
                          {item.imageEmoji}
                        </span>
                      </div>
                    )}
                    
                    {/* Organic Ingredients Tag Overlay */}
                    <span className="absolute bottom-3 right-3 px-3 py-1 bg-black/75 backdrop-blur-md rounded-full text-[10px] font-mono text-white tracking-wider border border-white/10 uppercase">
                      100% Orgánico
                    </span>

                    {/* Súper Ahorro Tag for Packages */}
                    {item.id.startsWith('PACK-') && (
                      <span className="absolute top-3 left-3 px-3 py-1 bg-[#DFBA6B] rounded-lg text-[9px] font-mono text-black font-bold uppercase tracking-wider shadow-md">
                        Súper Ahorro
                      </span>
                    )}
                  </div>

                  {/* Flavor Info */}
                  <h3 className="font-serif text-xl font-medium text-white group-hover:text-[#DFBA6B] transition-colors duration-200">
                    {item.name}
                  </h3>
                  <p className="text-xs text-[#DFBA6B] font-mono tracking-wider font-semibold uppercase mt-0.5 mb-2">
                    {item.flavor}
                  </p>
                  
                  <p className="text-xs text-slate-400 font-light leading-relaxed mb-4">
                    {item.description}
                  </p>

                  {/* Ingredients bullets */}
                  <div className="mb-6 space-y-1">
                    <p className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">Ingredientes Clave:</p>
                    <div className="flex flex-wrap gap-1.5">
                      {item.ingredients.map((ing, idx) => (
                        <span key={idx} className="text-[10px] px-2 py-0.5 rounded bg-black/40 text-slate-400 font-light border border-slate-900">
                          {ing}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Footer block (Price & Buy Button) */}
                <div className="flex items-center justify-between pt-4 border-t border-slate-900">
                  <div className="flex flex-col">
                    <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider">Precio Unitario</span>
                    <span className="text-lg font-mono font-bold text-[#DFBA6B]">${item.price.toLocaleString('es-CO')} COP</span>
                  </div>

                  <button
                    id={`add-to-cart-${item.id}`}
                    onClick={() => handleAddToCartWithAnimation(item)}
                    className="px-4 py-2.5 rounded-xl bg-white hover:bg-[#DFBA6B] text-black font-sans font-bold text-xs tracking-wider uppercase transition-all duration-200 flex items-center gap-1.5 cursor-pointer shadow-md"
                  >
                    <Plus className="w-3.5 h-3.5 text-black shrink-0" />
                    <span>Añadir</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-12 text-center rounded-2xl border border-slate-800 bg-[#121214]">
            <p className="text-slate-500 font-light text-sm">No encontramos paletas que coincidan con tu búsqueda. ¡Prueba otro término!</p>
          </div>
        )}
      </div>
    </section>
  );
}
