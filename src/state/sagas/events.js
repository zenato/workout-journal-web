import { take, fork, select, call, put } from 'redux-saga/effects'
import { RESTORE_SIGN_IN } from 'state/actions/users'
import {
  REQUEST_FETCH_EVENTS,
  REQUEST_FETCH_EVENT,
  REQUEST_INSERT_EVENT,
  REQUEST_UPDATE_EVENT,
  REQUEST_DELETE_EVENT,
  successFetchEvents,
  failureFetchEvents,
  successFetchEvent,
  failureFetchEvent,
  successInsertEvent,
  failureInsertEvent,
  successUpdateEvent,
  failureUpdateEvent,
  successDeleteEvent,
  failureDeleteEvent,
} from 'state/actions/events'
import * as api from 'lib/api'

function fetchEvents(accessToken, query) {
  return api
    .fetchEvents(accessToken, query)
    .then(items => ({ items }))
    .catch(error => ({ error }))
}

function* handleFetchEvents() {
  const accessToken = yield select(state => state.users.accessToken)
  while (true) {
    const { payload: { query, done } } = yield take(REQUEST_FETCH_EVENTS)
    const { items, error } = yield call(fetchEvents, accessToken, query)
    if (items) {
      yield put(successFetchEvents(items))
    } else {
      yield put(failureFetchEvents(error.response.data.errors))
    }
    if (done) {
      yield done()
    }
  }
}

function fetchEvent(accessToken, id) {
  if (id === null) {
    return Promise.resolve({ item: {} })
  }
  return api
    .fetchEvent(accessToken, id)
    .then(item => ({ item }))
    .catch(error => ({ error }))
}

function* handleFetchEvent() {
  const accessToken = yield select(state => state.users.accessToken)
  while (true) {
    const { payload: { id, done } } = yield take(REQUEST_FETCH_EVENT)
    const { item, error } = yield call(fetchEvent, accessToken, id)
    if (error) {
      yield put(failureFetchEvent(error))
    } else {
      yield put(successFetchEvent(item))
    }
    if (done) {
      yield done()
    }
  }
}

function insertEvent(accessToken, values) {
  return api
    .insertEvent(accessToken, values)
    .then(item => ({ item }))
    .catch(error => ({ error }))
}

function* handleInsertEvent() {
  const accessToken = yield select(state => state.users.accessToken)
  while (true) {
    const { payload: { values, done } } = yield take(REQUEST_INSERT_EVENT)
    const { item, error } = yield call(insertEvent, accessToken, values)
    if (error) {
      yield put(failureInsertEvent(error))
    } else {
      yield put(successInsertEvent(item))
      if (done) {
        yield done(item)
      }
    }
  }
}

function updateEvent(accessToken, values) {
  return api
    .updateEvent(accessToken, values)
    .then(item => ({ item }))
    .catch(error => ({ error }))
}

function* handleUpdateEvent() {
  const accessToken = yield select(state => state.users.accessToken)
  while (true) {
    const { payload: { values, done } } = yield take(REQUEST_UPDATE_EVENT)
    const { item, error } = yield call(updateEvent, accessToken, values)
    if (error) {
      yield put(failureUpdateEvent(error))
    } else {
      yield put(successUpdateEvent(item))
      if (done) {
        yield done(item)
      }
    }
  }
}

function deleteEvent(accessToken, id) {
  return api
    .deleteEvent(accessToken, id)
    .catch(error => ({ error }))
}

function* handleDeleteEvent() {
  const accessToken = yield select(state => state.users.accessToken)
  while (true) {
    const { payload: { id, done } } = yield take(REQUEST_DELETE_EVENT)
    const { error } = yield call(deleteEvent, accessToken, id)
    if (error) {
      yield put(failureDeleteEvent(error))
    } else {
      yield put(successDeleteEvent())
      if (done) {
        yield done()
      }
    }
  }
}

export default function* rootSaga() {
  // Wait sign in
  yield take(RESTORE_SIGN_IN)

  yield fork(handleFetchEvents)
  yield fork(handleFetchEvent)
  yield fork(handleInsertEvent)
  yield fork(handleUpdateEvent)
  yield fork(handleDeleteEvent)
}
