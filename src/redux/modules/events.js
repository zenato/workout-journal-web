import { createAction, handleActions } from 'redux-actions';
import { pender } from 'redux-pender';
import * as api from 'lib/api';
import createPrivateAction from '../utils/createPrivateAction';

export const GET_EVENTS = 'events/GET_EVENTS';

export const GET_EVENT = 'events/GET_EVENT';
export const UPDATE_EVENT = 'events/UPDATE_EVENT';
export const INSERT_EVENT = 'events/INSERT_EVENT';
export const DELETE_EVENT = 'events/DELETE_EVENT';
const CLEAR_EVENT = 'events/CLEAR_EVENT';

export const getEvents = createPrivateAction(GET_EVENTS, api.getEvents);
export const getEvent = createPrivateAction(GET_EVENT, api.getEvent);
export const clearEvent = createAction(CLEAR_EVENT);
export const updateEvent = createPrivateAction(UPDATE_EVENT, api.updateEvent);
export const insertEvent = createPrivateAction(INSERT_EVENT, api.insertEvent);
export const deleteEvent = createPrivateAction(DELETE_EVENT, api.deleteEvent);

const initialState = {
  items: [],
  item: null,
  error: null,
};

export default handleActions({
  ...pender({
    type: GET_EVENTS,
    onSuccess: (state, action) => {
      return ({
        ...state,
        error: null,
        items: action.payload,
      })
    },
  }),

  ...pender({
    type: GET_EVENT,
    onSuccess: (state, action) => ({
      ...state,
      error: null,
      item: action.payload,
    }),
  }),
  ...pender({
    type: UPDATE_EVENT,
    onSuccess: (state, action) => ({
      ...state,
      error: null,
      item: action.payload,
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
      item: action.payload,
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
