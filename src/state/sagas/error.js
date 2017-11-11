import _ from 'lodash'
import { takeEvery, select, put } from 'redux-saga/effects'
import { push } from 'react-router-redux'

function* handleError(action) {
  const isPending = yield select(state => state.preloader.pending)
  if (!isPending && action.error) {
    const statusCode =  _.get(action.payload, 'response.status') || 500
    if (statusCode > 400 && statusCode < 500) {
      const location = yield select(state => state.router.location)
      if (!location || location.pathname !== '/signIn') {
        yield put(push('/signIn'))
      }
    }
  }
}

export default function* rootSaga() {
  yield takeEvery('*', handleError)
}
