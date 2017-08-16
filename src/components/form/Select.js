import React from 'react';
import classNames from 'classnames/bind';
import styles from './Select.scss';

const cx = classNames.bind(styles);

const Select = ({ className, ...props }) => (
  <select
    {...props}
    className={cx('form-control', className)}
  />
);

export default Select;
