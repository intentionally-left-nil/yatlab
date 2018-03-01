import React, { Component } from 'react';
import PropTypes, { instanceOf } from 'prop-types';
import { Switch, Route } from 'react-router-dom';
import { withCookies, Cookies } from 'react-cookie';
import TeamsNew from './Teams#new';
import Header from '../components/Header';
import NoMatch from '../components/NoMatch';
import { getUser } from '../helpers/authentication';

class App extends Component {
  render() {
    const user = getUser(this.props.cookies);
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
};

App.defaultProps = {
};

export default withCookies(App);
