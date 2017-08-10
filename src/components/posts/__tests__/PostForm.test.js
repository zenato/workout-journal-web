import React from 'react';
import { shallow } from 'enzyme';
import PostForm from '../PostForm';

const item = {
  id: 1,
  workout_date: new Date().getTime(),
  remark: 'test',
  performances: [
    {
      event: {
        id: 1,
        name: 'test',
        value: 10,
        unit: 'g',
        remark: 'test',
      },
      value: 20,
      set1: 1,
      set2: 2,
      set3: 3,
      set4: 4,
      set5: 5,
    },
  ],
};

const events = [
  {
    id: 1,
    name: 'test',
    value: 10,
    unit: 'g',
    remark: 'test',
  },
];

it('renders without errors', () => {
  shallow(
    <PostForm
      events={events}
      item={item}
      error={null}
      onSubmit={() => {
      }}
      onDelete={() => {
      }}
      onMoveList={() => {
      }}
    />
  );
});

it('simulate submit after change form', () => {
  const onSubmit = jest.fn();
  const wrapper = shallow(
    <PostForm
      item={item}
      error={null}
      onSubmit={onSubmit}
      onDelete={() => {
      }}
      onMoveList={() => {
      }}
    />
  );

  // Changed input form
  wrapper.find('input[name="workout_date"]').simulate('change', {
    target: {
      name: 'workout_date',
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
    preventDefault: () => {
    },
  });

  expect(onSubmit).toBeCalledWith({
    id: 1,
    performances: [
      {
        event: {
          id: 1,
          name: 'test',
          remark: 'test',
          unit: 'g',
          value: 10,
        },
        set1: 1,
        set2: 2,
        set3: 3,
        set4: 4,
        set5: 5,
        value: 20
      }
    ],
    remark: 'test',
    workout_date: '2017-08-08',
  });
});

it('simulate move list click', () => {
  const onMoveList = jest.fn();

  const wrapper = shallow(
    <PostForm
      events={events}
      item={item}
      error={null}
      onSubmit={() => {}}
      onDelete={() => {}}
      onMoveList={onMoveList}
    />
  );

  wrapper.find('input[type="button"]').at(0).simulate('click', {
    preventDefault: () => {
    },
  });

  expect(onMoveList).toBeCalledWith();
});

it('simulate delete click', () => {
  const onDelete = jest.fn();

  const wrapper = shallow(
    <PostForm
      events={events}
      item={item}
      error={null}
      onSubmit={() => {}}
      onDelete={onDelete}
      onMoveList={() => {}}
    />
  );

  wrapper.find('input[type="button"]').at(1).simulate('click', {
    preventDefault: () => {
    },
  });

  expect(onDelete).toBeCalledWith();
});
