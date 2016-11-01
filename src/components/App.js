import React, { Component } from 'react';
import '../main.css';
import Clock from './Clock';
import DepartureTable from './DepartureTable';

class App extends Component {
  render() {
    return (
      <div className="app">
        <DepartureTable />
        <Clock />
      </div>
    );
  }
}

export default App;

