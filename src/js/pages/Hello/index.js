import React, { Component } from 'react'
import { connect } from 'react-redux'
import { add } from './actions'

class Hello extends Component {

  render() {
    const { addText } = this.props
    return (
      <div>
        Hello App! {this.props.text}
        <button onClick={() => addText('Vai')}>Add Vai</button>
      </div>
    )
  }

}

const mapStateToProps = state => {
  const { hellocomp } = state
  return hellocomp
}

const mapDispatchToProps = dispatch => {
  return {
    addText: val => {
      dispatch(add(val))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Hello)
