import { Alert, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SetupStackScreenProps } from '../navigation/types';
import styles from '../styles/global';
import { useState } from 'react';
import axios from 'axios';

const RegisterScreen: React.FC<SetupStackScreenProps<'Register'>> = ({
  navigation,
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const ip = process.env.EXPO_PUBLIC_IP_ADDRESS;

  const handleRegister = async () => {
    try {
      const res = await axios.post(`http://${ip}:3000/auth/signup`, {
        email,
        password,
      });

      const { access_token } = res.data;
      //console.log(access_token);
      Alert.alert('Success', 'Registered successfully');
      navigation.replace('Login');
    } catch (err) {
      console.log(err);
      Alert.alert('Error', 'Registration failed, please try again');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="email"
        onChangeText={(text) => setEmail(text)}
        value={email}
        keyboardType="email-address"
      />

      <TextInput
        style={styles.input}
        placeholder="password"
        onChangeText={(text) => setPassword(text)}
        value={password}
        secureTextEntry
      />

      <TouchableOpacity onPress={handleRegister} style={styles.loginButton}>
        <Text style={styles.loginButtonText}>Registrar-se</Text>
      </TouchableOpacity>
    </View>
  );
};

export default RegisterScreen;
