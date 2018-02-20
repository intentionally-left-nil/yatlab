import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import './index.css';
import App from './containers/App';
import { unregister } from './registerServiceWorker';

const content = (
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
ReactDOM.render(content, document.getElementById('root'));
unregister();
