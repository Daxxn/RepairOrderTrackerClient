import '../../styles/components/login.css';
import { Button } from 'react-bootstrap';
import { useAuth0 } from '@auth0/auth0-react';
import UserModel from '../../models/userModel';

export interface LoginProps {
  currentUsername: string | undefined;
}

const LoginButton = (props: LoginProps): JSX.Element => {
  const { currentUsername } = props;
  const user = UserModel.getUser();
  const { loginWithRedirect, logout } = useAuth0();

  return (
    <>
      {currentUsername ? (
        <Button onClick={() => logout({ returnTo: window.location.origin })}>{user ? `Logout ${ user.userName}` : 'Logout'}</Button>
      ) : (
        <Button onClick={() => loginWithRedirect()}>Login</Button>
      )}
    </>
  );
};

export default LoginButton;
