import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Field } from 'redux-form';
import { Button } from 'components/form';

const Form = styled.form`
  display: flex;
  margin-top: 10px;
  margin-bottom: 10px;

  .form-control {
    display: block;
    background-color: #fff;
    color: #4a4a4a;
    border: solid #d4d4d4 1px;
    padding: 10px;
    width: 100%;
  }
`;
Form.displayName = 'Form';

class SearchForm extends Component {
  render() {
    const { handleSubmit, placeholder } = this.props;
    return (
      <section>
        <Form onSubmit={handleSubmit}>
          <Field
            name="name"
            type="text"
            placeholder={placeholder}
            component="input"
            className="form-control"
          />
          <Button type="submit" value="Search" />
        </Form>
      </section>
    );
  }
}

SearchForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
};

SearchForm.defaultProps = {
  placeholder: 'Input search text.',
};

export default SearchForm;
