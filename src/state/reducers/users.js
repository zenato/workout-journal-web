import { handleActions } from 'redux-actions'
import {
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
  error: {
    signIn: null,
    loggedInfo: null,
  },
}

export default handleActions(
  {
    [REQUEST_SIGN_IN]: (state, action) => ({
      ...state,
      pending: true,
      error: { ...state.error, signIn: null },
    }),
    [SUCCESS_SIGN_IN]: (state, { payload: { accessToken, loggedInfo } }) => ({
      ...state,
      pending: false,
      error: { ...state.error, signIn: null },
      accessToken,
      loggedInfo,
    }),
    [FAILURE_SIGN_IN]: (state, action) => ({
      ...state,
      pending: false,
      error: { ...state.error, signIn: action.payload },
    }),

    [REQUEST_FETCH_LOGGED_INFO]: (state, action) => ({
      ...state,
      pending: true,
      error: { ...state.error, loggedInfo: null },
    }),
    [SUCCESS_FETCH_LOGGED_INFO]: (state, action) => ({
      ...state,
      pending: false,
      error: { ...state.error, loggedInfo: null },
      loggedInfo: action.payload,
    }),
    [FAILURE_FETCH_LOGGED_INFO]: (state, action) => ({
      ...state,
      pending: false,
      error: { ...state.error, loggedInfo: action.payload },
    }),
  },
  initialState,
)
