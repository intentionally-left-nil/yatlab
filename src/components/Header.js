import React, { PureComponent } from 'react';
import { stringify } from 'querystring';
import PropTypes from 'prop-types';
import UserBadge from './UserBadge';

const SignIn = () => {
  const params = {
    client_id: process.env.CLIENT_ID,
    scope: 'identity.basic',
    redirect_uri: `${process.env.URL_BASE}/api/sign-in`,
  };

  const href = `https://slack.com/oauth/authorize?${stringify(params)}`;
  return (
    <a href={href}><img alt="Sign in with Slack" height="40" width="172" src="https://platform.slack-edge.com/img/sign_in_with_slack.png" srcSet="https://platform.slack-edge.com/img/sign_in_with_slack.png 1x, https://platform.slack-edge.com/img/sign_in_with_slack@2x.png 2x" /></a>
  );
};

class Header extends PureComponent {
  render() {
    return (
      <div id="header">
        {
          this.props.user ? <UserBadge user={this.props.user} /> : <SignIn />
        }
      </div>
    );
  }
}

Header.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string,
    id: PropTypes.string,
    team_id: PropTypes.string,
  }),
};

Header.defaultProps = {
  user: null,
};


export default Header;
