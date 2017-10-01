import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Input from '../Input';

configure({ adapter: new Adapter()});

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
