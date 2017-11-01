import { fork } from 'redux-saga/effects'
import users from './users'
import events from './events'
import posts from './posts'

export default function* rootSaga() {
  yield fork(users)
  yield fork(events)
  yield fork(posts)
}
