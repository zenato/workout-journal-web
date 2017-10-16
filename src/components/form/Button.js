import React from 'react';
import classNames from 'classnames/bind';
import styles from './Button.scss';

const cx = classNames.bind(styles);

const Button = ({ type, className, ...props }) => (
  <input {...props} type={type || 'button'} className={cx('btn', className)} />
);

export default Button;
