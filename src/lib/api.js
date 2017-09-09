import _ from 'lodash';
import axios from 'axios';
import queryString from 'query-string';
import { API_HOST } from '../constants';

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
    `${API_HOST}/events/?${queryString.stringify(query)}`,
    getConfig(accessToken),
  );
};

export const getEvent = accessToken => id =>
  axios.get(`${API_HOST}/events/${id}`, getConfig(accessToken));

export const updateEvent = accessToken => (id, params) =>
  axios.put(`${API_HOST}/events/${id}/`, params, getConfig(accessToken));

export const insertEvent = accessToken => params =>
  axios.post(`${API_HOST}/events/`, params, getConfig(accessToken));

export const deleteEvent = accessToken => id =>
  axios.delete(`${API_HOST}/events/${id}`, getConfig(accessToken));


// Posts

export const getPosts = accessToken => ({ name } = {}) => {
  const query = {
    'performances__event__name__icontains': name,
  };
  return axios.get(
    `${API_HOST}/posts/?${queryString.stringify(query)}`,
    getConfig(accessToken),
  );
};

export const getPost = accessToken => id =>
  axios.get(`${API_HOST}/posts/${id}`, getConfig(accessToken));

export const getMorePosts = accessToken => next =>
  axios.get(next, getConfig(accessToken));

export const updatePost = accessToken => (id, params) =>
  axios.put(`${API_HOST}/posts/${id}/`, params, getConfig(accessToken));

export const insertPost = accessToken => params =>
  axios.post(`${API_HOST}/posts/`, params, getConfig(accessToken));

export const deletePost = accessToken => id =>
  axios.delete(`${API_HOST}/posts/${id}`, getConfig(accessToken));


// Users

export const login = ({ username, password }) => axios.post(
  `${API_HOST}/o/token/`,
  queryString.stringify({
    'grant_type': 'password',
    username,
    password,
  }),
  {
    auth: {
      username: 'Ta0Fuj8Wbk57Fs2cTr1wChevVKWz2nFnwqbrldMp',
      password: 'ZkJrGc2cGL10cIjPTsuXbiTYByUH4bp68rjRPAWb8CGDWkOS7m4cUO679PalDHd83lnWwqyRORA4LySYdWalxwccvcAbE1oTEsIbEpd39aaNzMcuH8ZKBMsIipoaiiem',
    },
  },
);

export const getUser = accessToken => () =>
  axios.get(`${API_HOST}/users/me/`, getConfig(accessToken));
