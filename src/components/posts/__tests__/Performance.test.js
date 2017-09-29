import React from 'react';
import { shallow, mount } from 'enzyme';
import Performance from '../Performance';

const events = [
  {
    id: '1',
    name: 'test',
    value: 10,
    unit: 'g',
    remark: 'test',
  },
];

const values = {
  id: 1,
  name: 'test',
  value: 10,
  unit: 'g',
  remark: 'test',
};

it('renders without errors', () => {
  shallow(
    <Performance
      key={0}
      name={'performance[0]'}
      events={events}
      values={values}
      onDelete={() => {}}
    />
  );
});

it('simulate delete click', () => {
  const onDelete = jest.fn();

  const component = mount(
    <table>
      <tbody>
        <Performance
          idx={1}
          events={events}
          item={item}
          error={null}
          onChange={() => {}}
          onDelete={onDelete}
        />
      </tbody>
    </table>
  );

  component.find('input[type="button"]').simulate('click', { preventDefault () {} });

  expect(onDelete).toBeCalled();
});
