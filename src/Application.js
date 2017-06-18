/* eslint jsx-quotes: ["error", "prefer-double"] */

import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom'

import 'normalize.css'
import './styles/global.css'

import Login from './pages/Login'
import Campaigns from './pages/Campaigns'
import CampaignEditor from './pages/CampaignEditor'
import NoMatch from './pages/NoMatch'

const Application = () => (
  <Router>
    <Switch>
      <Route exact path="/" component={Login} />
      <Route exact path="/campaigns" component={Campaigns} />
      <Route exact path="/campaigns/:campaign" component={CampaignEditor} />
      <Route component={NoMatch} />
    </Switch>
  </Router>
)

export default Application
