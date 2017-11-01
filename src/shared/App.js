import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Redirect } from 'react-router'
import { withDone } from 'react-router-server'
import { Helmet } from 'react-helmet'
import { Route, Switch, withRouter } from 'react-router-dom'
import styled from 'styled-components'
import * as UsersActions from 'state/actions/users'
import { Events, Event, Home, Posts, Post, Login } from 'pages'
import Nav from 'components/Nav'
import PrivateRoute from './PrivateRoute'

const Container = styled.div`
  padding: 5px;
`

class App extends Component {
  componentWillMount() {
    const { accessToken, loggedInfo, actions, done } = this.props
    if (accessToken && !loggedInfo) {
      actions.fetchLoggedInfo({ done })
    } else {
      done()
    }
  }

  handleLogout = e => {
    e.preventDefault()
    this.props.actions.signOut()
  }

  render() {
    const { loggedInfo, requiredAuth } = this.props
    return (
      <div>
        <Helmet>
          <title>{process.env.REACT_APP_SITE_NAME}</title>
        </Helmet>

        <Nav loggedInfo={loggedInfo} onLogout={this.handleLogout} />

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

          {requiredAuth && (
            <Redirect to="/login" />
          )}
        </Container>
      </div>
    )
  }
}

const ConnectedApp = connect(
  state => ({
    requiredAuth: !!state.users.requiredAuth,
    accessToken: state.users.accessToken,
    loggedInfo: state.users.loggedInfo,
  }),
  dispatch => ({
    actions: bindActionCreators(UsersActions, dispatch),
  }),
)(App)

export default withDone(withRouter(ConnectedApp))
