import React from 'react'
import PropTypes from 'prop-types'
import s from '../allrepo-style.css'
import { transformDate } from 'utils'

const ListCommits = ({ commits, loading }) => {
  return (
    <div className={`ph4 h-100 relative ${!loading.first ? s.commitscontainer : ''}`}>
      {
        loading.first
          ? <div className='mv3'>Carregando commits...</div>
          : commits.map(c => {
            return <div className='mv3 flex items-center' key={c.sha}>
              <div className={`dib mr3 flex justify-center items-end ${s.bluecolor}`}>
                <i className='fa fa-circle'></i>
              </div>
              <div className='dib'>
                <h3 className='ma0'>{c.commit.message}</h3>
                <p className='ma0 dib f7 b'>@{c.commit.author.name}</p>
                <span> | </span>
                <p className='ma0 dib f7 b'>{transformDate(c.commit.author.date)}</p>
              </div>
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
