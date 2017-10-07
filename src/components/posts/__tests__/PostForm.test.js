import React from 'react';
import { shallow } from 'enzyme';
import PostForm from '../PostForm';

const props = {
  handleSubmit: jest.fn(),
  initialValues: {},
  error: null,
  onDelete: jest.fn(),
  onMoveList: jest.fn(),
  events: [
    { id: '1', name: 'event-1' },
  ],
  loading: false,
};

it('Renders without errors.', () => {
  const component = shallow(<PostForm {...props} />);
  expect(component).toMatchSnapshot();
});
