import { createAction } from 'redux-actions'

export const SET_PENDING = 'preloader/SET_PENDING'

export const fetch = createAction(SET_PENDING, () => true)
export const fetchComplete = createAction(SET_PENDING, () => false)
