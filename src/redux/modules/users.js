import { createAction, handleActions } from 'redux-actions';
import { pender } from 'redux-pender';
import * as api from 'lib/api';
import createPrivateAction from '../utils/createPrivateAction';

export const LOGIN = 'users/LOGIN';

export const GET_USER = 'users/GET_USER';

const CLEAR_USER = 'users/CLEAR_USER';

export const login = createAction(LOGIN, api.login);
export const getUser = createPrivateAction(GET_USER, api.getUser);

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
    }),
  }),
  ...pender({
    type: GET_USER,
    onSuccess: (state, action) => {
      return ({
        ...state,
        error: null,
        user: action.payload.data,
      })
    },
  }),
  [CLEAR_USER]: (state, action) => ({
    ...state,
    user: null,
    error: null,
  }),
}, initialState);
