/* eslint jsx-quotes: ["error", "prefer-double"] */

import React from 'react'
import Reflux from 'reflux'
import { Link, Redirect } from 'react-router-dom'

class CampaignCardItemRenderer extends Reflux.Component {
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
    return (
      <div className="card" onClick={this.redirect}>
        <div className="card-bg" style={{backgroundImage: 'url(' + process.env.REACT_APP_API_URL + '/' + this.props.data.picture + ')'}} />
        <h3><Link className="card-link" to={'/campaigns/' + this.props.data.id}>{this.props.data.name}</Link></h3>
        <div className="card-date">Dernière mise à jour <strong>{diff} jour(s)</strong></div>
      </div>
    )
  }
}

export default CampaignCardItemRenderer
