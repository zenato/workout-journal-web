import { handleActions } from 'redux-actions'
import {
  INITIALIZED,
  RESTORE_SIGN_IN,
  REQUEST_SIGN_IN,
  SUCCESS_SIGN_IN,
  FAILURE_SIGN_IN,
  REQUIRED_AUTH,
} from '../actions/users'

const initialState = {
  loggedInfo: null,
  accessToken: null,
  pending: false,
  error: {
    signIn: null,
    loggedInfo: null,
  },
  requiredAuth: false,
  initialized: false,
}

export default handleActions(
  {
    [RESTORE_SIGN_IN]: (state, action) =>
      action.payload
        ? {
            ...state,
            accessToken: action.payload.accessToken,
            loggedInfo: action.payload.loggedInfo,
          }
        : state,

    [INITIALIZED]: (state, action) => ({
      ...state,
      initialized: true,
    }),

    [REQUEST_SIGN_IN]: (state, action) => ({
      ...state,
      pending: true,
      error: { ...state.error, signIn: null },
    }),
    [SUCCESS_SIGN_IN]: (state, action) => ({
      ...state,
      pending: false,
      error: { ...state.error, signIn: null },
      accessToken: action.payload,
    }),
    [FAILURE_SIGN_IN]: (state, action) => ({
      ...state,
      pending: false,
      error: { ...state.error, signIn: action.payload },
    }),

    [REQUIRED_AUTH]: (state, action) => ({
      ...state,
      requiredAuth: true,
    }),
  },
  initialState,
)
