/* eslint jsx-quotes: ["error", "prefer-double"] */

import React from 'react'
import {render} from 'react-dom'
import Debug from 'debug'
import Client from './libs/Client'

import Application from './Application'
import {WaitingServer} from './pages'

import Actions from './Actions'

const debug = Debug('platform-abibao:socket-io')

window.localStorage.debug = 'platform-abibao:*'

Client((app) => {
  app.io.on('connect', () => {
    debug('socket connected: %o', app.io)
    render(Application(), document.getElementById('root'))
  })
  app.io.on('disconnect', () => {
    debug('socket disconnect')
    render(<WaitingServer />, document.getElementById('root'))
  })
  app.service('api/campaigns').on('created', (campaign) => {
    Actions.appUpdateCampaigns(campaign)
  })
  app.service('api/campaigns').on('patched', (campaign) => {
    Actions.appUpdateCampaigns(campaign)
  })
  window.feathers = app
})

render(<WaitingServer />, document.getElementById('root'))
