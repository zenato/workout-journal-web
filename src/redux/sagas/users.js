import Cookies from 'js-cookie'
import { take, fork, select, call, put } from 'redux-saga/effects'
import {
  RESTORE_SIGN_IN,
  REQUEST_SIGN_IN,
  REQUEST_SIGN_OUT,
  REQUEST_FETCH_LOGGED_INFO,
  restoreSiginIn,
  successSignIn,
  failureSignIn,
  successFetchLoggedInfo,
  failureFetchLoggedInfo,
} from 'redux/modules/users'
import * as api from 'lib/api'

const accessTokenCookieKey = 'accessToken'

function storeCookieAndRedirect(accessToken, location) {
  Cookies.set(accessTokenCookieKey, accessToken, { path: '/' })

  let from = '/'
  if (location.state && location.state.from) {
    from = location.state.from.pathname + location.state.from.search
  }
  window.location.replace(from)
}

function clearCookieAndRedirect() {
  Cookies.remove(accessTokenCookieKey)
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
    if (accessToken && !error) {
      yield put(successSignIn({ accessToken }))
      storeCookieAndRedirect(accessToken, location)
    } else {
      yield put(failureSignIn({ error }))
    }
  }
}

function fetchLoggedInfo(accessToken) {
  return api
    .fetchLoggedInfo(accessToken)
    .then(loggedInfo => ({ loggedInfo }))
    .catch(error => ({ error }))
}

function* handleFetchLoggedInfo() {
  while (true) {
    const { payload: { done } } = yield take(REQUEST_FETCH_LOGGED_INFO)
    const accessToken = yield select(state => state.users.accessToken)
    const { loggedInfo, error } = yield call(fetchLoggedInfo, accessToken)
    if (accessToken && !error) {
      yield put(successFetchLoggedInfo({ loggedInfo }))
    } else {
      yield put(failureFetchLoggedInfo({ error }))
    }
    if (done) {
      done()
    }
  }
}

function* handleSignOut() {
  yield take(REQUEST_SIGN_OUT)
  clearCookieAndRedirect()
}

export default function* rootSaga() {
  yield fork(function*() {
    yield fork(handleSignIn)

    // Wait sign in
    yield take(RESTORE_SIGN_IN)

    yield fork(handleFetchLoggedInfo)
    yield fork(handleSignOut)
  })

  const storedAccessToken = yield select(state => state.users.accessToken)
  if (storedAccessToken) {
    yield put(restoreSiginIn())
  } else {
    const accessToken = Cookies.get('accessToken')
    if (accessToken) {
      yield put(restoreSiginIn({ accessToken }))
    }
  }
}
