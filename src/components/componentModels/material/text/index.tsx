import React, { ReactNode } from 'react';
import { TextSizeType } from '../types';
import './text.css';

export interface TextProps {
  value?: string;
  children?: ReactNode;
  size?: TextSizeType;
  className?: string;
}

const Text = (props: TextProps): JSX.Element => {
  const { value, children, size, className } = props;

  return (
    <p
      className={`Base-text${size ? ` ${size}` : ' med'}${
        className ? ` ${className}` : ''
      }`}
    >
      {children ?? value}
    </p>
  );
};

export default Text;
