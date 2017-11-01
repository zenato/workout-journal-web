import { createAction } from 'redux-actions'

export const REQUEST_FETCH_POSTS = 'posts/REQUEST_FETCH_POSTS'
export const SUCCESS_FETCH_POSTS = 'posts/SUCCESS_FETCH_POSTS'
export const FAILURE_FETCH_POSTS = 'posts/FAILURE_FETCH_POSTS'

export const REQUEST_FETCH_MORE_POSTS = 'posts/REQUEST_FETCH_MORE_POSTS'
export const SUCCESS_FETCH_MORE_POSTS = 'posts/SUCCESS_FETCH_MORE_POSTS'
export const FAILURE_FETCH_MORE_POSTS = 'posts/FAILURE_FETCH_MORE_POSTS'

export const REQUEST_FETCH_POST = 'posts/REQUEST_FETCH_POST'
export const SUCCESS_FETCH_POST = 'posts/SUCCESS_FETCH_POST'
export const FAILURE_FETCH_POST = 'posts/FAILURE_FETCH_POST'

export const REQUEST_UPDATE_POST = 'posts/REQUEST_UPDATE_POST'
export const SUCCESS_UPDATE_POST = 'posts/SUCCESS_UPDATE_POST'
export const FAILURE_UPDATE_POST = 'posts/FAILURE_UPDATE_POST'

export const REQUEST_INSERT_POST = 'posts/REQUEST_INSERT_POST'
export const SUCCESS_INSERT_POST = 'posts/SUCCESS_INSERT_POST'
export const FAILURE_INSERT_POST = 'posts/FAILURE_INSERT_POST'

export const REQUEST_DELETE_POST = 'posts/REQUEST_DELETE_POST'
export const SUCCESS_DELETE_POST = 'posts/SUCCESS_DELETE_POST'
export const FAILURE_DELETE_POST = 'posts/FAILURE_DELETE_POST'

export const CLEAR_POST = 'posts/CLEAR_POST'

export const REQUEST_FETCH_POST_EVENTS = 'posts/REQUEST_FETCH_POST_EVENTS'
export const SUCCESS_FETCH_POST_EVENTS = 'posts/SUCCESS_FETCH_POST_EVENTS'
export const FAILURE_FETCH_POST_EVENTS = 'posts/FAILURE_FETCH_POST_EVENTS'

export const fetchPosts = createAction(REQUEST_FETCH_POSTS)
export const successFetchPosts = createAction(SUCCESS_FETCH_POSTS)
export const failureFetchPosts = createAction(FAILURE_FETCH_POSTS)

export const fetchMorePosts = createAction(REQUEST_FETCH_MORE_POSTS)
export const successFetchMorePosts = createAction(SUCCESS_FETCH_MORE_POSTS)
export const failureFetchMorePosts = createAction(FAILURE_FETCH_MORE_POSTS)

export const fetchPost = createAction(REQUEST_FETCH_POST)
export const successFetchPost = createAction(SUCCESS_FETCH_POST)
export const failureFetchPost = createAction(FAILURE_FETCH_POST)

export const updatePost = createAction(REQUEST_UPDATE_POST)
export const successUpdatePost = createAction(SUCCESS_UPDATE_POST)
export const failureUpdatePost = createAction(FAILURE_UPDATE_POST)

export const insertPost = createAction(REQUEST_INSERT_POST)
export const successInsertPost = createAction(SUCCESS_INSERT_POST)
export const failureInsertPost = createAction(FAILURE_INSERT_POST)

export const deletePost = createAction(REQUEST_DELETE_POST)
export const successDeletePost = createAction(SUCCESS_DELETE_POST)
export const failureDeletePost = createAction(FAILURE_DELETE_POST)

export const clearPost = createAction(CLEAR_POST)

export const fetchPostEvents = createAction(REQUEST_FETCH_POST_EVENTS)
export const successFetchPostEvents = createAction(SUCCESS_FETCH_POST_EVENTS)
export const failureFetchPostEvents = createAction(FAILURE_FETCH_POST_EVENTS)
