import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { COFFEE_DATA } from '../data/coffeeData';

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
            <View>
              <Text style={styles.title}>{item.name}</Text>
              <Text>${item.price.toFixed(2)}</Text>
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

const styles = StyleSheet.create({
  container: { flex: 1, padding: 15 },
  row: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 15 },
  btn: { backgroundColor: '#6f4e37', padding: 10, borderRadius: 5, width: '48%', alignItems: 'center' },
  btnText: { color: '#fff', fontWeight: 'bold' },
  card: { flexDirection: 'row', justifyContent: 'space-between', padding: 15, backgroundColor: '#fff', marginBottom: 10, borderRadius: 5 },
  title: { fontWeight: 'bold', fontSize: 16 },
});