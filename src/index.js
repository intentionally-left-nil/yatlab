import React from 'react';
import { hydrate } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { CookiesProvider } from 'react-cookie';

import './index.css';
import App from './containers/App';
import { unregister } from './registerServiceWorker';

// eslint-disable-next-line no-underscore-dangle
const initialState = window.__PRELOADED_STATE__;
const content = (
  <BrowserRouter>
    <CookiesProvider>
      <App {...initialState} />
    </CookiesProvider>
  </BrowserRouter>
);
hydrate(content, document.getElementById('root'));
unregister();
