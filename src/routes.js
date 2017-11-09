import { Home, SignIn, Events, Event, Posts, Post } from 'pages'

export default {
  Home: {
    path: '/',
    component: Home,
    exact: true,
  },
  SignIn: {
    path: '/signIn',
    component: SignIn,
  },
  Events: {
    path: '/events',
    component: Events,
    exact: true,
  },
  Event: {
    path: '/events/:id',
    component: Event,
  },
  Posts: {
    path: '/posts',
    component: Posts,
    exact: true,
  },
  Post: {
    path: '/posts/:id',
    component: Post,
  },
}
