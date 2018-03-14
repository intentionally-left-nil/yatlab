import React, { Component } from 'react';
import PropTypes, { instanceOf } from 'prop-types';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { withCookies, Cookies } from 'react-cookie';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { deepOrange500 } from 'material-ui/styles/colors';
import TeamsNew from './Teams#new';
import TeamsShow from './Teams#show';
import Header from '../components/Header';
import Privacy from '../containers/Privacy';
import Support from '../containers/Support';
import NoMatch from '../components/NoMatch';
import Root from '../components/Root';
import { getUser } from '../helpers/authentication';

const muiTheme = getMuiTheme({
  palette: {
    accent1Color: deepOrange500,
  },
});

class App extends Component {
  constructor() {
    super();
    this.renderTeamShow = this.renderTeamShow.bind(this);
  }

  renderTeamShow(props) {
    return (<TeamsShow {...props} team={this.props.team} />);
  }

  render() {
    const user = getUser(this.props.cookies);
    if (this.props.location.pathname === '/' && user) {
      if (this.props.team) {
        return (<Redirect to={`/teams/${this.props.team.id}`} />);
      }
      return (<Redirect to="/teams/new" />);
    }

    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div>
          <Header user={user} />
          <div id="content">
            <Switch>
              <Route path="/teams/new" component={TeamsNew} />
              <Route path="/teams/:id" render={this.renderTeamShow} />
              <Route path="/privacy" component={Privacy} />
              <Route path="/support" component={Support} />
              <Route path="/" component={Root} />
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
  }),
  location: PropTypes.shape({ pathname: PropTypes.string }).isRequired,
};

App.defaultProps = {
  team: null,
};

export default withCookies(withRouter(App));
