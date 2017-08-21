import React from 'react';
import { shallow } from 'enzyme';
import Input from '../Input';

it('renders error', () => {
  const wrapper = shallow(<Input type="text"  value="input" />);
  expect(wrapper).toMatchSnapshot();
});
