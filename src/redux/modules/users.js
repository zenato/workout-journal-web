import { createAction, handleActions } from 'redux-actions';
import { pender } from 'redux-pender';
import * as api from 'lib/api';
import createPrivateAction from '../utils/createPrivateAction';

export const LOGIN = 'users/LOGIN';

export const GET_USER = 'users/GET_USER';

export const login = createAction(LOGIN, api.login);
export const getUser = createPrivateAction(GET_USER, api.getUser);

const initialState = {
  user: null,
};

export default handleActions(
  {
    ...pender({
      type: LOGIN,
      onSuccess: (state, action) => ({
        ...state,
      }),
    }),

    ...pender({
      type: GET_USER,
      onSuccess: (state, action) => ({
        ...state,
        user: action.payload,
      }),
    }),
  },
  initialState,
);
