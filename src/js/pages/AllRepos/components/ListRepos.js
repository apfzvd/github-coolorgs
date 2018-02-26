import React from 'react'
import PropTypes from 'prop-types'
import { NavLink  } from 'react-router-dom'
import { Link  } from 'react-router-dom'
import s from '../allrepo-style.css'

const ListRepos = ({ menuOpen, toggleMenu, repos, org, open }) => {
  return (
    <div className={`w-40-ns min-vh-100-ns flex justify-end pr4 tr white ${s.blue}`}>
      <div className='w-80-l'>
        <div className='flex flex-wrap justify-end items-center ma0-ns mt4'>
          <h1 className='mv4-ns ma0'><Link className='link white' to='/choose-cool-org'>{ org }</Link></h1>
          <i onClick={() => toggleMenu()} className='pointer dn-ns ml3 f3 fa fa-caret-square-o-down'></i>
          <span className='db dn-ns mt2 w-100'>{open && `${org}/${open}`}</span>
        </div>
        <ul className={`list ${s.fadeOutsm} ${menuOpen ? s.fadeInsm : ''}`}>
          {
            repos.map( r => {
              return (
                <li key={r.id}>
                  <NavLink onClick={() => toggleMenu()} className={`relative link db mv3 white ${s.closedfolder}`} activeClassName={s.openfolder} to={`/${r.name}`}>
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
