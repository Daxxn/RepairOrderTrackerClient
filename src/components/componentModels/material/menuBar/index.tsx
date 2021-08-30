import React, { ReactNode } from 'react';
import Container from '../container';
import { FlexDirType, ThemeType } from '../types';
import './menuBar.css';

export interface MenuBarProps {
  children?: ReactNode;
  flexDir?: FlexDirType;
  theme: ThemeType;
}

const MenuBar = (props: MenuBarProps): JSX.Element => {
  const { children, flexDir, theme } = props;

  return (
    <Container className={`Base-menu-bar ${theme}`} flexDirection={flexDir}>
      {children}
    </Container>
  );
};

export default MenuBar;
