import React, { Component } from 'react';
import '../main.css';
import Clock from './Clock';
import SearchAndTable from './SearchAndTable';
import Head from './Head';

class App extends Component {
  render() {
    return (
      <div className="app">
        <Head />
        <SearchAndTable />
        <Clock />
        
      </div>
    );
  }
}

export default App;
