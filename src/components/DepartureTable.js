import '../main.css';
import React from 'react';
import axios from 'axios';

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
          .get(_this.pastStationAfterChangeInput("https://api.irail.be/liveboard/?station=","&fast=true&format=json", nextProps.station))
          .then(function(result) {  
            _this.setState({
              response: result.data,
            });
          })
    }
  },

  pastStationAfterChangeInput (first, second, station){
    return first + station + second
  },

  pastStation (first, second){
    return first + this.state.stationName + second
  },

  componentDidMount: function() {
    var _this = this;
    this.serverRequest = 
      axios
        .get(_this.pastStation("https://api.irail.be/liveboard/?station=","&fast=true&format=json"))
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
          .get(_this.pastStation("https://api.irail.be/liveboard/?station=","&fast=true&format=json"))
          .then(function(result) {  
            _this.setState({
              response: result.data,
            });
          })
    }.bind(this), 20000);
  },

  componentWillUnmount: function() {
    this.serverRequest.abort();
    this.update();
  },

  getTime (time){
    time = time.toString();
    if( time.length === 1 ){ time = "0" + time; }
    return time
  },

  pullTime (response){
    //, 10 in order to fix warning
    var hours = (new Date(parseInt(response, 10)*1000)).getHours()
    var minutes = (new Date(parseInt(response, 10)*1000)).getMinutes()
    var seconds = (new Date(parseInt(response, 10)*1000)).getSeconds()
    var hour = this.getTime(hours)
    var minute = this.getTime(minutes)
    var second = this.getTime(seconds)
    var result = hour + ":" + minute + ":" + second
    return result
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
                <span className="col-md-1">{that.pullTime(train.time)}</span>
                <span className="col-md-2" id="plus-minutes">{that.addSignPlus(train.delay)}</span>
                <span id="canceled" className="col-md-2">{that.checkCanceled(train.canceled)}
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
