import { useCallback, useRef, useState } from 'react';
import { MainTabsScreenProps } from '../navigation/types';
import { useAuth } from '../state/AuthProvider';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import styles from '../styles/global';
import { useFocusEffect } from '@react-navigation/native';
import { saveScore } from '../api/save';
import {
  fetchGreatestScoreModifier,
  fetchUserDataAndUpdateRef,
} from '../api/fetch';

const GameScreen: React.FC<MainTabsScreenProps<'Game'>> = ({ navigation }) => {
  const { accessToken } = useAuth();
  const [score, setScore] = useState<number | null>(null);
  const [scoreModifier, setScoreModifier] = useState<number | null>(null);
  const ip = process.env.EXPO_PUBLIC_IP_ADDRESS;
  const scoreRef = useRef<number | null>(null);

  useFocusEffect(
    useCallback(() => {
      if (accessToken) {
        fetchUserDataAndUpdateRef(accessToken, ip, setScore, scoreRef);
        fetchGreatestScoreModifier(accessToken, ip, setScoreModifier);
      }
      return () => {
        if (scoreRef.current !== null) {
          saveScore(accessToken, ip, scoreRef.current);
        } else {
          console.log('score ref is null');
        }
      };
    }, [accessToken]),
  );

  const handleClick = (x: number) => {
    if (score !== null && scoreModifier !== null) {
      const newScore = score + x * scoreModifier;
      setScore(newScore);
      scoreRef.current = newScore;
    } else if (score !== null) {
      const newScore = score + x;
      setScore(newScore);
      scoreRef.current = newScore;
    }
  };

  return (
    <View style={styles.container}>
      {score !== null ? (
        <View style={styles.cookieJar}>
          <Text style={styles.cookieText}>Cookies: {score}</Text>
          {scoreModifier !== null && (
            <Text style={styles.cookieMultiplierText}>
              Multiplicador: {scoreModifier}
            </Text>
          )}
          <TouchableOpacity onPress={() => handleClick(1)}>
            <Image
              source={require('../../assets/clicker.png')}
              style={styles.cookieImage}
            />
          </TouchableOpacity>
        </View>
      ) : (
        <Text>Loading...</Text>
      )}
    </View>
  );
};

export default GameScreen;
