import React from 'react'
import PropTypes from 'prop-types'
import { NavLink  } from 'react-router-dom'
import s from '../allrepo-style.css'

const ListRepos = ({ repos, org }) => {
  return (
    <div className={`w-40 min-vh-100 flex justify-right tr white ${s.blue}`}>
      <div className='w-80'>
        <h1> { org } </h1>
        <ul className='list'>
          {
            repos.map( r => {
              return (
                <li key={r.id}>
                  <NavLink className={`link db mv3 white ${s.closedfolder}`} activeClassName={s.openfolder} to={`/${r.name}`}>
                    { r.name }
                  </NavLink >
                </li>
              )
            })
          }
        </ul>
      </div>
    </div>
  )
}

ListRepos.propTypes = {
  repos: PropTypes.array
}

export default ListRepos
