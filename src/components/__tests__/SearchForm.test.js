import React from 'react';
import { shallow } from 'enzyme';
import SearchForm from '../SearchForm';

it('Render without error.', () => {
  const component = shallow(<SearchForm handleSubmit={() => {}} />);
  expect(component).toMatchSnapshot();
});
