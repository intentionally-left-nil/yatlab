import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Button from 'material-ui/Button';
import './UserBadge.css';

class UserBadge extends PureComponent {
  render() {
    return (
      <div className="userBadge">
        <div className="name"> {`Hello, ${this.props.user.name}`} </div>
        <a href="/api/sign-out">
          <Button variant="raised" color="primary" to="/api/sign-out">
            Sign Out
          </Button>
        </a>
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
