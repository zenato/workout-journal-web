import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import { Route, Switch } from 'react-router-dom';
import { Events, Event, Home, Posts, Post } from 'pages';
import Menu from 'components/Menu';
import { SITE_NAME } from 'constants';

class App extends Component {
  render() {
    return (
      <div>
        <Helmet>
          <title>{SITE_NAME}</title>
        </Helmet>

        <Menu />

        <div className="container">
          <Route exact path="/" component={Home} />
          <Switch>
            <Route path="/events/:id" component={Event} />
            <Route path="/events" component={Events} />
          </Switch>
          <Switch>
            <Route path="/posts/:id" component={Post} />
            <Route path="/posts" component={Posts} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
