import { useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { CoffeeContext } from '../context/CoffeeContext';
import { DEMO_ACCOUNT } from '../data/demoAccount';
import { authStyles } from '../styles/GlobalStyles';

export default function LoginScreen() {
  const { login } = useContext(CoffeeContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleLogin = () => {
    const success = login(email.trim(), password);

    if (!success) {
      setMessage('Incorrect email or password.');
    }
  };

  return (
    <View style={authStyles.loginContainer}>
      <Text style={authStyles.loginTitle}>Coffee Shop</Text>
      <Text style={authStyles.loginSubtitle}>Log in to see the menu</Text>

      <TextInput
        style={authStyles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />

      <TextInput
        style={authStyles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      {message !== '' && <Text style={authStyles.errorText}>{message}</Text>}

      <TouchableOpacity style={authStyles.loginBtn} onPress={handleLogin}>
        <Text style={{ color: '#fff', fontWeight: 'bold' }}>Log In</Text>
      </TouchableOpacity>

      <View style={authStyles.demoHint}>
        <Text style={{ fontWeight: 'bold' }}>Demo account</Text>
        <Text>Email: {DEMO_ACCOUNT.email}</Text>
        <Text>Password: {DEMO_ACCOUNT.password}</Text>
      </View>
    </View>
  );
}