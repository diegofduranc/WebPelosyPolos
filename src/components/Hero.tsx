/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Sparkles, Calendar, IceCream, MapPin, ShieldCheck } from 'lucide-react';
import Logo from './Logo';

interface HeroProps {
  onBookClick: () => void;
  onCatalogClick: () => void;
}

export default function Hero({ onBookClick, onCatalogClick }: HeroProps) {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden py-16 px-4 sm:px-6 lg:px-8">
      {/* Background Hero Image with luxurious dark mask */}
      <div className="absolute inset-0 z-0">
        <img 
          src="/src/assets/images/luxury_grooming_spa_1783364699155.jpg" 
          alt="Luxury Grooming Spa" 
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover opacity-15 filter brightness-[0.25] contrast-[1.1]"
        />
        {/* Dark radial/linear glow to center attention on the typography */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/90 to-transparent" />
      </div>

      {/* Background Decorative Lighting */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-br from-[#DFBA6B]/10 to-transparent rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-gradient-to-tl from-slate-800/20 to-transparent rounded-full blur-3xl pointer-events-none" />
      
      {/* Subtle Grid overlay for luxury texture */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />

      <div className="max-w-6xl w-full mx-auto relative z-10 flex flex-col items-center text-center">
        {/* Top Floating Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-slate-800 bg-[#161618] text-xs font-mono text-[#DFBA6B] tracking-wider uppercase mb-8 shadow-inner animate-fade-in">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Experiencia Premium 5 Estrellas</span>
        </div>

        {/* Brand Center Emblem */}
        <Logo size="xl" showText={false} className="mb-6 transform hover:scale-105 transition-transform duration-500 cursor-pointer" />

        {/* Title */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-serif font-medium tracking-tight text-[#FAF9F6] max-w-4xl leading-[1.15] mb-6">
          Consentir a tu mejor amigo es un arte <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#DFBA6B] via-[#FAF9F6] to-[#C5A059] italic font-normal py-2">y un delicioso placer.</span>
        </h1>

        {/* Slogan Subtitle */}
        <p className="text-sm sm:text-lg font-sans tracking-[0.2em] font-medium text-[#DFBA6B] uppercase mb-4">
          PELUQUERÍA A DOMICILIO <span className="text-slate-600 font-light mx-2">|</span> HELADERÍA PARA MASCOTAS
        </p>

        {/* Description */}
        <p className="text-base sm:text-lg text-slate-400 max-w-2xl font-light leading-relaxed mb-10">
          Diseñamos cortes de pelo de alta costura canina y spa relajante en la puerta de tu hogar, 
          acompañados por nuestras icónicas paletas de helado artesanales, 100% naturales, saludables y seguras para su bienestar.
        </p>

        {/* CTA Button Group */}
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto justify-center mb-12">
          {/* Action 1: Grooming Booking */}
          <button
            id="cta-book"
            onClick={onBookClick}
            className="group relative w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-[#DFBA6B] to-[#C5A059] text-black font-sans font-medium text-sm tracking-wider uppercase shadow-[0_4px_20px_rgba(212,175,55,0.25)] hover:shadow-[0_4px_30px_rgba(212,175,55,0.45)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 overflow-hidden cursor-pointer"
          >
            <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="flex items-center justify-center gap-2">
              <Calendar className="w-4 h-4" />
              <span>Agendar Peluquería & Spa</span>
            </div>
          </button>

          {/* Action 2: Ice Cream Catalog */}
          <button
            id="cta-catalog"
            onClick={onCatalogClick}
            className="w-full sm:w-auto px-8 py-4 rounded-xl border border-slate-700 bg-black/40 hover:bg-black/80 hover:border-[#DFBA6B] text-white font-sans font-medium text-sm tracking-wider uppercase transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
          >
            <div className="flex items-center justify-center gap-2">
              <IceCream className="w-4 h-4 text-[#DFBA6B]" />
              <span>Ver Catálogo de Paletas</span>
            </div>
          </button>
        </div>

        {/* Value Props Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl pt-8 border-t border-slate-900 text-left">
          <div className="flex items-start gap-3 p-4 rounded-xl hover:bg-slate-900/30 transition-colors duration-300">
            <div className="p-2.5 rounded-lg bg-slate-900 text-[#DFBA6B] shrink-0 border border-slate-800">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-sans font-medium text-sm text-[#FAF9F6] mb-1">A Domicilio en Van Móvil</h3>
              <p className="text-xs text-slate-400 font-light leading-relaxed">
                Nuestras vans spa totalmente equipadas atienden en Bogotá y Medellín. Sin estrés de traslados.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-4 rounded-xl hover:bg-slate-900/30 transition-colors duration-300">
            <div className="p-2.5 rounded-lg bg-slate-900 text-[#DFBA6B] shrink-0 border border-slate-800">
              <IceCream className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-sans font-medium text-sm text-[#FAF9F6] mb-1">Helados 100% Seguros</h3>
              <p className="text-xs text-slate-400 font-light leading-relaxed">
                Sin lactosa, sin azúcar añadida, con frutas frescas, prebióticos y un palito comestible de galleta de avena.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-4 rounded-xl hover:bg-slate-900/30 transition-colors duration-300">
            <div className="p-2.5 rounded-lg bg-slate-900 text-[#DFBA6B] shrink-0 border border-slate-800">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-sans font-medium text-sm text-[#FAF9F6] mb-1">Groomers Expertos</h3>
              <p className="text-xs text-slate-400 font-light leading-relaxed">
                Estilistas certificados con manejo respetuoso, amoroso y libre de miedo (Fear Free methodology).
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
