import { createAction } from 'redux-actions';

export default (type, action = (accessToken) => {}) => (...params) => (dispatch, getState) => {
  const { accessToken } = getState();
  return dispatch(createAction(type, action(accessToken))(...params));
};
