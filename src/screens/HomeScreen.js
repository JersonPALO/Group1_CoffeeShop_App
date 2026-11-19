import { useContext } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import { CoffeeContext } from '../context/CoffeeContext';
import { COFFEE_DATA } from '../data/coffeeData';
import { styles } from '../styles/GlobalStyles';

export default function HomeScreen({ navigation }) {
  const { favorites, toggleFav, isLoading, error } = useContext(CoffeeContext);

  // Loading state: show a spinner while saved data is being read
  if (isLoading) {
    return (
      <View style={styles.emptyContainer}>
        <ActivityIndicator size="large" color="#6F4E37" />
        <Text style={styles.emptyText}>Loading your menu...</Text>
      </View>
    );
  }

  // Error state: show a message if loading failed
  if (error) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyTitle}>Something went wrong</Text>
        <Text style={styles.emptyText}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Top Navigation Buttons */}
      <View style={styles.row}>
        <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate('Favorites')}>
          <Text style={styles.btnText}>Favorites ({favorites.length})</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={[styles.btn, { backgroundColor: 'green' }]} onPress={() => navigation.navigate('Cart')}>
          <Text style={styles.btnText}>View Cart</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={[styles.btn, { width: '100%', marginBottom: 15 }]}
        onPress={() => navigation.navigate('Profile')}
      >
        <Text style={styles.btnText}>My Profile</Text>
      </TouchableOpacity>

      {/* Menu List */}
      <FlatList
        data={COFFEE_DATA}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('Details', { item })}>
              <View style={styles.info}>
                <Image
                  source={item.image}
                  style={styles.image}
                />

                <View>
                  <Text style={styles.title}>{item.name}</Text>
                  <Text>₱{item.price.toFixed(2)}</Text>
                </View>
              </View>
            <TouchableOpacity onPress={() => toggleFav(item.id)}>
              <Text style={{ fontSize: 22 }}>{favorites.includes(item.id) ? '★' : '☆'}</Text>
            </TouchableOpacity>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}