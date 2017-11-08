import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Helmet } from 'react-helmet'
import { Route, Switch, Redirect, withRouter } from 'react-router-dom'
import styled from 'styled-components'
import * as UsersActions from 'state/actions/users'
import routes from 'routes'
import Nav from 'components/Nav'

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
          {requiredAuth ? <Redirect to="signIn" /> : null}

          <Route {...routes.Home} />
          <Route {...routes.SignIn} />

          <Switch>
            <Route {...routes.Events} />
            <Route {...routes.Event} />
          </Switch>

          <Switch>
            <Route {...routes.Posts} />
            <Route {...routes.Post} />
          </Switch>
        </Container>
      </div>
    )
  }
}

const ConnectedApp = connect(
  state => ({
    requiredAuth: state.users.requiredAuth,
    accessToken: state.users.accessToken,
    loggedInfo: state.users.loggedInfo,
  }),
  dispatch => ({
    actions: bindActionCreators(UsersActions, dispatch),
  }),
)(App)

export default withRouter(ConnectedApp)
