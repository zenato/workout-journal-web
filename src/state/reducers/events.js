import { handleActions } from 'redux-actions'
import {
  REQUEST_FETCH_EVENTS,
  SUCCESS_FETCH_EVENTS,
  FAILURE_FETCH_EVENTS,
  REQUEST_FETCH_EVENT,
  SUCCESS_FETCH_EVENT,
  FAILURE_FETCH_EVENT,
  REQUEST_UPDATE_EVENT,
  SUCCESS_UPDATE_EVENT,
  FAILURE_UPDATE_EVENT,
  REQUEST_INSERT_EVENT,
  SUCCESS_INSERT_EVENT,
  FAILURE_INSERT_EVENT,
  REQUEST_DELETE_EVENT,
  SUCCESS_DELETE_EVENT,
  FAILURE_DELETE_EVENT,
  CLEAR_EVENT,
} from '../actions/events'

const initialState = {
  items: null,
  item: null,

  pending: {
    items: false,
    item: false,
  },
  error: {
    items: null,
    item: null,
  },
}

export default handleActions(
  {
    [REQUEST_FETCH_EVENTS]: state => ({
      ...state,
      pending: { ...state.pending, items: true },
      error: { ...state.pending, items: null },
    }),
    [SUCCESS_FETCH_EVENTS]: (state, action) => ({
      ...state,
      pending: { ...state.pending, items: false },
      error: { ...state.pending, items: null },
      items: action.payload,
    }),
    [FAILURE_FETCH_EVENTS]: (state, action) => ({
      ...state,
      pending: { ...state.pending, items: false },
      error: { ...state.pending, items: action.payload },
    }),

    [REQUEST_FETCH_EVENT]: state => ({
      ...state,
      pending: { ...state.pending, item: true },
      error: { ...state.error, item: null },
    }),
    [SUCCESS_FETCH_EVENT]: (state, action) => ({
      ...state,
      pending: { ...state.pending, item: false },
      error: { ...state.error, item: null },
      item: action.payload,
    }),
    [FAILURE_FETCH_EVENT]: (state, action) => ({
      ...state,
      pending: { ...state.pending, item: false },
      error: { ...state.error, item: action.payload },
    }),

    [REQUEST_UPDATE_EVENT]: (state, action) => ({
      ...state,
      pending: { ...state.pending, item: true },
      error: { ...state.error, item: null },
    }),
    [SUCCESS_UPDATE_EVENT]: (state, action) => ({
      ...state,
      pending: { ...state.pending, item: false },
      error: { ...state.error, item: null },
      item: action.payload,
      items: state.items.map(i => (i.id === state.item.id ? { ...i, ...action.payload } : i)),
    }),
    [FAILURE_UPDATE_EVENT]: (state, action) => ({
      ...state,
      pending: { ...state.pending, item: false },
      error: { ...state.error, item: action.payload },
    }),

    [REQUEST_INSERT_EVENT]: (state, action) => ({
      ...state,
      pending: { ...state.pending, item: true },
      error: { ...state.error, item: null },
    }),
    [SUCCESS_INSERT_EVENT]: (state, action) => ({
      ...state,
      pending: { ...state.pending, item: false },
      error: { ...state.error, item: null },
      item: action.payload,
      items: [action.payload, ...state.items],
    }),
    [FAILURE_INSERT_EVENT]: (state, action) => ({
      ...state,
      pending: { ...state.pending, item: false },
      error: { ...state.error, item: action.payload },
    }),

    [REQUEST_DELETE_EVENT]: (state, action) => ({
      ...state,
      pending: { ...state.pending, item: true },
      error: { ...state.error, item: null },
    }),
    [SUCCESS_DELETE_EVENT]: (state, action) => ({
      ...state,
      pending: { ...state.pending, item: false },
      error: { ...state.error, item: null },
      item: null,
      items: state.items.filter(i => i.id !== state.item.id),
    }),
    [FAILURE_DELETE_EVENT]: (state, action) => ({
      ...state,
      pending: { ...state.pending, item: false },
      error: { ...state.error, item: action.payload },
    }),

    [CLEAR_EVENT]: (state, action) => ({
      ...state,
      item: null,
    }),
  },
  initialState,
)
