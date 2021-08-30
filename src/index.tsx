import React from 'react';
import ReactDOM from 'react-dom';
import { Auth0Provider } from '@auth0/auth0-react';
import * as WebVitals from './reportWebVitals';
import App from './App';
import './styles/index.css';
import authConfig from './.authconfig.json';

ReactDOM.render(
  <>
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
