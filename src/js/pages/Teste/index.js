import React, { Component } from 'react'

class Teste extends Component {

  render() {
    const { params } = this.props.match
    return (
      <section>Hello {params.repo}</section>
    )
  }

}

export default Teste
