import React from 'react';
import { shallow, mount } from 'enzyme';
import LoginForm from '../LoginForm';

it('renders without errors', () => {
  shallow(
    <LoginForm
      error={null}
      onSubmit={() => {}}
    />
  );
});

it('simulate submit after change form', () => {
  const onSubmit = jest.fn();
  const wrapper = mount(
    <LoginForm
      error={null}
      onSubmit={onSubmit}
    />
  );

  // Changed input form
  wrapper.find('input[name="username"]').simulate('change', {
    target: {
      name: 'username',
      value: 'changed username',
    },
  });
  wrapper.find('input[name="password"]').simulate('change', {
    target: {
      name: 'password',
      value: 'changed password',
    },
  });

  wrapper.find('form').simulate('submit', {
    preventDefault: () => {},
  });

  expect(onSubmit).toBeCalledWith({
    username: 'changed username',
    password: 'changed password',
  });
});
