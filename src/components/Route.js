import '../main.css';
import React from 'react';
import stations from '../belgium_stations_names.json';

var Route = React.createClass({

  getInitialState: function(){
    return { 
      depInput: '',
      depStation: '',
      arrivalInput: '',
      arrivalStation: '',
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
  },

  render: function() {
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
      </div>
    )
  }
});

module.exports = Route;
