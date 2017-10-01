import React from 'react';
import { Provider } from 'react-redux';
import { mount } from 'enzyme';
import configureStore from 'redux/configureStore';
import SearchForm from '../SearchForm';

const store = configureStore();

const Test = (props) => (
  <Provider store={store} {...props} />
);

it('submit input', () => {
  const onSubmit = jest.fn();

  const component = mount(
    <Test>
      <SearchForm
        location={{ search: '' }}
        onSubmit={onSubmit}
        placeHolder="Input search."
      />
    </Test>
  );

  // Set search text
  component.find('input[type="text"]').simulate('change', {
    target: {
      name: 'name',
      value: 'test name',
    },
  });

  // Submit
  component.find('form').simulate('submit', { preventDefault () {} });

  expect(onSubmit.mock.calls[0][0]).toEqual({ name: 'test name' });
});
