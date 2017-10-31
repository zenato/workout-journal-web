import React from 'react'
import { shallow } from 'enzyme'
import Nav from '../Nav'

describe('Nav', () => {
  const props = {
    loggedInfo: null,
    onLogout: jest.fn(),
  }

  it('should render logout button if not empty `user` prop.', () => {
    const component = shallow(<Nav {...props} loggedInfo={{ username: 'tester' }} />).dive()
    expect(component).toMatchSnapshot()
  })

  it('call `logout` props when click logout link.', () => {
    const component = shallow(<Nav {...props} loggedInfo={{ username: 'tester' }} />).dive()
    component.find('a').simulate('click')
    expect(props.onLogout).toBeCalled()
  })
})
