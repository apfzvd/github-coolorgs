import React from 'react'

const DetailHeader = ({ star, fork, contrib }) => (
  <div className='w-100 bg-black-05'>
    <div className='w-60 flex justify-between f4 pv4 ph4'>
      <div><i className='fa fa-star'></i> Stars {star}</div>
      <div><i className='fa fa-code-fork'></i> Forks {fork}</div>
      <div><i className='fa fa-users'></i> Contribs {contrib}</div>
    </div>
  </div>
)

export default DetailHeader
