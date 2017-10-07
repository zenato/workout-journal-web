import React from 'react';
import { shallow } from 'enzyme';
import EventForm from '../EventForm';

describe('EventForm', () => {
  const props = {
    handleSubmit: jest.fn(),
    initialValues: null,
    error: null,
    onDelete: () => {},
    onMoveList: () => {},
  };

  it('should render error message if not empty `error` props.', () => {
    const component = shallow(<EventForm {...props} error={['error']} />);
    expect(component).toMatchSnapshot();
  });

  it('should render delete button if not empty `initialValues` props.', () => {
    const component = shallow(<EventForm {...props} initialValues={{ id: '1' }} />);
    expect(component).toMatchSnapshot();
  });

  it('call `handleSubmit` when submitting form.', () => {
    const component = shallow(<EventForm {...props} />);
    component.find('form').simulate('submit');
    expect(props.handleSubmit).toBeCalled();
  });
});
