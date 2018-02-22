import React from 'react'
import PropTypes from 'prop-types'

const RepoDetail = ({ loading, id, name, stargazers_count }) => {
  return (
    <div>
      {
        loading ? 'Loading...' : <div>{ name } - Starts: { stargazers_count }</div>
      }
    </div>
  )
}

RepoDetail.propTypes = {
  details: PropTypes.array
}

export default RepoDetail
