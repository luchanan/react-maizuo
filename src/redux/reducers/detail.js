import * as actionTypes from '../constants/ActionTypes'

const defaultState = {
  info: {}
}

export default function detail (state = defaultState, action) {
  switch (action.type) {
    case actionTypes.DETAIL:
      return {
        ...state,
        info: action.data
      }
    default:
      return state
  }
}
