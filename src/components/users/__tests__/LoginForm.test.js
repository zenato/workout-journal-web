import React from 'react';
import { shallow } from 'enzyme';
import LoginForm from '../LoginForm';

describe('LoginForm', () => {
  const props = {
    errors: null,
    handleSubmit: jest.fn(),
  };

  it('should render error if not empty `error` props.', () => {
    const component = shallow(<LoginForm {...props} error={['error']} />);
    expect(component).toMatchSnapshot();
  });

  it('should call `onSubmit` if submit form.', () => {
    const component = shallow(<LoginForm {...props} />);
    component.find('form').simulate('submit');
    expect(props.handleSubmit).toBeCalled();
  });
});
