import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import { formatDate } from 'lib/date';
import styles from './Input.scss';

const cx = classNames.bind(styles);

const Input = ({ input, label, type, meta: { touched, error } }) => (
  <div>
    <input
      {...input}
      value={type === 'date' ? formatDate(input.value) : input.value}
      placeholder={label}
      type={type}
      className={cx('form-control')}
    />
    {touched && error && <span className={cx('error')}>{error}</span>}
  </div>
);

Input.propTypes = {
  input: PropTypes.object.isRequired,
  label: PropTypes.string,
  type: PropTypes.string.isRequired,
  meta: PropTypes.shape({
    touched: PropTypes.bool,
    error: PropTypes.string,
  }).isRequired,
};

export default Input;
