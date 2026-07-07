/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Sparkles, ShoppingBag, Calendar, User, Heart, ShieldCheck, HelpCircle, Scissors, IceCream as IceIcon } from 'lucide-react';
import { Pet, Appointment, OrderHistory, CartItem, Groomer, IceCream } from './types';
import Logo from './components/Logo';
import Hero from './components/Hero';
import GroomingSection from './components/GroomingSection';
import IceCreamSection from './components/IceCreamSection';
import MyPetsSection from './components/MyPetsSection';
import CartDrawer from './components/CartDrawer';
import Footer from './components/Footer';

// CURATED STATIC DATA FOR GROOMERS
const INITIAL_GROOMERS: Groomer[] = [
  {
    id: 'G-1',
    name: 'Luis Argel',
    specialty: 'Estética Canina & Spa',
    rating: 4.9,
    reviewsCount: 142,
    avatarColor: 'bg-amber-100',
    avatarText: 'LA',
    bio: 'Más de 8 años de trayectoria en estilismo comercial canino. Especialista en masajes de relajación, hidromasaje y técnicas de tijera clásicas.',
  },
  {
    id: 'G-2',
    name: 'Nicol Pérez',
    specialty: 'Baños Medicados & Dermatología',
    rating: 5.0,
    reviewsCount: 98,
    avatarColor: 'bg-blue-100',
    avatarText: 'NP',
    bio: 'Especialista certificada en dermatología cosmética canina. Experta en manejo de pieles sensibles, baños terapéuticos antiprurito y deslanado suave.',
  },
  {
    id: 'G-3',
    name: 'Anamaria Paz',
    specialty: 'Estilista Canina Senior',
    rating: 4.8,
    reviewsCount: 210,
    avatarColor: 'bg-rose-100',
    avatarText: 'AP',
    bio: 'Apasionada por la alta costura y peluquería canina. Experta en cortes de raza asiáticos, pelados de exposición y peinados creativos para fotos.',
  },
  {
    id: 'G-4',
    name: 'Bibian Martínez',
    specialty: 'Estética Especializada & Tijera',
    rating: 4.9,
    reviewsCount: 165,
    avatarColor: 'bg-emerald-100',
    avatarText: 'BM',
    bio: 'Maestra de la tijera y el perfilado manual detallado. Amante del cuidado de cachorros y perros geriatras mediante metodologías amables libres de jaula.',
  },
  {
    id: 'G-5',
    name: 'Jose Cañas',
    specialty: 'Estética & Spa Canino',
    rating: 4.9,
    reviewsCount: 120,
    avatarColor: 'bg-purple-100',
    avatarText: 'JC',
    bio: 'Groomer certificado Fear-Free. Especialista en el manejo respetuoso y calmado de razas gigantes y mascotas con temperamentos nerviosos o rescatados.',
  },
];

