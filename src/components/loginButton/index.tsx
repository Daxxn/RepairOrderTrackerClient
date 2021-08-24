import '../../styles/components/login.css';
import { useAuth0 } from '@auth0/auth0-react';
import UserModel from '../../models/userModel';
import Button from '../componentModels/material/button';

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
        <Button type="dark" onClick={() => logout({ returnTo: window.location.origin })}>
          {user ? `Logout ${user.userName}` : 'Logout'}
        </Button>
      ) : (
        <Button type="dark" onClick={() => loginWithRedirect()}>
          Login
        </Button>
      )}
    </>
  );
};

export default LoginButton;
