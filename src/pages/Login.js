/* eslint jsx-quotes: ["error", "prefer-double"] */

import React from 'react'
import Reflux from 'reflux'
import Debug from 'debug'
import { Redirect } from 'react-router'
import queryString from 'query-string'

import Actions from './../Actions'
import Store from './../Store'

// react-spark
import {Group, Button} from './../libs/react-spark'

const debug = Debug('platform-abibao:pages:login')

class Login extends Reflux.Component {
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
      if (this.getParams().error) {
        return 'STATE_ERROR'
      }
      if (this.state.generalError !== false) {
        return 'STATE_GENERAL_ERROR'
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
    const parsed = queryString.parse(this.props.location.search)
    if (parsed.accessToken) {
      return Actions.saveCookie(parsed.accessToken)
    } else {
      Actions.checkCookie()
    }
  }
  componentWillUnmount () {
    debug('componentWillUnmount %o')
  }
  render () {
    debug('render', this.getCurrentState())
    if (this.getCurrentState() === 'STATE_NULL') {
      return (null)
    }
    if (this.getCurrentState() === 'STATE_GENERAL_ERROR') {
      return (<Redirect to={'/?error=' + this.state.generalError} />)
    }
    if (this.getCurrentState() === 'STATE_CONNECTED') {
      return (<Redirect to="/campaigns" />)
    }
    return (
      <Group className="application" width="100%" height="100%" orientation="vertical" horizontalAlign="center" verticalAlign="middle">

        <Group includeIn="STATE_ERROR" width="100%" className="content small" orientation="vertical">
          <img alt="logo abibao" className="logo" src={process.env.REACT_APP_ADMIN_URL + '/images/abibao-logo-gris-jaune.png'} />
          <h2 className="dark-red">{this.getParams().error}</h2>
          <h4>Quelque chose à mal tourné, ça va faire mal.</h4>
          <p>&nbsp;</p>
          <Button onClick={Actions.authGoogle} label="Contrôle des papiers" className="button large full dark-blue" />
        </Group>

        <Group includeIn="STATE_INITIALIZE" width="100%" className="content small" orientation="vertical">
          <img alt="logo abibao" className="logo" src={process.env.REACT_APP_ADMIN_URL + '/images/abibao-logo-gris-jaune.png'} />
          <h2 className="dark-blue">Veuillez patienter</h2>
          <h4>Séquence de démarrage enclenchée.</h4>
        </Group>

        <Group includeIn="STATE_NOT_CONNECTED" width="100%" className="content small" orientation="vertical">
          <img alt="logo abibao" className="logo" src={process.env.REACT_APP_ADMIN_URL + '/images/abibao-logo-gris-jaune.png'} />
          <h2 className="dark-blue">Vous êtes un étranger</h2>
          <h4>Nous n’avons trouvé aucune trace de votre passage.</h4>
          <p>&nbsp;</p>
          <Button onClick={Actions.authGoogle} label="Contrôle des papiers" className="button large full dark-blue" />
        </Group>

      </Group>
    )
  }
}

export default Login
