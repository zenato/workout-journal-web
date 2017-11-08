import asyncComponent from 'lib/asyncComponent'

export const Home = asyncComponent(() => import('./Home'))
export const Events = asyncComponent(() => import('./Events'))
export const Event = asyncComponent(() => import('./Event'))
export const Posts = asyncComponent(() => import('./Posts'))
export const Post = asyncComponent(() => import('./Post'))
export const SignIn = asyncComponent(() => import('./SignIn'))
