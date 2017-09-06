import { createAction, handleActions } from 'redux-actions';
import { pender } from 'redux-pender';
import * as api from 'lib/api';

export const LOGIN = 'users/LOGIN';

const CLEAR_USER = 'users/CLEAR_USER';

export const login = createAction(LOGIN, api.login);

const initialState = {
  user: null,
  error: null,
};

export default handleActions({
  ...pender({
    type: LOGIN,
    onSuccess: (state, action) => ({
      ...state,
      error: null,
      user: action.payload.data,
    }),
  }),
  [CLEAR_USER]: (state, action) => ({
    ...state,
    user: null,
    error: null,
  }),
}, initialState);