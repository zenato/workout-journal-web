import React from 'react';
import PropTypes from 'prop-types';
import hoistStatics from 'hoist-non-react-statics';

const withAuth = (Component) => {
  const C = (props, context) => {
    return (
      <Component accessToken={context.accessToken} {...props} />
    )
  };

  C.displayName = `withAuth(${Component.displayName || Component.name})`;
  C.WrappedComponent = Component;
  C.propTypes = {
    wrappedComponentRef: PropTypes.func,
  };
  C.contextTypes = {
    accessToken: PropTypes.string,
  };

  return hoistStatics(C, Component)
};

export default withAuth;
