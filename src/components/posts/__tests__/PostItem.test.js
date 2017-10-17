import React from 'react';
import { shallow } from 'enzyme';
import PostItem from '../PostItem';

describe('PostItem', () => {
  const props = {
    item: {
      id: '1',
      workoutDate: '2017-08-18T05:54:17.061Z',
      remark: 'test',
      performances: [
        {
          event: {
            name: 'test',
          },
        },
      ],
    },
    onDetail: jest.fn(),
  };

  it('should render without error.', () => {
    const component = shallow(<PostItem {...props} />);
    expect(component).toMatchSnapshot();
  });

  it('should call `onDetail` if click link.', () => {
    const component = shallow(<PostItem {...props} />);
    component
      .find('Link')
      .dive()
      .find('a')
      .simulate('click', { preventDefault: () => {} });
    expect(props.onDetail.mock.calls[0][0]).toBe('1');
  });
});
