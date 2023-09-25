import { useEffect, useState } from 'react';
import { MainTabsScreenProps } from '../navigation/types';
import { useAuth } from '../state/AuthProvider';
import axios from 'axios';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import styles from '../styles/global';

// TODO: fetch greatest modifier and apply it to the click updater
const GameScreen: React.FC<MainTabsScreenProps<'Game'>> = ({ navigation }) => {
  const { accessToken } = useAuth();
  const [score, setScore] = useState<number | null>(null);
  const ip = process.env.EXPO_PUBLIC_IP_ADDRESS;

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
        console.log('Score saved successfully');
      })
      .catch((error) => {
        console.error('Error saving score:', error);
      });
  };

  useEffect(() => {
    if (!accessToken) return;
    axios
      .get(`http://${ip}:3000/users/self`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        setScore(response.data.score);
      })
      .catch((err) => {
        console.error('error fetching initial score:', err);
      });
  }, [accessToken]);

  const handleClick = (x: number) => {
    if (score !== null) {
      const newScore = score + x;
      setScore(newScore);
      saveScore(newScore);
    }
  };

  return (
    <View style={styles.container}>
      {score !== null ? (
        <View style={styles.cookieJar}>
          <Text style={styles.cookieText}>Cookies: {score}</Text>
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
