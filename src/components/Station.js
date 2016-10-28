import '../main.css';
import React from 'react';
import axios from 'axios'

var Station = React.createClass({

  getInitialState: function() {
    return {
      response: [],
    }
  },

  componentDidMount: function() {
    var _this = this;
    this.serverRequest = 
      axios
        .get("https://api.irail.be/liveboard/?station=Brussels&fast=true&format=json")
        .then(function(result) {  
          _this.setState({
            response: result.data,
          });
        })
  },

  componentWillUnmount: function() {
    this.serverRequest.abort();

  },

  getTime (time){
    time = time.toString();
    if( time.length === 1 ){ time = "0" + time; }
    return time
  },

  pullTime (response){
    //, 10 in order to fix warning
    var hours = (new Date(parseInt(response.timestamp, 10)*1000)).getHours()
    var minutes = (new Date(parseInt(response.timestamp, 10)*1000)).getMinutes()
    var seconds = (new Date(parseInt(response.timestamp, 10)*1000)).getSeconds()
    var hour = this.getTime(hours)
    var minute = this.getTime(minutes)
    var second = this.getTime(seconds)
    var result = hour + ":" + minute + ":" + second
    return result
  },

  render: function() {
    if (this.state.response.length > 0){
      debugger
      var list_trains = this.state.response.departures.departure.map(function(train) {
        return  <ul>
                  <li>{train.station}</li>
                </ul>
      });
    }
    return (
      <div className="col-md-9" id="station">
        <h3>{this.state.response.station}</h3>
        <p>{this.pullTime(this.state.response)}</p>

        <p>{list_trains}</p>
      </div>
    )
  }
});

module.exports = Station;
