import React from 'react';
import '../main.css';
import Head from './Head';
import Route from './Route';
import Search from './Search';
import Clock from './Clock';

const App = React.createClass({

  getInitialState: function(){
    return { 
      search_component: true
    };
  },

  changeComponent: function(e){
    this.setState({search_component: e});
  },

  render() {
    var desire_component
    if (this.state.search_component === true){
      desire_component = <Search />
    } else {
      desire_component = <Route />
    }
    return (
      <div className="app">
        <div className="col-md-12" id="head-section">
          <Head search_component={this.state.search_component}
            handleChangeComponent={this.changeComponent} />
        </div>
        <div className="col-md-9">
          {desire_component}
        </div>
        <div className="col-md-3" id="clock-board">
          <Clock />
        </div>        
      </div>
    );
  }
})

export default App;

