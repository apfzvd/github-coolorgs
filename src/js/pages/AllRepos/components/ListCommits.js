import React from 'react'
import PropTypes from 'prop-types'

const ListCommits = ({ commits, loading }) => {
  return (
    <div className='ph4'>
      {
        loading.first
          ? <div className='mv3'>Carregando commits...</div>
          : commits.map(c => {
            return <div className='mv3' key={c.sha}>
              {c.commit.message} <div>{c.commit.author.name} - {c.commit.author.date}</div>
            </div>
          })
      }
    </div>
  )
}

ListCommits.propTypes = {
  commits: PropTypes.array
}

export default ListCommits
