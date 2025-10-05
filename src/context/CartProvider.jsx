import { useState, useMemo, useCallback } from "react";
import { CartContext } from "./CartContext";

export default function CartProvider({ children }) {
  const [cart, setCart] = useState([]); // [{id,name,image,price,count}]

  const addItem = useCallback((item, qty = 1) => {
    setCart(prev => {
      const i = prev.findIndex(p => p.id === item.id);
      if (i >= 0) {
        const copy = [...prev];
        copy[i] = { ...copy[i], count: copy[i].count + qty };
        return copy;
      }
      return [...prev, { id: item.id, name: item.name, image: item.image, price: item.price, count: qty }];
    });
  }, []);

  const removeItem = useCallback((id) => {
    setCart(prev => prev.filter(p => p.id !== id));
  }, []);

  const clearCart = useCallback(() => setCart([]), []);

  const increase = useCallback((id) => {
    setCart(prev => prev.map(p => p.id === id ? { ...p, count: p.count + 1 } : p));
  }, []);

  const decrease = useCallback((id) => {
    setCart(prev => prev.flatMap(p => {
      if (p.id !== id) return p;
      const next = p.count - 1;
      return next > 0 ? { ...p, count: next } : [];
    }));
  }, []);

  const getCount = useMemo(
    () => () => cart.reduce((acc, p) => acc + p.count, 0),
    [cart]
  );

  const getTotal = useMemo(
    () => () => cart.reduce((acc, p) => acc + (Number(p.price) || 0) * p.count, 0),
    [cart]
  );

  const value = { cart, addItem, removeItem, clearCart, increase, decrease, getCount, getTotal };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
