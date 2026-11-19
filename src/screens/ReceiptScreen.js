import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { styles, receiptStyles } from '../styles/GlobalStyles';

export default function ReceiptScreen({ route, navigation }) {
  // Receive the order sent from the Cart screen (Lesson 5: route.params)
  const { order } = route.params;

  return (
    <ScrollView style={styles.container}>
      <View style={receiptStyles.receiptCard}>
        <Text style={receiptStyles.shopName}>Coffee Shop</Text>
        <Text style={receiptStyles.thanks}>Thank you for your order!</Text>

        <View style={receiptStyles.divider} />

        <View style={receiptStyles.row}>
          <Text>Order No.</Text>
          <Text>{order.orderNumber}</Text>
        </View>
        <View style={receiptStyles.row}>
          <Text>Date</Text>
          <Text>{order.date}</Text>
        </View>
        <View style={receiptStyles.row}>
          <Text>Customer</Text>
          <Text>{order.customer}</Text>
        </View>

        <View style={receiptStyles.divider} />

        {order.items.map((item) => (
          <View key={item.cartId} style={receiptStyles.row}>
            <View>
              <Text style={receiptStyles.itemName}>{item.name}</Text>
              <Text style={receiptStyles.itemDetail}>
                {item.size} | {item.sugar} Sugar
              </Text>
            </View>
            <Text>₱{item.price.toFixed(2)}</Text>
          </View>
        ))}

        <View style={receiptStyles.divider} />

        <View style={receiptStyles.totalRow}>
          <Text style={receiptStyles.totalText}>Total</Text>
          <Text style={receiptStyles.totalText}>₱{order.total.toFixed(2)}</Text>
        </View>
      </View>

      <TouchableOpacity
        style={[styles.addBtn, { marginBottom: 30 }]}
        onPress={() => navigation.navigate('Menu')}
      >
        <Text style={{ color: '#fff', fontWeight: 'bold' }}>Back to Menu</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}