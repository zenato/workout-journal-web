import React from 'react';
import { shallow } from 'enzyme';
import EventItem from './EventItem';

const item = {
  id: 1,
  name: 'test name',
  value: 10,
  remark: 'test mock data',
};

it('renders without error', () => {
  shallow(
    <EventItem
      key={item.id}
      item={item}
      onDetail={() => {}}
    />
  );
});

it('simulate click link', () => {
  let detailId = -1;
  const wrapper = shallow(
    <EventItem
      key={item.id}
      item={item}
      onDetail={(e, id) => detailId = id}
    />
  );
  wrapper.find('a').simulate('click');
  expect(detailId).toEqual(1);
});