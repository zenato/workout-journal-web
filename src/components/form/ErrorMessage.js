import React from 'react';
import { getErrorMessages } from 'lib/api';

const ErrorMessage = ({ error, name, context = 'data' }) => {
  const errorMessages = getErrorMessages(error, name, context);
  return errorMessages ? (
    <ul className="error-message">
      {errorMessages.map((message, idx) => <li key={idx}>{message}</li>)}
    </ul>
  ) : null;
};

export default ErrorMessage;
