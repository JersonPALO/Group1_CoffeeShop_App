import { useContext } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { CoffeeContext } from '../context/CoffeeContext';
import { styles, authStyles } from '../styles/GlobalStyles';

export default function ProfileScreen({ navigation }) {
  const { user, favorites, cart, orders, logout } = useContext(CoffeeContext);

  return (
    <View style={styles.container}>
      <View style={authStyles.profileCard}>
        <Text style={authStyles.profileName}>{user.name}</Text>
        <Text style={authStyles.profileLabel}>{user.email}</Text>

        <View style={authStyles.profileRow}>
          <Text style={authStyles.profileLabel}>Favorites</Text>
          <Text>{favorites.length}</Text>
        </View>

        <View style={authStyles.profileRow}>
          <Text style={authStyles.profileLabel}>Items in cart</Text>
          <Text>{cart.length}</Text>
        </View>
      </View>

      <Text style={authStyles.sectionTitle}>Order History ({orders.length})</Text>

      <FlatList
        data={orders}
        keyExtractor={(order) => order.orderNumber}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No orders yet. Check out your cart to place one.</Text>
        }
        renderItem={({ item: order }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate('Receipt', { order })}
          >
            <View>
              <Text style={styles.title}>Order #{order.orderNumber}</Text>
              <Text style={authStyles.profileLabel}>{order.date}</Text>
              <Text>{order.items.length} item(s)</Text>
            </View>
            <Text style={{ fontWeight: 'bold' }}>₱{order.total.toFixed(2)}</Text>
          </TouchableOpacity>
        )}
      />

      <TouchableOpacity style={authStyles.logoutBtn} onPress={logout}>
        <Text style={{ color: '#fff', fontWeight: 'bold' }}>Log Out</Text>
      </TouchableOpacity>
    </View>
  );
}