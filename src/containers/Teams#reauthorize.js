import React from 'react';
import SlackButton from '../components/SlackButton';

export default (() => (
  <div>
    <h1>Authorization Required</h1>
    <div>
      We've updated yatlab, but in order to work properly, it needs to be reauthorized. Please click the button below to complete the process.
      Thanks!
    </div>
    <SlackButton />
  </div>
));
