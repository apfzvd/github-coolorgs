import React from 'react'
import PropTypes from 'prop-types'

const DetailHeader = ({ star, fork, contrib }) => (
  <div className='w-100 bg-black-05'>
    <div className='w-60 flex justify-between black-30 f4 pv4 pl4'>
      <div><i className='fa fa-star'></i> Stars {star}</div>
      <div><i className='fa fa-code-fork'></i> Forks {fork}</div>
      <div><i className='fa fa-users'></i> Contribs {contrib}</div>
    </div>
  </div>
)

const RepoDetail = ({ id, stargazers_count, forks_count }) => {
  return (
    <div className='w-60'>
      {id && <DetailHeader star={stargazers_count} fork={forks_count} contrib={'0'}/> }
    </div>
  )
}

RepoDetail.propTypes = {
  repository: PropTypes.array
}

export default RepoDetail
