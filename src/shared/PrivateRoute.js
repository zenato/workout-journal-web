import React from 'react'
import { connect } from 'react-redux'
import { Route } from 'react-router-dom'

const PrivateRoute = ({ component: Component, pending, loggedInfo, ...rest }) => (
  <Route {...rest} render={props => (loggedInfo ? <Component {...props} /> : null)} />
)

export default connect(state => ({
  loggedInfo: state.users.loggedInfo,
}))(PrivateRoute)
