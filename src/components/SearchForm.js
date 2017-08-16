import React, { Component } from 'react';
import PropTypes from 'prop-types';
import queryString from 'query-string';
import { handleChangeInput } from 'lib/form';
import { Input, Button } from 'components/form';

class SearchForm extends Component {
  constructor(props) {
    super(props);
    this.handleInputChange = handleChangeInput(this);
    this.state = {
      name: '',
      ...queryString.parse(props.location.search),
    };
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
    document.querySelector('.search-form input').blur();
  };

  render() {
    return (
      <form onSubmit={this.handleSearch} className="search-form">
        <div className="field">
          <Input
            type="text"
            name="name"
            value={this.state.name}
            onChange={this.handleInputChange}
            placeholder={this.props.placeholder}
          />
        </div>
        <div className="tool">
          <Button type="submit" value="Search" />
        </div>
      </form>
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
