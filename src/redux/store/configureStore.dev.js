import { createStore, compose, applyMiddleware } from 'redux'
import rootReducer from '../reducers/index'
import middlewares from './middlewares'
import thunk from 'redux-thunk'
// chrome Redux DevTools浏览器插件调试redux
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const enhancer = composeEnhancers(applyMiddleware(thunk), middlewares)

export default function configureStore (initialState) {
  const store = createStore(
    rootReducer,
    initialState,
    enhancer
  )

  if (module.hot) {
    module.hot.accept('../reducers', () => {
      const nextRootReducer = require('../reducers/index').default
      store.replaceReducer(nextRootReducer)
    })
  }

  return store
}
