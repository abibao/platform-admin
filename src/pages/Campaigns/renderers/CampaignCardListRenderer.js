/* eslint jsx-quotes: ["error", "prefer-double"] */

import React from 'react'
import Reflux from 'reflux'
import { Link, Redirect } from 'react-router-dom'

// react-spark
import { Group } from './../../../libs/react-spark'

class CampaignCardListRenderer extends Reflux.Component {
  constructor (props) {
    super(props)
    this.state = {
      redirect: false
    }
    this.redirect = () => {
      let path = '/campaigns/' + this.props.data.id
      this.setState({redirect: path})
    }
  }
  render () {
    if (this.state.redirect !== false) {
      return (<Redirect to={this.state.redirect} />)
    }
    const diff = Math.floor((Date.now() - Date.parse(this.props.data.updatedAt)) / 86400000)
    const picture = 'url(\'' + process.env.REACT_APP_API_URL + '/' + this.props.data.picture + '\')'
    return (
      <Group className="card" orientation="vertical" horizontalAlign="left" verticalAlign="bottom" onClick={this.redirect}>
        <div className="picture" style={{backgroundImage: picture}} />
        <h3><Link to={'/campaigns/' + this.props.data.id}>{this.props.data.name}</Link></h3>
        <div>Dernière mise à jour <strong>{diff} jour(s)</strong></div>
      </Group>
    )
  }
}

export default CampaignCardListRenderer
