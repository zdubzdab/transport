import '../main.css';
import React from 'react';
import stations from '../belgium_stations_names.json';
import DepartureTable from './DepartureTable';

var Cities = React.createClass({

  getInitialState: function(){
    return { 
      searchString: '',
      station: ''
    };
  },

  handleChange: function(e){
    this.setState({searchString: e.target.value});
  },

  handleClick: function(name){
    this.setState({station: name});
    this.setState({searchString: ''});
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
        return <li key={i}><a ref={i} onClick={this.handleClick.bind(this, name)}>{name}</a></li>
      }
    }.bind(this));

    if (this.state.station !== ''){
      var children = <DepartureTable station={this.state.station}/>
    }

    return <div className="col-md-9" id="cities">
            <div id="search-panel">
              <label htmlFor="search-input">Please type station name</label>
              <input className="form-control" id="search-input" type="text"
                    value={this.state.searchString} onChange={this.handleChange}
                    ref="search" placeholder="Type here..." />
              <ol className="stations-list">{list_stations}</ol>
            </div>
            {children}
          </div>;
  }
});

module.exports = Cities;
