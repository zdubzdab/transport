import '../main.css';
import React from 'react';
import {pullTime} from '../lib/TimeFormatting.js';
import {getRequest} from '../lib/AxiosRequest.js';
import {secConvertToMinutes} from '../lib/TimeFormatting.js';
import {checkCanceled} from '../lib/TimeFormatting.js';

var DepartureTable = React.createClass({

  getInitialState: function() {
    return {
      response: [],
      stationName: this.props.station
    }
  },

  componentWillReceiveProps(nextProps) {
    if (nextProps.station !== this.state.stationName) {
      this.setState({ stationName: nextProps.station });
      var _this = this;
      getRequest(_this, "https://api.irail.be/liveboard/?station=",
        nextProps.station, "&fast=true&format=json")
    }
  },

  componentDidMount: function() {
    var _this = this;
    getRequest(_this, "https://api.irail.be/liveboard/?station=",
      _this.state.stationName, "&fast=true&format=json")
    this.update();
  },

  update (){
    window.setInterval(function () {
      var _this = this;
      getRequest(_this, "https://api.irail.be/liveboard/?station=",
        _this.state.stationName, "&fast=true&format=json")
    }.bind(this), 20000);
  },

  render: function() {
    if (Array.isArray(this.state.response) === false){
      var list_trains = this.state.response.departures.departure.map(function(
        train, i) {
        return  <li key={i} className="col-md-12" id="list-trains">
                <span className="col-md-1">{train.platforminfo.name}</span>
                <b className="col-md-6">{train.station}</b>
                <span className="col-md-1">{pullTime(train.time)}</span>
                <span className="col-md-2" id="plus-minutes">
                  {secConvertToMinutes(train.delay)}
                </span>
                <span id="canceled" className="col-md-2">
                  {checkCanceled(train.canceled)}
                </span></li>  
      });
    }
    return (
      <div className="col-md-12" id="station-component">
        <h3>{this.state.response.station}</h3>
        <div id="station-head" className="col-md-12">
          <span className="col-md-1">Pl.  </span> 
          <span className="col-md-6">Station</span>
          <span className="col-md-1">Depart. time</span>
          <span className="col-md-2"> Delay</span>
          <span className="col-md-2">Canceled</span>
        </div>
        <ol>{list_trains}</ol>
      </div>
    )
  }
});

module.exports = DepartureTable;
