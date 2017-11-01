import { handleActions } from 'redux-actions'
import {
  RESTORE_SIGN_IN,
  REQUEST_SIGN_IN,
  SUCCESS_SIGN_IN,
  FAILURE_SIGN_IN,
  REQUEST_FETCH_LOGGED_INFO,
  SUCCESS_FETCH_LOGGED_INFO,
  FAILURE_FETCH_LOGGED_INFO,
} from '../actions/users'

const initialState = {
  loggedInfo: null,
  accessToken: null,
  pending: false,
  error: null,
}

export default handleActions(
  {
    [RESTORE_SIGN_IN]: (state, action) => ({
      ...state,
      accessToken: action.payload ? action.payload.accessToken : state.accessToken,
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
      accessToken: action.payload.accessToken,
    }),
    [FAILURE_SIGN_IN]: (state, action) => ({
      ...state,
      pending: false,
      error: action.payload.error,
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
      loggedInfo: action.payload.loggedInfo,
    }),
    [FAILURE_FETCH_LOGGED_INFO]: (state, action) => ({
      ...state,
      pending: false,
      error: action.payload.error,
    }),
  },
  initialState,
)
