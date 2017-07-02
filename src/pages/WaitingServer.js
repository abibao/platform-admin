/* eslint jsx-quotes: ["error", "prefer-double"] */

import React from 'react'

// react-spark
import { Group } from './../libs/react-spark'

const NoMatch = ({ location }) => (
  <Group className="application" width="100%" height="100%" horizontalAlign="center" verticalAlign="middle">
    <Group className="content small" orientation="vertical" height="auto">
      <img alt="logo abibao" className="logo" src={process.env.REACT_APP_ADMIN_URL + '/images/abibao-logo-gris-jaune.png'} />
      <h2 className="dark-blue">Veuillez patienter</h2>
      <h4>Un moment nous recherchons votre correspondant.</h4>
      <p>&nbsp;</p>
      <div className="loader" />
    </Group>
  </Group>
)

export default NoMatch
