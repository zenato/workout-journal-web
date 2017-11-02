import { createAction } from 'redux-actions'

export const RESTORE_SIGN_IN = 'users/RESTORE_SIGN_IN'
export const INITIALIZED = 'users/INITIALIZED'

export const REQUEST_SIGN_IN = 'users/REQUEST_SIGN_IN'
export const SUCCESS_SIGN_IN = 'users/SUCCESS_SIGN_IN'
export const FAILURE_SIGN_IN = 'users/FAILURE_SIGN_IN'

export const REQUEST_SIGN_OUT = 'users/REQUEST_SIGN_OUT'

export const REQUIRED_AUTH = 'users/REQUIRED_AUTH'

export const restoreSiginIn = createAction(RESTORE_SIGN_IN)
export const initialized = createAction(INITIALIZED)

export const signIn = createAction(REQUEST_SIGN_IN)
export const successSignIn = createAction(SUCCESS_SIGN_IN)
export const failureSignIn = createAction(FAILURE_SIGN_IN)

export const signOut = createAction(REQUEST_SIGN_OUT)

export const requiredAuth = createAction(REQUIRED_AUTH)
