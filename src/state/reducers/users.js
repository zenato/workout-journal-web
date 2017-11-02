import { handleActions } from 'redux-actions'
import {
  RESTORE_SIGN_IN,
  REQUEST_SIGN_IN,
  SUCCESS_SIGN_IN,
  FAILURE_SIGN_IN,
  REQUEST_FETCH_LOGGED_INFO,
  SUCCESS_FETCH_LOGGED_INFO,
  FAILURE_FETCH_LOGGED_INFO,
  REQUIRED_AUTH,
} from '../actions/users'

const initialState = {
  loggedInfo: null,
  accessToken: null,
  pending: false,
  error: null,
  requiredAuth: false,
}

export default handleActions(
  {
    [RESTORE_SIGN_IN]: (state, action) => ({
      ...state,
      accessToken: action.payload,
    }),

    [REQUEST_SIGN_IN]: (state, action) => ({
      ...state,
      pending: true,
      error: null,
    }),
    [SUCCESS_SIGN_IN]: (state, action) => ({
      ...state,
      pending: false,
      error: null,
      accessToken: action.payload,
    }),
    [FAILURE_SIGN_IN]: (state, action) => ({
      ...state,
      pending: false,
      error: action.payload,
    }),

    [REQUEST_FETCH_LOGGED_INFO]: (state, action) => ({
      ...state,
      pending: true,
      error: null,
    }),
    [SUCCESS_FETCH_LOGGED_INFO]: (state, action) => ({
      ...state,
      pending: false,
      error: null,
      loggedInfo: action.payload,
    }),
    [FAILURE_FETCH_LOGGED_INFO]: (state, action) => ({
      ...state,
      pending: false,
      error: action.payload,
    }),

    [REQUIRED_AUTH]: (state, action) => ({
      ...state,
      requiredAuth: true,
    }),
  },
  initialState,
)
