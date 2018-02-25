import React from 'react'
import PropTypes from 'prop-types'
import ListCommits from './ListCommits'
import DetailHeader from './DetailHeader'
import LoadMore from './LoadMore'
import s from '../allrepo-style.css'

const RepoDetail = ({ commits, id, stargazers_count, forks_count, error, contributors, more, showLoad }) => {
  return (
    <div className='w-60 black-50'>
      { id && <DetailHeader star={stargazers_count} fork={forks_count} contrib={contributors}/> }

      <div className={`${s.contentsize} overflow-y-scroll`}>
        { (!error.status && !id) && <h4 className='tc'>Escolha um repositório!</h4> }
        { error.status && <h4 className='tc'> {error.msg} </h4> }
        { (!error.status && id) && <ListCommits commits={commits} /> }
        { showLoad && <LoadMore more={more} /> }
      </div>
    </div>
  )
}

RepoDetail.propTypes = {
  repository: PropTypes.array
}

export default RepoDetail
