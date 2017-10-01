import React from 'react';
import { Provider } from 'react-redux';
import { shallow, mount } from 'enzyme';
import configureStore from 'redux/configureStore';
import LoginForm from '../LoginForm';

const Test = (props) => (
  <Provider store={configureStore()} {...props} />
);

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
  const component = mount(
    <Test>
      <LoginForm error={null} onSubmit={onSubmit} />
    </Test>
  );

  // Changed input form
  component.find('input[name="username"]').simulate('change', {
    target: {
      name: 'username',
      value: 'changed username',
    },
  });
  component.find('input[name="password"]').simulate('change', {
    target: {
      name: 'password',
      value: 'changed password',
    },
  });

  component.find('form').simulate('submit', { preventDefault () {} });

  expect(onSubmit.mock.calls[0][0]).toEqual({
    username: 'changed username',
    password: 'changed password',
  });
});
