import React, { ReactNode } from 'react';
import { FlexDirType } from '../types';
import './cardGroup.css';

export interface CardGroupProps {
  children?: ReactNode;
  className?: string;
  direction?: FlexDirType;
}

const CardGroup = (props: CardGroupProps): JSX.Element => {
  const { children, className, direction } = props;

  return (
    <div
      className={`Base-card-group${className ? ` ${className}` : ''}`}
      style={{flexDirection: direction}}
    >
      {children}
    </div>
  );
};

export default CardGroup;
