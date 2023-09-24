import { Dimensions, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#282828',
  },
  logo: {
    width: Dimensions.get('window').width * 0.6,
    height: Dimensions.get('window').height * 0.4,
    resizeMode: 'contain',
  },
  cookieJar: {
    alignItems: 'center',
    backgroundColor: '#fbf1c7',
    padding: 20,
    borderRadius: 16,
  },
  cookieText: {
    color: '#458588',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  cookieImage: {
    width: 120,
    height: 120,
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

export default styles;
