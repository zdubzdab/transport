import React, { Component } from 'react';
import '../main.css';
import Clock from './Clock';
import Station from './Station';

class App extends Component {
  render() {
    return (
      <div className="app">
        <Station />
        <Clock />
      </div>
    );
  }
}

export default App;

