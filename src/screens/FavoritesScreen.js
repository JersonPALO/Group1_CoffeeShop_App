import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { COFFEE_DATA } from '../data/coffeeData';

export default function FavoritesScreen({ favorites, toggleFav }) {
  const favItems = COFFEE_DATA.filter((item) => favorites.includes(item.id));

  return (
    <View style={styles.container}>
      {favItems.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyIcon}>⭐</Text>
          <Text style={styles.emptyText}>No favorites added yet!</Text>
        </View>
      ) : (
        <FlatList
          data={favItems}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ padding: 16 }}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <View style={styles.textContainer}>
                <Text style={styles.title}>{item.name}</Text>
                <Text style={styles.price}>${item.price.toFixed(2)}</Text>
              </View>
              <TouchableOpacity style={styles.starBtn} onPress={() => toggleFav(item.id)}>
                <Text style={styles.star}>★</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#ae9a72' },
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
  textContainer: { flex: 1 },
  title: { fontSize: 16, fontWeight: 'bold', color: '#2C1810' },
  price: { fontSize: 14, fontWeight: '600', color: '#D4A373', marginTop: 4 },
  starBtn: { paddingLeft: 10 },
  star: { fontSize: 26, color: '#D4A373' },
  emptyContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  emptyIcon: { fontSize: 50, marginBottom: 10 },
  emptyText: { fontSize: 16, color: '#f8f6f4', fontWeight: '600' },
});