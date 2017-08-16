import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import { Route, Switch } from 'react-router-dom';
import classNames from 'classnames/bind';
import { Events, Event, Home, Posts, Post } from 'pages';
import Menu from 'components/Menu';
import { SITE_NAME } from 'constants';
import styles from './App.scss';

const cx = classNames.bind(styles);

class App extends Component {
  render() {
    return (
      <div className={cx('app')}>
        <Helmet>
          <title>{SITE_NAME}</title>
        </Helmet>

        <Menu />

        <div className={cx('container')}>
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
