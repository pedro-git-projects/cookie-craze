import React, { useEffect, useState } from 'react';
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
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from '../styles/global';

type SplashScreenProps = StackScreenProps<SetupStackParamList, 'Splash'>;

const SplashScreen: React.FC<SplashScreenProps> = ({ navigation }) => {
  const [isAsyncStorageCleared, setIsAsyncStorageCleared] = useState(false);
  const logoOpacity = new Animated.Value(0);

  useEffect(() => {
    // Clear AsyncStorage
    const clearAsyncStorage = async () => {
      await AsyncStorage.clear();
      setIsAsyncStorageCleared(true);
    };

    clearAsyncStorage();

    // Animate the logo and navigate after clearing AsyncStorage
    if (isAsyncStorageCleared) {
      Animated.timing(logoOpacity, {
        toValue: 1,
        duration: 2000,
        easing: Easing.ease,
        useNativeDriver: true,
      }).start(() => {
        navigation.replace('Login');
      });
    }
  }, [navigation, logoOpacity, isAsyncStorageCleared]);

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
