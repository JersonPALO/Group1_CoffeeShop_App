import { View, Text, FlatList, TouchableOpacity, Image } from 'react-native';
import { COFFEE_DATA } from '../data/coffeeData';
import { styles } from '../styles/GlobalStyles';

export default function HomeScreen({ navigation, favorites, toggleFav }) {
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

                <View style={styles.textContainer}>
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
