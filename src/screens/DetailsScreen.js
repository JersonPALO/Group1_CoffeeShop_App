import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';

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
      <View style={styles.row}>
        {['Small', 'Medium', 'Large'].map((s) => (
          <TouchableOpacity key={s} style={[styles.opt, size === s && styles.sel]} onPress={() => setSize(s)}>
            <Text>{s}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.label}>Sugar:</Text>
      <View style={styles.row}>
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

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    padding: 20 
  },

  title: { 
    fontSize: 22, 
    fontWeight: 'bold' 
  },

  desc: { 
    marginVertical: 10, 
    color: '#666' 
  },

  label: { 
    fontWeight: 'bold',
    marginTop: 15 
  },

  row: { 
    flexDirection: 'row', 
    marginTop: 5 
  },

  opt: { 
    padding: 10, 
    borderWidth: 1, 
    borderColor: '#ccc', 
    marginRight: 10, 
    borderRadius: 5 },

  sel: { 
    backgroundColor: '#ddd' 
  },

  addBtn: { 
    backgroundColor: '#6f4e37', 
    padding: 15, 
    borderRadius: 5, 
    alignItems: 'center', 
    marginTop: 30 
  },
});