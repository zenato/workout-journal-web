import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import { handleChangeInput } from 'lib/form';
import { Input, Button, ErrorMessage } from 'components/form';
import styles from './LoginForm.scss';

const cx = classNames.bind(styles);

class LoginForm extends Component {
  state = {
    error: null,
    username: '',
    password: '',
  };

  constructor(props) {
    super(props);

    this.handleChangeInput = handleChangeInput(this);
  }

  componentWillReceiveProps({ error }) {
    this.setState({ error });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.onSubmit(this.state);
  };

  render() {
    const { error } = this.state;
    return (
      <form onSubmit={this.handleSubmit} className={cx('login-form')}>
        <div className={cx('item')}>
          <label htmlFor="login-username">Username</label>
          <div className={cx('field')}>
            <Input
              id="login-username"
              type="text"
              name="username"
              value={this.state.username || ''}
              onChange={this.handleChangeInput}
            />
            <ErrorMessage error={error} name="username" />
          </div>
        </div>
        <div className={cx('item')}>
          <label htmlFor="login-password">Password</label>
          <div className={cx('field')}>
            <Input
              id="login-password"
              type="password"
              name="password"
              value={this.state.password || ''}
              onChange={this.handleChangeInput}
            />
            <ErrorMessage error={error} name="password" />
          </div>
        </div>

        {error && (
          <div className={cx('error')}>
            <span>Oops, An expected error seems to have occurred.</span>
          </div>
        )}

        <div className={cx('tool')}>
          <Button type="submit" value="Login" className="primary" />
        </div>
      </form>
    );
  }
}

LoginForm.propTypes = {
  error: PropTypes.object,
  onSubmit: PropTypes.func.isRequired,
};

export default LoginForm;
