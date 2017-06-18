import Reflux from 'reflux'
import Debug from 'debug'

import Actions from './Actions'
import Handlers from './Handlers'

const debug = Debug('platform-abibao:store')

class Store extends Reflux.Store {
  constructor () {
    super()
    this.state = {
      generalError: false,
      rememberMe: false,
      user: false,
      initialized: false,
      loader: {
        title: 'Intialisation en cours...',
        message: 'Ouverture des caisses d’approvisionnement.'
      },
      campaigns: {
        dataProvider: false
      }
    }
    debug('constructor login store')
    this.listenables = [Actions]
    this.handlers = new Handlers()
  }
  onCheckCookie () { this.handlers.onCheckCookie(this) }
  onSaveCookie (token) { this.handlers.onSaveCookie(token, this) }
  onAuthGoogle () { this.handlers.onAuthGoogle(this) }
  onAppInitialize () { this.handlers.onAppInitialize(this) }
  onAppCreateCampaign () { this.handlers.onAppCreateCampaign(this) }
  onAppUpdateCampaigns (campaign) { this.handlers.onAppUpdateCampaigns(campaign, this) }
}

export default Store
