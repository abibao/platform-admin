/* eslint jsx-quotes: ["error", "prefer-double"] */

import React from 'react'

// react-spark
import {Group, Button} from './../../libs/react-spark'

import './styles.css'

const NoMatch = ({ location }) => (
  <Group id="no-match" width="100%" height="100%" horizontalAlign="center" verticalAlign="middle">
    <Group className="content" height="auto" horizontalAlign="center">
      <h2 className="dark-red">Erreur 404</h2>
      <h4>Vous vous êtes égaré dans la dimension noire.</h4>
      <Button href="/" label="Retour sur terre" className="button dark-red" />
    </Group>
  </Group>
)

export default NoMatch
