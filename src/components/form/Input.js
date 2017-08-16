import React from 'react';
import classNames from 'classnames/bind';
import styles from './Input.scss';

const cx = classNames.bind(styles);

const Input = ({ className, ...props }) => (
  <input
    {...props}
    className={cx('form-control', className)}
  />
);

export default Input;
