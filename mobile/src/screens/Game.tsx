import { useCallback, useRef, useState } from 'react';
import { MainTabsScreenProps } from '../navigation/types';
import { useAuth } from '../state/AuthProvider';
import axios from 'axios';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import styles from '../styles/global';
import { useFocusEffect } from '@react-navigation/native';
import scoreSavedEmitter from '../state/ScoreSavedEmitter';

const GameScreen: React.FC<MainTabsScreenProps<'Game'>> = ({ navigation }) => {
  const { accessToken } = useAuth();
  const [score, setScore] = useState<number | null>(null);
  const [scoreModifier, setScoreModifier] = useState<number | null>(null);
  const ip = process.env.EXPO_PUBLIC_IP_ADDRESS;
  const scoreRef = useRef<number | null>(null);

  const saveScore = (newScore: number) => {
    if (!accessToken) return;
    axios
      .patch(
        `http://${ip}:3000/users/score`,
        { score: newScore },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      )
      .then(() => {
        scoreSavedEmitter.emit('score-saved', newScore);
      })
      .catch((error) => {
        console.error('Error saving score:', error);
      });
  };

  const fetchData = async () => {
    axios
      .get(`http://${ip}:3000/users/self`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        const newScore = response.data.score;
        setScore(newScore);
        scoreRef.current = newScore;
      })
      .catch((err) => {
        console.error('error fetching initial score:', err);
      });
  };

  const fetchItemData = async () => {
    try {
      const itemResponse = await axios.get(
        `http://${ip}:3000/users/items/greatest`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );

      if (itemResponse.data.item && itemResponse.data.item.scoreModifier) {
        setScoreModifier(itemResponse.data.item.scoreModifier);
      }
    } catch (err) {
      console.error('error fetching item data:', err);
    }
  };

  useFocusEffect(
    useCallback(() => {
      if (accessToken) {
        fetchData();
        fetchItemData();
      }
      return () => {
        if (scoreRef.current !== null) {
          saveScore(scoreRef.current);
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
