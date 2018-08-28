import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Splash from './splash/splash.js';

class App extends Component {
  render() {
    return (
      <div className="App">
      
        <h1>welcome to grouple</h1>
        <Splash />
      </div>

    );
  }
}

export default App;
