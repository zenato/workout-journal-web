import { takeEvery, select, put } from 'redux-saga/effects'
import { push } from 'react-router-redux'

function* handleFailureAPI(action) {
  if ((action.error || /FAILURE_/.test(action.type))) {
    const statusCode =  action.payload.status || 0
    if (statusCode === 401) {
      const location = yield select(state => state.router.location)
      if (!location || location.pathname !== '/signIn') {
        yield put(push('/signIn'))
      }
    }
  }
}

export default function* rootSaga() {
  yield takeEvery('*', handleFailureAPI)
}
