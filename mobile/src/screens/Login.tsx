import React, { useState } from 'react';
import {
  Dimensions,
  Image,
  TextInput,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
} from 'react-native';
import NavigableText from '../components/NavigableText';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginFailed, setLoginFailed] = useState(false);

  const handleLogin = () => {
    // TODO: handle login
    setLoginFailed(true);
    console.log('Email:', email);
    console.log('Password:', password);
  };

  return (
    <View style={styles.container}>
      <Image source={require('../../assets/mascot.png')} style={styles.logo} />

      <TextInput
        placeholder="Email"
        onChangeText={(text) => setEmail(text)}
        value={email}
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
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor:'#282828'
  },
  logo: {
    width: Dimensions.get('window').width * 0.6,
    height: Dimensions.get('window').height * 0.4,
    resizeMode: 'contain',
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: '#1d2021',
    backgroundColor: '#fbf1c7',
    borderWidth: 1,
    borderRadius: 8,
    marginVertical: 8,
    paddingHorizontal: 12,
  },
  loginButton: {
    backgroundColor: '#458588',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 24,
    marginVertical: 16,
  },
  loginButtonText: {
    color: '#fbf1c7',
    fontSize: 16,
    textAlign: 'center',
  },
  forgotPasswordText: {
    marginVertical: 8,
    textAlign: 'center',
  },
  createAccountText: {
    marginTop: 16,
  },
});
