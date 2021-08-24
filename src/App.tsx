import React, { useEffect } from 'react';
import MainMenuBar from './components/menuBar';
import UserModel, { UserData } from './models/userModel';
import buildUserTestData from './models/TestingModels';
// import { useAuth0 } from '@auth0/auth0-react';
// import AuthHandler from './utils/authHandler';
import './styles/App.css';
import PayPeriods from './components/componentModels/payPeriods';
import Container from './components/componentModels/material/container';
import Techs from './components/componentModels/techs';
import Accordian from './components/componentModels/material/accordian';

const loadUserData = (data: UserData | null) => {
  if (data) {
    UserModel.setUser(data.user);
    UserModel.setObjects('PayPeriods', data.payPeriods);
    UserModel.setObjects('RepairOrders', data.repairOrders);
    UserModel.setObjects('Jobs', data.jobs);
    UserModel.setObjects('Techs', data.techs);
  }
};

const App = () => {
  useEffect(() => {
    let data = buildUserTestData();
    loadUserData(data);
    return () => {
      data = null;
    };
  }, []);

  const handleLoadTestData = () => {
    loadUserData(buildUserTestData());
  };

  // #region Auth0 Setup Test
  // const { user, getAccessTokenSilently } = useAuth0();
  // useEffect(() => {
  //   const data = buildUserTestData();
  //   if (data) {
  //     UserModel.setUser(data.user);
  //   }
  //   return () => {};
  // }, []);

  // useEffect(() => {
  //   getAccessTokenSilently()
  //     .then(accessToken => AuthHandler.loginAPI(accessToken))
  //     .catch(err => console.log(err));
  //   return () => {};
  // }, [getAccessTokenSilently, user?.sub]);
  // #endregion

  return (
    <div className="App">
      <Container flexDirection="column">
        <MainMenuBar title="Repair Tracker" handleLoadTestData={handleLoadTestData} />
        <PayPeriods />
        <Accordian justify="space-between">
          <Techs />
        </Accordian>
      </Container>
      {/* <div className="App-container">
        <div className="App-body-container">
        </div>
      </div> */}
    </div>
  );
};

export default App;
