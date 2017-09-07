import React from 'react';
import PropTypes from 'prop-types';

class AuthProvider extends React.Component {
  getChildContext() {
    return {
      accessToken: this.props.accessToken,
    };
  }

  render() {
    return this.props.children;
  }
}

AuthProvider.propTypes = {
  accessToken: PropTypes.string,
};

AuthProvider.childContextTypes = {
  accessToken: PropTypes.string,
};

export default AuthProvider;
