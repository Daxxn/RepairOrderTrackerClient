import React, { ReactNode, CSSProperties } from 'react';
import './card.css';
import { ThemeType } from '../types';

export interface CardProps {
  children?: ReactNode;
  column?: number;
  row?: number;
  theme?: ThemeType;
}

const Card = (props: CardProps): JSX.Element => {
  const { children, column, row, theme } = props;

  const columnObj = {
    gridColumn: column,
  };
  const rowObj = {
    gridRow: row,
  };
  const css: CSSProperties = {
    ...columnObj,
    ...rowObj,
  }
  
  return (
    <div className={`Base-card ${theme ? theme : ''}`} style={css}>
      {children}
    </div>
  );
};

export default Card;
