/* eslint jsx-quotes: ["error", "prefer-double"] */

import React from 'react'
import Reflux from 'reflux'
import Dropzone from 'react-dropzone'
import Debug from 'debug'
import { Redirect } from 'react-router'
import queryString from 'query-string'

import Actions from './../Actions'
import Store from './../Store'

// react-spark
import { Group, DataGroup, Button } from './../libs/react-spark'
import CampaignPageListRenderer from './renderers/CampaignPageListRenderer'

const debug = Debug('platform-abibao:pages:campaign_details')

class CampaignDetails extends Reflux.Component {
  constructor (props) {
    debug('constructor')
    super(props)
    this.store = Store
    this.state = {
      tab: 'actions',
      campaign: false
    }
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
    this.handleChangeInformation = (prop) => {
      this.state.campaign[prop.key] = prop.val
      this.setState({campaign: this.state.campaign})
    }
    this.handleOpenDropzone = () => {
      this.refs.dropzone.open()
    }
    this.handleChangePicture = (files) => {
      Actions.appUpdateCampaign(this.state.campaign, files[0])
    }
    this.returnCampaigns = () => {
      window.location = '/campaigns'
    }
  }
  componentDidMount () {
    debug('componentDidMount')
    Actions.checkCookie()
  }
  componentDidUpdate (prevProps, prevState) {
    if (this.state.rememberMe !== false && this.state.campaign === false) {
      debug('componentDidUpdate load campaign', this.props.match.params.id)
      this.setState({
        campaign: true
      })
      Actions.appLoadCampaign(this.props.match.params.id)
    }
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
    const cssIcon = 'button icon square flatten inverted light-blue'
    const cssIconSelected = 'button icon square flatten inverted dark-blue'
    return (
      <Group className="application" width="100%" height="100%" orientation="vertical" horizontalAlign="center" verticalAlign="middle">

        <Group includeIn="STATE_INITIALIZE" getCurrentState={this.getCurrentState} className="content small" orientation="vertical">
          <img alt="logo abibao" className="logo" src={process.env.REACT_APP_ADMIN_URL + '/images/abibao-logo-gris-jaune.png'} />
          <h2 className="dark-blue">{this.state.loader.title}</h2>
          <h4>{this.state.loader.message}</h4>
        </Group>

        <Group includeIn="STATE_CONNECTED" getCurrentState={this.getCurrentState} width="100%" height="100%" orientation="vertical" horizontalAlign="center" verticalAlign="top">
          <Group className="content fixed no-border" width="100%" orientation="vertical">
            <img alt="logo abibao" className="logo" src={process.env.REACT_APP_ADMIN_URL + '/images/abibao-logo-gris-jaune.png'} />
            <h2 className="dark-blue">Edition d’une campagne</h2>
            <Button className="button icon circle dark-blue right" icon="arrow-left" onClick={this.returnCampaigns} />
          </Group>
          <div className="content margin">
            <Dropzone style={{display: 'none'}} ref="dropzone" multiple={false} onDrop={this.handleChangePicture} />
            <Group width="100%" orientation="horizontal" verticalAlign="top">
              <Button onClick={(e) => this.setState({tab: 'actions'})} className={(this.state.tab === 'actions') ? cssIconSelected : cssIcon} icon="cog" />
              <Button onClick={(e) => this.setState({tab: 'variables'})} className={(this.state.tab === 'variables') ? cssIconSelected : cssIcon} icon="columns" />
              <Button onClick={(e) => this.setState({tab: 'settings'})} className={(this.state.tab === 'settings') ? cssIconSelected : cssIcon} icon="sliders" />
            </Group>
            <p>&nbsp;</p>
            {this.state.tab === 'actions' &&
              <Group width="100%" orientation="vertical" verticalAlign="top">
                <h2 className="text dark-blue">Actions</h2>
                <p>&nbsp;</p>
                {this.state.campaign.data &&
                  <DataGroup width="100%" dataProvider={this.state.campaign.data.pages} itemRenderer={CampaignPageListRenderer} />
                }
              </Group>
            }
            {this.state.tab === 'variables' &&
              <Group width="100%" orientation="vertical" verticalAlign="top">
                <h2 className="text dark-blue">Variables</h2>
                <p>&nbsp;</p>
              </Group>
            }
            {this.state.tab === 'settings' &&
              <Group width="100%" orientation="vertical" verticalAlign="top">
                <h2 className="text dark-blue">Paramètres</h2>
                <p>&nbsp;</p>
                <div className="form-field">
                  <label>Nom (*)</label>
                  <input type="text" className="border" placeholder="Même une campagne doit avoir un nom." defaultValue={this.state.campaign.name} onChange={(e) => this.handleChangeInformation({key: 'name', val: e.target.value})} />
                </div>
                <div className="form-field">
                  <label>Companie (*)</label>
                  <input type="text" className="border" placeholder="Une campagne n'est rien sans attache." defaultValue={this.state.campaign.company} onChange={(e) => this.handleChangeInformation({key: 'company', val: e.target.value})} />
                </div>
                <div className="form-field">
                  <label>Description</label>
                  <textarea rows="4" className="border" placeholder="Une bonne description est parfois nécessaire." defaultValue={this.state.campaign.description} onChange={(e) => this.handleChangeInformation({key: 'description', val: e.target.value})} />
                </div>
                <div className="form-field">
                  <a onClick={this.handleOpenDropzone} href="#!"><img alt={this.state.campaign.name} height="140" src={process.env.REACT_APP_API_URL + '/' + this.state.campaign.picture} /></a>
                </div>
                <Group width="100%" horizontalAlign="right">
                  <Button className="button large orange" label="Sauver" onClick={(e) => Actions.appUpdateCampaign(this.state.campaign, null)} />
                </Group>
              </Group>
            }
          </div>
        </Group>

      </Group>
    )
  }
}

export default CampaignDetails
