import { createAction, handleActions } from 'redux-actions'
import { pender } from 'redux-pender'
import * as api from 'lib/api'
import createPrivateAction from '../utils/createPrivateAction'

export const REQUEST_FETCH_EVENTS = 'events/REQUEST_FETCH_EVENTS'
export const SUCCESS_FETCH_EVENTS = 'events/SUCCESS_FETCH_EVENTS'
export const FAILURE_FETCH_EVENTS = 'events/FAILURE_FETCH_EVENTS'

export const GET_EVENT = 'events/GET_EVENT'
export const UPDATE_EVENT = 'events/UPDATE_EVENT'
export const INSERT_EVENT = 'events/INSERT_EVENT'
export const DELETE_EVENT = 'events/DELETE_EVENT'
const CLEAR_EVENT = 'events/CLEAR_EVENT'

export const fetchEvents = createAction(REQUEST_FETCH_EVENTS, (query, cb) => ({ query, cb }))
export const successFetchEvents = createAction(SUCCESS_FETCH_EVENTS, ({ items }) => ({ items }))
export const failureFetchEvents = createAction(FAILURE_FETCH_EVENTS)

export const getEvent = createPrivateAction(GET_EVENT, api.getEvent)
export const clearEvent = createAction(CLEAR_EVENT)
export const updateEvent = createPrivateAction(UPDATE_EVENT, api.updateEvent)
export const insertEvent = createPrivateAction(INSERT_EVENT, api.insertEvent)
export const deleteEvent = createPrivateAction(DELETE_EVENT, api.deleteEvent)

const initialState = {
  items: [],
  item: null,
  status: '',
  error: '',
}

export default handleActions(
  {
    //...pender({
    //  type: GET_EVENTS,
    //  onSuccess: (state, action) => {
    //    return {
    //      ...state,
    //      items: action.payload,
    //    }
    //  },
    //}),

    [REQUEST_FETCH_EVENTS]: state => ({
      ...state,
      status: 'pending',
      error: false,
    }),
    [SUCCESS_FETCH_EVENTS]: (state, action) => ({
      ...state,
      status: 'done',
      error: false,
      items: action.payload.items,
    }),
    [FAILURE_FETCH_EVENTS]: state => ({
      ...state,
      status: 'done',
      error: true,
    }),

    ...pender({
      type: GET_EVENT,
      onSuccess: (state, action) => ({
        ...state,
        item: action.payload,
      }),
    }),
    ...pender({
      type: UPDATE_EVENT,
      onSuccess: (state, action) => ({
        ...state,
        item: action.payload,
        items: state.items.map(i => (i.id === state.item.id ? { ...i, ...action.payload } : i)),
      }),
    }),
    ...pender({
      type: INSERT_EVENT,
      onSuccess: (state, action) => ({
        ...state,
        items: [action.payload, ...state.items],
        item: action.payload,
      }),
    }),
    ...pender({
      type: DELETE_EVENT,
      onSuccess: (state, action) => ({
        ...state,
        item: null,
        items: state.items.filter(i => i.id !== state.item.id),
      }),
    }),
    [CLEAR_EVENT]: (state, action) => ({
      ...state,
      item: null,
    }),
  },
  initialState,
)
