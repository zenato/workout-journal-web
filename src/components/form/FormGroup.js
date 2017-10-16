import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './FormGroup.scss';

const cx = classNames.bind(styles);

const FormGroup = ({ label, children }) => (
  <div className={cx('item')}>
    <label>{label}</label>
    <div className={cx('field')}>{children}</div>
  </div>
);

FormGroup.propTypes = {
  label: PropTypes.string,
  children: PropTypes.node,
};

export default FormGroup;
