import '../main.css';
import React from 'react';
import {getTime} from './TimeFormatting.js';

var Clock = React.createClass({

  setDate: function(){
    var date = new Date();
    var day = date.getDate();
    var year = date.getFullYear();
    var weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday",
      "Saturday"]
    var dayName = weekday[date.getDay()];

    var months = ["January", "February", "March", "April", "May", "June", "July",
      "August", "September", "October", "November", "December"]
    var monthName = months[date.getMonth()];

    this.setState({
      dayName: dayName,
      day: day,
      monthName: monthName,
      year: year
    });
  },

  setTime: function(){
    //transform date to Belgium
    var currentdate = new Date();
    currentdate.setHours(currentdate.getHours() - 1);

    this.setState({
      hours: getTime(currentdate.getHours()),
      minutes: getTime(currentdate.getMinutes()),
      seconds: getTime(currentdate.getSeconds())
    });
  },

  componentWillMount: function(){
    this.setTime();
    this.setDate();
  },

  componentDidMount: function(){
     window.setInterval(function () {
      this.setTime();
    }.bind(this), 1000);
  },
  
  render: function() {
    return(
      <div>
        <p id="brussel">Brussels, Belgium</p>
        <p id="time">{this.state.hours}:{this.state.minutes}:{this.state.seconds}</p>
        <p>{this.state.dayName} {this.state.day}  
         {this.state.monthName} {this.state.year}</p>
      </div>
    )
  }
});
module.exports = Clock;
