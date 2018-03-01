import React, { Component } from 'react';
import PropTypes, { instanceOf } from 'prop-types';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { withCookies, Cookies } from 'react-cookie';
import TeamsNew from './Teams#new';
import Header from '../components/Header';
import NoMatch from '../components/NoMatch';
import { getUser } from '../helpers/authentication';

class App extends Component {
  render() {
    const user = getUser(this.props.cookies);
    if (this.props.location.pathname === '/' &&
        user &&
        !this.props.team) {
      return (<Redirect to="/teams/new" />);
    }
    return (
      <div>
        <Header user={user} />
        <Switch>
          <Route path="/teams/new" component={TeamsNew} />
          <Route component={NoMatch} />
        </Switch>
      </div>
    );
  }
}

App.propTypes = {
  cookies: instanceOf(Cookies).isRequired,
  team: PropTypes.shape({ name: PropTypes.string }),
  location: PropTypes.shape({ pathname: PropTypes.string }).isRequired,
};

App.defaultProps = {
  team: null,
};

export default withCookies(withRouter(App));
