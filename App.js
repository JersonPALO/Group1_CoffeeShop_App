import { useContext } from "react";
import { View, ActivityIndicator } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { CoffeeProvider, CoffeeContext } from "./src/context/CoffeeContext";
import LoginScreen from "./src/screens/LoginScreen";
import HomeScreen from "./src/screens/HomeScreen";
import DetailsScreen from "./src/screens/DetailsScreen";
import FavoritesScreen from "./src/screens/FavoritesScreen";
import CartScreen from "./src/screens/CartScreen";
import ProfileScreen from "./src/screens/ProfileScreen";
import ReceiptScreen from "./src/screens/ReceiptScreen";

const Stack = createNativeStackNavigator();

// Lives inside the provider so it can read the logged-in user from context
function AppNavigator() {
  const { user, isLoading } = useContext(CoffeeContext);

  // Wait until the saved login has been checked
  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center" }}>
        <ActivityIndicator size="large" color="#6F4E37" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {user === null ? (
          // Logged out: only the Login screen exists
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{ headerShown: false }}
          />
        ) : (
          // Logged in: the whole app
          <>
            <Stack.Screen name="Menu" component={HomeScreen} />
            <Stack.Screen name="Details" component={DetailsScreen} />
            <Stack.Screen name="Favorites" component={FavoritesScreen} />
            <Stack.Screen name="Cart" component={CartScreen} />
            <Stack.Screen name="Profile" component={ProfileScreen} />
            <Stack.Screen name="Receipt" component={ReceiptScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <CoffeeProvider>
      <AppNavigator />
    </CoffeeProvider>
  );
}