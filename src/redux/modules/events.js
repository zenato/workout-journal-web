import { createAction, handleActions } from 'redux-actions';
import { pender } from 'redux-pender';
import * as api from 'lib/api';

export const GET_EVENTS = 'events/GET_EVENTS';
const CLEAR_EVENTS = 'events/CLEAR_EVENTS';

export const GET_EVENT = 'events/GET_EVENT';
export const UPDATE_EVENT = 'events/UPDATE_EVENT';
export const INSERT_EVENT = 'events/INSERT_EVENT';
export const DELETE_EVENT = 'events/DELETE_EVENT';
const CLEAR_EVENT = 'events/CLEAR_EVENT';

export const getEvents = createAction(GET_EVENTS, api.getEvents);
export const clearEvents = createAction(CLEAR_EVENTS);

export const getEvent = createAction(GET_EVENT, api.getEvent);
export const clearEvent = createAction(CLEAR_EVENT);
export const updateEvent = createAction(UPDATE_EVENT, api.updateEvent);
export const insertEvent = createAction(INSERT_EVENT, api.insertEvent);
export const deleteEvent = createAction(DELETE_EVENT, api.deleteEvent);

const initialState = {
  items: [],
  item: null,
  error: null,
};

export default handleActions({
  ...pender({
    type: GET_EVENTS,
    onSuccess: (state, action) => ({
      ...state,
      error: null,
      items: action.payload.data.results,
    }),
  }),
  [CLEAR_EVENTS]: (state, action) => ({
    ...state,
    items: [],
    error: null,
  }),

  ...pender({
    type: GET_EVENT,
    onSuccess: (state, action) => ({
      ...state,
      error: null,
      item: action.payload.data,
    }),
  }),
  ...pender({
    type: UPDATE_EVENT,
    onSuccess: (state, action) => ({
      ...state,
      error: null,
      item: action.payload.data,
    }),
    onFailure: (state, action) => ({
      ...state,
      error: action.payload.response,
    }),
  }),
  ...pender({
    type: INSERT_EVENT,
    onSuccess: (state, action) => ({
      ...state,
      error: null,
      item: action.payload.data,
    }),
    onFailure: (state, action) => ({
      ...state,
      error: action.payload.response,
    }),
  }),
  ...pender({
    type: DELETE_EVENT,
    onSuccess: (state, action) => ({
      ...state,
      error: null,
    }),
  }),
  [CLEAR_EVENT]: (state, action) => ({
    ...state,
    item: null,
    error: null,
  }),
}, initialState);
