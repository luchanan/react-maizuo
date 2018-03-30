import { combineReducers } from 'redux'
import counter from './counter'
import app from './app'
import home from './home'
import detail from './detail'

export default combineReducers({
  counter,
  home,
  app,
  detail
})
