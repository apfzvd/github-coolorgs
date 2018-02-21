import React from 'react'
import {BrowserRouter as Router} from 'react-router-dom'
import Routes from './routes'
import { Provider } from 'react-redux'
import { combineReducers, createStore } from 'redux'

import hellocomp from './pages/Hello/reducer.js'
import testecomp from './pages/Teste/reducer.js'

const dev_tools = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
const appState = combineReducers({
  hellocomp,
  testecomp
})

const store = createStore(appState, dev_tools)

export default () => (
  <Provider store={store}>
    <Router>
      <Routes />
    </Router>
  </Provider>
)
