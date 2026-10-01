import { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AsyncStorage from "@react-native-async-storage/async-storage";

import HomeScreen from "./src/screens/HomeScreen";
import DetailsScreen from "./src/screens/DetailsScreen";
import FavoritesScreen from "./src/screens/FavoritesScreen";
import CartScreen from "./src/screens/CartScreen";

const Stack = createNativeStackNavigator();

export default function App() {

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
    AsyncStorage.setItem("@favs", JSON.stringify(updated));
  };

  // Add coffee to cart
  const addToCart = (item) => {
    setCart([...cart, item]);
  };

  // Remove coffee from cart
  const removeFromCart = (cartId) => {
    const updatedCart = cart.filter(
      (item) => item.cartId !== cartId
    );

    setCart(updatedCart);
  };

  // Clear all items in cart
  const clearCart = () => {
    setCart([]);
  };

  return (
    <NavigationContainer>
      <Stack.Navigator>

        <Stack.Screen name="Menu">
          {(props) => (
            <HomeScreen
              {...props}
              favorites={favorites}
              toggleFav={toggleFav}
            />
          )}
        </Stack.Screen>

        <Stack.Screen name="Details">
          {(props) => (
            <DetailsScreen
              {...props}
              addToCart={addToCart}
            />
          )}
        </Stack.Screen>

        <Stack.Screen name="Favorites">
          {(props) => (
            <FavoritesScreen
              {...props}
              favorites={favorites}
              toggleFav={toggleFav}
            />
          )}
        </Stack.Screen>

        <Stack.Screen name="Cart">
          {(props) => (
            <CartScreen
              {...props}
              cart={cart}
              removeFromCart={removeFromCart}
              clearCart={clearCart}
            />
          )}
        </Stack.Screen>

      </Stack.Navigator>
    </NavigationContainer>
  );
}