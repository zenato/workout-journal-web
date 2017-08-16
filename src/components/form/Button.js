import React from 'react';

const Button = ({ type, className, ...props }) => (
  <input
    {...props}
    type={type || 'button'}
    className={`btn ${className || ''}`}
  />
);

export default Button;
