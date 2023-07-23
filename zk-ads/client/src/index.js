import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Auth0Provider } from '@auth0/auth0-react';

import reportWebVitals from './reportWebVitals';
import MetamaskInfo from './helpers/MetamaskInfo';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Auth0Provider
  domain="dev-63zyub2tmag74b70.us.auth0.com"
  clientId="UGFlphh0HK1BEcw0WAcRS55BCNJcvWP8"
  authorizationParams={{
    redirect_uri: window.location.origin
  }}
>
  <React.StrictMode>

    <App />
    <MetamaskInfo />

  </React.StrictMode>
  </Auth0Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
