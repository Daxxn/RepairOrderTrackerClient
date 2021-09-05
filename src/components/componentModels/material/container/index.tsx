import React, { CSSProperties, ReactNode } from 'react';
import './container.css';
import { FlexDirType, JustifyFlexType } from '../types';

export interface ContainerProps {
  children?: ReactNode;
  className?: string;
  flexDirection?: FlexDirType;
  justify?: JustifyFlexType;
}

const Container = (props: ContainerProps): JSX.Element => {
  const { children, className, flexDirection } = props;

  // #region CSS
  const css: CSSProperties = {
    flexDirection: flexDirection ?? undefined,
  };
  // #endregion

  return (
    <div className={`Base-container${className ? ` ${className}` : ''}`} style={css}>
      {children}
    </div>
  );
};

export default Container;
