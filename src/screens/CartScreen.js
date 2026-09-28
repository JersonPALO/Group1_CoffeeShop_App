import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert } from 'react-native';

export default function CartScreen({ cart, removeFromCart, clearCart }) {
  const total = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <View style={styles.container}>
      <FlatList
        data={cart}
        keyExtractor={(item) => item.cartId}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View>
              <Text style={styles.title}>{item.name}</Text>
              <Text>{item.size} | {item.sugar} Sugar</Text>
            </View>
            <TouchableOpacity onPress={() => removeFromCart(item.cartId)}>
              <Text style={{ color: 'red' }}>Remove</Text>
            </TouchableOpacity>
          </View>
        )}
      />
      <Text style={styles.total}>Total: ${total.toFixed(2)}</Text>
      <TouchableOpacity style={styles.btn} onPress={() => { Alert.alert('Order Placed!'); clearCart(); }}>
        <Text style={{ color: '#fff', fontWeight: 'bold' }}>Checkout</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 15 },
  card: { flexDirection: 'row', justifyContent: 'space-between', padding: 15, backgroundColor: '#fff', marginBottom: 10 },
  title: { fontWeight: 'bold' },
  total: { fontSize: 18, fontWeight: 'bold', textAlign: 'right', marginVertical: 10 },
  btn: { backgroundColor: 'green', padding: 15, borderRadius: 5, alignItems: 'center' },
});