import React from 'react';
import { shallow } from 'enzyme';
import Button from '../Button';

describe('Button', () => {
  const props = {
    type: 'submit',
    value: 'test',
    onClick: jest.fn(),
  };

  it('should render passed props.', () => {
    const component = shallow(<Button {...props} />);
    expect(component).toMatchSnapshot();
  });
});
