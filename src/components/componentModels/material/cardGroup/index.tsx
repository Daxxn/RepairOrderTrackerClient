import React, { ReactNode } from 'react';
import './cardGroup.css';

export interface CardGroupProps {
  children?: ReactNode;
}

const CardGroup = (props: CardGroupProps): JSX.Element => {
  const { children, } = props;

  return (
    <div>
      {children}
    </div>
  );
};

export default CardGroup;
