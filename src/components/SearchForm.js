import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form'
import classNames from 'classnames/bind';
import { Button } from 'components/form';
import styles from './SearchForm.scss';

const cx = classNames.bind(styles);

class SearchForm extends Component {
  render() {
    const { handleSubmit, placeholder } = this.props;
    return (
      <section>
        <form onSubmit={handleSubmit} className={cx('search-form')}>
          <Field name="name" type="text" placeholder={placeholder} component="input" className={cx('form-control')} />
          <Button type="submit" value="Search" />
        </form>
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
