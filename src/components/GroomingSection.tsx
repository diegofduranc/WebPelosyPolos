/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Star, MapPin, Calendar as CalendarIcon, Clock, Check, ArrowRight, ArrowLeft, Plus, Scissors, UserCheck } from 'lucide-react';
import { Groomer, Sede, Pet, Appointment } from '../types';

interface GroomingSectionProps {
  groomers: Groomer[];
  registeredPets: Pet[];
  onAddAppointment: (appointment: Appointment) => void;
  onNavigateToPets: () => void;
}

export default function GroomingSection({
  groomers,
  registeredPets,
  onAddAppointment,
  onNavigateToPets,
}: GroomingSectionProps) {
  const [selectedSede, setSelectedSede] = useState<Sede>('Sede Norte, Bogotá');
  const [selectedGroomer, setSelectedGroomer] = useState<Groomer | null>(null);
  
  // Services details (User pricing specifications)
  const SERVICES = {
    básico: {
      name: 'Servicio Básico',
      price: 105000,
      detail: 'desde $105.000 COP',
      description: 'Baño cosmético con champú de avena, secado suave, cepillado, limpieza de oídos, corte de uñas y perfume canino premium. (Varía según raza y tamaño)',
    },
    medicado: {
      name: 'Servicio Medicado',
      price: 130000,
      detail: 'desde $130.000 COP',
      description: 'Recomendado para pieles sensibles. Baño terapéutico antiprurito con champú dermatológico especial y masajes calmantes.',
    },
    premium: {
      name: 'Servicio Premium',
      price: 150000,
      detail: 'desde $150.000 COP',
      description: 'Estética completa de alta costura, corte de pelo según estándar de raza o preferencia, hidromasaje relajante, deslanado profundo y pulido de uñas. (Varía según raza y tamaño)',
    }
  };

  const [selectedServiceType, setSelectedServiceType] = useState<'básico' | 'medicado' | 'premium'>('premium');

  // Scheduling Wizard State
  const [step, setStep] = useState<number>(1); // 1: Groomer & Sede, 2: Pet, Date & Time, 3: Summary
  const [bookingDate, setBookingDate] = useState<string>('');
  const [bookingTime, setBookingTime] = useState<string>('');
  const [selectedPetId, setSelectedPetId] = useState<string>('');
  const [manualPetName, setManualPetName] = useState<string>('');
  const [bookingNotes, setBookingNotes] = useState<string>('');
  const [isConfirmed, setIsConfirmed] = useState<boolean>(false);

  // Filter available times
  const timeSlots = [
    '08:00 AM', '09:30 AM', '11:00 AM', '01:00 PM', '02:30 PM', '04:00 PM', '05:30 PM'
  ];

  const handleSelectGroomer = (groomer: Groomer) => {
    setSelectedGroomer(groomer);
    setStep(2);
    // Autofill pet selection if they have pets registered
    if (registeredPets.length > 0 && !selectedPetId) {
      setSelectedPetId(registeredPets[0].id);
    }
  };

  const handleBackToGroomers = () => {
    setStep(1);
  };

  const handleGoToSummary = () => {
    if (!bookingDate || !bookingTime) {
      alert('Por favor selecciona una fecha y hora.');
      return;
    }
    if (registeredPets.length === 0 && !manualPetName.trim()) {
      alert('Por favor escribe el nombre de tu mascota.');
      return;
    }
    setStep(3);
  };

  const handleConfirmBooking = () => {
    if (!selectedGroomer) return;

    const petName = selectedPetId
      ? registeredPets.find(p => p.id === selectedPetId)?.name || 'Mascota'
      : manualPetName;

    const chosenService = SERVICES[selectedServiceType];

    const newAppointment: Appointment = {
      id: `APT-${Math.floor(100000 + Math.random() * 900000)}`,
      petId: selectedPetId || 'manual',
      petName: petName,
      groomerId: selectedGroomer.id,
      groomerName: selectedGroomer.name,
      sede: selectedSede,
      date: bookingDate,
      time: bookingTime,
      notes: `[${chosenService.name}] ${bookingNotes}`.trim(),
      status: 'Confirmada',
      cost: chosenService.price,
    };

    onAddAppointment(newAppointment);
    setIsConfirmed(true);
  };

  const resetBookingForm = () => {
    setSelectedGroomer(null);
    setStep(1);
    setBookingDate('');
    setBookingTime('');
    setManualPetName('');
    setBookingNotes('');
    setSelectedServiceType('premium');
    setIsConfirmed(false);
  };

  return (
    <section id="grooming" className="py-20 px-4 sm:px-6 lg:px-8 border-t border-slate-900 bg-black">
      <div className="max-w-6xl w-full mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-[#DFBA6B] uppercase tracking-wider mb-2">
            <Scissors className="w-3.5 h-3.5" />
            <span>Peluquería Móvil Premium</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif text-[#FAF9F6] font-medium tracking-tight">
            Peluquería & Spa <span className="italic text-[#DFBA6B] font-normal">a Domicilio</span>
          </h2>
          <p className="mt-3 text-slate-400 font-light max-w-2xl mx-auto text-sm sm:text-base">
            Equipamiento de punta y estilistas expertos. Selecciona tu sede favorita, elige tu estilista (Groomer) de confianza y agenda la sesión perfecta para tu mascota.
          </p>
        </div>

        {/* Step Wizard Progress Bar (Only visible during active booking process) */}
        {selectedGroomer && !isConfirmed && (
          <div className="max-w-xl mx-auto mb-10">
            <div className="flex items-center justify-between font-mono text-xs text-gray-500 uppercase tracking-widest mb-2">
              <span className={step >= 1 ? 'text-[#DFBA6B]' : ''}>1. Groomer</span>
              <span className={step >= 2 ? 'text-[#DFBA6B]' : ''}>2. Fecha & Mascota</span>
              <span className={step >= 3 ? 'text-[#DFBA6B]' : ''}>3. Confirmación</span>
            </div>
            <div className="h-1 bg-slate-900 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-[#DFBA6B] to-[#C5A059] transition-all duration-300"
                style={{ width: `${(step / 3) * 100}%` }}
              />
            </div>
          </div>
        )}

        {/* Main Interface */}
        {!selectedGroomer ? (
          /* STEP 1: SEDE SELECTOR & GROOMER CATALOG */
          <div>
            {/* Sede Selector Banner */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-[#121214] border border-slate-800/80 mb-10 max-w-2xl mx-auto shadow-xl">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-slate-900 text-[#DFBA6B] border border-slate-800">
                  <MapPin className="w-5 h-5" />
                </div>
                <div className="text-left">
                  <p className="text-xs font-mono text-[#DFBA6B] uppercase tracking-wider">Cobertura actual</p>
                  <p className="text-sm font-sans font-medium text-white">{selectedSede}</p>
                </div>
              </div>
              
              <div className="flex gap-2 w-full sm:w-auto">
                <button
                  id="sede-bogota"
                  onClick={() => setSelectedSede('Sede Norte, Bogotá')}
                  className={`flex-1 sm:flex-initial px-4 py-2 rounded-lg text-xs font-sans tracking-wide font-medium transition-all duration-200 cursor-pointer ${
                    selectedSede === 'Sede Norte, Bogotá'
                      ? 'bg-[#DFBA6B] text-black shadow-lg'
                      : 'bg-black text-slate-400 hover:text-white border border-slate-800'
                  }`}
                >
                  Bogotá
                </button>
                <button
                  id="sede-medellin"
                  onClick={() => setSelectedSede('Sede El Poblado, Medellín')}
                  className={`flex-1 sm:flex-initial px-4 py-2 rounded-lg text-xs font-sans tracking-wide font-medium transition-all duration-200 cursor-pointer ${
                    selectedSede === 'Sede El Poblado, Medellín'
                      ? 'bg-[#DFBA6B] text-black shadow-lg'
                      : 'bg-black text-slate-400 hover:text-white border border-slate-800'
                  }`}
                >
                  Medellín
                </button>
              </div>
            </div>

            {/* Tariffs / Pricing Cards Block */}
            <div className="mb-14 text-left">
              <h3 className="font-serif text-xl font-medium text-white mb-6 border-b border-slate-900 pb-3 flex items-center gap-2">
                <Scissors className="w-4 h-4 text-[#DFBA6B]" />
                <span>Nuestros Servicios & Tarifas Domicilio</span>
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {Object.entries(SERVICES).map(([key, service]) => (
                  <div 
                    key={key} 
                    className="p-5 rounded-2xl bg-[#0d0d0f] border border-slate-900 flex flex-col justify-between hover:border-[#DFBA6B]/30 transition-all duration-300"
                  >
                    <div>
                      <div className="flex justify-between items-start gap-2 mb-2">
                        <span className="font-serif text-base font-semibold text-[#FAF9F6] tracking-wide uppercase">
                          {key === 'básico' ? '🐾 Básico' : key === 'medicado' ? '🐾 Medicado' : '👑 Premium'}
                        </span>
                        <span className="text-[#DFBA6B] font-mono text-xs font-bold bg-[#DFBA6B]/10 px-2.5 py-1 rounded-lg border border-[#DFBA6B]/20">
                          {service.detail}
                        </span>
                      </div>
                      <p className="text-xs text-slate-400 font-light leading-relaxed mb-4">
                        {service.description}
                      </p>
                    </div>
                    <div className="text-[10px] font-mono text-slate-500 uppercase tracking-wider mt-2 pt-2 border-t border-slate-950/60">
                      {key === 'medicado' ? 'Tarifa fija garantizada' : 'Varía según raza y tamaño'}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Sub-Header: Choose Groomer */}
            <div className="mb-6 text-left">
              <h3 className="font-serif text-xl font-medium text-[#FAF9F6] flex items-center gap-2">
                <span>Nuestros Estilistas de Confianza (Groomers)</span>
              </h3>
              <p className="text-xs text-slate-400 font-light mt-1">
                Selecciona a tu especialista y agenda su visita domiciliaria.
              </p>
            </div>

            {/* Groomers Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {groomers.map((groomer) => (
                <div
                  key={groomer.id}
                  className="group relative flex flex-col justify-between p-6 rounded-2xl bg-[#121214] border border-slate-800 hover:border-[#DFBA6B]/50 transition-all duration-300 shadow-xl overflow-hidden hover:scale-[1.01]"
                >
                  {/* Gold Corner Glow */}
                  <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-[#DFBA6B]/5 to-transparent rounded-bl-full pointer-events-none" />

                  <div>
                    {/* Groomer Header (Avatar + Specialty) */}
                    <div className="flex items-center gap-4 mb-4">
                      {/* Premium Initials Avatar */}
                      <div className={`w-14 h-14 rounded-xl flex items-center justify-center font-serif text-lg font-bold text-black ${groomer.avatarColor} shadow-md border border-[#DFBA6B]/20 shrink-0`}>
                        {groomer.avatarText}
                      </div>
                      <div className="text-left">
                        <h3 className="font-serif text-lg font-medium text-white group-hover:text-[#DFBA6B] transition-colors duration-200">
                          {groomer.name}
                        </h3>
                        <p className="text-xs text-[#DFBA6B] font-sans tracking-wider font-medium uppercase">
                          {groomer.specialty}
                        </p>
                      </div>
                    </div>

                    {/* Rating Bar */}
                    <div className="flex items-center gap-1.5 mb-3 bg-black/40 px-2.5 py-1 rounded-lg w-max border border-slate-900">
                      <Star className="w-3.5 h-3.5 fill-[#DFBA6B] text-[#DFBA6B]" />
                      <span className="text-xs font-mono font-medium text-white">{groomer.rating.toFixed(1)}</span>
                      <span className="text-slate-500 text-[10px] font-mono">({groomer.reviewsCount} reseñas)</span>
                    </div>

                    {/* Bio Paragraph */}
                    <p className="text-xs text-slate-400 font-light leading-relaxed mb-6 text-left">
                      {groomer.bio}
                    </p>
                  </div>

                  {/* Booking CTA Button */}
                  <button
                    id={`book-groomer-${groomer.id}`}
                    onClick={() => handleSelectGroomer(groomer)}
                    className="w-full py-2.5 rounded-xl border border-slate-800 bg-black hover:bg-[#DFBA6B] hover:text-black hover:border-[#DFBA6B] text-[#DFBA6B] font-sans text-xs tracking-wider uppercase font-semibold transition-all duration-300 cursor-pointer"
                  >
                    Agendar Groomer
                  </button>
                </div>
              ))}
            </div>
          </div>
        ) : isConfirmed ? (
          /* APPOINTMENT BOOKED SUCCESS SCREEN */
          <div className="max-w-md mx-auto p-8 rounded-2xl bg-[#121214] border border-[#DFBA6B]/30 text-center shadow-2xl animate-fade-in relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#DFBA6B] to-[#C5A059]" />
            
            <div className="w-16 h-16 bg-[#DFBA6B]/10 rounded-full flex items-center justify-center mx-auto mb-6 border border-[#DFBA6B]/30">
              <Check className="w-8 h-8 text-[#DFBA6B]" />
            </div>

            <h3 className="font-serif text-2xl text-[#FAF9F6] font-medium mb-2">¡Reserva Confirmada!</h3>
            <p className="text-xs font-mono text-[#DFBA6B] uppercase tracking-wider mb-6">Peluquería Móvil Spa</p>

            <div className="bg-black/60 rounded-xl p-4 border border-slate-900 text-left space-y-3 mb-6">
              <div className="flex justify-between text-xs border-b border-slate-900 pb-2">
                <span className="text-slate-500">Mascota:</span>
                <span className="text-white font-medium">{registeredPets.find(p => p.id === selectedPetId)?.name || manualPetName}</span>
              </div>
              <div className="flex justify-between text-xs border-b border-slate-900 pb-2">
                <span className="text-slate-500">Groomer Especialista:</span>
                <span className="text-white font-medium">{selectedGroomer.name}</span>
              </div>
              <div className="flex justify-between text-xs border-b border-slate-900 pb-2">
                <span className="text-slate-500">Sede de Operación:</span>
                <span className="text-white font-medium">{selectedSede}</span>
              </div>
              <div className="flex justify-between text-xs border-b border-slate-900 pb-2">
                <span className="text-slate-500">Fecha:</span>
                <span className="text-white font-medium">{bookingDate}</span>
              </div>
              <div className="flex justify-between text-xs border-b border-slate-900 pb-2">
                <span className="text-slate-500">Hora Estimada:</span>
                <span className="text-white font-medium">{bookingTime}</span>
              </div>
              <div className="flex justify-between text-xs pt-1">
                <span className="text-slate-500">{SERVICES[selectedServiceType].name}:</span>
                <span className="text-[#DFBA6B] font-mono font-semibold">${SERVICES[selectedServiceType].price.toLocaleString('es-CO')} COP</span>
              </div>
            </div>

            <p className="text-xs text-slate-400 font-light mb-6 leading-relaxed">
              Tu van spa personalizada está programada. Te enviaremos un SMS recordatorio con los datos de contacto del Groomer. El pago se realiza al finalizar el servicio.
            </p>

            <div className="flex flex-col gap-2">
              <button
                id="btn-confirm-ok"
                onClick={resetBookingForm}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-[#DFBA6B] to-[#C5A059] text-black font-sans font-semibold text-xs tracking-wider uppercase shadow-md transition-all duration-200 cursor-pointer"
              >
                Listo
              </button>
              <button
                id="btn-go-history"
                onClick={() => {
                  resetBookingForm();
                  onNavigateToPets();
                }}
                className="w-full py-3 rounded-xl border border-slate-800 hover:border-slate-700 bg-black text-slate-400 hover:text-white font-sans text-xs tracking-wider uppercase font-medium transition-all duration-200 cursor-pointer"
              >
                Ver Mi Historial
              </button>
            </div>
          </div>
        ) : (
          /* SCHEDULING WIZARD STEPS 2 & 3 */
          <div className="max-w-2xl mx-auto p-6 sm:p-8 rounded-2xl bg-[#121214] border border-slate-800 shadow-2xl relative">
            
            {/* Header containing selected groomer */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-900 pb-6 mb-6">
              <button
                onClick={handleBackToGroomers}
                className="inline-flex items-center gap-1.5 text-xs font-mono text-slate-500 hover:text-white transition-colors cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Cambiar Groomer</span>
              </button>

              <div className="flex items-center gap-3 text-left">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center font-serif text-sm font-bold text-black ${selectedGroomer.avatarColor}`}>
                  {selectedGroomer.avatarText}
                </div>
                <div>
                  <p className="text-xs text-slate-500 font-light">Agendando con</p>
                  <p className="text-sm font-serif font-medium text-white">{selectedGroomer.name}</p>
                </div>
              </div>
            </div>

            {step === 2 ? (
              /* STEP 2 FORM: DATE, TIME, PET */
              <div className="space-y-6 text-left">
                {/* Pet Selector */}
                <div>
                  <label className="block text-xs font-mono text-[#DFBA6B] uppercase tracking-wider mb-2">
                    Mascota a Consentir
                  </label>
                  
                  {registeredPets.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
                      {registeredPets.map(pet => (
                        <button
                          key={pet.id}
                          type="button"
                          onClick={() => setSelectedPetId(pet.id)}
                          className={`p-3 rounded-xl border text-left flex items-center justify-between transition-all cursor-pointer ${
                            selectedPetId === pet.id
                              ? 'border-[#DFBA6B] bg-[#DFBA6B]/5 text-white'
                              : 'border-slate-800 bg-black text-slate-400 hover:border-slate-700'
                          }`}
                        >
                          <div>
                            <p className="text-sm font-serif font-semibold">{pet.name}</p>
                            <p className="text-[10px] text-slate-500">{pet.breed} • {pet.age} {pet.age === 1 ? 'año' : 'años'}</p>
                          </div>
                          {selectedPetId === pet.id && <UserCheck className="w-4 h-4 text-[#DFBA6B]" />}
                        </button>
                      ))}

                      {/* Register another pet CTA inside picker */}
                      <button
                        type="button"
                        onClick={onNavigateToPets}
                        className="p-3 rounded-xl border border-dashed border-slate-800 hover:border-slate-700 bg-transparent text-slate-500 hover:text-slate-400 flex items-center justify-center gap-2 transition-all cursor-pointer"
                      >
                        <Plus className="w-4 h-4" />
                        <span className="text-xs font-sans font-medium">Registrar otra mascota</span>
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <p className="text-xs text-slate-500 font-light leading-relaxed">
                        No tienes mascotas registradas. Escribe su nombre abajo, o ve a la pestaña <span className="text-[#DFBA6B] cursor-pointer hover:underline" onClick={onNavigateToPets}>Mis Mascotas</span> para registrar su perfil completo.
                      </p>
                      <input
                        id="input-manual-pet"
                        type="text"
                        placeholder="Nombre de tu Mascota (Ej: Rocky)"
                        value={manualPetName}
                        onChange={(e) => setManualPetName(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl bg-black border border-slate-800 text-white text-sm focus:outline-none focus:border-[#DFBA6B] font-sans"
                      />
                    </div>
                  )}
                </div>

                {/* Service Type Selector */}
                <div>
                  <label className="block text-xs font-mono text-[#DFBA6B] uppercase tracking-wider mb-2">
                    Tipo de Servicio Domicilio
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {Object.entries(SERVICES).map(([key, service]) => (
                      <button
                        key={key}
                        type="button"
                        onClick={() => setSelectedServiceType(key as 'básico' | 'medicado' | 'premium')}
                        className={`p-3.5 rounded-xl border text-left flex flex-col justify-between transition-all cursor-pointer ${
                          selectedServiceType === key
                            ? 'border-[#DFBA6B] bg-[#DFBA6B]/5 text-white shadow-[0_4px_15px_rgba(212,175,55,0.1)]'
                            : 'border-slate-800 bg-black text-slate-400 hover:border-slate-700'
                        }`}
                      >
                        <div>
                          <div className="flex items-center justify-between gap-1 w-full">
                            <span className="text-xs font-sans font-bold uppercase tracking-wider text-slate-200">
                              {key === 'básico' ? '🐾 Básico' : key === 'medicado' ? '🐾 Medicado' : '👑 Premium'}
                            </span>
                            {selectedServiceType === key && (
                              <Check className="w-3.5 h-3.5 text-[#DFBA6B] shrink-0" />
                            )}
                          </div>
                          <p className="text-[10px] text-[#DFBA6B] font-mono mt-1 font-bold">
                            {service.detail}
                          </p>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Date Picker */}
                <div>
                  <label className="block text-xs font-mono text-[#DFBA6B] uppercase tracking-wider mb-2">
                    Seleccionar Fecha
                  </label>
                  <div className="relative">
                    <CalendarIcon className="absolute left-3 top-3.5 w-4 h-4 text-slate-500 pointer-events-none" />
                    <input
                      id="input-booking-date"
                      type="date"
                      min={new Date().toISOString().split('T')[0]}
                      value={bookingDate}
                      onChange={(e) => setBookingDate(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 rounded-xl bg-black border border-slate-800 text-white text-sm focus:outline-none focus:border-[#DFBA6B] font-sans [color-scheme:dark]"
                    />
                  </div>
                </div>

                {/* Time Picker */}
                <div>
                  <label className="block text-xs font-mono text-[#DFBA6B] uppercase tracking-wider mb-2">
                    Hora Disponible (Agenda de Hoy & Mañana)
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {timeSlots.map((time) => (
                      <button
                        key={time}
                        type="button"
                        onClick={() => setBookingTime(time)}
                        className={`py-2 rounded-lg text-xs font-mono transition-all duration-200 cursor-pointer border ${
                          bookingTime === time
                            ? 'bg-[#DFBA6B] text-black border-[#DFBA6B] font-bold shadow-md'
                            : 'bg-black text-slate-400 hover:text-white border-slate-800'
                        }`}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Grooming Special Instructions / Notes */}
                <div>
                  <label className="block text-xs font-mono text-[#DFBA6B] uppercase tracking-wider mb-2">
                    Notas de Cuidado o Preferencias del Corte
                  </label>
                  <textarea
                    id="input-booking-notes"
                    placeholder="Escribe si tu mascota es nerviosa, tiene alergias de piel o detalles del corte que deseas..."
                    value={bookingNotes}
                    onChange={(e) => setBookingNotes(e.target.value)}
                    rows={2}
                    className="w-full px-4 py-3 rounded-xl bg-black border border-slate-800 text-white text-sm focus:outline-none focus:border-[#DFBA6B] font-sans resize-none"
                  />
                </div>

                {/* Navigation Buttons */}
                <div className="pt-4 flex justify-end gap-3">
                  <button
                    id="btn-goto-summary"
                    type="button"
                    onClick={handleGoToSummary}
                    className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#DFBA6B] to-[#C5A059] text-black font-sans font-semibold text-xs tracking-wider uppercase flex items-center gap-2 transition-all duration-200 cursor-pointer shadow-md"
                  >
                    <span>Resumen de Cita</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ) : (
              /* STEP 3: RESERVATION SUMMARY & ACTION */
              <div className="text-left space-y-6">
                <p className="text-xs text-slate-400 font-light italic leading-relaxed">
                  Por favor revisa detenidamente los detalles de tu agendamiento premium. Al confirmar, un Groomer de pelos & polos se desplazará en la fecha elegida.
                </p>

                {/* Big Details Box */}
                <div className="rounded-2xl bg-black border border-slate-850 p-6 space-y-4">
                  <h4 className="font-serif text-lg text-white border-b border-slate-900 pb-3 font-semibold">Resumen de Servicio Móvil</h4>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                    <div>
                      <p className="text-slate-500 font-mono text-[10px] uppercase tracking-wider mb-0.5">Groomer Especialista</p>
                      <p className="text-white font-medium">{selectedGroomer.name}</p>
                      <p className="text-slate-400 text-[10px]">{selectedGroomer.specialty}</p>
                    </div>

                    <div>
                      <p className="text-slate-500 font-mono text-[10px] uppercase tracking-wider mb-0.5">Mascota Registrada</p>
                      <p className="text-white font-medium">
                        {selectedPetId
                          ? registeredPets.find(p => p.id === selectedPetId)?.name || 'Mascota'
                          : manualPetName}
                      </p>
                      <p className="text-slate-400 text-[10px]">
                        {selectedPetId 
                          ? `${registeredPets.find(p => p.id === selectedPetId)?.breed || 'Raza'} • ${registeredPets.find(p => p.id === selectedPetId)?.age || 0} años`
                          : 'Nueva Mascota'}
                      </p>
                    </div>

                    <div>
                      <p className="text-slate-500 font-mono text-[10px] uppercase tracking-wider mb-0.5">Sede y Cobertura</p>
                      <p className="text-white font-medium">{selectedSede}</p>
                    </div>

                    <div>
                      <p className="text-slate-500 font-mono text-[10px] uppercase tracking-wider mb-0.5">Fecha & Hora</p>
                      <div className="flex items-center gap-1.5 text-[#DFBA6B] font-mono mt-0.5">
                        <Clock className="w-3.5 h-3.5" />
                        <span className="font-semibold">{bookingDate} a las {bookingTime}</span>
                      </div>
                    </div>
                  </div>

                  {bookingNotes.trim() && (
                    <div className="border-t border-slate-900 pt-3 text-xs">
                      <p className="text-slate-500 font-mono text-[10px] uppercase tracking-wider mb-1">Notas especiales para el Groomer</p>
                      <p className="text-slate-400 font-light leading-relaxed bg-[#121214] p-2.5 rounded-lg border border-slate-900">
                        "{bookingNotes}"
                      </p>
                    </div>
                  )}

                  <div className="border-t border-slate-900 pt-3 flex items-center justify-between text-xs">
                    <span className="text-slate-400 font-medium">{SERVICES[selectedServiceType].name}:</span>
                    <span className="text-lg text-[#DFBA6B] font-mono font-bold">${SERVICES[selectedServiceType].price.toLocaleString('es-CO')} COP</span>
                  </div>
                </div>

                {/* Disclaimer info */}
                <div className="p-3.5 rounded-xl bg-[#DFBA6B]/5 border border-[#DFBA6B]/20 text-xs text-slate-400 font-light flex items-start gap-2">
                  <Check className="w-4 h-4 text-[#DFBA6B] shrink-0 mt-0.5" />
                  <p>
                    <strong>Cancelaciones sin costo:</strong> Puedes cancelar o reagendar hasta 4 horas antes sin recargo alguno. El Groomer llamará 15 minutos antes de arribar.
                  </p>
                </div>

                {/* Back / Confirm Button Row */}
                <div className="flex items-center justify-between pt-4">
                  <button
                    onClick={() => setStep(2)}
                    className="inline-flex items-center gap-1 text-xs font-mono text-slate-500 hover:text-white transition-colors cursor-pointer"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>Atrás</span>
                  </button>

                  <button
                    id="btn-confirm-final"
                    onClick={handleConfirmBooking}
                    className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-[#DFBA6B] to-[#C5A059] text-black font-sans font-semibold text-xs tracking-wider uppercase transition-all duration-200 cursor-pointer shadow-[0_4px_20px_rgba(212,175,55,0.25)] hover:shadow-[0_4px_30px_rgba(212,175,55,0.45)] hover:scale-[1.01]"
                  >
                    Confirmar Reserva
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
