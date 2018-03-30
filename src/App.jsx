import React from 'react'
import { renderRoutes } from 'react-router-config'
import { BrowserRouter, HashRouter } from 'react-router-dom'
import routes from 'routes'
const Router = process.env.NODE_ENV !== 'production' ? BrowserRouter : HashRouter
const App = () => (
  <div className='App'>
    <Router>
      {renderRoutes(routes)}
    </Router>
  </div>
)

export default App
