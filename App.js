import { useContext } from "react";
import { View, Text, ActivityIndicator } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { CoffeeProvider, CoffeeContext } from "./src/context/CoffeeContext";
import LoginScreen from "./src/screens/LoginScreen";
import HomeScreen from "./src/screens/HomeScreen";
import DetailsScreen from "./src/screens/DetailsScreen";
import FavoritesScreen from "./src/screens/FavoritesScreen";
import CartScreen from "./src/screens/CartScreen";
import ProfileScreen from "./src/screens/ProfileScreen";
import ReceiptScreen from "./src/screens/ReceiptScreen";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// Lesson 7: the four main sections of the app as bottom tabs
function MainTabs() {
  const { favorites, cart } = useContext(CoffeeContext);

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: "#6F4E37",
      }}
    >
      <Tab.Screen
        name="Menu"
        component={HomeScreen}
        options={{ tabBarIcon: () => <Text>☕</Text> }}
      />
      <Tab.Screen
        name="Favorites"
        component={FavoritesScreen}
        options={{
          tabBarIcon: () => <Text>★</Text>,
          tabBarBadge: favorites.length > 0 ? favorites.length : undefined,
        }}
      />
      <Tab.Screen
        name="Cart"
        component={CartScreen}
        options={{
          tabBarIcon: () => <Text>🛒</Text>,
          tabBarBadge: cart.length > 0 ? cart.length : undefined,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ tabBarIcon: () => <Text>👤</Text> }}
      />
    </Tab.Navigator>
  );
}

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
          // Logged in: the tabs, with Details and Receipt stacked on top
          <>
            <Stack.Screen
              name="Main"
              component={MainTabs}
              options={{ headerShown: false }}
            />
            <Stack.Screen name="Details" component={DetailsScreen} />
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