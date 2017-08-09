import asyncRoute from 'lib/asyncRoute';

export const Home = asyncRoute(() => import('./Home'));
export const Events = asyncRoute(() => import('./Events'));
export const Event = asyncRoute(() => import('./Event'));
export const Posts = asyncRoute(() => import('./Posts'));
export const Post = asyncRoute(() => import('./Post'));
