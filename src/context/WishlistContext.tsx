"use client";

import { createContext, useContext, useReducer, useEffect, useCallback } from "react";
import { Product } from "@/data/products";

type WishlistState = { items: Product[] };
type WishlistAction =
  | { type: "TOGGLE"; product: Product }
  | { type: "HYDRATE"; items: Product[] };

function wishlistReducer(state: WishlistState, action: WishlistAction): WishlistState {
  switch (action.type) {
    case "HYDRATE":
      return { items: action.items };
    case "TOGGLE": {
      const exists = state.items.some((p) => p.id === action.product.id);
      return {
        items: exists
          ? state.items.filter((p) => p.id !== action.product.id)
          : [...state.items, action.product],
      };
    }
    default:
      return state;
  }
}

type WishlistContextValue = {
  items: Product[];
  toggle: (product: Product) => void;
  isWishlisted: (id: string) => boolean;
  count: number;
};

const WishlistContext = createContext<WishlistContextValue | null>(null);
const STORAGE_KEY = "lapstore_wishlist";

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(wishlistReducer, { items: [] });

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) dispatch({ type: "HYDRATE", items: JSON.parse(raw) });
    } catch { /* ignore */ }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state.items));
  }, [state.items]);

  const toggle = useCallback((product: Product) => {
    dispatch({ type: "TOGGLE", product });
  }, []);

  const isWishlisted = useCallback((id: string) => state.items.some((p) => p.id === id), [state.items]);

  return (
    <WishlistContext.Provider value={{ items: state.items, toggle, isWishlisted, count: state.items.length }}>
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error("useWishlist must be used inside WishlistProvider");
  return ctx;
}
