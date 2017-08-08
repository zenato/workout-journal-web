import _ from 'lodash';
import axios from 'axios';
import queryString from 'query-string';
import { API_HOST } from 'constants';

export function getErrorMessages (error, fieldName, context) {
  const prefix = context ? `${context}.` : '';
  return _.get(error, prefix + fieldName);
}

// Events

export function getEvents({ name, remark } = {}) {
  const query = {
    'name__icontains': name,
    'remark__icontains': remark,
  };
  return axios.get(`${API_HOST}/events/?${queryString.stringify(query)}`);
}

export const getEvent = id => axios.get(`${API_HOST}/events/${id}`);
export const updateEvent = (id, params) => axios.put(`${API_HOST}/events/${id}/`, params);
export const insertEvent = params => axios.post(`${API_HOST}/events/`, params);
export const deleteEvent = id => axios.delete(`${API_HOST}/events/${id}`);


// Posts

export function getPosts({ name } = {}) {
  const query = {
    'performances__event__name__icontains': name,
  };
  return axios.get(`${API_HOST}/posts/?${queryString.stringify(query)}`);
}

export const getPost = id => axios.get(`${API_HOST}/posts/${id}`);
export const updatePost = (id, params) => axios.put(`${API_HOST}/posts/${id}/`, params);
export const insertPost = (params) => axios.post(`${API_HOST}/posts/`, params);
export const deletePost = id => axios.delete(`${API_HOST}/posts/${id}`);
