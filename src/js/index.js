import React from 'react'
import {BrowserRouter as Router} from 'react-router-dom'
import Routes from './routes'
import { Provider } from 'react-redux'
import { combineReducers, createStore } from 'redux'

import allrepos from './pages/AllRepos/redux/allrepos'

const dev_tools = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
const appState = combineReducers({
  allrepos
})

const store = createStore(appState, dev_tools)

export default () => (
  <Provider store={store}>
    <Router>
      <Routes />
    </Router>
  </Provider>
)
