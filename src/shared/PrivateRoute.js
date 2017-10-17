import React from 'react'
import { connect } from 'react-redux'
import { Route, Redirect } from 'react-router-dom'
import { GET_USER } from 'redux/modules/users'

const PrivateRoute = ({ component: Component, pending, user, ...rest }) => (
  <Route
    {...rest}
    render={props => {
      if (pending) {
        return null
      } else if (user) {
        return <Component {...props} />
      } else {
        return <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
      }
    }}
  />
)

export default connect(state => ({
  user: state.users.user,
  pending: state.pender.pending[GET_USER],
}))(PrivateRoute)
