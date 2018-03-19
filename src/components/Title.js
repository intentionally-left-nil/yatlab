import React from 'react';
import { node } from 'prop-types';
import Typography from 'material-ui/Typography';

const Title = props => (
  <Typography variant="headline">{props.children}</Typography>
);

Title.propTypes = {
  children: node.isRequired,
};

export default Title;
