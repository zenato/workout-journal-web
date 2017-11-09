import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Helmet } from 'react-helmet'
import { Route, Switch, withRouter } from 'react-router-dom'
import styled from 'styled-components'
import { signOut } from 'state/actions/users'
import routes from 'routes'
import Nav from 'components/Nav'

const Container = styled.div`
  padding: 5px;
`

class App extends Component {
  handleLogout = e => {
    e.preventDefault()
    this.props.signOut()
  }

  render() {
    const { loggedInfo } = this.props
    return (
      <div>
        <Helmet>
          <title>{process.env.REACT_APP_SITE_NAME}</title>
        </Helmet>

        <Nav loggedInfo={loggedInfo} onLogout={this.handleLogout} />

        <Container>
          <Switch>
            <Route {...routes.Home} />
            <Route {...routes.SignIn} />
            <Route {...routes.Events} />
            <Route {...routes.Event} />
            <Route {...routes.Posts} />
            <Route {...routes.Post} />
          </Switch>
        </Container>
      </div>
    )
  }
}

export default withRouter(
  connect(
    state => ({
      loggedInfo: state.users.loggedInfo,
    }),
    dispatch => ({
      ...bindActionCreators({ signOut }, dispatch),
    }),
  )(App),
)
