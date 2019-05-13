import React, { Component } from 'react'

export default class Canvas extends Component {
  render() {
    const { provided, innerRef, children } = this.props;
    return (
        <div id="sidebar--inner__canvas"
        {...provided.draggableProps}
        {...provided.dragHandleProps}
        ref={innerRef}
        >
            {children}
        </div>
    )
  }
}
