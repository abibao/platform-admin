/* eslint jsx-quotes: ["error", "prefer-double"] */

import React from 'react'
import Reflux from 'reflux'

class InfosComponent extends Reflux.Component {
  render () {
    return (
      <div className="container vertical-full justify-content-center align-items-center">
        <div className="container vertical initialize">
          <h2 className="item text dark-blue">{this.props.data.title}</h2>
          <h4 className="item">{this.props.data.message}</h4>
        </div>
      </div>
    )
  }
}

export default InfosComponent
