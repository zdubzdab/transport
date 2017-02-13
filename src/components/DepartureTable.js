import '../main.css';
import React from 'react';
import axios from 'axios';
import {pullTime} from './TimeFormatting.js';
 
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
      this.serverRequest = 
        axios
          .get(_this.pastStation(
            "https://api.irail.be/liveboard/?station=", nextProps.station,
            "&fast=true&format=json"))
          .then(function(result) {  
            _this.setState({
              response: result.data,
            });
          })
    }
  },

  pastStation (first, station, second){
    return first + station + second
  },

  componentDidMount: function() {
    var _this = this;
    this.serverRequest = 
      axios
        .get(_this.pastStation("https://api.irail.be/liveboard/?station=",
          _this.state.stationName, "&fast=true&format=json"))
        .then(function(result) {  
          _this.setState({
            response: result.data,
          });
        })
    this.update();
  },

  update (){
    window.setInterval(function () {
      var _this = this;
      this.serverRequest = 
        axios
          .get(_this.pastStation("https://api.irail.be/liveboard/?station=",
            _this.state.stationName, "&fast=true&format=json"))
          .then(function(result) {  
            _this.setState({
              response: result.data,
            });
          })
    }.bind(this), 20000);
  },

  checkCanceled(response){
    if (response !== "0") {
      return "canceled"
    } else {
      return "       "
    }
  },

  addSignPlus(response){
    if (response === "0") {
      return ""
    } else {
      return "+" + (parseInt(response, 10)/60).toString()
    }
  },

  render: function() {
    var that = this
    if (Array.isArray(this.state.response) === false){
      var list_trains = this.state.response.departures.departure.map(function(train, i) {
        return  <li key={i} className="col-md-12" id="list-trains">
                <span className="col-md-1">{train.platforminfo.name}</span>
                <b className="col-md-6">{train.station}</b>
                <span className="col-md-1">{pullTime(train.time)}</span>
                <span className="col-md-2" id="plus-minutes">
                  {that.addSignPlus(train.delay)}
                </span>
                <span id="canceled" className="col-md-2">
                  {that.checkCanceled(train.canceled)}
                </span></li>  
      });
    }
    return (
      <div className="col-md-12" id="station">
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