// CURATED STATIC DATA FOR EXCLUSIVE PET-SAFE POPSICLES
const INITIAL_ICECREAMS: IceCream[] = [
 {
    id: 'PACK-5',
    name: 'Paquete de 5 unidades 🍦',
    flavor: 'Mix Frutal Sorpresa',
    price: 20000,
    description: 'La combinación perfecta de nuestros sabores frutales y cremosos favoritos de la semana. ¡Ahorra en grande con esta súper promo!',
    ingredients: ['Surtido de frutas', 'Base de kéfir y coco', 'Palito de galleta comestible'],
    popular: true,
    color: 'from-amber-500 to-yellow-600',
    imageEmoji: '🍦',
    imageUrl: '/src/assets/images/paletas_1.jpg'
  },
  {
    id: 'PACK-10',
    name: 'Paquete de 10 unidades 🍦',
    flavor: 'Surtido Completo Mix',
    price: 38000,
    description: 'Nuestra colección estelar de paletas para mascotas. Ideal para fiestas caninas o frescura de toda la quincena. ¡Ahorra más del 50%!',
    ingredients: ['Surtido frutal y salado', 'Arándanos, mango y salmón', 'Palito de galleta comestible'],
    popular: true,
    color: 'from-orange-500 to-red-600',
    imageEmoji: '🍦',
    imageUrl: '/src/assets/images/paletas_2.jpg'
  },
  {
    id: 'PACK-15',
    name: 'Paquete de 15 unidades 🍦',
    flavor: 'Surtido Ultra Premium',
    price: 54000,
    description: 'Abundancia de frescura gourmet 100% digestiva. Incluye sabores especiales de pato y salmón. ¡Perfecto para consentirlos a diario!',
    ingredients: ['Selección premium variada', 'Ingredientes orgánicos', 'Fórmula de alta digestibilidad'],
    popular: false,
    color: 'from-purple-500 to-indigo-600',
    imageEmoji: '🍦',
    imageUrl: '/src/assets/images/paletas_1.jpg'
  },
  {
    id: 'PACK-30',
    name: 'Paquete por 30 unidades 🍦',
    flavor: 'Súper Pack Mayorista',
    price: 96000,
    description: 'La máxima reserva de felicidad para tus mascotas. Súper ahorro para hogares multi-mascota o criadores. ¡La mejor oferta de la casa!',
    ingredients: ['Todo el menú disponible', 'Enriquecido con vitaminas', '100% natural, cero conservantes'],
    popular: true,
    color: 'from-yellow-500 to-amber-600',
    imageEmoji: '🍦',
    imageUrl: '/src/assets/images/paletas_2.jpg'
  }
];

// DEFAULT OWNER PET TO POPULATE THE LIST ON FIRST BOOT
const DEFAULT_PETS: Pet[] = [
  {
    id: 'PET-777',
    name: 'Duque',
    breed: 'Golden Retriever',
    age: 3,
    gender: 'Macho',
    weight: '32 kg',
    notes: 'Le encantan las caricias en la barriga y prefiere los cortes de pelo estilo cachorro. Alérgico al pollo. Es muy dócil.',
  },
];

