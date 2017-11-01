import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Helmet } from 'react-helmet'
import { reduxForm } from 'redux-form'
import * as usersActions from 'state/actions/users'
import Form, { validate } from 'components/users/LoginForm'
import { PAGE_TITLE } from 'config'

const LoginForm = reduxForm({
  form: 'loginForm',
  validate,
})(Form)

class Login extends Component {
  handleSubmit = async values => {
    const { UsersActions, location } = this.props
    await UsersActions.signIn({ ...values, location })
  }

  render() {
    const { hasError, pending } = this.props
    return (
      <div>
        {pending && <span className="loading">Now loading...</span>}

        <article>
          <Helmet>
            <title>{`Login | ${PAGE_TITLE}`}</title>
          </Helmet>
          <LoginForm hasError={hasError} onSubmit={this.handleSubmit} />
        </article>
      </div>
    )
  }
}

const mergeProps = (stateProps, dispatchProps, ownProps) =>
  Object.assign({}, stateProps, dispatchProps, ownProps)

export default connect(
  state => ({
    hasError: !!state.users.error,
    pending: state.users.pending,
  }),
  dispatch => ({
    UsersActions: bindActionCreators(usersActions, dispatch),
  }),
  mergeProps,
)(Login)
