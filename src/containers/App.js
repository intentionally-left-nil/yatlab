import React, { Component } from 'react';
import { instanceOf } from 'prop-types';
import { Switch, Route } from 'react-router-dom';
import { withCookies, Cookies } from 'react-cookie';
import FirstPage from './FirstPage';
import SecondPage from './SecondPage';
import OauthAuthorize from './OauthAuthorize';
import Header from '../components/Header';
import NoMatch from '../components/NoMatch';
import { getUser } from '../helpers/authentication';

class App extends Component {
  render() {
    const user = getUser(this.props.cookies);
    return (
      <div>
        <Header user={user} />
        <h1>Server Side Rendering with Create React App v2</h1>
        <p>Hey, so I've rewritten this example with react-router v4</p>
        <p>This code is on github: <a href="https://github.com/ayroblu/ssr-create-react-app-v2">https://github.com/ayroblu/ssr-create-react-app-v2</a></p>
        <p>Medium article: <a href="https://medium.com/@benlu/ssr-with-create-react-app-v2-1b8b520681d9">https://medium.com/@benlu/ssr-with-create-react-app-v2-1b8b520681d9</a></p>
        <Switch>
          <Route exact path="/" component={FirstPage} />
          <Route path="/second" component={SecondPage} />
          <Route path="/authorize" component={OauthAuthorize} />
          <Route component={NoMatch} />
        </Switch>
      </div>
    );
  }
}

App.propTypes = {
  cookies: instanceOf(Cookies).isRequired,
};

export default withCookies(App);
