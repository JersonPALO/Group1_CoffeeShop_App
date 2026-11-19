import { useContext } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { CoffeeContext } from '../context/CoffeeContext';
import { styles, authStyles } from '../styles/GlobalStyles';

export default function ProfileScreen() {
  const { user, favorites, cart, logout } = useContext(CoffeeContext);

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

      <TouchableOpacity style={authStyles.logoutBtn} onPress={logout}>
        <Text style={{ color: '#fff', fontWeight: 'bold' }}>Log Out</Text>
      </TouchableOpacity>
    </View>
  );
}