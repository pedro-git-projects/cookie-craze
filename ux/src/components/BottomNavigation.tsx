import React from 'react';
import BottomNavigationItem from './BottomNavigationItem';

const BottomNavigation: React.FC = () => {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-800 p-4 flex justify-around">
      <BottomNavigationItem label="Jogo" icon="gamepad" to="/game" />
      <BottomNavigationItem label="Loja" icon="shopping-bag" to="/store" />
      <BottomNavigationItem label="Placar" icon="chart-bar" to="/leaderboard" />
      <BottomNavigationItem label="Configurações" icon="cog" to="/settings" />
    </div>
  );
};

export default BottomNavigation;
