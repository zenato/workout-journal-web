import React from 'react';
import { shallow } from 'enzyme';
import ErrorMessage from '../ErrorMessage';

it('renders error', () => {
  const fieldName = 'name';
  const error = {
    data: {
      [fieldName]: ['error-1l', 'error-2'],
    },
  };
  const wrapper = shallow(<ErrorMessage name={fieldName} error={error} />);
  expect(wrapper).toMatchSnapshot();
});