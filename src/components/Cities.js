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
        return <li key={i}><a>{name}</a></li>
      }
    });
    return <div className="col-md-8" id="cities">
            <div id="search-panel">
              <label htmlFor="search-input">Please type station name</label>
              <input className="form-control" id="search-input" type="text" value={this.state.searchString}
                  onChange={this.handleChange} placeholder="Type here..." />
              <ol className="stations-list">{list_stations}</ol>
            </div>
          </div>;
  }
});

module.exports = Cities;
