import { useContext } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { CoffeeContext } from '../context/CoffeeContext';
import { styles } from '../styles/GlobalStyles';

export default function CartScreen({ navigation }) {
  const { cart, user, removeFromCart, clearCart } = useContext(CoffeeContext);
  const total = cart.reduce((sum, item) => sum + item.price, 0);

  // Build the order, empty the cart, then show the receipt
  const handleCheckout = () => {
    const order = {
      orderNumber: Date.now().toString().slice(-6),
      date: new Date().toLocaleString(),
      customer: user.name,
      items: cart,
      total: total,
    };

    clearCart();
    navigation.navigate('Receipt', { order });
  };

  if (cart.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyTitle}>
          Your Cart is Empty
        </Text>

        <Text style={styles.emptyText}>
          Add a coffee to your cart to continue.
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.cartcontainer}>
      <FlatList
        data={cart}
        keyExtractor={(item) => item.cartId}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View>
              <Text style={styles.title}>{item.name}</Text>
              <Text>{item.size} | {item.sugar} Sugar</Text>
            </View>
            <TouchableOpacity
                style={styles.removeButton}
                onPress={() => removeFromCart(item.cartId)}
            >
                <Text style={styles.removeText}>
                    Remove
                </Text>
            </TouchableOpacity>
          </View>
        )}
      />
      <Text style={styles.total}>Total: ₱{total.toFixed(2)}</Text>
      <TouchableOpacity style={styles.cartbtn} onPress={handleCheckout}>
        <Text style={{ color: '#fff', fontWeight: 'bold' }}>Checkout</Text>
      </TouchableOpacity>
    </View>
  );
}