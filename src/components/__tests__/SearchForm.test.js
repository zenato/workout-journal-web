import React from 'react';
import { mount } from 'enzyme';
import SearchForm from '../SearchForm';


it('submit input', () => {
  const onSubmit = jest.fn();
  const location = {
    search: '',
  };

  const searchName = 'name';
  const searchValue = 'test name';

  const wrapper = mount(
    <SearchForm
      location={location}
      onSubmit={onSubmit}
      placeHolder="Input search."
    />
  );

  // Set search text
  wrapper.find('input[type="text"]').simulate('change', {
    target: {
      name: searchName,
      value: searchValue,
    },
  });

  // Submit
  wrapper.find('form').simulate('submit', {
    preventDefault: () => {},
  });

  expect(onSubmit).toBeCalledWith({ [searchName]: searchValue });
});
