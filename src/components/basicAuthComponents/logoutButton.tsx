import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import Button from '../componentModels/material/button';
import './auth.css';

const LogoutButton = (): JSX.Element => {
  const { logout } = useAuth0();

  return (
    <Button
      theme="dark"
      className="Base-auth-button"
      onClick={() => logout({ returnTo: window.location.origin })}
    >
      Log Out
    </Button>
  );
};

export default LogoutButton;
