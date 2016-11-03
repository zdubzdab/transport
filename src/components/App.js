import React, { Component } from 'react';
import '../main.css';
import Clock from './Clock';
import Cities from './Cities';
import Head from './Head';

class App extends Component {
  render() {
    return (
      <div className="app">
        <Head />
        <Cities />
        <Clock />
        
      </div>
    );
  }
}

export default App;

