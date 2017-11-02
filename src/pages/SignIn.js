import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Helmet } from 'react-helmet'
import { reduxForm } from 'redux-form'
import * as UsersActions from 'state/actions/users'
import Form, { validate } from 'components/users/SignInForm'
import { PAGE_TITLE } from 'config'

const SignInForm = reduxForm({
  form: 'signInForm',
  validate,
})(Form)

class SignIn extends Component {
  handleSubmit = values => {
    const { actions, location } = this.props
    actions.signIn({ ...values, location })
  }

  render() {
    const { hasError, pending } = this.props
    return (
      <div>
        {pending && <span className="loading">Now loading...</span>}

        <article>
          <Helmet>
            <title>{`Sign In | ${PAGE_TITLE}`}</title>
          </Helmet>
          <SignInForm hasError={hasError} onSubmit={this.handleSubmit} />
        </article>
      </div>
    )
  }
}

const mergeProps = (stateProps, dispatchProps, ownProps) =>
  Object.assign({}, stateProps, dispatchProps, ownProps)

export default connect(
  state => ({
    hasError: !!state.users.error.signIn,
    pending: state.users.pending,
  }),
  dispatch => ({
    actions: bindActionCreators(UsersActions, dispatch),
  }),
  mergeProps,
)(SignIn)
