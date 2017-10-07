import React from 'react';
import { shallow } from 'enzyme';
import EventItem from '../EventItem';

describe('EventItem', () => {
  const props = {
    item: {
      id: '1',
      name: 'test name',
      value: null,
      unit: 'KG',
      remark: 'test mock data',
    },
    onDetail: jest.fn(),
  };

  it('should render value and unit if not empty `value` props.', () => {
    const component = shallow(<EventItem {...props} value={10} />);
    expect(component).toMatchSnapshot()
  });

  it('should call `onDetail` if click link.', () => {
    const component = shallow(<EventItem {...props} />);
    component.find('a').simulate('click', { preventDefault: () => {} });
    expect(props.onDetail).toBeCalled();
  });
});
