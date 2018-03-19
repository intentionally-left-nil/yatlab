import React, { Component } from 'react';
import PropTypes, { instanceOf } from 'prop-types';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { withCookies, Cookies } from 'react-cookie';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { deepOrange500 } from 'material-ui/styles/colors';
import TeamsNew from './Teams#new';
import TeamsReauthorize from './Teams#reauthorize';
import TeamsShow from './Teams#show';
import Header from '../components/Header';
import Privacy from '../containers/Privacy';
import Support from '../containers/Support';
import NoMatch from '../components/NoMatch';
import Root from '../components/Root';
import { getUser } from '../helpers/authentication';
import { needsReauthorization } from '../helpers/version';

const muiTheme = getMuiTheme({
  palette: {
    accent1Color: deepOrange500,
  },
  userAgent: 'all',
});

class App extends Component {
  constructor() {
    super();
    this.renderTeamShow = this.renderTeamShow.bind(this);
  }

  getRedirect() {
    let redirect;
    const user = getUser(this.props.cookies);
    if (this.props.location.pathname === '/' && user) {
      if (this.props.team) {
        if (needsReauthorization(this.props.team.version)) {
          redirect = (<Redirect to="/teams/reauthorize" />);
        } else {
          redirect = (<Redirect to={`/teams/${this.props.team.id}`} />);
        }
      } else {
        redirect = (<Redirect to="/teams/new" />);
      }
    }
    return redirect;
  }

  renderTeamShow(props) {
    return (<TeamsShow {...props} team={this.props.team} />);
  }

  render() {
    const redirect = this.getRedirect();
    if (redirect) {
      return redirect;
    }

    const user = getUser(this.props.cookies);
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div>
          <Header user={user} />
          <div id="content">
            <Switch>
              <Route exact path="/teams/new" component={TeamsNew} />
              <Route exact path="/teams/reauthorize" component={TeamsReauthorize} />
              <Route exact path="/teams/:id" render={this.renderTeamShow} />
              <Route exact path="/privacy" component={Privacy} />
              <Route exact path="/support" component={Support} />
              <Route exact path="/" component={Root} />
              <Route component={NoMatch} />
            </Switch>
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}

App.propTypes = {
  cookies: instanceOf(Cookies).isRequired,
  team: PropTypes.shape({
    name: PropTypes.string,
    id: PropTypes.string,
    version: PropTypes.number,
  }),
  location: PropTypes.shape({ pathname: PropTypes.string }).isRequired,
};

App.defaultProps = {
  team: null,
};

export default withCookies(withRouter(App));
