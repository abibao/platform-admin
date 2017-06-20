/* eslint jsx-quotes: ["error", "prefer-double"] */

import React from 'react'

// react-spark
import {Group} from './../../libs/react-spark'

import './styles.css'

const NoMatch = ({ location }) => (
  <Group id="waiting-server" width="100%" height="100%" horizontalAlign="center" verticalAlign="middle">
    <Group className="content" height="auto" horizontalAlign="center">
      <img alt="logo abibao" className="logo" src={process.env.REACT_APP_ADMIN_URL + '/images/abibao-logo-gris-jaune.png'} />
      <h2 className="dark-blue">Veuillez patienter</h2>
      <h4>Un moment nous recherchons votre correspondant.</h4>
      <div className="loader" />
    </Group>
  </Group>
)

export default NoMatch
