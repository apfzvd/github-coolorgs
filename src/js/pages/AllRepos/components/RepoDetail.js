import React from 'react'
import PropTypes from 'prop-types'

const RepoDetail = ({ loading, id, name }) => {
  return (
    <div>
      {
        loading ? 'Loading...' : <div>{ name }</div>
      }
    </div>
  )
}

RepoDetail.propTypes = {
  details: PropTypes.array
}

export default RepoDetail
