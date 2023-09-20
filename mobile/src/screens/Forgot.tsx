import { useState } from 'react';
import { Image, Text, TextInput, TouchableOpacity, View } from 'react-native';
import styles from '../styles/global';
import { SetupStackScreenProps } from '../navigation/types';

const ForgotScreen: React.FC<SetupStackScreenProps<'Forgot'>> = ({
  navigation,
}) => {
  const [email, setEmail] = useState(''); // State for the email

  const handleSendEmail = () => {
    // TODO: Handle sending the recovery email
    console.log('Sending recovery email to:', email);
  };

  return (
    <View style={styles.container}>
      <Text> Recuperar Senha</Text>

      <Image source={require('../../assets/icon.png')} style={styles.logo} />

      <Text>Digite o seu endereço de email para recuperar a senha.</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        onChangeText={(text) => setEmail(text)}
        value={email}
        keyboardType="email-address"
        placeholderTextColor="#B3B3B3"
      />
      <TouchableOpacity style={styles.loginButton} onPress={handleSendEmail}>
        <Text style={styles.loginButtonText}>Enviar email de recuperação</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ForgotScreen;
