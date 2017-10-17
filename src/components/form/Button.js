import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Wrapper = styled.input`
  background-color: ${({ color }) => (color === 'primary' ? '#008ee0' : '#fff')};
  color: ${({ color }) => (color === 'primary' ? '#fff' : '#323232')};
  padding: 10px;
  border: solid #d4d4d4 1px;
  cursor: pointer;
  &:hover {
    color: ${({ color }) => (color === 'primary' ? '#fff' : '#161616')};
    background-color: ${({ color }) => (color === 'primary' ? '#00a4ff' : '#f6f6f6')};
  }
  &:active {
    color: #161616;
    background-color: #efefef;
  }
`;

const Button = ({ type, color, ...props }) => (
  <Wrapper {...props} type={type || 'button'} color={color} />
);

Button.propTypes = {
  type: PropTypes.string,
  color: PropTypes.string,
};

export default Button;
