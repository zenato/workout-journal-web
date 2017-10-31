import { fork, select, call, put, takeEvery } from 'redux-saga/effects'
import { REQUEST_FETCH_EVENTS, successFetchEvents, failureFetchEvents } from 'redux/modules/events'
import * as api from 'lib/api'

function fetchEvents(accessToken, query) {
  return api
    .getEvents(accessToken, query)
    .then(items => ({ items }))
    .catch(error => ({ error }))
}

function* handleFetchEvents({ payload: { query, done } }) {
  let accessToken = yield select(state => state.users.accessToken)
  const { items, error } = yield call(fetchEvents, accessToken, query)
  if (items) {
    yield put(successFetchEvents({ items }))
  } else {
    yield put(failureFetchEvents({ error }))
  }
  if (done) {
    yield done()
  }
}

function* create() {
  yield takeEvery(REQUEST_FETCH_EVENTS, handleFetchEvents)
}

export default function* rootSaga() {
  yield fork(create)
}
