import _ from 'lodash';
import axios from 'axios';
import queryString from 'query-string';

let API_URL = '/api';

if (process.env.APP_ENV === 'server') {
  API_URL = 'http://0.0.0.0:3001' + API_URL;
}

export function getErrorMessages(error, fieldName, context) {
  const prefix = context ? `${context}.` : '';
  return _.get(error, prefix + fieldName);
}

const getConfig = accessToken => ({
  headers: {
    'Authorization': `Bearer ${accessToken}`,
  },
});


// Events

export const getEvents = accessToken => ({ name, remark } = {}) => {
  const query = {
    'name__icontains': name,
    'remark__icontains': remark,
  };
  return axios.get(
    `${API_URL}/events/?${queryString.stringify(query)}`,
    getConfig(accessToken),
  );
};

export const getEvent = accessToken => id =>
  axios.get(`${API_URL}/events/${id}/`, getConfig(accessToken));


export const updateEvent = accessToken => (id, params) =>
  axios.put(`${API_URL}/events/${id}/`, params, getConfig(accessToken));

export const insertEvent = accessToken => params =>
  axios.post(`${API_URL}/events/`, params, getConfig(accessToken));

export const deleteEvent = accessToken => id =>
  axios.delete(`${API_URL}/events/${id}/`, getConfig(accessToken));


// Posts

export const getPosts = accessToken => ({ name } = {}) => {
  const query = {
    'performances__event__name__icontains': name,
  };
  return axios.get(
    `${API_URL}/posts/?${queryString.stringify(query)}`,
    getConfig(accessToken),
  );
};

export const getPost = accessToken => id =>
  axios.get(`${API_URL}/posts/${id}/`, getConfig(accessToken));

export const getMorePosts = accessToken => next =>
  axios.get(next, getConfig(accessToken));

export const updatePost = accessToken => (id, params) =>
  axios.put(`${API_URL}/posts/${id}/`, params, getConfig(accessToken));

export const insertPost = accessToken => params =>
  axios.post(`${API_URL}/posts/`, params, getConfig(accessToken));

export const deletePost = accessToken => id =>
  axios.delete(`${API_URL}/posts/${id}/`, getConfig(accessToken));


// Users

export const login = ({ username, password }) => axios.post(
  `${API_URL}/o/token/`,
  queryString.stringify({
    'grant_type': 'password',
    username,
    password,
  }),
  {
    auth: {
      username: process.env.REACT_APP_API_CLIENT_ID,
      password: process.env.REACT_APP_API_CLIENT_SECRET,
    },
  },
);

export const getUser = accessToken => () =>
  axios.get(`${API_URL}/users/me/`, getConfig(accessToken));
