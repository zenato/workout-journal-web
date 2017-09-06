import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import { Route, Switch } from 'react-router-dom';
import styled from 'styled-components';
import { Events, Event, Home, Posts, Post, Login } from 'pages';
import Menu from 'components/Menu';
import { SITE_NAME } from 'constants';
import PrivateRoute from './PrivateRoute';

const Container = styled.div`
  padding: 5px;
`;

class App extends Component {
  render() {
    return (
      <div>
        <Helmet>
          <title>{SITE_NAME}</title>
        </Helmet>

        <header>
          <Menu />
        </header>

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

export default App;
