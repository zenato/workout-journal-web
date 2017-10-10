import React from 'react';
import { shallow } from 'enzyme';
import EventForm from '../EventForm';

describe('EventForm', () => {
  const props = {
    handleSubmit: jest.fn(),
    initialValues: null,
    error: null,
    onDelete: jest.fn(),
    onMoveList: jest.fn(),
  };

  it('should render error message if not empty `error` props.', () => {
    const component = shallow(<EventForm {...props} error={['error']} />);
    expect(component).toMatchSnapshot();
  });

  it('should render delete button if not empty `initialValues` props.', () => {
    const component = shallow(<EventForm {...props} initialValues={{ id: '1' }} />);
    expect(component).toMatchSnapshot();
  });

  it('should call `handleSubmit` when submitting form.', () => {
    const component = shallow(<EventForm {...props} />);
    component.find('form').simulate('submit');
    expect(props.handleSubmit).toBeCalled();
  });

  it('should passes `onMoveList` to list button component.', () => {
    const component = shallow(<EventForm {...props} />);
    const button = component.find('Button[value="List"]').get(0);
    expect(button.props.onClick).toBe(props.onMoveList);
  });

  it('should passes `onDelete` to delete button component.', () => {
    const component = shallow(<EventForm {...props} initialValues={{ id: '1' }} />);
    const button = component.find('Button[value="Delete"]').get(0);
    expect(button.props.onClick).toBe(props.onDelete);
  });
});
