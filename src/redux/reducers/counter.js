import * as actionTypes from '../constants/ActionTypes'

const defaultState = {
  count: 0
}

export default function counter (state = defaultState, action) {
  switch (action.type) {
    case actionTypes.INCREMENT:
      return { count: state.count + 1 }
    case actionTypes.REDUCE:
      return { count: state.count - 1 }
    default:
      return state
  }
}
