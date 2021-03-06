import '../main.css';
import React from 'react';
import {getRequest} from '../lib/AxiosRequest.js';
import {pullTime} from '../lib/TimeFormatting.js';
import {secConvertToMinutes} from '../lib/TimeFormatting.js';
import {checkCanceled} from '../lib/TimeFormatting.js';
import {convertToHours} from '../lib/TimeFormatting.js';

var RouteTable = React.createClass({

  getInitialState: function(){
    return { 
      depStation: this.props.depStation,
      arrivalStation: this.props.arrivalStation,
      response: []
    };
  },

  componentWillMount: function() {
    var _this = this;
    getRequest(_this, "https://api.irail.be/connections/?to=",
      _this.state.depStation, "&from=", _this.state.arrivalStation,
      "&timeSel=arrive&format=json")
  },

  componentWillReceiveProps(nextProps) {
    if ((this.state.arrivalStation !== nextProps.arrivalStation) ||
    (this.state.depStation !== nextProps.depStation)) {
      this.setState({ arrivalStation: nextProps.arrivalStation });
      this.setState({ depStation: nextProps.depStation });
      var _this = this;
      getRequest(_this, "https://api.irail.be/connections/?to=",
        nextProps.depStation, "&from=", nextProps.arrivalStation,
        "&timeSel=arrive&format=json")
    }
  },

  render: function() {
    var departure_st, arrival_st; 
    if (Array.isArray(this.state.response) === false){
      var list_routes = this.state.response.connection.map(function(obj, i) {
        departure_st = obj.departure.station
        arrival_st = obj.arrival.station
        return (
          <li key={i} className="col-md-12" id="list-routes">
          <span className="col-md-3">{pullTime(obj.departure.time)}</span>
          <span className="col-md-3">{pullTime(obj.arrival.time)}</span>
          <span className="col-md-3">{convertToHours(obj.duration)}</span>
          <span className="col-md-1" id="plus-minutes">
          {secConvertToMinutes(obj.departure.delay)}</span>
          <span className="col-md-2">{checkCanceled(obj.arrival.canceled)}
          </span></li>
        )
      })
    }
    return (
      <div>
        <h4>{departure_st} - {arrival_st}</h4>
        <div id="station-head" className="col-md-12">
          <span className="col-md-3">Depart. time</span> 
          <span className="col-md-3">Arrival time</span>
          <span className="col-md-3">Duration</span>
          <span className="col-md-1">Delay</span>
          <span className="col-md-2">Canceled</span>
        </div>
        <ol>{list_routes}</ol>
      </div>
    )
  }
});

module.exports = RouteTable;
