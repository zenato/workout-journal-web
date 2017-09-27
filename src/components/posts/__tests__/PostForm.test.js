import React from 'react';
import { shallow, mount } from 'enzyme';
import PostForm from '../PostForm';

const events = [
  {
    id: '1',
    name: 'test',
    value: 10,
    unit: 'g',
    remark: 'test',
  },
];

const item = {
  id: 1,
  workoutDate: new Date().getTime(),
  remark: 'test',
  performances: [
    {
      event: events[0],
      value: 20,
      set1: 1,
      set2: 2,
      set3: 3,
      set4: 4,
      set5: 5,
    },
  ],
};

it('renders without errors', () => {
  shallow(
    <PostForm
      events={events}
      item={item}
      error={null}
      loading={false}
      onSubmit={() => {}}
      onDelete={() => {}}
      onMoveList={() => {}}
    />
  );
});

it('simulate submit after change form', () => {
  const onSubmit = jest.fn();
  const wrapper = mount(
    <PostForm
      events={events}
      item={item}
      error={null}
      loading={false}
      onSubmit={onSubmit}
      onDelete={() => {}}
      onMoveList={() => {}}
    />
  );

  // Changed input form
  wrapper.find('input[name="workoutDate"]').simulate('change', {
    target: {
      name: 'workoutDate',
      value: '2017-08-08',
    },
  });
  wrapper.find('input[name="remark"]').simulate('change', {
    target: {
      name: 'remark',
      value: 'test',
    },
  });

  wrapper.find('form').simulate('submit', {
    preventDefault: () => {},
  });

  expect(onSubmit).toBeCalledWith({
    performances: [
      {
        event: '1',
        set1: 1,
        set2: 2,
        set3: 3,
        set4: 4,
        set5: 5,
        value: 20,
      },
    ],
    remark: 'test',
    workoutDate: '2017-08-08',
  });
});

it('simulate move list click', () => {
  const onMoveList = jest.fn();

  const wrapper = mount(
    <PostForm
      events={events}
      item={item}
      error={null}
      loading={false}
      onSubmit={() => {}}
      onDelete={() => {}}
      onMoveList={onMoveList}
    />
  );

  wrapper.find('input[type="button"][value="List"]').at(0).simulate('click', {
    preventDefault: () => {},
  });

  expect(onMoveList).toBeCalledWith();
});

it('simulate delete click', () => {
  const onDelete = jest.fn();

  const wrapper = mount(
    <PostForm
      events={events}
      item={item}
      error={null}
      loading={false}
      onSubmit={() => {}}
      onDelete={onDelete}
      onMoveList={() => {}}
    />
  );

  wrapper.find('input[type="button"][value="Delete"]').at(0).simulate('click', {
    preventDefault: () => {},
  });

  expect(onDelete).toBeCalledWith();
});
