import React, { Component } from 'react';
import './App.css';
import ToDo from "./ToDo";

class App extends Component {
  state = {
    isActive: true,
    shouldShowButton: true
  }

  handleShow = ()=>{
      this.setState({
          isActive: true,
          shouldShowButton: true
      })
  }

  handleHide = () =>{
      this.setState({
          isActive: false,
          shouldShowButton: false
      })
  }


  render() {
    return (  
      <div className="App">
        {!this.state.shouldShowButton ? <img alt="notepad icon" width="100" src={require('./assets/notepad.png')} onClick={this.handleShow} style={{"pointer-events": "all"}}></img> : 
        <button className="closebtn" onClick={this.handleHide}>x</button>}
        <br></br><br></br>
        {this.state.isActive ? <ToDo/> : null }
      </div>
    )
  };
}

export default App;
