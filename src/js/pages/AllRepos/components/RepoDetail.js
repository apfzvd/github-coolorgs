import React from 'react'
import PropTypes from 'prop-types'
import ListCommits from './ListCommits'

const DetailHeader = ({ star, fork, contrib }) => (
  <div className='w-100 bg-black-05'>
    <div className='w-60 flex justify-between f4 pv4 pl4'>
      <div><i className='fa fa-star'></i> Stars {star}</div>
      <div><i className='fa fa-code-fork'></i> Forks {fork}</div>
      <div><i className='fa fa-users'></i> Contribs {contrib}</div>
    </div>
  </div>
)

const RepoDetail = ({ commits, id, stargazers_count, forks_count }) => {
  return (
    <div className='w-60 black-50'>
      { !id && <h4 className='tc'>Escolha um repositório!</h4> }
      { id && <DetailHeader star={stargazers_count} fork={forks_count} contrib={'0'}/> }
      { id && <ListCommits commits={commits} /> }
    </div>
  )
}

RepoDetail.propTypes = {
  repository: PropTypes.array
}

export default RepoDetail
