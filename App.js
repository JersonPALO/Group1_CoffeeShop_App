import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

import HomeScreen from './src/screens/HomeScreen';
import DetailsScreen from './src/screens/DetailsScreen';
import FavoritesScreen from './src/screens/FavoritesScreen';
import CartScreen from './src/screens/CartScreen';

// ⚠️ THIS LINE MUST BE HERE OUTSIDE THE APP FUNCTION ⚠️
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
    const updated = favorites.includes(id) 
      ? favorites.filter((f) => f !== id) 
      : [...favorites, id];
    setFavorites(updated);
    AsyncStorage.setItem('@favs', JSON.stringify(updated));
  };

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: '#4A2C2A' },
          headerTintColor: '#FFFFFF',
          headerTitleStyle: { fontWeight: 'bold' },
          contentStyle: { backgroundColor: '#F9F6F0' },
        }}
      >
        <Stack.Screen name="Menu">
          {(props) => (
            <HomeScreen {...props} favorites={favorites} toggleFav={toggleFav} />
          )}
        </Stack.Screen>

        <Stack.Screen name="Details" options={{ title: 'Customize Drink' }}>
          {(props) => (
            <DetailsScreen 
              {...props} 
              addToCart={(item) => setCart([...cart, item])} 
            />
          )}
        </Stack.Screen>

        <Stack.Screen name="Favorites" options={{ title: 'Saved Favorites' }}>
          {(props) => (
            <FavoritesScreen {...props} favorites={favorites} toggleFav={toggleFav} />
          )}
        </Stack.Screen>

        <Stack.Screen name="Cart" options={{ title: 'Your Order' }}>
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