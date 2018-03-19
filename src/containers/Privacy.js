import React from 'react';
import Centered from '../components/Centered';
import Title from '../components/Title';
import Body from '../components/Body';

const Privacy = () => (
  <Centered>
    <Title>Privacy Policy</Title>
    <Body>
      <p>The privacy policy is very simple. Yatlab only stores the acronyms you enter on this website.</p>
      <p>Yatlab also stores the authorization token and team name so our bot can join your workspace. If yatlab has a problem that causes it to crash, our internal logs may inadvertantly have personal information (if a message caused a crash). We promise to strip out any identifying information before investigating.</p>
      <p>Yatlab uses a cookie so you can stay logged in, but this is not used to track you in any other way.</p>
      <p>Yatlab does <b>NOT</b> store the contents of your communications or use 3rd party tracking cookies.</p>
    </Body>
  </Centered>
);

export default Privacy;
