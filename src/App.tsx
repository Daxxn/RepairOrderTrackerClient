import React, { useEffect } from 'react';
import MenuBar from './components/menuBar';
import UserModel, { UserData } from './models/userModel';
import buildUserTestData from './models/TestingModels';
// import { useAuth0 } from '@auth0/auth0-react';
// import AuthHandler from './utils/authHandler';
import './styles/App.css';
import PayPeriods from './components/componentModels/payPeriods';

const loadUserData = (data: UserData | null) => {
  if (data) {
    UserModel.setUser(data.user);
    UserModel.setObjects('PayPeriods', data.payPeriods);
    UserModel.setObjects('RepairOrders', data.repairOrders);
    UserModel.setObjects('Jobs', data.jobs);
    UserModel.setObjects('Techs', data.techs);
  }
}

const App = () => {
  useEffect(() => {
    loadUserData(buildUserTestData());
    return () => {}
  }, []);

  const handleLoadTestData = () => {
    loadUserData(buildUserTestData());
  }

  //#region Auth0 Setup Test
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
  //#endregion
  
  return (
    <div className="App">
      <div className="App-container">
        <MenuBar title="Repair Tracker" handleLoadTestData={handleLoadTestData} />
        <div className="App-body-container">
          <PayPeriods />
        </div>
      </div>
    </div>
  );
};

export default App;
