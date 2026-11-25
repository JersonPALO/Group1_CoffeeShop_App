import { useContext } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import { CoffeeContext } from '../context/CoffeeContext';
import { styles } from '../styles/GlobalStyles';

export default function HomeScreen({ navigation }) {
  const { favorites, toggleFav, isLoading, error, menu, menuLoading, menuError, loadMenu } =
    useContext(CoffeeContext);

  // Loading state: show a spinner while saved data is being read
  if (isLoading || menuLoading) {
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

  // Error state: the menu could not be fetched, let the user try again
  if (menuError) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyTitle}>Menu unavailable</Text>
        <Text style={styles.emptyText}>{menuError}</Text>
        <TouchableOpacity style={[styles.removeButton, { marginTop: 15 }]} onPress={loadMenu}>
          <Text style={styles.removeText}>Try Again</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Menu List */}
      <FlatList
        data={menu}
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