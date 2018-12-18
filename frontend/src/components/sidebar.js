import React, {Component} from 'react';
import Habit from './habit-item.js';
import Canvas from './sidebar-canvas';
import Timetab from './timetab';
import {DragDropContext, Droppable} from 'react-beautiful-dnd';

export default class Sidebar extends Component {

  constructor(){
    super();
    this.addHabit = this
      .addHabit
      .bind(this);
  }

  addHabit(e){
    e.preventDefault();
    let newhabitname = document
      .getElementById('addhabit--searchfield')
      .value;
      let size = this.props.data.data[this.props.date].daily[this.props.d].habits.length;
      let newid = size + 1;
      let newhabit = {
        name: newhabitname,
        id: newid,
        duration: 15,
        status: false
      }
      this.props.addHabit(newhabit, newid);
  }

  render() {
    return (
      <div id="body--left-sidebar">
      <div id="sidebar">
        <Timetab
          period={this.props.data.data[this.props.date].daily[this.props.d].name}
          changePeriod={this.props.changePeriod}
          changeDay={this.props.changeDay}
          date={this.props.datelong}/>
        <DragDropContext onDragEnd={this.props.onDragEnd}>
          <div id="sidebar--inner">
            <Droppable droppableId={"1"} index={0}>
              {(provided, snapshot) => (
                <Canvas provided={provided} innerRef={provided.innerRef}>
                  {this
                    .props
                    .data
                    .data[this.props.date]
                    .daily[this.props.d]
                    .habits
                    .map((habit, index) => <Habit
                      provided={provided}
                      innerRef={provided.innerRef}
                      key={habit.id + this.props.d}
                      habKey={habit.id + this.props.d}
                      d={this.props.d}
                      habit={habit}
                      index={index}
                      status={habit.status}
                      deleteHabs={this.props.deleteHabs}
                      toggleHabs={this.props.toggleHabs}/>)}
                  {provided.placeholder}
                  {(6 > this.props.data.data[this.props.date].daily[this.props.d].habits.length)
                    ? (
                      <div id="sidebar--inner__canvas__additem">
                        <div id="addhabit">
                          <form onSubmit={this.addHabit}>
                            <input
                              type="text"
                              id="addhabit--searchfield"
                              placeholder="Add Habit..."
                              maxLength="15"></input>
                          </form>
                        </div>
                      </div>
                    )
                    : (null)}
                </Canvas>
              )}
            </Droppable>
          </div>
        </DragDropContext>
        <div id="sidebar--inner">
          <div id="sidebar--label">
            <h5>Completed: {this.props.completed}/{this.props.data.data[this.props.date].daily[this.props.d].habits.length}</h5>
          </div>
        </div>
      </div>
      </div>
    )
  }
}