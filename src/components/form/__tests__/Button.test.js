import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Button from '../Button';

configure({ adapter: new Adapter()});

it('renders error', () => {
  const wrapper = shallow(<Button type="button"  value="button" />);
  expect(wrapper).toMatchSnapshot();
});
