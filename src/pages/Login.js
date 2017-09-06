import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Helmet } from 'react-helmet';
import * as usersActions from 'redux/modules/users';
import { LOGIN } from 'redux/modules/users'
import LoginForm from 'components/users/LoginForm';
import { SITE_NAME } from '../constants';

const defaultLocationState = {
  from: { pathname: '/' },
};

class Login extends Component {
  state = {
    redirectToReferrer: false,
  };

  handleSubmit = async (values) => {
    this.props.UsersActions.login(values).then(() => {
      this.setState({
        redirectToReferrer: true,
      });
    });
  };

  render() {
    const { error, loading } = this.props;
    const { from } = this.props.location.state || defaultLocationState;
    const { redirectToReferrer } = this.state;

    if (redirectToReferrer) {
      return (
        <Redirect to={from} />
      )
    }

    return (
      <div>
        {loading && (
          <span>Now loading...</span>
        )}

        <div>
          <Helmet>
            <title>{`Login | ${SITE_NAME}`}</title>
          </Helmet>
          <LoginForm
            error={error}
            onSubmit={this.handleSubmit}
          />
        </div>
      </div>
    );
  }
}

export default connect(
  (state) => ({
    error: state.users.error,
    user: state.users.user,
    loading: state.pender.pending[LOGIN],
  }),
  (dispatch) => ({
    UsersActions: bindActionCreators(usersActions, dispatch),
  }),
)(Login);
