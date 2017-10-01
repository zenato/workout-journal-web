import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import PostItem from '../PostItem';

configure({ adapter: new Adapter()});

const item = {
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
};

it('renders without error', () => {
  shallow(
    <PostItem
      item={item}
      onDetail={() => {}}
    />
  );
});

it('simulate click link', () => {
  let detailId = -1;
  const wrapper = shallow(
    <PostItem
      item={item}
      onDetail={(e, id) => detailId = id}
    />
  );
  wrapper.find('a').simulate('click');
  expect(detailId).toEqual('1');
});
