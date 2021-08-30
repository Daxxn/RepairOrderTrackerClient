import React from 'react';
import Button from '../componentModels/material/button';
import Container from '../componentModels/material/container';
import MenuBar from '../componentModels/material/menuBar';
import Title from '../componentModels/material/title';
import LoginButton from '../basicAuthComponents/loginButton';
import LogoutButton from '../basicAuthComponents/logoutButton';
import UserModel from '../../models/userModel';
import '../../styles/components/mainMenuBar.css';

export interface MainMenuBarProps {
  title: string;
}

const MainMenuBar = (props: MainMenuBarProps): JSX.Element => {
  const { title } = props;
  const user = UserModel.getUser();

  return (
    <MenuBar flexDir="row" theme="light">
      <Button theme="dark">Hamb</Button>
      <Title size="med">
        {title} - {user?.userName}
      </Title>
      <Container flexDirection="row">
        <LoginButton />
        <LogoutButton />
      </Container>
    </MenuBar>
  );
};

export default MainMenuBar;
