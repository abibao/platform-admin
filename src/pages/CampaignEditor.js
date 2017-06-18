/* eslint jsx-quotes: ["error", "prefer-double"] */

import React from 'react'
import Reflux from 'reflux'
import {Redirect} from 'react-router'
import Debug from 'debug'

import Store from './../Store'
import Actions from './../Actions'

const debug = Debug('platform-abibao:pages')

class CampaignEditor extends Reflux.Component {
  constructor (props) {
    super(props)
    this.state = {
      campaign: false
    }
    this.store = Store
    debug('constructor %s', this.props.location.pathname)
  }
  componentDidMount () {
    debug('componentDidMount %s', this.props.location.pathname)
    Actions.checkCookie()
  }
  componentDidUpdate (prevProps, prevState) {
    debug('componentDidUpdate %s', this.props.location.pathname)
    if (this.state.campaign === false) {
      Actions.loadCampaign(this.props.match.params.campaign)
    }
  }
  componentWillUnmount () {
    debug('componentWillUnmount %s', this.props.location.pathname)
  }
  render () {
    debug('render %s', this.props.location.pathname)
    if (this.state.generalError !== false) {
      this.setState({
        generalError: false
      })
      return (<Redirect to={'/?error=' + this.state.generalError} />)
    }
    if (this.state.initialized === false) {
      return (
        <div className="container vertical-full justify-content-center align-items-center">
          <div className="container vertical initialize">
            <h2 className="item text dark-blue">{this.state.loader.title}</h2>
            <h4 className="item">{this.state.loader.message}</h4>
          </div>
        </div>
      )
    }
    if (this.state.rememberMe === 'NONE') {
      return (<Redirect to="/" />)
    }
    // real view
    return (
      <div className="container vertical-full align-items-center">
        <div className="box">
          <div className="flex">
            <input type="text" className="no-border" defaultValue={this.state.campaign.name} onChange={this.handlerChangeName} />
            <a onClick={this.handlerCardUpdate} className="button green right flexitem"><span>Sauver</span></a>
          </div>
        </div>
      </div>
    )
  }
}

export default CampaignEditor
