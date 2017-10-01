import React from 'react';
import { Provider } from 'react-redux';
import { reduxForm } from 'redux-form'
import { configure, shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import configureStore from 'redux/configureStore';
import Performance from '../Performance';

configure({ adapter: new Adapter() });

const store = configureStore();

const Test = (props) => (
  <Provider store={store} {...props} />
);

const Form = (props) => (<form {...props} />);
const MockForm = reduxForm({ form: 'eventForm' })(Form);

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
    <Test>
      <MockForm>
        <Performance
          key={0}
          name={'performance[0]'}
          events={events}
          values={values}
          onDelete={() => {}}
        />
      </MockForm>MockForm>
    </Test>
  );
});

it('simulate delete click', () => {
  const onDelete = jest.fn();

  const component = mount(
    <Test>
      <MockForm>
        <Performance
          key={0}
          name={'performance[0]'}
          events={events}
          values={values}
          onDelete={onDelete}
        />
      </MockForm>
    </Test>
  );

  component.find('input[type="button"]').simulate('click', { preventDefault () {} });

  expect(onDelete).toBeCalled();
});
