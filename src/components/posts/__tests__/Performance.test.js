import React from 'react';
import { shallow } from 'enzyme';
import Performance from '../Performace';

const events = [
  {
    id: 1,
    name: 'test',
    value: 10,
    unit: 'g',
    remark: 'test',
  },
];

const item = {
  id: 1,
  name: 'test',
  value: 10,
  unit: 'g',
  remark: 'test',
};

it('renders without errors', () => {
  shallow(
    <Performance
      events={events}
      idx={0}
      item={item}
      error={null}
      onChange={() => {}}
      onDelete={() => {}}
    />
  );
});

it('simulate change form', () => {
  let performance = null;

  function onChange(i, p) {
    performance = { ...performance, ...p };
  }

  const wrapper = shallow(
    <Performance
      events={events}
      idx={0}
      item={item}
      error={null}
      onChange={onChange}
      onDelete={() => {}}
    />
  );

  // Changed input form
  wrapper.find('select[name="event"]').simulate('change', {
    target: {
      name: 'event',
      value: '1',
    },
  });
  wrapper.find('input[name="value"]').simulate('change', {
    target: {
      name: 'value',
      value: 10,
    },
  });
  wrapper.find('input[name="set1"]').simulate('change', {
    target: {
      name: 'set1',
      value: 1,
    },
  });
  wrapper.find('input[name="set2"]').simulate('change', {
    target: {
      name: 'set2',
      value: 2,
    },
  });
  wrapper.find('input[name="set3"]').simulate('change', {
    target: {
      name: 'set3',
      value: 3,
    },
  });
  wrapper.find('input[name="set4"]').simulate('change', {
    target: {
      name: 'set4',
      value: 4,
    },
  });
  wrapper.find('input[name="set5"]').simulate('change', {
    target: {
      name: 'set5',
      value: 5,
    },
  });

  expect(performance).toEqual({
    id: 1,
    name: 'test',
    value: 10,
    unit: 'g',
    remark: 'test',
    event: { id: 1, name: 'test', value: 10, unit: 'g', remark: 'test' },
    set1: 1,
    set2: 2,
    set3: 3,
    set4: 4,
    set5: 5,
  });
});

it('simulate delete click', () => {
  const onDelete = jest.fn();

  const wrapper = shallow(
    <Performance
      idx={1}
      events={events}
      item={item}
      error={null}
      onChange={() => {}}
      onDelete={onDelete}
    />
  );

  wrapper.find('button').simulate('click', {
    preventDefault: () => {},
  });

  expect(onDelete).toBeCalledWith(1);
});
