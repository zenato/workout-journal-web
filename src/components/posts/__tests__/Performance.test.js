import React from 'react';
import { shallow } from 'enzyme';
import Performance from '../Performance';

describe('Performance', () => {
  const props = {
    name: 'performance[0]',
    events: [
      {
        id: '1',
        name: 'test',
        value: 10,
        unit: 'g',
        remark: 'test',
      },
    ],
    values: {
      id: 1,
      event: {
        id: '1',
        name: 'test',
        unit: 'g',
      },
      value: 11,
    },
    onDelete: jest.fn(),
  };

  it('should render without errors.', () => {
    const component = shallow(<Performance {...props} />);
    expect(component).toMatchSnapshot();
  });
});

