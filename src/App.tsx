import React, { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import Cookies from 'js-cookie';
import MainMenuBar from './components/menuBar';
import UserModel from './models/userModel';
// import buildUserTestData from './models/TestingModels';
import PayPeriods from './components/componentModels/payPeriods';
import Container from './components/componentModels/material/container';
// import Config from './utils/config';
import Card from './components/componentModels/material/card';
import { createuser, postLogin, fetchUserData } from './utils/fetchMethods';
import ServerMessage from './utils/serverMessage';
import './styles/App.css';

// const config = Config.getAuthConfig();
const serverMsgs = ServerMessage.get();

const App = (): JSX.Element => {
  const { user, getAccessTokenSilently, isAuthenticated, isLoading } = useAuth0();

  const [mainUser, setuser] = useState<UserModel | null>(null);

  // const handleLoadTestData = () => {
  //   if (!config.useAuth) {
  //     loadUserData(buildUserTestData());
  //   }
  // };

  // #region Auth0 API Call Hook
  // #region Auth0 Gen 1
  // useEffect(() => {
  //   const currentUser = UserModel.getUser();
  //   const getUserMetadata = async () => {
  //     try {
  //       if (!currentUser) {
  //         const accessToken = await getAccessTokenSilently();

  //         if (user) {
  //           console.log(user);
  //           const originalToken = Cookies.get('accessToken');
  //           if (accessToken) {
  //             if (accessToken !== originalToken) {
  //               Cookies.set('accessToken', accessToken);
  //             }
  //           }
  //           const apiResponse = await fetch(`http://localhost:2000/api/users`, {
  //             method: 'POST',
  //             headers: {
  //               'Content-Type': 'application/json',
  //               // eslint-disable-next-line prettier/prettier
  //               'Authorization': `Bearer ${accessToken}`,
  //             },
  //             credentials: 'include',
  //             body: JSON.stringify({
  //               email: user.email,
  //               userName: user.preferred_username,
  //               firstName: user.given_name,
  //               lastName: user.family_name,
  //             }),
  //           });

  //           const userData = (await apiResponse.json()) as UserData;

  //           console.log(user);
  //           console.log(userData);

  //           UserModel.setUserData(userData);
  //         }
  //       }
  //     } catch (e) {
  //       console.log(e);
  //     }
  //   };

  //   getUserMetadata()
  //     .then()
  //     .catch(err => console.log(err));
  // }, [getAccessTokenSilently, user?.sub]);
  // #endregion

  // #region Auth0 Gen 2
  useEffect(() => {
    const currentUser = UserModel.getUser();
    let newUser;
    let newUserData;
    const getUserMetadata = async () => {
      try {
        if (!currentUser) {
          const accessToken = await getAccessTokenSilently();

          Cookies.set('accessToken', accessToken);
          if (user) {
            if (user.sub) {
              try {
                newUser = await postLogin(user.sub);
                console.log('Updating observers', newUser);
                // setuser(userInfo.user);

                newUserData = await fetchUserData();
                console.log('User Response:', newUser);
                console.log('User Data:', newUserData);
                // UserModel.setUserData(newUserData);
              } catch (error) {
                // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
                if (error.message === serverMsgs.noUserFound) {
                  newUser = await createuser(user);

                  if ('message' in newUser) {
                    throw new Error(newUser.message);
                  }

                  // setuser(newUser.user);

                  console.log('Auth0 User:', user);
                  console.log('User:', newUser);

                  newUserData = await fetchUserData();
                  console.log('User Data:', newUserData);
                  // UserModel.setUserData(newUserData);
                }
                throw error;
              }
              UserModel.initializeUser(newUser, newUserData);
            }
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

  // #region Auto0 Gen 3
  // #endregion

  // #endregion

  useEffect(() => {
    UserModel.appendUserObserver('app', updatedUser => {
      console.log('In App Update User');
      setuser(updatedUser);
    });
    return () => UserModel.removeUserObserver('app');
  }, []);

  return (
    <div className="App">
      <Container flexDirection="column">
        <MainMenuBar title="Repair Tracker" />
        {!isLoading ? (
          <>
            {isAuthenticated ? (
              <>
                {mainUser ? (
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
