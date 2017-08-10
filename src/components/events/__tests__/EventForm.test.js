import React from 'react';
import { shallow } from 'enzyme';
import EventForm from '../EventForm';

const item = {
  id: 1,
  name: 'test',
  value: 10,
  unit: 'g',
  remark: 'test',
};

it('renders without errors', () => {
  shallow(
    <EventForm
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
    <EventForm
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
  wrapper.find('input[name="name"]').simulate('change', {
    target: {
      name: 'name',
      value: 'changed name',
    },
  });
  wrapper.find('input[name="value"]').simulate('change', {
    target: {
      name: 'value',
      value: 20,
    },
  });
  wrapper.find('input[name="unit"]').simulate('change', {
    target: {
      name: 'unit',
      value: 'kg',
    },
  });
  wrapper.find('input[name="remark"]').simulate('change', {
    target: {
      name: 'remark',
      value: 'changed remark',
    },
  });

  wrapper.find('form').simulate('submit', {
    preventDefault: () => {},
  });

  expect(onSubmit).toBeCalledWith({
    error: null,
    id: 1,
    name: 'changed name',
    value: 20,
    unit: 'kg',
    remark: 'changed remark',
  });
});

it('simulate move list click', () => {
  const onMoveList = jest.fn();

  const wrapper = shallow(
    <EventForm
      item={item}
      error={null}
      onSubmit={() => {}}
      onDelete={() => {}}
      onMoveList={onMoveList}
    />
  );

  wrapper.find('input[type="button"]').at(0).simulate('click', {
    preventDefault: () => {},
  });

  expect(onMoveList).toBeCalledWith();
});

it('simulate delete click', () => {
  const onDelete = jest.fn();

  const wrapper = shallow(
    <EventForm
      item={item}
      error={null}
      onSubmit={() => {}}
      onDelete={onDelete}
      onMoveList={() => {}}
    />
  );

  wrapper.find('input[type="button"]').at(1).simulate('click', {
    preventDefault: () => {},
  });

  expect(onDelete).toBeCalledWith();
});
