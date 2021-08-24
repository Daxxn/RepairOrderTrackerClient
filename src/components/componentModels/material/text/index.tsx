import React, { CSSProperties, ReactNode } from 'react';
import { TextSizeType } from '../types';
import './text.css';

export interface TextProps {
  value?: string;
  children?: ReactNode;
  column?: number;
  row?: number;
  size?: TextSizeType;
}

const Text = (props: TextProps): JSX.Element => {
  const { value, children, column, row, size } = props;

  const columnObj = {
    gridColumn: column,
  };
  const rowObj = {
    gridRow: row,
  };
  const css: CSSProperties = {
    ...columnObj,
    ...rowObj,
  };

  return (
    <p className={`Base-text ${size ?? 'med'}`} style={css}>
      {children ?? value}
    </p>
  );
};

export default Text;
