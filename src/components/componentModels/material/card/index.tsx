import React, { ReactNode } from 'react';
import { ThemeType } from '../types';
import './card.css';

export interface CardProps {
  children?: ReactNode;
  theme?: ThemeType;
}

const Card = (props: CardProps): JSX.Element => {
  const { children, theme } = props;

  return <div className={`Base-card ${theme ?? ''}`}>{children}</div>;
};

export default Card;
