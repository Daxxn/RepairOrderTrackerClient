import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import Button from '../componentModels/material/button';
import './auth.css';

const LoginButton = (): JSX.Element => {
  const { loginWithRedirect } = useAuth0();

  return (
    <Button theme="dark" className="Base-auth-button" onClick={() => loginWithRedirect()}>
      Log In
    </Button>
  );
};

export default LoginButton;
