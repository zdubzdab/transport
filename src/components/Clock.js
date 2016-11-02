import '../main.css';
import React from 'react';

var Clock = React.createClass({

  setDate: function(){
    var date = new Date();
    var day = date.getDate();
    var year = date.getFullYear();
    var weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
    var dayName = weekday[date.getDay()];

    var months = ["January", "February", "March", "April", "May", "June", "July", "August",
                  "September", "October", "November", "December"]
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
    
    var that = this
    this.setState({
      hours: that.getTime(currentdate.getHours()),
      minutes: that.getTime(currentdate.getMinutes()),
      seconds: that.getTime(currentdate.getSeconds())
    });
  },

  getTime (time){
    time = time.toString();
    if( time.length === 1 ){ time = "0" + time; }
    return time
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
      <div className="col-md-3" id="board">
        <p>Brussels, Belgium</p>
        <p id="board-time">{this.state.hours}:{this.state.minutes}:
          {this.state.seconds}</p>
        <p>{this.state.dayName} {this.state.day}  
         {this.state.monthName} {this.state.year}</p>
      </div>
    )
  }
});
module.exports = Clock;
