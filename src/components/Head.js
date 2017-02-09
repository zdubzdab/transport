import '../main.css';
import React from 'react';

var Head = React.createClass({

  getInitialState: function() {
    return {
      search_component: this.props.search_component
    }
  },

  changeSearchCompState (){
    if (this.state.search_component === true){
      this.setState({search_component: false});
      this.props.handleChangeComponent(false)
    } else {
      this.setState({search_component: true});
      this.props.handleChangeComponent(true)
    }
  },

  render: function() {
    var desire_link
    if (this.state.search_component === true){
      desire_link = <a href={"#"} onClick={this.changeSearchCompState }>Create route</a>
    } else {
      desire_link = <a href={"#"} onClick={this.changeSearchCompState}>Find station</a>
    }
    return (
      <div>
        <p id="logo">Easy transport</p>
        <div id="head-links">
          {desire_link}
        </div>          
      </div>
    )
  }
});

module.exports = Head;
