import { useState } from 'react';
import Cookie from '../assets/Crumb.svg';
import BottomNavigation from '../components/BottomNavigation';

const Game: React.FC = () => {
  const [score, setScore] = useState(0);
  const handleClick = (x: number) => setScore(score + x);

  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <div className="text-center">
        <div className="text-4xl mb-4">Cookies: {score}</div>
        <img
          src={Cookie}
          alt="Cookie"
          className="w-32 h-32 md:scale-125 cursor-pointer"
          onClick={() => handleClick(1)}
        />
      </div>
      <BottomNavigation />
    </div>
  );
};

export default Game;
