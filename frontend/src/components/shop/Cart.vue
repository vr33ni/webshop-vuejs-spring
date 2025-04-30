<template>
    <div class="cart-page">
      <h1>Your Cart</h1>
  
      <div v-if="cartItems.length === 0">Your cart is empty.</div>
  
      <div v-else class="cart-items">
        <div v-for="item in cartItems" :key="item.id" class="cart-item">
          <div class="item-info">
            <strong>{{ item.name }}</strong>
            <div class="meta">
              Brand: {{ item.brand }} | 
              Variant: {{ item.variant }} | 
              <span class="category">{{ item.category }}</span>
            </div>
          </div>
          <div class="item-controls">
            <span>x{{ item.quantity }}</span>
            <button @click="remove(item.id)">Remove</button>
          </div>
        </div>
      </div>
  
      <button v-if="cartItems.length" @click="checkout" class="checkout-btn">Checkout</button>
    </div>
  </template>
  
  <script setup lang="ts">
  import { useCartStore } from '../../store/cart';
  import { computed } from 'vue';
  
  const cartStore = useCartStore();
  const cartItems = computed(() => cartStore.totalItems);
  const remove = (id: number) => cartStore.removeFromCart(id);
  const checkout = () => {
    alert('Checkout successful!');
    cartStore.clearCart();
  };
  </script>
  
  <style scoped>
  .cart-page {
    padding: 20px;
  }
  
  .cart-items {
    display: flex;
    flex-direction: column;
    gap: 15px;
  }
  
  .cart-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: #f5f5f5;
    border-radius: 8px;
    padding: 10px 15px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  }
  
  .item-info {
    flex: 1;
  }
  
  .meta {
    font-size: 0.9rem;
    color: #555;
    margin-top: 4px;
  }
  
  .category {
    font-weight: bold;
    text-transform: capitalize;
    color: #007BFF;
  }
  
  .item-controls {
    display: flex;
    align-items: center;
    gap: 10px;
  }
  
  .checkout-btn {
    margin-top: 20px;
    padding: 10px 15px;
    background-color: #007BFF;
    color: white;
    border: none;
    border-radius: 6px;
    cursor: pointer;
  }
  
  .checkout-btn:hover {
    background-color: #0056b3;
  }
  </style>
  