import PropTypes from 'prop-types'
import React, { Component } from 'react'

class Button extends Component {
  render () {
    // constants
    const {
      id,
      label,
      className,
      href,
      onClick
    } = this.props
    // internal state
    // internal style
    // visual
    return (
      <a id={id} className={className} href={href} onClick={onClick}>{label || 'Button'}</a>
    )
  }
}

Button.propTypes = {
  id: PropTypes.string,
  label: PropTypes.string,
  className: PropTypes.string,
  href: PropTypes.string,
  onClick: PropTypes.func
}

export default Button
