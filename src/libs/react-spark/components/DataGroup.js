import PropTypes from 'prop-types'
import React, { Component } from 'react'

import Group from './Group'

class DataGroup extends Component {
  constructor (props) {
    super(props)
    this.state = {
      ItemRenderer: this.props.itemRenderer
    }
  }
  render () {
    // constants
    const { dataProvider } = this.props
    const { ItemRenderer } = this.state
    // not in the currentState
    const parent = this._reactInternalInstance._currentElement._owner._instance
    this.getCurrentState = parent.getCurrentState
    // visual
    return (
      <Group {...this.props}>
        {dataProvider.map(item => {
          return (<ItemRenderer key={item.id} data={item} />)
        })}
      </Group>
    )
  }
}

DataGroup.propTypes = {
  ...Group.propTypes,
  dataProvider: PropTypes.array.isRequired,
  itemRenderer: PropTypes.func.isRequired
}

export default DataGroup
