import { useContext } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image } from 'react-native';
import { CoffeeContext } from '../context/CoffeeContext';
import { styles } from '../styles/GlobalStyles';

export default function FavoritesScreen({ navigation }) {
  const { favorites, toggleFav, menu } = useContext(CoffeeContext);
  const favItems = menu.filter((item) => favorites.includes(item.id));

  if (favItems.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyTitle}>
          No Favorites Yet
        </Text>

        <Text style={styles.emptyText}>
          Tap the star icon on a coffee to add it here.
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={favItems}
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
              <Text style={{ fontSize: 22 }}>★</Text>
            </TouchableOpacity>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}