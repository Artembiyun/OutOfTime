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
      if (this.props.cMonth[o] === this.props.cDay) {
        this.setState({
          currentArrayPos: o
        })
        CompletionObj = {
          date: this.props.cMonth[o],
          percent: this.props.completed,
          color: this.colorFunction(CompletionObj.percent)
        }
      } else if (this.props.cMonth[o] < this.props.cDay) {
        const random = (Math.random() * 100);
        const color = this.colorFunction(random);
        CompletionObj = {
          date: this.props.cMonth[o],
          percent: random,
          color: color
        }
      } else {
        CompletionObj = {
          date: this.props.cMonth[o],
          percent: 0
        }
      }
      CompletionArray.push(CompletionObj);
      o++;
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
    let pos = 0;
    let l = array.length - 1;
    while (l) {
      if (this.props.date === array[l].date) {
        pos = l;
      }
      l--;
    }

    let obj = {
      date: this.props.date,
      percent: this.props.completed,
      color: this.colorFunction(this.props.completed)
    }
      array[pos] = obj;
      // this.setState({
      //   CompletionArray: array,
      //   currentArrayPos: pos
      // })
  }

  colorFunction(percent) {
    const colorMap = ['#EC364F', '#EC364F', '#EC364F', '#EC364F', '#EC364F'];
    let c = 0;

    if (percent === 100) {
      c = 4;
    } else if (percent > 75) {
      c = 3;
    } else if (percent > 50) {
      c = 2;
    } else if (percent > 25) {
      c = 1;
    } else if (percent > 10) {
      c = 0;
    }
    return colorMap[c];
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
