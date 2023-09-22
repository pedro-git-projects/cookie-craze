import { useEffect, useState } from 'react';
import BottomNavigation from '../components/BottomNavigation';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../state/AuthProvider';

interface LeaderboardEntry {
  email: string;
  score: number;
}

const Leaderboard: React.FC = () => {
  const { accessToken } = useAuth();
  const navigate = useNavigate();
  const [leaderboardData, setLeaderboardData] = useState<LeaderboardEntry[]>(
    [],
  );
  const isLoading = leaderboardData.length === 0;
  useEffect(() => {
    if (!accessToken) {
      navigate('/');
    }
    const fetchData = async () => {
      try {
        const response = await axios.get(
          'http://localhost:3000/users/leaderboard',
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          },
        );
        setLeaderboardData(response.data);
      } catch (error) {
        console.error('Error fetching leaderboard data:', error);
      }
    };

    fetchData();
  }, []);
  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-center">Placar</h1>
      {isLoading ? (
        <div className="bg-white p-4 shadow rounded-lg animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-full mb-2"></div>
          <div className="h-8 bg-gray-200 rounded w-3/4 mb-2"></div>
          <div className="h-8 bg-gray-200 rounded w-1/2 mb-2"></div>
          <div className="h-8 bg-gray-200 rounded w-3/4 mb-2"></div>
          <div className="h-8 bg-gray-200 rounded w-full mb-2"></div>
        </div>
      ) : (
        <ul className="bg-white p-4 shadow rounded-lg">
          {leaderboardData.map((entry, index) => (
            <li
              key={index}
              className="flex justify-between items-center p-2 border-b"
            >
              <div>
                <span className="text-lg font-semibold">{"Usuário: " + entry.email}</span>
                <br/>
                <span className="text-lg font-semibold">{"Pontuação: " + entry.score + " 🍪"}</span>
              </div>
            </li>
          ))}
        </ul>
      )}
      <BottomNavigation />
    </div>
  );
};

export default Leaderboard;
