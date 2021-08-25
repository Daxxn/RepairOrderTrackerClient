import React from 'react';
import ReactDOM from 'react-dom';
import { Auth0Provider } from '@auth0/auth0-react';
import * as WebVitals from './reportWebVitals';
import App from './App';
import './styles/index.css';
import authConfig from './.authconfig.json';

ReactDOM.render(
  <>
    {/* <Auth0Provider
    domain="dev-6ryc0ksm.us.auth0.com"
    clientId="cC3XKQ9lV0ayv4WDzMF3nPFacThXL36K"
    redirectUri="http://localhost:3000/"
    scope="read:current_user update:current_user_metadata"
    audience="http://www.repair-order-tracker-api.com"
  > */}
    <Auth0Provider
      domain={authConfig.authDomain}
      clientId={authConfig.authClientId}
      redirectUri={authConfig.authCallbackUrl}
      // For some reason ESLint gets confused by new properties
      // added to a json object.
      scope={authConfig.authScopes.join(' ')} // eslint-disable-line
      audience={authConfig.authAudience}
    >
      <App />
    </Auth0Provider>
  </>,
  document.getElementById('root')
);

WebVitals.default(console.log);
