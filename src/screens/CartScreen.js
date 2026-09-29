import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function CartScreen({ cart, removeFromCart, clearCart }) {
  const total = cart.reduce((sum, item) => sum + item.price, 0);

  if (cart.length === 0) {
    return (
      <SafeAreaView style={styles.emptyContainer}>
        <Text style={styles.emptyTitle}>
          Your Cart is Empty
        </Text>

        <Text style={styles.emptyText}>
          Add a coffee to your cart to continue.
        </Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
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
      <TouchableOpacity style={styles.btn} onPress={() => { 
        Alert.alert(
          "Order Successful",
      `Thank you for your order!`
        ); 
        clearCart(); 
        }}>
        <Text style={{ color: '#fff', fontWeight: 'bold' }}>Checkout</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    padding: 15,
    backgroundColor: "#F8F4E3",
    paddingBottom: 50,
  },
  
  card: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    padding: 15, 
    backgroundColor: '#ffffff',  
    marginBottom: 12,
    borderRadius: 12,
    elevation: 3,
  },
  
  title: { 
    fontWeight: 'bold' 
  },
  
  total: { 
    fontSize: 18, 
    fontWeight: 'bold', 
    textAlign: 'right', 
    marginVertical: 10 
  },
  
  btn: { 
    backgroundColor: 'green', 
    padding: 15, 
    borderRadius: 5, 
    alignItems: 'center' 
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },

  emptyTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#3E2723",
  },

  emptyText: {
    marginTop: 10,
    fontSize: 15,
    color: "gray",
    textAlign: "center",
  },

  removeButton: {
    backgroundColor: "#E53935",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
  },

  removeText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 14,
  },
});