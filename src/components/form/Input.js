import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { formatDate } from 'lib/date';

const Wrapper = styled.input`
  display: block;
  background-color: #fff;
  color: #4a4a4a;
  border: solid #d4d4d4 1px;
  padding: 10px;
  width: 100%;
  text-align: ${({ type }) => (type === 'number' ? 'right' : 'left')};
`;

const Error = styled.span`
  color: #f00;
  font-size: 0.7rem;
  padding: 5px;
`;

const Input = ({ input, label, type, meta: { touched, error } }) => (
  <div>
    <Wrapper
      {...input}
      value={type === 'date' ? formatDate(input.value) : input.value}
      placeholder={label}
      type={type}
    />
    {touched && error && <Error>{error}</Error>}
  </div>
);

Input.propTypes = {
  type: PropTypes.string.isRequired,
  label: PropTypes.string,
  input: PropTypes.object.isRequired,
  meta: PropTypes.shape({
    touched: PropTypes.bool,
    error: PropTypes.string,
  }).isRequired,
};

export default Input;
