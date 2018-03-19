import React from 'react';
import { oneOfType, arrayOf, node } from 'prop-types';
import './Centered.css';

const Centered = props => (
  <div className="centeredContent">
    {props.children}
  </div>
);

Centered.propTypes = {
  children: oneOfType([
    arrayOf(node),
    node,
  ]).isRequired,
};

export default Centered;
