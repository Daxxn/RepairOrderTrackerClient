import { Button } from 'react-bootstrap';
import UserModel from '../../models/userModel';
import '../../styles/components/menuBar.css';
import LoginButton from '../loginButton';

export interface MenuBarProps {
  title: string;
}

const MenuBar = (props: MenuBarProps): JSX.Element => {
  const {title} = props;

  const user = UserModel.getUser();

  return (
    <div className="Menubar-container">
      <div className="Menubar-hamb">
        <Button>
          Hamb
        </Button>
      </div>
      <div className="Menubar-title">
        <h1>{title}</h1>
      </div>
      <div className="Menubar-login">
        <LoginButton currentUsername={user?.userName} />
      </div>
    </div>
  );
};

export default MenuBar;
