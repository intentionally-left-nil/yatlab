import React, { Component } from 'react';
import PropTypes from 'prop-types';

class TeamShow extends Component {
  render() {
    return (
      <h1>{this.props.match.params.id}</h1>
    );
  }
}

TeamShow.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};

export default TeamShow;
