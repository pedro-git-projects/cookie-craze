import React from 'react';
import { NavLink } from 'react-router-dom';

interface NavigableTextProps {
  text: string;
  textColor: string;
  to: string;
}

const NavigableText: React.FC<NavigableTextProps> = ({
  text,
  textColor,
  to,
}) => {
  return (
    <NavLink to={to} className={`text-${textColor} underline`}>
      {text}
    </NavLink>
  );
};

export default NavigableText;
