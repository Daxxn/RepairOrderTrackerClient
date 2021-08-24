import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as WebVitals from './reportWebVitals';
import './styles/index.css';
//  import { Auth0Provider } from '@auth0/auth0-react';

ReactDOM.render(
  <>
    {/* <Auth0Provider
        domain="dev-6ryc0ksm.us.auth0.com"
        clientId="cC3XKQ9lV0ayv4WDzMF3nPFacThXL36K"
        redirectUri={window.location.origin}
      >
        <App />
      </Auth0Provider> */}
    <App />
  </>,
  document.getElementById('root')
);

WebVitals.default(console.log);
