import { createAction, handleActions } from 'redux-actions'

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

const CLEAR_POST = 'posts/CLEAR_POST'

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

const initialState = {
  events: [],
  items: [],
  item: null,
  pageInfo: {
    hasNextPage: false,
    endCursor: null,
  },
  pending: {
    events: false,
    items: false,
    item: false,
  },
  error: {
    events: null,
    items: null,
    item: null,
  },
}

export default handleActions(
  {
    [REQUEST_FETCH_POSTS]: (state, action) => ({
      ...state,
      pending: { ...state.pending, items: true },
      error: { ...state.error, items: null },
    }),
    [SUCCESS_FETCH_POSTS]: (state, action) => ({
      ...state,
      pending: { ...state.pending, items: false },
      error: { ...state.error, items: null },
      items: action.payload.items,
      pageInfo: action.payload.pageInfo,
    }),
    [FAILURE_FETCH_POSTS]: (state, action) => ({
      ...state,
      pending: { ...state.pending, items: false },
      error: { ...state.error, items: action.payload.error },
    }),

    [REQUEST_FETCH_MORE_POSTS]: (state, action) => ({
      ...state,
      pending: { ...state.pending, items: true },
      error: { ...state.error, items: null },
    }),
    [SUCCESS_FETCH_MORE_POSTS]: (state, action) => ({
      ...state,
      pending: { ...state.pending, items: false },
      error: { ...state.error, items: null },
      items: [...state.items, ...action.payload.items],
      pageInfo: action.payload.pageInfo,
    }),
    [FAILURE_FETCH_MORE_POSTS]: (state, action) => ({
      ...state,
      pending: { ...state.pending, items: false },
      error: { ...state.error, items: action.payload.error },
    }),

    [REQUEST_FETCH_POST]: (state, action) => ({
      ...state,
      pending: { ...state.pending, item: true },
      error: { ...state.error, item: null },
    }),
    [SUCCESS_FETCH_POST]: (state, action) => ({
      ...state,
      pending: { ...state.pending, item: false },
      error: { ...state.error, item: null },
      item: action.payload.item,
    }),
    [FAILURE_FETCH_POST]: (state, action) => ({
      ...state,
      pending: { ...state.pending, item: false },
      error: { ...state.error, item: action.payload.error },
    }),

    [REQUEST_UPDATE_POST]: (state, action) => ({
      ...state,
      pending: { ...state.pending, item: true },
      error: { ...state.error, item: null },
    }),
    [SUCCESS_UPDATE_POST]: (state, action) => ({
      ...state,
      pending: { ...state.pending, item: false },
      error: { ...state.error, item: null },
      item: {
        ...action.payload.item,
        performances: action.payload.item.performances.map(p => ({
          ...p,
          event: { id: p.event.id },
        })),
      },
      items: state.items.map(i => (i.id === action.payload.item.id ? action.payload.item : i)),
    }),
    [FAILURE_UPDATE_POST]: (state, action) => ({
      ...state,
      pending: { ...state.pending, item: false },
      error: { ...state.error, item: action.payload.error },
    }),

    [REQUEST_INSERT_POST]: (state, action) => ({
      ...state,
      pending: { ...state.pending, item: true },
      error: { ...state.error, item: null },
    }),
    [SUCCESS_INSERT_POST]: (state, action) => ({
      ...state,
      pending: { ...state.pending, item: false },
      error: { ...state.error, item: null },
      item: {
        ...action.payload.item,
        performances: action.payload.item.performances.map(p => ({
          ...p,
          event: { id: p.event.id },
        })),
      },
      items: [action.payload.item, ...state.items],
    }),
    [FAILURE_INSERT_POST]: (state, action) => ({
      ...state,
      pending: { ...state.pending, item: false },
      error: { ...state.error, item: action.payload.error },
    }),

    [REQUEST_DELETE_POST]: (state, action) => ({
      ...state,
      pending: { ...state.pending, item: true },
      error: { ...state.error, item: null },
    }),
    [SUCCESS_DELETE_POST]: (state, action) => ({
      ...state,
      pending: { ...state.pending, item: false },
      error: { ...state.error, item: null },
      items: state.items.filter(i => i.id !== state.item.id),
    }),
    [FAILURE_DELETE_POST]: (state, action) => ({
      ...state,
      pending: { ...state.pending, item: false },
      error: { ...state.error, item: action.payload.error },
    }),

    [CLEAR_POST]: (state, action) => ({
      ...state,
      pending: { ...state.pending, item: null, events: null },
      error: { ...state.error, item: null, events: null },
      item: null,
      events: [],
    }),

    [REQUEST_FETCH_POST_EVENTS]: (state, action) => ({
      ...state,
      pending: { ...state.pending, events: true },
      error: { ...state.error, events: null },
    }),
    [SUCCESS_FETCH_POST_EVENTS]: (state, action) => ({
      ...state,
      pending: { ...state.pending, events: false },
      error: { ...state.error, events: null },
      events: action.payload.events,
    }),
    [FAILURE_FETCH_POST_EVENTS]: (state, action) => ({
      ...state,
      pending: { ...state.pending, events: false },
      error: { ...state.error, events: action.payload.error },
    }),
  },
  initialState,
)
