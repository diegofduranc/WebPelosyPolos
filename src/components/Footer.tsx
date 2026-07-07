/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Mail, Phone, MapPin, Instagram, Facebook, Clock, ShieldCheck } from 'lucide-react';
import Logo from './Logo';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-black border-t border-slate-900 py-16 px-4 sm:px-6 lg:px-8 text-left text-xs font-sans">
      <div className="max-w-6xl w-full mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
        
        {/* Logo and short bio */}
        <div className="md:col-span-1 space-y-4">
          <Logo showText={true} size="md" />
          <p className="text-slate-500 font-light leading-relaxed pr-2">
            La experiencia estética móvil y de heladería premium diseñada con el más alto respeto, confort y amor por tu mascota.
          </p>
          {/* Social icons */}
          <div className="flex items-center gap-3 pt-2">
            <a href="#instagram" className="p-2 rounded-lg bg-slate-950 text-slate-400 hover:text-[#DFBA6B] border border-slate-900 transition-colors cursor-pointer" aria-label="Instagram">
              <Instagram className="w-4 h-4" />
            </a>
            <a href="#facebook" className="p-2 rounded-lg bg-slate-950 text-slate-400 hover:text-[#DFBA6B] border border-slate-900 transition-colors cursor-pointer" aria-label="Facebook">
              <Facebook className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Coverage areas */}
        <div className="space-y-4">
          <h4 className="font-mono text-xs text-[#DFBA6B] uppercase tracking-wider font-semibold">Zonas de Cobertura</h4>
          <div className="space-y-3">
            <div>
              <p className="font-semibold text-white mb-1 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#DFBA6B]" />
                <span>Bogotá Norte & Centro</span>
              </p>
              <p className="text-slate-500 font-light leading-relaxed">
                Usaquén, Chapinero, Chicó, Cabrera, Cedritos, Colina Campestre, Teusaquillo y Salitre.
              </p>
            </div>
            <div>
              <p className="font-semibold text-white mb-1 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#DFBA6B]" />
                <span>Medellín & Valles</span>
              </p>
              <p className="text-slate-500 font-light leading-relaxed">
                El Poblado, Envigado, Laureles, Sabaneta, Conquistadores y Belén.
              </p>
            </div>
          </div>
        </div>

        {/* Contact info */}
        <div className="space-y-4">
          <h4 className="font-mono text-xs text-[#DFBA6B] uppercase tracking-wider font-semibold">Concierge & Contacto</h4>
          <ul className="space-y-3 text-slate-400 font-light">
            <li className="flex items-center gap-2.5">
              <Phone className="w-4 h-4 text-[#DFBA6B] shrink-0" />
              <a href="tel:+573124567890" className="hover:text-white transition-colors">+57 312 456 7890</a>
            </li>
            <li className="flex items-center gap-2.5">
              <Mail className="w-4 h-4 text-[#DFBA6B] shrink-0" />
              <a href="mailto:concierge@pelosypolos.com.co" className="hover:text-white transition-colors">concierge@pelosypolos.com.co</a>
            </li>
            <li className="flex items-start gap-2.5">
              <Clock className="w-4 h-4 text-[#DFBA6B] shrink-0 mt-0.5" />
              <div>
                <p className="text-white font-medium text-xs">Horario de Atención</p>
                <p className="text-slate-500 text-[11px] mt-0.5">Lunes a Sábado: 7:00 AM – 7:00 PM</p>
                <p className="text-slate-500 text-[11px]">Domingos & Festivos: 8:00 AM – 5:00 PM</p>
              </div>
            </li>
          </ul>
        </div>

        {/* Brand values / commitment */}
        <div className="space-y-4">
          <h4 className="font-mono text-xs text-[#DFBA6B] uppercase tracking-wider font-semibold">Compromiso pelos & polos</h4>
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-900 space-y-2">
            <div className="flex items-center gap-2 text-white font-semibold">
              <ShieldCheck className="w-4 h-4 text-[#DFBA6B]" />
              <span>Garantía de Cuidado</span>
            </div>
            <p className="text-slate-500 font-light leading-relaxed">
              Trabajamos con amor, libre de jaulas y con control de estrés. Nuestras paletas son formuladas bajo estricta recomendación de veterinarios nutricionistas.
            </p>
          </div>
        </div>

      </div>

      <div className="max-w-6xl w-full mx-auto mt-12 pt-6 border-t border-slate-950 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-600">
        <p>© {year} pelos & polos S.A.S. Todos los derechos reservados.</p>
        <div className="flex gap-4">
          <a href="#terms" className="hover:text-slate-400 transition-colors">Términos de Servicio</a>
          <a href="#privacy" className="hover:text-slate-400 transition-colors">Política de Privacidad</a>
        </div>
      </div>
    </footer>
  );
}
