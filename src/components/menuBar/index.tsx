import { Button, ButtonGroup } from 'react-bootstrap';
import '../../styles/components/menuBar.css';
// import LoginButton from '../loginButton';

export interface MenuBarProps {
  title: string;
  handleLoadTestData: () => void;
}

const MenuBar = (props: MenuBarProps): JSX.Element => {
  const { title, handleLoadTestData } = props;

  return (
    <div className="Menubar-container">
      <div className="Menubar-hamb">
        <Button variant="primary">Hamb</Button>
      </div>
      <div className="Menubar-title">
        <h1>{title}</h1>
      </div>
      <div className="Menubar-login">
        <ButtonGroup>
          {/* <LoginButton currentUsername={user?.userName} /> */}
          <Button>
            User Menu Test
          </Button>
          <Button onClick={handleLoadTestData}>
            Test Data Load
          </Button>
        </ButtonGroup>
      </div>
    </div>
  );
};

export default MenuBar;
