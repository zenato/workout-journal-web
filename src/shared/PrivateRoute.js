import React from 'react'
import { connect } from 'react-redux'
import { Route, Redirect } from 'react-router-dom'

const PrivateRoute = ({ component: Component, pending, loggedInfo, ...rest }) => (
  <Route
    {...rest}
    render={props => {
      if (pending) {
        return null
      } else if (loggedInfo) {
        return <Component {...props} />
      } else {
        return <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
      }
    }}
  />
)

export default connect(state => ({
  loggedInfo: state.users.loggedInfo,
  pending: state.users.pending,
}))(PrivateRoute)
