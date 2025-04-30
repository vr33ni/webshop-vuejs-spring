// store/cart.ts
import { defineStore } from 'pinia';

export interface CartItem {
    id: number;
    name: string;
    brand: string;
    category: 'board' | 'wetsuit' | 'accessory'; // what type of product
    variant: string; // specific model/feature (e.g. 4/3 mm, boots, etc.)
    quantity: number;
  }
  

export const useCartStore = defineStore('cart', {
  state: () => ({
    items: [] as CartItem[],
  }),
  getters: {
    itemCount: (state) => state.items.reduce((acc, item) => acc + item.quantity, 0),
    totalItems: (state) => state.items,
  },
  actions: {
    addToCart(product: Omit<CartItem, 'quantity'>) {
      const existing = this.items.find(item => item.id === product.id);
      if (existing) {
        existing.quantity++;
      } else {
        this.items.push({ ...product, quantity: 1 });
      }
    },
    removeFromCart(id: number) {
      this.items = this.items.filter(item => item.id !== id);
    },
    clearCart() {
      this.items = [];
    }
  }
});
