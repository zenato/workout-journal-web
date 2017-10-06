import React from 'react';
import { shallow } from 'enzyme';
import Nav from '../Nav';

const props = {
  user: null,
  onLogout: () => {},
};

it('Render without `user` prop.', () => {
  const component = shallow(<Nav {...props} />);
  expect(component).toMatchSnapshot();
});

it('Render with `user` prop.', () => {
  const user = { username: 'username' };
  const component = shallow(<Nav {...props} user={user} />);
  expect(component).toMatchSnapshot();
});

it('Call `logout` prop when click logout link.', () => {
  const onLogout = jest.fn();
  const user = { username: 'username' };
  const component = shallow(<Nav {...props} user={user} onLogout={onLogout} />);
  component.find('aside a').simulate('click');
  expect(onLogout).toBeCalled();
});
