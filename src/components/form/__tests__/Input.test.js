import React from 'react';
import { shallow } from 'enzyme';
import Input from '../Input';

const props = {
  input: {
    name: 'test',
    value: 'test',
  },
  label: 'test',
  type: 'text',
  meta: {
    touched: true,
    error: 'test',
  },
};

it('render wrapped input field', () => {
  const wrapper = shallow(<Input {...props} />);
  expect(wrapper).toMatchSnapshot();
});
