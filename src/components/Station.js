import '../main.css';
import React from 'react';
import axios from 'axios'

var Station = React.createClass({

  getInitialState: function() {
    return {
      station: "",
      hours: [],
      minutes: [],
      seconds: [],
      name: [],
    }
  },

  componentDidMount: function() {
    var _this = this;
    this.serverRequest = 
      axios
        .get("https://api.irail.be/liveboard/?station=Brussels&fast=true&format=json")
        .then(function(result) {  


          var name = _this.getKeyValue(result.data.departures.departure)
          console.log(name)
          _this.setState({
            name: name,
            station: result.data.station,
            hours: (new Date(parseInt(result.data.timestamp)*1000)).getHours(),
            minutes: (new Date(parseInt(result.data.timestamp)*1000)).getMinutes(),
            seconds: (new Date(parseInt(result.data.timestamp)*1000)).getSeconds(),
          });
        })
  },

  getKeyValue (array){
    var array_keys = []

    array.forEach(function(el) {
      array_keys.push(el.station)
      console.log(el.station)
    });
    console.log(array_keys)
    return array_keys
  },

  componentWillUnmount: function() {
    this.serverRequest.abort();
  },

  getTime (hours){
    hours = hours + "";
    if( hours.length === 1 ){ hours = "0" + hours; }
    return hours
  },

  render: function() {
    return (
      <div className="col-md-9" id="station">
        <h3>{this.state.station}</h3>
        <b>{this.getTime(this.state.hours)}:{this.getTime(this.state.minutes)}:
          {this.getTime(this.state.seconds)}</b>
        <b>{this.state.name}</b>
      </div>
    )
  }
});

module.exports = Station;
