import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

class UserBadge extends PureComponent {
  render() {
    return (
      <div>
        {`Hello, ${this.props.user.name}`}
      </div>
    );
  }
}

UserBadge.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string,
    id: PropTypes.string,
    team_id: PropTypes.string,
  }).isRequired,
};

export default UserBadge;
