/* eslint jsx-quotes: ["error", "prefer-double"] */

import React from 'react'
import Reflux from 'reflux'
import Debug from 'debug'
import {Redirect} from 'react-router'
import queryString from 'query-string'

import Actions from './../../Actions'
import Store from './../../Store'

// react-spark
import {Group} from './../../libs/react-spark'

import './styles.css'

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
  }
  render () {
    debug('render', this.getCurrentState())
    if (this.state.generalError !== false) {
      this.setState({
        generalError: false
      })
      return (<Redirect to={'/?error=' + this.state.generalError} />)
    }
    if (this.getCurrentState() === 'STATE_NOT_CONNECTED') {
      return (<Redirect to="/" />)
    }
    return (
      <Group id="campaigns" width="100%" height="100%" horizontalAlign="center" verticalAlign="top">

        <Group includeIn="STATE_INITIALIZE" loader width="100%" height="100%" horizontalAlign="center" verticalAlign="middle">
          <img alt="logo abibao" className="logo" src={process.env.REACT_APP_ADMIN_URL + '/images/abibao-logo-gris-jaune.png'} />
          <h2 className="dark-blue">Veuillez patienter</h2>
          <h4>Séquence de démarrage enclenchée.</h4>
        </Group>

        <Group includeIn="STATE_CONNECTED" className="content" height="auto">
          <img alt="logo abibao" className="logo" src={process.env.REACT_APP_ADMIN_URL + '/images/abibao-logo-gris-jaune.png'} />
          <h2 className="dark-blue">Bienvenue sur l’espace campagnes</h2>
          <h4>bla bla</h4>
        </Group>

      </Group>
    )
  }
}

export default Campaigns
