import '../main.css';
import React from 'react';
import axios from 'axios';
import data from '../belgium_stations_names.json';

var Cities = React.createClass({

  getInitialState: function() {
    return {
      stations_names: data
    }

  },

  componentDidMount: function() {


  },

  render: function() {
    return(
      <div className="col-md-10" id="cities">
        <p>Brussels, Belgium</p>
        <p>{this.state.stations_names}</p>
      </div>
    )
  }
});
module.exports = Cities;
