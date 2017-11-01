import _ from 'lodash'
import { takeEvery, put } from 'redux-saga/effects'
import { requiredAuth, FAILURE_SIGN_IN } from '../actions/users'

function* handleFailureAPI(action) {
  if (action.error && action.type !== FAILURE_SIGN_IN) {
    const statusCode = _.get(action.payload, 'response.status') || 0
    if (statusCode === 401) {
      yield put(requiredAuth())
    }
  }
}

export default function* rootSaga() {
  yield takeEvery('*', handleFailureAPI)
}
