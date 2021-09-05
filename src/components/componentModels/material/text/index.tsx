import React, { ReactNode } from 'react';
import { AlignType, TextSizeType } from '../types';
import './text.css';

export interface TextProps {
  value?: string;
  children?: ReactNode;
  size?: TextSizeType;
  className?: string;
  align?: AlignType;
}

const Text = (props: TextProps): JSX.Element => {
  const { value, children, size, className, align } = props;

  return (
    <p
      className={`Base-text${size ? ` ${size}` : ' med'}${
        className ? ` ${className}` : ''
      }${align ? ` ${align}` : ''}`}
    >
      {children ?? value}
    </p>
  );
};

export default Text;
