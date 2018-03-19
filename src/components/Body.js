import React from 'react';
import { oneOfType, arrayOf, node } from 'prop-types';
// import Typography from 'material-ui/Typography';

const Body = props => (
  // We can't directly use Typography variant="body1" due to nested p tags
  // The short-term fix is to just steal the className and call it a day.
  <div className="MuiTypography-body1-10">{props.children}</div>
);

Body.propTypes = {
  children: oneOfType([
    arrayOf(node),
    node,
  ]).isRequired,
};

export default Body;
