import * as actionTypes from '../constants/ActionTypes'

const defaultState = {
  banner: [],
  nowPlay: [],
  soonPlay: []
}

export default function home (state = defaultState, action) {
  switch (action.type) {
    case actionTypes.CAROUSEL:
      return {
        ...state,
        banner: action.data
      }
    case actionTypes.NOWPLAY:
      return {
        ...state,
        nowPlay: action.data
      }
    case actionTypes.SOONPLAY:
      return {
        ...state,
        soonPlay: action.data
      }
    default:
      return state
  }
}
