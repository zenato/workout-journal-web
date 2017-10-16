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
  hasError: false,
};

export default handleActions(
  {
    ...pender({
      type: LOGIN,
      onSuccess: (state, action) => ({
        ...state,
        hasError: null,
      }),
      onFailure: (state, action) => ({
        ...state,
        hasError: true,
      }),
    }),

    ...pender({
      type: GET_USER,
      onSuccess: (state, action) => {
        return {
          ...state,
          hasError: null,
          user: action.payload,
        };
      },
      onFailure: (state, action) => ({
        ...state,
        // Skip error for unauthorization.
      }),
    }),
  },
  initialState,
);
