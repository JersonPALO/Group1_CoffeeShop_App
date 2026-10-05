import { View, Text, FlatList, TouchableOpacity, Alert } from 'react-native';
import { styles } from '../styles/GlobalStyles';

export default function CartScreen({ cart, removeFromCart, clearCart }) {
  const total = cart.reduce((sum, item) => sum + item.price, 0);

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
      <TouchableOpacity style={styles.cartbtn} onPress={() => { 
        Alert.alert(
          "Order Successful",
      `Thank you for your order!`
        ); 
        clearCart(); 
        }}>
        <Text style={{ color: '#fff', fontWeight: 'bold' }}>Checkout</Text>
      </TouchableOpacity>
    </View>
  );
}
