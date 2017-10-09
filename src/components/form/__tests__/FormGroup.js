import React from 'react';
import { shallow } from 'enzyme';
import FormGroup from '../FormGroup';

describe('FormGroup', () => {
  const props = {
    label: 'test',
  };

  it('should render passed props.', () => {
    const component = shallow(<FormGroup {...props}>Test</FormGroup>);
    expect(component).toMatchSnapshot();
  });
});
