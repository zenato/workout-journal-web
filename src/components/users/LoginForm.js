import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form'
import classNames from 'classnames/bind';
import { Button, Input } from 'components/form';
import styles from './LoginForm.scss';

const cx = classNames.bind(styles);

const validate = ({ username, password }) => {
  const errors = {};
  if (!username) {
    errors.username = 'Required';
  }
  if (!password) {
    errors.password = 'Required';
  }
  return errors
};

class LoginForm extends Component {
  render() {
    const { error, handleSubmit } = this.props;
    return (
      <form onSubmit={handleSubmit} className={cx('login-form')}>
        <Field type="text" name="username" label="Username" component={Input} />
        <Field type="text" name="password" label="Password" component={Input} />

        {error && (
          <div className={cx('error')}>
            <span>Oops, An expected error seems to have occurred.</span>
          </div>
        )}

        <div className={cx('tool')}>
          <Button type="submit" value="Login" className={cx('primary')} />
        </div>
      </form>
    );
  }
}

LoginForm.propTypes = {
  error: PropTypes.object,
  onSubmit: PropTypes.func.isRequired,
};

export default reduxForm({
  form: 'loginForm',
  validate,
})(LoginForm);
