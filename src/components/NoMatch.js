import React from 'react';
import { Link } from 'react-router-dom';
import Centered from './Centered';
import './NoMatch.css';

export default () => (
  <Centered>
    <div className="noMatch">
      <div className="number">404</div>
      <Link to="/">Homepage</Link>
    </div>
  </Centered>
);
