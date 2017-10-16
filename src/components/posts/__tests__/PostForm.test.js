import React from 'react';
import { shallow } from 'enzyme';
import PostForm from '../PostForm';

const props = {
  handleSubmit: jest.fn(),
  initialValues: {},
  hasError: false,
  onDelete: jest.fn(),
  onMoveList: jest.fn(),
  events: [{ id: '1', name: 'event-1' }],
};

it('Renders without errors.', () => {
  const component = shallow(<PostForm {...props} />);
  expect(component).toMatchSnapshot();
});
