import { useCallback, useState } from 'react';
import { MainTabsScreenProps } from '../navigation/types';
import { useAuth } from '../state/AuthProvider';
import axios from 'axios';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import scoreSavedEmitter from '../state/ScoreSavedEmitter';

interface LeaderboardEntry {
  username: string;
  score: number;
}

const LeaderboardScreen: React.FC<MainTabsScreenProps<'Leaderboad'>> = ({
  navigation,
}) => {
  const { accessToken } = useAuth();
  const [leaderboardData, setLeaderboardData] = useState<LeaderboardEntry[]>(
    [],
  );
  const isLoading = leaderboardData.length === 0;
  const ip = process.env.EXPO_PUBLIC_IP_ADDRESS;

  const fetchData = async () => {
    try {
      const response = await axios.get(`http://${ip}:3000/users/leaderboard`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      setLeaderboardData(response.data);
    } catch (err) {
      console.error('error fetching leaderboard data:', err);
    }
  };

  useFocusEffect(
    useCallback(() => {
      if (accessToken) {
        scoreSavedEmitter.on('score-saved', () => {
          fetchData();
        });
        fetchData();
      }
      return () => {};
    }, [accessToken]),
  );

  const renderLeaderboardItems = ({
    item,
    index,
  }: {
    item: LeaderboardEntry;
    index: number;
  }) => (
    <View style={styles.leaderboardItem}>
      <Text style={styles.rank}>{index + 1}</Text>
      <Text style={styles.username}>{item.username}</Text>
      <Text style={styles.score}>{item.score + '🍪'}</Text>
    </View>
  );

  if (isLoading) {
    return <Text>Loading...</Text>;
  }
  return (
    <>
      <View style={styles.container}>
        <Text style={styles.titleText}>🏆 Placar 🏆</Text>
      </View>
      <View style={styles.flatList}>
        <FlatList
          data={leaderboardData}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderLeaderboardItems}
          style={styles.flatList}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 2,
    padding: 16,
    backgroundColor: '#282828',
    alignItems: 'center',
    justifyContent: 'center',
  },
  flatList: {
    padding: 16,
    backgroundColor: '#282828',
  },
  titleText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fbf1c7',
  },
  leaderboardItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginBottom: 8,
    backgroundColor: '#fbf1c7',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  rank: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  username: {
    flex: 1,
    fontSize: 18,
    marginLeft: 16,
  },
  score: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default LeaderboardScreen;
