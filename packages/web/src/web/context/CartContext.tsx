import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import type { Product, PricingTier } from "../data/products";

export type CartItem = {
  product: Product;
  tier: PricingTier;
  quantity: number;
};

type CartContextType = {
  items: CartItem[];
  addItem: (product: Product, tier: PricingTier) => void;
  removeItem: (productId: string, tierLabel: string) => void;
  updateQty: (productId: string, tierLabel: string, qty: number) => void;
  clearCart: () => void;
  total: number;
  itemCount: number;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
};

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(() => {
    try { const s = localStorage.getItem('cv_cart'); return s ? JSON.parse(s) : []; }
    catch { return []; }
  });
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => { localStorage.setItem('cv_cart', JSON.stringify(items)); }, [items]);

  const addItem = (product: Product, tier: PricingTier) => {
    setItems((prev) => {
      const existing = prev.find(
        (i) => i.product.id === product.id && i.tier.label === tier.label
      );
      if (existing) {
        return prev.map((i) =>
          i.product.id === product.id && i.tier.label === tier.label
            ? { ...i, quantity: i.quantity + 1 }
            : i
        );
      }
      return [...prev, { product, tier, quantity: 1 }];
    });
    setIsOpen(true);
  };

  const removeItem = (productId: string, tierLabel: string) => {
    setItems((prev) =>
      prev.filter((i) => !(i.product.id === productId && i.tier.label === tierLabel))
    );
  };

  const updateQty = (productId: string, tierLabel: string, qty: number) => {
    if (qty <= 0) {
      removeItem(productId, tierLabel);
      return;
    }
    setItems((prev) =>
      prev.map((i) =>
        i.product.id === productId && i.tier.label === tierLabel
          ? { ...i, quantity: qty }
          : i
      )
    );
  };

  const clearCart = () => { setItems([]); localStorage.removeItem('cv_cart'); };

  const total = items.reduce(
    (sum, item) => sum + item.tier.inr * item.quantity,
    0
  );

  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQty,
        clearCart,
        total,
        itemCount,
        isOpen,
        setIsOpen,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
