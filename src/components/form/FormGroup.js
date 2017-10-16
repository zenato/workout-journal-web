import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  margin-bottom: 5px;
  align-items: center;
`;

const Label = styled.label`
  flex: 2;
  text-align: right;
  font-weight: bold;
  margin-right: 5px;
`;

const Field = styled.div`
  flex: 10;
  padding-right: 10px;
  vertical-align: middle;
`;

const FormGroup = ({ label, children }) => (
  <Wrapper>
    <Label>{label}</Label>
    <Field>{children}</Field>
  </Wrapper>
);

FormGroup.propTypes = {
  label: PropTypes.string,
  children: PropTypes.node,
};

export default FormGroup;
