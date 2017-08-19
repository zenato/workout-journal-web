import React from 'react';
import { shallow } from 'enzyme';
import Button from '../Button';

it('renders error', () => {
  const wrapper = shallow(<Button type="button"  value="button" />);
  expect(wrapper).toMatchSnapshot();
});
