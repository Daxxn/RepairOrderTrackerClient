import React, { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import MainMenuBar from './components/menuBar';
import UserModel, { UserData } from './models/userModel';
import buildUserTestData from './models/TestingModels';
import PayPeriods from './components/componentModels/payPeriods';
import Container from './components/componentModels/material/container';
import Config from './utils/config';
import Card from './components/componentModels/material/card';
import './styles/App.css';

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
  const { user, getAccessTokenSilently, isAuthenticated, isLoading } = useAuth0();

  const [mainUser, setuser] = useState<UserModel | null>(UserModel.getUser());

  useEffect(() => {
    UserModel.appendUserObserver('app', updatedUser => {
      setuser(updatedUser);
    });
    return () => UserModel.removeUserObserver('app');
  }, []);

  const handleLoadTestData = () => {
    if (!config.useAuth) {
      loadUserData(buildUserTestData());
    }
  };

  // #region Auth0 API Call Hook
  useEffect(() => {
    const currentUser = UserModel.getUser();
    const getUserMetadata = async () => {
      try {
        if (!currentUser) {
          const accessToken = await getAccessTokenSilently();

          if (user) {
            const apiResponse = await fetch(`http://localhost:2000/api/users`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                // eslint-disable-next-line prettier/prettier
                'Authorization': `Bearer ${accessToken}`,
              },
              body: JSON.stringify({
                email: user.email,
                userName: user.preferred_username,
                firstName: user.given_name,
                lastName: user.family_name,
              }),
            });

            const userData = (await apiResponse.json()) as UserData;

            console.log(user);
            console.log(userData);

            UserModel.setUserData(userData);
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

  return (
    <div className="App">
      <Container flexDirection="column">
        <MainMenuBar
          user={mainUser}
          title="Repair Tracker"
          handleLoadTestData={handleLoadTestData}
        />
        {!isLoading ? (
          <>
            {isAuthenticated ? (
              <>
                {mainUser !== null ? (
                  <PayPeriods payPeriodIds={mainUser.payPeriods} />
                ) : (
                  <Card>
                    ERROR : User is logged in but the <code>mainUser</code>s state is not
                    set properly!
                  </Card>
                )}
              </>
            ) : (
              <Card theme="light">Not Logged In.</Card>
            )}
          </>
        ) : (
          <Card theme="dark">Loading...</Card>
        )}
      </Container>
    </div>
  );
};

export default App;
