import React, { ReactNode } from 'react';
import './resultCard.css';

export interface ResultCardProps {
  children: ReactNode;
}

const ResultCard = (props: ResultCardProps): JSX.Element => {
  const { children } = props;

  return <div className="Base-result-card">{children}</div>;
};

export default ResultCard;
