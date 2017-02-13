import '../main.css';
import React from 'react';
import stations from '../belgium_stations_names.json';
import DepartureTable from './DepartureTable';

var Search = React.createClass({

  getInitialState: function(){
    return { 
      searchString: '',
      station: ''
    };
  },

  handleChangeSearch: function(data){
    this.setState({searchString: data.target.value});
    var opts = document.getElementById('stations-list').childNodes;
    for (var i = 0; i < opts.length; i++) {
      if (opts[i].value === data.target.value) {
        this.renderDepartTable(opts[i].value)
        break;
      }
    }
  },

  renderDepartTable: function(data){
    this.setState({station: data});
    this.setState({searchString: ''});
  },

  render: function() {
    var searchString = this.state.searchString;
    var list_stations = stations.map(function(name, i){
      if(searchString.length > 0){
        return <option key={i} value={name}>{name}</option>
      }
      return false;
    });

    if (this.state.station !== ''){
      var departure_table = <DepartureTable station={this.state.station}/>
    }

    return (
          <div>
            <div id="search-panel">
              <label htmlFor="search-input" id="label-search-input">
              Please type station name</label>
              <input className="form-control" id="search-input" type="text"
                    value={this.state.searchString} onChange={this.handleChangeSearch}
                    ref="search" placeholder="Type here..." list="stations-list"/>
              <datalist id="stations-list">
                {list_stations}
              </datalist> 
            </div>
            {departure_table}
          </div>
    )
  }
});

module.exports = Search;
