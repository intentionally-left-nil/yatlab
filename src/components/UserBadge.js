import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Button from 'material-ui-next/Button';
import { Link } from 'react-router-dom';
import './UserBadge.css';

class UserBadge extends PureComponent {
  render() {
    return (
      <div className="userBadge">
        <div className="name"> {`Hello, ${this.props.user.name}`} </div>
        <Button variant="raised" color="primary" component={Link} to="/api/sign-out">
          Sign Out
        </Button>
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
