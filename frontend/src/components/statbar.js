import React, { Component } from 'react';
import { Line, Circle } from 'rc-progress';


export default class Statbar extends Component {

  monthPercent(){
    let days = this.props.stats.data[(this.props.stats.data.length - 1)].date;
    let monthPercent = 100* (days / this.props.days);
    return monthPercent;
  }

  completionRate(){
    let total = this.props.stats.data.length -1;
    let trues = 0;
    let totals = 0;
    for(let i = 0; i <= total; i++){
      let dailystotal = this.props.stats.data[i].daily.length -1;
      for(let y = 0; y <= dailystotal; y++){
        let habstotal = this.props.stats.data[i].daily[y].habits.length -1;
        for(let k = 0; k <= habstotal; k++){
          if(this.props.stats.data[i].daily[y].habits[k].status){
            trues++;
          }
          totals++;
        }
      }
    }
    
    let completionRate = 100 * (trues / totals);
    return completionRate;
  }

  streak(){
    let l = this.props.stats.data.length - 1;
    let o = 0;
    let streak;
    while (o < l){
      console.log(this.props.stats.data[l].percent);
      if (this.props.stats.data[l].percent === 100){
        streak++;
      }
      else if (this.props.stats.data[l].percent != 100){
        streak = 0;
      }
      o++;
    }
    return streak;
  }


  render() {
    return (
        <div id="body--stat-bar">
        <div id="body--stat-bar__stat-inner">
            <div id="body--stat-bar__stat-inner--circle">
            <h3>{this.props.month}</h3>
              <Line percent={this.monthPercent()} strokeWidth="5" strokeColor="#EC364F" />
            </div>
          </div>
          <div id="body--stat-bar__stat-inner">
            <div id="body--stat-bar__stat-inner--circle">
            <Circle percent={this.completionRate()} strokeWidth="12" strokeColor="#EC364F" />
            <h3>Total</h3>
            </div>
          </div>
        </div>
    )
  }
}
