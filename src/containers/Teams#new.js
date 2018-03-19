import React from 'react';
import { Link } from 'react-router-dom';
import SlackButton from '../components/SlackButton';
import Centered from '../components/Centered';

export default (() => (
  <Centered>
    <h1>Install Yatlab</h1>
    <p>Click the button below to add Yatlab to your Slack workspace. Yatlab will request permission to monitor your channels for acronyms. Please refer to our <Link to="/privacy">privacy policy</Link> for more information.</p>
    <SlackButton />
  </Centered>
));
