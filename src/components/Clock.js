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
      <div className="col-md-4" id="board">
        <span className="city">Brussels, Belgium</span>
        <span className="city-time">{this.state.hours}:{this.state.minutes}:
          {this.state.seconds}</span>
        <span className="city-time">{this.state.dayName} {this.state.day}
        {this.state.monthName} {this.state.year}</span>
      </div>
    )
  }
});
module.exports = Clock;
