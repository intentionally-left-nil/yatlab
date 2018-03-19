import React from 'react';
import { Link } from 'react-router-dom';
import SlackButton from '../components/SlackButton';
import Centered from '../components/Centered';
import Title from '../components/Title';
import Body from '../components/Body';

export default (() => (
  <Centered>
    <Title>Install Yatlab</Title>
    <Body>
      <p>Click the button below to add Yatlab to your Slack workspace. Yatlab will request permission to monitor your channels for acronyms. Please refer to our <Link to="/privacy">privacy policy</Link> for more information.</p>
    </Body>
    <SlackButton />
  </Centered>
));
