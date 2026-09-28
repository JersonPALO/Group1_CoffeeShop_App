import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, SafeAreaView } from 'react-native';

export default function DetailsScreen({ route, navigation, addToCart }) {
  const { item } = route.params;
  const [size, setSize] = useState('Medium');
  const [sugar, setSugar] = useState('100%');

  const handleAdd = () => {
    addToCart({ ...item, cartId: Date.now().toString(), size, sugar });
    Alert.alert('Success', `${item.name} added to cart!`);
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Header Details */}
        <View style={styles.headerCard}>
          <Text style={styles.title}>{item.name}</Text>
          <Text style={styles.desc}>{item.desc}</Text>
          <Text style={styles.priceTag}>${item.price.toFixed(2)}</Text>
        </View>

        {/* Size Selection */}
        <Text style={styles.sectionLabel}>Select Size</Text>
        <View style={styles.chipRow}>
          {['Small', 'Medium', 'Large'].map((s) => (
            <TouchableOpacity 
              key={s} 
              style={[styles.chip, size === s && styles.selectedChip]} 
              onPress={() => setSize(s)}
            >
              <Text style={[styles.chipText, size === s && styles.selectedChipText]}>{s}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Sugar Selection */}
        <Text style={styles.sectionLabel}>Sugar Level</Text>
        <View style={styles.chipRow}>
          {['0%', '50%', '100%'].map((l) => (
            <TouchableOpacity 
              key={l} 
              style={[styles.chip, sugar === l && styles.selectedChip]} 
              onPress={() => setSugar(l)}
            >
              <Text style={[styles.chipText, sugar === l && styles.selectedChipText]}>{l}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Add to Cart CTA */}
        <TouchableOpacity style={styles.addBtn} activeOpacity={0.8} onPress={handleAdd}>
          <Text style={styles.addBtnText}>Add to Cart — ${item.price.toFixed(2)}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F9F6F0' },
  content: { padding: 20 },
  headerCard: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 16,
    marginBottom: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
  },
  title: { fontSize: 24, fontWeight: 'bold', color: '#2C1810' },
  desc: { fontSize: 14, color: '#8D7B68', marginTop: 6 },
  priceTag: { fontSize: 22, fontWeight: 'bold', color: '#D4A373', marginTop: 12 },
  sectionLabel: { fontSize: 15, fontWeight: '700', color: '#4A2C2A', marginTop: 15, marginBottom: 10 },
  chipRow: { flexDirection: 'row', gap: 10 },
  chip: {
    flex: 1,
    paddingVertical: 12,
    borderWidth: 1.5,
    borderColor: '#E0D8D0',
    borderRadius: 12,
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  selectedChip: { backgroundColor: '#4A2C2A', borderColor: '#4A2C2A' },
  chipText: { fontWeight: '600', color: '#666' },
  selectedChipText: { color: '#FFFFFF' },
  addBtn: {
    backgroundColor: '#2D6A4F',
    paddingVertical: 16,
    borderRadius: 30,
    alignItems: 'center',
    marginTop: 35,
    elevation: 3,
  },
  addBtnText: { color: '#FFFFFF', fontWeight: 'bold', fontSize: 16 },
});