import { fork } from 'redux-saga/effects'
import users from './users'
import events from './events'

export default function* rootSaga() {
  yield fork(users)
  yield fork(events)
}
