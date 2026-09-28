import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, ImageBackground } from 'react-native';

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
    <View style={styles.container}>
      <View style={styles.content}>
        {/* Drink Overview with Warm Coffee Background */}
        <View style={styles.headerCardContainer}>
          <ImageBackground 
            source={item.image} 
            style={styles.backgroundImage}
            resizeMode="cover"
          >
            <View style={styles.overlay}>
              <Text style={styles.title}>{item.name}</Text>
              <Text style={styles.desc}>{item.desc}</Text>
              <Text style={styles.priceTag}>${item.price.toFixed(2)}</Text>
            </View>
          </ImageBackground>
        </View>

        {/* Size Selection Chips */}
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

        {/* Sugar Level Chips */}
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

        {/* Add to Cart Button */}
        <TouchableOpacity style={styles.addBtn} activeOpacity={0.8} onPress={handleAdd}>
          <Text style={styles.addBtnText}>Add to Cart — ${item.price.toFixed(2)}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#ae9a72' },
  content: { padding: 20 },
  headerCardContainer: {
    borderRadius: 18,
    overflow: 'hidden',
    marginBottom: 20,
    elevation: 4,
    shadowColor: '#2A1810',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    backgroundColor: '#2A1810',
  },
  backgroundImage: {
    width: '100%',
    minHeight: 150,
  },
  overlay: {
    padding: 22,
    backgroundColor: 'rgba(42, 24, 16, 0.65)', // Warm coffee roast dark overlay
    minHeight: 150,
    justifyContent: 'center',
  },
  title: { fontSize: 26, fontWeight: 'bold', color: '#FFF8F0' },
  desc: { fontSize: 14, color: '#E8D8C8', marginTop: 6 },
  priceTag: { fontSize: 22, fontWeight: 'bold', color: '#E0A96D', marginTop: 12 },
  sectionLabel: { fontSize: 15, fontWeight: '700', color: '#4A2C2A', marginTop: 15, marginBottom: 10 },
  chipRow: { flexDirection: 'row', gap: 10 },
  chip: {
    flex: 1,
    paddingVertical: 12,
    borderWidth: 1.5,
    borderColor: '#523d3d',
    borderRadius: 12,
    alignItems: 'center',
    backgroundColor: '#d8d3cc',
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