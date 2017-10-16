import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Helmet } from 'react-helmet';
import { reduxForm } from 'redux-form';
import Cookies from 'js-cookie';
import * as usersActions from 'redux/modules/users';
import { LOGIN, GET_USER } from 'redux/modules/users';
import Form, { validate } from 'components/users/LoginForm';

const LoginForm = reduxForm({
  form: 'loginForm',
  validate,
})(Form);

class Login extends Component {
  handleSubmit = async values => {
    const { UsersActions, location } = this.props;
    const { data } = await UsersActions.login(values);

    Cookies.set('accessToken', data['access_token'], { path: '/' });

    let from = '/';
    if (location.state && location.state.from) {
      from = location.state.from.pathname + location.state.from.search;
    }
    window.location.replace(from);
  };

  render() {
    const { hasError, isLoading } = this.props;
    return (
      <div>
        {isLoading && <span className="loading">Now loading...</span>}

        <article>
          <Helmet>
            <title>{`Login | ${process.env.REACT_APP_SITE_NAME}`}</title>
          </Helmet>
          <LoginForm hasError={isLoading ? false : hasError} onSubmit={this.handleSubmit} />
        </article>
      </div>
    );
  }
}

const mergeProps = (stateProps, dispatchProps, ownProps) =>
  Object.assign({}, stateProps, dispatchProps, ownProps);

export default connect(
  state => ({
    hasError: state.pender.failure[LOGIN],
    isLoading: state.pender.pending[LOGIN] || state.pender.pending[GET_USER],
  }),
  dispatch => ({
    UsersActions: bindActionCreators(usersActions, dispatch),
  }),
  mergeProps,
)(Login);
