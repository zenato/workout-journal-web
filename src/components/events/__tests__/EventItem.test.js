import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import EventItem from '../EventItem';

configure({ adapter: new Adapter()});

const item = {
  id: '1',
  name: 'test name',
  value: 10,
  unit: 'KG',
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
  expect(detailId).toEqual('1');
});
