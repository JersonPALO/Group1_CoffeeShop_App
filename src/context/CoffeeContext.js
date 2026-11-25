import { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { DEMO_ACCOUNT } from '../data/demoAccount';
import { MENU_IMAGES } from '../data/menuImages';

// Global "teleportation system" for favorites and cart (Lesson 7: Context API)
export const CoffeeContext = createContext();

const FAVORITES_KEY = 'favorites';
const CART_KEY = 'cart';
const USER_KEY = 'user';
const ORDERS_KEY = 'orders';
// The menu lives in menu.json inside our own GitHub repo.
// Replace YOUR-USERNAME and YOUR-REPO with the real ones.
const MENU_API = 'https://raw.githubusercontent.com/JersonPalo/Group1_CoffeeShop_App/main/menu.json';

export function CoffeeProvider({ children }) {
  const [favorites, setFavorites] = useState([]);
  const [cart, setCart] = useState([]);
  const [orders, setOrders] = useState([]); // order history
  const [menu, setMenu] = useState([]); // coffee menu (from the API)
  const [menuLoading, setMenuLoading] = useState(true);
  const [menuError, setMenuError] = useState(null);
  const [user, setUser] = useState(null); // null means logged out
  const [isLoading, setIsLoading] = useState(true); // Lesson 7: loading state
  const [error, setError] = useState(null); // Lesson 7: error state

  // READ: load saved favorites and cart once when the app starts (Lesson 8)
  useEffect(() => {
    const loadData = async () => {
      try {
        const savedFavorites = await AsyncStorage.getItem(FAVORITES_KEY);
        if (savedFavorites !== null) {
          setFavorites(JSON.parse(savedFavorites)); // string -> array
        }

        const savedCart = await AsyncStorage.getItem(CART_KEY);
        if (savedCart !== null) {
          setCart(JSON.parse(savedCart)); // string -> array
        }

        const savedOrders = await AsyncStorage.getItem(ORDERS_KEY);
        if (savedOrders !== null) {
          setOrders(JSON.parse(savedOrders)); // string -> array
        }

        const savedUser = await AsyncStorage.getItem(USER_KEY);
        if (savedUser !== null) {
          setUser(JSON.parse(savedUser)); // string -> object
        }
      } catch (err) {
        console.log('Failed to load saved data', err);
        setError('Could not load your saved favorites and cart.');
      } finally {
        setIsLoading(false); // loading is done, whether it worked or not
      }
    };

    loadData();
  }, []);

  // Lesson 6: fetch the menu from a REST API using async/await
  const loadMenu = async () => {
    setMenuLoading(true);
    setMenuError(null);

    try {
      const response = await fetch(MENU_API);

      if (!response.ok) {
        throw new Error('Server error: ' + response.status);
      }

      const data = await response.json();

      // Turn each image name (like "espresso") into the bundled picture
      const items = data.map((coffee) => ({
        ...coffee,
        image: MENU_IMAGES[coffee.image] || MENU_IMAGES.espresso,
      }));

      setMenu(items);
    } catch (err) {
      console.log('Failed to fetch menu', err);
      setMenuError('Could not load the menu. Check your internet connection.');
    } finally {
      setMenuLoading(false);
    }
  };

  // Lifecycle (mount): fetch the menu once when the app starts
  useEffect(() => {
    loadMenu();
  }, []);

  // CREATE: add a finished order to the history (newest first) and save it
  const addOrder = async (order) => {
    const updatedOrders = [order, ...orders];
    setOrders(updatedOrders);

    try {
      await AsyncStorage.setItem(ORDERS_KEY, JSON.stringify(updatedOrders)); // array -> string
    } catch (err) {
      console.log('Failed to save orders', err);
    }
  };

  // Log in with the demo account. Returns true if the details match.
  const login = (email, password) => {
    if (email === DEMO_ACCOUNT.email && password === DEMO_ACCOUNT.password) {
      const loggedInUser = { name: DEMO_ACCOUNT.name, email: DEMO_ACCOUNT.email };
      setUser(loggedInUser);
      AsyncStorage.setItem(USER_KEY, JSON.stringify(loggedInUser)).catch((err) =>
        console.log('Failed to save user', err)
      );
      return true;
    }
    return false;
  };

  // Log out: forget the user (favorites and cart are kept)
  const logout = () => {
    setUser(null);
    AsyncStorage.removeItem(USER_KEY).catch((err) =>
      console.log('Failed to remove user', err)
    );
  };

  // Save the cart array to storage
  const saveCart = async (updated) => {
    try {
      await AsyncStorage.setItem(CART_KEY, JSON.stringify(updated)); // array -> string
    } catch (error) {
      console.log('Failed to save cart', error);
    }
  };

  // CREATE / DELETE: update the array, then save it to storage
  const saveFavorites = async (updated) => {
    try {
      await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(updated)); // array -> string
    } catch (error) {
      console.log('Failed to save favorites', error);
    }
  };

  // Add or Remove Favorites
  const toggleFav = (id) => {
    let updated;

    if (favorites.includes(id)) {
      updated = favorites.filter((item) => item !== id);
    } else {
      updated = [...favorites, id];
    }

    setFavorites(updated);
    saveFavorites(updated);
  };

  // Add coffee to cart
  const addToCart = (item) => {
    const updatedCart = [...cart, item];
    setCart(updatedCart);
    saveCart(updatedCart);
  };

  // Remove coffee from cart
  const removeFromCart = (cartId) => {
    const updatedCart = cart.filter((item) => item.cartId !== cartId);
    setCart(updatedCart);
    saveCart(updatedCart);
  };

  // Clear all items in cart
  const clearCart = () => {
    setCart([]);
    saveCart([]);
  };

  return (
    <CoffeeContext.Provider
      value={{
        favorites,
        cart,
        menu,
        menuLoading,
        menuError,
        loadMenu,
        orders,
        addOrder,
        user,
        login,
        logout,
        isLoading,
        error,
        toggleFav,
        addToCart,
        removeFromCart,
        clearCart,
      }}
    >
      {children}
    </CoffeeContext.Provider>
  );
}