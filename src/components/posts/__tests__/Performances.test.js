import React from 'react';
import { shallow } from 'enzyme';
import Performances from '../Performances';

const events = [
  { id: 'key-1', name: 'event-1' },
];

const fields = {
  map: func => [func('performances[0]', 0)],
  remove: () => {}
};

const formValues = {
  performances: [],
};

it('renders without errors', () => {
  const wrapper = shallow(
    <Performances
      key={0}
      fields={fields}
      events={events}
      meta={{}}
      formValues={formValues}
    />
  );
  expect(wrapper).toMatchSnapshot();
});
