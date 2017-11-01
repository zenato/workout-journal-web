import { take, fork, select, call, put } from 'redux-saga/effects'
import { RESTORE_SIGN_IN } from 'state/actions/users'
import {
  REQUEST_FETCH_POSTS,
  REQUEST_FETCH_MORE_POSTS,
  REQUEST_FETCH_POST_EVENTS,
  REQUEST_FETCH_POST,
  REQUEST_INSERT_POST,
  REQUEST_UPDATE_POST,
  REQUEST_DELETE_POST,
  successFetchPosts,
  failureFetchPosts,
  successFetchMorePosts,
  failureFetchMorePosts,
  successFetchPostEvents,
  failureFetchPostEvents,
  successFetchPost,
  failureFetchPost,
  successInsertPost,
  failureInsertPost,
  successUpdatePost,
  failureUpdatePost,
  successDeletePost,
  failureDeletePost,
  fetchPost,
} from 'state/actions/posts'
import * as api from 'lib/api'

function fetchPosts(accessToken, query) {
  return api.fetchPosts(accessToken, query).catch(error => ({ error }))
}

function* handleFetchPosts() {
  const accessToken = yield select(state => state.users.accessToken)
  while (true) {
    const { payload: { query, done } } = yield take(REQUEST_FETCH_POSTS)
    const { items, pageInfo, error } = yield call(fetchPosts, accessToken, query)
    if (items) {
      yield put(successFetchPosts({ items, pageInfo }))
    } else {
      yield put(failureFetchPosts({ error }))
    }
    done && (yield done())
  }
}

function fetchMorePosts(accessToken, after) {
  return api.fetchMorePosts(accessToken, after).catch(error => ({ error }))
}

function* handleFetchMorePosts() {
  const accessToken = yield select(state => state.users.accessToken)
  while (true) {
    const { payload: { after } } = yield take(REQUEST_FETCH_MORE_POSTS)
    const { items, pageInfo, error } = yield call(fetchMorePosts, accessToken, after)
    if (items) {
      yield put(successFetchMorePosts({ items, pageInfo }))
    } else {
      yield put(failureFetchMorePosts({ error }))
    }
  }
}

function fetchPostApi(accessToken, id) {
  return api
    .fetchPost(accessToken, id)
    .then(item => ({ item }))
    .catch(error => ({ error }))
}

function* handleFetchPost() {
  const accessToken = yield select(state => state.users.accessToken)
  while (true) {
    const { payload: { id, done } } = yield take(REQUEST_FETCH_POST)
    const { item, error } = yield call(fetchPostApi, accessToken, id)
    if (error) {
      yield put(failureFetchPost({ error }))
    } else {
      yield put(successFetchPost({ item }))
    }
    done && (yield done())
  }
}

function fetchPostEvents(accessToken) {
  return api
    .fetchPostEvents(accessToken)
    .then(events => ({ events }))
    .catch(error => ({ error }))
}

function* handleFetchPostEvents() {
  const accessToken = yield select(state => state.users.accessToken)
  while (true) {
    // Fetch events
    const { payload: { id, done } } = yield take(REQUEST_FETCH_POST_EVENTS)
    const { events, error } = yield call(fetchPostEvents, accessToken)
    if (error) {
      yield put(failureFetchPostEvents({ error }))
    } else {
      yield put(successFetchPostEvents({ events }))
    }

    // Fetch post
    if (id) {
      yield put(fetchPost({ id, done }))
    } else {
      done && (yield done())
    }
  }
}

function insertPost(accessToken, values) {
  return api
    .insertPost(accessToken, values)
    .then(item => ({ item }))
    .catch(error => ({ error }))
}

function* handleInsertPost() {
  const accessToken = yield select(state => state.users.accessToken)
  while (true) {
    const { payload: { values, done } } = yield take(REQUEST_INSERT_POST)
    const { item, error } = yield call(insertPost, accessToken, values)
    if (error) {
      yield put(failureInsertPost({ error }))
    } else {
      yield put(successInsertPost({ item }))
      done && (yield done(item))
    }
  }
}

function updatePost(accessToken, values) {
  return api
    .updatePost(accessToken, values)
    .then(item => ({ item }))
    .catch(error => ({ error }))
}

function* handleUpdatePost() {
  const accessToken = yield select(state => state.users.accessToken)
  while (true) {
    const { payload: { values, done } } = yield take(REQUEST_UPDATE_POST)
    const { item, error } = yield call(updatePost, accessToken, values)
    if (error) {
      yield put(failureUpdatePost({ error }))
    } else {
      yield put(successUpdatePost({ item }))
      done && (yield done(item))
    }
  }
}

function deletePost(accessToken, id) {
  return api.deletePost(accessToken, id).catch(error => ({ error }))
}

function* handleDeletePost() {
  const accessToken = yield select(state => state.users.accessToken)
  while (true) {
    const { payload: { id, done } } = yield take(REQUEST_DELETE_POST)
    const { error } = yield call(deletePost, accessToken, id)
    if (error) {
      yield put(failureDeletePost({ error }))
    } else {
      yield put(successDeletePost())
      done && (yield done())
    }
  }
}

export default function* rootSaga() {
  // Wait sign in
  yield take(RESTORE_SIGN_IN)

  yield fork(handleFetchPosts)
  yield fork(handleFetchMorePosts)
  yield fork(handleFetchPostEvents)
  yield fork(handleFetchPost)
  yield fork(handleInsertPost)
  yield fork(handleUpdatePost)
  yield fork(handleDeletePost)
}
