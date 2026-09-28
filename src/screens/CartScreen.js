import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert } from 'react-native';

export default function CartScreen({ cart, removeFromCart, clearCart }) {
  const total = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <View style={styles.container}>
      {cart.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyIcon}>🛒</Text>
          <Text style={styles.emptyText}>Your cart is empty!</Text>
        </View>
      ) : (
        <>
          <FlatList
            data={cart}
            keyExtractor={(item) => item.cartId}
            contentContainerStyle={styles.listPadding}
            renderItem={({ item }) => (
              <View style={styles.card}>
                <View style={styles.itemInfo}>
                  <Text style={styles.title}>{item.name}</Text>
                  <Text style={styles.subText}>{item.size} • {item.sugar} Sugar</Text>
                  <Text style={styles.price}>${item.price.toFixed(2)}</Text>
                </View>
                <TouchableOpacity style={styles.removeBtn} onPress={() => removeFromCart(item.cartId)}>
                  <Text style={styles.removeText}>Remove</Text>
                </TouchableOpacity>
              </View>
            )}
          />

          {/* Checkout Bar */}
          <View style={styles.footer}>
            <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>Total Amount:</Text>
              <Text style={styles.totalPrice}>${total.toFixed(2)}</Text>
            </View>
            <TouchableOpacity 
              style={styles.checkoutBtn} 
              activeOpacity={0.8}
              onPress={() => {
                Alert.alert('Order Confirmed!', 'Your coffee is being prepared.');
                clearCart();
              }}
            >
              <Text style={styles.checkoutText}>Place Order</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#ae9a72' },
  listPadding: { padding: 16 },
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 14,
    marginBottom: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  itemInfo: { flex: 1 },
  title: { fontSize: 16, fontWeight: 'bold', color: '#2C1810' },
  subText: { fontSize: 13, color: '#8D7B68', marginVertical: 3 },
  price: { fontSize: 14, fontWeight: '700', color: '#D4A373' },
  removeBtn: { backgroundColor: '#FFE5E5', paddingVertical: 6, paddingHorizontal: 12, borderRadius: 8 },
  removeText: { color: '#D90429', fontWeight: 'bold', fontSize: 12 },
  emptyContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  emptyIcon: { fontSize: 50, marginBottom: 10 },
  emptyText: { fontSize: 16, color: '#f8f6f4', fontWeight: '600' },
  footer: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
  },
  totalRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 15 },
  totalLabel: { fontSize: 16, color: '#666', fontWeight: '600' },
  totalPrice: { fontSize: 22, fontWeight: 'bold', color: '#2C1810' },
  checkoutBtn: { backgroundColor: '#2D6A4F', paddingVertical: 15, borderRadius: 25, alignItems: 'center' },
  checkoutText: { color: '#FFFFFF', fontWeight: 'bold', fontSize: 16 },
});