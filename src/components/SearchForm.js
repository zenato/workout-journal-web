import React, { Component } from 'react';
import PropTypes from 'prop-types';
import queryString from 'query-string';
import { handleChangeInput } from 'lib/form';

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
    this.name.blur();
  };

  render() {
    return (
      <form onSubmit={this.handleSearch} className="search-form">
        <div className="field">
          <input
            type="text"
            name="name"
            value={this.state.name}
            ref={(e) => { this.name = e; }}
            onChange={this.handleInputChange}
            placeholder={this.props.placeholder}
            className="form-control"
          />
        </div>
        <div className="tool">
          <input type="submit" value="Search" className="btn" />
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
