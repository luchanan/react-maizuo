import * as actionTypes from '../constants/ActionTypes'

const initialState = {
  openSidebar: false,
  headerTitle: '卖座电影'
}

export default function app (state = initialState, action) {
  switch (action.type) {
    case actionTypes.OPENSIDEBAR:
      return Object.assign({}, state, {openSidebar: action.data})
    case actionTypes.CHANGETITLE:
      return Object.assign({}, state, {headerTitle: action.data})
    default:
      return state
  }
}
