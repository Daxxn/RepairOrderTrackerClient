import React, { ReactNode } from 'react';
import ErrorMessenger from '../../../../utils/ErrorMessenger';
import './icon.css';

export interface IconProps {
  children: ReactNode;
  invert: boolean;
  className?: string;
  width?: number | string;
  height?: number | string;
}

const Icon = (props: IconProps): JSX.Element => {
  const { children, className, invert, width, height } = props;

  const css = {
    width,
    height,
  };

  return (
    <div
      className={`Base-icon${className ? ` ${className}` : ''}${invert ? ' invert' : ''}`}
      style={css}
    >
      {children}
    </div>
  );
};

export default Icon;
