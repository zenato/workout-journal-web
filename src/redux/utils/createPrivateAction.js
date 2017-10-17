import { createAction } from 'redux-actions'

export default (type, action) => (...params) => (dispatch, getState) => {
  const { accessToken } = getState()
  return dispatch(createAction(type, action(accessToken))(...params))
}
