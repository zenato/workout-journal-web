import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form'
import classNames from 'classnames/bind';
import { Button } from 'components/form';
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

const renderField = ({ input, label, type, meta: { touched, error } }) => (
  <div className={cx('item')}>
    <label>{label}</label>
    <div className={cx('field')}>
      <input {...input} placeholder={label} type={type} className={cx('form-control')}/>
      {touched && error && <span className={cx('error')}>{error}</span>}
    </div>
  </div>
);

class LoginForm extends Component {
  render() {
    const { error, handleSubmit } = this.props;
    return (
      <form onSubmit={handleSubmit} className={cx('login-form')}>
        <Field type="text" name="username" label="Username" component={renderField} />
        <Field type="text" name="password" label="Password" component={renderField} />

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
