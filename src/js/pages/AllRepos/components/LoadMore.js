import React from 'react'

export default ({ more }) => (
  <div className='ph4 pv4 w-100'>
    <button className='w-100 pv3 pointer bw0 bg-black-05 black-50' onClick={() => more()}>
      <i className='fa fa-plus-circle'></i> Carregar Mais
    </button>
  </div>
)
