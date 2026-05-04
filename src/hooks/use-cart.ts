"use client";

import { useState, useEffect, useCallback } from 'react';
import {
  CartItem,
  CartState,
  ShippingZone,
  calculateShipping,
  MAX_BOTTLES,
} from '@/types/order';

const CART_KEY = 'flor-de-mojito-cart-v2';

function notifyCartUpdate() {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new Event('cart-updated'));
  }
}

const defaultState: CartState = {
  items: [],
  zone: 'peninsula',
  breakageInsurance: false,
};

function loadFromStorage(): CartState {
  if (typeof window === 'undefined') return defaultState;
  try {
    const saved = localStorage.getItem(CART_KEY);
    if (saved) return { ...defaultState, ...JSON.parse(saved) };
  } catch {
    /* ignore */
  }
  return defaultState;
}

export function useCart() {
  const [state, setState] = useState<CartState>(defaultState);
  const [isOpen, setIsOpenState] = useState(false);

  // Hydrate from localStorage on mount
  useEffect(() => {
    setState(loadFromStorage());

    const handleUpdate = () => setState(loadFromStorage());
    const handleOpen = () => setIsOpenState(true);
    const handleClose = () => setIsOpenState(false);

    window.addEventListener('cart-updated', handleUpdate);
    window.addEventListener('open-cart', handleOpen);
    window.addEventListener('close-cart', handleClose);

    return () => {
      window.removeEventListener('cart-updated', handleUpdate);
      window.removeEventListener('open-cart', handleOpen);
      window.removeEventListener('close-cart', handleClose);
    };
  }, []);

  const saveState = useCallback((newState: CartState) => {
    setState(newState);
    localStorage.setItem(CART_KEY, JSON.stringify(newState));
    notifyCartUpdate();
  }, []);

  // ── Cart actions ─────────────────────────────────────────────────────────────

  const addItem = useCallback(
    (product: Omit<CartItem, 'quantity' | 'weight'>, quantity: number) => {
      setState((prev) => {
        const totalBottles = prev.items.reduce((s, i) => s + i.quantity, 0);
        const canAdd = Math.min(quantity, MAX_BOTTLES - totalBottles);
        if (canAdd <= 0) return prev;

        const existing = prev.items.find((i) => i.id === product.id);
        let newItems: CartItem[];
        if (existing) {
          newItems = prev.items.map((i) =>
            i.id === product.id
              ? { ...i, quantity: Math.min(MAX_BOTTLES, i.quantity + canAdd) }
              : i
          );
        } else {
          newItems = [
            ...prev.items,
            { ...product, quantity: canAdd, weight: 1.6 },
          ];
        }

        const newState = { ...prev, items: newItems };
        localStorage.setItem(CART_KEY, JSON.stringify(newState));
        notifyCartUpdate();
        return newState;
      });

      // Open cart
      setIsOpenState(true);
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new Event('open-cart'));
      }
    },
    []
  );

  const removeItem = useCallback((id: string) => {
    setState((prev) => {
      const newState = { ...prev, items: prev.items.filter((i) => i.id !== id) };
      localStorage.setItem(CART_KEY, JSON.stringify(newState));
      notifyCartUpdate();
      return newState;
    });
  }, []);

  const updateQuantity = useCallback((id: string, delta: number) => {
    setState((prev) => {
      const totalOthers = prev.items
        .filter((i) => i.id !== id)
        .reduce((s, i) => s + i.quantity, 0);

      const newItems = prev.items
        .map((i) => {
          if (i.id !== id) return i;
          const newQty = Math.max(1, Math.min(MAX_BOTTLES - totalOthers, i.quantity + delta));
          return { ...i, quantity: newQty };
        })
        .filter((i) => i.quantity > 0);

      const newState = { ...prev, items: newItems };
      localStorage.setItem(CART_KEY, JSON.stringify(newState));
      notifyCartUpdate();
      return newState;
    });
  }, []);

  const setZone = useCallback((zone: ShippingZone) => {
    saveState({ ...state, zone });
  }, [state, saveState]);

  const setBreakageInsurance = useCallback((val: boolean) => {
    saveState({ ...state, breakageInsurance: val });
  }, [state, saveState]);

  const clearCart = useCallback(() => {
    const cleared = { ...defaultState };
    setState(cleared);
    localStorage.removeItem(CART_KEY);
    notifyCartUpdate();
  }, []);

  const setIsOpen = useCallback((val: boolean) => {
    setIsOpenState(val);
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new Event(val ? 'open-cart' : 'close-cart'));
    }
  }, []);

  // ── Derived values ───────────────────────────────────────────────────────────

  const items = state.items;
  const zone = state.zone;
  const breakageInsurance = state.breakageInsurance;

  const itemCount = items.reduce((s, i) => s + i.quantity, 0);
  const bottleCount = itemCount; // same since all are bottles
  const subtotal = items.reduce((s, i) => s + i.price * i.quantity, 0);

  const shipping = calculateShipping(bottleCount, zone, breakageInsurance);
  const shippingCost = shipping.total;
  const isFreeShipping = shipping.isFree;
  const transitTime = shipping.transitTime;

  const subtotalWithIva = subtotal; // price already includes IVA display; we break it down at checkout
  const total = parseFloat((subtotal + shippingCost).toFixed(2));

  // How many bottles until free shipping (peninsula only)
  const bottlesUntilFreeShipping =
    zone === 'peninsula' ? Math.max(0, 2 - bottleCount) : 0;

  return {
    // state
    items,
    zone,
    breakageInsurance,
    isOpen,
    // computed
    itemCount,
    bottleCount,
    subtotal,
    shippingCost,
    isFreeShipping,
    transitTime,
    total,
    bottlesUntilFreeShipping,
    shipping,
    // actions
    addItem,
    removeItem,
    updateQuantity,
    setZone,
    setBreakageInsurance,
    clearCart,
    setIsOpen,
  };
}
