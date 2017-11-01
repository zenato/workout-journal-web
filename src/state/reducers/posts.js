import { handleActions } from 'redux-actions'
import {
  REQUEST_FETCH_POSTS,
  SUCCESS_FETCH_POSTS,
  FAILURE_FETCH_POSTS,
  REQUEST_FETCH_MORE_POSTS,
  SUCCESS_FETCH_MORE_POSTS,
  FAILURE_FETCH_MORE_POSTS,
  REQUEST_FETCH_POST_EVENTS,
  SUCCESS_FETCH_POST_EVENTS,
  FAILURE_FETCH_POST_EVENTS,
  REQUEST_FETCH_POST,
  SUCCESS_FETCH_POST,
  FAILURE_FETCH_POST,
  REQUEST_UPDATE_POST,
  SUCCESS_UPDATE_POST,
  FAILURE_UPDATE_POST,
  REQUEST_INSERT_POST,
  SUCCESS_INSERT_POST,
  FAILURE_INSERT_POST,
  REQUEST_DELETE_POST,
  SUCCESS_DELETE_POST,
  FAILURE_DELETE_POST,
  CLEAR_POST,
} from '../actions/posts'

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
