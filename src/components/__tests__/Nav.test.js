import React from 'react';
import { shallow } from 'enzyme';
import Nav from '../Nav';

it('renders without crashing', () => {
  const wrapper = shallow(<Nav />);
  expect(wrapper).toMatchSnapshot();
});
