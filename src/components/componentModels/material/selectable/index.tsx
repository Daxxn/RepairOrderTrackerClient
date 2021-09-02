import React, { ReactNode, MouseEventHandler } from 'react';
import './selectable.css';

export interface SelectableProps {
  children?: ReactNode;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  isSelected?: boolean;
}

const Selectable = (props: SelectableProps): JSX.Element => {
  const { children, onClick, isSelected } = props;

  return (
    <button
      type="button"
      onClick={onClick}
      className={`Base-selectable${isSelected ? ` selectable-selected` : ''}`}
    >
      {children}
    </button>
  );
};

export default Selectable;
