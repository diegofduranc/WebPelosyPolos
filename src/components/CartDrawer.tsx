/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { X, Plus, Minus, Trash2, ShoppingBag, ShoppingCart, Sparkles, Check, Gift } from 'lucide-react';
import { CartItem, OrderHistory } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemoveItem: (id: string) => void;
  onCheckout: (order: OrderHistory) => void;
  onClearCart: () => void;
}

export default function CartDrawer({
  isOpen,
  onClose,
  cart,
  onUpdateQuantity,
  onRemoveItem,
  onCheckout,
  onClearCart,
}: CartDrawerProps) {
  const [checkoutStep, setCheckoutStep] = useState<'cart' | 'shipping' | 'success'>('cart');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [notes, setNotes] = useState('');

  if (!isOpen) return null;

  const subtotal = cart.reduce((total, item) => total + (item.iceCream.price * item.quantity), 0);
  const deliveryFee = subtotal > 40000 ? 0 : 5000; // Free delivery over $40.000 COP
  const total = subtotal + deliveryFee;

  const handleNextStep = () => {
    if (checkoutStep === 'cart') {
      if (cart.length === 0) return;
      setCheckoutStep('shipping');
    }
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!address.trim() || !phone.trim()) {
      alert('Por favor completa la dirección de entrega y tu teléfono de contacto.');
      return;
    }

    const newOrder: OrderHistory = {
      id: `POL-${Math.floor(100000 + Math.random() * 900000)}`,
      date: new Date().toLocaleDateString('es-CO'),
      items: cart.map(item => ({
        name: item.iceCream.name,
        quantity: item.quantity,
        price: item.iceCream.price,
      })),
      total: total,
      status: 'Preparando',
    };

    onCheckout(newOrder);
    setCheckoutStep('success');
  };

  const handleCloseAndReset = () => {
    onClearCart();
    setCheckoutStep('cart');
    setAddress('');
    setPhone('');
    setNotes('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden font-sans">
      {/* Background Backdrop Overlay */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity duration-300"
        onClick={checkoutStep === 'success' ? handleCloseAndReset : onClose}
      />

      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#0c0c0e] border-l border-slate-900 shadow-2xl flex flex-col h-full animate-slide-in relative">
          
          {/* Top golden border highlight */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#DFBA6B] to-[#C5A059]" />

          {/* Drawer Header */}
          <div className="px-6 py-6 border-b border-slate-900 flex items-center justify-between">
            <h3 className="font-serif text-xl font-semibold text-white flex items-center gap-2">
              <ShoppingCart className="w-5 h-5 text-[#DFBA6B]" />
              <span>
                {checkoutStep === 'cart' && 'Mi Carrito'}
                {checkoutStep === 'shipping' && 'Despacho Premium'}
                {checkoutStep === 'success' && '¡Pedido Recibido!'}
              </span>
            </h3>
            
            {checkoutStep !== 'success' && (
              <button
                onClick={onClose}
                className="p-1 rounded-lg text-slate-500 hover:text-white hover:bg-slate-900 transition-all cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>

          {/* MAIN CONTENT AREA */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {checkoutStep === 'cart' ? (
              /* STEP 1: CART LIST */
              cart.length > 0 ? (
                <div className="space-y-4">
                  {cart.map((item) => (
                    <div
                      key={item.iceCream.id}
                      className="p-4 rounded-xl bg-[#121214] border border-slate-850 flex items-center gap-4 text-left"
                    >
                      {/* Emoji Icon */}
                      <div className={`w-12 h-12 rounded-lg ${item.iceCream.color} bg-gradient-to-br flex items-center justify-center shrink-0`}>
                        <span className="text-2xl">{item.iceCream.imageEmoji}</span>
                      </div>

                      {/* Info & Quantity controls */}
                      <div className="flex-1">
                        <h4 className="font-serif text-sm font-semibold text-white leading-snug">{item.iceCream.name}</h4>
                        <p className="text-[10px] text-[#DFBA6B] font-mono uppercase tracking-wider font-medium">{item.iceCream.flavor}</p>
                        
                        <div className="flex items-center justify-between mt-3">
                          {/* Unit price */}
                          <span className="font-mono text-xs font-semibold text-slate-400">
                            ${item.iceCream.price.toLocaleString('es-CO')} COP
                          </span>

                          {/* Control buttons */}
                          <div className="flex items-center gap-1.5 bg-black/60 rounded-lg p-1 border border-slate-900">
                            <button
                              id={`decrease-qty-${item.iceCream.id}`}
                              onClick={() => onUpdateQuantity(item.iceCream.id, item.quantity - 1)}
                              className="p-1 rounded text-slate-400 hover:text-white hover:bg-slate-900/60 transition-all cursor-pointer"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="text-xs font-mono font-bold text-white px-1.5 min-w-[16px] text-center">
                              {item.quantity}
                            </span>
                            <button
                              id={`increase-qty-${item.iceCream.id}`}
                              onClick={() => onUpdateQuantity(item.iceCream.id, item.quantity + 1)}
                              className="p-1 rounded text-slate-400 hover:text-white hover:bg-slate-900/60 transition-all cursor-pointer"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Delete button */}
                      <button
                        id={`delete-item-${item.iceCream.id}`}
                        onClick={() => onRemoveItem(item.iceCream.id)}
                        className="p-1.5 rounded-lg text-slate-600 hover:text-red-400 hover:bg-black/60 transition-colors cursor-pointer"
                        title="Quitar"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-center py-16 text-slate-500">
                  <ShoppingBag className="w-12 h-12 text-slate-700 mb-4" />
                  <p className="text-sm font-light max-w-xs leading-relaxed">
                    Aún no tienes paletas de helado en tu carrito. Recorre nuestro catálogo y consiente a tu mascota con un postre saludable.
                  </p>
                </div>
              )
            ) : checkoutStep === 'shipping' ? (
              /* STEP 2: SHIPPING AND CONTACT FORM */
              <form id="shipping-form" onSubmit={handlePlaceOrder} className="space-y-5 text-left">
                <div className="p-4 rounded-xl bg-[#DFBA6B]/5 border border-[#DFBA6B]/15 text-xs text-slate-400 font-light mb-2 flex items-start gap-2">
                  <Sparkles className="w-4 h-4 text-[#DFBA6B] shrink-0 mt-0.5" />
                  <p>
                    Las paletas se transportan en contenedores térmicos con hielo seco para garantizar que lleguen perfectamente congeladas a tu puerta.
                  </p>
                </div>

                {/* Delivery Address */}
                <div>
                  <label className="block text-[10px] font-mono text-[#DFBA6B] uppercase tracking-wider mb-1.5">Dirección de Entrega *</label>
                  <input
                    id="shipping-address"
                    type="text"
                    placeholder="Ej: Calle 127 # 45 - 20, Apto 502"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    required
                    className="w-full px-3 py-2.5 rounded-xl bg-black border border-slate-800 text-white text-sm focus:outline-none focus:border-[#DFBA6B]"
                  />
                </div>

                {/* Phone number */}
                <div>
                  <label className="block text-[10px] font-mono text-[#DFBA6B] uppercase tracking-wider mb-1.5">Teléfono de Contacto *</label>
                  <input
                    id="shipping-phone"
                    type="tel"
                    placeholder="Ej: 310 123 4567"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                    className="w-full px-3 py-2.5 rounded-xl bg-black border border-slate-800 text-white text-sm focus:outline-none focus:border-[#DFBA6B]"
                  />
                </div>

                {/* Additional instructions */}
                <div>
                  <label className="block text-[10px] font-mono text-[#DFBA6B] uppercase tracking-wider mb-1.5">Instrucciones de Entrega (Opcional)</label>
                  <textarea
                    id="shipping-notes"
                    placeholder="Ej: Dejar en portería, timbrar en el intercomunicador..."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    rows={3}
                    className="w-full px-3 py-2.5 rounded-xl bg-black border border-slate-800 text-white text-sm focus:outline-none focus:border-[#DFBA6B] resize-none"
                  />
                </div>

                {/* Payment method note */}
                <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-900 text-xs text-slate-400 font-light flex items-start gap-2">
                  <Check className="w-4 h-4 text-green-400 shrink-0 mt-0.5" />
                  <p>
                    <strong>Pago contra entrega:</strong> Aceptamos Efectivo, Transferencia Nequi/Daviplata o Tarjeta al recibir tu pedido.
                  </p>
                </div>
              </form>
            ) : (
              /* STEP 3: ORDER SUCCESS */
              <div className="h-full flex flex-col items-center justify-center text-center py-8 animate-fade-in">
                <div className="w-16 h-16 bg-[#DFBA6B]/10 rounded-full flex items-center justify-center border border-[#DFBA6B]/20 mb-6">
                  <Check className="w-8 h-8 text-[#DFBA6B]" />
                </div>

                <h4 className="font-serif text-2xl text-white font-medium mb-2">¡Despacho Confirmado!</h4>
                <p className="text-xs font-mono text-[#DFBA6B] uppercase tracking-wider mb-6">Entrega Térmica Especial</p>

                <p className="text-xs text-slate-400 font-light max-w-sm mb-6 leading-relaxed">
                  Las paletas de tu peludo han sido reservadas y el equipo de cocina premium está preparando el despacho. Recibirás un SMS cuando el motorizado de pelos & polos esté en camino.
                </p>

                <div className="bg-black/40 rounded-xl p-4 border border-slate-900 w-full text-left space-y-2 mb-8 text-xs">
                  <div className="flex justify-between border-b border-slate-900 pb-1.5">
                    <span className="text-slate-500">Dirección:</span>
                    <span className="text-slate-300 font-medium">{address}</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-900 pb-1.5">
                    <span className="text-slate-500">Teléfono:</span>
                    <span className="text-slate-300 font-medium">{phone}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Total a pagar en entrega:</span>
                    <span className="text-[#DFBA6B] font-mono font-bold">${total.toLocaleString('es-CO')} COP</span>
                  </div>
                </div>

                <button
                  id="btn-close-success"
                  onClick={handleCloseAndReset}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-[#DFBA6B] to-[#C5A059] text-black font-sans font-bold text-xs tracking-wider uppercase shadow-md transition-all duration-200 cursor-pointer"
                >
                  Entendido, ¡Gracias!
                </button>
              </div>
            )}
          </div>

          {/* DRAWER FOOTER (PRICING & CTA) */}
          {cart.length > 0 && checkoutStep !== 'success' && (
            <div className="px-6 py-6 border-t border-slate-900 bg-[#0e0e10]/80 backdrop-blur">
              <div className="space-y-2 text-xs mb-4">
                <div className="flex justify-between text-slate-400 font-light">
                  <span>Subtotal paletas:</span>
                  <span className="font-mono text-white">${subtotal.toLocaleString('es-CO')}</span>
                </div>
                <div className="flex justify-between text-slate-400 font-light">
                  <span>Envío especializado:</span>
                  <span className="font-mono text-white">
                    {deliveryFee === 0 ? 'Gratis' : `$${deliveryFee.toLocaleString('es-CO')}`}
                  </span>
                </div>
                
                {deliveryFee > 0 && (
                  <p className="text-[10px] text-[#DFBA6B] text-left italic font-light flex items-center gap-1">
                    <Gift className="w-3.5 h-3.5 shrink-0 text-[#DFBA6B]" />
                    <span>¡Agrega ${(40000 - subtotal).toLocaleString('es-CO')} más para envío gratis!</span>
                  </p>
                )}

                <div className="flex justify-between text-sm pt-2 border-t border-slate-900 font-semibold">
                  <span className="text-slate-300">Total Estimado:</span>
                  <span className="text-[#DFBA6B] font-mono text-base">${total.toLocaleString('es-CO')} COP</span>
                </div>
              </div>

              {checkoutStep === 'cart' ? (
                <button
                  id="btn-goto-shipping"
                  onClick={handleNextStep}
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#DFBA6B] to-[#C5A059] text-black font-sans font-bold text-xs tracking-wider uppercase transition-all duration-200 shadow-md flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Continuar con Envío</span>
                  <Check className="w-4 h-4 text-black" />
                </button>
              ) : (
                <button
                  id="btn-place-order-final"
                  type="submit"
                  form="shipping-form"
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#DFBA6B] to-[#C5A059] text-black font-sans font-bold text-xs tracking-wider uppercase transition-all duration-200 shadow-md flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Confirmar Pedido</span>
                </button>
              )}
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
