import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { styles } from "../styles/GlobalStyles";

export default function DetailsScreen({ route, navigation, addToCart }) {
  const { item } = route.params;
  const [size, setSize] = useState('Medium');
  const [sugar, setSugar] = useState('100%');

  const handleAdd = () => {
    addToCart({ ...item, cartId: Date.now().toString(), size, sugar });
    Alert.alert('Added to Cart');
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{item.name}</Text>
      <Text style={styles.desc}>{item.desc}</Text>

      <Text style={styles.label}>Size:</Text>
      <View style={styles.OptionRow}>
        {['Small', 'Medium', 'Large'].map((s) => (
          <TouchableOpacity key={s} style={[styles.option, size === s && styles.selectedOption]} onPress={() => setSize(s)}>
            <Text>{s}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.label}>Sugar:</Text>
      <View style={styles.OptionRow}>
        {['0%', '50%', '100%'].map((l) => (
          <TouchableOpacity key={l} style={[styles.option, sugar === l && styles.selectedOption]} onPress={() => setSugar(l)}>
            <Text>{l}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity style={styles.addBtn} onPress={handleAdd}>
        <Text style={{ color: '#fff', fontWeight: 'bold' }}>Add to Cart - ₱{item.price.toFixed(2)}</Text>
      </TouchableOpacity>
    </View>
  );
}
