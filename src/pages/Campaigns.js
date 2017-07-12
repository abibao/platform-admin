/* eslint jsx-quotes: ["error", "prefer-double"] */

import React from 'react'
import Reflux from 'reflux'
import Debug from 'debug'
import { Redirect } from 'react-router'
import queryString from 'query-string'

import Actions from './../Actions'
import Store from './../Store'

// react-spark
import { Button, Group, DataGroup } from './../libs/react-spark'
import CampaignCardListRenderer from './renderers/CampaignCardListRenderer'

const debug = Debug('platform-abibao:pages:campaigns')

class Campaigns extends Reflux.Component {
  constructor (props) {
    debug('constructor')
    super(props)
    this.store = Store
    this.getParams = () => {
      return queryString.parse(this.props.location.search)
    }
    // calculate currentState
    this.getCurrentState = () => {
      if (!this.state) {
        return 'STATE_NULL'
      }
      if (this.state.generalError !== false) {
        return 'STATE_ERROR'
      }
      if (this.getParams().error) {
        return 'STATE_ERROR'
      }
      if (this.state.initialized === false) {
        return 'STATE_INITIALIZE'
      }
      if (this.state.rememberMe === 'NONE') {
        return 'STATE_NOT_CONNECTED'
      }
      return 'STATE_CONNECTED'
    }
  }
  componentDidMount () {
    debug('componentDidMount')
    Actions.checkCookie()
  }
  componentWillUnmount () {
    debug('componentWillUnmount')
    Reflux.Component.prototype.componentWillUnmount.call(this)
  }
  render () {
    debug('render', this.getCurrentState())
    if (this.getCurrentState() === 'STATE_NULL') {
      return (null)
    }
    if (this.getCurrentState() === 'STATE_ERROR') {
      this.setState({
        generalError: false
      })
      return (<Redirect to={'/?error=' + this.state.generalError} />)
    }
    if (this.getCurrentState() === 'STATE_NOT_CONNECTED') {
      return (<Redirect to="/" />)
    }
    return (
      <Group className="application" width="100%" height="100%" orientation="vertical" horizontalAlign="center" verticalAlign="middle">

        <Group includeIn="STATE_INITIALIZE" className="content small" orientation="vertical">
          <img alt="logo abibao" className="logo" src={process.env.REACT_APP_ADMIN_URL + '/images/abibao-logo-gris-jaune.png'} />
          <h2 className="dark-blue">{this.state.loader.title}</h2>
          <h4>{this.state.loader.message}</h4>
        </Group>

        <Group includeIn="STATE_CONNECTED" width="100%" height="100%" orientation="vertical" horizontalAlign="center" verticalAlign="top">
          <Group className="content fixed no-border" width="100%" orientation="vertical">
            <img alt="logo abibao" className="logo" src={process.env.REACT_APP_ADMIN_URL + '/images/abibao-logo-gris-jaune.png'} />
            <h2 className="title dark-blue">Bienvenue sur l’espace campagnes</h2>
            <Button className="button icon circle orange right" icon="plus" onClick={Actions.appCreateCampaign} />
          </Group>
          <DataGroup className="content margin no-border tile" width="100%" height="auto" orientation="horizontal" verticalAlign="top" dataProvider={this.state.campaigns.dataProvider} itemRenderer={CampaignCardListRenderer} />
        </Group>

      </Group>
    )
  }
}

export default Campaigns
