import React, { MouseEventHandler, ReactNode } from 'react';
import { ThemeType } from '../types';
import './button.css';

export interface ButtonProps {
  onClick?: MouseEventHandler;
  className?: string;
  children?: ReactNode;
  content?: string;
  type?: ThemeType;
}

const Button = (props: ButtonProps): JSX.Element => {
  const { onClick, children, content, type, className } = props;

  let cssClass = className;
  if (!cssClass) {
    cssClass = `Base-button ${type ?? ''}`;
  }
  return (
    <button type="button" onClick={onClick} className={cssClass}>
      {children ?? content}
    </button>
  );
};

export default Button;
