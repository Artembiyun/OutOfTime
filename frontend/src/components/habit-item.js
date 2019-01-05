import React, {Component} from 'react'
import {Draggable} from 'react-beautiful-dnd';

export default class Habit extends Component {

  constructor(props) {
    super(props);
    this.check = this.check.bind(this);
  }

  componentDidMount(){
    this.componentDidUpdate();
  }

  check(){
    let isitchecked = document.getElementById(this.props.habKey).checked;
    this.props.toggleHabs(this.props.index, isitchecked);
  }

  componentDidUpdate(){
    if(this.props.status){
      document.getElementById(this.props.habKey).checked = true;
    }
    else{
      document.getElementById(this.props.habKey).checked = false;
  }
}

  render() {
    return (
      <Draggable draggableId={this.props.habit.id} index={this.props.index}>
        {(provided, snapshot) => (
          <div
            id="sidebar--inner__canvas__item"
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}>
            <h5>{this.props.index + 1}</h5>
            <h5 id="deletebutton" onClick={() => this.props.deleteHabs(this.props.habit.id, this.props.timeOfD)}>X</h5>
            <h5>{this.props.habit.name}</h5>
            <label className="switch">
              <input id={this.props.habKey} type="checkbox" onInput={this.check}/>
              <span className="slider"></span>
            </label>
          </div>
        )}
      </Draggable>
    )
  }
}
