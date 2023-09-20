import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SetupStackScreenProps } from '../navigation/types';
import styles from '../styles/global';
import { useState } from 'react';

const RegisterScreen: React.FC<SetupStackScreenProps<'Register'>> = ({
  navigation,
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // TODO actually implement the handler
  const handleRegister = () => 'Registerd!';

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
        <Text style={styles.loginButtonText}>Entrar</Text>
      </TouchableOpacity>
    </View>
  );
};

export default RegisterScreen;
