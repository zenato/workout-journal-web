import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router'
import { Route } from 'react-router-dom'

const PrivateRoute = ({ component: Component, pending, accessToken, ...rest }) => (
  <Route
    {...rest}
    render={props => {
      if (!accessToken) {
        return <Redirect to="/signIn" />
      }
      return <Component {...props} />
    }}
  />
)

export default connect(state => ({
  accessToken: state.users.accessToken,
}))(PrivateRoute)
