import React from 'react'

const DetailHeader = ({ star, fork, contrib }) => (
  <div className='w-100 bg-black-05'>
    <div className='w-60-l flex justify-between f4-ns f5 pv4 ph4-ns ph2'>
      <div><i className='fa fa-star'></i> Stars {star}</div>
      <div><i className='fa fa-code-fork'></i> Forks {fork}</div>
      <div><i className='fa fa-users'></i> Contribs {contrib}</div>
    </div>
  </div>
)

export default DetailHeader
