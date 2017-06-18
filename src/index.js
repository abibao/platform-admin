import {render} from 'react-dom'
import Debug from 'debug'

import Application from './Application'
import Actions from './Actions'
import Client from './libs/Client'

const debug = Debug('platform-abibao:socket-io')

window.localStorage.debug = 'platform-abibao:*'

Client((app) => {
  app.io.on('connect', () => {
    debug('socket connected: %o', app.io)
  })
  app.io.on('disconnect', () => {
    debug('socket disconnect')
  })
  app.service('api/campaigns').on('created', (campaign) => {
    Actions.appUpdateCampaigns(campaign)
  })
  app.service('api/campaigns').on('patched', (campaign) => {
    Actions.appUpdateCampaigns(campaign)
  })
  window.feathers = app
})

render(Application(), document.getElementById('root'))
