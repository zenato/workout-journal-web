import { take, fork, select, call, put, all } from 'redux-saga/effects'
import { RESTORE_SIGN_IN } from 'state/actions/users'
import {
  REQUEST_FETCH_POSTS,
  REQUEST_FETCH_MORE_POSTS,
  REQUEST_FETCH_POST_WITH_EVENTS,
  REQUEST_INSERT_POST,
  REQUEST_UPDATE_POST,
  REQUEST_DELETE_POST,
  successFetchPosts,
  failureFetchPosts,
  successFetchMorePosts,
  failureFetchMorePosts,
  fetchEvents,
  successFetchEvents,
  failureFetchEvents,
  fetchPost,
  successFetchPost,
  failureFetchPost,
  successInsertPost,
  failureInsertPost,
  successUpdatePost,
  failureUpdatePost,
  successDeletePost,
  failureDeletePost,
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
    if (error) {
      yield put(failureFetchPosts(error))
    } else {
      yield put(successFetchPosts({ items, pageInfo }))
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
    if (error) {
      yield put(failureFetchMorePosts(error))
    } else {
      yield put(successFetchMorePosts({ items, pageInfo }))
    }
  }
}

function fetchPostApi(accessToken, id) {
  if (!id) {
    return Promise.resolve({ item: {} })
  }
  return api
    .fetchPost(accessToken, id)
    .then(item => ({ item }))
    .catch(error => ({ error }))
}

function fetchEventsApi(accessToken) {
  return api
    .fetchPostEvents(accessToken)
    .then(items => ({ items }))
    .catch(error => ({ error }))
}

function* handleFetchPostWithEvents() {
  const accessToken = yield select(state => state.users.accessToken)
  while (true) {
    const { payload: { id, done } } = yield take(REQUEST_FETCH_POST_WITH_EVENTS)

    yield put(fetchPost())
    yield put(fetchEvents())

    const [ post, events ] = yield all([
      call(fetchPostApi, accessToken, id),
      call(fetchEventsApi, accessToken)
    ])

    if (post.error) {
      yield put(failureFetchPost(post.error))
    } else {
      yield put(successFetchPost(post))
    }

    if (events.error) {
      yield put(failureFetchEvents(events.error))
    } else {
      yield put(successFetchEvents(events))
    }

    done && (yield done())
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
      yield put(failureInsertPost(error))
    } else {
      yield put(successInsertPost(item))
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
      yield put(failureUpdatePost(error))
    } else {
      yield put(successUpdatePost(item))
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
      yield put(failureDeletePost(error))
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
  yield fork(handleFetchPostWithEvents)
  yield fork(handleInsertPost)
  yield fork(handleUpdatePost)
  yield fork(handleDeletePost)
}
