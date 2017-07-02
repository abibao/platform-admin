/* eslint jsx-quotes: ["error", "prefer-double"] */

import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom'

import 'normalize.css'
import './styles/global.css'

import { Login, NoMatch, Campaigns, CampaignDetails } from './pages'

const Application = () => (
  <Router>
    <Switch>
      <Route exact path="/" component={Login} />
      <Route exact path="/campaigns" component={Campaigns} />
      <Route exact path="/campaigns/:id" component={CampaignDetails} />
      <Route component={NoMatch} />
    </Switch>
  </Router>
)

export default Application
