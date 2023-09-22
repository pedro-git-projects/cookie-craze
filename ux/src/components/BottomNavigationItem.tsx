// src/components/BottomNavigationItem.tsx
import React from 'react';
import { NavLink } from 'react-router-dom';

interface BottomNavigationItemProps {
  label: string;
  icon: string;
  to: string;
}

const BottomNavigationItem: React.FC<BottomNavigationItemProps> = ({
  label,
  icon,
  to,
}) => {
  return (
    <NavLink to={to} className="flex flex-col items-center text-white">
      <i className={`fas fa-${icon} text-xl mb-1`} />
      <span>{label}</span>
    </NavLink>
  );
};

export default BottomNavigationItem;
