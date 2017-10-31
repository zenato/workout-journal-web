import React from 'react'
import PropTypes from 'prop-types'
import { Field } from 'redux-form'
import styled from 'styled-components'
import { FormGroup, Button, Input } from 'components/form'

const Form = styled.form`
  max-width: 500px;
  padding: 10px;
  margin: 0 auto;
`

const Error = styled.div`
  color: #f00;
  text-align: center;
  font-size: 0.7rem;
  padding: 5px;
`

const Footer = styled.div`
  text-align: center;
  * {
    margin-left: 5px;
  }
`

const LoginForm = ({ error, handleSubmit }) => (
  <Form onSubmit={handleSubmit}>
    <FormGroup label="Username">
      <Field type="text" name="username" component={Input} />
    </FormGroup>
    <FormGroup label="Password">
      <Field type="password" name="password" component={Input} />
    </FormGroup>

    {error && (
      <Error>
        <span>Oops, An expected error seems to have occurred.</span>
      </Error>
    )}

    <Footer>
      <Button type="submit" value="Login" color="primary" />
    </Footer>
  </Form>
)

LoginForm.propTypes = {
  error: PropTypes.any,
  handleSubmit: PropTypes.func.isRequired,
}

export const validate = ({ username, password }) => {
  const errors = {}
  if (!username) {
    errors.username = 'Required'
  }
  if (!password) {
    errors.password = 'Required'
  }
  return errors
}

export default LoginForm
