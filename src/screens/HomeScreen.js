import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { COFFEE_DATA } from '../data/coffeeData';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HomeScreen({ navigation, favorites, toggleFav }) {
  return (
    <SafeAreaView style={styles.container}>
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
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: "#F8F4E3",
  },

  row: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    marginBottom: 15 
  },

  btn: {
    backgroundColor: "#6F4E37",
    paddingVertical: 12,
    borderRadius: 10,
    width: "48%",
    alignItems: "center",
  },

  btnText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 15,
  },

  card: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    backgroundColor: "#FFFFFF",
    marginBottom: 12,
    borderRadius: 12,
    elevation: 3,
    },

  title: {
    fontWeight: "bold",
    fontSize: 18,
  },

  info: {
  flexDirection: "row",
  alignItems: "center",
  },

  image: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 12,
  },

  textContainer: {
    justifyContent: "center",
  },
});