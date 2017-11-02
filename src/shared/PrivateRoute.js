import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router'
import { Route } from 'react-router-dom'

const PrivateRoute = ({ component: Component, pending, accessToken, loggedInfo, ...rest }) => (
  <Route
    {...rest}
    render={props => {
      if (!accessToken) {
        return <Redirect to="/signIn" />
      }
      return loggedInfo ? <Component {...props} /> : null
    }}
  />
)

export default connect(state => ({
  accessToken: state.users.accessToken,
  loggedInfo: state.users.loggedInfo,
}))(PrivateRoute)
