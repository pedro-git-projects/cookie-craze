import React, { useState, useEffect } from 'react';
import Cookie from '../assets/Crumb.svg';
import BottomNavigation from '../components/BottomNavigation';
import axios from 'axios';
import { useAuth } from '../state/AuthProvider';
import { useNavigate } from 'react-router-dom';

const Game: React.FC = () => {
  const [score, setScore] = useState<number | null>(null); 
  const { accessToken } = useAuth();
  const navigate = useNavigate()

  useEffect(() => {
    if (!accessToken) {
        navigate("/")
    } else {
      axios
        .get('http://localhost:3000/users/self', {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .then((response) => {
          setScore(response.data.score);
        })
        .catch((error) => {
          console.error('Error fetching initial score:', error);
        });
    }
  }, [accessToken]);

  const handleClick = (x: number) => {
    if (score !== null) {
      setScore(score + x);
    }
  };

  return (
    <div className="w-screen h-screen flex justify-center items-center">
      {score !== null ? ( 
        <div className="text-center">
          <div className="text-4xl mb-4">Cookies: {score}</div>
          <img
            src={Cookie}
            alt="Cookie"
            className="w-32 h-32 md:scale-125 cursor-pointer"
            onClick={() => handleClick(1)}
          />
        </div>
      ) : (
        <div>Loading...</div>
      )}
      <BottomNavigation />
    </div>
  );
};

export default Game;
