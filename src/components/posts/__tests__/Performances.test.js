import React from 'react'
import { shallow } from 'enzyme'
import Performances from '../Performances'

describe('Performances', () => {
  const props = {
    events: [{ id: '1', name: 'event' }],
    fields: {
      map: fn => [fn('performances[0]', 0)],
      remove: () => {},
    },
    meta: {},
    formValues: {
      performances: [],
    },
  }

  it('should render without errors.', () => {
    const component = shallow(<Performances {...props} />)
    expect(component).toMatchSnapshot()
  })
})
