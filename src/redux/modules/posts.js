import { createAction, handleActions } from 'redux-actions';
import { pender } from 'redux-pender';
import * as api from 'lib/api';

export const GET_POSTS = 'posts/GET_POSTS';

export const GET_POST = 'posts/GET_POST';
export const UPDATE_POST = 'posts/UPDATE_POST';
export const INSERT_POST = 'posts/INSERT_POST';
export const DELETE_POST = 'posts/DELETE_POST';
const CLEAR_POST = 'posts/CLEAR_POST';
export const GET_POST_EVENTS = 'posts/GET_POST_EVENTS';

export const getPosts = createAction(GET_POSTS, api.getPosts);

export const getPost = createAction(GET_POST, api.getPost);
export const getPostEvents = createAction(GET_POST_EVENTS, api.getEvents);
export const clearPost = createAction(CLEAR_POST);
export const updatePost = createAction(UPDATE_POST, api.updatePost);
export const insertPost = createAction(INSERT_POST, api.insertPost);
export const deletePost = createAction(DELETE_POST, api.deletePost);

const initialState = {
  items: [],
  item: null,
  error: null,
  events: [],
};

export default handleActions({
  ...pender({
    type: GET_POSTS,
    onSuccess: (state, action) => ({
      ...state,
      error: null,
      items: action.payload.data.results,
    }),
  }),

  ...pender({
    type: GET_POST,
    onSuccess: (state, action) => ({
      ...state,
      error: null,
      item: action.payload.data,
    }),
  }),
  ...pender({
    type: GET_POST_EVENTS,
    onSuccess: (state, action) => ({
      ...state,
      error: null,
      events: action.payload.data,
    }),
  }),
  ...pender({
    type: UPDATE_POST,
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
    type: INSERT_POST,
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
    type: DELETE_POST,
    onSuccess: (state, action) => ({
      ...state,
      error: null,
    }),
  }),
  [CLEAR_POST]: (state, action) => ({
    ...state,
    item: null,
    error: null,
  }),
}, initialState);
