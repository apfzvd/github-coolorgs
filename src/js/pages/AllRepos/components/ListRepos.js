import React from 'react'
import PropTypes from 'prop-types'
import { NavLink  } from 'react-router-dom'
import s from '../allrepo-style.css'

const ListRepos = ({ repos, org, open }) => {
  return (
    <div className={`w-40-ns min-vh-100-ns flex justify-end pr4 tr white ${s.blue}`}>
      <div className='w-80-l'>
        <h1 className='mv4'> { org } </h1>
        <ul className={`list ${s.fadeOutsm} ${s.fadeInsm}`}>
          {
            repos.map( r => {
              return (
                <li key={r.id}>
                  <NavLink className={`relative link db mv3 white ${s.closedfolder}`} activeClassName={s.openfolder} to={`/${r.name}`}>
                    { r.name }
                    { open === r.name && <span className={`${s.triangle} ${s.hidet}`}></span> }
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
  repos: PropTypes.array,
  org: PropTypes.string,
  open: PropTypes.string
}

export default ListRepos
