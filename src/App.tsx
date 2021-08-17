import React, { useEffect } from 'react';
import MenuBar from './components/menuBar';
import UserModel from './models/userModel';
import buildUserTestData from './models/TestingModels';
import './styles/App.css';

const App = () => {
  useEffect(() => {
    const data = buildUserTestData();
    if (data) {
      UserModel.setUser(data.user);
    }
    return () => {}
  }, []);
  return (
    <div className="App">
      <div className="App-container">
        <MenuBar title="Repair Tracker"/>
      </div>
    </div>
  );
}

export default App;
