import React, { ReactNode } from 'react';
import Title from '../title';
import { TextSizeType, ThemeType } from '../types';
import './titleCard.css';

export interface TitleCardProps {
  value?: string;
  children?: ReactNode;
  size?: TextSizeType;
  theme?: ThemeType;
}

const TitleCard = (props: TitleCardProps): JSX.Element => {
  const { value, children, theme, size } = props;

  return (
    <div className={`Base-title-card ${theme}`}>
      <Title value={value} size={size}>
        {children}
      </Title>
    </div>
  );
};

export default TitleCard;
