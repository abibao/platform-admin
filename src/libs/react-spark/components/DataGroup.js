import PropTypes from 'prop-types'
import React, { Component } from 'react'
import uuid from 'uuid'

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
    this.getCurrentState = this.props.getCurrentState
    // visual
    return (
      <Group {...this.props}>
        {dataProvider.map(item => {
          return (<ItemRenderer key={uuid.v4()} data={item} />)
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
