import React from 'react';
import { shallow } from 'enzyme';
import Select from '../Select';

it('renders error', () => {
  const wrapper = shallow(
    <Select name="test">
      <option value="1">option 1</option>
    </Select>
  );
  expect(wrapper).toMatchSnapshot();
});
