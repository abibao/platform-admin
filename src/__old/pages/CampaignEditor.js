/* eslint jsx-quotes: ["error", "prefer-double"] */

import React from 'react'
import Reflux from 'reflux'
import {Redirect} from 'react-router'
import {map} from 'lodash'
import FontAwesome from 'react-fontawesome'
import Debug from 'debug'

import Store from './../Store'
import Actions from './../Actions'

import InfosComponent from './components/InfosComponent'

const debug = Debug('platform-abibao:pages')

class CampaignEditor extends Reflux.Component {
  constructor (props) {
    super(props)
    debug('constructor %s', this.props.location.pathname)
    this.state = {
      tab: 'actions',
      campaign: false
    }
    this.store = Store
    this.handlerSelectActions = () => {
      this.setState({tab: 'actions'})
    }
    this.handlerSelectVariables = () => {
      this.setState({tab: 'variables'})
    }
    this.handlerSelectSettings = () => {
      this.setState({tab: 'settings'})
    }
    this.handleChangeInformation = (prop) => {
      this.state.campaign[prop.key] = prop.val
      this.setState({campaign: this.state.campaign})
    }
  }
  componentDidMount () {
    debug('componentDidMount %s', this.props.location.pathname)
    Actions.checkCookie()
  }
  componentDidUpdate (prevProps, prevState) {
    debug('componentDidUpdate %s', this.props.location.pathname)
    if (this.state.campaign === false) {
      map(this.state.campaigns.dataProvider, (item) => {
        if (item.id === this.props.match.params.campaign) {
          this.setState({campaign: item})
        }
      })
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
      return (<InfosComponent data={this.state.loader} />)
    }
    if (this.state.rememberMe === 'NONE') {
      return (<Redirect to="/" />)
    }
    if (this.state.campaign === false) {
      return (<InfosComponent data={{
        title: 'Travail en cours...',
        message: 'Ce babage est-il enregistré ?'
      }} />)
    }
    // real view
    return (
      <div className="container vertical-full align-items-center">
        <div className="box">
          <div className="flex">
            <input type="text" className="border large" defaultValue={this.state.campaign.name} onChange={(e) => this.handleChangeInformation({key: 'name', val: e.target.value})} />
            <a onClick={(e) => Actions.appUpdateCampaign(this.state.campaign)} style={{marginLeft: '12px'}} className="button green"><span>Sauver</span></a>
          </div>
          <p />
          <ul className="tabs">
            <li onClick={this.handlerSelectActions} className={(this.state.tab === 'actions') ? '_selected' : ''}><FontAwesome style={{margin: 'auto'}} className="text dark-blue" size="2x" name="cog" /><a onClick={this.handlerSelectActions}>Actions</a></li>
            <li onClick={this.handlerSelectVariables} className={(this.state.tab === 'variables') ? '_selected' : ''}><FontAwesome style={{margin: 'auto'}} className="text purple" size="2x" name="columns" /><a onClick={this.handlerSelectVariables}>Variables</a></li>
            <li onClick={this.handlerSelectSettings} className={(this.state.tab === 'settings') ? '_selected' : ''}><FontAwesome style={{margin: 'auto'}} className="text orange" size="2x" name="sliders" /><a onClick={this.handlerSelectSettings}>Paramètres</a></li>
          </ul>
          <p />
          {this.state.tab === 'actions' &&
            <div className="form">
              <h3 className="text dark-blue">Actions</h3>
            </div>
          }
          {this.state.tab === 'variables' &&
          <div className="form">
            <h3 className="text purple">Variables</h3>
          </div>
          }
          {this.state.tab === 'settings' &&
          <div className="form">
            <h3 className="text orange">Paramètres</h3>
            <blockquote className="orange">Métadata d’une campagne, sans elles rien ne va plus au royaume d’Abibao.</blockquote>
            <label>Compagnie (*)</label>
            <input type="text" className="border" defaultValue={this.state.campaign.company} onChange={(e) => this.handleChangeInformation({key: 'company', val: e.target.value})} />
            <label>Reader (*)</label>
            <input type="text" className="border" defaultValue={this.state.campaign.reader} onChange={(e) => this.handleChangeInformation({key: 'reader', val: e.target.value})} />
            <label>Style</label>
            <input placeholder="Style à utiliser en cas de surcharge." type="text" className="border" defaultValue={this.state.campaign.style} onChange={(e) => this.handleChangeInformation({key: 'style', val: e.target.value})} />
            {this.state.campaign.reader === 'abibao' &&
              <div>
                <label>Position (*)</label>
                <input type="text" className="border" defaultValue={this.state.campaign.position} onChange={(e) => this.handleChangeInformation({key: 'position', val: e.target.value})} />
                <label>Ecran terminé</label>
                <textarea placeholder="Texte si le sondage a déjà été complété." rows="8" className="border" defaultValue={this.state.campaign.screen_complete} onChange={(e) => this.handleChangeInformation({key: 'screen_complete', val: e.target.value})} />
              </div>
            }
          </div>
          }
        </div>
      </div>
    )
  }
}

export default CampaignEditor
