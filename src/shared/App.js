import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withDone } from 'react-router-server';
import { Helmet } from 'react-helmet';
import { Route, Switch, withRouter } from 'react-router-dom';
import styled from 'styled-components';
import * as usersActions from 'redux/modules/users';
import { Events, Event, Home, Posts, Post, Login } from 'pages';
import Nav from 'components/Nav';
import { SITE_NAME } from 'constants';
import PrivateRoute from './PrivateRoute';

const Container = styled.div`
  padding: 5px;
`;

class App extends Component {
  componentWillMount() {
    const { accessToken, user, UsersActions, done } = this.props;
    if (accessToken && !user) {
      UsersActions.getUser().then(done, done);
    } else {
      done();
    }
  }

  render() {
    const { user } = this.props;
    return (
      <div>
        <Helmet>
          <title>{SITE_NAME}</title>
        </Helmet>

        <Nav user={user} />

        <Container>
          <Route exact path="/" component={Home} />
          <Route exact path="/login" component={Login} />

          <Switch>
            <PrivateRoute path="/events/:id" component={Event} />
            <PrivateRoute path="/events" component={Events} />
          </Switch>

          <Switch>
            <PrivateRoute path="/posts/:id" component={Post} />
            <PrivateRoute path="/posts" component={Posts} />
          </Switch>
        </Container>
      </div>
    );
  }
}

const ConnectedApp = connect(
  state => ({
    accessToken: state.accessToken,
    user: state.users.user,
  }),
  dispatch => ({
    UsersActions: bindActionCreators(usersActions, dispatch),
  }),
)(App);

export default withDone(withRouter(ConnectedApp));
