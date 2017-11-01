import _ from 'lodash'
import { takeEvery, put } from 'redux-saga/effects'
import { requiredAuth } from '../actions/users'

function* handleFailureAPI(action) {
  if (action.error) {
    const statusCode = _.get(action.payload, 'response.status') || 0
    if (statusCode === 401) {
      yield put(requiredAuth())
    }
  }
}

export default function* rootSaga() {
  yield takeEvery('*', handleFailureAPI)
}
