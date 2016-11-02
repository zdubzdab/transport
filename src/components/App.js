import React, { Component } from 'react';
import '../main.css';
import Clock from './Clock';
import DepartureTable from './DepartureTable';
import Cities from './Cities';

class App extends Component {
  render() {
    return (
      <div className="app">
        <DepartureTable />
        <Clock />
        <Cities />
      </div>
    );
  }
}

export default App;

