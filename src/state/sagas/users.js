import Cookies from 'js-cookie'
import { take, fork, select, call, put } from 'redux-saga/effects'
import {
  RESTORE_SIGN_IN,
  REQUEST_SIGN_IN,
  REQUEST_SIGN_OUT,
  restoreSiginIn,
  successSignIn,
  failureSignIn,
  initialized,
} from 'state/actions/users'
import * as api from 'lib/api'

const ACCESS_TOKEN_COOKIE_NAME = 'accessToken'

function storeCookieAndRedirect(accessToken, location) {
  Cookies.set(ACCESS_TOKEN_COOKIE_NAME, accessToken, { path: '/' })

  let from = '/'
  if (location.state && location.state.from) {
    from = location.state.from.pathname + location.state.from.search
  }
  window.location.replace(from)
}

function clearCookieAndRedirect() {
  Cookies.remove(ACCESS_TOKEN_COOKIE_NAME)
  window.location.href = '/'
}

function signIn(params) {
  return api
    .signIn(params)
    .then(({ data }) => ({ accessToken: data['access_token'] }))
    .catch(error => ({ error }))
}

function* handleSignIn() {
  while (true) {
    const { payload: { location, ...params } } = yield take(REQUEST_SIGN_IN)
    const { accessToken, error } = yield call(signIn, params)
    if (error) {
      yield put(failureSignIn(error))
    } else {
      yield put(successSignIn(accessToken))
      storeCookieAndRedirect(accessToken, location)
    }
  }
}

function* handleSignOut() {
  yield take(REQUEST_SIGN_OUT)
  clearCookieAndRedirect()
}

function fetchLoggedInfo(accessToken) {
  return api
    .fetchLoggedInfo(accessToken)
    .then(loggedInfo => ({ loggedInfo }))
    .catch(error => ({ error }))
}

function* initialAuth() {
  const isInitialized = yield select(state => state.users.initialized)
  if (isInitialized) {
    yield put(restoreSiginIn())
  } else {
    const accessToken =
      (yield select(state => state.users.accessToken)) || Cookies.get(ACCESS_TOKEN_COOKIE_NAME)
    if (accessToken) {
      const { loggedInfo, error } = yield call(fetchLoggedInfo, accessToken)
      if (!error) {
        yield put(restoreSiginIn({ accessToken, loggedInfo }))
      }
    }
  }
  yield put(initialized())
}

export default function* rootSaga() {
  yield fork(initialAuth)
  yield fork(handleSignIn)

  // Wait sign in
  yield take(RESTORE_SIGN_IN)

  yield fork(handleSignOut)
}
