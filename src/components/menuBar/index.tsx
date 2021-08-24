import React from 'react';
import Button from '../componentModels/material/button';
import Container from '../componentModels/material/container';
import '../../styles/components/mainMenuBar.css';
import MenuBar from '../componentModels/material/menuBar';
import Title from '../componentModels/material/title';
// import LoginButton from '../loginButton';

export interface MainMenuBarProps {
  title: string;
  handleLoadTestData: () => void;
}

const MainMenuBar = (props: MainMenuBarProps): JSX.Element => {
  const { title, handleLoadTestData } = props;

  return (
    <MenuBar flexDir="row" theme="light">
      <Button type="dark">Hamb</Button>
      <Title size="med">{title}</Title>
      <Container flexDirection="row">
        {/* <LoginButton currentUsername={user?.userName} /> */}
        <Button type="dark">User Menu Test</Button>
        <Button type="dark" onClick={handleLoadTestData}>
          Test Data Load
        </Button>
      </Container>
    </MenuBar>
  );
};

export default MainMenuBar;
