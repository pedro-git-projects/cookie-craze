import React from 'react';
import BottomNavigationItem from './BottomNavigationItem';

const BottomNavigation: React.FC = () => {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-800 p-4 flex justify-around">
      <BottomNavigationItem label="Game" icon="gamepad" to="/game" />
      <BottomNavigationItem
        label="Leaderboard"
        icon="chart-bar"
        to="/leaderboard"
      />
      <BottomNavigationItem label="Settings" icon="cog" to="/settings" />
    </div>
  );
};

export default BottomNavigation;
