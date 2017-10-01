import React from 'react';
import { Provider } from 'react-redux';
import { configure, shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import configureStore from 'redux/configureStore';
import EventForm from '../EventForm';

configure({ adapter: new Adapter()});

const store = configureStore();

const Test = (props) => (
  <Provider store={store} {...props} />
);

const initialValues = {
  id: '1',
  name: 'test',
  value: 10,
  unit: 'g',
  remark: 'test',
};

it('renders without errors', () => {
  shallow(
    <EventForm
      initialValues={initialValues}
      error={null}
      onSubmit={() => {}}
      onDelete={() => {}}
      onMoveList={() =>{}}
    />
  );
});

it('simulate submit after change form', () => {
  const onSubmit = jest.fn();
  const component = mount(
    <Test>
      <EventForm
        initialValues={initialValues}
        error={null}
        onSubmit={onSubmit}
        onDelete={() => {}}
        onMoveList={() => {}}
      />
    </Test>
  );

  // Changed input form
  component.find('input[name="name"]').simulate('change', {
    target: {
      name: 'name',
      value: 'changed name',
    },
  });
  component.find('input[name="value"]').simulate('change', {
    target: {
      name: 'value',
      value: 20,
    },
  });
  component.find('input[name="unit"]').simulate('change', {
    target: {
      name: 'unit',
      value: 'kg',
    },
  });
  component.find('input[name="remark"]').simulate('change', {
    target: {
      name: 'remark',
      value: 'changed remark',
    },
  });

  component.find('form').simulate('submit', { preventDefault () {} });

  expect(onSubmit.mock.calls[0][0]).toEqual({
    id: '1',
    name: 'changed name',
    remark: 'changed remark',
    unit: 'kg',
    value: 20,
  });
});

it('simulate move list click', () => {
  const onMoveList = jest.fn();

  const wrapper = mount(
    <Test>
      <EventForm
        initialValues={initialValues}
        error={null}
        onSubmit={() => {}}
        onDelete={() => {}}
        onMoveList={onMoveList}
      />
    </Test>
  );

  wrapper.find('input[type="button"]').at(0).simulate('click', { preventDefault () {} });

  expect(onMoveList).toBeCalled()
});

it('simulate delete click', () => {
  const onDelete = jest.fn();

  const wrapper = mount(
    <Test>
      <EventForm
        initialValues={initialValues}
        error={null}
        onSubmit={() => {}}
        onDelete={onDelete}
        onMoveList={() => {}}
      />
    </Test>
  );

  wrapper.find('input[type="button"]').at(1).simulate('click', { preventDefault () {} });

  expect(onDelete).toBeCalled();
});
