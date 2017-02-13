import '../main.css';
import React from 'react';
import axios from 'axios';
import {pullTime} from './TimeFormatting.js';

var RouteTable = React.createClass({

  getInitialState: function(){
    // debugger
    return { 
      depStation: this.props.depStation,
      arrivalStation: this.props.arrivalStation,
      response_with_route: []
    };
  },

  componentWillMount: function() {
    var _this = this;
    this.serverRequest = 
      axios
        .get(_this.createUrl("https://api.irail.be/connections/?to=",
          _this.state.depStation, "&from=", _this.state.arrivalStation,
          "&timeSel=arrive&format=json"))
        .then(function (response) {
          _this.setState({
            response_with_route: response.data,
          });
        })
  },

  componentWillReceiveProps(nextProps) {
    debugger
    this.setState({ stationName: nextProps.station });
    var _this = this;
    this.serverRequest = 
      axios
        .get(_this.createUrl("https://api.irail.be/connections/?to=",
          _this.state.depStation, "&from=", _this.state.arrivalStation,
          "&timeSel=arrive&format=json"))
        .then(function (response) {
          _this.setState({
            response_with_route: response.data,
          });
        })
  },

  createUrl (first_part, arrival_station, second_part, dep_station, third_part){
    return first_part + arrival_station + second_part + dep_station + third_part
  },

  render: function() {
    var that = this, departure_st, arrival_st;
    if (Array.isArray(this.state.response_with_route) === false){
      var list_routes = this.state.response_with_route.connection.map(function(obj, i) {
        departure_st = obj.departure.station
        arrival_st = obj.arrival.station
        return (
          <div>
            <li key={i} className="col-md-12" id="">
            <span className="col-md-1">{pullTime(obj.departure.time)}</span>
            <span className="col-md-1">{pullTime(obj.arrival.time)}</span>
            <span className="col-md-1">{obj.duration}</span>
            <span className="col-md-1"></span>
            <span className="col-md-1">ar time{obj.arrival.time}</span></li>
          </div>
        )
      })
    }
    return (
      <div>
        <h4>{departure_st} - {arrival_st}</h4>
        <div id="station-head" className="col-md-12">
          <span className="col-md-2">Depart. time</span> 
          <span className="col-md-2">Arrival time</span>
          <span className="col-md-4">Duration</span>
          <span className="col-md-2"> Delay</span>
          <span className="col-md-2">Canceled</span>
        </div>
        <ol>{list_routes}</ol>
      </div>
    )
  }
});

module.exports = RouteTable;
