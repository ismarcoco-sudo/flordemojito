"use client";

import { useState, useEffect } from 'react';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

const CART_KEY = 'flor-de-mojito-cart';

// Helper to dispatch custom event
const notifyCartUpdate = () => {
  window.dispatchEvent(new Event('cart-updated'));
};

export function useCart() {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Initial load
    const saved = localStorage.getItem(CART_KEY);
    if (saved) setItems(JSON.parse(saved));

    const handleUpdate = () => {
      const updated = localStorage.getItem(CART_KEY);
      if (updated) setItems(JSON.parse(updated));
    };

    const handleOpen = () => setIsOpen(true);
    const handleClose = () => setIsOpen(false);

    window.addEventListener('cart-updated', handleUpdate);
    window.addEventListener('open-cart', handleOpen);
    window.addEventListener('close-cart', handleClose);

    return () => {
      window.removeEventListener('cart-updated', handleUpdate);
      window.removeEventListener('open-cart', handleOpen);
      window.removeEventListener('close-cart', handleClose);
    };
  }, []);

  const saveItems = (newItems: CartItem[]) => {
    setItems(newItems);
    localStorage.setItem(CART_KEY, JSON.stringify(newItems));
    notifyCartUpdate();
  };

  const addItem = (product: any, quantity: number) => {
    const existing = items.find(item => item.id === product.id);
    let newItems;
    if (existing) {
      newItems = items.map(item => 
        item.id === product.id 
          ? { ...item, quantity: item.quantity + quantity }
          : item
      );
    } else {
      newItems = [...items, { ...product, quantity }];
    }
    saveItems(newItems);
    setIsOpen(true);
    window.dispatchEvent(new Event('open-cart'));
  };

  const removeItem = (id: string) => {
    saveItems(items.filter(item => item.id !== id));
  };

  const updateQuantity = (id: string, delta: number) => {
    saveItems(items.map(item => {
      if (item.id === id) {
        return { ...item, quantity: Math.max(1, item.quantity + delta) };
      }
      return item;
    }));
  };

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return {
    items,
    itemCount,
    total,
    isOpen,
    setIsOpen: (val: boolean) => {
      setIsOpen(val);
      window.dispatchEvent(new Event(val ? 'open-cart' : 'close-cart'));
    },
    addItem,
    removeItem,
    updateQuantity,
  };
}
