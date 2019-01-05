import React, {Component} from 'react'
import moment from 'moment';

export default class Timetab extends Component {

    state = {
        time: 0,
    }

  componentDidMount() {
    setInterval(() => {
      this.getCurrentTime();
    }, 1000);
  }

  getCurrentTime() {
    let time = moment().format('LTS');
    this.setState({time: time})
  }

  render() {
    return (
      <div id="body--sidebar--inner">
        <div id="body--sidebar--label">
          <h5>{this.props.date}</h5>
        </div>
        <div id="body--sidebar--label">
          <h3 onClick={() => this.props.changePeriod(0)}>{"◄"}</h3>
          <h3>{this.props.period}</h3>
          <h3 onClick={() => this.props.changePeriod(1)}>{"►"}</h3>
        </div>
        <div id="sidebar--label">
          <h5>{this.state.time}</h5>
        </div>
      </div>
    )
  }
}
