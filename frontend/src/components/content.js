import React, {Component} from 'react';
import {Circle} from 'rc-progress';

const days = [
  'SUN',
  'MON',
  'TUES',
  'WED',
  'THU',
  'FRI',
  'SAT'
];

export default class Content extends Component {

  constructor() {
    super();
    this.state = {
      currentArrayPos: 0,
      percent: 0,
      CompletionArray: [
        {
          date: 0,
          percent: 0,
          color: "#ff005a"
        }
      ]
    };
  }

  componentDidMount() {
    let o = 0;
    let CompletionArray = [];
    let CompletionObj = {};
    while (o <= (this.props.cMonth.length - 1)) {
      if (this.props.cMonth[o] == this.props.cDay) {
        CompletionObj = {
          date: this.props.cMonth[o],
          percent: this.props.completed,
          color: this.colorFunction(CompletionObj.percent)
        }
        this.setState({currentArrayPos: o}); 
      } else if (this.props.cMonth[o] < this.props.cDay) {
        const num = (25);
        const color = this.colorFunction(num);
        CompletionObj = {
          date: this.props.cMonth[o],
          percent: num,
          color: color
        }
      } else {
        CompletionObj = {
          date: this.props.cMonth[o],
          percent: 0
        }
      }
      o++;
      CompletionArray.push(CompletionObj);
    }
    this.setState({
      CompletionArray: CompletionArray
    })
  }

  componentDidUpdate() {
    if (this.state.CompletionArray[this.state.currentArrayPos].percent !== this.props.completed) {
      this.MonitorCurrentDay();
    }
  }

  MonitorCurrentDay() {
    let array = this.state.CompletionArray;
    let pos = this.state.currentArrayPos;
    let l = array.length - 1;
    while (l) {
      if (this.props.cDay == array[l].date) {
        pos = l;
      }
      l--;
    }
    let obj = {
      date: this.props.cDay,
      percent: this.props.completed,
      color: this.colorFunction(this.props.completed)
    }
      array[pos] = obj;
      this.setState({
        date: this.props.cDay,
        CompletionArray: array,
        currentArrayPos: pos
      })
  }

  colorFunction() {
    const colorMap = ['#EC364F'];
    return colorMap[0];
  }

  render() {
    return (
      <div id="body--main-content">
      <div id="calendar">
        <div id="calendar--monthLabel">
          <h1>{this.props.month}</h1>
        </div>
        <div id="calendar--content">
          <div id="calendar--content--dateLabel">
            {days.map(day => <div id="calendar--content--dateLabel__weekday">
              <p>{day}</p>
            </div>)}
          </div>
          <div id="calendar--content--inner">
            {this
              .state
              .CompletionArray
              .map(date => <div id="calendar--content--inner--box">
                {date.percent === 100
                  ? <div
                      id="calendar--content--inner--date"
                      style={{
                      backgroundColor: "#EC364F",
                      color: "#ffffff"
                    }}>
                      <Circle
                        percent={date.percent}
                        strokeWidth="10"
                        strokeColor={date.color}
                        strokeLinecap="round"/>
                      <h6>{date.date}</h6>
                    </div>
                  : <div id="calendar--content--inner--date">
                    <Circle
                      percent={date.percent}
                      strokeWidth="10"
                      strokeColor={date.color}
                      strokeLinecap="round"/>
                    <h6>{date.date}</h6>
                  </div>
}
              </div>)}
          </div>
        </div>
      </div>
      </div>
    )
  }
}
