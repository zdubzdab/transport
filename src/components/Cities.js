import '../main.css';
import React from 'react';
import axios from 'axios';

var Cities = React.createClass({

  getInitialState: function() {
    return {
      response: [],
    }
  },

  componentDidMount: function() {
    var _this = this;
    this.serverRequest = 
      axios
        .get("https://irail.be/stations/NMBS?q={query}", {
          headers: { 'Content-Type': 'text/plain',
                      'Access-Control-Allow-Origin' : '*',
                      'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE'}
        })
        .then(function(result) {  
          _this.setState({
            response: result,
          });
        })
  },

  render: function() {
    return(
      <div className="col-md-10" id="cities">
        <p>Brussels, Belgium</p>
        <p>{this.state.response}</p>
      </div>
    )
  }
});
module.exports = Cities;
