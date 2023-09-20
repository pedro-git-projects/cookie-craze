import React, { useEffect } from 'react';
import {
  View,
  StyleSheet,
  Animated,
  Easing,
  Dimensions,
  Image,
} from 'react-native';
import { SetupStackParamList } from '../navigation/types';
import { StackScreenProps } from '@react-navigation/stack';
import styles from '../styles/global';

type SplashScreenProps = StackScreenProps<SetupStackParamList, 'Splash'>;

const SplashScreen: React.FC<SplashScreenProps> = ({ navigation }) => {
  const logoOpacity = new Animated.Value(0);

  useEffect(() => {
    Animated.timing(logoOpacity, {
      toValue: 1,
      duration: 2000,
      easing: Easing.ease,
      useNativeDriver: true,
    }).start(() => {
      navigation.replace('Login');
    });
  }, [navigation, logoOpacity]);

  return (
    <View style={styles.container}>
      <Animated.View
        style={[splashStyles.logoContainer, { opacity: logoOpacity }]}
      >
        <Image
          source={require('../../assets/splash.png')}
          style={{
            width: Dimensions.get('window').width * 0.6,
            height: Dimensions.get('window').height * 0.4,
            resizeMode: 'contain',
          }}
        />
      </Animated.View>
    </View>
  );
};

const splashStyles = StyleSheet.create({
  logoContainer: {
    alignItems: 'center',
  },
});

export default SplashScreen;