export default function App() {
  const [activeTab, setActiveTab] = useState<'inicio' | 'grooming' | 'paletas' | 'mascotas'>('inicio');
  const [pets, setPets] = useState<Pet[]>([]);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [orders, setOrders] = useState<OrderHistory[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // LOAD FROM LOCAL STORAGE ON BOOT
  useEffect(() => {
    const savedPets = localStorage.getItem('pelos_polos_pets');
    if (savedPets) {
      setPets(JSON.parse(savedPets));
    } else {
      setPets(DEFAULT_PETS);
      localStorage.setItem('pelos_polos_pets', JSON.stringify(DEFAULT_PETS));
    }

    const savedApts = localStorage.getItem('pelos_polos_appointments');
    if (savedApts) {
      setAppointments(JSON.parse(savedApts));
    }

    const savedOrders = localStorage.getItem('pelos_polos_orders');
    if (savedOrders) {
      setOrders(JSON.parse(savedOrders));
    }

    const savedCart = localStorage.getItem('pelos_polos_cart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  // SAVE TO LOCAL STORAGE ON STATE CHANGE
  const savePets = (newPets: Pet[]) => {
    setPets(newPets);
    localStorage.setItem('pelos_polos_pets', JSON.stringify(newPets));
  };

  const saveAppointments = (newApts: Appointment[]) => {
    setAppointments(newApts);
    localStorage.setItem('pelos_polos_appointments', JSON.stringify(newApts));
  };

  const saveOrders = (newOrders: OrderHistory[]) => {
    setOrders(newOrders);
    localStorage.setItem('pelos_polos_orders', JSON.stringify(newOrders));
  };

  const saveCart = (newCart: CartItem[]) => {
    setCart(newCart);
    localStorage.setItem('pelos_polos_cart', JSON.stringify(newCart));
  };

  // CART ACTIONS
  const handleAddToCart = (iceCream: IceCream) => {
    const existing = cart.find(item => item.iceCream.id === iceCream.id);
    let updatedCart: CartItem[] = [];

    if (existing) {
      updatedCart = cart.map(item =>
        item.iceCream.id === iceCream.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
    } else {
      updatedCart = [...cart, { iceCream, quantity: 1 }];
    }
    saveCart(updatedCart);
  };

  const handleUpdateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveItem(id);
      return;
    }
    const updated = cart.map(item =>
      item.iceCream.id === id ? { ...item, quantity } : item
    );
    saveCart(updated);
  };

  const handleRemoveItem = (id: string) => {
    const updated = cart.filter(item => item.iceCream.id !== id);
    saveCart(updated);
  };

  const handleCheckout = (order: OrderHistory) => {
    const updatedOrders = [order, ...orders];
    saveOrders(updatedOrders);
    // Cart is cleared inside drawer on final close
  };

  const handleClearCart = () => {
    saveCart([]);
  };

  // ADDING PETS & APPOINTMENTS
  const handleAddPet = (pet: Pet) => {
    const updated = [...pets, pet];
    savePets(updated);
  };

  const handleRemovePet = (id: string) => {
    const updated = pets.filter(p => p.id !== id);
    savePets(updated);
  };

  const handleAddAppointment = (apt: Appointment) => {
    const updated = [apt, ...appointments];
    saveAppointments(updated);
  };

  // Quick navigation handler from Hero buttons
  const navigateToGrooming = () => {
    setActiveTab('grooming');
    setTimeout(() => {
      document.getElementById('grooming')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const navigateToCatalog = () => {
    setActiveTab('paletas');
    setTimeout(() => {
      document.getElementById('paletas')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const navigateToPets = () => {
    setActiveTab('mascotas');
    setTimeout(() => {
      document.getElementById('mascotas')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  // Count items in cart
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <div className="min-h-screen bg-black text-[#FAF9F6] selection:bg-[#DFBA6B] selection:text-black flex flex-col justify-between">
      
      {/* LUXURY STICKY NAVIGATION BAR */}
      <header className="sticky top-0 z-40 bg-black/95 backdrop-blur-md border-b border-slate-950 px-4 sm:px-6 lg:px-8 py-4 transition-all duration-350">
        <div className="max-w-6xl w-full mx-auto flex items-center justify-between">
          {/* Brand Left */}
          <Logo 
            size="sm" 
            showText={true} 
            className="cursor-pointer" 
            onClick={() => setActiveTab('inicio')} 
          />

          {/* Desktop Links Nav */}
          <nav className="hidden md:flex items-center gap-8 text-xs font-sans font-medium uppercase tracking-widest text-slate-400">
            <button
              onClick={() => setActiveTab('inicio')}
              className={`hover:text-[#DFBA6B] transition-colors cursor-pointer ${activeTab === 'inicio' ? 'text-[#DFBA6B] font-bold' : ''}`}
            >
              Inicio
            </button>
            <button
              id="nav-grooming"
              onClick={() => setActiveTab('grooming')}
              className={`hover:text-[#DFBA6B] transition-colors cursor-pointer ${activeTab === 'grooming' ? 'text-[#DFBA6B] font-bold' : ''}`}
            >
              Peluquería & Spa
            </button>
            <button
              id="nav-paletas"
              onClick={() => setActiveTab('paletas')}
              className={`hover:text-[#DFBA6B] transition-colors cursor-pointer ${activeTab === 'paletas' ? 'text-[#DFBA6B] font-bold' : ''}`}
            >
              Paletas de Helado
            </button>
            <button
              id="nav-mascotas"
              onClick={() => setActiveTab('mascotas')}
              className={`hover:text-[#DFBA6B] transition-colors cursor-pointer ${activeTab === 'mascotas' ? 'text-[#DFBA6B] font-bold' : ''}`}
            >
              Mis Mascotas
            </button>
          </nav>

          {/* Actions Right (Cart Button + Small responsive user stats) */}
          <div className="flex items-center gap-3">
            {/* Cart Trigger */}
            <button
              id="btn-cart-toggle"
              onClick={() => setIsCartOpen(true)}
              className="relative p-2.5 rounded-xl border border-slate-900 bg-[#0e0e10] text-slate-300 hover:text-[#DFBA6B] hover:border-[#DFBA6B]/30 transition-all cursor-pointer shadow-md"
              title="Ver mi carrito"
            >
              <ShoppingBag className="w-4 h-4" />
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-[#DFBA6B] text-black font-mono text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-black animate-scale-in">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Quick dashboard tab trigger */}
            <button
              id="btn-nav-pets"
              onClick={navigateToPets}
              className={`p-2.5 rounded-xl border transition-all cursor-pointer shadow-md ${
                activeTab === 'mascotas'
                  ? 'bg-[#DFBA6B]/15 text-[#DFBA6B] border-[#DFBA6B]/30'
                  : 'border-slate-900 bg-[#0e0e10] text-slate-300 hover:text-[#DFBA6B]'
              }`}
              title="Mis Mascotas"
            >
              <User className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* MOBILE BAR (FLUID RESPONSIVE BOTTOM TABS) */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-black/95 backdrop-blur-md border-t border-slate-900 grid grid-cols-4 py-2 text-[10px] uppercase font-mono tracking-wider font-semibold text-slate-500 shadow-xl">
        <button
          onClick={() => setActiveTab('inicio')}
          className={`flex flex-col items-center gap-1 cursor-pointer ${activeTab === 'inicio' ? 'text-[#DFBA6B]' : 'hover:text-slate-300'}`}
        >
          <Sparkles className="w-4 h-4" />
          <span>Inicio</span>
        </button>
        <button
          onClick={() => setActiveTab('grooming')}
          className={`flex flex-col items-center gap-1 cursor-pointer ${activeTab === 'grooming' ? 'text-[#DFBA6B]' : 'hover:text-slate-300'}`}
        >
          <Scissors className="w-4 h-4" />
          <span>Spa</span>
        </button>
        <button
          onClick={() => setActiveTab('paletas')}
          className={`flex flex-col items-center gap-1 cursor-pointer ${activeTab === 'paletas' ? 'text-[#DFBA6B]' : 'hover:text-slate-300'}`}
        >
          <IceIcon className="w-4 h-4" />
          <span>Paletas</span>
        </button>
        <button
          onClick={() => setActiveTab('mascotas')}
          className={`flex flex-col items-center gap-1 cursor-pointer ${activeTab === 'mascotas' ? 'text-[#DFBA6B]' : 'hover:text-slate-300'}`}
        >
          <Heart className="w-4 h-4" />
          <span>Mascotas</span>
        </button>
      </div>

      {/* MAIN VIEW CONTROLLER */}
      <main className="flex-1 pb-16 md:pb-0">
        
        {/* VIEW 1: HERO & TEASER OVERVIEWS (INICIO) */}
        {activeTab === 'inicio' && (
          <div className="animate-fade-in">
            <Hero 
              onBookClick={navigateToGrooming} 
              onCatalogClick={navigateToCatalog} 
            />

            {/* CURATED COMBINED ART TEASER BLOCK */}
            <section className="py-16 px-4 sm:px-6 lg:px-8 border-t border-slate-900 bg-[#09090b] relative overflow-hidden text-left">
              <div className="absolute top-1/2 left-1/3 w-72 h-72 bg-gradient-to-tr from-[#DFBA6B]/5 to-transparent rounded-full blur-3xl pointer-events-none" />
              
              <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
                {/* Visual Art Box */}
                <div className="p-8 rounded-2xl bg-[#121214] border border-slate-850 relative overflow-hidden group shadow-lg">
                  {/* Subtle brand watermark */}
                  <div className="absolute -right-10 -bottom-10 opacity-[0.03] select-none pointer-events-none transform -rotate-12 group-hover:scale-105 transition-transform duration-500">
                    <Logo showText={false} size="xl" />
                  </div>

                  <div className="relative z-10">
                    <span className="text-3xl filter drop-shadow-md">🧴 🐶 🍦</span>
                    <h3 className="font-serif text-2xl text-white mt-4 mb-2 font-medium">El Ritual Perfecto</h3>
                    <p className="text-xs text-slate-400 font-light leading-relaxed mb-6">
                      ¿Sabías que después de un baño relajante o corte de pelo, la temperatura corporal de tu mascota se regula de manera fantástica al disfrutar de una paleta refrescante?
                    </p>
                    <p className="text-xs text-[#DFBA6B] font-semibold tracking-wider font-mono uppercase">
                      Bienestar físico & mental canino.
                    </p>
                  </div>
                </div>

                {/* Text Context Box */}
                <div className="space-y-4">
                  <h3 className="font-serif text-3xl text-white leading-tight font-medium">
                    Una marca nacida del respeto y el <span className="text-[#DFBA6B] italic font-normal">amor incondicional.</span>
                  </h3>
                  <p className="text-xs text-slate-400 font-light leading-relaxed">
                    <strong>pelos & polos</strong> no es solo estética canina; es una celebración del vínculo que nos une a nuestras mascotas. Cada Groomer está entrenado en manejo cognitivo amigable, eliminando por completo el uso de jaulas, correas de castigo o ruidos excesivos.
                  </p>
                  <p className="text-xs text-slate-400 font-light leading-relaxed">
                    Y para coronar el día de spa, nuestras paletas heladas artesanales están hechas únicamente con insumos enteros: frutas deslactosadas, arándanos antioxidantes y caldos de proteína lenta cocción. El premio ideal que nutre sus articulaciones, piel y digestión.
                  </p>

                  <div className="pt-2 flex flex-col sm:flex-row gap-3">
                    <button
                      id="teaser-goto-grooming"
                      onClick={navigateToGrooming}
                      className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-[#DFBA6B] hover:text-black border border-slate-800 hover:border-[#DFBA6B] text-[#DFBA6B] font-sans text-xs tracking-wider uppercase font-semibold transition-all duration-300 flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <Scissors className="w-3.5 h-3.5" />
                      <span>Agendar un Spa</span>
                    </button>
                    <button
                      id="teaser-goto-catalog"
                      onClick={navigateToCatalog}
                      className="px-5 py-2.5 rounded-xl border border-slate-800 hover:border-slate-700 bg-transparent text-slate-400 hover:text-white font-sans text-xs tracking-wider uppercase transition-all duration-300 flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <IceIcon className="w-3.5 h-3.5" />
                      <span>Comprar Paletas</span>
                    </button>
                  </div>
                </div>
              </div>
            </section>
          </div>
        )}

        {/* VIEW 2: SPA RESERVATION (INTERACTIVE RESERVA DOMICILIO) */}
        {activeTab === 'grooming' && (
          <div className="animate-fade-in">
            <GroomingSection
              groomers={INITIAL_GROOMERS}
              registeredPets={pets}
              onAddAppointment={handleAddAppointment}
              onNavigateToPets={navigateToPets}
            />
          </div>
        )}

        {/* VIEW 3: POPSICLES CATALOG (HELADERÍA MASCOTAS) */}
        {activeTab === 'paletas' && (
          <div className="animate-fade-in">
            <IceCreamSection
              iceCreams={INITIAL_ICECREAMS}
              cart={cart}
              onAddToCart={handleAddToCart}
              onOpenCart={() => setIsCartOpen(true)}
            />
          </div>
        )}

        {/* VIEW 4: MY STUFF (MIS MASCOTAS) */}
        {activeTab === 'mascotas' && (
          <div className="animate-fade-in">
            <MyPetsSection
              pets={pets}
              appointments={appointments}
              orders={orders}
              onAddPet={handleAddPet}
              onRemovePet={handleRemovePet}
            />
          </div>
        )}

      </main>

      {/* CENTRALIZED CART SIDE DRAWER */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onCheckout={handleCheckout}
        onClearCart={handleClearCart}
      />

      {/* FOOTER */}
      <Footer />

    </div>
  );
}
