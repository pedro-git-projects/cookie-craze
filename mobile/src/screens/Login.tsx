import React, { useState } from 'react';
import { Image, TextInput, Text, TouchableOpacity, View } from 'react-native';
import NavigableText from '../components/NavigableText';
import styles from '../styles/global';
import { SetupStackScreenProps } from '../navigation/types';
import { useAuth } from '../state/AuthProvider';
import axios from 'axios';

const LoginScreen: React.FC<SetupStackScreenProps<'Login'>> = ({
  navigation,
}) => {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginFailed, setLoginFailed] = useState(false);
  const ip = process.env.EXPO_PUBLIC_IP_ADDRESS;

  const handleLogin = async () => {
    try {
      const response = await axios.post(`http:${ip}:3000/auth/signin`, {
        email,
        password,
      });

      const { access_token } = response.data;
      login(access_token);
      setEmail('');
      setPassword('');
      setLoginFailed(false);
    } catch (error) {
      console.error('Login failed:', error);
      setLoginFailed(true);
    }
  };

  return (
    <View style={[styles.container, { padding: 16 }]}>
      <Image source={require('../../assets/mascot.png')} style={styles.logo} />

      <TextInput
        placeholder="Email"
        onChangeText={(text) => setEmail(text)}
        value={email}
        autoCorrect={false}
        autoCapitalize="none"
        keyboardType="email-address"
        style={styles.input}
      />

      <TextInput
        placeholder="Senha"
        onChangeText={(text) => setPassword(text)}
        value={password}
        secureTextEntry
        style={styles.input}
      />

      <TouchableOpacity onPress={handleLogin} style={styles.loginButton}>
        <Text style={styles.loginButtonText}>Entrar</Text>
      </TouchableOpacity>

      {/* Conditional rendering based on loginFailed state */}
      {loginFailed && (
        <Text style={styles.forgotPasswordText}>
          <NavigableText
            text="Esqueceu a senha? Clique aqui para recuperar"
            textColor="#fb4934"
            screenName="Forgot"
            navigation={navigation}
          />
        </Text>
      )}
      <View style={styles.createAccountText}>
        <NavigableText
          text="Não está cadastrado? Criar conta"
          textColor="#fabd2f"
          screenName="Register"
          navigation={navigation}
        />
      </View>
    </View>
  );
};

export default LoginScreen;
