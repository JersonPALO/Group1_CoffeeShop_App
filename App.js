import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { CoffeeProvider } from "./src/context/CoffeeContext";
import HomeScreen from "./src/screens/HomeScreen";
import DetailsScreen from "./src/screens/DetailsScreen";
import FavoritesScreen from "./src/screens/FavoritesScreen";
import CartScreen from "./src/screens/CartScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <CoffeeProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Menu" component={HomeScreen} />
          <Stack.Screen name="Details" component={DetailsScreen} />
          <Stack.Screen name="Favorites" component={FavoritesScreen} />
          <Stack.Screen name="Cart" component={CartScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </CoffeeProvider>
  );
}