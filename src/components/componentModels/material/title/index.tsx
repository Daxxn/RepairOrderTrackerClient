import React, { CSSProperties, ReactNode } from 'react';
import { TextSizeType, ThemeType } from '../types';
import './title.css';

export interface TitleProps {
  value?: string;
  children?: ReactNode;
  column?: number;
  row?: number;
  size?: TextSizeType;
  theme?: ThemeType;
}

const Title = (props: TitleProps): JSX.Element => {
  const { value, children, column, row, size, theme } = props;

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
    <h1 className={`Base-title ${size} ${theme ?? ''}`} style={css}>
      {children ?? value}
    </h1>
  );
};

export default Title;
