import React from 'react';
import Button from '../componentModels/material/button';
import Container from '../componentModels/material/container';
import MenuBar from '../componentModels/material/menuBar';
import Title from '../componentModels/material/title';
// import LoginButton from '../loginButton';
import LoginButton from '../basicAuthComponents/loginButton';
import LogoutButton from '../basicAuthComponents/logoutButton';
import UserModel from '../../models/userModel';
import '../../styles/components/mainMenuBar.css';

export interface MainMenuBarProps {
  title: string;
  user: UserModel | null;
  handleLoadTestData: () => void;
}

const MainMenuBar = (props: MainMenuBarProps): JSX.Element => {
  const { title, user, handleLoadTestData } = props;

  return (
    <MenuBar flexDir="row" theme="light">
      <Button theme="dark">Hamb</Button>
      <Title size="med">{title}</Title>
      <Container flexDirection="row">
        <LoginButton />
        <LogoutButton />
        {/* <Button type="dark">User Menu Test</Button>
        <Button type="dark" onClick={handleLoadTestData}>
          Test Data Load
        </Button> */}
      </Container>
    </MenuBar>
  );
};

export default MainMenuBar;
