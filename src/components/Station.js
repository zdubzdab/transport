import '../main.css';
import React from 'react';
import axios from 'axios'

var Station = React.createClass({

  getInitialState: function() {
    return {
      jobs: []
    }
  },

  componentDidMount: function() {
    var _this = this;
    this.serverRequest = 
      axios
        .get("http://codepen.io/jobs.json")
        .then(function(result) {   
          console.log(result)
          _this.setState({
            jobs: result.data.jobs
          });
        })
  },

  componentWillUnmount: function() {
    this.serverRequest.abort();
  },

  render: function() {
    return (
      <div>
        {/* Render stuff here */}
      </div>
    )
  }
});

module.exports = Station;
