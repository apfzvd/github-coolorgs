import React from 'react'
import { Switch, Route } from 'react-router-dom'

//Pages
import Hello from './pages/Hello'
import Teste from './pages/Teste'

export default () => (
  <Switch>
    <Route exact path="/" component={Hello}/>
    <Route path="/:repo" component={Teste}/>
  </Switch>
)
