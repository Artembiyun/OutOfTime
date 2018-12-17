import React, {Component} from 'react';
import moment from 'moment';
import Statbar from './components/statbar';
import Navbar from './components/navbar';
import Content from './components/content';
import Sidebar from './components/sidebar';
import './css/styles.css';

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
};

class App extends Component {

  constructor() {
    super();
    this.getContentInfo = this
      .getContentInfo
      .bind(this);
    this.onDragEnd = this
      .onDragEnd
      .bind(this);
    this.timeofDay = this
      .timeofDay
      .bind(this);
    this.addHabit = this
      .addHabit
      .bind(this);
    this.toggleHabs = this
      .toggleHabs
      .bind(this);
    this.completionStatus = this
      .completionStatus
      .bind(this);
    this.changePeriod = this
      .changePeriod
      .bind(this);
    this.deleteHabs = this
      .deleteHabs
      .bind(this);
    this.changeDay = this
      .changeDay
      .bind(this);

    this.state = {
      isLoading: true,
      d: 0,
      newid: 1,
      completed: 0,
      percentageComplete: 0,
      date: 0
    }
  }
  componentDidMount() {
    fetch('http://localhost:8080/data')
      .then(response => response.json())
      .then(data => {
        this.setState({
          data: data,
          isLoading: false
        }, () => {
          let day = this.getCurrentDay()
          let hour = this.getCurrentHour();
          this.timeofDay(hour);
          this.timefoMonth(day);
        });
      })
  }
  //####Moment.Js functions####

  timefoMonth(t) {
    // let date = t;
    let date = 16;
    this.setState({date});
  }

  timeofDay(h) {
    let d = 0;
    console.log(h);
    if (h < 12) {
      d = 0;
    } else if (h < 17) {
      d = 1;
    } else {
      d = 2;
    }
    this.setState({d: d});
  }

  changeDay(direction) {
    let newDate = this.state.date;
    if (direction == 1) {
      newDate++;
    } else {
      newDate--;
    }
    if (this.state.date < newDate) {
      this.pushNewDate(newDate);
    } else {
      this.setState({date: newDate})
    }
  }

  pushNewDate(newDate){
    let date = this.state.date;
    let newDateObj = this.state.data[date];
    let i = newDateObj.daily.length;
    while(i){
        let habl = newDateObj.daily[i -1].habits.length;
        while(habl){
          if(newDateObj.daily[i -1].habits[habl -1].status){
          newDateObj.daily[i -1].habits[habl -1].status = false;
          }
          habl--;
        }
        
        i--;
      }
  
    let data = this.state.data;
    data.date = newDate;
    newDateObj.date = newDate;
    // if (newDate != this.state.data[this.state.data.length - 1].date){ 
    data.push(newDateObj);
    // }
    this.setState({
      data:data,
      date:newDate
    })
  }

  changePeriod(direction) {
    let d = this.state.d;
    if (direction == 1) {
      if (d < 2) {
        d++;
      } else if (d == 2) {
        d = 0;
      }
    } else if (direction == 0) {
      if (0 < d) {
        d--;
      } else if (d == 0) {
        d = 2;
      }
    }
    this.setState({d: d});
    this.completionStatus(d);
  }

  getDaysArrayByMonth() {
    let daysInMonth = moment().daysInMonth();
    let dateoffirst = moment()
      .date(1)
      .weekday();
    let arrDays = [];

    while (daysInMonth) {
      let current = moment()
        .date(daysInMonth)
        .toDate()
        .getDate();
      arrDays.push(current);
      daysInMonth--;
    }
    while (dateoffirst) {
      let priormonth = moment()
        .date(daysInMonth)
        .toDate()
        .getDate();
      arrDays.push(priormonth);
      daysInMonth--;
      dateoffirst--;
    }
    arrDays.reverse();
    return arrDays;
  }

  getCurrentDate() {
    let date = moment().format('dddd MMMM Do YYYY');
    return date;
  }

