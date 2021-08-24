import React, { useEffect, useState } from 'react';
import { useAuth0, User } from '@auth0/auth0-react';
import MainMenuBar from './components/menuBar';
import UserModel, { UserData } from './models/userModel';
import buildUserTestData from './models/TestingModels';
import AuthHandler from './utils/authHandler';
import PayPeriods from './components/componentModels/payPeriods';
import Container from './components/componentModels/material/container';
import Techs from './components/componentModels/techs';
import Accordian from './components/componentModels/material/accordian';
import Config from './utils/config';
import './styles/App.css';
import ErrorBoundary from './components/componentModels/material/errorBoundary';
import Card from './components/componentModels/material/card';

const config = Config.get();

const loadUserData = (data: UserData | null) => {
  if (data) {
    UserModel.setUser(data.user);
    UserModel.setObjects('PayPeriods', data.payPeriods);
    UserModel.setObjects('RepairOrders', data.repairOrders);
    UserModel.setObjects('Jobs', data.jobs);
    UserModel.setObjects('Techs', data.techs);
  }
};

const App = (): JSX.Element => {
  const [mainUser, setuser] = useState<UserModel | null>(UserModel.getUser());

  useEffect(() => {
    UserModel.append('app', updatedUser => {
      setuser(updatedUser);
    });
    return () => UserModel.remove('app');
  }, []);

  const handleLoadTestData = () => {
    if (!config.useAuth) {
      loadUserData(buildUserTestData());
    }
  };

  // #region Auth0 API Call Hook
  const { user, getAccessTokenSilently, isAuthenticated, isLoading } = useAuth0();
  useEffect(() => {
    const currentUser = UserModel.getUser();
    const getUserMetadata = async () => {
      try {
        if (!currentUser) {
          const accessToken = await getAccessTokenSilently();

          if (user) {
            const apiResponse = await fetch(`http://localhost:2000/api/users/`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                // eslint-disable-next-line prettier/prettier
                'Authorization': `Bearer ${accessToken}`,
              },
              body: JSON.stringify({
                email: `${user?.email}`,
                userName: user?.preferred_username,
                firstName: user.given_name,
                lastName: user.family_name,
              }),
            });
            const userModel = (await apiResponse.json()) as UserModel;

            console.log(user);
            console.log(userModel);

            UserModel.setUser(userModel);
          }
        }
      } catch (e) {
        console.log(e);
      }
    };

    getUserMetadata()
      .then()
      .catch(err => console.log(err));
  }, [getAccessTokenSilently, user?.sub]);
  // #endregion

  return (
    <div className="App">
      <Container flexDirection="column">
        <MainMenuBar
          user={mainUser}
          title="Repair Tracker"
          handleLoadTestData={handleLoadTestData}
        />
        {isLoading ? (
          <>
            {isAuthenticated ? (
              <>
                <ErrorBoundary>
                  <PayPeriods />
                </ErrorBoundary>
                <ErrorBoundary>
                  <Accordian justify="space-between">
                    <Techs />
                  </Accordian>
                </ErrorBoundary>
              </>
            ) : (
              <Card>No user is logged in.</Card>
            )}
          </>
        ) : (
          <Card theme="dark">Loading...</Card>
        )}
      </Container>
      {/* <div className="App-container">
        <div className="App-body-container">
        </div>
      </div> */}
    </div>
  );
};

export default App;
