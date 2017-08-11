import React from 'react';
import PropTypes from 'prop-types';
import { getErrorMessages } from 'lib/api';

const ErrorMessage = ({ error, name, context }) => {
  const errorMessages = getErrorMessages(error, name, context);
  return errorMessages ? (
    <ul className="error-message">
      {errorMessages.map((message, idx) => <li key={idx}>{message}</li>)}
    </ul>
  ) : null;
};

ErrorMessage.propTypes = {
  error: PropTypes.object,
  name: PropTypes.string.isRequired,
  context: PropTypes.string,
};

ErrorMessage.defaultProps = {
  context: 'data',
};

export default ErrorMessage;
