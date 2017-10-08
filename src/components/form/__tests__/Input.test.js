import React from 'react';
import { shallow } from 'enzyme';
import Input from '../Input';

describe('Input', () => {
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

  it('should render passed props.', () => {
    const component = shallow(<Input {...props} />);
    expect(component).toMatchSnapshot();
  });
});
