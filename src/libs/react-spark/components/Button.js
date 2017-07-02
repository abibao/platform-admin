/* eslint jsx-quotes: ["error", "prefer-double"] */

import PropTypes from 'prop-types'
import React, { Component } from 'react'
import FontAwesome from 'react-fontawesome'

class Button extends Component {
  render () {
    // constants
    const {
      id,
      label,
      icon,
      className,
      href,
      onClick
    } = this.props
    // internal state
    // internal style
    // visual
    if (icon) {
      return (
        <a id={id} className={className} href={href} onClick={onClick}><FontAwesome style={{margin: 'auto'}} name={icon} /></a>
      )
    }
    return (
      <a id={id} className={className} href={href} onClick={onClick}>{label || ''}</a>
    )
  }
}

Button.propTypes = {
  id: PropTypes.string,
  label: PropTypes.string,
  icon: PropTypes.string,
  className: PropTypes.string,
  href: PropTypes.string,
  onClick: PropTypes.func
}

export default Button
