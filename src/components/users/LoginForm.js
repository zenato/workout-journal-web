import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import classNames from 'classnames/bind';
import { FormGroup, Button, Input } from 'components/form';
import styles from './LoginForm.scss';

const cx = classNames.bind(styles);

const LoginForm = ({ errors, handleSubmit }) => (
  <form onSubmit={handleSubmit} className={cx('login-form')}>
    <FormGroup label="Username">
      <Field type="text" name="username" component={Input} />
    </FormGroup>
    <FormGroup label="Password">
      <Field type="password" name="password" component={Input} />
    </FormGroup>

    {errors && (
      <div className={cx('error')}>
        <span>Oops, An expected error seems to have occurred.</span>
      </div>
    )}

    <div className={cx('tool')}>
      <Button type="submit" value="Login" className={cx('primary')} />
    </div>
  </form>
);

LoginForm.propTypes = {
  errors: PropTypes.object,
  handleSubmit: PropTypes.func.isRequired,
};

export const validate = ({ username, password }) => {
  const errors = {};
  if (!username) {
    errors.username = 'Required';
  }
  if (!password) {
    errors.password = 'Required';
  }
  return errors;
};

export default LoginForm;
