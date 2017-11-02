import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router'
import { Route } from 'react-router-dom'

const PrivateRoute = ({ component: Component, initialized, accessToken, ...rest }) => (
  <Route
    {...rest}
    render={props => {
      if (!initialized) {
        return null
      } else if (!accessToken) {
        return <Redirect to="/signIn" />
      }
      return <Component {...props} />
    }}
  />
)

export default connect(state => ({
  initialized: state.users.initialized,
  accessToken: state.users.accessToken,
}))(PrivateRoute)
