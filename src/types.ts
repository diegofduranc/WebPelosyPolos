/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Groomer {
  id: string;
  name: string;
  specialty: string;
  rating: number;
  avatarColor: string;
  avatarText: string;
  reviewsCount: number;
  bio: string;
}

export type Sede = 'Sede Norte, Bogotá' | 'Sede El Poblado, Medellín';

export interface Pet {
  id: string;
  name: string;
  breed: string;
  age: number; // in years
  gender: 'Macho' | 'Hembra';
  weight: string;
  notes: string;
}

export interface Appointment {
  id: string;
  petId: string;
  petName: string;
  groomerId: string;
  groomerName: string;
  sede: Sede;
  date: string;
  time: string;
  notes: string;
  status: 'Confirmada' | 'Completada';
  cost: number;
}

export interface IceCream {
  id: string;
  name: string;
  flavor: string;
  price: number;
  description: string;
  ingredients: string[];
  popular: boolean;
  color: string; // Tailwind bg color class for visual style
  imageEmoji: string; // Playful Emoji representation of the flavor
  imageUrl?: string; // Optional real photo path
}

export interface CartItem {
  iceCream: IceCream;
  quantity: number;
}

export interface OrderHistory {
  id: string;
  date: string;
  items: {
    name: string;
    quantity: number;
    price: number;
  }[];
  total: number;
  status: 'Entregado' | 'En camino' | 'Preparando';
}
