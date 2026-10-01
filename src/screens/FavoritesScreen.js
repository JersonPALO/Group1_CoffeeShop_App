import React from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { COFFEE_DATA } from '../data/coffeeData';
import { styles } from '../styles/GlobalStyles';

export default function FavoritesScreen({ favorites, toggleFav }) {
  const favItems = COFFEE_DATA.filter((item) => favorites.includes(item.id));

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
          <View style={styles.card}>
            <Text style={styles.title}>{item.name}</Text>
            <TouchableOpacity onPress={() => toggleFav(item.id)}>
              <Text style={{ fontSize: 22}}>★</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}
