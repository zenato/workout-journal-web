import React from 'react';
import { Provider } from 'react-redux';
import { configure, shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import configureStore from 'redux/configureStore';
import PostForm from '../PostForm';

configure({ adapter: new Adapter()});

const store = configureStore();

const Test = (props) => (
  <Provider store={store} {...props} />
);

const events = [
  {
    id: '1',
    name: 'test',
    value: 10,
    unit: 'g',
    remark: 'test',
  },
];

const initialValues = {
  id: '1',
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
    <Test>
      <PostForm
        events={events}
        initialValues={initialValues}
        error={null}
        loading={false}
        onSubmit={() => {}}
        onDelete={() => {}}
        onMoveList={() => {}}
      />
    </Test>
  );
});

it('simulate submit after change form', () => {
  const onSubmit = jest.fn();
  const component = mount(
    <Test>
      <PostForm
        events={events}
        initialValues={initialValues}
        formValues={initialValues}
        error={null}
        loading={false}
        onSubmit={onSubmit}
        onDelete={() => {}}
        onMoveList={() => {}}
      />
    </Test>
  );

  // Changed input form
  component.find('input[name="workoutDate"]').simulate('change', {
    target: {
      name: 'workoutDate',
      value: '2017-08-08',
    },
  });
  component.find('input[name="remark"]').simulate('change', {
    target: {
      name: 'remark',
      value: 'test',
    },
  });

  component.find('form').simulate('submit', { preventDefault () {} });

  expect(onSubmit.mock.calls[0][0]).toEqual({
    id: '1',
    workoutDate: '2017-08-08',
    remark: 'test',
    performances: [
      {
        event: events[0],
        set1: 1,
        set2: 2,
        set3: 3,
        set4: 4,
        set5: 5,
        value: 20,
      },
    ],
  });
});

it('simulate move list click', () => {
  const onMoveList = jest.fn();

  const component = mount(
    <Test>
      <PostForm
        events={events}
        initialValues={initialValues}
        formValues={initialValues}
        error={null}
        loading={false}
        onSubmit={() => {}}
        onDelete={() => {}}
        onMoveList={onMoveList}
      />
    </Test>
  );

  component.find('input[type="button"][value="List"]').at(0).simulate('click', {
    preventDefault: () => {},
  });

  expect(onMoveList).toBeCalled();
});

it('simulate delete click', () => {
  const onDelete = jest.fn();

  const component = mount(
    <Test>
      <PostForm
        events={events}
        initialValues={initialValues}
        formValues={initialValues}
        error={null}
        loading={false}
        onSubmit={() => {}}
        onDelete={onDelete}
        onMoveList={() => {}}
      />
    </Test>
  );

  component.find('input[type="button"][value="Delete"]').at(0).simulate('click', { preventDefault () {} });

  expect(onDelete).toBeCalled();
});
