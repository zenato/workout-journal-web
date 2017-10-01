import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Nav from '../Nav';

configure({ adapter: new Adapter()});

it('renders without crashing', () => {
  const wrapper = shallow(<Nav />);
  expect(wrapper).toMatchSnapshot();
});
