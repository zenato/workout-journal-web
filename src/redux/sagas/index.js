import { fork } from 'redux-saga/effects'
import events from './events'

export default function* rootSaga() {
  yield fork(events)
}
