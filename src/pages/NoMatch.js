/* eslint jsx-quotes: ["error", "prefer-double"] */

import React from 'react'

const NoMatch = ({ location }) => (
  <div className="container vertical-full justify-content-center align-items-center">
    <div className="container vertical error-404">
      <h2 className="item text dark-red">ERROR 404</h2>
      <h4 className="item">Vous vous êtes égaré dans la dimension noire.</h4>
    </div>
  </div>
)

export default NoMatch
