import React from 'react'
import { shallow } from 'enzyme'
import SearchForm from '../SearchForm'

describe('SearchForm', () => {
  const props = {
    handleSubmit: jest.fn(),
  }

  it('should render without error.', () => {
    const component = shallow(<SearchForm {...props} />)
    expect(component).toMatchSnapshot()
  })

  it('should call `handleSubmit` when submit form.', () => {
    const component = shallow(<SearchForm {...props} />)
    component
      .find('Form')
      .dive()
      .find('form')
      .simulate('submit')
    expect(props.handleSubmit).toBeCalled()
  })
})
