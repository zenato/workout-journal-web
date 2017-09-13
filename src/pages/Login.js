import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Helmet } from 'react-helmet';
import Cookies from 'js-cookie';
import * as usersActions from 'redux/modules/users';
import { LOGIN, GET_USER } from 'redux/modules/users'
import LoginForm from 'components/users/LoginForm';

class Login extends Component {
  handleSubmit = async (values) => {
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
    const { error, loading } = this.props;
    return (
      <div>
        {loading && (
          <span>Now loading...</span>
        )}

        <article>
          <Helmet>
            <title>{`Login | ${process.env.REACT_APP_SITE_NAME}`}</title>
          </Helmet>
          <LoginForm
            error={error}
            onSubmit={this.handleSubmit}
          />
        </article>
      </div>
    );
  }
}

export default connect(
  (state) => ({
    error: state.users.error,
    loading: state.pender.pending[LOGIN] || state.pender.pending[GET_USER],
  }),
  (dispatch) => ({
    UsersActions: bindActionCreators(usersActions, dispatch),
  }),
)(Login);
