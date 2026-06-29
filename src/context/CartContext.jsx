import { createContext, useContext, useState, useCallback } from 'react';

const CartCtx = createContext(null);

export function CartProvider({ children }) {
  const [items, setItems]   = useState([]);
  const [open, setOpen]     = useState(false);

  const addToCart = useCallback((shoe, size) => {
    const key = `${shoe.id}-${size}`;
    setItems(prev => {
      const hit = prev.find(i => i.key === key);
      if (hit) return prev.map(i => i.key === key ? { ...i, qty: i.qty + 1 } : i);
      return [...prev, { key, id: shoe.id, name: shoe.name, sub: shoe.sub,
        price: shoe.price, image: shoe.image, size, qty: 1 }];
    });
    setOpen(true);
  }, []);

  const remove = useCallback(key => setItems(p => p.filter(i => i.key !== key)), []);

  const setQty = useCallback((key, qty) => {
    if (qty < 1) { remove(key); return; }
    setItems(p => p.map(i => i.key === key ? { ...i, qty } : i));
  }, [remove]);

  const clear = () => setItems([]);

  const count    = items.reduce((s, i) => s + i.qty, 0);
  const subtotal = items.reduce((s, i) => s + parseFloat(i.price.replace('$', '')) * i.qty, 0);

  return (
    <CartCtx.Provider value={{ items, addToCart, remove, setQty, clear, count, subtotal, open, setOpen }}>
      {children}
    </CartCtx.Provider>
  );
}

export const useCart = () => useContext(CartCtx);
