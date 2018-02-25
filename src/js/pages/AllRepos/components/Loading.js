import React from 'react'
import s from '../allrepo-style.css'

const Loading = () => (
  <div className='vh-100 w-100 flex justify-center items-center flex-column'>
    <i className={`fa fa-spinner f1 ${s.loading}`}></i>
    <p className={`f4 ${s.bluecolor}`}>Carregando</p>
  </div>
)

export default Loading
