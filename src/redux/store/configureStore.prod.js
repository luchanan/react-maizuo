import { createStore, compose, applyMiddleware } from 'redux'
import rootReducer from '../reducers'
import thunk from 'redux-thunk'
import middlewares from './middlewares'

export default function configureStore (initialState) {
  return createStore(rootReducer, initialState, compose(applyMiddleware(thunk), middlewares))
}
