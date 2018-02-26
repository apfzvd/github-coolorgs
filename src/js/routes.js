import React from 'react'
import { Switch, Route } from 'react-router-dom'

//Pages
import AllRepos from './pages/AllRepos'
import ChooseOrg from './pages/ChooseOrg'

export default () => (
  <Switch>
    <Route exact path='/' component={AllRepos}/>
    <Route exact path='/choose-cool-org' component={ChooseOrg}/>
    <Route path='/:repo' component={AllRepos}/>
  </Switch>
)
