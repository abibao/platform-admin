/* eslint jsx-quotes: ["error", "prefer-double"] */

import React from 'react'
import Reflux from 'reflux'
import {Redirect} from 'react-router'
import Debug from 'debug'

import Store from './../Store'
import Actions from './../Actions'

import CampaignCardItemRenderer from './itemRenderers/CampaignCardItemRenderer'

const debug = Debug('platform-abibao:pages')

class Campaigns extends Reflux.Component {
  constructor (props) {
    super(props)
    this.store = Store
    debug('constructor %s', this.props.location.pathname)
  }
  componentDidMount () {
    debug('componentDidMount %s', this.props.location.pathname)
    Actions.checkCookie()
  }
  componentDidUpdate (prevProps, prevState) {
    debug('componentDidUpdate %s', this.props.location.pathname)
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
        {this.state.campaigns.dataProvider.length === 0 &&
          <div className="container vertical initialize">
            <h2 className="item text dark-blue">Bienvenue sur l’espace campagnes</h2>
            <h4 className="item">Aucune campagne pour le moment !</h4>
            <p />
            <a onClick={Actions.appCreateCampaign} className="button huge dark-green">Nouvelle campagne</a>
          </div>
        }
        {this.state.campaigns.dataProvider.length > 0 &&
          <div className="container cards">
            {this.state.campaigns.dataProvider.map((item) => {
              return (<CampaignCardItemRenderer key={item.id} data={item} />)
            })}
          </div>
        }
      </div>
    )
  }
}

export default Campaigns
