import React, { useState, useEffect } from 'react';
import Cookie from '../assets/Crumb.svg';
import BottomNavigation from '../components/BottomNavigation';
import axios from 'axios';
import { useAuth } from '../state/AuthProvider';
import { useNavigate } from 'react-router-dom';

const Game: React.FC = () => {
  const [score, setScore] = useState<number | null>(null);
  const { accessToken } = useAuth();
  const navigate = useNavigate();

  const saveScore = (newScore: number) => {
    if (!accessToken) return;
    axios
      .patch(
        'http://localhost:3000/users/score',
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
    if (!accessToken) {
      navigate('/');
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
  }, [accessToken, navigate]);

  useEffect(() => {
    // Save the score every 10 minutes
    const saveScoreInterval = setInterval(
      () => {
        if (score !== null) {
          saveScore(score);
        }
      },
      10 * 60 * 1000,
    ); // 10 minutes in milliseconds

    // Save the score before navigating away or quitting the page
    const handleBeforeUnload = () => {
      if (score !== null) {
        saveScore(score);
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      clearInterval(saveScoreInterval);
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [score]);

  const handleClick = (x: number) => {
    if (score !== null) {
      const newScore = score + x;
      setScore(newScore);
      saveScore(newScore); // Save the score when the user clicks
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
