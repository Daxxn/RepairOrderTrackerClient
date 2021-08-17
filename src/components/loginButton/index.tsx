import '../../styles/components/login.css';
import { Button } from 'react-bootstrap';
import { useAuth0 } from '@auth0/auth0-react';

export interface LoginProps {
  currentUsername: string | undefined;
}

const LoginButton = (props: LoginProps): JSX.Element => {
  const { currentUsername } = props;
  const { loginWithRedirect, logout } = useAuth0();

  return (
    <>
      {currentUsername ? (
        <Button onClick={() => logout({ returnTo: window.location.origin })}>{currentUsername ? `Logout ${ currentUsername}` : 'Logout'}</Button>
      ) : (
        <Button onClick={() => loginWithRedirect()}>Login</Button>
      )}
    </>
  );
};

export default LoginButton;
