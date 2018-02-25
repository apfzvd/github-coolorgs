import React from 'react'
import reactDOM from 'react-dom'
import App from './js/index'
import { AppContainer } from 'react-hot-loader'
import 'font-awesome/css/font-awesome.min.css'
import 'tachyons/css/tachyons.min.css'
import './styles/base.css'

const render = (App) => {
  reactDOM.render(
    <AppContainer>
      <App />
    </AppContainer>,
    document.getElementById('app')
  )
}

render(App)

if(module.hot){
  module.hot.accept('./js/index', () => {
    render(App)
  })
}
