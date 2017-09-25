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

const api = (accessToken, query, variables) => axios.post(
  `${API_URL}/graphql`,
  {
    query,
    variables,
  },
  {
    headers: {
      'Authorization': `Bearer ${accessToken}`,
    },
})
.then(r => {
  if (r.error) throw r.error;
  return r.data.data;
});


// Events

export const getEvents = accessToken => params => api(
  accessToken,
  `
    query QueryEventForName($name: String) {
      events(name: $name) {
        id
        name
        unit
        value
        remark
      }
    }
  `,
  params,
).then(r => r.events);

export const getEvent = accessToken => id => api(
  accessToken,
  `
    query QueryEventForId($id: ID!) {
      event(id: $id) {
        id
        name
        unit
        value
        remark
      }
    }
  `,
  { id },
).then(r => r.event);


export const updateEvent = accessToken => (id, params) => api(
  accessToken,
  `
    mutation UpdateEventForId($id: ID!, $params: EventInput!) {
      updateEvent(id: $id, data: $params) {
        event {
          id
          name
          unit
          value
          remark
        }
      }
    }
  `,
  {
    id,
    params,
  },
).then(r => r.updateEvent.event);

export const insertEvent = accessToken => params => api(
  accessToken,
  `
    mutation CreateEvent($params: EventInput!) {
      createEvent(data: $params) {
        event {
          id
          name
          unit
          value
          remark
        }
      }
    }
  `,
  { params },
).then(r => r.createEvent.event);

export const deleteEvent = accessToken => id => api(
  accessToken,
  `
    mutation DeleteEventForId($id: ID!) {
      deleteEvent(id: $id) {
        success
      }
    }
  `,
  { id },
);


// Posts

export const getPosts = accessToken => params => api(
  accessToken,
  `
    query QueryPostForName($name: String) {
      posts(name: $name) {
        id
        workoutDate
        performances {
          id
          event {
            id
            name
            unit
          }
          value
          set1
          set2
          set3
          set4
          set5
        }
        remark
      }
    }
  `,
  params,
).then(r => r.posts);

export const getPost = accessToken => id => api(
  accessToken,
  `
    query QueryPostForId($id: ID!) {
      post(id: $id) {
        id
        workoutDate
        performances {
          event {
            id
            name
            unit
          }
          value
          set1
          set2
          set3
          set4
          set5
        }
        remark
      }
    }
  `,
  { id },
).then(r => r.post);

export const getMorePosts = accessToken => next => api(
  accessToken,
  `
    query NextPostsFrom($next: ID!) {
      nextPosts(next: $next) {
        id
        workoutDate
        performances {
          id
          event {
            id
            name
            unit
          }
          value
          set1
          set2
          set3
          set4
          set5
        }
        remark
      }
    }
  `,
  { next },
).then(r => r.nextPosts);

export const updatePost = accessToken => (id, { performances, ...data }) => api(
  accessToken,
  `
    mutation UpdatePostForId($id: ID!, $data: PostInput!, $performances: [PerformanceInput]) {
      updatePost(id: $id, data: $data, performances: $performances) {
        post {
          id
          workoutDate
          performances {
            event {
              id
              name
              unit
            }
            value
            set1
            set2
            set3
            set4
            set5
          }
          remark
        }
      }
    }
  `,
  {
    id,
    data,
    performances,
  },
).then(r => r.updatePost.post);

export const insertPost = accessToken => ({ performances, ...data }) => api(
  accessToken,
  `
    mutation CreatePostForId($data: PostInput!, $performances: [PerformanceInput]) {
      createPost(data: $data, performances: $performances) {
        post {
          id
          workoutDate
          performances {
            event {
              id
              name
              unit
            }
            value
            set1
            set2
            set3
            set4
            set5
          }
        }
      }
    }
  `,
  {
    data,
    performances,
  },
).then(r => r.createPost.post);

export const deletePost = accessToken => id => api(
  accessToken,
  `
    mutation DeletePostForId($id: ID!) {
      deletePost(id: $id) {
        success
      }
    }
  `,
  { id },
);


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

export const getUser = accessToken => () => api(
  accessToken,
  `{
    user {
      username
      email
    }
  }`,
).then(r => r.user);
