import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

import HomeScreen from './screens/HomeScreen';
import DetailsScreen from './screens/DetailsScreen';
import FavoritesScreen from './screens/FavoritesScreen';
import CartScreen from './screens/CartScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  const [favorites, setFavorites] = useState([]);
  const [cart, setCart] = useState([]);

  // Load saved favorites on startup
  useEffect(() => {
    AsyncStorage.getItem('@favs').then((data) => {
      if (data) setFavorites(JSON.parse(data));
    });
  }, []);

  // Save/Remove favorites
  const toggleFav = (id) => {
    const updated = favorites.includes(id) ? favorites.filter((f) => f !== id) : [...favorites, id];
    setFavorites(updated);
    AsyncStorage.setItem('@favs', JSON.stringify(updated));
  };

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Menu">
          {(props) => <HomeScreen {...props} favorites={favorites} toggleFav={toggleFav} />}
        </Stack.Screen>
        <Stack.Screen name="Details">
          {(props) => <DetailsScreen {...props} addToCart={(item) => setCart([...cart, item])} />}
        </Stack.Screen>
        <Stack.Screen name="Favorites">
          {(props) => <FavoritesScreen {...props} favorites={favorites} toggleFav={toggleFav} />}
        </Stack.Screen>
        <Stack.Screen name="Cart">
          {(props) => (
            <CartScreen
              {...props}
              cart={cart}
              removeFromCart={(id) => setCart(cart.filter((c) => c.cartId !== id))}
              clearCart={() => setCart([])}
            />
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}