import React, { ReactNode } from 'react';
import './card.css';

export interface CardHeaderProps {
  children?: ReactNode;
  className?: string;
}

const CardHeader = (props: CardHeaderProps): JSX.Element => {
  const { children, className } = props;

  return (
    <div className={`Base-card-header${className ? ` ${className}` : ''}`}>
      {children}
    </div>
  );
};

export default CardHeader;
