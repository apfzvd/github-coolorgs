import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

const ListRepos = ({ repos }) => {
  return (
    <ul>
      {
        repos.map(r => {
          return <li key={r.id}><Link to={`/${r.name}`}>{ r.name }</Link></li>
        })
      }
    </ul>
  )
}

ListRepos.propTypes = {
  repos: PropTypes.array
}

export default ListRepos
