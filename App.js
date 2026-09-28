<Stack.Navigator
  screenOptions={{
    headerStyle: { backgroundColor: '#4A2C2A' },
    headerTintColor: '#FFFFFF',
    headerTitleStyle: { fontWeight: 'bold' },
    contentStyle: { backgroundColor: '#F9F6F0' },
  }}
>
  <Stack.Screen name="Menu">
    {(props) => <HomeScreen {...props} favorites={favorites} toggleFav={toggleFav} />}
  </Stack.Screen>
  <Stack.Screen name="Details" options={{ title: 'Customize Drink' }}>
    {(props) => <DetailsScreen {...props} addToCart={(item) => setCart([...cart, item])} />}
  </Stack.Screen>
  <Stack.Screen name="Favorites" options={{ title: 'Saved Favorites' }}>
    {(props) => <FavoritesScreen {...props} favorites={favorites} toggleFav={toggleFav} />}
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