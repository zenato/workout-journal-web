import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Field } from 'redux-form';
import { Button } from 'components/form';

const Wrapper = styled.section`
  display: flex;
  margin-top: 10px;
  margin-bottom: 10px;

  .field {
    flex: 1;
    margin-right: 3px;
  }
`;

class SearchForm extends Component {
  render() {
    const { handleSubmit, placeholder } = this.props;
    return (
      <Wrapper>
        <form onSubmit={handleSubmit}>
          <Field
            name="name"
            type="text"
            placeholder={placeholder}
            component="input"
            className="field"
          />
          <Button type="submit" value="Search" />
        </form>
      </Wrapper>
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
