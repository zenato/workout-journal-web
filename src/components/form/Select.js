import React from 'react';

const Select = ({ className, ...props }) => (
  <select
    {...props}
    className={`form-control ${className || ''}`}
  />
);

export default Select;
