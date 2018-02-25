import React from 'react'
import PropTypes from 'prop-types'

const ListCommits = ({ commits }) => {
  return (
    <div className='ph4'>
      {
        commits.length
          ? commits.map(c => {
            return <div className='mv3' key={c.sha}>
              {c.commit.message} <div>{c.commit.author.name} - {c.commit.author.date}</div>
            </div>
          })
          : <div>Repositório vazio :(</div>
      }
    </div>
  )
}

ListCommits.propTypes = {
  commits: PropTypes.array
}

export default ListCommits
