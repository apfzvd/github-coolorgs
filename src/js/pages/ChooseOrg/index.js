import React, { Component } from 'react'
import { connect } from 'react-redux'
import { changeOrg } from './redux/chooseorg'
import { Link } from 'react-router-dom'
import s from './choose-style.css'

class ChooseOrg extends Component {

  render() {
    const { dpChangeOrg, org } = this.props

    return (
      <div className={`${s.blue} tc white center flex flex-column vh-100 justify-center items-center`}>
        <h1 className='f3 f2-ns'>Olá! Escolha uma Organização do Github:</h1>
        <input placeholder={org} onInput={e => dpChangeOrg(e.target.value)} className='w-50-ns w-80 br2 bw0 h2 mb4 tc black-50' type="text"/>
        <Link to='/'>
          <button className={`${s.yellow} bw0 pv2 ph4 br1 pointer b black-50`}>Ver repositórios</button>
        </Link>
      </div>
    )
  }

}

const mapStateToProps = ({ chooseorg }) => chooseorg

const mapDispatchToProps = dispatch => {
  return {
    dpChangeOrg: org => dispatch(changeOrg(org))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChooseOrg)
