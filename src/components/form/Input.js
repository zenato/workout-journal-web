import React from 'react';

const Input = ({ className, ...props }) => (
  <input
    {...props}
    className={`form-control ${className || ''}`}
  />
);

export default Input;
