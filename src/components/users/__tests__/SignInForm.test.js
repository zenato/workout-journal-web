import React from 'react'
import { shallow } from 'enzyme'
import SignInForm from '../SignInForm'

describe('SignInForm', () => {
  const props = {
    hasError: false,
    handleSubmit: jest.fn(),
  }

  it('should render error if not empty `error` props.', () => {
    const component = shallow(<SignInForm {...props} hasError={true} />)
    expect(component).toMatchSnapshot()
  })

  it('should call `onSubmit` if submit form.', () => {
    const component = shallow(<SignInForm {...props} />).dive()
    component.find('form').simulate('submit')
    expect(props.handleSubmit).toBeCalled()
  })
})
