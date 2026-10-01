import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { styles } from '../styles/GlobalStyles';

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
      <Text style={styles.detailtitle}>{item.name}</Text>
      <Text style={styles.desc}>{item.desc}</Text>

      <Text style={styles.label}>Size:</Text>
      <View style={styles.detailRow}>
        {['Small', 'Medium', 'Large'].map((s) => (
          <TouchableOpacity key={s} style={[styles.opt, size === s && styles.sel]} onPress={() => setSize(s)}>
            <Text>{s}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.label}>Sugar:</Text>
      <View style={styles.detailRow}>
        {['0%', '50%', '100%'].map((l) => (
          <TouchableOpacity key={l} style={[styles.opt, sugar === l && styles.sel]} onPress={() => setSugar(l)}>
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
