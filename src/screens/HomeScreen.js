import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';
import { COFFEE_DATA } from '../data/coffeeData';

export default function HomeScreen({ navigation, favorites, toggleFav }) {
  return (
    <View style={styles.container}>
      {/* Top Banner & Navigation */}
      <View style={styles.header}>
        <Text style={styles.welcomeText}>Freshly Brewed For You ☕</Text>
        <View style={styles.navRow}>
          <TouchableOpacity style={styles.favBtn} onPress={() => navigation.navigate('Favorites')}>
            <Text style={styles.favBtnText}>★ Favorites ({favorites.length})</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.cartBtn} onPress={() => navigation.navigate('Cart')}>
            <Text style={styles.cartBtnText}>🛒 View Cart</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Coffee Menu List */}
      <FlatList
        data={COFFEE_DATA}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        renderItem={({ item }) => (
          <TouchableOpacity 
            style={styles.cardContainer} 
            activeOpacity={0.85}
            onPress={() => navigation.navigate('Details', { item })}
          >
            <ImageBackground 
              source={item.image} 
              style={styles.backgroundImage}
              resizeMode="cover"
            >
              <View style={styles.overlay}>
                <View style={styles.cardContent}>
                  <Text style={styles.coffeeTitle}>{item.name}</Text>
                  <Text style={styles.coffeeDesc} numberOfLines={1}>{item.desc}</Text>
                  <Text style={styles.price}>${item.price.toFixed(2)}</Text>
                </View>
                <TouchableOpacity style={styles.favIconBtn} onPress={() => toggleFav(item.id)}>
                  <Text style={styles.favIcon}>{favorites.includes(item.id) ? '★' : '☆'}</Text>
                </TouchableOpacity>
              </View>
            </ImageBackground>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#ae9a72' },
  header: { padding: 20, backgroundColor: '#4A2C2A', borderBottomLeftRadius: 20, borderBottomRightRadius: 20 },
  welcomeText: { color: '#F3E5AB', fontSize: 18, fontWeight: '700', marginBottom: 12 },
  navRow: { flexDirection: 'row', justifyContent: 'space-between' },
  favBtn: { backgroundColor: '#D4A373', paddingVertical: 10, paddingHorizontal: 16, borderRadius: 25, width: '48%', alignItems: 'center' },
  favBtnText: { color: '#2B1704', fontWeight: 'bold', fontSize: 13 },
  cartBtn: { backgroundColor: '#2D6A4F', paddingVertical: 10, paddingHorizontal: 16, borderRadius: 25, width: '48%', alignItems: 'center' },
  cartBtnText: { color: '#FFFFFF', fontWeight: 'bold', fontSize: 13 },
  listContainer: { padding: 16 },
  cardContainer: {
    marginBottom: 14,
    borderRadius: 16,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    overflow: 'hidden',
    backgroundColor: '#3E2723',
  },
  backgroundImage: {
    width: '100%',
    minHeight: 110,
  },
  overlay: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.45)',
    padding: 16,
    minHeight: 110,
  },
  cardContent: { flex: 1, paddingRight: 10 },
  coffeeTitle: { fontSize: 18, fontWeight: 'bold', color: '#FFFFFF' },
  coffeeDesc: { fontSize: 13, color: '#E0E0E0', marginVertical: 3 },
  price: { fontSize: 15, fontWeight: '700', color: '#F3E5AB' },
  favIconBtn: { padding: 8 },
  favIcon: { fontSize: 26, color: '#F3E5AB' },
});