import PropTypes from 'prop-types'
import React, { Component } from 'react'
import {isNil} from 'lodash'

class Group extends Component {
  constructor (props) {
    super(props)
    // constants
    const {
      includeIn,
      width,
      height,
      horizontalAlign,
      verticalAlign,
      orientation,
      creationComplete
    } = this.props
    // internal state
    this.state = {
      style: {},
      hasChildren: !isNil(this.props.children),
      hasIncludeIn: !isNil(includeIn),
      hasCreationComplete: !isNil(creationComplete),
      hasOrientation: !isNil(orientation),
      hasHorizontalAlign: !isNil(horizontalAlign),
      hasVerticalAlign: !isNil(verticalAlign)
    }
    // internal style
    let style = {
      width,
      height,
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'baseline',
      alignContent: 'stretch'
    }
    // orientation vertical
    if (this.state.hasOrientation && orientation === 'vertical') {
      style.flexDirection = 'column'
    }
    // horizontal - vertical
    let alignments = (this.state.hasHorizontalAlign) ? horizontalAlign : 'none'
    alignments += '-'
    alignments += (this.state.hasVerticalAlign) ? verticalAlign : 'none'
    if (!this.state.hasOrientation || orientation === 'vertical') {
      switch (alignments) {
        case 'left-top':
        case 'left-none':
          style.alignItems = 'flex-start'
          break
        case 'center-top':
        case 'center-none':
          style.alignItems = 'center'
          break
        case 'right-top':
        case 'right-none':
          style.alignItems = 'flex-end'
          break
        case 'right-middle':
          style.alignItems = 'flex-end'
          style.justifyContent = 'center'
          break
        case 'right-bottom':
          style.alignItems = 'flex-end'
          style.justifyContent = 'flex-end'
          break
        case 'center-bottom':
          style.alignItems = 'center'
          style.justifyContent = 'flex-end'
          break
        case 'left-bottom':
          style.alignItems = 'flex-start'
          style.justifyContent = 'flex-end'
          break
        case 'left-middle':
          style.alignItems = 'flex-start'
          style.justifyContent = 'center'
          break
        case 'center-middle':
          style.alignItems = 'center'
          style.justifyContent = 'center'
          break
        default:
      }
    }
    if (!this.state.hasOrientation || orientation === 'horizontal') {
      switch (alignments) {
        case 'left-top':
        case 'left-none':
          style.justifyContent = 'flex-start'
          break
        case 'center-top':
        case 'center-none':
          style.justifyContent = 'center'
          break
        case 'right-top':
        case 'right-none':
          style.justifyContent = 'flex-end'
          break
        case 'right-middle':
          style.alignItems = 'center'
          style.justifyContent = 'flex-end'
          break
        case 'right-bottom':
          style.alignItems = 'flex-end'
          style.justifyContent = 'flex-end'
          break
        case 'center-bottom':
          style.alignItems = 'flex-end'
          style.justifyContent = 'center'
          break
        case 'left-bottom':
          style.alignItems = 'flex-end'
          style.justifyContent = 'flex-start'
          break
        case 'left-middle':
          style.alignItems = 'center'
          style.justifyContent = 'flex-start'
          break
        case 'center-middle':
          style.alignItems = 'center'
          style.justifyContent = 'center'
          break
        default:
      }
    }
    this.state.style = style
  }
  componentDidMount () {
    // creationComplete
    if (this.state.hasCreationComplete) {
      this.props.creationComplete()
    }
  }
  render () {
    // constants
    const { id, className, children, includeIn } = this.props
    const { style, hasChildren, hasIncludeIn } = this.state
    // not in the currentState
    const parent = this._reactInternalInstance._currentElement._owner._instance
    if (hasIncludeIn && parent.getCurrentState() !== includeIn) {
      return (null)
    }
    // visual
    return (
      <div id={id} className={className} style={style}>
        {hasChildren && children}
      </div>
    )
  }
}

Group.propTypes = {
  id: PropTypes.string,
  includeIn: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
  className: PropTypes.string,
  orientation: PropTypes.oneOf(['horizontal', 'vertical']),
  horizontalAlign: PropTypes.oneOf(['left', 'right', 'center']),
  verticalAlign: PropTypes.oneOf(['top', 'bottom', 'middle']),
  applicationComplete: PropTypes.func
}

export default Group
