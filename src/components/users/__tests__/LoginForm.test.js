import React from 'react';
import { shallow } from 'enzyme';
import LoginForm from '../LoginForm';

describe('LoginForm', () => {
  const props = {
    hasError: false,
    handleSubmit: jest.fn(),
  };

  it('should render error if not empty `error` props.', () => {
    const component = shallow(<LoginForm {...props} hasError={true} />);
    expect(component).toMatchSnapshot();
  });

  it('should call `onSubmit` if submit form.', () => {
    const component = shallow(<LoginForm {...props} />).dive();
    component.find('form').simulate('submit');
    expect(props.handleSubmit).toBeCalled();
  });
});
