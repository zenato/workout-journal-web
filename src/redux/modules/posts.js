import { createAction, handleActions } from 'redux-actions';
import { pender } from 'redux-pender';
import * as api from 'lib/api';

export const GET_POSTS = 'posts/GET_POSTS';
export const GET_MORE_POSTS = 'posts/GET_MORE_POSTS';

export const GET_POST = 'posts/GET_POST';
export const UPDATE_POST = 'posts/UPDATE_POST';
export const INSERT_POST = 'posts/INSERT_POST';
export const DELETE_POST = 'posts/DELETE_POST';
const CLEAR_POST = 'posts/CLEAR_POST';
export const GET_POST_EVENTS = 'posts/GET_POST_EVENTS';

export const getPosts = (...params) => (dispatch, getState) => {
  const { accessToken } = getState();
  return dispatch(createAction(GET_POSTS, api.getPosts(accessToken))(...params));
};

export const getMorePosts = (...params) => (dispatch, getState) => {
  const { accessToken } = getState();
  return dispatch(createAction(GET_MORE_POSTS, api.getMorePosts(accessToken))(...params));
};

export const getPost = (...params) => (dispatch, getState) => {
  const { accessToken } = getState();
  return dispatch(createAction(GET_POST, api.getPost(accessToken))(...params));
};

export const getPostEvents = (...params) => (dispatch, getState) => {
  const { accessToken } = getState();
  return dispatch(createAction(GET_POST_EVENTS, api.getEvents(accessToken))(...params));
};

export const clearPost = createAction(CLEAR_POST);

export const updatePost = (...params) => (dispatch, getState) => {
  const { accessToken } = getState();
  return dispatch(createAction(UPDATE_POST, api.updatePost(accessToken))(...params));
};

export const insertPost = (...params) => (dispatch, getState) => {
  const { accessToken } = getState();
  return dispatch(createAction(INSERT_POST, api.insertPost(accessToken))(...params));
};

export const deletePost = (...params) => (dispatch, getState) => {
  const { accessToken } = getState();
  return dispatch(createAction(DELETE_POST, api.deletePost(accessToken))(...params));
};

const initialState = {
  events: [],
  items: [],
  item: null,
  error: null,
  next: null,
};

export default handleActions({
  ...pender({
    type: GET_POSTS,
    onSuccess: (state, action) => ({
      ...state,
      error: null,
      items: action.payload.data.results,
      next: action.payload.data.next,
    }),
  }),
  ...pender({
    type: GET_MORE_POSTS,
    onSuccess: (state, action) => ({
      ...state,
      error: null,
      items: [
        ...state.items,
        ...action.payload.data.results,
      ],
      next: action.payload.data.next,
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
    onSuccess: (state, action) => {
      const item = action.payload.data;
      return ({
        ...state,
        error: null,
        item,
        items: state.items.map(i => i.id === item.id ? item : i),
      });
    },
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
      items: [
        action.payload.data,
        ...state.items,
      ],
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
      items: state.items.filter(i => i.id !== state.item.id),
    }),
  }),
  [CLEAR_POST]: (state, action) => ({
    ...state,
    item: null,
    error: null,
  }),
}, initialState);
