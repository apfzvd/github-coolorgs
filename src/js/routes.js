import React from 'react'
import { Switch, Route } from 'react-router-dom'

//Pages
import AllRepos from './pages/AllRepos'

export default () => (
  <Switch>
    <Route exact path="/" component={AllRepos}/>
    <Route path="/:repo" component={AllRepos}/>
  </Switch>
)
