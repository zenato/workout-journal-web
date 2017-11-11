import { handleActions } from 'redux-actions'
import { SET_PENDING } from '../actions/preloader'

const initialState = {
  pending: false,
}

export default handleActions(
  {
    [SET_PENDING]: (state, { payload }) => ({
      ...state,
      pending: payload,
    }),
  },
  initialState,
)
