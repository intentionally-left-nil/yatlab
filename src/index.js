import React from 'react';
import { hydrate } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { CookiesProvider } from 'react-cookie';

import './index.css';
import App from './containers/App';
import { unregister } from './registerServiceWorker';

const content = (
  <BrowserRouter>
    <CookiesProvider>
      <App />
    </CookiesProvider>
  </BrowserRouter>
);
hydrate(content, document.getElementById('root'));
unregister();
