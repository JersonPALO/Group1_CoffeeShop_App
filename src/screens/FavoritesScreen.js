import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { COFFEE_DATA } from '../data/coffeeData';

export default function FavoritesScreen({ favorites, toggleFav }) {
  const favItems = COFFEE_DATA.filter((item) => favorites.includes(item.id));

  return (
    <View style={styles.container}>
      <FlatList
        data={favItems}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.title}>{item.name}</Text>
            <TouchableOpacity onPress={() => toggleFav(item.id)}>
              <Text style={{ fontSize: 22, color: 'gold' }}>★</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 15 },
  card: { flexDirection: 'row', justifyContent: 'space-between', padding: 15, backgroundColor: '#fff', marginBottom: 10 },
  title: { fontWeight: 'bold', fontSize: 16 },
});