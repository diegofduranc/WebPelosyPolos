/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Plus, Trash2, ShieldAlert, Award, Calendar, ShoppingBag, Heart, Check, Sparkles } from 'lucide-react';
import { Pet, Appointment, OrderHistory } from '../types';

interface MyPetsSectionProps {
  pets: Pet[];
  appointments: Appointment[];
  orders: OrderHistory[];
  onAddPet: (pet: Pet) => void;
  onRemovePet: (id: string) => void;
}

export default function MyPetsSection({
  pets,
  appointments,
  orders,
  onAddPet,
  onRemovePet,
}: MyPetsSectionProps) {
  const [showAddForm, setShowAddForm] = useState(false);
  const [name, setName] = useState('');
  const [breed, setBreed] = useState('');
  const [age, setAge] = useState<number | ''>('');
  const [gender, setGender] = useState<'Macho' | 'Hembra'>('Macho');
  const [weight, setWeight] = useState('');
  const [notes, setNotes] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !breed.trim() || age === '') {
      alert('Por favor completa los campos principales (Nombre, Raza, Edad).');
      return;
    }

    const newPet: Pet = {
      id: `PET-${Math.floor(100000 + Math.random() * 900000)}`,
      name: name.trim(),
      breed: breed.trim(),
      age: Number(age),
      gender,
      weight: weight.trim() || 'No especificado',
      notes: notes.trim() || 'Sin notas especiales',
    };

    onAddPet(newPet);
    
    // Reset Form
    setName('');
    setBreed('');
    setAge('');
    setGender('Macho');
    setWeight('');
    setNotes('');
    setShowAddForm(false);
  };

  return (
    <section id="mascotas" className="py-20 px-4 sm:px-6 lg:px-8 bg-black border-t border-slate-900">
      <div className="max-w-6xl w-full mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-[#DFBA6B] uppercase tracking-wider mb-2">
            <Heart className="w-3.5 h-3.5 fill-[#DFBA6B] text-[#DFBA6B]" />
            <span>Club de Socios Premium</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif text-[#FAF9F6] font-medium tracking-tight">
            Mis <span className="italic text-[#DFBA6B] font-normal">Mascotas & Actividad</span>
          </h2>
          <p className="mt-3 text-slate-400 font-light max-w-2xl mx-auto text-sm sm:text-base">
            Registra a tus peludos y gestiona su historial médico-estético, reservas de peluquería activa, y despachos de paletas heladas en un solo panel elegante.
          </p>
        </div>

        {/* Dashboard Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          
          {/* Column 1 & 2: Pets list & Add Form */}
          <div className="lg:col-span-2 space-y-8 text-left">
            <div className="flex items-center justify-between border-b border-slate-900 pb-4">
              <h3 className="font-serif text-xl font-semibold text-white flex items-center gap-2.5">
                <span>Perfiles de Mascotas</span>
                <span className="text-xs font-mono bg-slate-900 text-[#DFBA6B] px-2.5 py-0.5 rounded-full border border-slate-800">
                  {pets.length} {pets.length === 1 ? 'registrada' : 'registradas'}
                </span>
              </h3>
              
              {!showAddForm && (
                <button
                  id="btn-show-add-pet"
                  onClick={() => setShowAddForm(true)}
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#DFBA6B] to-[#C5A059] text-black font-sans font-bold text-xs tracking-wider uppercase flex items-center gap-1.5 hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer shadow-md"
                >
                  <Plus className="w-4 h-4 text-black" />
                  <span>Nuevo Perfil</span>
                </button>
              )}
            </div>

            {/* REGISTER PET FORM */}
            {showAddForm && (
              <form onSubmit={handleSubmit} className="p-6 rounded-2xl bg-[#121214] border border-[#DFBA6B]/20 shadow-xl space-y-4 animate-fade-in">
                <div className="flex items-center justify-between border-b border-slate-900 pb-3 mb-2">
                  <h4 className="font-serif text-md font-medium text-[#DFBA6B]">Registrar Nueva Mascota</h4>
                  <button
                    type="button"
                    onClick={() => setShowAddForm(false)}
                    className="text-xs font-mono text-slate-500 hover:text-white cursor-pointer"
                  >
                    Cancelar
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Name */}
                  <div>
                    <label className="block text-[10px] font-mono text-[#DFBA6B] uppercase tracking-wider mb-1.5">Nombre de la Mascota *</label>
                    <input
                      id="pet-form-name"
                      type="text"
                      placeholder="Ej: Duque"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      className="w-full px-3 py-2.5 rounded-xl bg-black border border-slate-800 text-white text-sm focus:outline-none focus:border-[#DFBA6B] font-sans"
                    />
                  </div>

                  {/* Breed */}
                  <div>
                    <label className="block text-[10px] font-mono text-[#DFBA6B] uppercase tracking-wider mb-1.5">Raza *</label>
                    <input
                      id="pet-form-breed"
                      type="text"
                      placeholder="Ej: Golden Retriever"
                      value={breed}
                      onChange={(e) => setBreed(e.target.value)}
                      required
                      className="w-full px-3 py-2.5 rounded-xl bg-black border border-slate-800 text-white text-sm focus:outline-none focus:border-[#DFBA6B] font-sans"
                    />
                  </div>

                  {/* Age */}
                  <div>
                    <label className="block text-[10px] font-mono text-[#DFBA6B] uppercase tracking-wider mb-1.5">Edad (en años) *</label>
                    <input
                      id="pet-form-age"
                      type="number"
                      min="0"
                      max="30"
                      placeholder="Ej: 3"
                      value={age}
                      onChange={(e) => setAge(e.target.value !== '' ? Number(e.target.value) : '')}
                      required
                      className="w-full px-3 py-2.5 rounded-xl bg-black border border-slate-800 text-white text-sm focus:outline-none focus:border-[#DFBA6B] font-sans"
                    />
                  </div>

                  {/* Weight */}
                  <div>
                    <label className="block text-[10px] font-mono text-[#DFBA6B] uppercase tracking-wider mb-1.5">Peso Estimado (Ej: 25 kg)</label>
                    <input
                      id="pet-form-weight"
                      type="text"
                      placeholder="Ej: 28 kg"
                      value={weight}
                      onChange={(e) => setWeight(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-xl bg-black border border-slate-800 text-white text-sm focus:outline-none focus:border-[#DFBA6B] font-sans"
                    />
                  </div>

                  {/* Gender Selector */}
                  <div>
                    <label className="block text-[10px] font-mono text-[#DFBA6B] uppercase tracking-wider mb-1.5">Género</label>
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => setGender('Macho')}
                        className={`flex-1 py-2 rounded-xl text-xs font-sans tracking-wide font-medium border cursor-pointer ${
                          gender === 'Macho'
                            ? 'bg-[#DFBA6B] text-black border-[#DFBA6B] font-semibold'
                            : 'bg-black text-slate-400 border-slate-800'
                        }`}
                      >
                        Macho
                      </button>
                      <button
                        type="button"
                        onClick={() => setGender('Hembra')}
                        className={`flex-1 py-2 rounded-xl text-xs font-sans tracking-wide font-medium border cursor-pointer ${
                          gender === 'Hembra'
                            ? 'bg-[#DFBA6B] text-black border-[#DFBA6B] font-semibold'
                            : 'bg-black text-slate-400 border-slate-800'
                        }`}
                      >
                        Hembra
                      </button>
                    </div>
                  </div>
                </div>

                {/* Notes */}
                <div>
                  <label className="block text-[10px] font-mono text-[#DFBA6B] uppercase tracking-wider mb-1.5">Notas de Cuidado Especial / Alergias / Medicinas</label>
                  <textarea
                    id="pet-form-notes"
                    placeholder="Escribe si tu mascota tiene piel atópica, le asusta el soplador de pelo, o prefiere sabores frutales específicos..."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    rows={2}
                    className="w-full px-3 py-2.5 rounded-xl bg-black border border-slate-800 text-white text-sm focus:outline-none focus:border-[#DFBA6B] font-sans resize-none"
                  />
                </div>

                {/* Submit button */}
                <button
                  id="btn-add-pet-submit"
                  type="submit"
                  className="w-full py-3 rounded-xl bg-[#DFBA6B] hover:bg-[#C5A059] text-black font-sans font-bold text-xs tracking-wider uppercase shadow transition-all duration-200 cursor-pointer"
                >
                  Registrar Mascota
                </button>
              </form>
            )}

            {/* PET CARDS GRID */}
            {pets.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {pets.map((pet) => (
                  <div
                    key={pet.id}
                    className="p-5 rounded-2xl bg-[#121214] border border-slate-850 hover:border-slate-800 transition-all duration-300 relative group shadow-lg"
                  >
                    {/* Delete icon */}
                    <button
                      id={`remove-pet-${pet.id}`}
                      onClick={() => onRemovePet(pet.id)}
                      className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-600 hover:text-red-400 hover:bg-black/60 transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100 cursor-pointer"
                      title="Eliminar perfil"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>

                    <div className="flex items-start gap-4 mb-4">
                      {/* Pet Visual representation */}
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#DFBA6B]/20 to-slate-800 border border-[#DFBA6B]/30 flex items-center justify-center font-serif text-lg font-bold text-[#DFBA6B] shrink-0">
                        {pet.name.substring(0, 2).toUpperCase()}
                      </div>

                      <div>
                        <h4 className="font-serif text-lg font-medium text-white flex items-center gap-2">
                          <span>{pet.name}</span>
                          <span className={`text-[9px] px-2 py-0.5 rounded-full font-mono ${pet.gender === 'Macho' ? 'bg-blue-950/40 text-blue-400' : 'bg-pink-950/40 text-pink-400'}`}>
                            {pet.gender}
                          </span>
                        </h4>
                        <p className="text-xs text-slate-400 font-light mt-0.5">{pet.breed} • {pet.age} {pet.age === 1 ? 'año' : 'años'}</p>
                      </div>
                    </div>

                    <div className="bg-black/60 p-3 rounded-xl border border-slate-900 space-y-1.5 text-xs text-left">
                      <div className="flex justify-between">
                        <span className="text-slate-500 text-[10px] font-mono uppercase">Peso:</span>
                        <span className="text-white font-medium">{pet.weight}</span>
                      </div>
                      <div>
                        <span className="text-slate-500 text-[10px] font-mono uppercase block mb-0.5">Notas de cuidado:</span>
                        <p className="text-slate-300 font-light leading-relaxed text-xs">
                          {pet.notes}
                        </p>
                      </div>
                    </div>

                    {/* Fun badge */}
                    <div className="mt-4 flex items-center gap-1 text-[#DFBA6B] text-[10px] font-mono uppercase tracking-wider">
                      <Award className="w-3.5 h-3.5" />
                      <span>Socio Honorario pelos & polos</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-12 text-center rounded-2xl border border-dashed border-slate-800 bg-[#121214]/40 text-slate-500">
                <Sparkles className="w-8 h-8 mx-auto text-slate-600 mb-3" />
                <p className="text-sm font-sans font-light leading-relaxed max-w-sm mx-auto">
                  No tienes mascotas registradas aún. Agrega un perfil para poder personalizar el spa estético y los despachos de paletas de helado.
                </p>
              </div>
            )}
          </div>

          {/* Column 3: Appointment History & Orders */}
          <div className="space-y-8 text-left">
            
            {/* Appointments Block */}
            <div className="p-6 rounded-2xl bg-[#121214] border border-slate-850 shadow-xl">
              <h3 className="font-serif text-lg font-medium text-white flex items-center gap-2 mb-4 border-b border-slate-900 pb-3">
                <Calendar className="w-5 h-5 text-[#DFBA6B]" />
                <span>Peluquerías Agendadas</span>
              </h3>

              {appointments.length > 0 ? (
                <div className="space-y-4 max-h-[350px] overflow-y-auto pr-1">
                  {appointments.map((apt) => (
                    <div
                      key={apt.id}
                      className="p-3.5 rounded-xl bg-black border border-slate-900 text-xs relative overflow-hidden"
                    >
                      <div className="absolute top-0 right-0 px-2 py-0.5 rounded-bl bg-green-950/60 text-green-400 font-mono text-[9px] uppercase tracking-wider border-l border-b border-slate-900">
                        {apt.status}
                      </div>

                      <p className="font-serif text-sm font-semibold text-white mb-1">{apt.petName}</p>
                      
                      <div className="space-y-1 text-slate-400 font-light">
                        <p><span className="text-slate-600 font-medium font-mono uppercase text-[9px]">Groomer:</span> {apt.groomerName}</p>
                        <p><span className="text-slate-600 font-medium font-mono uppercase text-[9px]">Fecha/Hora:</span> {apt.date} • {apt.time}</p>
                        <p className="text-[#DFBA6B] font-mono text-[10px] font-semibold mt-1.5">${apt.cost.toLocaleString('es-CO')} COP</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="py-8 text-center text-slate-500 text-xs font-light">
                  No tienes citas programadas actualmente.
                </div>
              )}
            </div>

            {/* Orders Block */}
            <div className="p-6 rounded-2xl bg-[#121214] border border-slate-850 shadow-xl">
              <h3 className="font-serif text-lg font-medium text-white flex items-center gap-2 mb-4 border-b border-slate-900 pb-3">
                <ShoppingBag className="w-5 h-5 text-[#DFBA6B]" />
                <span>Historial de Paletas</span>
              </h3>

              {orders.length > 0 ? (
                <div className="space-y-4 max-h-[350px] overflow-y-auto pr-1">
                  {orders.map((order) => (
                    <div
                      key={order.id}
                      className="p-3.5 rounded-xl bg-black border border-slate-900 text-xs text-left"
                    >
                      <div className="flex justify-between items-center mb-2 border-b border-slate-900 pb-1.5">
                        <span className="font-mono text-[10px] text-slate-500">{order.id}</span>
                        <span className="px-2 py-0.5 rounded bg-amber-950/40 text-amber-400 font-mono text-[9px] uppercase tracking-widest">
                          {order.status}
                        </span>
                      </div>

                      <div className="space-y-1 mb-2">
                        {order.items.map((item, idx) => (
                          <div key={idx} className="flex justify-between text-slate-400 font-light text-xs">
                            <span>{item.name} <span className="text-slate-600 font-mono font-medium">x{item.quantity}</span></span>
                            <span className="font-mono">${(item.price * item.quantity).toLocaleString('es-CO')}</span>
                          </div>
                        ))}
                      </div>

                      <div className="flex justify-between font-mono text-[10px] border-t border-slate-900 pt-1.5">
                        <span className="text-slate-500 uppercase">Total Despachado:</span>
                        <span className="text-[#DFBA6B] font-bold">${order.total.toLocaleString('es-CO')} COP</span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="py-8 text-center text-slate-500 text-xs font-light">
                  No has realizado pedidos de heladería todavía.
                </div>
              )}
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
