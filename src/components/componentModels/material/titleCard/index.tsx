import React, { ReactNode } from 'react';
import Title from '../title';
import { AlignType, TextSizeType, ThemeType } from '../types';
import './titleCard.css';

export interface TitleCardProps {
  value?: string;
  children?: ReactNode;
  size?: TextSizeType;
  theme?: ThemeType;
  align?: AlignType;
}

const TitleCard = (props: TitleCardProps): JSX.Element => {
  const { value, children, theme, size, align } = props;

  return (
    <div
      className={`Base-title-card${theme ? ` ${theme}` : ''}${align ? ` ${align}` : ''}`}
    >
      <Title value={value} size={size}>
        {children}
      </Title>
    </div>
  );
};

export default TitleCard;
