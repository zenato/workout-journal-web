import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Helmet } from 'react-helmet'
import { reduxForm } from 'redux-form'
import { signIn, FAILURE_SIGN_IN } from 'state/actions/users'
import Form, { validate } from 'components/users/SignInForm'
import { PAGE_TITLE } from 'config'

const SignInForm = reduxForm({
  form: 'signInForm',
  validate,
})(Form)

class SignIn extends Component {
  handleSubmit = values => {
    const { location, signIn } = this.props
    signIn({ ...values, location })
  }

  render() {
    const { hasError } = this.props
    return (
      <div>
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

export default connect(
  state => ({
    hasError: state.users.status === FAILURE_SIGN_IN,
  }),
  dispatch => ({
    ...bindActionCreators({ signIn }, dispatch),
  }),
)(SignIn)
