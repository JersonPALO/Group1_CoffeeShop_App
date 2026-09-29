import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { COFFEE_DATA } from '../data/coffeeData';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function FavoritesScreen({ favorites, toggleFav }) {
  const favItems = COFFEE_DATA.filter((item) => favorites.includes(item.id));

  if (favItems.length === 0) {
    return (
      <SafeAreaView style={styles.emptyContainer}>
        <Text style={styles.emptyTitle}>
          No Favorites Yet
        </Text>

        <Text style={styles.emptyText}>
          Tap the star icon on a coffee to add it here.
        </Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
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
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    padding: 15,
    backgroundColor: "#F8F4E3",
  },
 
  card: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    padding: 15, 
    backgroundColor: '#ffffff', 
    marginBottom: 12,
    borderRadius: 12,
    elevation: 3,
  },
  
  title: { 
    fontWeight: 'bold', 
    fontSize: 16 
  },

  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },

  emptyTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#3E2723",
  },

  emptyText: {
    marginTop: 10,
    fontSize: 15,
    color: "gray",
    textAlign: "center",
  },
});