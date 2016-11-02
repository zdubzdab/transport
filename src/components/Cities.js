import '../main.css';
import React from 'react';
import stations from '../belgium_stations_names.json';

var Cities = React.createClass({

  getInitialState: function(){
    return { 
      searchString: ''
    };
  },

  handleChange: function(e){
    this.setState({searchString: e.target.value});
  },

  render: function() {
    //search
    var libraries = stations,
        searchString = this.state.searchString.trim().toLowerCase();
    libraries = libraries.filter(function(name){
      return name.toLowerCase().match(searchString);
    });

    var list_stations = libraries.map(function(name, i){
      if(searchString.length > 0){
        return <li key={i}> {name}</li>
      }
    });
    return <div>
            <input type="text" value={this.state.searchString}
                onChange={this.handleChange} placeholder="Type here" />
            <ol>{list_stations}</ol>
          </div>;
  }
});

module.exports = Cities;