  getCurrentDay() {
    let cDay = moment().format('D');
    return cDay;
  }

  getCurrentMonth() {
    let month = moment().format('MMMM');
    return month;
  }

  getCurrentHour() {
    let hour = moment().format('H');
    return hour;
  }

  getDaysInMonth() {
    let daysInMonth = moment().daysInMonth();
    return daysInMonth;
  }

  // ####MomentJS Ends#### #### Data Manipulation Functions ####
  getContentInfo(completed, total) {
    let l = completed / total;
    l = l * 100;
    console.log(this.state);
    this.setState({percentageComplete: l});
  }
  //#### Data ENDS #### #### React DND ####
  onDragEnd(result) {
    if (!result.destination) {
      return;
    }
    const habits = reorder(this.state.data[this.state.date].daily[this.state.d].habits, result.source.index, result.destination.index);
    let updated = this.state;
    updated.data[this.state.date].daily[this.state.d].habits = habits;
    this.setState({updated});
  }

  addHabit(newhabit, newid) {
    let updated = {}
    updated = this.state.data[this.state.date].daily[this.state.d].habits;
    updated.push(newhabit);
    this.setState({updated, newid});
  }

  toggleHabs(id, status) {
    let stat = this.state.data;
    stat[this.state.date].daily[this.state.d].habits[id].status = status;
    this.setState({
      data:stat
    });
    this.completionStatus(this.state.d);
  }

  deleteHabs(id, d) {
    let habs = this.state.data[this.state.date].daily[d];
    let habsLength = this.state.data[this.state.date].daily[d].habits.length;
    let newHabs = [];

    for (let i = 0; i < habsLength; i++) {
      if (habs.habits[i].id != id) {
        newHabs.push(habs.habits[i]);
      }
    }
    let updated = this.state;
    updated.data[this.state.date].daily[this.state.d].habits = newHabs;
    this.setState({updated});
  }

  completionStatus(d) {
    let s = 0;
    for (let i = 0; i < this.state.data[this.state.date].daily[d].habits.length; i++) {
      if (this.state.data[this.state.date].daily[d].habits[i].status == true) {
        s++;
      }
    }
    this.setState({completed: s});
    this.returnStats();
  }

  returnStats() {
    let checked = 0;
    let total = 0;
    let periods = this.state.data[this.state.date].daily.length;

    for (let i = 0; i < periods; i++) {
      for (let j = 0; j < this.state.data[this.state.date].daily[i].habits.length; j++) {
        if (this.state.data[this.state.date].daily[i].habits[j].status == true) {
          checked++
        }
        total++;
      }
    }
    this.getContentInfo(checked, total);
  }

  //#### React DND ends ####

  render() {
    return (
      <div id="body">
        <Navbar/> {this.state.isLoading
          ? "...Loading"
          : <Sidebar
            d={this.state.d}
            onDragEnd={this.onDragEnd}
            data={this.state}
            datelong={this.getCurrentDate()}
            completed={this.state.completed}
            newid={this.state.newid}
            addHabit={this.addHabit}
            toggleHabs={this.toggleHabs}
            changePeriod={this.changePeriod}
            changeDay={this.changeDay}
            deleteHabs={this.deleteHabs}
            date={this.state.date}/>
}

        {this.state.isLoading
          ? "...Loading"
          : <Content
            completed={this.state.percentageComplete}
            color={this.state.color}
            total={this.state.total}
            cMonth={this.getDaysArrayByMonth()}
            date={this.state.date}
            dateData={this.state.data}
            month={this.getCurrentMonth()}
            sendContentInf={this.sendConentInfo}
            cDay={this.getCurrentDay()}/>
}
        {this.state.isLoading
          ? "...Loading"
          : <Statbar
            days={this.getDaysInMonth()}
            month={this.getCurrentMonth()}
            stats={this.state}/>}
      </div>
    );
  }
}

export default App;
