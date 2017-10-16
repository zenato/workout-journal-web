import { createAction, handleActions } from 'redux-actions';
import { pender } from 'redux-pender';
import * as api from 'lib/api';
import createPrivateAction from '../utils/createPrivateAction';

export const GET_POSTS = 'posts/GET_POSTS';
export const GET_MORE_POSTS = 'posts/GET_MORE_POSTS';

export const GET_POST = 'posts/GET_POST';
export const UPDATE_POST = 'posts/UPDATE_POST';
export const INSERT_POST = 'posts/INSERT_POST';
export const DELETE_POST = 'posts/DELETE_POST';
const CLEAR_POST = 'posts/CLEAR_POST';
export const GET_POST_EVENTS = 'posts/GET_POST_EVENTS';

export const getPosts = createPrivateAction(GET_POSTS, api.getPosts);
export const getMorePosts = createPrivateAction(GET_MORE_POSTS, api.getMorePosts);
export const getPost = createPrivateAction(GET_POST, api.getPost);
export const getPostEvents = createPrivateAction(GET_POST_EVENTS, api.getPostEvents);
export const clearPost = createAction(CLEAR_POST);
export const updatePost = createPrivateAction(UPDATE_POST, api.updatePost);
export const insertPost = createPrivateAction(INSERT_POST, api.insertPost);
export const deletePost = createPrivateAction(DELETE_POST, api.deletePost);

const initialState = {
  events: [],
  items: [],
  item: null,
  pageInfo: {
    hasNextPage: false,
    endCursor: null,
  },
};

export default handleActions(
  {
    ...pender({
      type: GET_POSTS,
      onSuccess: (state, action) => ({
        ...state,
        items: action.payload.items,
        pageInfo: action.payload.pageInfo,
      }),
    }),
    ...pender({
      type: GET_MORE_POSTS,
      onSuccess: (state, action) => ({
        ...state,
        items: [...state.items, ...action.payload.items],
        pageInfo: action.payload.pageInfo,
      }),
    }),

    ...pender({
      type: GET_POST,
      onSuccess: (state, action) => ({
        ...state,
        item: action.payload,
      }),
    }),
    ...pender({
      type: GET_POST_EVENTS,
      onSuccess: (state, action) => ({
        ...state,
        events: action.payload,
      }),
    }),
    ...pender({
      type: UPDATE_POST,
      onSuccess: (state, action) => {
        const item = action.payload;
        return {
          ...state,
          item: {
            ...item,
            performances: item.performances.map(p => ({
              ...p,
              event: { id: p.event.id },
            })),
          },
          items: state.items.map(i => (i.id === item.id ? item : i)),
        };
      },
    }),
    ...pender({
      type: INSERT_POST,
      onSuccess: (state, action) => {
        const item = action.payload;
        return {
          ...state,
          error: null,
          item: {
            ...item,
            performances: item.performances.map(p => ({
              ...p,
              event: { id: p.event.id },
            })),
          },
          items: [item, ...state.items],
        };
      },
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
  },
  initialState,
);
