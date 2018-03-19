import React from 'react';
import Centered from '../components/Centered';
import Title from '../components/Title';
import Body from '../components/Body';

const Root = () => (
  <Centered>
    <Title>Yatlab</Title>
    <Body>
      <div>
        Welcome to Yatlab! Yatlab is an acronym expander.
      </div>
      <h2>Installation</h2>
      <div>
        <ol>
          <li>Click the Sign in button above</li>
          <li>After signing in, add yatlab to your Slack workspace</li>
          <li>Add some acronyms and their definitions to your team via this website</li>
          <li>Add the yatlab bot to any channel you want acronyms for</li>
        </ol>
      </div>
      <h2>Usage</h2>
      <div>
        Once installed, yatlab will add a question mark emoji to any message containing the acronyms you define.
        Any user can add a reaction to be notified of what the acronym means. You can also direct message yatlab <pre style={{display: 'inline'}}>help</pre> at any time.
      </div>
    </Body>
  </Centered>
);

export default Root;
