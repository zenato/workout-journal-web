import React, { Component } from 'react';
import PropTypes from 'prop-types';
import queryString from 'query-string';
import classNames from 'classnames/bind';
import { createChangeHandler } from 'lib/form';
import { Input, Button } from 'components/form';
import styles from './SearchForm.scss';

const cx = classNames.bind(styles);

class SearchForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      ...queryString.parse(props.location.search),
    };
    this.handleChange = createChangeHandler(this);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.location !== nextProps.location) {
      this.setState({
        ...queryString.parse(nextProps.location.search),
      });
    }
  }

  handleSearch = (e) => {
    e.preventDefault();
    const { name } = this.state;
    this.props.onSubmit({ name, });
    // Legacy codes.
    const input = document.querySelector(`.${cx('search-form')} input`);
    input && input.blur();
  };

  render() {
    return (
      <section>
        <form onSubmit={this.handleSearch} className={cx('search-form')}>
          <Input
            type="text"
            name="name"
            value={this.state.name}
            onChange={this.handleChange}
            placeholder={this.props.placeholder}
            className={cx('field')}
          />
          <Button type="submit" value="Search" />
        </form>
      </section>
    );
  }
}

SearchForm.propTypes = {
  location: PropTypes.shape({
    search: PropTypes.string.isRequired,
  }).isRequired,
  onSubmit: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
};

SearchForm.defaultProps = {
  placeholder: 'Input search text.',
};

export default SearchForm;
