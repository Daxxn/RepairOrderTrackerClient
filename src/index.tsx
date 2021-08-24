import React from 'react';
import ReactDOM from 'react-dom';
import { Auth0Provider } from '@auth0/auth0-react';
import * as WebVitals from './reportWebVitals';
import App from './App';
import './styles/index.css';
import Config from './utils/config';

const config = Config.get();

ReactDOM.render(
  <>
    <Auth0Provider
      domain="dev-6ryc0ksm.us.auth0.com"
      clientId="cC3XKQ9lV0ayv4WDzMF3nPFacThXL36K"
      redirectUri="http://localhost:3000/"
      scope="read:current_user update:current_user_metadata"
      audience="http://www.repair-order-tracker-api.com"
    >
      <App />
    </Auth0Provider>
    {/* <App /> */}
  </>,
  document.getElementById('root')
);

WebVitals.default(console.log);
