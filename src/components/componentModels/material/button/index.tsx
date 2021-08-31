import React, { MouseEventHandler, ReactNode } from 'react';
import { ThemeType } from '../types';
import './button.css';

export interface ButtonProps {
  onClick?: MouseEventHandler;
  className?: string;
  children?: ReactNode;
  theme?: ThemeType;
}

const Button = (props: ButtonProps): JSX.Element => {
  const { onClick, children, theme, className } = props;

  let cssClass = className;
  if (!cssClass) {
    cssClass = `Base-button ${theme ?? ''}`;
  }
  return (
    <button
      type="button"
      onClick={onClick}
      className={`Base-button${className ? ` ${className}` : ''}${
        theme ? ` ${theme}` : ''
      }`}
    >
      {children}
    </button>
  );
};

export default Button;
