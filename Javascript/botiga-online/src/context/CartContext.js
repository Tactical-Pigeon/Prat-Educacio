import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const afegirAlCarret = (producte, quantitat = 1) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === producte.id);
      if (existing) {
        return prev.map((item) =>
          item.id === producte.id
            ? { ...item, quantitat: item.quantitat + quantitat }
            : item
        );
      } else {
        return [...prev, { ...producte, quantitat }];
      }
    });
  };

  const eliminarDelCarret = (producteId) => {
    setCartItems((prev) => prev.filter((item) => item.id !== producteId));
  };

  const modificarQuantitat = (producteId, quantitat) => {
    if (quantitat <= 0) {
      eliminarDelCarret(producteId);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === producteId ? { ...item, quantitat } : item
      )
    );
  };

  const buidarCarret = () => {
    setCartItems([]);
  };

  const calcularTotal = () => {
    return cartItems.reduce((total, item) => total + item.preu * item.quantitat, 0);
  };

  const nombreArticles = cartItems.reduce((total, item) => total + item.quantitat, 0);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        afegirAlCarret,
        eliminarDelCarret,
        modificarQuantitat,
        buidarCarret,
        calcularTotal,
        nombreArticles,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};