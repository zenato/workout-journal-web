import React from 'react';
import { shallow } from 'enzyme';
import EventForm from '../EventForm';

const props = {
  handleSubmit: jest.fn(),
  initialValues: {},
  error: null,
  onDelete: jest.fn(),
  onMoveList: jest.fn(),
};

it('Render without errors.', () => {
  const component = shallow(<EventForm {...props} />);
  expect(component).toMatchSnapshot();
});
