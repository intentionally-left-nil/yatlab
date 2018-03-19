import React from 'react';
import SlackButton from '../components/SlackButton';
import Centered from '../components/Centered';
import Title from '../components/Title';

export default (() => (
  <Centered>
    <Title>Authorization Required</Title>
    <p>
      We've updated yatlab, but in order to work properly, it needs to be reauthorized. Please click the button below to complete the process.
      Thanks!
    </p>
    <SlackButton />
  </Centered>
));
