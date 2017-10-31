import { fork, select, call, put, takeEvery } from 'redux-saga/effects'
import { REQUEST_FETCH_EVENTS, successFetchEvents, failureFetchEvents } from 'redux/modules/events'
import * as api from 'lib/api'

function* fetchEvents({ payload: { query, done } }) {
  try {
    let accessToken = yield select(state => state.accessToken)
    const items = yield call(api.getEvents, accessToken, query)
    yield put(successFetchEvents({ items }))
  } catch (error) {
    yield put(failureFetchEvents({ error }))
  }
  if (done) {
    yield done()
  }
}

function* create() {
  yield takeEvery(REQUEST_FETCH_EVENTS, fetchEvents)
}

export default function* rootSaga() {
  yield fork(create)
}
