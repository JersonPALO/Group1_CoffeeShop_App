import { createContext, useState } from 'react';

// Global "teleportation system" for favorites and cart (Lesson 7: Context API)
export const CoffeeContext = createContext();

export function CoffeeProvider({ children }) {
  const [favorites, setFavorites] = useState([]);
  const [cart, setCart] = useState([]);

  // Add or Remove Favorites
  const toggleFav = (id) => {
    let updated;

    if (favorites.includes(id)) {
      updated = favorites.filter((item) => item !== id);
    } else {
      updated = [...favorites, id];
    }

    setFavorites(updated);
  };

  // Add coffee to cart
  const addToCart = (item) => {
    setCart([...cart, item]);
  };

  // Remove coffee from cart
  const removeFromCart = (cartId) => {
    const updatedCart = cart.filter((item) => item.cartId !== cartId);
    setCart(updatedCart);
  };

  // Clear all items in cart
  const clearCart = () => {
    setCart([]);
  };

  return (
    <CoffeeContext.Provider
      value={{ favorites, cart, toggleFav, addToCart, removeFromCart, clearCart }}
    >
      {children}
    </CoffeeContext.Provider>
  );
}