import '../main.css';
import React from 'react';
import stations from '../belgium_stations_names.json';
import RouteTable from './RouteTable';

var Route = React.createClass({

  getInitialState: function(){
    return { 
      depInput: '',
      arrivalInput: '',
      depStation: '',
      arrivalStation: '',
      disabled: ''
    };
  },

  handleChangeStationInput: function(id, event){
    if (id === "arrival-stations-list") {
      this.setState({arrivalInput: event.target.value});
    } else {
      this.setState({depInput: event.target.value});
    }
    
    var opts = document.getElementById(id).childNodes;
    for (var i = 0; i < opts.length; i++) {
      if (opts[i].value === event.target.value) {
        break;
      }
    }
    this.makeButtonActive()
  },

  makeButtonActive (){
    var depart_input = document.getElementById('depart-input').value
    var arrival_input = document.getElementById('arrival-input').value
    if ((depart_input !== arrival_input) && (stations.indexOf(depart_input) !==- 1)
      && (stations.indexOf(arrival_input) !==-1 )) {
      this.setState({disabled: true});
    } else {
      this.setState({disabled: ""});
    }
  },

  handleClickButton (){
    var depart_input = document.getElementById('depart-input').value
    var arrival_input = document.getElementById('arrival-input').value
    this.setState({depStation: depart_input});
    this.setState({arrivalStation: arrival_input});
    this.setState({depInput: ''});
    this.setState({arrivalInput: ''});
    this.setState({disabled: ''});
  },

  render: function() {
    if ((this.state.depStation !== '') && (this.state.arrivalStation !== '')){
      var route_table = <RouteTable depStation={this.state.depStation}
      arrivalStation={this.state.arrivalStation}/>
    }

    var depInput = this.state.depInput;
    var dep_list_stations = stations.map(function(name, i){
      if(depInput.length > 0){
        return <option key={i} value={name}>{name}</option>
      }
      return false;
    });

    var arrivalInput = this.state.arrivalInput;
    var ar_list_stations = stations.map(function(name, i){
      if(arrivalInput.length > 0){
        return <option key={i} value={name}>{name}</option>
      }
      return false;
    });

    return (
      <div>
        <div className="search-route-panel">
          <h4>Route creation</h4>
          <br></br>
          <input className="form-control" id="depart-input" type="text"
            value={this.state.depInput}
            onChange={this.handleChangeStationInput.bind(this, 'dep-stations-list')}
            ref="search" placeholder="Departure station" list="dep-stations-list"/>
          <datalist id="dep-stations-list">
            {dep_list_stations}
          </datalist>

          <input className="form-control" id="arrival-input" type="text"
            value={this.state.arrivalInput}
            onChange={this.handleChangeStationInput.bind(this, 'arrival-stations-list')}
            ref="search" placeholder="Arrival station" list="arrival-stations-list"/>
          <datalist id="arrival-stations-list">
            {ar_list_stations}
          </datalist>
          <button onClick={this.handleClickButton} disabled={!this.state.disabled}
            className="btn btn-primary">Create route</button>
        </div>
        <hr></hr>
        <div id="routes-panel" className="col-md-12">
          <ol>{route_table}</ol>
        </div>
      </div>
    )
  }
});

module.exports = Route;
