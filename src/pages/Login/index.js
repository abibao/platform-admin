/* eslint jsx-quotes: ["error", "prefer-double"] */

import React from 'react'
import Reflux from 'reflux'
import Debug from 'debug'
import {Redirect} from 'react-router'
import queryString from 'query-string'

import Actions from './../../Actions'
import Store from './../../Store'

// react-spark
import {Group, Button} from './../../libs/react-spark'

import './styles.css'

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
    const parsed = queryString.parse(this.props.location.search)
    if (parsed.accessToken) {
      return Actions.saveCookie(parsed.accessToken)
    } else {
      Actions.checkCookie()
    }
  }
  componentWillUnmount () {
    debug('componentWillUnmount')
  }
  render () {
    debug('render')
    if (this.getCurrentState() === 'STATE_CONNECTED') {
      return (<Redirect to="/campaigns" />)
    }
    return (
      <Group id="login" width="100%" height="100%" horizontalAlign="center" verticalAlign="middle">

        <Group includeIn="STATE_ERROR" className="content" height="auto" horizontalAlign="center">
          <h2 className="dark-red">{this.getParams().error}</h2>
          <h4>Quelque chose à mal tourné, ça va faire mal.</h4>
          <Button onClick={Actions.authGoogle} label="Contrôle des papiers" className="button dark-blue" />
        </Group>

        <Group includeIn="STATE_INITIALIZE" loader width="100%" height="100%" horizontalAlign="center" verticalAlign="middle">
          <h2 className="dark-blue">Séquence de démarrage enclenchée.</h2>
        </Group>

        <Group includeIn="STATE_NOT_CONNECTED" className="content" height="auto" horizontalAlign="center">
          <h2 className="dark-blue">Vous êtes un étranger</h2>
          <h4>Nous n’avons trouvé aucune trace de votre passage.</h4>
          <Button onClick={Actions.authGoogle} label="Contrôle des papiers" className="button dark-blue" />
        </Group>

      </Group>
    )
  }
}

export default Login
