/* eslint jsx-quotes: ["error", "prefer-double"] */

import React from 'react'
import Reflux from 'reflux'

class CampaignPageListRenderer extends Reflux.Component {
  constructor (props) {
    super(props)
    this.state = {
    }
  }
  render () {
    return (
      <h4>{this.props.data.name}</h4>
    )
  }
}

export default CampaignPageListRenderer
