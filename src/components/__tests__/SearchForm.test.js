import React from 'react';
import { Provider } from 'react-redux';
import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import configureStore from 'redux/configureStore';
import SearchForm from '../SearchForm';

configure({ adapter: new Adapter()});

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
