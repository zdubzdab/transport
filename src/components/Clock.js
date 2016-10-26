import '../App.css';
import React from 'react';

var Clock = React.createClass({

  setDate: function(){
    var date = new Date();
    var day = date.getDate();
    var year = date.getFullYear();
    var weekday = new Array(7);
    weekday[0] = "Sunday";
    weekday[1] = "Monday";
    weekday[2] = "Tuesday";
    weekday[3] = "Wednesday";
    weekday[4] = "Thursday";
    weekday[5] = "Friday";
    weekday[6] = "Saturday";
    var dayName = weekday[date.getDay()];

    var month = new Array(12);
    month[0] = "January";
    month[1] = "February";
    month[2] = "March";
    month[3] = "April";
    month[4] = "May";
    month[5] = "June";
    month[6] = "July";
    month[7] = "August";
    month[8] = "September";
    month[9] = "October";
    month[10] = "November";
    month[11] = "December";
    var monthName = month[date.getMonth()];

    this.setState({
      dayName: dayName,
      day: day,
      monthName: monthName,
      year: year
    });
  },

  setTime: function(){
    //transform date to Belgium
    Date.prototype.minusHour = function(h){
        this.setHours(this.getHours()-h);
        return this;
    }

    var currentdate = new Date().minusHour(1);
    var hours = currentdate.getHours();    
    // add leading zero, first convert hours to string
    hours = hours + "";
    if( hours.length == 1 ){ hours = "0" + hours; }

    var minutes = currentdate.getMinutes();
    // add leading zero, first convert hours to string
    minutes = minutes + "";
    if( minutes.length == 1 ){ minutes = "0" + minutes; }

    var seconds = currentdate.getSeconds();
    seconds = seconds + "";
    if( seconds.length == 1 ){ seconds = "0" + seconds; }
    this.setState({
      hours: hours,
      minutes: minutes,
      seconds: seconds
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
      <div className="city-row">
        <span className="city-time">{this.state.hours}:{this.state.minutes}:{this.state.seconds}</span>
        <span className="city-time">{this.state.dayName} {this.state.day} {this.state.monthName} {this.state.year}
</span>
      </div>
    )
  }
});
module.exports = Clock;
