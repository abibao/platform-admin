/* eslint jsx-quotes: ["error", "prefer-double"] */

import React from 'react'
import Reflux from 'reflux'
import {Redirect} from 'react-router'
import queryString from 'query-string'
import Debug from 'debug'

import Store from './../Store'
import Actions from './../Actions'

const debug = Debug('platform-abibao:pages')

class Login extends Reflux.Component {
  constructor (props) {
    super(props)
    this.store = Store
    debug('constructor %s', this.props.location.pathname)
  }
  componentDidMount () {
    debug('componentDidMount %s', this.props.location.pathname)
    const parsed = queryString.parse(this.props.location.search)
    if (parsed.accessToken) {
      return Actions.saveCookie(parsed.accessToken)
    } else {
      Actions.checkCookie()
    }
  }
  componentDidUpdate (prevProps, prevState) {
    debug('componentDidUpdate %s', this.props.location.pathname)
  }
  componentWillUnmount () {
    debug('componentWillUnmount %s', this.props.location.pathname)
  }
  render () {
    debug('render %s', this.props.location.pathname)
    const parsed = queryString.parse(this.props.location.search)
    if (parsed.error) {
      return (
        <div className="container vertical-full justify-content-center align-items-center">
          <div className="container vertical error-404">
            <h2 className="item text dark-red">ERROR XXX</h2>
            <h4 className="item">Il se trouve que quelque chose à mal tourné.</h4>
            <p />
            <a onClick={Actions.authGoogle} className="button huge dark-green">Google authentification</a>
          </div>
        </div>
      )
    }
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
      return (
        <div className="container vertical-full justify-content-center align-items-center">
          <div className="container vertical initialize">
            <h2 className="item text dark-blue">Etranger</h2>
            <h4 className="item">Nous n’avons trouvé aucune trace de votre passage</h4>
            <p />
            <a onClick={Actions.authGoogle} className="button huge dark-green">Google authentification</a>
          </div>
        </div>
      )
    }
    return (<Redirect to="/campaigns" />)
  }
}

export default Login
