import React, { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import Cookies from 'js-cookie';
import MainMenuBar from './components/menuBar';
import UserModel, { ModelType } from './models/userModel';
import Container from './components/componentModels/material/container';
import Card from './components/componentModels/material/card';
import { createUser, postLogin, fetchUserData } from './utils/fetchMethods';
import ServerMessage from './utils/serverMessage';
import './styles/App.css';
import DataContainer from './components/dataContainer';
import { TechObjects } from './models/techModel';

export type HandleNewModel = (
  type: ModelType,
  parentType?: ModelType,
  parentId?: string
) => void;

const serverMsgs = ServerMessage.get();

const App = (): JSX.Element => {
  const { user, getAccessTokenSilently, isAuthenticated, isLoading } = useAuth0();

  const [mainUser, setuser] = useState<UserModel | null>(null);

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

                newUserData = await fetchUserData();
                console.log('User Response:', newUser);
                console.log('User Data:', newUserData);
              } catch (error) {
                // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
                if (error.message === serverMsgs.noUserFound) {
                  newUser = await createUser(user);

                  if ('message' in newUser) {
                    throw new Error(newUser.message);
                  }

                  console.log('Auth0 User:', user);
                  console.log('User:', newUser);

                  newUserData = await fetchUserData();
                  console.log('User Data:', newUserData);
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

  // #endregion

  useEffect(() => {
    UserModel.appendUserObserver('app', updatedUser => {
      console.log('In App Update User');
      setuser(updatedUser);
    });
    return () => UserModel.removeUserObserver('app');
  }, []);

  const handleNewModel = async (
    type: ModelType,
    parentType?: ModelType,
    parentId?: string
  ) => {
    try {
      await UserModel.newModel(type, parentType, parentId);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="App">
      <Container flexDirection="column">
        <MainMenuBar
          title="Repair Tracker"
          handleNewModel={() =>
            handleNewModel('Jobs', 'RepairOrders', '6124af11ced8aca5e0344061')
          }
        />
        {!isLoading ? (
          <>
            {isAuthenticated ? (
              <>
                {mainUser ? (
                  <DataContainer
                    payPeriodIds={mainUser.payPeriods}
                    handleNewModel={handleNewModel}
                    techIds={Object.keys(UserModel.getObjects('Techs') as TechObjects)}
                  />
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
