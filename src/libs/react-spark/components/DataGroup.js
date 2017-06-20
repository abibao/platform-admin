import PropTypes from 'prop-types'
import React, { Component } from 'react'
import {isNil} from 'lodash'

class DataGroup extends Component {
  componentDidMount () {
    if (this.state.hasCreationComplete) {
      this.props.creationComplete()
    }
  }
  render () {
    // constants
    const {
      id,
      dataProvider,
      itemRenderer,
      includeIn,
      width,
      height,
      className,
      horizontalAlign,
      verticalAlign,
      creationComplete
    } = this.props
    // internal state
    this.state = {
      hasIncludeIn: !isNil(includeIn),
      hasCreationComplete: !isNil(creationComplete),
      hasHorizontalAlign: !isNil(horizontalAlign),
      hasVerticalAlign: !isNil(verticalAlign)
    }
    // includeIn
    const parent = this._reactInternalInstance._currentElement._owner._instance
    if (this.state.hasIncludeIn && parent.getCurrentState() !== includeIn) {
      return (null)
    }
    // internal style
    const Align = {
      center: 'center',
      right: 'flex-end',
      left: 'flex-start',
      middle: 'center',
      bottom: 'flex-end',
      top: 'flex-start'
    }
    const VAlign = {
      middle: 'space-around',
      bottom: 'flex-end',
      top: 'flex-start'
    }
    let style = {
      width,
      height
    }
    if (this.state.hasHorizontalAlign && !this.state.hasVerticalAlign) {
      style.display = 'flex'
      style.flexDirection = 'column'
      style.flexWrap = 'wrap'
      style.alignItems = Align[this.props.horizontalAlign]
    }
    if (this.state.hasVerticalAlign && !this.state.hasHorizontalAlign) {
      style.display = 'flex'
      style.flexDirection = 'row'
      style.flexWrap = 'wrap'
      style.alignItems = Align[this.props.verticalAlign]
    }
    if (this.state.hasHorizontalAlign && this.state.hasVerticalAlign) {
      style.display = 'flex'
      style.flexDirection = 'column'
      style.flexWrap = 'wrap'
      style.alignItems = Align[this.props.horizontalAlign]
      style.justifyContent = VAlign[this.props.verticalAlign]
    }
    // visual
    return (
      <div id={id} className={className} style={style}>
        
      </div>
    )
  }
}

DataGroup.propTypes = {
  id: PropTypes.string,
  dataProvider: PropTypes.array.isRequired,
  itemRenderer: PropTypes.element.isRequired,
  includeIn: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
  className: PropTypes.string,
  horizontalAlign: PropTypes.oneOf(['left', 'right', 'center']),
  verticalAlign: PropTypes.oneOf(['top', 'bottom', 'middle']),
  applicationComplete: PropTypes.func
}

export default DataGroup
