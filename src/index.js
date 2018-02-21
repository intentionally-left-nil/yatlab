import React from 'react';
import ReactDOM from 'react-dom';
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
ReactDOM.render(content, document.getElementById('root'));
unregister();
