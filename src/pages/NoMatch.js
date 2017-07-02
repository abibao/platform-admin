/* eslint jsx-quotes: ["error", "prefer-double"] */

import React from 'react'

// react-spark
import { Group, Button } from './../libs/react-spark'

const NoMatch = ({ location }) => (
  <Group className="application" width="100%" height="100%" horizontalAlign="center" verticalAlign="middle">
    <Group className="content small" orientation="vertical" height="auto">
      <img alt="logo abibao" className="logo" src={process.env.REACT_APP_ADMIN_URL + '/images/abibao-logo-gris-jaune.png'} />
      <h2 className="dark-red">Erreur 404</h2>
      <h4>Vous vous êtes égaré dans la dimension noire.</h4>
      <p>&nbsp;</p>
      <Button href="/" label="Retour sur terre" className="button large full dark-red" />
    </Group>
  </Group>
)

export default NoMatch
